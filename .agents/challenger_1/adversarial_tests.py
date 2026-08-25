#!/usr/bin/env python3
"""
Comprehensive Adversarial Verification & Stress Test Harness for AdvJsply SEO
==============================================================================
Author: empirical_challenger #1 (Teamwork Agent)
Location: /Users/satpalsingh/Projects/AdvJsply/.agents/challenger_1/adversarial_tests.py

Probes:
1. Complete HTML <head> metadata integrity across all 22 pages (no missing, no duplicate, no malformed, length bounds).
2. Social media card rendering: every og:image and twitter:image asset on disk, valid magic byte headers, non-zero sizes.
3. Canonical URL consistency: exact match between <link rel="canonical">, <meta property="og:url">, and sitemap.xml <loc>.
4. robots.txt grammar, crawler access, and sitemap reference.
5. Schema.org JSON-LD structured data validation against Google Search Central requirements.
6. Content Preservation: SHA-256 fingerprinting of user-visible body text with zero regressions.
"""

import os
import sys
import json
import re
import hashlib
import struct
import urllib.parse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

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

BASELINE_HASHES = {
    "about.html": "41d17bdaed022f7fc30402e0459b8cc3469d132da660f7a4b85ada128e178105",
    "blogs.html": "47774e190de5350e1da346962257be3ff8fdb59170ad961806654031128e481a",
    "blogs/annulment-divorce-guide-nagpur.html": "f4fdb5306f1b693a71499f5ef35f35cf88055d3af270c34ecff216a5b233dd5d",
    "blogs/common-mistakes-legal-notice.html": "0597892441dd15c9a5e6fe145d7f095f5541487e8fe2d9c04116b34b81183b81",
    "blogs/maharashtra-new-advocate-general.html": "c0bc2d773dd83952498b609769a39a200e1128e8dddaebd94f55bc4aa4d1ebc0",
    "blogs/sale-deed-registration-guide-nagpur.html": "9c201f94d3d49c69a6ac100a0bd3ed655f50ee7048a932d39b6bd93862109ddc",
    "blogs/top-10-divorce-lawyers-nagpur.html": "f067393a8dcd9926e2c23dd3212e1cac788f7b284f6c5fbd4463aeb0cdcbcf37",
    "contact.html": "26d1b1fad97447394cc16a8c667889cabcca339ad512f19305de1d4114ffa9b3",
    "divorce-lawyer-nagpur.html": "a1ea50a4ba28d53f30b8c53eba61db7b8fe29f4de620cd8b8ca9b572f5af9270",
    "domestic-violence-lawyer-nagpur.html": "89f74e4d7cdde207b8ff4b3ae94574a9b5c2927514622b21131de1d8ddd06ef2",
    "index.html": "e9f13bb76f5b1745d724fc9f73896711f6035b14cc359545fed44ab38633f2f7",
    "legal-agreements-nagpur.html": "acd75c79913f388bdfea398c39324c5b24c3fdf7746a6555453be2218c72f274",
    "legal-notice-service-nagpur.html": "31e0d48864ce2adaf3b330a26daced1f5e1ef5cd489cf1aa8abefe1350768913",
    "legal-notices.html": "5ea640f64d3ed5a443e11a88a81831e1907fd852ea5541eca888a3a19600d55d",
    "marriage-registration-lawyer-nagpur.html": "e205b41055906cbbeb845381c123e6d090c0d9875949d2ac9111486b26e42e89",
    "mutual-divorce-lawyer-nagpur.html": "c3be1db1669ee36e1ffc15762855eaf427be6a51f1df1a19740b786d9a2ccf25",
    "notice.html": "c31a3091e4e3d0d686ab0440ad4eb785aa6bbdfb4e21e8717f3c364239f9f6ac",
    "partnership-deeds-nagpur.html": "903b5bd3f8816be0d2df17de52a66a9f18f959ee2cc11001a82ddda80000d53c",
    "property-disputes-nagpur.html": "5a7242011abe26f6433a20d3c32adbdf8424601efacec2023dde7ef969708aac",
    "property-registry-nagpur.html": "d3b79c905559ce2006e395ca451eee14f88458578cba988b9cbf780512fc93dd",
    "services.html": "82fbc2230b5fc49c7559d40bb8f8cdf52c92235b77f5d0a1153a0f3bc66f4d41",
    "will-writing-nagpur.html": "ec6bd470142df36d066c55f09cb5fcc3548e35847649dc55c97866c3ad78dba9",
}


