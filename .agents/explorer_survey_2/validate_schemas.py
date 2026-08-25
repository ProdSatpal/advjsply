import os
import glob
import re
import json

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))

findings = []

for file_path in html_files:
    rel_path = os.path.relpath(file_path, workspace_dir)
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Extract JSON-LD scripts
    scripts = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", html, re.DOTALL | re.IGNORECASE)
    
    file_info = {
        "file": rel_path,
        "script_count": len(scripts),
        "schemas": [],
        "issues": []
    }

    if len(scripts) == 0:
        file_info["issues"].append("CRITICAL: No JSON-LD structured data block found on this page.")

    for idx, s in enumerate(scripts):
        raw = s.strip()
        try:
            parsed = json.loads(raw)
        except Exception as e:
            file_info["issues"].append(f"Block {idx+1}: JSON Parse Error: {str(e)}")
            continue

        blocks_to_check = []
        if isinstance(parsed, dict):
            if "@graph" in parsed:
                blocks_to_check.extend(parsed["@graph"])
            else:
                blocks_to_check.append(parsed)
        elif isinstance(parsed, list):
            blocks_to_check.extend(parsed)

        for b in blocks_to_check:
            if not isinstance(b, dict):
                file_info["issues"].append(f"Block {idx+1}: Top-level item is not a JSON object: {type(b)}")
                continue

            stype = b.get("@type", "MISSING_TYPE")
            scontext = b.get("@context", parsed.get("@context", "MISSING_CONTEXT"))
            file_info["schemas"].append(stype)

            # Context check
            if scontext not in ["https://schema.org", "http://schema.org", "https://schema.org/"]:
                file_info["issues"].append(f"Block {idx+1} ({stype}): Invalid or missing @context: '{scontext}'")

            # Validate based on schema type
            if stype == "BreadcrumbList":
                items = b.get("itemListElement", [])
                if not items or not isinstance(items, list):
                    file_info["issues"].append(f"BreadcrumbList in {rel_path} has missing or invalid 'itemListElement'")
                else:
                    for pos, item in enumerate(items, 1):
                        if not isinstance(item, dict):
                            file_info["issues"].append(f"BreadcrumbList item #{pos} is not an object")
                            continue
                        if item.get("@type") != "ListItem":
                            file_info["issues"].append(f"BreadcrumbList item #{pos} @type is '{item.get('@type')}', expected 'ListItem'")
                        if item.get("position") != pos:
                            file_info["issues"].append(f"BreadcrumbList item #{pos} position is {item.get('position')}, expected {pos}")
                        if not item.get("name"):
                            file_info["issues"].append(f"BreadcrumbList item #{pos} missing 'name'")
                        if not item.get("item"):
                            file_info["issues"].append(f"BreadcrumbList item #{pos} missing 'item' URL")

            elif stype == "FAQPage":
                main_entity = b.get("mainEntity", [])
                if not main_entity or not isinstance(main_entity, list):
                    file_info["issues"].append(f"FAQPage in {rel_path} has missing or empty 'mainEntity'")
                else:
                    for q_idx, q in enumerate(main_entity, 1):
                        if not isinstance(q, dict) or q.get("@type") != "Question":
                            file_info["issues"].append(f"FAQPage question #{q_idx} is not @type Question")
                        if not q.get("name"):
                            file_info["issues"].append(f"FAQPage question #{q_idx} missing 'name' (question text)")
                        ans = q.get("acceptedAnswer")
                        if not ans or not isinstance(ans, dict) or ans.get("@type") != "Answer":
                            file_info["issues"].append(f"FAQPage question #{q_idx} missing valid acceptedAnswer (@type Answer)")
                        elif not ans.get("text"):
                            file_info["issues"].append(f"FAQPage question #{q_idx} acceptedAnswer missing 'text'")

            elif stype in ["BlogPosting", "Article", "NewsArticle"]:
                # Google Search Central requirements / recommendations for Article
                req_fields = ["headline", "image", "datePublished", "dateModified", "author"]
                for fld in req_fields:
                    if not b.get(fld):
                        file_info["issues"].append(f"BlogPosting in {rel_path} missing recommended/required field '{fld}'")
                
                # Check author structure
                authors = b.get("author")
                if isinstance(authors, list):
                    for a in authors:
                        if not isinstance(a, dict) or not a.get("name") or not a.get("@type"):
                            file_info["issues"].append(f"BlogPosting author in {rel_path} missing @type or name")
                elif isinstance(authors, dict):
                    if not authors.get("name") or not authors.get("@type"):
                        file_info["issues"].append(f"BlogPosting author in {rel_path} missing @type or name")
                
                # Check publisher (Google recommended)
                if not b.get("publisher"):
                    file_info["issues"].append(f"BlogPosting in {rel_path} missing recommended 'publisher' (Organization)")
                
                # Check mainEntityOfPage
                if not b.get("mainEntityOfPage"):
                    file_info["issues"].append(f"BlogPosting in {rel_path} missing recommended 'mainEntityOfPage'")
                
                # Check description
                if not b.get("description"):
                    file_info["issues"].append(f"BlogPosting in {rel_path} missing recommended 'description'")

            elif stype in ["LegalService", "Attorney", "LocalBusiness", "Organization"]:
                req_fields = ["name", "image", "telephone", "address"]
                for fld in req_fields:
                    if not b.get(fld):
                        file_info["issues"].append(f"{stype} in {rel_path} missing '{fld}'")
                
                addr = b.get("address")
                if isinstance(addr, dict):
                    for af in ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"]:
                        if not addr.get(af):
                            file_info["issues"].append(f"{stype} address in {rel_path} missing '{af}'")

    # Missing schema checks per page type
    if rel_path.startswith("blogs/") and rel_path.endswith(".html"):
        if "BlogPosting" not in file_info["schemas"] and "Article" not in file_info["schemas"]:
            file_info["issues"].append(f"Blog article page {rel_path} is missing BlogPosting / Article schema")
    elif rel_path == "index.html":
        if "WebSite" not in file_info["schemas"]:
            file_info["issues"].append("index.html is missing WebSite schema markup")
        if "LegalService" not in file_info["schemas"] and "Attorney" not in file_info["schemas"]:
            file_info["issues"].append("index.html is missing LegalService / Attorney schema markup")
    elif rel_path == "about.html":
        if "AboutPage" not in file_info["schemas"] and "LegalService" not in file_info["schemas"] and "Person" not in file_info["schemas"] and "Attorney" not in file_info["schemas"]:
            file_info["issues"].append("about.html only has BreadcrumbList; missing AboutPage, Attorney / Person, or LegalService schema")
    elif rel_path == "contact.html":
        if "ContactPage" not in file_info["schemas"] and "LegalService" not in file_info["schemas"] and "LocalBusiness" not in file_info["schemas"]:
            file_info["issues"].append("contact.html only has BreadcrumbList; missing ContactPage / LegalService / LocalBusiness schema")
    elif rel_path == "services.html":
        if "Service" not in file_info["schemas"] and "LegalService" not in file_info["schemas"] and "ItemList" not in file_info["schemas"]:
            file_info["issues"].append("services.html only has BreadcrumbList; missing Service / ItemList / LegalService catalog schema")
    elif rel_path == "notice.html":
        if "WebApplication" not in file_info["schemas"] and "SoftwareApplication" not in file_info["schemas"] and "Service" not in file_info["schemas"]:
            file_info["issues"].append("notice.html (interactive generator) only has BreadcrumbList; missing WebApplication / SoftwareApplication / Service schema")
    elif rel_path == "blogs.html":
        if "CollectionPage" not in file_info["schemas"] and "Blog" not in file_info["schemas"]:
            file_info["issues"].append("blogs.html only has BreadcrumbList; missing CollectionPage / Blog schema")
    else:
        # Practice area pages
        if "Service" not in file_info["schemas"] and "LegalService" not in file_info["schemas"]:
            file_info["issues"].append(f"Practice area page {rel_path} only has BreadcrumbList and FAQPage; missing Service / LegalService schema")

    findings.append(file_info)

print("=" * 80)
print("STRUCTURED DATA AUDIT FINDINGS SUMMARY")
print("=" * 80)

total_issues = 0
for f in findings:
    total_issues += len(f["issues"])
    print(f"\n[{f['file']}] — Schemas: {f['schemas']}")
    if f["issues"]:
        for iss in f["issues"]:
            print(f"  ❌ {iss}")
    else:
        print("  ✅ All checks passed")

print("\n" + "=" * 80)
print(f"TOTAL AUDITED PAGES: {len(findings)}")
print(f"TOTAL DETECTED ISSUES / OMISSIONS: {total_issues}")
print("=" * 80)
