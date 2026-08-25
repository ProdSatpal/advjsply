#!/usr/bin/env python3
"""
FAQ Parity Diagnostic Tool
Extracts visible FAQ items from HTML markup and compares against JSON-LD FAQPage.
"""

import os
import re
import json
from pathlib import Path
from html.parser import HTMLParser

WORKSPACE = Path("/Users/satpalsingh/Projects/AdvJsply")

def find_html_files():
    html_files = []
    for root, _, files in os.walk(WORKSPACE):
        if ".agents" in root or ".git" in root or "tests" in root:
            continue
        for f in files:
            if f.endswith(".html"):
                html_files.append(Path(root) / f)
    return sorted(html_files)

class VisibleFAQExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = False
        self.in_script = False
        self.in_style = False
        
        # Track elements that look like FAQ questions
        self.current_tag = None
        self.current_attrs = {}
        self.capture_text = False
        self.text_buffer = []
        
        self.questions = []
        self.answers = []
        
        # State machine for FAQ detection
        self.in_faq_section = False
        self.in_question = False
        self.in_answer = False

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        if tag == "head":
            self.in_head = True
        elif tag in ["script", "style"]:
            self.in_script = True

        # Check for FAQ container or elements
        data_i18n = attr_dict.get("data-i18n", "")
        elem_id = attr_dict.get("id", "")
        elem_class = attr_dict.get("class", "")
        
        # Check FAQ patterns in data-i18n or class or headers
        if "faq" in data_i18n.lower() or "faq" in elem_id.lower() or "faq" in elem_class.lower():
            if "faq" in data_i18n.lower():
                if data_i18n.lower().endswith("q") or "question" in data_i18n.lower():
                    self.in_question = True
                    self.text_buffer = []
                elif data_i18n.lower().endswith("a") or "answer" in data_i18n.lower():
                    self.in_answer = True
                    self.text_buffer = []

        # Also detect h3/h4/details/summary/button in FAQ sections or with FAQ classes
        if not self.in_head and not self.in_script:
            if tag in ["h3", "h4", "summary", "button", "p", "div"]:
                if re.search(r'faq.*q|question', data_i18n, re.I):
                    self.in_question = True
                    self.text_buffer = []
                elif re.search(r'faq.*a|answer', data_i18n, re.I):
                    self.in_answer = True
                    self.text_buffer = []

    def handle_endtag(self, tag):
        if tag == "head":
            self.in_head = False
        elif tag in ["script", "style"]:
            self.in_script = False
            
        if self.in_question:
            txt = " ".join("".join(self.text_buffer).split())
            if txt:
                self.questions.append(txt)
            self.in_question = False
            self.text_buffer = []
            
        if self.in_answer:
            txt = " ".join("".join(self.text_buffer).split())
            if txt:
                self.answers.append(txt)
            self.in_answer = False
            self.text_buffer = []

    def handle_data(self, data):
        if self.in_question or self.in_answer:
            self.text_buffer.append(data)

def extract_jsonld_faqs(content):
    faqs = []
    scripts = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', content, re.DOTALL)
    for s in scripts:
        try:
            data = json.loads(s)
            graph = data.get("@graph", [data] if isinstance(data, dict) else data)
            for node in graph:
                if isinstance(node, dict) and node.get("@type") == "FAQPage":
                    for item in node.get("mainEntity", []):
                        if isinstance(item, dict) and item.get("@type") == "Question":
                            q = item.get("name", "")
                            ans = item.get("acceptedAnswer", {}).get("text", "")
                            faqs.append((q, ans))
        except Exception as e:
            pass
    return faqs

def check_all_faqs():
    pages = find_html_files()
    for p in pages:
        rel = p.relative_to(WORKSPACE)
        content = p.read_text(encoding="utf-8")
        
        jsonld_faqs = extract_jsonld_faqs(content)
        
        # Let's also do a broader regex check for visible FAQ headers or data-i18n
        parser = VisibleFAQExtractor()
        parser.feed(content)
        
        # Also check all occurrences of data-i18n="*Faq*Q*" or similar
        regex_q_matches = re.findall(r'<([^>]+data-i18n=["\'][^"\']*[Ff]aq[^"\']*[Qq][^"\']*["\'][^>]*)>(.*?)</\w+>', content, re.DOTALL)
        regex_q_clean = []
        for tag_str, inner in regex_q_matches:
            # remove any nested tags
            clean = re.sub(r'<[^>]+>', '', inner)
            clean = " ".join(clean.split())
            if clean:
                regex_q_clean.append(clean)

        print(f"\n=== Page: {rel} ===")
        print(f"  JSON-LD FAQs count: {len(jsonld_faqs)}")
        for i, (q, a) in enumerate(jsonld_faqs):
            print(f"    Schema Q{i+1}: {q}")
        
        print(f"  Parser Visible FAQs count: {len(parser.questions)}")
        for i, q in enumerate(parser.questions):
            print(f"    Parser Q{i+1}: {q}")
            
        print(f"  Regex data-i18n FAQ questions count: {len(regex_q_clean)}")
        for i, q in enumerate(regex_q_clean):
            print(f"    Regex Q{i+1}: {q}")

if __name__ == "__main__":
    check_all_faqs()
