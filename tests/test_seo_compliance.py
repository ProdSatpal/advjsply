#!/usr/bin/env python3
"""
Advocate Jasvinder Singh Ply — Technical & On-Page SEO Compliance Test Suite
=============================================================================
Automated test suite verifying SEO compliance, HTML <head> metadata contracts,
Schema.org JSON-LD structured data, sitemap & robots indexability, asset validity,
and strict content preservation across all 23 HTML pages.

Zero external dependencies: Built strictly with Python 3.9+ standard library.
(unittest, html.parser, xml.etree.ElementTree, json, pathlib, re, hashlib, urllib.parse)

Test Tiers:
- Tier 1: HTML Head Metadata Contract & Feature Coverage (23 pages)
- Tier 2: Asset Existence on Disk, JSON-LD Syntax & Schema.org Requirements (23 pages)
- Tier 3: Cross-Feature Parity, Sitemap & Robots Indexability (23 pages)
- Tier 4: Content Preservation Guardrail & Real-World Knowledge Graph Integrity (23 pages)

Usage:
    python3 tests/test_seo_compliance.py
    python3 -m unittest discover -s tests -p "test_*.py" -v
"""

import hashlib
import json
import os
import re
import sys
import unittest
import urllib.parse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from typing import Any, Dict, List, Optional, Set, Tuple

# Project root resolution
PROJECT_ROOT = Path(__file__).resolve().parent.parent
SITEMAP_PATH = PROJECT_ROOT / "sitemap.xml"
ROBOTS_PATH = PROJECT_ROOT / "robots.txt"
ASSETS_DIR = PROJECT_ROOT / "assets"

# Expected 23 HTML files inventory
EXPECTED_HTML_FILES = {
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
    "blogs/how-to-file-divorce-nagpur-guide.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html",
}

CORE_PAGES = {
    "index.html",
    "about.html",
    "services.html",
    "legal-notices.html",
    "contact.html",
    "notice.html",
    "blogs.html",
}

PRACTICE_PAGES = {
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
}

BLOG_PAGES = {
    "blogs/annulment-divorce-guide-nagpur.html",
    "blogs/common-mistakes-legal-notice.html",
    "blogs/how-to-file-divorce-nagpur-guide.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html",
}

# Baseline SHA-256 hashes of visible body text across all 23 HTML pages
# Guardrail: any unintentional change to visible text copy will alter these hashes.
BASELINE_CONTENT_HASHES = {
    "about.html": "41d17bdaed022f7fc30402e0459b8cc3469d132da660f7a4b85ada128e178105",
    "blogs.html": "38c9b1f89d219beb24e3f1942640b713cc1250911c026d418886813c00d079a9",
    "blogs/annulment-divorce-guide-nagpur.html": "f4fdb5306f1b693a71499f5ef35f35cf88055d3af270c34ecff216a5b233dd5d",
    "blogs/common-mistakes-legal-notice.html": "0597892441dd15c9a5e6fe145d7f095f5541487e8fe2d9c04116b34b81183b81",
    "blogs/how-to-file-divorce-nagpur-guide.html": "6e85437ecf352e2a9808422cba0d5ba97f89f6edd1e1ca8c62f165ab3ce7f6b5",
    "blogs/maharashtra-new-advocate-general.html": "c0bc2d773dd83952498b609769a39a200e1128e8dddaebd94f55bc4aa4d1ebc0",
    "blogs/sale-deed-registration-guide-nagpur.html": "9c201f94d3d49c69a6ac100a0bd3ed655f50ee7048a932d39b6bd93862109ddc",
    "blogs/top-10-divorce-lawyers-nagpur.html": "f067393a8dcd9926e2c23dd3212e1cac788f7b284f6c5fbd4463aeb0cdcbcf37",
    "contact.html": "26d1b1fad97447394cc16a8c667889cabcca339ad512f19305de1d4114ffa9b3",
    "divorce-lawyer-nagpur.html": "3db2491d9509ba0bfea553be8c4b331db0de111956829343c7e984e067e8a7de",
    "domestic-violence-lawyer-nagpur.html": "89f74e4d7cdde207b8ff4b3ae94574a9b5c2927514622b21131de1d8ddd06ef2",
    "index.html": "e9f13bb76f5b1745d724fc9f73896711f6035b14cc359545fed44ab38633f2f7",
    "legal-agreements-nagpur.html": "acd75c79913f388bdfea398c39324c5b24c3fdf7746a6555453be2218c72f274",
    "legal-notice-service-nagpur.html": "31e0d48864ce2adaf3b330a26daced1f5e1ef5cd489cf1aa8abefe1350768913",
    "legal-notices.html": "5ea640f64d3ed5a443e11a88a81831e1907fd852ea5541eca888a3a19600d55d",
    "marriage-registration-lawyer-nagpur.html": "e205b41055906cbbeb845381c123e6d090c0d9875949d2ac9111486b26e42e89",
    "mutual-divorce-lawyer-nagpur.html": "79ddce044dd4c5fceafe92d0a2a484c4f1ded5365481048d0c5f304392fc6bd1",
    "notice.html": "c31a3091e4e3d0d686ab0440ad4eb785aa6bbdfb4e21e8717f3c364239f9f6ac",
    "partnership-deeds-nagpur.html": "903b5bd3f8816be0d2df17de52a66a9f18f959ee2cc11001a82ddda80000d53c",
    "property-disputes-nagpur.html": "5a7242011abe26f6433a20d3c32adbdf8424601efacec2023dde7ef969708aac",
    "property-registry-nagpur.html": "d3b79c905559ce2006e395ca451eee14f88458578cba988b9cbf780512fc93dd",
    "services.html": "82fbc2230b5fc49c7559d40bb8f8cdf52c92235b77f5d0a1153a0f3bc66f4d41",
    "will-writing-nagpur.html": "ec6bd470142df36d066c55f09cb5fcc3548e35847649dc55c97866c3ad78dba9",
}


