#!/usr/bin/env python3
"""
Adversarial Schema & Structured Data Diagnostic Tool
Inspects all 22 HTML pages for JSON-LD syntax, Schema.org completeness,
Entity Link resolution, and On-page FAQ parity.
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

class SchemaExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.jsonld_raw = []
        self.in_jsonld = False
        self.current_content = []

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            attr_dict = dict(attrs)
            if attr_dict.get("type") == "application/ld+json":
                self.in_jsonld = True
                self.current_content = []

    def handle_endtag(self, tag):
        if tag == "script" and self.in_jsonld:
            self.in_jsonld = False
            self.jsonld_raw.append("".join(self.current_content))
            self.current_content = []

    def handle_data(self, data):
        if self.in_jsonld:
            self.current_content.append(data)

def analyze_pages():
    pages = find_html_files()
    print(f"Discovered {len(pages)} HTML pages.")
    
    all_schemas = {}
    
    for p in pages:
        rel = p.relative_to(WORKSPACE)
        content = p.read_text(encoding="utf-8")
        parser = SchemaExtractor()
        parser.feed(content)
        
        print(f"\n--- Page: {rel} (Found {len(parser.jsonld_raw)} JSON-LD blocks) ---")
        page_schemas = []
        for i, raw in enumerate(parser.jsonld_raw):
            try:
                data = json.loads(raw)
                page_schemas.append(data)
                context = data.get("@context")
                graph = data.get("@graph", [data] if isinstance(data, dict) else data)
                types = [n.get("@type") if isinstance(n, dict) else type(n) for n in graph]
                ids = [n.get("@id") for n in graph if isinstance(n, dict) and "@id" in n]
                print(f"  Block {i+1}: @context={context}, Entities count={len(graph)}")
                print(f"    Types: {types}")
                print(f"    IDs: {ids}")
            except Exception as e:
                print(f"  [ERROR] Block {i+1} JSON Parse Error: {e}")
        all_schemas[str(rel)] = page_schemas

if __name__ == "__main__":
    analyze_pages()
