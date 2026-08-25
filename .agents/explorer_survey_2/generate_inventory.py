import os
import glob
import re
import json

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))

analysis_data = {}

for fpath in html_files:
    rel = os.path.relpath(fpath, workspace_dir)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as fp:
        html = fp.read()

    title_m = re.search(r"<title[^>]*>(.*?)</title>", html, re.DOTALL | re.IGNORECASE)
    title = title_m.group(1).strip() if title_m else "MISSING"

    desc_m = re.search(r"<meta\s+name=[\"']description[\"']\s+content=[\"'](.*?)[\"']", html, re.IGNORECASE)
    if not desc_m:
        desc_m = re.search(r"<meta\s+content=[\"'](.*?)[\"']\s+name=[\"']description[\"']", html, re.IGNORECASE)
    desc = desc_m.group(1).strip() if desc_m else "MISSING"

    can_m = re.search(r"<link\s+rel=[\"']canonical[\"']\s+href=[\"'](.*?)[\"']", html, re.IGNORECASE)
    if not can_m:
        can_m = re.search(r"<link\s+href=[\"'](.*?)[\"']\s+rel=[\"']canonical[\"']", html, re.IGNORECASE)
    can = can_m.group(1).strip() if can_m else "MISSING"

    # Extract JSON-LD
    scripts = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", html, re.DOTALL | re.IGNORECASE)
    
    parsed_blocks = []
    syntax_errors = []
    for idx, s in enumerate(scripts):
        try:
            val = json.loads(s.strip())
            parsed_blocks.append(val)
        except Exception as e:
            syntax_errors.append(f"Block {idx+1}: {str(e)}")

    analysis_data[rel] = {
        "title": title,
        "description": desc,
        "canonical": can,
        "script_count": len(scripts),
        "syntax_errors": syntax_errors,
        "blocks": parsed_blocks
    }

# Let's write an exhaustive summary generator
print(f"Total HTML pages analyzed: {len(analysis_data)}")

# Category breakdown
categories = {
    "Core Pages": [
        "index.html",
        "about.html",
        "contact.html",
        "services.html",
        "blogs.html",
        "notice.html"
    ],
    "Practice Area / Service Pages": [
        "divorce-lawyer-nagpur.html",
        "mutual-divorce-lawyer-nagpur.html",
        "domestic-violence-lawyer-nagpur.html",
        "marriage-registration-lawyer-nagpur.html",
        "legal-agreements-nagpur.html",
        "legal-notice-service-nagpur.html",
        "legal-notices.html",
        "partnership-deeds-nagpur.html",
        "property-disputes-nagpur.html",
        "property-registry-nagpur.html",
        "will-writing-nagpur.html"
    ],
    "Blog Articles": [
        "blogs/annulment-divorce-guide-nagpur.html",
        "blogs/common-mistakes-legal-notice.html",
        "blogs/maharashtra-new-advocate-general.html",
        "blogs/sale-deed-registration-guide-nagpur.html",
        "blogs/top-10-divorce-lawyers-nagpur.html"
    ]
}

with open("/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_2/inventory.json", "w", encoding="utf-8") as f:
    json.dump(analysis_data, f, indent=2)

print("Saved inventory.json")
