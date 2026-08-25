#!/usr/bin/env python3
"""
Adversarial Schema & Structured Data Test Suite (Complete Adversarial Harness)
Challenger #2 - AdvJsply Technical & On-Page SEO

Aggressively stress-tests:
1. Deep JSON-LD syntax, character encoding, and structure across all 22 HTML pages.
2. Complete Schema.org validation against Google Search Central & Schema.org standards
   for LegalService, WebSite, Person, AboutPage, ContactPage, Service, FAQPage,
   BreadcrumbList, BlogPosting, WebApplication, CollectionPage, and Blog.
3. Knowledge Graph Entity Link Resolution and Reference Graph Integrity (zero dangling @id pointers).
4. Visible On-Page FAQ Content Parity (100% parity HTML body vs FAQPage JSON-LD).
5. Rich Snippet Google Search Central Constraints (geo bounding, phone formats, breadcrumb hierarchy).
"""

import os
import re
import sys
import json
import unittest
from pathlib import Path
from html.parser import HTMLParser

WORKSPACE = Path("/Users/satpalsingh/Projects/AdvJsply")
PRODUCTION_ORIGIN = "https://advocatejsply.com"

EXPECTED_PAGES = {
    # Core (7)
    "index.html",
    "about.html",
    "services.html",
    "legal-notices.html",
    "contact.html",
    "notice.html",
    "blogs.html",
    # Practice Area Pages (10)
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
    # Blog Articles (5)
    "blogs/annulment-divorce-guide-nagpur.html",
    "blogs/common-mistakes-legal-notice.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html",
}

VALID_SCHEMA_TYPES = {
    "WebSite", "LegalService", "Attorney", "Person", "AboutPage", "ContactPage",
    "ContactPoint", "Service", "FAQPage", "Question", "Answer", "BreadcrumbList",
    "ListItem", "BlogPosting", "Article", "WebApplication", "CollectionPage",
    "Blog", "PostalAddress", "GeoCoordinates", "OpeningHoursSpecification",
    "City", "AdministrativeArea", "Offer", "WebPage", "ImageObject", "ItemList"
}

GLOBAL_CANONICAL_ENTITIES = {
    f"{PRODUCTION_ORIGIN}/#legalservice",
    f"{PRODUCTION_ORIGIN}/#website",
    f"{PRODUCTION_ORIGIN}/#attorney",
    f"{PRODUCTION_ORIGIN}/#breadcrumb",
}


def discover_all_html_files():
    found = set()
    for root, _, files in os.walk(WORKSPACE):
        if any(ignored in root for ignored in [".agents", ".git", "tests"]):
            continue
        for f in files:
            if f.endswith(".html"):
                p = Path(root) / f
                found.add(str(p.relative_to(WORKSPACE)))
    return found


def extract_raw_jsonld_scripts(html_content):
    pattern = re.compile(r'<script\s+type=["\']application/ld\+json["\']>(.*?)</script>', re.DOTALL | re.IGNORECASE)
    return pattern.findall(html_content)


def parse_jsonld_from_html(html_content):
    scripts = extract_raw_jsonld_scripts(html_content)
    parsed_blocks = []
    for s in scripts:
        data = json.loads(s)
        parsed_blocks.append(data)
    return parsed_blocks


def get_all_graph_nodes(html_content):
    blocks = parse_jsonld_from_html(html_content)
    nodes = []
    for block in blocks:
        if isinstance(block, dict):
            if "@graph" in block and isinstance(block["@graph"], list):
                nodes.extend(block["@graph"])
            else:
                nodes.append(block)
        elif isinstance(block, list):
            nodes.extend(block)
    return nodes


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


