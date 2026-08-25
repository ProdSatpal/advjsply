import json
from pathlib import Path

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")
BLOG_PAGES = [
    "blogs/annulment-divorce-guide-nagpur.html",
    "blogs/common-mistakes-legal-notice.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html",
]

for b in BLOG_PAGES:
    with open(PROJECT_ROOT / b, "r", encoding="utf-8") as f:
        content = f.read()
    start = content.find('<script type="application/ld+json">')
    end = content.find('</script>', start)
    json_text = content[start+len('<script type="application/ld+json">'):end].strip()
    data = json.loads(json_text)
    
    print(f"\n--- {b} ---")
    graph = data.get("@graph", [data])
    for item in graph:
        if item.get("@type") in ["BlogPosting", "Article"]:
            print("  Headline:", item.get("headline"))
            print("  DatePub:", item.get("datePublished"))
            print("  DateMod:", item.get("dateModified"))
            print("  Author:", item.get("author"))
            print("  Publisher:", item.get("publisher"))
            print("  MainEntity:", item.get("mainEntityOfPage"))
            print("  Image:", item.get("image"))
            print("  Description:", item.get("description")[:60], "...")