class RigorousHTMLParser(HTMLParser):
    def __init__(self, rel_path: str):
        super().__init__()
        self.rel_path = rel_path
        self.head_count = 0
        self.in_head = False
        self.in_body = False
        self.in_title = False
        self.in_script = False
        self.script_type = None
        self.ignore_depth = 0
        self.ignore_tags = {"script", "style", "noscript", "svg", "canvas", "iframe"}

        self.html_attrs = {}
        self.titles = []
        self.meta_tags = []
        self.link_tags = []
        self.jsonld_raw_scripts = []
        self.body_chunks = []
        self.h1_tags = []
        self.h2_tags = []
        self.in_h1 = False
        self.in_h2 = False
        self.current_h1 = []
        self.current_h2 = []

        self._current_title = []
        self._current_script = []

    def handle_starttag(self, tag, attrs):
        attr_dict = {k.lower(): (v or "") for k, v in attrs}
        tag_lower = tag.lower()

        if tag_lower == "html":
            self.html_attrs = attr_dict
        elif tag_lower == "head":
            self.head_count += 1
            self.in_head = True
        elif tag_lower == "body":
            self.in_body = True
        elif tag_lower == "title" and self.in_head:
            self.in_title = True
            self._current_title = []
        elif tag_lower == "meta" and self.in_head:
            self.meta_tags.append(attr_dict)
        elif tag_lower == "link" and self.in_head:
            self.link_tags.append(attr_dict)
        elif tag_lower == "script":
            self.in_script = True
            self.script_type = attr_dict.get("type", "").lower()
            self._current_script = []
            if self.in_body:
                self.ignore_depth += 1
        elif self.in_body and tag_lower in self.ignore_tags:
            self.ignore_depth += 1
        elif tag_lower == "h1" and self.in_body:
            self.in_h1 = True
            self.current_h1 = []
        elif tag_lower == "h2" and self.in_body:
            self.in_h2 = True
            self.current_h2 = []

    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower == "head":
            self.in_head = False
        elif tag_lower == "body":
            self.in_body = False
        elif tag_lower == "title" and self.in_head:
            self.in_title = False
            self.titles.append("".join(self._current_title).strip())
        elif tag_lower == "script":
            if self.script_type == "application/ld+json":
                raw = "".join(self._current_script).strip()
                if raw:
                    self.jsonld_raw_scripts.append(raw)
            self.in_script = False
            self.script_type = None
            if self.in_body:
                self.ignore_depth = max(0, self.ignore_depth - 1)
        elif self.in_body and tag_lower in self.ignore_tags:
            self.ignore_depth = max(0, self.ignore_depth - 1)
        elif tag_lower == "h1":
            self.in_h1 = False
            self.h1_tags.append("".join(self.current_h1).strip())
        elif tag_lower == "h2":
            self.in_h2 = False
            self.h2_tags.append("".join(self.current_h2).strip())

    def handle_data(self, data):
        if self.in_title:
            self._current_title.append(data)
        elif self.in_script and self.script_type == "application/ld+json":
            self._current_script.append(data)
        elif self.in_body and self.ignore_depth == 0:
            self.body_chunks.append(data)
            if self.in_h1:
                self.current_h1.append(data)
            if self.in_h2:
                self.current_h2.append(data)