# =============================================================================
# HTML & METADATA PARSER
# =============================================================================

class HTMLPageAuditData:
    """Container holding extracted SEO and metadata properties of an HTML page."""

    def __init__(self, rel_path: str):
        self.rel_path = rel_path
        self.html_lang: Optional[str] = None
        self.charset: Optional[str] = None
        self.viewport: Optional[str] = None
        self.title: Optional[str] = None
        self.meta_description: Optional[str] = None
        self.canonical_url: Optional[str] = None
        self.og_tags: Dict[str, str] = {}
        self.twitter_tags: Dict[str, str] = {}
        self.all_meta_tags: List[Dict[str, str]] = []
        self.all_link_tags: List[Dict[str, str]] = []
        self.jsonld_raw_blocks: List[str] = []
        self.jsonld_entities: List[Dict[str, Any]] = []
        self.jsonld_errors: List[str] = []
        self.visible_body_text: str = ""


class AdvJsplyHTMLParser(HTMLParser):
    """Zero-dependency streaming HTML parser to extract all SEO metadata and visible text."""

    def __init__(self, rel_path: str):
        super().__init__()
        self.data = HTMLPageAuditData(rel_path)
        self._in_head = False
        self._in_body = False
        self._in_title = False
        self._in_script = False
        self._current_script_type: Optional[str] = None
        self._current_script_content: List[str] = []
        self._title_buffer: List[str] = []
        self._body_text_buffer: List[str] = []
        self._ignore_tags_depth = 0
        self._ignore_tags = {"script", "style", "noscript", "svg", "canvas", "iframe"}

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]):
        tag_lower = tag.lower()
        attrs_dict = {k.lower(): (v or "") for k, v in attrs}

        if tag_lower == "html":
            self.data.html_lang = attrs_dict.get("lang")
        elif tag_lower == "head":
            self._in_head = True
        elif tag_lower == "body":
            self._in_body = True
        elif tag_lower == "title" and self._in_head:
            self._in_title = True
            self._title_buffer = []
        elif tag_lower == "meta":
            self.data.all_meta_tags.append(attrs_dict)
            # Charset
            if "charset" in attrs_dict:
                self.data.charset = attrs_dict["charset"]
            elif attrs_dict.get("http-equiv", "").lower() == "content-type":
                content = attrs_dict.get("content", "")
                m = re.search(r"charset=([^\s;]+)", content, re.IGNORECASE)
                if m:
                    self.data.charset = m.group(1)

            # Viewport
            if attrs_dict.get("name", "").lower() == "viewport":
                self.data.viewport = attrs_dict.get("content", "")

            # Meta Description
            if attrs_dict.get("name", "").lower() == "description":
                self.data.meta_description = attrs_dict.get("content", "")

            # Open Graph
            prop = attrs_dict.get("property", "")
            if prop.lower().startswith("og:"):
                self.data.og_tags[prop.lower()] = attrs_dict.get("content", "")

            # Twitter
            name = attrs_dict.get("name", "")
            if name.lower().startswith("twitter:"):
                self.data.twitter_tags[name.lower()] = attrs_dict.get("content", "")
            elif prop.lower().startswith("twitter:"):
                self.data.twitter_tags[prop.lower()] = attrs_dict.get("content", "")

        elif tag_lower == "link":
            self.data.all_link_tags.append(attrs_dict)
            rel = attrs_dict.get("rel", "").lower()
            if rel == "canonical":
                self.data.canonical_url = attrs_dict.get("href", "")

        elif tag_lower == "script":
            self._in_script = True
            self._current_script_type = attrs_dict.get("type", "").lower()
            self._current_script_content = []
            if self._in_body:
                self._ignore_tags_depth += 1

        elif self._in_body and tag_lower in self._ignore_tags:
            self._ignore_tags_depth += 1

    def handle_endtag(self, tag: str):
        tag_lower = tag.lower()
        if tag_lower == "head":
            self._in_head = False
        elif tag_lower == "body":
            self._in_body = False
        elif tag_lower == "title":
            self._in_title = False
            self.data.title = "".join(self._title_buffer).strip()
        elif tag_lower == "script":
            if self._current_script_type == "application/ld+json":
                raw_script = "".join(self._current_script_content).strip()
                if raw_script:
                    self.data.jsonld_raw_blocks.append(raw_script)
            self._in_script = False
            self._current_script_type = None
            if self._in_body:
                self._ignore_tags_depth = max(0, self._ignore_tags_depth - 1)
        elif self._in_body and tag_lower in self._ignore_tags:
            self._ignore_tags_depth = max(0, self._ignore_tags_depth - 1)

    def handle_data(self, data: str):
        if self._in_title:
            self._title_buffer.append(data)
        elif self._in_script and self._current_script_type == "application/ld+json":
            self._current_script_content.append(data)
        elif self._in_body and self._ignore_tags_depth == 0:
            self._body_text_buffer.append(data)

    def close(self):
        super().close()
        # Parse JSON-LD entities
        for i, raw_json in enumerate(self.data.jsonld_raw_blocks):
            try:
                parsed = json.loads(raw_json)
                self._extract_entities_recursive(parsed)
            except json.JSONDecodeError as err:
                self.data.jsonld_errors.append(f"Block #{i+1} JSON syntax error: {err}")

        # Normalize visible body text
        raw_text = " ".join(self._body_text_buffer)
        self.data.visible_body_text = re.sub(r"\s+", " ", raw_text).strip()

    def _extract_entities_recursive(self, obj: Any):
        """Extracts schema entities from dict, list, or @graph structures."""
        if isinstance(obj, dict):
            if "@graph" in obj and isinstance(obj["@graph"], list):
                for item in obj["@graph"]:
                    self._extract_entities_recursive(item)
            elif "@type" in obj:
                self.data.jsonld_entities.append(obj)
                # Recurse into nested entities (e.g. mainEntity, provider, publisher, author)
                for val in obj.values():
                    if isinstance(val, (dict, list)):
                        self._extract_entities_recursive(val)
        elif isinstance(obj, list):
            for item in obj:
                self._extract_entities_recursive(item)


