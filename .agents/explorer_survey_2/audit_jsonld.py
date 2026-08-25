import os
import glob
import re
import json

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))

print(f"Total HTML files found: {len(html_files)}\n")

detailed_results = {}

for file_path in html_files:
    rel_path = os.path.relpath(file_path, workspace_dir)
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    # Extract JSON-LD scripts
    scripts = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", content, re.DOTALL | re.IGNORECASE)
    all_ld_tags = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>", content, re.IGNORECASE)
    
    parsed_blocks = []
    errors = []
    for i, s in enumerate(scripts):
        clean_s = s.strip()
        try:
            data = json.loads(clean_s)
            parsed_blocks.append(data)
        except Exception as e:
            errors.append(f"Block {i}: JSON parse error: {str(e)}")
            parsed_blocks.append({"_raw": clean_s, "_error": str(e)})
            
    # Check page content clues
    title_match = re.search(r"<title>(.*?)</title>", content, re.IGNORECASE | re.DOTALL)
    title = title_match.group(1).strip() if title_match else "NO_TITLE"
    
    canonical_match = re.search(r"<link[^>]*rel=[\"']canonical[\"'][^>]*href=[\"'](.*?)[\"']", content, re.IGNORECASE)
    canonical = canonical_match.group(1).strip() if canonical_match else "NO_CANONICAL"
    
    has_faq_html = bool(re.search(r"accordion|faq|frequently asked", content, re.IGNORECASE))
    has_breadcrumb_html = bool(re.search(r"breadcrumb", content, re.IGNORECASE))
    has_article_html = bool(re.search(r"<article", content, re.IGNORECASE))
    
    detailed_results[rel_path] = {
        "title": title,
        "canonical": canonical,
        "tag_count": len(all_ld_tags),
        "script_count": len(scripts),
        "errors": errors,
        "blocks": parsed_blocks,
        "has_faq_html": has_faq_html,
        "has_breadcrumb_html": has_breadcrumb_html,
        "has_article_html": has_article_html
    }

for rel_path, res in detailed_results.items():
    types = []
    for b in res["blocks"]:
        if isinstance(b, dict):
            if "@graph" in b:
                for item in b["@graph"]:
                    if isinstance(item, dict):
                        types.append(f"Graph:{item.get('@type')}")
            else:
                types.append(str(b.get("@type", "UNKNOWN_DICT" if "_error" not in b else "INVALID_JSON")))
        elif isinstance(b, list):
            for item in b:
                if isinstance(item, dict):
                    types.append(f"List:{item.get('@type')}")
                else:
                    types.append("List:Primitive")
        else:
            types.append("NonDictBlock")
            
    err_str = f" ERRORS: {res['errors']}" if res['errors'] else ""
    print(f"[{rel_path}]")
    print(f"  Title: {res['title'][:60]}...")
    print(f"  Canonical: {res['canonical']}")
    print(f"  JSON-LD scripts: {res['script_count']} | Types: {types}{err_str}")
    print()

output_json_path = "/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_2/audit_data.json"
with open(output_json_path, "w", encoding="utf-8") as out_f:
    json.dump(detailed_results, out_f, indent=2)

print(f"Detailed audit data saved to {output_json_path}")
