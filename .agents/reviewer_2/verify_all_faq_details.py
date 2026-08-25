import json, os, re
from pathlib import Path

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")

pages = [
    "divorce-lawyer-nagpur.html",
    "domestic-violence-lawyer-nagpur.html",
    "legal-agreements-nagpur.html",
    "legal-notice-service-nagpur.html",
    "legal-notices.html",
    "marriage-registration-lawyer-nagpur.html",
    "mutual-divorce-lawyer-nagpur.html",
    "partnership-deeds-nagpur.html",
    "property-disputes-nagpur.html",
    "property-registry-nagpur.html",
    "will-writing-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html"
]

print("=== VERIFYING JSON-LD FAQ ACCURACY AGAINST HTML CONTENT ===")

for p in pages:
    content = (PROJECT_ROOT / p).read_text(encoding="utf-8")
    
    # Extract JSON-LD FAQs
    json_faqs = []
    for m in re.finditer(r"<script[^>]*type=[\"\x27]application/ld\+json[\"\x27][^>]*>(.*?)</script>", content, re.DOTALL | re.IGNORECASE):
        raw = m.group(1).strip()
        parsed = json.loads(raw)
        entities = parsed.get("@graph", [parsed]) if isinstance(parsed, dict) else parsed
        for ent in entities:
            if ent.get("@type") == "FAQPage":
                for q in ent.get("mainEntity", []):
                    json_faqs.append({
                        "q": q.get("name", "").strip(),
                        "a": q.get("acceptedAnswer", {}).get("text", "").strip()
                    })

    print("\n" + "="*70)
    print("PAGE: {}".format(p))
    print("Found {} FAQ items in JSON-LD:".format(len(json_faqs)))
    
    for i, jf in enumerate(json_faqs):
        q = jf["q"]
        a = jf["a"]
        print("  [{}] Q: {}".format(i+1, q))
        print("      A: {}".format(a[:100] + ("..." if len(a) > 100 else "")))
        
        # Check if the text of answer or key phrases appear in the page body HTML
        # extract words from answer
        words = [w for w in re.findall(r"\w+", a.lower()) if len(w) > 4]
        match_count = sum(1 for w in words if w in content.lower())
        pct = (match_count / len(words) * 100) if words else 100
        print("      On-Page Text Match Ratio: {:.1f}% ({}/{} substantive words found in body)".format(pct, match_count, len(words)))

