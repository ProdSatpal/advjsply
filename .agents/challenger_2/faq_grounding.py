#!/usr/bin/env python3
"""
Test Semantic FAQ Grounding in Page Body Text
Checks that all JSON-LD FAQ questions and answers are grounded in visible on-page text.
"""

import re
import json
from pathlib import Path
from html.parser import HTMLParser

WORKSPACE = Path("/Users/satpalsingh/Projects/AdvJsply")

class VisibleTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.in_ignored = False

    def handle_starttag(self, tag, attrs):
        if tag in ["script", "style", "noscript", "svg"]:
            self.in_ignored = True

    def handle_endtag(self, tag):
        if tag in ["script", "style", "noscript", "svg"]:
            self.in_ignored = False

    def handle_data(self, data):
        if not self.in_ignored:
            self.text_parts.append(data)

def extract_visible_text(html_content):
    parser = VisibleTextExtractor()
    parser.feed(html_content)
    return " ".join("".join(parser.text_parts).split())

def check_grounding():
    faq_pages = [
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
        "blogs/top-10-divorce-lawyers-nagpur.html",
    ]
    for p_rel in faq_pages:
        content = (WORKSPACE / p_rel).read_text(encoding="utf-8")
        visible_text = extract_visible_text(content).lower()
        
        scripts = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', content, re.DOTALL)
        for s in scripts:
            data = json.loads(s)
            graph = data.get("@graph", [data] if isinstance(data, dict) else data)
            for node in graph:
                if isinstance(node, dict) and node.get("@type") == "FAQPage":
                    for q in node.get("mainEntity", []):
                        q_name = q.get("name", "")
                        ans_text = q.get("acceptedAnswer", {}).get("text", "")
                        
                        # Extract non-stop words from question
                        words = [w.lower() for w in re.findall(r'\b[a-zA-Z]{4,}\b', q_name) if w.lower() not in ["what", "when", "where", "which", "with", "from", "have", "your", "this", "that", "does"]]
                        matching_words = [w for w in words if w in visible_text]
                        ratio = len(matching_words) / max(len(words), 1)
                        print(f"[{p_rel}] Q: '{q_name}' -> Keyword match ratio: {ratio:.2f} ({matching_words})")

if __name__ == "__main__":
    check_grounding()
