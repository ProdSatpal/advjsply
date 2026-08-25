#!/usr/bin/env python3
"""
Extended Edge Case & Schema.org Semantic Validator for AdvJsply
Written by empirical_challenger #1
"""

import os
import sys
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from datetime import datetime

WORKSPACE_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")
DOMAIN = "https://advocatejsply.com"

EXPECTED_PAGES = [
    "index.html",
    "about.html",
    "services.html",
    "legal-notices.html",
    "contact.html",
    "notice.html",
    "blogs.html",
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
    "blogs/annulment-divorce-guide-nagpur.html",
    "blogs/common-mistakes-legal-notice.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html",
]

def run_extended_stress():
    print("=" * 80)
    print(" EXTENDED ADVERSARIAL EDGE CASE VALIDATION")
    print("=" * 80)

    passed = 0
    failed = 0
    failures = []

    def check(cond, name, msg=""):
        nonlocal passed, failed
        if cond:
            passed += 1
        else:
            failed += 1
            f_str = f"[{name}] {msg}"
            failures.append(f_str)
            print(f"[-] FAIL: {f_str}")

    # 1. Check for Leaked Head tags in Body
    print("\n[Edge Case 1] Checking for Leaked Head Tags in Body...")
    for rel_path in EXPECTED_PAGES:
        file_path = WORKSPACE_ROOT / rel_path
        content = file_path.read_text(encoding="utf-8")
        
        parts = re.split(r"</head>", content, flags=re.IGNORECASE)
        check(len(parts) == 2, "HeadBodyBoundary", f"{rel_path} does not have exactly one </head> split (got {len(parts)-1})")
        if len(parts) == 2:
            head_part, body_part = parts[0], parts[1]
            check("<title" not in body_part.lower(), "NoTitleInBody", f"{rel_path} has <title> in <body>")
            check('rel="canonical"' not in body_part.lower() and "rel='canonical'" not in body_part.lower(), "NoCanonicalInBody", f"{rel_path} has canonical link in <body>")
            check('property="og:' not in body_part.lower() and "property='og:" not in body_part.lower(), "NoOgInBody", f"{rel_path} has OpenGraph tag in <body>")
            check('name="twitter:' not in body_part.lower() and "name='twitter:" not in body_part.lower(), "NoTwitterInBody", f"{rel_path} has Twitter tag in <body>")

    # 2. Check ISO 8601 Date Formats in Schemas
    print("\n[Edge Case 2] Checking Schema.org Date Formats and URLs...")
    date_regex = re.compile(r"^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z))?$")
    for rel_path in EXPECTED_PAGES:
        file_path = WORKSPACE_ROOT / rel_path
        content = file_path.read_text(encoding="utf-8")
        
        for m in re.finditer(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', content, re.DOTALL | re.IGNORECASE):
            raw_json = m.group(1).strip()
            data = json.loads(raw_json)
            
            def scan_entity(ent):
                if isinstance(ent, dict):
                    for d_field in ["datePublished", "dateModified"]:
                        if d_field in ent:
                            val = ent[d_field]
                            check(bool(date_regex.match(val)), "IsoDateValid", f"{rel_path} {d_field}='{val}' invalid ISO date format")
                    for u_field in ["@id", "url", "mainEntityOfPage"]:
                        if u_field in ent:
                            val = ent[u_field]
                            if isinstance(val, str):
                                check(val.startswith("https://") or val.startswith("http://") or val.startswith("#"), "ValidSchemaUrl", f"{rel_path} {u_field}='{val}' not valid absolute URL")
                            elif isinstance(val, dict) and "@id" in val:
                                check(val["@id"].startswith("https://") or val["@id"].startswith("http://"), "ValidSchemaUrlId", f"{rel_path} {u_field}['@id']='{val['@id']}' not valid absolute URL")
                    for v in ent.values():
                        scan_entity(v)
                elif isinstance(ent, list):
                    for item in ent:
                        scan_entity(item)

            scan_entity(data)

    # 3. Check All Internal Hyperlinks
    print("\n[Edge Case 3] Checking All Internal HTML Navigation and Anchor Links...")
    link_regex = re.compile(r'<a\s+[^>]*href=["\']([^"\']+)["\']', re.IGNORECASE)
    for rel_path in EXPECTED_PAGES:
        file_path = WORKSPACE_ROOT / rel_path
        content = file_path.read_text(encoding="utf-8")
        parent_dir = file_path.parent

        for match in link_regex.finditer(content):
            href = match.group(1).strip()
            if not href or href.startswith("#") or href.startswith("tel:") or href.startswith("mailto:") or href.startswith("javascript:") or href.startswith("https://") or href.startswith("http://"):
                continue
            
            clean_href = href.split("?")[0].split("#")[0]
            if clean_href:
                if clean_href.startswith("/"):
                    target_path = WORKSPACE_ROOT / clean_href.lstrip("/")
                else:
                    target_path = (parent_dir / clean_href).resolve()
                check(target_path.exists(), "InternalLinkResolution", f"{rel_path} has broken internal link href='{href}' (resolved to {target_path})")

    # 4. Check CSS and JS Asset Resolution
    print("\n[Edge Case 4] Checking CSS and JS Asset Resolution...")
    css_regex = re.compile(r'<link\s+[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\']', re.IGNORECASE)
    js_regex = re.compile(r'<script\s+[^>]*src=["\']([^"\']+)["\']', re.IGNORECASE)

    for rel_path in EXPECTED_PAGES:
        file_path = WORKSPACE_ROOT / rel_path
        content = file_path.read_text(encoding="utf-8")
        parent_dir = file_path.parent

        for match in css_regex.finditer(content):
            href = match.group(1).strip()
            if not href.startswith("http://") and not href.startswith("https://"):
                clean_href = href.split("?")[0].split("#")[0]
                if clean_href.startswith("/"):
                    target_path = WORKSPACE_ROOT / clean_href.lstrip("/")
                else:
                    target_path = (parent_dir / clean_href).resolve()
                check(target_path.is_file(), "StylesheetExists", f"{rel_path} references missing stylesheet href='{href}'")

        for match in js_regex.finditer(content):
            src = match.group(1).strip()
            if not src.startswith("http://") and not src.startswith("https://"):
                clean_src = src.split("?")[0].split("#")[0]
                if clean_src.startswith("/"):
                    target_path = WORKSPACE_ROOT / clean_src.lstrip("/")
                else:
                    target_path = (parent_dir / clean_src).resolve()
                check(target_path.is_file(), "ScriptSrcExists", f"{rel_path} references missing script src='{src}'")

    print("\n" + "=" * 80)
    print(f" EXTENDED STRESS TEST SUMMARY")
    print(f" Total Checked : {passed + failed}")
    print(f" Passed        : {passed}")
    print(f" Failed        : {failed}")
    print("=" * 80)

    return {"passed": passed, "failed": failed, "failures": failures}


if __name__ == "__main__":
    r = run_extended_stress()
    sys.exit(1 if r["failed"] > 0 else 0)
