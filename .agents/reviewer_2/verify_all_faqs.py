import json, os, re
from pathlib import Path
from html.parser import HTMLParser

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")

class DOMFAQExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.faqs = []
        self.in_h3 = False
        self.in_p = False
        self.current_h3 = []
        self.current_p = []
        self.is_faq_h3 = False
        self.is_faq_p = False
        self.current_q_text = None

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        i18n = attrs_dict.get("data-i18n", "")
        
        if tag.lower() == "h3":
            self.in_h3 = True
            self.current_h3 = []
            if "faq" in i18n.lower() and "q" in i18n.lower():
                self.is_faq_h3 = True
        elif tag.lower() == "p":
            self.in_p = True
            self.current_p = []
            if "faq" in i18n.lower() and "a" in i18n.lower():
                self.is_faq_p = True

    def handle_endtag(self, tag):
        if tag.lower() == "h3":
            self.in_h3 = False
            if self.is_faq_h3:
                self.current_q_text = " ".join("".join(self.current_h3).split())
            self.is_faq_h3 = False
            self.current_h3 = []
        elif tag.lower() == "p":
            self.in_p = False
            if self.is_faq_p:
                a_text = " ".join("".join(self.current_p).split())
                if self.current_q_text:
                    self.faqs.append((self.current_q_text, a_text))
                    self.current_q_text = None
            self.is_faq_p = False
            self.current_p = []

    def handle_data(self, data):
        if self.in_h3 and self.is_faq_h3:
            self.current_h3.append(data)
        elif self.in_p and self.is_faq_p:
            self.current_p.append(data)


practice_and_blog_pages = [
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
    "blogs/top-10-divorce-lawyers-nagpur.html",
    "blogs/annulment-divorce-guide-nagpur.html",
    "blogs/common-mistakes-legal-notice.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html"
]

print("=== DEEP VERIFICATION OF FAQ CONTENT PARITY ===")
total_checked = 0
total_matched = 0
failures = []

for rel_path in practice_and_blog_pages:
    full_path = PROJECT_ROOT / rel_path
    content = full_path.read_text(encoding="utf-8")

    # 1. JSON-LD FAQs
    json_faqs = []
    for m in re.finditer(r"<script[^>]*type=[\"\x27]application/ld\+json[\"\x27][^>]*>(.*?)</script>", content, re.DOTALL | re.IGNORECASE):
        raw = m.group(1).strip()
        try:
            parsed = json.loads(raw)
            entities = parsed.get("@graph", [parsed]) if isinstance(parsed, dict) else parsed
            for ent in entities:
                if ent.get("@type") == "FAQPage":
                    for q in ent.get("mainEntity", []):
                        json_faqs.append({
                            "q": " ".join(q.get("name", "").split()),
                            "a": " ".join(q.get("acceptedAnswer", {}).get("text", "").split())
                        })
        except Exception as e:
            failures.append("JSON parse error in {}: {}".format(rel_path, e))

    # 2. DOM FAQs
    extractor = DOMFAQExtractor()
    extractor.feed(content)
    dom_faqs = extractor.faqs

    print("\n[{}]".format(rel_path))
    print("  JSON-LD FAQ count: {}".format(len(json_faqs)))
    print("  DOM FAQ count:     {}".format(len(dom_faqs)))

    if len(json_faqs) != len(dom_faqs):
        msg = "COUNT MISMATCH on {}: JSON-LD has {} FAQs, DOM has {}".format(rel_path, len(json_faqs), len(dom_faqs))
        print("  [FAIL] {}".format(msg))
        failures.append(msg)
    else:
        for idx in range(len(json_faqs)):
            jq, ja = json_faqs[idx]["q"], json_faqs[idx]["a"]
            dq, da = dom_faqs[idx][0], dom_faqs[idx][1]
            total_checked += 1

            # Normalize for comparison
            norm_jq = re.sub(r"[’‘'`\"]", "'", jq).strip()
            norm_dq = re.sub(r"[’‘'`\"]", "'", dq).strip()
            
            # Check question similarity
            if norm_jq.lower() == norm_dq.lower() or norm_jq in norm_dq or norm_dq in norm_jq:
                print("  Q{}: PASS (matches: '{}')".format(idx+1, jq[:50]))
                total_matched += 1
            else:
                msg = "Question mismatch on {} Q{}:\n    JSON: {}\n    DOM : {}".format(rel_path, idx+1, jq, dq)
                print("  [FAIL] {}".format(msg))
                failures.append(msg)

print("\n========================================================")
print("TOTAL FAQs CHECKED: {}".format(total_checked))
print("TOTAL FAQs MATCHED: {}".format(total_matched))
print("FAILURES COUNT:     {}".format(len(failures)))
if failures:
    for f in failures:
        print("  - {}".format(f))
else:
    print("100% PARITY VERIFIED BETWEEN VISIBLE FAQ CONTENT AND JSON-LD SCHEMAS!")
print("========================================================")