def parse_page_rigorous(rel_path: str):
    file_path = WORKSPACE_ROOT / rel_path
    with open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()

    parser = RigorousHTMLParser(rel_path)
    parser.feed(content)

    raw_text = " ".join(parser.body_chunks)
    normalized_text = re.sub(r"\s+", " ", raw_text).strip()
    body_hash = hashlib.sha256(normalized_text.encode("utf-8")).hexdigest()

    return {
        "rel_path": rel_path,
        "content": content,
        "html_attrs": parser.html_attrs,
        "head_count": parser.head_count,
        "titles": parser.titles,
        "meta_tags": parser.meta_tags,
        "link_tags": parser.link_tags,
        "jsonld_raw_scripts": parser.jsonld_raw_scripts,
        "visible_body_text": normalized_text,
        "body_hash": body_hash,
        "h1_tags": parser.h1_tags,
        "h2_tags": parser.h2_tags,
    }


def get_image_info(filepath: Path):
    """Inspects image binary header to verify validity, format, and dimensions."""
    size = filepath.stat().st_size
    with open(filepath, "rb") as f:
        head = f.read(32)

    fmt = "UNKNOWN"
    width, height = None, None

    if head.startswith(b"\x89PNG\r\n\x1a\n"):
        fmt = "PNG"
        if len(head) >= 24:
            width, height = struct.unpack(">II", head[16:24])
    elif head.startswith(b"\xff\xd8\xff"):
        fmt = "JPEG"
    elif head.startswith(b"RIFF") and b"WEBP" in head:
        fmt = "WEBP"
    elif b"<svg" in head:
        fmt = "SVG"

    return {"format": fmt, "size": size, "width": width, "height": height}


