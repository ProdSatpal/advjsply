import json, os, re
from pathlib import Path
from html.parser import HTMLParser

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")

class FAQExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_faq_section = False
        self.in_summary = False
        self.in_details = False
        self.in_faq_item = False
        self.current_q = []
        self.current_a = []
        self.extracted_faqs = []
        self.in_q_tag = False
        self.in_a_tag = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        tag_lower = tag.lower()
        cls = attrs_dict.get("class", "").lower()
        id_attr = attrs_dict.get("id", "").lower()
        
        if "faq" in id_attr or "faq" in cls or "accordion" in cls:
            self.in_faq_section = True

        if tag_lower == "summary":
            self.in_summary = True
            self.current_q = []
        elif tag_lower == "details":
            self.in_details = True
            self.current_a = []
        elif "accordion-button" in cls or "faq-question" in cls:
            self.in_q_tag = True
            self.current_q = []
        elif "accordion-body" in cls or "faq-answer" in cls:
            self.in_a_tag = True
            self.current_a = []

    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower == "summary":
            self.in_summary = False
        elif tag_lower == "details":
            self.in_details = False
            q_text = " ".join("".join(self.current_q).split())
            a_text = " ".join("".join(self.current_a).split())
            if q_text:
                self.extracted_faqs.append((q_text, a_text))
            self.current_q = []
            self.current_a = []
        elif self.in_q_tag:
            self.in_q_tag = False
        elif self.in_a_tag:
            self.in_a_tag = False
            q_text = " ".join("".join(self.current_q).split())
            a_text = " ".join("".join(self.current_a).split())
            if q_text:
                self.extracted_faqs.append((q_text, a_text))
            self.current_q = []
            self.current_a = []

    def handle_data(self, data):
        if self.in_summary or self.in_q_tag:
            self.current_q.append(data)
        elif (self.in_details and not self.in_summary) or self.in_a_tag:
            self.current_a.append(data)

html_files = []
for root, _, files in os.walk(PROJECT_ROOT):
    if "/." in root: continue
    for f in files:
        if f.endswith(".html"):
            html_files.append(os.path.relpath(os.path.join(root, f), PROJECT_ROOT))

print("=== CHECKING FAQ PARITY ACROSS ALL HTML PAGES ===")
for rel_path in sorted(html_files):
    full_path = PROJECT_ROOT / rel_path
    with open(full_path, "r", encoding="utf-8") as fp:
        content = fp.read()

    # JSON-LD FAQs
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
            print("Error parsing JSON-LD in {}: {}".format(rel_path, e))

    extractor = FAQExtractor()
    extractor.feed(content)
    visible_faqs = extractor.extracted_faqs

    print("\n------------------------------------------------------------")
    print("Page: {}".format(rel_path))
    print("  JSON-LD FAQs Count: {}".format(len(json_faqs)))
    print("  Visible DOM FAQs Count: {}".format(len(visible_faqs)))

    if len(json_faqs) != len(visible_faqs):
        print("  [!] COUNT DIFFERENCE: JSON-LD has {} vs DOM has {}".format(len(json_faqs), len(visible_faqs)))

    # Compare question names
    for i, jf in enumerate(json_faqs):
        dom_q = visible_faqs[i][0] if i < len(visible_faqs) else "NONE"
        print("  Item {}:".format(i+1))
        print("    JSON Q: {}".format(jf["q"]))
        print("    DOM  Q: {}".format(dom_q))
        # check match
        clean_j = re.sub(r"[^\w\s]", "", jf["q"]).lower().strip()
        clean_d = re.sub(r"[^\w\s]", "", dom_q).lower().strip()
        if clean_j in clean_d or clean_d in clean_j:
            print("    -> Question match: OK")
        else:
            print("    -> [!] Question match: MISMATCH")

