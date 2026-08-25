#!/usr/bin/env python3
"""
Deep FAQ & Structured Data Inspector
Examines every page for visible FAQ sections and compares them with JSON-LD FAQPage.
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

def get_page_jsonld_nodes(html_text):
    nodes = []
    scripts = re.findall(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', html_text, re.DOTALL)
    for s in scripts:
        try:
            data = json.loads(s)
            if isinstance(data, dict):
                if "@graph" in data:
                    nodes.extend(data["@graph"])
                else:
                    nodes.append(data)
            elif isinstance(data, list):
                nodes.extend(data)
        except Exception as e:
            print(f"JSON load error: {e}")
    return nodes

def find_faq_sections_in_html(html_text):
    """
    Finds FAQ sections in HTML by looking for headings with 'FAQ' or 'Frequently Asked Questions'
    or multilingual FAQ sections, and extracting all <h3> / <h4> / question titles and <p> answer texts.
    """
    # Remove head, script, style, comments
    body_text = re.sub(r'<head.*?</head>', '', html_text, flags=re.DOTALL | re.IGNORECASE)
    body_text = re.sub(r'<script.*?</script>', '', body_text, flags=re.DOTALL | re.IGNORECASE)
    body_text = re.sub(r'<style.*?</style>', '', body_text, flags=re.DOTALL | re.IGNORECASE)
    body_text = re.sub(r'<!--.*?-->', '', body_text, flags=re.DOTALL)

    # Let's search for FAQ containers
    # E.g. glass-card or section containing "Frequently Asked Questions" or "FAQ"
    faq_blocks = []
    
    # Pattern 1: find containers with "Frequently Asked Questions" or "FAQ" in heading
    matches = re.finditer(r'<h[234][^>]*>(.*?(?:Frequently Asked Questions|FAQ|Sahi Salla).*?)</h[234]>(.*?)(?=<h[234]|\Z)', body_text, re.DOTALL | re.IGNORECASE)
    for m in matches:
        heading = re.sub(r'<[^>]+>', '', m.group(1)).strip()
        content = m.group(2)
        # find question and answer pairs
        qas = []
        # Pattern: <h3 class="...">(...)</h3>\s*<p class="...">(...)</p>
        qa_matches = re.findall(r'<h[3456][^>]*>(.*?)</h[3456]>\s*<p[^>]*>(.*?)</p>', content, re.DOTALL)
        for q, a in qa_matches:
            clean_q = " ".join(re.sub(r'<[^>]+>', '', q).split())
            clean_a = " ".join(re.sub(r'<[^>]+>', '', a).split())
            if clean_q and clean_a:
                qas.append((clean_q, clean_a))
        if qas:
            faq_blocks.append((heading, qas))
            
    # Pattern 2: accordion or border-l-4 blocks
    if not faq_blocks:
        qa_matches = re.findall(r'<div[^>]*class=["\'][^"\']*border-l-4[^"\']*["\'][^>]*>\s*<h[34][^>]*>(.*?)</h[34]>\s*<p[^>]*>(.*?)</p>', body_text, re.DOTALL)
        if qa_matches:
            qas = []
            for q, a in qa_matches:
                clean_q = " ".join(re.sub(r'<[^>]+>', '', q).split())
                clean_a = " ".join(re.sub(r'<[^>]+>', '', a).split())
                if clean_q and clean_a:
                    qas.append((clean_q, clean_a))
            if qas:
                faq_blocks.append(("Border-l-4 FAQ Container", qas))

    return faq_blocks

def inspect_all():
    pages = find_html_files()
    for p in pages:
        rel = str(p.relative_to(WORKSPACE))
        content = p.read_text(encoding="utf-8")
        nodes = get_page_jsonld_nodes(content)
        
        faq_nodes = [n for n in nodes if isinstance(n, dict) and n.get("@type") == "FAQPage"]
        faq_blocks = find_faq_sections_in_html(content)
        
        print(f"\n=======================================================")
        print(f"PAGE: {rel}")
        print(f"  JSON-LD FAQPage nodes: {len(faq_nodes)}")
        if faq_nodes:
            for item in faq_nodes[0].get("mainEntity", []):
                print(f"    [JSON-LD Q] {item.get('name')}")
                print(f"    [JSON-LD A] {item.get('acceptedAnswer', {}).get('text')[:80]}...")
        print(f"  Visible FAQ sections: {len(faq_blocks)}")
        for heading, qas in faq_blocks:
            print(f"    Section: {heading} ({len(qas)} QAs)")
            for q, a in qas:
                print(f"      [Visible Q] {q}")
                print(f"      [Visible A] {a[:80]}...")

if __name__ == "__main__":
    inspect_all()
