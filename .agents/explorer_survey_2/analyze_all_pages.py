import os
import glob
import re
import json

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))

page_analysis = {}

for fpath in html_files:
    rel = os.path.relpath(fpath, workspace_dir)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        html = fp.read()
        
    title_m = re.search(r"<title>(.*?)</title>", html, re.DOTALL | re.IGNORECASE)
    title = title_m.group(1).strip() if title_m else ""
    
    desc_m = re.search(r"<meta\s+name=[\"']description[\"']\s+content=[\"'](.*?)[\"']", html, re.IGNORECASE)
    desc = desc_m.group(1).strip() if desc_m else ""
    
    can_m = re.search(r"<link\s+rel=[\"']canonical[\"']\s+href=[\"'](.*?)[\"']", html, re.IGNORECASE)
    can = can_m.group(1).strip() if can_m else ""
    
    # Extract JSON-LD scripts
    scripts = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", html, re.DOTALL | re.IGNORECASE)
    
    schemas = []
    for s in scripts:
        try:
            d = json.loads(s.strip())
            schemas.append(d)
        except Exception as e:
            schemas.append({"_error": str(e), "_raw": s})
            
    page_analysis[rel] = {
        "title": title,
        "description": desc,
        "canonical": can,
        "schemas": schemas
    }

print(f"Total analyzed: {len(page_analysis)}")
