import json
from pathlib import Path

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")
CORE_PAGES = [
    "index.html",
    "about.html",
    "services.html",
    "contact.html",
    "notice.html",
    "blogs.html",
]

for c in CORE_PAGES:
    with open(PROJECT_ROOT / c, "r", encoding="utf-8") as f:
        content = f.read()
    start = content.find('<script type="application/ld+json">')
    end = content.find('</script>', start)
    json_text = content[start+len('<script type="application/ld+json">'):end].strip()
    data = json.loads(json_text)
    
    print(f"\n--- {c} ---")
    graph = data.get("@graph", [data])
    for item in graph:
        print("  Type:", item.get("@type"), "| ID:", item.get("@id"), "| Name/Title:", item.get("name") or item.get("headline"))
