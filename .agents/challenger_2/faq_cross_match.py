#!/usr/bin/env python3
"""
Full Site FAQ Extractor & Cross-Matcher
Finds all FAQ sections across all 22 pages and tests 100% parity with JSON-LD.
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
                            q = item.get("name", "").strip()
                            ans = item.get("acceptedAnswer", {}).get("text", "").strip()
                            faqs.append((q, ans))
        except Exception as e:
            pass
    return faqs

def extract_visible_faqs_english(content):
    """
    Extracts English FAQ items from page content.
    First looks inside #content-en if multilingual, else in the main body.
    """
    body = re.sub(r'<head.*?</head>', '', content, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<script.*?</script>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.DOTALL | re.IGNORECASE)

    # Check if there is an explicit #content-en container
    en_container_match = re.search(r'id=["\']content-en["\'][^>]*>(.*?)(?=<div\s+id=["\']content-hi|\Z)', body, re.DOTALL)
    search_target = en_container_match.group(1) if en_container_match else body

    faqs = []

    # Pattern A: data-i18n="...Faq...Q..."
    # E.g. <span ... data-i18n="lnFaq1Q">Question</span> ... <p data-i18n="lnFaq1A">Answer</p>
    # Or <h3 ... data-i18n="...Q">Question</h3> ... <p data-i18n="...A">Answer</p>
    i18n_pairs = re.findall(r'<([a-z0-9]+)[^>]*data-i18n=["\']([^"\']*[Ff]aq[^"\']*[Qq][^"\']*)["\'][^>]*>(.*?)</\1>\s*<([a-z0-9]+)[^>]*data-i18n=["\']([^"\']*[Ff]aq[^"\']*[Aa][^"\']*)["\'][^>]*>(.*?)</\4>', search_target, re.DOTALL)
    if i18n_pairs:
        for tag_q, key_q, text_q, tag_a, key_a, text_a in i18n_pairs:
            q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
            a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
            if q and a:
                faqs.append((q, a))

    # Pattern B: Accordion button/span + div.faq-answer
    if not faqs:
        acc_pairs = re.findall(r'<button[^>]*toggleFaq[^>]*>\s*<span[^>]*>(.*?)</span>.*?</button>\s*<div[^>]*faq-answer[^>]*>\s*<p[^>]*>(.*?)</p>', search_target, re.DOTALL)
        for text_q, text_a in acc_pairs:
            q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
            a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
            if q and a:
                faqs.append((q, a))

    # Pattern C: Border-l-4 or glass-card with FAQ heading
    if not faqs:
        # Find FAQ heading
        faq_heading_match = re.search(r'<h[234][^>]*>(.*?(?:Frequently Asked Questions|FAQ).*?)</h[234]>(.*?)(?=<h2|<section|id=["\']content-hi|\Z)', search_target, re.DOTALL | re.IGNORECASE)
        if faq_heading_match:
            faq_section_html = faq_heading_match.group(2)
            # Find h3/h4 followed by p
            qa_matches = re.findall(r'<h[3456][^>]*>(.*?)</h[3456]>\s*<p[^>]*>(.*?)</p>', faq_section_html, re.DOTALL)
            for text_q, text_a in qa_matches:
                q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
                a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
                if q and a:
                    faqs.append((q, a))

    return faqs

def run_parity_check():
    pages = find_html_files()
    total_pages = len(pages)
    faq_pages_count = 0
    mismatches = []
    
    print(f"Checking FAQ parity across all {total_pages} pages...\n")
    
    for p in pages:
        rel = str(p.relative_to(WORKSPACE))
        content = p.read_text(encoding="utf-8")
        
        jsonld_faqs = extract_jsonld_faqs(content)
        visible_faqs = extract_visible_faqs_english(content)
        
        if jsonld_faqs or visible_faqs:
            faq_pages_count += 1
            print(f"Page: {rel}")
            print(f"  JSON-LD FAQs: {len(jsonld_faqs)}")
            print(f"  Visible FAQs: {len(visible_faqs)}")
            
            if len(jsonld_faqs) != len(visible_faqs):
                print(f"  [MISMATCH] Count difference: JSON-LD={len(jsonld_faqs)} vs Visible={len(visible_faqs)}")
                mismatches.append((rel, "COUNT_MISMATCH", len(jsonld_faqs), len(visible_faqs)))
            
            # Compare each QA
            for i in range(max(len(jsonld_faqs), len(visible_faqs))):
                jq, ja = jsonld_faqs[i] if i < len(jsonld_faqs) else ("<MISSING>", "<MISSING>")
                vq, va = visible_faqs[i] if i < len(visible_faqs) else ("<MISSING>", "<MISSING>")
                print(f"    Item {i+1}:")
                print(f"      Schema Q : {jq}")
                print(f"      Visible Q: {vq}")
                # Check semantic / substring match for Question
                # Clean punctuation for comparing
                clean_jq = re.sub(r'[^\w\s]', '', jq).lower()
                clean_vq = re.sub(r'[^\w\s]', '', vq).lower()
                if clean_jq != clean_vq:
                    # check if one contains key parts of the other
                    overlap = set(clean_jq.split()) & set(clean_vq.split())
                    print(f"      [NOTE] Question text difference (word overlap: {len(overlap)})")
                
                # Check answer
                clean_ja = " ".join(ja.split())
                clean_va = " ".join(va.split())
                if clean_ja != clean_va:
                    print(f"      [NOTE] Answer text difference:")
                    print(f"        Schema A : {clean_ja[:70]}...")
                    print(f"        Visible A: {clean_va[:70]}...")
            print()

    print(f"Total pages with FAQs: {faq_pages_count} / {total_pages}")
    print(f"Total count mismatches: {len(mismatches)}")

if __name__ == "__main__":
    run_parity_check()