def parse_page(rel_path: str) -> HTMLPageAuditData:
    """Helper to parse a single HTML file from the project."""
    abs_path = PROJECT_ROOT / rel_path
    if not abs_path.is_file():
        raise FileNotFoundError(f"HTML file not found: {abs_path}")
    with open(abs_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
    parser = AdvJsplyHTMLParser(rel_path)
    parser.feed(content)
    parser.close()
    return parser.data


def get_all_pages_audit_data() -> Dict[str, HTMLPageAuditData]:
    """Parses and caches audit data for all 22 HTML pages."""
    return {rel_path: parse_page(rel_path) for rel_path in sorted(EXPECTED_HTML_FILES)}


def entity_matches_type(entity: Dict[str, Any], target_type: str) -> bool:
    """Checks if an entity matches target_type (supports single string or array of types)."""
    t = entity.get("@type", "")
    if isinstance(t, list):
        return target_type in t
    elif isinstance(t, str):
        return t == target_type
    return False


def resolve_local_asset_path(img_url: str, from_rel_html_path: str) -> Optional[Path]:
    """Resolves an image URL (absolute or relative) to a Path on local disk."""
    if not img_url:
        return None
    parsed = urllib.parse.urlparse(img_url)
    path = parsed.path
    if path.startswith("/"):
        path = path.lstrip("/")
        return PROJECT_ROOT / path
    elif img_url.startswith("http://") or img_url.startswith("https://"):
        return PROJECT_ROOT / path.lstrip("/")
    else:
        # Relative to the HTML file's parent directory
        html_dir = (PROJECT_ROOT / from_rel_html_path).parent
        return (html_dir / path).resolve()


# =============================================================================
# TIER 1 TESTS: HTML HEAD METADATA & FEATURE COVERAGE
# =============================================================================

class TestTier1MetadataAndHeadContract(unittest.TestCase):
    """Tier 1: Feature Coverage — HTML <head> Metadata Contracts across all 23 pages."""

    @classmethod
    def setUpClass(cls):
        cls.pages_data = get_all_pages_audit_data()

    def test_01_all_23_html_pages_discovered_on_disk(self):
        """Verify all 23 specified HTML pages exist on disk."""
        found_html = set()
        for root, _, files in os.walk(PROJECT_ROOT):
            if "/." in root or "\\." in root:
                continue
            for f in files:
                if f.endswith(".html"):
                    rel = os.path.relpath(os.path.join(root, f), PROJECT_ROOT)
                    found_html.add(rel)

        self.assertEqual(
            found_html,
            EXPECTED_HTML_FILES,
            f"HTML pages set mismatch. Difference: {found_html.symmetric_difference(EXPECTED_HTML_FILES)}"
        )

    def test_02_html_lang_attribute_en_IN(self):
        """Verify all 23 HTML pages declare <html lang=\"en-IN\"> for regional Indian SEO."""
        failures = []
        for rel_path, data in self.pages_data.items():
            if data.html_lang != "en-IN":
                failures.append(f"{rel_path}: lang='{data.html_lang}' (expected 'en-IN')")
        self.assertEqual(
            len(failures), 0,
            f"Language attribute violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_03_meta_charset_utf8(self):
        """Verify all 23 HTML pages declare <meta charset=\"UTF-8\">."""
        failures = []
        for rel_path, data in self.pages_data.items():
            if not data.charset or data.charset.lower() != "utf-8":
                failures.append(f"{rel_path}: charset='{data.charset}' (expected 'UTF-8')")
        self.assertEqual(
            len(failures), 0,
            f"Charset declaration violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_04_meta_viewport_responsive(self):
        """Verify all 23 HTML pages declare standard responsive viewport meta tag."""
        failures = []
        for rel_path, data in self.pages_data.items():
            if not data.viewport or "width=device-width" not in data.viewport:
                failures.append(f"{rel_path}: viewport='{data.viewport}'")
        self.assertEqual(
            len(failures), 0,
            f"Viewport declaration violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_05_title_tag_presence_and_length_bounds(self):
        """Verify every page has a unique, non-empty <title> tag between 10 and 60 characters."""
        failures = []
        for rel_path, data in self.pages_data.items():
            if not data.title:
                failures.append(f"{rel_path}: missing <title> tag")
            else:
                title_len = len(data.title)
                if title_len < 10 or title_len > 60:
                    failures.append(f"{rel_path}: title length {title_len} chars (expected 10-60) -> \"{data.title}\"")
        self.assertEqual(
            len(failures), 0,
            f"Title tag bounds violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_06_title_tags_uniqueness_across_site(self):
        """Verify all 23 page <title> tags are strictly unique across the entire site."""
        seen_titles: Dict[str, str] = {}
        duplicates = []
        for rel_path, data in self.pages_data.items():
            if data.title:
                clean_title = data.title.strip().lower()
                if clean_title in seen_titles:
                    duplicates.append(f"Duplicate title \"{data.title}\" on {rel_path} and {seen_titles[clean_title]}")
                else:
                    seen_titles[clean_title] = rel_path
        self.assertEqual(
            len(duplicates), 0,
            f"Duplicate title tags found:\n" + "\n".join(duplicates)
        )

    def test_07_meta_description_presence_and_length_bounds(self):
        """Verify every page has a <meta name=\"description\"> between 50 and 160 characters."""
        failures = []
        for rel_path, data in self.pages_data.items():
            if not data.meta_description:
                failures.append(f"{rel_path}: missing meta description")
            else:
                desc_len = len(data.meta_description)
                if desc_len < 50 or desc_len > 160:
                    failures.append(f"{rel_path}: description length {desc_len} chars (expected 50-160) -> \"{data.meta_description}\"")
        self.assertEqual(
            len(failures), 0,
            f"Meta description bounds violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_08_meta_description_uniqueness_across_site(self):
        """Verify all 23 page meta descriptions are strictly unique across the site."""
        seen_descs: Dict[str, str] = {}
        duplicates = []
        for rel_path, data in self.pages_data.items():
            if data.meta_description:
                clean_desc = data.meta_description.strip().lower()
                if clean_desc in seen_descs:
                    duplicates.append(f"Duplicate description on {rel_path} and {seen_descs[clean_desc]}")
                else:
                    seen_descs[clean_desc] = rel_path
        self.assertEqual(
            len(duplicates), 0,
            f"Duplicate meta descriptions found:\n" + "\n".join(duplicates)
        )

    def test_09_canonical_link_tag_presence_and_format(self):
        """Verify every page has a valid <link rel=\"canonical\"> starting with production domain."""
        failures = []
        for rel_path, data in self.pages_data.items():
            if not data.canonical_url:
                failures.append(f"{rel_path}: missing <link rel='canonical'> tag")
            elif not data.canonical_url.startswith("https://advocatejsply.com/"):
                failures.append(f"{rel_path}: canonical URL '{data.canonical_url}' does not start with https://advocatejsply.com/")
        self.assertEqual(
            len(failures), 0,
            f"Canonical tag violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_10_opengraph_essential_metadata_tags(self):
        """Verify presence of og:title, og:description, og:url, og:image, og:type, og:site_name, og:locale."""
        failures = []
        for rel_path, data in self.pages_data.items():
            og = data.og_tags
            missing = []
            for req in ["og:title", "og:description", "og:url", "og:image", "og:type", "og:site_name", "og:locale"]:
                if req not in og or not og[req].strip():
                    missing.append(req)

            # Type check
            if "og:type" in og:
                expected_type = "article" if rel_path in BLOG_PAGES else "website"
                if og["og:type"] != expected_type:
                    missing.append(f"og:type='{og['og:type']}' (expected '{expected_type}')")

            # Site name check
            if "og:site_name" in og and og["og:site_name"] != "Advocate Jasvinder Singh Ply":
                missing.append(f"og:site_name='{og['og:site_name']}' (expected 'Advocate Jasvinder Singh Ply')")

            # Locale check
            if "og:locale" in og and og["og:locale"] != "en_IN":
                missing.append(f"og:locale='{og['og:locale']}' (expected 'en_IN')")

            if missing:
                failures.append(f"{rel_path}: {', '.join(missing)}")

        self.assertEqual(
            len(failures), 0,
            f"Open Graph metadata violations ({len(failures)} pages):\n" + "\n".join(failures)
        )

    def test_11_twitter_cards_essential_metadata_tags(self):
        """Verify presence of twitter:card, twitter:title, twitter:description, twitter:image."""
        failures = []
        for rel_path, data in self.pages_data.items():
            tw = data.twitter_tags
            missing = []
            for req in ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]:
                if req not in tw or not tw[req].strip():
                    missing.append(req)

            if "twitter:card" in tw and tw["twitter:card"] not in ["summary_large_image", "summary"]:
                missing.append(f"twitter:card='{tw['twitter:card']}' (expected 'summary_large_image')")

            if missing:
                failures.append(f"{rel_path}: {', '.join(missing)}")

        self.assertEqual(
            len(failures), 0,
            f"Twitter Card metadata violations ({len(failures)} pages):\n" + "\n".join(failures)
        )


# =============================================================================
# TIER 2 TESTS: ASSETS, SYNTAX & SCHEMA.ORG SEARCH CENTRAL CONTRACTS
# =============================================================================

class TestTier2AssetsAndStructuredData(unittest.TestCase):
    """Tier 2: Boundary & Edge Cases — Social Image Asset Validation & Schema.org JSON-LD."""

    @classmethod
    def setUpClass(cls):
        cls.pages_data = get_all_pages_audit_data()

    def test_01_social_image_assets_exist_on_disk(self):
        """Verify all og:image and twitter:image URLs resolve to existing local image files on disk."""
        missing_assets = []
        for rel_path, data in self.pages_data.items():
            og_img = data.og_tags.get("og:image", "")
            tw_img = data.twitter_tags.get("twitter:image", "")

            for tag_name, img_url in [("og:image", og_img), ("twitter:image", tw_img)]:
                if not img_url:
                    continue
                disk_path = resolve_local_asset_path(img_url, rel_path)
                if not disk_path or not disk_path.is_file():
                    missing_assets.append(
                        f"{rel_path} -> {tag_name}='{img_url}' (resolved to non-existent: {disk_path})"
                    )

        self.assertEqual(
            len(missing_assets), 0,
            f"Broken social image asset references ({len(missing_assets)} occurrences):\n" + "\n".join(missing_assets)
        )

    def test_02_jsonld_syntax_validity_and_schema_context(self):
        """Verify every <script type=\"application/ld+json\"> contains valid JSON and @context."""
        syntax_errors = []
        for rel_path, data in self.pages_data.items():
            if data.jsonld_errors:
                for err in data.jsonld_errors:
                    syntax_errors.append(f"{rel_path}: {err}")
            if not data.jsonld_raw_blocks:
                syntax_errors.append(f"{rel_path}: No JSON-LD blocks found")

        self.assertEqual(
            len(syntax_errors), 0,
            f"JSON-LD syntax or context errors ({len(syntax_errors)}):\n" + "\n".join(syntax_errors)
        )

    def test_03_breadcrumblist_schema_on_all_pages(self):
        """Verify BreadcrumbList schema exists on all 23 pages with valid sequential items."""
        failures = []
        for rel_path, data in self.pages_data.items():
            breadcrumb_entities = [e for e in data.jsonld_entities if entity_matches_type(e, "BreadcrumbList")]
            if not breadcrumb_entities:
                failures.append(f"{rel_path}: missing BreadcrumbList schema")
                continue

            b = breadcrumb_entities[0]
            items = b.get("itemListElement", [])
            if not isinstance(items, list) or len(items) == 0:
                failures.append(f"{rel_path}: BreadcrumbList itemListElement is empty or not a list")
                continue

            for idx, item in enumerate(items):
                expected_pos = idx + 1
                pos = item.get("position")
                name = item.get("name")
                item_url = item.get("item")
                if pos != expected_pos:
                    failures.append(f"{rel_path}: breadcrumb item #{idx+1} position={pos} (expected {expected_pos})")
                if not name:
                    failures.append(f"{rel_path}: breadcrumb item #{idx+1} missing name")
                if not item_url:
                    failures.append(f"{rel_path}: breadcrumb item #{idx+1} missing item URL")

        self.assertEqual(
            len(failures), 0,
            f"BreadcrumbList schema violations ({len(failures)}):\n" + "\n".join(failures)
        )

    def test_04_blogposting_schema_google_search_central_requirements(self):
        """Verify all 6 blog articles contain BlogPosting schema with Google Search Central required fields."""
        failures = []
        for rel_path in sorted(BLOG_PAGES):
            data = self.pages_data[rel_path]
            blog_entities = [e for e in data.jsonld_entities if entity_matches_type(e, "BlogPosting") or entity_matches_type(e, "Article")]
            if not blog_entities:
                failures.append(f"{rel_path}: missing BlogPosting / Article schema")
                continue

            article = blog_entities[0]
            missing_props = []

            # headline
            if not article.get("headline"):
                missing_props.append("headline")

            # image
            if not article.get("image"):
                missing_props.append("image")

            # datePublished & dateModified
            if not article.get("datePublished"):
                missing_props.append("datePublished")
            if not article.get("dateModified"):
                missing_props.append("dateModified")

            # author
            author = article.get("author")
            if not author:
                missing_props.append("author")
            elif isinstance(author, dict) and not author.get("name"):
                missing_props.append("author.name")

            # publisher (Google Search Central requirement)
            publisher = article.get("publisher")
            if not publisher:
                missing_props.append("publisher (Organization with name & logo)")
            elif isinstance(publisher, dict):
                if not publisher.get("name"):
                    missing_props.append("publisher.name")
                if not publisher.get("logo"):
                    missing_props.append("publisher.logo")

            # mainEntityOfPage
            if not article.get("mainEntityOfPage"):
                missing_props.append("mainEntityOfPage")

            # description
            if not article.get("description"):
                missing_props.append("description")

            if missing_props:
                failures.append(f"{rel_path}: missing BlogPosting properties: {', '.join(missing_props)}")

        self.assertEqual(
            len(failures), 0,
            f"BlogPosting schema violations ({len(failures)}):\n" + "\n".join(failures)
        )

    def test_05_service_schema_on_practice_pages(self):
        """Verify all 10 practice area pages and legal-notices.html have Service/LegalService schema."""
        required_pages = sorted(PRACTICE_PAGES | {"legal-notices.html"})
        failures = []
        for rel_path in required_pages:
            data = self.pages_data[rel_path]
            service_entities = [
                e for e in data.jsonld_entities
                if entity_matches_type(e, "Service") or entity_matches_type(e, "LegalService")
            ]
            if not service_entities:
                failures.append(f"{rel_path}: missing Service / LegalService schema")
                continue

            srv = service_entities[0]
            missing_props = []
            if not srv.get("name"):
                missing_props.append("name")
            if not srv.get("serviceType") and not srv.get("description"):
                missing_props.append("serviceType or description")
            if not srv.get("provider"):
                missing_props.append("provider")
            if not srv.get("areaServed"):
                missing_props.append("areaServed")

            if missing_props:
                failures.append(f"{rel_path}: missing Service properties: {', '.join(missing_props)}")

        self.assertEqual(
            len(failures), 0,
            f"Service schema violations on practice pages ({len(failures)}):\n" + "\n".join(failures)
        )

    def test_06_faqpage_schema_on_practice_pages(self):
        """Verify FAQPage schema on practice area pages and legal-notices.html with valid Question items."""
        required_pages = sorted(PRACTICE_PAGES | {"legal-notices.html"})
        failures = []
        for rel_path in required_pages:
            data = self.pages_data[rel_path]
            faq_entities = [e for e in data.jsonld_entities if entity_matches_type(e, "FAQPage")]
            if not faq_entities:
                failures.append(f"{rel_path}: missing FAQPage schema")
                continue

            faq = faq_entities[0]
            main_entity = faq.get("mainEntity", [])
            if not isinstance(main_entity, list) or len(main_entity) == 0:
                failures.append(f"{rel_path}: FAQPage mainEntity is empty or not a list")
                continue

            for idx, q in enumerate(main_entity):
                if not entity_matches_type(q, "Question"):
                    failures.append(f"{rel_path}: FAQ item #{idx+1} @type is not 'Question'")
                if not q.get("name"):
                    failures.append(f"{rel_path}: FAQ item #{idx+1} missing question 'name'")
                ans = q.get("acceptedAnswer")
                if not ans or not isinstance(ans, dict):
                    failures.append(f"{rel_path}: FAQ item #{idx+1} missing 'acceptedAnswer' object")
                elif not ans.get("text"):
                    failures.append(f"{rel_path}: FAQ item #{idx+1} acceptedAnswer missing 'text'")

        self.assertEqual(
            len(failures), 0,
            f"FAQPage schema violations ({len(failures)}):\n" + "\n".join(failures)
        )

    def test_07_core_pages_specific_schemas(self):
        """Verify specific core entity schemas across index, about, contact, services, notice, and blogs."""
        failures = []

        # 1. index.html: LegalService and WebSite
        idx_data = self.pages_data["index.html"]
        has_legalservice = any(entity_matches_type(e, "LegalService") for e in idx_data.jsonld_entities)
        has_website = any(entity_matches_type(e, "WebSite") for e in idx_data.jsonld_entities)
        if not has_legalservice:
            failures.append("index.html: missing LegalService schema")
        if not has_website:
            failures.append("index.html: missing WebSite schema")

        # 2. about.html: AboutPage and Person / Attorney
        about_data = self.pages_data["about.html"]
        has_aboutpage = any(entity_matches_type(e, "AboutPage") for e in about_data.jsonld_entities)
        has_person = any(entity_matches_type(e, "Person") or entity_matches_type(e, "Attorney") for e in about_data.jsonld_entities)
        if not has_aboutpage:
            failures.append("about.html: missing AboutPage schema")
        if not has_person:
            failures.append("about.html: missing Person / Attorney schema")

        # 3. contact.html: ContactPage
        contact_data = self.pages_data["contact.html"]
        has_contactpage = any(entity_matches_type(e, "ContactPage") for e in contact_data.jsonld_entities)
        if not has_contactpage:
            failures.append("contact.html: missing ContactPage schema")

        # 4. services.html: CollectionPage / ItemList
        services_data = self.pages_data["services.html"]
        has_collection = any(entity_matches_type(e, "CollectionPage") or entity_matches_type(e, "ItemList") for e in services_data.jsonld_entities)
        if not has_collection:
            failures.append("services.html: missing CollectionPage / ItemList schema")

        # 5. notice.html: WebApplication / SoftwareApplication
        notice_data = self.pages_data["notice.html"]
        has_webapp = any(
            entity_matches_type(e, "WebApplication") or entity_matches_type(e, "SoftwareApplication") or entity_matches_type(e, "Service")
            for e in notice_data.jsonld_entities
        )
        if not has_webapp:
            failures.append("notice.html: missing WebApplication / Service schema")

        # 6. blogs.html: Blog / CollectionPage
        blogs_data = self.pages_data["blogs.html"]
        has_blog_hub = any(entity_matches_type(e, "Blog") or entity_matches_type(e, "CollectionPage") for e in blogs_data.jsonld_entities)
        if not has_blog_hub:
            failures.append("blogs.html: missing Blog / CollectionPage schema")

        self.assertEqual(
            len(failures), 0,
            f"Core pages specific schema violations ({len(failures)}):\n" + "\n".join(failures)
        )


# =============================================================================
# TIER 3 TESTS: CROSS-FEATURE PARITY, SITEMAP & ROBOTS INDEXABILITY
# =============================================================================

class TestTier3CrossFeatureAndIndexability(unittest.TestCase):
    """Tier 3: Cross-Feature Combinations — Canonical, Sitemap, and Robots parity."""

    @classmethod
    def setUpClass(cls):
        cls.pages_data = get_all_pages_audit_data()
        cls.sitemap_urls = cls._load_sitemap_urls()

    @classmethod
    def _load_sitemap_urls(cls) -> Dict[str, Dict[str, str]]:
        if not SITEMAP_PATH.is_file():
            return {}
        tree = ET.parse(SITEMAP_PATH)
        root = tree.getroot()
        urls = {}
        # Support both namespaced and non-namespaced sitemaps
        url_elements = root.findall("{http://www.sitemaps.org/schemas/sitemap/0.9}url")
        if not url_elements:
            url_elements = root.findall("url")

        for url_elem in url_elements:
            loc_elem = url_elem.find("{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
            if loc_elem is None:
                loc_elem = url_elem.find("loc")

            lastmod_elem = url_elem.find("{http://www.sitemaps.org/schemas/sitemap/0.9}lastmod")
            if lastmod_elem is None:
                lastmod_elem = url_elem.find("lastmod")

            changefreq_elem = url_elem.find("{http://www.sitemaps.org/schemas/sitemap/0.9}changefreq")
            if changefreq_elem is None:
                changefreq_elem = url_elem.find("changefreq")

            priority_elem = url_elem.find("{http://www.sitemaps.org/schemas/sitemap/0.9}priority")
            if priority_elem is None:
                priority_elem = url_elem.find("priority")

            if loc_elem is not None and loc_elem.text:
                loc = loc_elem.text.strip()
                urls[loc] = {
                    "lastmod": lastmod_elem.text.strip() if lastmod_elem is not None and lastmod_elem.text else "",
                    "changefreq": changefreq_elem.text.strip() if changefreq_elem is not None and changefreq_elem.text else "",
                    "priority": priority_elem.text.strip() if priority_elem is not None and priority_elem.text else "",
                }
        return urls

    def test_01_canonical_matches_og_url(self):
        """Verify that <link rel=\"canonical\"> URL exactly matches og:url on all 23 pages."""
        mismatches = []
        for rel_path, data in self.pages_data.items():
            canon = data.canonical_url
            og_url = data.og_tags.get("og:url", "")
            if not canon:
                mismatches.append(f"{rel_path}: canonical URL is missing")
            elif not og_url:
                mismatches.append(f"{rel_path}: og:url is missing")
            elif canon != og_url:
                mismatches.append(f"{rel_path}: canonical '{canon}' != og:url '{og_url}'")

        self.assertEqual(
            len(mismatches), 0,
            f"Canonical vs og:url mismatches ({len(mismatches)} pages):\n" + "\n".join(mismatches)
        )

    def test_02_canonical_matches_sitemap_loc(self):
        """Verify that every page's canonical URL exists as a <loc> in sitemap.xml."""
        missing_in_sitemap = []
        for rel_path, data in self.pages_data.items():
            canon = data.canonical_url
            if not canon:
                missing_in_sitemap.append(f"{rel_path}: canonical tag is missing")
            elif canon not in self.sitemap_urls:
                missing_in_sitemap.append(f"{rel_path}: canonical '{canon}' is not in sitemap.xml")

        self.assertEqual(
            len(missing_in_sitemap), 0,
            f"Canonical URLs missing from sitemap.xml ({len(missing_in_sitemap)}):\n" + "\n".join(missing_in_sitemap)
        )

    def test_03_sitemap_xml_bijection_and_validity(self):
        """Verify sitemap.xml exists, contains exactly 23 URLs matching all HTML pages with valid lastmod."""
        self.assertTrue(SITEMAP_PATH.is_file(), "sitemap.xml does not exist")
        self.assertEqual(
            len(self.sitemap_urls), 23,
            f"sitemap.xml must contain exactly 23 URLs, found {len(self.sitemap_urls)}"
        )

        # Expected canonical URLs mapping
        expected_urls = set()
        for rel_path in EXPECTED_HTML_FILES:
            if rel_path == "index.html":
                expected_urls.add("https://advocatejsply.com/")
            else:
                expected_urls.add(f"https://advocatejsply.com/{rel_path}")

        sitemap_loc_set = set(self.sitemap_urls.keys())
        self.assertEqual(
            sitemap_loc_set,
            expected_urls,
            f"Sitemap URLs do not match expected 23 HTML pages set. Difference: {sitemap_loc_set.symmetric_difference(expected_urls)}"
        )

        # Validate lastmod format (YYYY-MM-DD)
        invalid_lastmod = []
        for loc, meta in self.sitemap_urls.items():
            lastmod = meta.get("lastmod", "")
            if not re.match(r"^\d{4}-\d{2}-\d{2}$", lastmod):
                invalid_lastmod.append(f"{loc}: invalid lastmod '{lastmod}'")

        self.assertEqual(
            len(invalid_lastmod), 0,
            f"Invalid sitemap <lastmod> timestamps:\n" + "\n".join(invalid_lastmod)
        )

    def test_04_robots_txt_crawlability_and_sitemap_directive(self):
        """Verify robots.txt allows search crawlers and links to the sitemap."""
        self.assertTrue(ROBOTS_PATH.is_file(), "robots.txt does not exist")
        with open(ROBOTS_PATH, "r", encoding="utf-8") as f:
            robots_content = f.read()

        self.assertIn("User-agent: *", robots_content, "robots.txt missing 'User-agent: *'")
        self.assertIn("Allow: /", robots_content, "robots.txt missing 'Allow: /'")
        self.assertIn(
            "Sitemap: https://advocatejsply.com/sitemap.xml",
            robots_content,
            "robots.txt missing or incorrect Sitemap directive"
        )


# =============================================================================
# TIER 4 TESTS: CONTENT PRESERVATION GUARDRAIL & KNOWLEDGE GRAPH INTEGRITY
# =============================================================================

class TestTier4ContentPreservationAndRealWorld(unittest.TestCase):
    """Tier 4: Real-World Acceptance — Body Content Preservation & Knowledge Graph Integrity."""

    @classmethod
    def setUpClass(cls):
        cls.pages_data = get_all_pages_audit_data()

    def test_01_dom_visible_text_extractable_and_non_empty(self):
        """Verify all 23 pages contain non-empty, substantive visible body text (> 100 chars)."""
        empty_pages = []
        for rel_path, data in self.pages_data.items():
            text_len = len(data.visible_body_text)
            if text_len < 100:
                empty_pages.append(f"{rel_path}: visible text length {text_len} chars (expected > 100)")

        self.assertEqual(
            len(empty_pages), 0,
            f"Empty or deficient visible body text ({len(empty_pages)} pages):\n" + "\n".join(empty_pages)
        )

    def test_02_content_preservation_guardrail_baseline_hashes(self):
        """Verify 100% visible body copy preservation using baseline SHA-256 text hashes."""
        mismatched_pages = []
        for rel_path, data in self.pages_data.items():
            current_hash = hashlib.sha256(data.visible_body_text.encode("utf-8")).hexdigest()
            expected_hash = BASELINE_CONTENT_HASHES.get(rel_path)
            if expected_hash and current_hash != expected_hash:
                mismatched_pages.append(
                    f"{rel_path}: visible body text modified! Hash mismatch ({current_hash[:12]}... != {expected_hash[:12]}...)"
                )

        self.assertEqual(
            len(mismatched_pages), 0,
            f"Content preservation guardrail failure ({len(mismatched_pages)} pages modified):\n" + "\n".join(mismatched_pages)
        )

    def test_03_schema_graph_id_resolution(self):
        """Verify that @id references in JSON-LD resolve to consistent domain identifiers."""
        valid_id_patterns = [
            re.compile(r"^https://advocatejsply\.com/.*#(legalservice|website|attorney|organization|breadcrumb|faq|service|app|webpage|article)$"),
            re.compile(r"^https://advocatejsply\.com(/.*)?$"),
        ]
        invalid_ids = []

        for rel_path, data in self.pages_data.items():
            for entity in data.jsonld_entities:
                entity_id = entity.get("@id")
                if entity_id:
                    if not any(pat.match(entity_id) for pat in valid_id_patterns):
                        invalid_ids.append(f"{rel_path}: non-standard @id '{entity_id}' in entity {entity.get('@type')}")

        self.assertEqual(
            len(invalid_ids), 0,
            f"Non-standard JSON-LD @id references found ({len(invalid_ids)}):\n" + "\n".join(invalid_ids)
        )


# =============================================================================
# CUSTOM TEST RUNNER & DIAGNOSTIC REPORTING
# =============================================================================

def run_diagnostics_report():
    """Executes the test suite and outputs a formatted compliance report."""
    print("=" * 80)
    print(" ADVJSLPY TECHNICAL & ON-PAGE SEO COMPLIANCE AUDIT TEST RUNNER")
    print("=" * 80)
    print(f" Workspace Root : {PROJECT_ROOT}")
    print(f" Total Pages    : {len(EXPECTED_HTML_FILES)} HTML files")
    print(f" Sitemap Target : {SITEMAP_PATH}")
    print(f" Robots Target  : {ROBOTS_PATH}")
    print("-" * 80)

    loader = unittest.TestLoader()
    suite = unittest.TestSuite()

    suite.addTests(loader.loadTestsFromTestCase(TestTier1MetadataAndHeadContract))
    suite.addTests(loader.loadTestsFromTestCase(TestTier2AssetsAndStructuredData))
    suite.addTests(loader.loadTestsFromTestCase(TestTier3CrossFeatureAndIndexability))
    suite.addTests(loader.loadTestsFromTestCase(TestTier4ContentPreservationAndRealWorld))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)

    print("-" * 80)
    print(f" Tests Run   : {result.testsRun}")
    print(f" Passed      : {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f" Failures    : {len(result.failures)}")
    print(f" Errors      : {len(result.errors)}")
    print("=" * 80)

    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(run_diagnostics_report())
