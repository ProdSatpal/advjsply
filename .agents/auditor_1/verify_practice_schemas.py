import json
from pathlib import Path

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")
PRACTICE_PAGES = [
    "divorce-lawyer-nagpur.html",
    "domestic-violence-lawyer-nagpur.html",
    "legal-agreements-nagpur.html",
    "legal-notice-service-nagpur.html",
    "marriage-registration-lawyer-nagpur.html",
    "mutual-divorce-lawyer-nagpur.html",
    "partnership-deeds-nagpur.html",
    "property-disputes-nagpur.html",
    "property-registry-nagpur.html",
    "will-writing-nagpur.html",
    "legal-notices.html",
]

for p in PRACTICE_PAGES:
    with open(PROJECT_ROOT / p, "r", encoding="utf-8") as f:
        content = f.read()
    start = content.find('<script type="application/ld+json">')
    end = content.find('</script>', start)
    json_text = content[start+len('<script type="application/ld+json">'):end].strip()
    data = json.loads(json_text)
    
    print(f"\n--- {p} ---")
    graph = data.get("@graph", [data])
    for item in graph:
        t = item.get("@type")
        if t in ["Service", "LegalService"] or (isinstance(t, list) and ("Service" in t or "LegalService" in t)):
            print("  Service Name:", item.get("name"))
            print("  ServiceType:", item.get("serviceType"))
            print("  Provider:", item.get("provider"))
            print("  AreaServed:", item.get("areaServed"))
        elif t == "FAQPage":
            questions = item.get("mainEntity", [])
            print(f"  FAQPage: {len(questions)} Questions")
            for q in questions[:2]:
                print(f"    - Q: {q.get('name')[:40]}... -> A: {q.get('acceptedAnswer', {}).get('text')[:40]}...")