def run_all_adversarial_tests():
    print("=" * 80)
    print(" EMPIRICAL CHALLENGER #1 — ADVERSARIAL STRESS TEST HARNESS")
    print(" Project Root :", WORKSPACE_ROOT)
    print("=" * 80)

    stats = {"total": 0, "passed": 0, "failed": 0, "failures": []}

    def assert_true(cond: bool, test_name: str, msg: str = ""):
        stats["total"] += 1
        if cond:
            stats["passed"] += 1
        else:
            stats["failed"] += 1
            fail_str = f"[{test_name}] {msg}"
            stats["failures"].append(fail_str)
            print(f"[-] FAIL: {fail_str}")

    # =========================================================================
    # SUITE 1: FILE INVENTORY & PARSING
    # =========================================================================
    print("\n--- SUITE 1: Disk File Inventory & HTML Structure ---")
    pages_data = {}
    for p in EXPECTED_PAGES:
        file_p = WORKSPACE_ROOT / p
        assert_true(file_p.exists() and file_p.is_file(), "FileExistence", f"Expected file {p} does not exist")
        try:
            pages_data[p] = parse_page_rigorous(p)
            assert_true(True, "FileParse", f"Parsed {p}")
        except Exception as e:
            assert_true(False, "FileParse", f"Failed to parse {p}: {e}")

    # =========================================================================
    # SUITE 2: METADATA INTEGRITY (NO DUPLICATES, VALID BOUNDS, CONTRACT)
    # =========================================================================
    print("\n--- SUITE 2: HTML Head Metadata Contract & Boundary Testing ---")
    all_titles = {}
    all_descriptions = {}
    all_canonicals = {}
    all_og_urls = {}

    for rel_path, data in pages_data.items():
        # Head count
        assert_true(data["head_count"] == 1, "SingleHead", f"{rel_path} has {data['head_count']} <head> tags")

        # HTML Lang
        lang = data["html_attrs"].get("lang", "")
        assert_true(lang == "en-IN", "HtmlLang", f"{rel_path} has lang='{lang}' (expected 'en-IN')")

        # Charset
        charsets = [m.get("charset") for m in data["meta_tags"] if "charset" in m]
        assert_true(len(charsets) == 1, "SingleCharset", f"{rel_path} has {len(charsets)} charset declarations")
        if charsets:
            assert_true(charsets[0].upper() == "UTF-8", "CharsetUTF8", f"{rel_path} charset is '{charsets[0]}'")

        # Viewport
        viewports = [m.get("content", "") for m in data["meta_tags"] if m.get("name") == "viewport"]
        assert_true(len(viewports) == 1, "SingleViewport", f"{rel_path} has {len(viewports)} viewport tags")
        if viewports:
            assert_true("width=device-width" in viewports[0], "ResponsiveViewport", f"{rel_path} viewport='{viewports[0]}'")

        # Title Tag
        assert_true(len(data["titles"]) == 1, "SingleTitle", f"{rel_path} has {len(data['titles'])} <title> tags")
        if data["titles"]:
            title = data["titles"][0]
            assert_true(10 <= len(title) <= 60, "TitleLengthBounds", f"{rel_path} title length is {len(title)} ('{title}')")
            assert_true("undefined" not in title.lower() and "placeholder" not in title.lower(), "TitleNoPlaceholder", f"{rel_path} title has placeholder")
            assert_true(not title.endswith("..."), "TitleNoEllipsisTruncation", f"{rel_path} title ends with '...'")
            all_titles[rel_path] = title

        # Meta Description
        descs = [m.get("content", "") for m in data["meta_tags"] if m.get("name") == "description"]
        assert_true(len(descs) == 1, "SingleMetaDescription", f"{rel_path} has {len(descs)} meta descriptions")
        if descs:
            desc = descs[0]
            assert_true(50 <= len(desc) <= 160, "DescLengthBounds", f"{rel_path} desc length is {len(desc)} ('{desc}')")
            assert_true("placeholder" not in desc.lower() and "todo" not in desc.lower(), "DescNoPlaceholder", f"{rel_path} desc has placeholder")
            assert_true(not desc.endswith("..."), "DescNoEllipsisTruncation", f"{rel_path} desc ends with '...'")
            all_descriptions[rel_path] = desc

        # Canonical Link
        canonicals = [l.get("href", "") for l in data["link_tags"] if l.get("rel") == "canonical"]
        assert_true(len(canonicals) == 1, "SingleCanonical", f"{rel_path} has {len(canonicals)} canonical links")
        if canonicals:
            c_url = canonicals[0]
            expected_canon = DOMAIN + ("/" if rel_path == "index.html" else f"/{rel_path}")
            assert_true(c_url == expected_canon, "CanonicalUrlCorrect", f"{rel_path} canonical is '{c_url}', expected '{expected_canon}'")
            all_canonicals[rel_path] = c_url

        # OpenGraph Tags
        og_dict = {}
        for m in data["meta_tags"]:
            prop = m.get("property", "")
            if prop.startswith("og:"):
                og_dict.setdefault(prop, []).append(m.get("content", ""))

        for req_prop in ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name", "og:locale"]:
            assert_true(req_prop in og_dict, "OpenGraphRequiredTag", f"{rel_path} missing {req_prop}")
            assert_true(len(og_dict.get(req_prop, [])) == 1, "OpenGraphNoDuplicate", f"{rel_path} duplicate {req_prop}: {og_dict.get(req_prop)}")

        if "og:locale" in og_dict:
            assert_true(og_dict["og:locale"][0] == "en_IN", "OpenGraphLocale", f"{rel_path} og:locale is '{og_dict['og:locale'][0]}'")

        if "og:type" in og_dict:
            expected_type = "article" if rel_path.startswith("blogs/") else "website"
            assert_true(og_dict["og:type"][0] == expected_type, "OpenGraphType", f"{rel_path} og:type is '{og_dict['og:type'][0]}' (expected '{expected_type}')")

        if "og:url" in og_dict:
            all_og_urls[rel_path] = og_dict["og:url"][0]
            assert_true(og_dict["og:url"][0] == all_canonicals.get(rel_path, ""), "OgUrlMatchesCanonical", f"{rel_path} og:url ('{og_dict['og:url'][0]}') != canonical ('{all_canonicals.get(rel_path, '')}')")

        # Twitter Card Tags
        tw_dict = {}
        for m in data["meta_tags"]:
            name = m.get("name", "")
            if name.startswith("twitter:"):
                tw_dict.setdefault(name, []).append(m.get("content", ""))

        for req_tw in ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]:
            assert_true(req_tw in tw_dict, "TwitterCardRequiredTag", f"{rel_path} missing {req_tw}")
            assert_true(len(tw_dict.get(req_tw, [])) == 1, "TwitterCardNoDuplicate", f"{rel_path} duplicate {req_tw}: {tw_dict.get(req_tw)}")

        if "twitter:card" in tw_dict:
            assert_true(tw_dict["twitter:card"][0] in ["summary_large_image", "summary"], "TwitterCardType", f"{rel_path} twitter:card is '{tw_dict['twitter:card'][0]}'")

    # Global uniqueness of titles and meta descriptions
    assert_true(len(all_titles) == 22 and len(set(all_titles.values())) == 22, "TitleUniquenessSiteWide", f"Unique titles: {len(set(all_titles.values()))}/22")
    assert_true(len(all_descriptions) == 22 and len(set(all_descriptions.values())) == 22, "DescUniquenessSiteWide", f"Unique descriptions: {len(set(all_descriptions.values()))}/22")

    # =========================================================================
    # SUITE 3: SOCIAL MEDIA ASSETS INTEGRITY & MAGIC BYTE VERIFICATION
    # =========================================================================
    print("\n--- SUITE 3: Social Media Image Assets & Binary Header Verification ---")
    image_references = set()
    for rel_path, data in pages_data.items():
        for m in data["meta_tags"]:
            if m.get("property") == "og:image" and m.get("content"):
                image_references.add((rel_path, "og:image", m["content"]))
            if m.get("name") == "twitter:image" and m.get("content"):
                image_references.add((rel_path, "twitter:image", m["content"]))

    print(f"Total social image references to verify: {len(image_references)}")
    for rel_page, tag_name, img_url in sorted(image_references):
        assert_true(img_url.startswith(DOMAIN + "/assets/images/"), "ImageUrlPrefix", f"In {rel_page} ({tag_name}): '{img_url}'")
        parsed_url = urllib.parse.urlparse(img_url)
        local_rel = parsed_url.path.lstrip("/")
        local_path = WORKSPACE_ROOT / local_rel

        assert_true(local_path.is_file(), "AssetFileExists", f"In {rel_page} ({tag_name}): local path {local_path} not found")
        if local_path.is_file():
            img_info = get_image_info(local_path)
            assert_true(img_info["size"] > 1024, "AssetNonEmptySize", f"{local_rel} size is {img_info['size']} bytes")
            assert_true(img_info["format"] in ["PNG", "JPEG", "WEBP"], "AssetValidImageFormat", f"{local_rel} format is '{img_info['format']}'")

    # =========================================================================
    # SUITE 4: SITEMAP.XML & ROBOTS.TXT DIRECTIVES & CANONICAL CONSISTENCY
    # =========================================================================
    print("\n--- SUITE 4: Sitemap.xml & Robots.txt Cross-Validation ---")
    sitemap_path = WORKSPACE_ROOT / "sitemap.xml"
    assert_true(sitemap_path.is_file(), "SitemapFileExists", "sitemap.xml not found")

    sitemap_locs = set()
    if sitemap_path.is_file():
        try:
            tree = ET.parse(sitemap_path)
            root = tree.getroot()
            ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
            urls = root.findall("sm:url", ns)
            assert_true(len(urls) == 22, "SitemapUrlCount", f"sitemap.xml has {len(urls)} entries (expected 22)")

            for u in urls:
                loc = u.find("sm:loc", ns)
                lastmod = u.find("sm:lastmod", ns)
                changefreq = u.find("sm:changefreq", ns)
                priority = u.find("sm:priority", ns)

                assert_true(loc is not None and bool(loc.text), "SitemapLocNonEmpty", "URL entry missing <loc>")
                if loc is not None and loc.text:
                    loc_str = loc.text.strip()
                    sitemap_locs.add(loc_str)
                    assert_true(loc_str.startswith(DOMAIN), "SitemapLocDomain", f"Loc '{loc_str}' missing domain")

                assert_true(lastmod is not None and lastmod.text.strip() == "2026-08-25", "SitemapLastmod2026", f"lastmod is '{lastmod.text if lastmod is not None else None}'")
                if changefreq is not None and changefreq.text:
                    assert_true(changefreq.text.strip() in ["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"], "SitemapChangefreqValid", f"changefreq: {changefreq.text}")
                if priority is not None and priority.text:
                    p_val = float(priority.text.strip())
                    assert_true(0.0 <= p_val <= 1.0, "SitemapPriorityValid", f"priority: {p_val}")

            # 1-to-1 bijection between canonicals and sitemap <loc>
            canon_set = set(all_canonicals.values())
            assert_true(sitemap_locs == canon_set, "SitemapCanonicalBijection", f"Sitemap locs vs Canonicals mismatch: diff={sitemap_locs ^ canon_set}")
            assert_true(len(sitemap_locs) == 22, "SitemapUniqueLocs", f"Found {len(sitemap_locs)} unique locs in sitemap")

        except Exception as e:
            assert_true(False, "SitemapParseError", f"Failed to parse sitemap.xml: {e}")

    # Robots.txt validation
    robots_path = WORKSPACE_ROOT / "robots.txt"
    assert_true(robots_path.is_file(), "RobotsFileExists", "robots.txt not found")
    if robots_path.is_file():
        with open(robots_path, "r", encoding="utf-8") as f:
            robots_txt = f.read()

        lines = [line.strip() for line in robots_txt.splitlines() if line.strip() and not line.strip().startswith("#")]
        assert_true("User-agent: *" in lines, "RobotsUserAgentWildcard", "robots.txt missing 'User-agent: *'")
        assert_true("Allow: /" in lines, "RobotsAllowRoot", "robots.txt missing 'Allow: /'")
        assert_true(f"Sitemap: {DOMAIN}/sitemap.xml" in lines, "RobotsSitemapDeclaration", "robots.txt missing Sitemap link")

    # =========================================================================
    # SUITE 5: SCHEMA.ORG JSON-LD STRUCTURED DATA AUDIT
    # =========================================================================
    print("\n--- SUITE 5: Deep Schema.org JSON-LD Structured Data Audit ---")
    for rel_path, data in pages_data.items():
        assert_true(len(data["jsonld_raw_scripts"]) >= 1, "JsonLdScriptBlockExists", f"{rel_path} has no JSON-LD scripts")

        all_entities = []
        for raw_json in data["jsonld_raw_scripts"]:
            try:
                parsed = json.loads(raw_json)
                assert_true(True, "JsonSyntaxValid", f"Valid JSON in {rel_path}")
            except Exception as e:
                assert_true(False, "JsonSyntaxValid", f"JSON error in {rel_path}: {e}")
                continue

            ctx = parsed.get("@context", "")
            assert_true(ctx in ["https://schema.org", "http://schema.org"], "SchemaContextValid", f"{rel_path} context='{ctx}'")

            if "@graph" in parsed and isinstance(parsed["@graph"], list):
                all_entities.extend(parsed["@graph"])
            else:
                all_entities.append(parsed)

        # Collect entity types
        entity_types = set()
        for ent in all_entities:
            t = ent.get("@type")
            if isinstance(t, list):
                entity_types.update(t)
            elif t:
                entity_types.add(t)

        # BreadcrumbList on every single page
        assert_true("BreadcrumbList" in entity_types, "BreadcrumbListPresent", f"{rel_path} missing BreadcrumbList")
        b_ent = next((e for e in all_entities if e.get("@type") == "BreadcrumbList"), None)
        if b_ent:
            items = b_ent.get("itemListElement", [])
            assert_true(len(items) >= 1, "BreadcrumbListItemsCount", f"{rel_path} breadcrumb items count={len(items)}")
            for idx, itm in enumerate(items, 1):
                assert_true(itm.get("position") == idx, "BreadcrumbPositionSeq", f"{rel_path} breadcrumb pos={itm.get('position')}, expected {idx}")
                assert_true(bool(itm.get("name")), "BreadcrumbItemName", f"{rel_path} breadcrumb #{idx} missing name")
                assert_true(bool(itm.get("item")), "BreadcrumbItemUrl", f"{rel_path} breadcrumb #{idx} missing item URL")

        # Specific page schemas
        if rel_path == "index.html":
            assert_true("LegalService" in entity_types or "Attorney" in entity_types, "IndexLegalService", "index.html missing LegalService/Attorney")
            assert_true("WebSite" in entity_types, "IndexWebSite", "index.html missing WebSite")
            leg_ent = next((e for e in all_entities if e.get("@type") in ["LegalService", "Attorney"]), None)
            if leg_ent:
                assert_true(leg_ent.get("@id") == f"{DOMAIN}/#legalservice", "IndexLegalServiceId", f"LegalService @id='{leg_ent.get('@id')}'")
                assert_true(bool(leg_ent.get("telephone")), "IndexTelephone", "LegalService missing telephone")
                assert_true(bool(leg_ent.get("address")), "IndexAddress", "LegalService missing address")

        elif rel_path == "about.html":
            assert_true("AboutPage" in entity_types, "AboutAboutPage", "about.html missing AboutPage")
            assert_true("Person" in entity_types or "Attorney" in entity_types, "AboutPersonAttorney", "about.html missing Person/Attorney")

        elif rel_path == "contact.html":
            assert_true("ContactPage" in entity_types, "ContactContactPage", "contact.html missing ContactPage")

        elif rel_path == "services.html":
            assert_true("CollectionPage" in entity_types or "ItemList" in entity_types or "LegalService" in entity_types, "ServicesCollectionPage", "services.html missing CollectionPage/ItemList")

        elif rel_path == "notice.html":
            assert_true("WebApplication" in entity_types or "Service" in entity_types, "NoticeWebApplication", "notice.html missing WebApplication/Service")

        elif rel_path == "blogs.html":
            assert_true("Blog" in entity_types or "CollectionPage" in entity_types, "BlogsBlogCollection", "blogs.html missing Blog/CollectionPage")

        elif rel_path.startswith("blogs/"):
            # Blog articles
            assert_true("BlogPosting" in entity_types or "Article" in entity_types, "BlogPostingType", f"{rel_path} missing BlogPosting")
            bp = next((e for e in all_entities if e.get("@type") in ["BlogPosting", "Article"]), None)
            if bp:
                assert_true(bool(bp.get("headline")), "BlogHeadline", f"{rel_path} missing headline")
                assert_true(bool(bp.get("image")), "BlogImage", f"{rel_path} missing image")
                assert_true(bool(bp.get("datePublished")), "BlogDatePublished", f"{rel_path} missing datePublished")
                assert_true(bool(bp.get("dateModified")), "BlogDateModified", f"{rel_path} missing dateModified")
                assert_true(bool(bp.get("author")), "BlogAuthor", f"{rel_path} missing author")
                assert_true(bool(bp.get("publisher")), "BlogPublisher", f"{rel_path} missing publisher")
                assert_true(bool(bp.get("mainEntityOfPage")), "BlogMainEntityOfPage", f"{rel_path} missing mainEntityOfPage")
                assert_true(bool(bp.get("description")), "BlogDescription", f"{rel_path} missing description")

        elif rel_path.endswith("-nagpur.html") or rel_path == "legal-notices.html":
            # Practice Area pages
            assert_true("Service" in entity_types or "LegalService" in entity_types, "PracticeServiceSchema", f"{rel_path} missing Service/LegalService")
            srv = next((e for e in all_entities if e.get("@type") in ["Service", "LegalService"]), None)
            if srv:
                assert_true(bool(srv.get("name")), "ServiceName", f"{rel_path} service missing name")
                assert_true(bool(srv.get("provider")), "ServiceProvider", f"{rel_path} service missing provider")
                assert_true(bool(srv.get("areaServed")), "ServiceAreaServed", f"{rel_path} service missing areaServed")
                assert_true(bool(srv.get("description")), "ServiceDescription", f"{rel_path} service missing description")

            assert_true("FAQPage" in entity_types, "PracticeFaqPage", f"{rel_path} missing FAQPage")
            faq = next((e for e in all_entities if e.get("@type") == "FAQPage"), None)
            if faq:
                q_list = faq.get("mainEntity", [])
                assert_true(len(q_list) >= 2, "FaqMinQuestions", f"{rel_path} has {len(q_list)} FAQ questions (expected >= 2)")
                for q in q_list:
                    assert_true(q.get("@type") == "Question", "FaqItemIsQuestion", f"{rel_path} FAQ item not @type=Question")
                    assert_true(bool(q.get("name")), "FaqQuestionName", f"{rel_path} FAQ Question missing name")
                    ans = q.get("acceptedAnswer", {})
                    assert_true(ans.get("@type") == "Answer" and bool(ans.get("text")), "FaqAnswerText", f"{rel_path} Question '{q.get('name', '')[:30]}' missing Answer text")

    # =========================================================================
    # SUITE 6: CONTENT PRESERVATION & STRUCTURAL INTEGRITY
    # =========================================================================
    print("\n--- SUITE 6: Content Preservation Guardrail (SHA-256 Fingerprint Parity) ---")
    for rel_path, data in pages_data.items():
        computed_hash = data["body_hash"]
        expected_hash = BASELINE_HASHES.get(rel_path)
        assert_true(computed_hash == expected_hash, "ContentHashPreservation", f"{rel_path} hash mismatch: got {computed_hash}, expected {expected_hash}")
        assert_true(len(data["visible_body_text"]) > 100, "ContentSubstantiveLength", f"{rel_path} body text too short ({len(data['visible_body_text'])} chars)")
        assert_true(len(data["h1_tags"]) >= 1, "H1HeadingExists", f"{rel_path} has no <h1> tags")
        assert_true(len(data["h2_tags"]) >= 1, "H2HeadingExists", f"{rel_path} has no <h2> tags")

    # =========================================================================
    # FINAL RESULTS
    # =========================================================================
    print("\n" + "=" * 80)
    print(" ADVERSARIAL TEST SUITE EXECUTION SUMMARY")
    print("=" * 80)
    print(f" Total Assertions Checked : {stats['total']}")
    print(f" Total Passed             : {stats['passed']}")
    print(f" Total Failed             : {stats['failed']}")
    print("=" * 80)

    if stats["failed"] == 0:
        print("[+] ALL ADVERSARIAL TESTS PASSED PERFECTLY (100% COMPLIANCE).")
    else:
        print(f"[-] ENCOUNTERED {stats['failed']} FAILURES.")
        for f in stats["failures"]:
            print(f"  * {f}")

    return stats


if __name__ == "__main__":
    res = run_all_adversarial_tests()
    sys.exit(1 if res["failed"] > 0 else 0)
