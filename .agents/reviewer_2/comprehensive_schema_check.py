import json, os, sys, re
from pathlib import Path

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")
sys.path.insert(0, str(PROJECT_ROOT))
from tests.test_seo_compliance import get_all_pages_audit_data, EXPECTED_HTML_FILES

audit = get_all_pages_audit_data()

results = []

def check(condition, msg, rel_path):
    if not condition:
        results.append(f"[FAIL] {rel_path}: {msg}")
    else:
        results.append(f"[PASS] {rel_path}: {msg}")

for rel_path, data in audit.items():
    raw_blocks = data.jsonld_raw_blocks
    check(len(raw_blocks) == 1, f"Expected exactly 1 JSON-LD script block, found {len(raw_blocks)}", rel_path)
    if not raw_blocks:
        continue
    
    raw = json.loads(raw_blocks[0])
    check(raw.get("@context") == "https://schema.org", f"@context is '{raw.get('@context')}' (expected 'https://schema.org')", rel_path)
    
    graph = raw.get("@graph", [])
    check(isinstance(graph, list) and len(graph) >= 2, f"@graph must be a non-empty list of entities (found {len(graph)})", rel_path)

    # Check BreadcrumbList on every page
    bc = [e for e in graph if e.get("@type") == "BreadcrumbList"]
    check(len(bc) == 1, f"Must have exactly 1 BreadcrumbList entity in @graph (found {len(bc)})", rel_path)
    if bc:
        items = bc[0].get("itemListElement", [])
        check(len(items) >= 1, "Breadcrumb itemListElement non-empty", rel_path)
        for idx, item in enumerate(items):
            check(item.get("@type") == "ListItem", f"Breadcrumb item #{idx+1} @type is ListItem", rel_path)
            check(item.get("position") == idx + 1, f"Breadcrumb item #{idx+1} position is {idx+1}", rel_path)
            check(bool(item.get("name")), f"Breadcrumb item #{idx+1} has name", rel_path)
            check(bool(item.get("item")) and item.get("item").startswith("https://advocatejsply.com/"), f"Breadcrumb item #{idx+1} has valid absolute URL", rel_path)

    # Check page-specific entities
    if rel_path == "index.html":
        ws = [e for e in graph if e.get("@type") == "WebSite"]
        check(len(ws) == 1, "index.html contains WebSite", rel_path)
        ls = [e for e in graph if "LegalService" in (e.get("@type") if isinstance(e.get("@type"), list) else [e.get("@type")])]
        check(len(ls) == 1, "index.html contains LegalService", rel_path)
        if ls:
            check(ls[0].get("@id") == "https://advocatejsply.com/#legalservice", "LegalService @id is canonical", rel_path)
            check(bool(ls[0].get("telephone")), "LegalService has telephone", rel_path)
            check(bool(ls[0].get("address")), "LegalService has address", rel_path)
            check(bool(ls[0].get("priceRange")), "LegalService has priceRange", rel_path)
            check(bool(ls[0].get("openingHoursSpecification")), "LegalService has openingHoursSpecification", rel_path)

    elif rel_path == "about.html":
        ap = [e for e in graph if e.get("@type") == "AboutPage"]
        check(len(ap) == 1, "about.html contains AboutPage", rel_path)
        person = [e for e in graph if "Person" in (e.get("@type") if isinstance(e.get("@type"), list) else [e.get("@type")])]
        check(len(person) == 1, "about.html contains Person/Attorney", rel_path)
        if person:
            check(person[0].get("@id") == "https://advocatejsply.com/#attorney", "Person @id is canonical #attorney", rel_path)
            check(person[0].get("worksFor", {}).get("@id") == "https://advocatejsply.com/#legalservice", "Person worksFor references #legalservice", rel_path)

    elif rel_path == "contact.html":
        cp = [e for e in graph if e.get("@type") == "ContactPage"]
        check(len(cp) == 1, "contact.html contains ContactPage", rel_path)
        contact_point = [e for e in graph if e.get("@type") == "ContactPoint"]
        check(len(contact_point) == 1, "contact.html contains ContactPoint", rel_path)

    elif rel_path == "services.html":
        coll = [e for e in graph if e.get("@type") == "CollectionPage"]
        check(len(coll) == 1, "services.html contains CollectionPage", rel_path)
        if coll:
            item_list = coll[0].get("mainEntity", {})
            check(item_list.get("@type") == "ItemList", "CollectionPage mainEntity is ItemList", rel_path)
            check(len(item_list.get("itemListElement", [])) == 11, f"ItemList contains all 11 services (found {len(item_list.get('itemListElement', []))})", rel_path)

    elif rel_path == "blogs.html":
        bh = [e for e in graph if "Blog" in (e.get("@type") if isinstance(e.get("@type"), list) else [e.get("@type")])]
        check(len(bh) == 1, "blogs.html contains Blog", rel_path)
        if bh:
            item_list = bh[0].get("mainEntity", {})
            check(item_list.get("@type") == "ItemList", "Blog mainEntity is ItemList", rel_path)
            check(len(item_list.get("itemListElement", [])) == 5, f"ItemList contains all 5 articles (found {len(item_list.get('itemListElement', []))})", rel_path)

    elif rel_path == "notice.html":
        webapp = [e for e in graph if "WebApplication" in (e.get("@type") if isinstance(e.get("@type"), list) else [e.get("@type")])]
        check(len(webapp) == 1, "notice.html contains WebApplication", rel_path)
        if webapp:
            check(webapp[0].get("applicationCategory") == "LegalApplication", "WebApplication applicationCategory is LegalApplication", rel_path)
            check(webapp[0].get("provider", {}).get("@id") == "https://advocatejsply.com/#legalservice", "WebApplication provider references #legalservice", rel_path)

    elif rel_path.startswith("blogs/"):
        bp = [e for e in graph if e.get("@type") in ["BlogPosting", "Article"]]
        check(len(bp) == 1, f"{rel_path} contains BlogPosting", rel_path)
        if bp:
            bpe = bp[0]
            check(bool(bpe.get("headline")), "BlogPosting has headline", rel_path)
            check(bool(bpe.get("image")), "BlogPosting has image", rel_path)
            check(bool(bpe.get("datePublished")), "BlogPosting has datePublished", rel_path)
            check(bool(bpe.get("dateModified")), "BlogPosting has dateModified", rel_path)
            check(bpe.get("author", {}).get("@id") == "https://advocatejsply.com/#attorney", "BlogPosting author is #attorney", rel_path)
            check(bpe.get("publisher", {}).get("@id") == "https://advocatejsply.com/#legalservice", "BlogPosting publisher is #legalservice", rel_path)
            check(bpe.get("publisher", {}).get("logo", {}).get("@type") == "ImageObject", "BlogPosting publisher has ImageObject logo", rel_path)
            check(bpe.get("mainEntityOfPage", {}).get("@id") == data.canonical_url, "BlogPosting mainEntityOfPage matches canonical URL", rel_path)
            check(bool(bpe.get("description")), "BlogPosting has description", rel_path)
        if rel_path == "blogs/top-10-divorce-lawyers-nagpur.html":
            faq = [e for e in graph if e.get("@type") == "FAQPage"]
            check(len(faq) == 1, "blogs/top-10-divorce-lawyers-nagpur.html contains FAQPage", rel_path)

    else:
        # Practice Area Pages + legal-notices.html
        srv = [e for e in graph if e.get("@type") in ["Service", "LegalService"]]
        check(len(srv) == 1, f"{rel_path} contains Service", rel_path)
        if srv:
            check(bool(srv[0].get("name")), "Service has name", rel_path)
            check(srv[0].get("provider", {}).get("@id") == "https://advocatejsply.com/#legalservice", "Service provider is #legalservice", rel_path)
            check(bool(srv[0].get("areaServed")), "Service has areaServed", rel_path)
            check(bool(srv[0].get("serviceType")) or bool(srv[0].get("description")), "Service has serviceType or description", rel_path)
        faq = [e for e in graph if e.get("@type") == "FAQPage"]
        check(len(faq) == 1, f"{rel_path} contains FAQPage", rel_path)
        if faq:
            main_q = faq[0].get("mainEntity", [])
            check(len(main_q) >= 2, f"FAQPage has at least 2 questions (found {len(main_q)})", rel_path)

passes = [r for r in results if r.startswith("[PASS]")]
fails = [r for r in results if r.startswith("[FAIL]")]

print("=" * 60)
print(f"COMPREHENSIVE SCHEMA AUDIT RESULTS:")
print(f"  TOTAL CHECKS: {len(results)}")
print(f"  PASSED:       {len(passes)}")
print(f"  FAILED:       {len(fails)}")
print("=" * 60)
if fails:
    print("FAILURES:")
    for f in fails:
        print(" ", f)
else:
    print("ALL CHECKS PASSED WITH 100% SUCCESS RATE!")