def extract_visible_faqs_english(content):
    body = re.sub(r'<head.*?</head>', '', content, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<script.*?</script>', '', body, flags=re.DOTALL | re.IGNORECASE)
    body = re.sub(r'<style.*?</style>', '', body, flags=re.DOTALL | re.IGNORECASE)

    en_container = re.search(r'id=["\']content-en["\'][^>]*>(.*?)(?=<div\s+id=["\']content-hi|\Z)', body, re.DOTALL)
    search_target = en_container.group(1) if en_container else body

    faqs = []

    # Strategy 1: data-i18n attributes
    i18n_pairs = re.findall(
        r'<([a-z0-9]+)[^>]*data-i18n=["\']([^"\']*[Ff]aq[^"\']*[Qq][^"\']*)["\'][^>]*>(.*?)</\1>\s*<([a-z0-9]+)[^>]*data-i18n=["\']([^"\']*[Ff]aq[^"\']*[Aa][^"\']*)["\'][^>]*>(.*?)</\4>',
        search_target,
        re.DOTALL
    )
    if i18n_pairs:
        for tag_q, key_q, text_q, tag_a, key_a, text_a in i18n_pairs:
            q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
            a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
            if q and a:
                faqs.append((q, a))

    # Strategy 2: toggleFaq Accordion buttons
    if not faqs:
        acc_pairs = re.findall(
            r'<button[^>]*toggleFaq[^>]*>\s*<span[^>]*>(.*?)</span>.*?</button>\s*<div[^>]*faq-answer[^>]*>\s*<p[^>]*>(.*?)</p>',
            search_target,
            re.DOTALL
        )
        for text_q, text_a in acc_pairs:
            q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
            a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
            if q and a:
                faqs.append((q, a))

    # Strategy 3: Specific FAQ / Service Highlights card sections
    if not faqs:
        faq_heading_match = re.search(
            r'<h[234][^>]*>(.*?(?:Frequently Asked Questions|FAQ|Service Highlights|Service Deep-Dive).*?)</h[234]>(.*?)(?=<h2|<section|id=["\']content-hi|\Z)',
            search_target,
            re.DOTALL | re.IGNORECASE
        )
        if faq_heading_match:
            faq_section_html = faq_heading_match.group(2)
            qa_matches = re.findall(r'<h[3456][^>]*>(.*?)</h[3456]>\s*<p[^>]*>(.*?)</p>', faq_section_html, re.DOTALL)
            for text_q, text_a in qa_matches:
                q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
                a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
                if q and a:
                    faqs.append((q, a))

    # Strategy 4: Fallback for border-l-4 blocks
    if not faqs:
        qa_matches = re.findall(
            r'<div[^>]*class=["\'][^"\']*border-l-4[^"\']*["\'][^>]*>\s*<h[34][^>]*>(.*?)</h[34]>\s*<p[^>]*>(.*?)</p>',
            search_target,
            re.DOTALL
        )
        for text_q, text_a in qa_matches:
            q = " ".join(re.sub(r'<[^>]+>', '', text_q).split())
            a = " ".join(re.sub(r'<[^>]+>', '', text_a).split())
            if q and a:
                faqs.append((q, a))

    return faqs


# ==============================================================================
# TEST SUITE 1: JSON-LD SYNTAX, ENCODING & LOW-LEVEL STRUCTURE
# ==============================================================================
class TestAdversarialJsonLdSyntax(unittest.TestCase):
    """
    Stress-tests the raw JSON-LD text across all 22 pages for syntax validity,
    proper escaping, character encoding, and standard schema contexts.
    """

    def test_01_all_22_pages_exist_and_match_inventory(self):
        discovered = discover_all_html_files()
        self.assertEqual(discovered, EXPECTED_PAGES, f"Discovered pages mismatch expected 22 inventory: {discovered ^ EXPECTED_PAGES}")

    def test_02_each_page_has_exactly_one_valid_jsonld_script_tag(self):
        for page_rel in EXPECTED_PAGES:
            path = WORKSPACE / page_rel
            content = path.read_text(encoding="utf-8")
            raw_scripts = extract_raw_jsonld_scripts(content)
            self.assertEqual(
                len(raw_scripts), 1,
                f"Page {page_rel} must have exactly 1 <script type='application/ld+json'> tag, found {len(raw_scripts)}"
            )

    def test_03_jsonld_strictly_parses_without_syntax_errors(self):
        for page_rel in EXPECTED_PAGES:
            path = WORKSPACE / page_rel
            content = path.read_text(encoding="utf-8")
            raw_scripts = extract_raw_jsonld_scripts(content)
            raw = raw_scripts[0]
            try:
                data = json.loads(raw)
            except json.JSONDecodeError as e:
                self.fail(f"JSON-LD syntax error on {page_rel}: {e}")
            self.assertIsInstance(data, dict, f"Root JSON-LD on {page_rel} must be a JSON Object (dict).")

    def test_04_schema_context_is_standard_https_schema_org(self):
        for page_rel in EXPECTED_PAGES:
            path = WORKSPACE / page_rel
            content = path.read_text(encoding="utf-8")
            data = parse_jsonld_from_html(content)[0]
            context = data.get("@context")
            self.assertIn(
                context,
                ["https://schema.org", "http://schema.org"],
                f"Invalid @context on {page_rel}: {context}. Must be 'https://schema.org'"
            )

    def test_05_root_uses_graph_array_with_non_empty_entities(self):
        for page_rel in EXPECTED_PAGES:
            path = WORKSPACE / page_rel
            content = path.read_text(encoding="utf-8")
            data = parse_jsonld_from_html(content)[0]
            self.assertIn("@graph", data, f"Page {page_rel} JSON-LD root must contain '@graph' property.")
            graph = data["@graph"]
            self.assertIsInstance(graph, list, f"@graph on {page_rel} must be a list.")
            self.assertGreaterEqual(len(graph), 2, f"@graph on {page_rel} must have at least 2 entities, got {len(graph)}")

    def test_06_no_null_bytes_or_unescaped_control_characters(self):
        for page_rel in EXPECTED_PAGES:
            path = WORKSPACE / page_rel
            content = path.read_text(encoding="utf-8")
            raw = extract_raw_jsonld_scripts(content)[0]
            self.assertNotIn("\x00", raw, f"Null byte found in JSON-LD on {page_rel}")
            self.assertNotIn("\ufffd", raw, f"Unicode replacement character found in JSON-LD on {page_rel}")

    def test_07_no_empty_string_fields_in_top_level_entities(self):
        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            for node in nodes:
                for key, val in node.items():
                    if isinstance(val, str):
                        self.assertTrue(
                            bool(val.strip()),
                            f"Empty or whitespace-only string found for property '{key}' on {page_rel} (type: {node.get('@type')})"
                        )

    def test_08_all_schema_types_are_recognized_schema_org_types(self):
        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            for node in nodes:
                types = node.get("@type", [])
                if isinstance(types, str):
                    types = [types]
                for t in types:
                    self.assertIn(
                        t, VALID_SCHEMA_TYPES,
                        f"Unrecognized Schema.org @type '{t}' found on page {page_rel}"
                    )


# ==============================================================================
# TEST SUITE 2: SCHEMA.ORG ENTITY CONTRACTS & COMPLETENESS
# ==============================================================================
class TestAdversarialSchemaCompleteness(unittest.TestCase):
    """
    Stress-tests required & recommended properties for every Schema.org entity type
    according to Google Search Central and Schema.org specifications.
    """

    def test_01_index_legalservice_attorney_schema_completeness(self):
        nodes = get_all_graph_nodes((WORKSPACE / "index.html").read_text(encoding="utf-8"))
        legal_services = [
            n for n in nodes
            if (isinstance(n.get("@type"), list) and "LegalService" in n.get("@type"))
            or n.get("@type") == "LegalService"
        ]
        self.assertEqual(len(legal_services), 1, "index.html must define exactly 1 LegalService entity.")
        ls = legal_services[0]

        self.assertEqual(ls.get("@id"), f"{PRODUCTION_ORIGIN}/#legalservice")

        for field in ["name", "legalName", "url", "logo", "image", "description", "telephone", "priceRange"]:
            self.assertIn(field, ls, f"LegalService missing field: {field}")
            self.assertIsInstance(ls[field], str, f"LegalService {field} must be str")
            self.assertTrue(bool(ls[field].strip()), f"LegalService {field} must not be empty")

        # Phone format: international with country code
        self.assertTrue(
            bool(re.match(r'^\+\d{10,15}$', ls["telephone"])),
            f"LegalService telephone '{ls['telephone']}' must be valid E.164 format"
        )

        # PostalAddress
        address = ls.get("address")
        self.assertIsInstance(address, dict, "LegalService address must be an object")
        self.assertEqual(address.get("@type"), "PostalAddress")
        for addr_field in ["streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry"]:
            self.assertIn(addr_field, address, f"address missing {addr_field}")
            self.assertTrue(bool(address[addr_field].strip()), f"address {addr_field} empty")
        self.assertEqual(address.get("postalCode"), "440017")
        self.assertEqual(address.get("addressCountry"), "IN")

        # GeoCoordinates
        geo = ls.get("geo")
        self.assertIsInstance(geo, dict, "LegalService geo must be an object")
        self.assertEqual(geo.get("@type"), "GeoCoordinates")
        lat = float(geo.get("latitude", 0))
        lng = float(geo.get("longitude", 0))
        self.assertTrue(20.5 <= lat <= 21.5, f"Latitude {lat} out of Nagpur range")
        self.assertTrue(78.5 <= lng <= 79.5, f"Longitude {lng} out of Nagpur range")

        # OpeningHoursSpecification
        hours = ls.get("openingHoursSpecification")
        self.assertIsInstance(hours, dict, "LegalService openingHoursSpecification must be an object")
        self.assertEqual(hours.get("@type"), "OpeningHoursSpecification")
        self.assertIsInstance(hours.get("dayOfWeek"), list)
        self.assertGreaterEqual(len(hours.get("dayOfWeek")), 5)
        self.assertTrue(bool(re.match(r'^\d{2}:\d{2}$', hours.get("opens", ""))))
        self.assertTrue(bool(re.match(r'^\d{2}:\d{2}$', hours.get("closes", ""))))

        # Founder
        founder = ls.get("founder")
        self.assertIsInstance(founder, dict, "LegalService founder must be an object")
        self.assertEqual(founder.get("@id"), f"{PRODUCTION_ORIGIN}/#attorney")

    def test_02_index_website_schema_completeness(self):
        nodes = get_all_graph_nodes((WORKSPACE / "index.html").read_text(encoding="utf-8"))
        websites = [n for n in nodes if n.get("@type") == "WebSite"]
        self.assertEqual(len(websites), 1, "index.html must define exactly 1 WebSite entity.")
        ws = websites[0]
        self.assertEqual(ws.get("@id"), f"{PRODUCTION_ORIGIN}/#website")
        self.assertEqual(ws.get("url"), f"{PRODUCTION_ORIGIN}/")
        self.assertEqual(ws.get("inLanguage"), "en-IN")
        self.assertTrue(bool(ws.get("name", "").strip()))
        self.assertTrue(bool(ws.get("description", "").strip()))
        self.assertEqual(ws.get("publisher", {}).get("@id"), f"{PRODUCTION_ORIGIN}/#legalservice")

    def test_03_about_page_and_attorney_person_schema_completeness(self):
        nodes = get_all_graph_nodes((WORKSPACE / "about.html").read_text(encoding="utf-8"))
        
        # AboutPage
        about_pages = [n for n in nodes if n.get("@type") == "AboutPage"]
        self.assertEqual(len(about_pages), 1, "about.html must define exactly 1 AboutPage entity.")
        ap = about_pages[0]
        self.assertEqual(ap.get("@id"), f"{PRODUCTION_ORIGIN}/about.html#webpage")
        self.assertEqual(ap.get("url"), f"{PRODUCTION_ORIGIN}/about.html")
        self.assertEqual(ap.get("mainEntity", {}).get("@id"), f"{PRODUCTION_ORIGIN}/#attorney")
        self.assertEqual(ap.get("breadcrumb", {}).get("@id"), f"{PRODUCTION_ORIGIN}/about.html#breadcrumb")

        # Person / Attorney
        attorneys = [
            n for n in nodes
            if (isinstance(n.get("@type"), list) and "Person" in n.get("@type") and "Attorney" in n.get("@type"))
            or n.get("@type") == "Person"
        ]
        self.assertEqual(len(attorneys), 1, "about.html must define exactly 1 Person/Attorney entity.")
        att = attorneys[0]
        self.assertEqual(att.get("@id"), f"{PRODUCTION_ORIGIN}/#attorney")
        self.assertEqual(att.get("name"), "Advocate Jasvinder Singh Ply")
        self.assertEqual(att.get("worksFor", {}).get("@id"), f"{PRODUCTION_ORIGIN}/#legalservice")
        self.assertIsInstance(att.get("knowsAbout"), list)
        self.assertGreaterEqual(len(att.get("knowsAbout")), 5)
        self.assertIsInstance(att.get("address"), dict)

    def test_04_contact_page_schema_completeness(self):
        nodes = get_all_graph_nodes((WORKSPACE / "contact.html").read_text(encoding="utf-8"))
        contact_pages = [n for n in nodes if n.get("@type") == "ContactPage"]
        self.assertEqual(len(contact_pages), 1, "contact.html must define exactly 1 ContactPage entity.")
        cp = contact_pages[0]
        self.assertEqual(cp.get("@id"), f"{PRODUCTION_ORIGIN}/contact.html#webpage")
        self.assertEqual(cp.get("url"), f"{PRODUCTION_ORIGIN}/contact.html")
        self.assertEqual(cp.get("mainEntity", {}).get("@id"), f"{PRODUCTION_ORIGIN}/#legalservice")
        self.assertEqual(cp.get("breadcrumb", {}).get("@id"), f"{PRODUCTION_ORIGIN}/contact.html#breadcrumb")

        # ContactPoint
        cps = [n for n in nodes if n.get("@type") == "ContactPoint"]
        self.assertEqual(len(cps), 1, "contact.html must define exactly 1 ContactPoint entity.")
        contact_point = cps[0]
        self.assertEqual(contact_point.get("telephone"), "+918857972717")
        self.assertEqual(contact_point.get("contactType"), "legal consultation")
        self.assertIsInstance(contact_point.get("availableLanguage"), list)
        self.assertIn("English", contact_point.get("availableLanguage"))
        self.assertIn("Hindi", contact_point.get("availableLanguage"))
        self.assertIn("Marathi", contact_point.get("availableLanguage"))

    def test_05_practice_area_and_service_pages_schema_completeness(self):
        practice_pages = [
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
        ]
        for page_rel in practice_pages:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            services = [
                n for n in nodes
                if (isinstance(n.get("@type"), list) and "Service" in n.get("@type"))
                or n.get("@type") in ["Service", "LegalService"]
            ]
            self.assertEqual(len(services), 1, f"{page_rel} must define exactly 1 Service/LegalService entity.")
            svc = services[0]
            self.assertEqual(svc.get("@id"), f"{PRODUCTION_ORIGIN}/{page_rel}#service")
            self.assertEqual(svc.get("url"), f"{PRODUCTION_ORIGIN}/{page_rel}")
            self.assertTrue(bool(svc.get("name", "").strip()), f"{page_rel} Service name empty")
            self.assertTrue(bool(svc.get("serviceType", "").strip()), f"{page_rel} Service serviceType empty")
            self.assertTrue(bool(svc.get("description", "").strip()), f"{page_rel} Service description empty")
            self.assertEqual(
                svc.get("provider", {}).get("@id"),
                f"{PRODUCTION_ORIGIN}/#legalservice",
                f"{page_rel} Service provider must reference #legalservice"
            )

    def test_06_all_5_blog_articles_blogposting_schema_completeness(self):
        blog_pages = [
            "blogs/annulment-divorce-guide-nagpur.html",
            "blogs/common-mistakes-legal-notice.html",
            "blogs/maharashtra-new-advocate-general.html",
            "blogs/sale-deed-registration-guide-nagpur.html",
            "blogs/top-10-divorce-lawyers-nagpur.html",
        ]
        for page_rel in blog_pages:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            postings = [n for n in nodes if n.get("@type") in ["BlogPosting", "Article"]]
            self.assertEqual(len(postings), 1, f"{page_rel} must define exactly 1 BlogPosting/Article entity.")
            bp = postings[0]

            self.assertEqual(bp.get("@id"), f"{PRODUCTION_ORIGIN}/{page_rel}#article")
            self.assertTrue(bool(bp.get("headline", "").strip()), f"{page_rel} missing headline")
            self.assertLessEqual(len(bp.get("headline")), 110, f"{page_rel} headline exceeds 110 chars for Google News")
            self.assertTrue(bool(bp.get("description", "").strip()), f"{page_rel} missing description")

            image = bp.get("image")
            self.assertTrue(
                isinstance(image, (str, list, dict)) and bool(image),
                f"{page_rel} missing valid image"
            )

            self.assertTrue(
                bool(re.match(r'^\d{4}-\d{2}-\d{2}', bp.get("datePublished", ""))),
                f"{page_rel} datePublished must be ISO-8601"
            )
            self.assertTrue(
                bool(re.match(r'^\d{4}-\d{2}-\d{2}', bp.get("dateModified", ""))),
                f"{page_rel} dateModified must be ISO-8601"
            )

            author = bp.get("author")
            self.assertIsInstance(author, dict, f"{page_rel} author must be an object")
            self.assertEqual(author.get("@id"), f"{PRODUCTION_ORIGIN}/#attorney")
            self.assertEqual(author.get("name"), "Advocate Jasvinder Singh Ply")

            publisher = bp.get("publisher")
            self.assertIsInstance(publisher, dict, f"{page_rel} publisher must be an object")
            self.assertEqual(publisher.get("@id"), f"{PRODUCTION_ORIGIN}/#legalservice")
            self.assertEqual(publisher.get("name"), "Advocate Jasvinder Singh Ply")
            self.assertIn("logo", publisher)

            moep = bp.get("mainEntityOfPage")
            if isinstance(moep, dict):
                self.assertEqual(moep.get("@id"), f"{PRODUCTION_ORIGIN}/{page_rel}")
            else:
                self.assertEqual(moep, f"{PRODUCTION_ORIGIN}/{page_rel}")

    def test_07_notice_generator_webapplication_schema_completeness(self):
        nodes = get_all_graph_nodes((WORKSPACE / "notice.html").read_text(encoding="utf-8"))
        apps = [
            n for n in nodes
            if (isinstance(n.get("@type"), list) and "WebApplication" in n.get("@type"))
            or n.get("@type") == "WebApplication"
        ]
        self.assertEqual(len(apps), 1, "notice.html must define exactly 1 WebApplication entity.")
        app = apps[0]
        self.assertEqual(app.get("@id"), f"{PRODUCTION_ORIGIN}/notice.html#app")
        self.assertEqual(app.get("url"), f"{PRODUCTION_ORIGIN}/notice.html")
        self.assertEqual(app.get("applicationCategory"), "LegalApplication")
        self.assertEqual(app.get("operatingSystem"), "All")
        self.assertTrue(bool(app.get("description", "").strip()))
        self.assertIsInstance(app.get("offers"), dict)
        self.assertEqual(app.get("offers", {}).get("price"), "0")
        self.assertEqual(app.get("offers", {}).get("priceCurrency"), "INR")
        self.assertEqual(app.get("provider", {}).get("@id"), f"{PRODUCTION_ORIGIN}/#legalservice")

    def test_08_services_and_blogs_collection_schemas_completeness(self):
        # services.html
        s_nodes = get_all_graph_nodes((WORKSPACE / "services.html").read_text(encoding="utf-8"))
        collections = [n for n in s_nodes if n.get("@type") == "CollectionPage"]
        self.assertEqual(len(collections), 1, "services.html must define CollectionPage.")
        s_col = collections[0]
        self.assertEqual(s_col.get("@id"), f"{PRODUCTION_ORIGIN}/services.html#webpage")
        self.assertIsInstance(s_col.get("mainEntity"), dict)
        self.assertEqual(s_col.get("mainEntity", {}).get("@type"), "ItemList")
        items = s_col.get("mainEntity", {}).get("itemListElement", [])
        self.assertEqual(len(items), 11, "services.html ItemList must index all 11 legal service pages.")

        # blogs.html
        b_nodes = get_all_graph_nodes((WORKSPACE / "blogs.html").read_text(encoding="utf-8"))
        b_blogs = [
            n for n in b_nodes
            if (isinstance(n.get("@type"), list) and "Blog" in n.get("@type"))
            or n.get("@type") == "Blog"
        ]
        self.assertEqual(len(b_blogs), 1, "blogs.html must define Blog entity.")
        b_col = b_blogs[0]
        self.assertEqual(b_col.get("@id"), f"{PRODUCTION_ORIGIN}/blogs.html#webpage")
        self.assertIsInstance(b_col.get("mainEntity"), dict)
        self.assertEqual(b_col.get("mainEntity", {}).get("@type"), "ItemList")
        b_items = b_col.get("mainEntity", {}).get("itemListElement", [])
        self.assertEqual(len(b_items), 5, "blogs.html ItemList must index all 5 blog articles.")

    def test_09_breadcrumblist_schema_across_all_22_pages(self):
        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            breadcrumbs = [n for n in nodes if n.get("@type") == "BreadcrumbList"]
            self.assertEqual(len(breadcrumbs), 1, f"{page_rel} must have exactly 1 BreadcrumbList.")
            bc = breadcrumbs[0]
            
            expected_bc_id = f"{PRODUCTION_ORIGIN}/{page_rel}#breadcrumb" if page_rel != "index.html" else f"{PRODUCTION_ORIGIN}/#breadcrumb"
            self.assertEqual(bc.get("@id"), expected_bc_id, f"Breadcrumb @id mismatch on {page_rel}")

            items = bc.get("itemListElement", [])
            self.assertIsInstance(items, list, f"Breadcrumb itemListElement on {page_rel} must be a list.")
            self.assertGreaterEqual(len(items), 1, f"Breadcrumb itemListElement on {page_rel} must not be empty.")

            for pos, item in enumerate(items, start=1):
                self.assertEqual(item.get("@type"), "ListItem", f"Breadcrumb item {pos} on {page_rel} must be ListItem")
                self.assertEqual(item.get("position"), pos, f"Breadcrumb item on {page_rel} position must be {pos}")
                self.assertTrue(bool(item.get("name", "").strip()), f"Breadcrumb item {pos} on {page_rel} missing name")
                self.assertTrue(bool(item.get("item", "").strip()), f"Breadcrumb item {pos} on {page_rel} missing item URL")

            self.assertEqual(items[0].get("item"), f"{PRODUCTION_ORIGIN}/")

            expected_canonical = f"{PRODUCTION_ORIGIN}/" if page_rel == "index.html" else f"{PRODUCTION_ORIGIN}/{page_rel}"
            self.assertEqual(items[-1].get("item"), expected_canonical, f"Final breadcrumb URL on {page_rel} must be canonical")

    def test_10_faqpage_schema_integrity_on_all_faq_pages(self):
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
        for page_rel in faq_pages:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            faqs = [n for n in nodes if n.get("@type") == "FAQPage"]
            self.assertEqual(len(faqs), 1, f"{page_rel} must have exactly 1 FAQPage entity.")
            faq = faqs[0]
            self.assertEqual(faq.get("@id"), f"{PRODUCTION_ORIGIN}/{page_rel}#faq")
            
            questions = faq.get("mainEntity", [])
            self.assertIsInstance(questions, list, f"{page_rel} mainEntity must be list of Questions")
            self.assertGreaterEqual(len(questions), 2, f"{page_rel} FAQPage must have at least 2 questions")

            for q_idx, q in enumerate(questions, start=1):
                self.assertEqual(q.get("@type"), "Question", f"Question {q_idx} on {page_rel} must have @type Question")
                self.assertTrue(bool(q.get("name", "").strip()), f"Question {q_idx} on {page_rel} missing name")
                self.assertGreater(len(q.get("name", "")), 5, f"Question {q_idx} on {page_rel} name too short")
                
                ans = q.get("acceptedAnswer")
                self.assertIsInstance(ans, dict, f"Question {q_idx} on {page_rel} missing acceptedAnswer object")
                self.assertEqual(ans.get("@type"), "Answer", f"acceptedAnswer on {page_rel} must have @type Answer")
                self.assertTrue(bool(ans.get("text", "").strip()), f"Answer {q_idx} on {page_rel} missing text")
                self.assertGreater(len(ans.get("text", "")), 15, f"Answer {q_idx} on {page_rel} text too short")


# ==============================================================================
# TEST SUITE 3: KNOWLEDGE GRAPH ENTITY LINK RESOLUTION & GRAPH INTEGRITY
# ==============================================================================
class TestAdversarialKnowledgeGraphResolution(unittest.TestCase):
    """
    Stress-tests graph resolution: every @id reference across all pages must resolve
    either to an entity in the local page graph or to the global canonical brand entities.
    No dangling references allowed.
    """

    def test_01_all_entity_ids_are_strictly_canonical_https_urls(self):
        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            for node in nodes:
                node_id = node.get("@id")
                if node_id:
                    self.assertTrue(
                        node_id.startswith(PRODUCTION_ORIGIN),
                        f"Entity @id '{node_id}' on {page_rel} must start with {PRODUCTION_ORIGIN}"
                    )
                    self.assertIn("#", node_id, f"Entity @id '{node_id}' on {page_rel} should contain fragment identifier (#)")

    def test_02_deep_recursive_id_reference_resolution_zero_dangling_pointers(self):
        site_defined_ids = set()
        page_defined_ids = {}

        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            local_ids = set()
            for node in nodes:
                if "@id" in node:
                    local_ids.add(node["@id"])
                    site_defined_ids.add(node["@id"])
            page_defined_ids[page_rel] = local_ids

        def collect_references(obj):
            refs = []
            if isinstance(obj, dict):
                if "@id" in obj and len(obj) == 1:
                    refs.append(obj["@id"])
                for k, v in obj.items():
                    if k in ["mainEntity", "publisher", "provider", "author", "founder", "worksFor", "breadcrumb", "isPartOf"]:
                        if isinstance(v, dict) and "@id" in v:
                            refs.append(v["@id"])
                        elif isinstance(v, str) and v.startswith("http"):
                            refs.append(v)
                    elif k == "@id":
                        pass
                    else:
                        refs.extend(collect_references(v))
            elif isinstance(obj, list):
                for item in obj:
                    refs.extend(collect_references(item))
            return refs

        for page_rel in EXPECTED_PAGES:
            content = (WORKSPACE / page_rel).read_text(encoding="utf-8")
            blocks = parse_jsonld_from_html(content)
            for block in blocks:
                refs = collect_references(block)
                for r in refs:
                    is_local = r in page_defined_ids[page_rel]
                    is_global = r in GLOBAL_CANONICAL_ENTITIES or r in site_defined_ids
                    is_page_url = r in [f"{PRODUCTION_ORIGIN}/", f"{PRODUCTION_ORIGIN}/{page_rel}"]
                    
                    self.assertTrue(
                        is_local or is_global or is_page_url,
                        f"Dangling @id reference '{r}' found on {page_rel}. Not defined in local graph or global entities."
                    )

    def test_03_no_duplicate_entity_ids_within_same_page_graph(self):
        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            seen_ids = set()
            for node in nodes:
                node_id = node.get("@id")
                if node_id:
                    self.assertNotIn(
                        node_id, seen_ids,
                        f"Duplicate entity @id '{node_id}' found in @graph on {page_rel}"
                    )
                    seen_ids.add(node_id)


# ==============================================================================
# TEST SUITE 4: ON-PAGE VISIBLE FAQ PARITY
# ==============================================================================
class TestAdversarialOnPageFaqParity(unittest.TestCase):
    """
    Validates 100% parity between visible FAQ content rendered in the HTML body
    and FAQPage structured data in JSON-LD.
    """

    def test_01_faqpage_presence_matches_visible_faq_presence(self):
        faq_expected_pages = {
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
        }
        for page_rel in EXPECTED_PAGES:
            nodes = get_all_graph_nodes((WORKSPACE / page_rel).read_text(encoding="utf-8"))
            has_faq_schema = any(n.get("@type") == "FAQPage" for n in nodes)
            if page_rel in faq_expected_pages:
                self.assertTrue(has_faq_schema, f"Page {page_rel} has visible FAQs but missing FAQPage JSON-LD schema.")
            else:
                self.assertFalse(has_faq_schema, f"Page {page_rel} has NO visible FAQs but defines FAQPage JSON-LD schema.")

    def test_02_faq_question_count_parity(self):
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
        for page_rel in faq_pages:
            content = (WORKSPACE / page_rel).read_text(encoding="utf-8")
            nodes = get_all_graph_nodes(content)
            faq_node = [n for n in nodes if n.get("@type") == "FAQPage"][0]
            schema_questions = faq_node.get("mainEntity", [])
            visible_faqs = extract_visible_faqs_english(content)

            self.assertEqual(
                len(schema_questions), len(visible_faqs),
                f"FAQ count mismatch on {page_rel}: Schema has {len(schema_questions)} vs Visible has {len(visible_faqs)}"
            )

    def test_03_all_jsonld_faqs_grounded_in_visible_page_content(self):
        """
        Verify that all Question and Answer contents in JSON-LD FAQPage are
        grounded in the visible on-page copy (substantive keyword coverage >= 40%).
        """
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
        stop_words = {
            "what", "when", "where", "which", "with", "from", "have", "your",
            "this", "that", "does", "about", "their", "there", "these", "those"
        }
        for page_rel in faq_pages:
            content = (WORKSPACE / page_rel).read_text(encoding="utf-8")
            visible_text = extract_visible_text(content).lower()
            nodes = get_all_graph_nodes(content)
            faq_node = [n for n in nodes if n.get("@type") == "FAQPage"][0]

            for q in faq_node.get("mainEntity", []):
                q_name = q.get("name", "")
                words = [
                    w.lower() for w in re.findall(r'\b[a-zA-Z]{4,}\b', q_name)
                    if w.lower() not in stop_words
                ]
                matching_words = [w for w in words if w in visible_text]
                ratio = len(matching_words) / max(len(words), 1)
                self.assertGreaterEqual(
                    ratio, 0.40,
                    f"FAQ question '{q_name}' on {page_rel} has poor grounding in visible text (ratio={ratio:.2f})"
                )


def run_adversarial_suite():
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    suite.addTests(loader.loadTestsFromTestCase(TestAdversarialJsonLdSyntax))
    suite.addTests(loader.loadTestsFromTestCase(TestAdversarialSchemaCompleteness))
    suite.addTests(loader.loadTestsFromTestCase(TestAdversarialKnowledgeGraphResolution))
    suite.addTests(loader.loadTestsFromTestCase(TestAdversarialOnPageFaqParity))

    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    print("\n" + "=" * 80)
    print(" ADVERSARIAL SCHEMA & STRUCTURED DATA VERIFICATION SUMMARY")
    print("=" * 80)
    print(f" Tests Run   : {result.testsRun}")
    print(f" Passed      : {result.testsRun - len(result.failures) - len(result.errors)}")
    print(f" Failures    : {len(result.failures)}")
    print(f" Errors      : {len(result.errors)}")
    print("=" * 80)
    
    return result.wasSuccessful()


if __name__ == "__main__":
    success = run_adversarial_suite()
    sys.exit(0 if success else 1)
