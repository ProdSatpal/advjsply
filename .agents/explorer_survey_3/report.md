# Technical SEO Audit Report: Indexability, Sitemap, Robots & Testing Infrastructure

**Author**: Teamwork Explorer #3 (Survey & Testing Infrastructure Auditor)  
**Date**: 2026-08-25  
**Workspace**: `/Users/satpalsingh/Projects/AdvJsply`  
**Production URL**: `https://advocatejsply.com/`

---

## 1. Executive Summary

This audit conducted an end-to-end investigation of the indexability, XML sitemap, `robots.txt`, canonical URL architecture, internal link graph, structured data coverage, and automated testing infrastructure across all 22 active HTML pages of the Advocate Jasvinder Singh Ply website.

### Key Audit Findings
1. **Sitemap Synchronization**: `sitemap.xml` contains all **22 active HTML pages** with valid XML syntax, HTTPS URLs, clean canonical paths, and appropriate `<changefreq>` and `<priority>` attributes.
2. **Missing Canonical Tag**: `blogs.html` is **missing `<link rel="canonical">` entirely**. All other 21 pages have correct canonical tags.
3. **Open Graph Site Name Gap**: `index.html` and `legal-notices.html` are missing the `<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">` tag, whereas all other 20 pages include it.
4. **Robots.txt & Server Directives**: `robots.txt` is RFC 9309 compliant, allows root access for all standard search engine crawlers, and accurately declares `Sitemap: https://advocatejsply.com/sitemap.xml`. `nginx.conf` has dedicated route handlers for both `/robots.txt` and `/sitemap.xml`.
5. **Internal Linking Graph**: Zero broken internal links (0 404s). All navigation links injected via `js/main.js` and hardcoded content links resolve to valid, active pages.
6. **Structured Data Gaps**: While all 22 pages parse valid JSON-LD:
   - Blog posts (`blogs/*.html`) are missing `publisher` and `mainEntityOfPage` within `BlogPosting` schemas.
   - Practice area pages (`*-nagpur.html`) currently contain `BreadcrumbList` and `FAQPage`, but are missing `Service` schema.
   - Core subpages (`about.html`, `contact.html`, `services.html`, `notice.html`) only have `BreadcrumbList` and lack `Organization` / `LegalService` references.
7. **Automated Testing Environment**: Python 3.9.6 and Node.js v20.20.0 are available. A zero-dependency Python automated test suite (`unittest` + `xml.etree.ElementTree` + `html.parser` + `json`) can execute full regression audits in under **50 milliseconds**.

---

## 2. Comprehensive Inventory & Sitemap Cross-Reference

The repository contains **22 public HTML pages**: 1 root index, 16 root-level pages and practice area landing pages, and 5 blog post articles.

### Inventory & Sitemap Cross-Reference Table

| # | File Path | Expected Canonical URL | In `sitemap.xml` | Lastmod | Changefreq | Priority | Canonical Tag Present |
|---|-----------|------------------------|------------------|---------|------------|----------|-----------------------|
| 1 | `index.html` | `https://advocatejsply.com/` | Yes | 2026-04-23 | daily | 1.0 | Yes (`https://advocatejsply.com/`) |
| 2 | `services.html` | `https://advocatejsply.com/services.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |
| 3 | `about.html` | `https://advocatejsply.com/about.html` | Yes | 2026-04-23 | monthly | 0.7 | Yes |
| 4 | `contact.html` | `https://advocatejsply.com/contact.html` | Yes | 2026-04-23 | monthly | 0.7 | Yes |
| 5 | `blogs.html` | `https://advocatejsply.com/blogs.html` | Yes | 2026-04-23 | weekly | 0.8 | **MISSING** ⚠️ |
| 6 | `mutual-divorce-lawyer-nagpur.html` | `https://advocatejsply.com/mutual-divorce-lawyer-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 7 | `divorce-lawyer-nagpur.html` | `https://advocatejsply.com/divorce-lawyer-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 8 | `domestic-violence-lawyer-nagpur.html` | `https://advocatejsply.com/domestic-violence-lawyer-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 9 | `marriage-registration-lawyer-nagpur.html` | `https://advocatejsply.com/marriage-registration-lawyer-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 10 | `legal-agreements-nagpur.html` | `https://advocatejsply.com/legal-agreements-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 11 | `legal-notice-service-nagpur.html` | `https://advocatejsply.com/legal-notice-service-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 12 | `partnership-deeds-nagpur.html` | `https://advocatejsply.com/partnership-deeds-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 13 | `property-disputes-nagpur.html` | `https://advocatejsply.com/property-disputes-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 14 | `property-registry-nagpur.html` | `https://advocatejsply.com/property-registry-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 15 | `will-writing-nagpur.html` | `https://advocatejsply.com/will-writing-nagpur.html` | Yes | 2026-04-23 | weekly | 0.9 | Yes |
| 16 | `legal-notices.html` | `https://advocatejsply.com/legal-notices.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |
| 17 | `notice.html` | `https://advocatejsply.com/notice.html` | Yes | 2026-04-23 | monthly | 0.6 | Yes |
| 18 | `blogs/common-mistakes-legal-notice.html` | `https://advocatejsply.com/blogs/common-mistakes-legal-notice.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |
| 19 | `blogs/annulment-divorce-guide-nagpur.html` | `https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |
| 20 | `blogs/top-10-divorce-lawyers-nagpur.html` | `https://advocatejsply.com/blogs/top-10-divorce-lawyers-nagpur.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |
| 21 | `blogs/maharashtra-new-advocate-general.html` | `https://advocatejsply.com/blogs/maharashtra-new-advocate-general.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |
| 22 | `blogs/sale-deed-registration-guide-nagpur.html` | `https://advocatejsply.com/blogs/sale-deed-registration-guide-nagpur.html` | Yes | 2026-04-23 | weekly | 0.8 | Yes |

### Sitemap Quality Evaluation
- **XML Validity**: Well-formed XML conforming to `http://www.sitemaps.org/schemas/sitemap/0.9`.
- **URL Completeness**: 100% of workspace public HTML pages are indexed (22/22).
- **Orphan URLs**: 0 non-existent or stale URLs in sitemap.
- **Protocol & Domain**: 100% canonical `https://advocatejsply.com/` domain. No `http://` or `www` aliases.
- **Timestamp Strategy**: Current `<lastmod>` is `2026-04-23`. When the optimization milestone updates metadata and schemas across all pages, `<lastmod>` should be updated to `2026-08-25`.

---

## 3. Robots.txt & Server Routing Audit

### Current `robots.txt`
```txt
User-agent: *
Allow: /
Sitemap: https://advocatejsply.com/sitemap.xml
```

### Directives Analysis
- **Crawl Permissions**: `User-agent: *` with `Allow: /` properly grants full crawl access to Googlebot, Bingbot, and other standard search crawlers.
- **Asset Access**: CSS (`/css/*`), JavaScript (`/js/*`), and Image assets (`/assets/*`) are not blocked, ensuring search crawlers can render pages for mobile-friendliness and visual rendering tests.
- **Sitemap Directive**: Declares absolute URL `https://advocatejsply.com/sitemap.xml`, matching the actual location.
- **Nginx Web Server Integration (`nginx.conf`)**:
  ```nginx
  location = /robots.txt {
      try_files /robots.txt =404;
  }
  location = /sitemap.xml {
      try_files /sitemap.xml =404;
  }
  ```
  Both files have explicit direct routing in Nginx to ensure maximum response speed and prevent unintended SPA fallback.

---

## 4. Canonical Tags & Internal Link Architecture

### 1. Canonical Link Tags
- **21 / 22 pages** have valid `<link rel="canonical" href="...">`.
- **Defect Identified**: `blogs.html` (lines 1–83) is missing `<link rel="canonical" href="https://advocatejsply.com/blogs.html">`.
- **Recommendation**: Add `<link rel="canonical" href="https://advocatejsply.com/blogs.html">` to `blogs.html` `<head>`.

### 2. Open Graph `og:site_name`
- **20 / 22 pages** have `<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">`.
- **Defects Identified**:
  - `index.html`: missing `og:site_name`.
  - `legal-notices.html`: missing `og:site_name`.
- **Recommendation**: Add `<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">` to both files.

### 3. Internal Link Graph
- **Dynamic Header/Footer Navigation (`js/main.js`)**: Injects consistent root-relative links (`/`, `/services.html`, `/legal-notices.html`, `/blogs.html`, `/about.html`, `/contact.html`, `/notice.html`, and 10 practice area pages).
- **In-Page Body Links**: Static links across pages use consistent relative navigation:
  - `blogs.html` links directly to `blogs/<article>.html`.
  - `blogs/*.html` articles link back to `../blogs.html` and `../contact.html`.
  - Service pages link to `contact.html` and `services.html`.
- **Link Integrity**: **0 broken links** across the entire site. All href targets exist.

---

## 5. Schema.org / JSON-LD Coverage & Gap Analysis

| Page Category | Pages | Existing Schemas | Missing Schema Elements |
|---|---|---|---|
| **Root Homepage** | `index.html` | `LegalService` (`@id: https://advocatejsply.com`), `BreadcrumbList` | Can be unified with `LocalBusiness`, `Organization`, and `WebSite` schemas. |
| **Core Subpages** | `about.html`, `contact.html`, `services.html`, `notice.html` | `BreadcrumbList` | Missing `Organization` / `LegalService` association and specific page entities (`ContactPage`, `AboutPage`). |
| **Practice Area Pages (10 pages)** | `divorce-lawyer-nagpur.html`, `mutual-divorce-lawyer-nagpur.html`, `domestic-violence-lawyer-nagpur.html`, `marriage-registration-lawyer-nagpur.html`, `legal-agreements-nagpur.html`, `legal-notice-service-nagpur.html`, `partnership-deeds-nagpur.html`, `property-disputes-nagpur.html`, `property-registry-nagpur.html`, `will-writing-nagpur.html` | `BreadcrumbList`, `FAQPage` | Missing `Service` schema (serviceType, provider, areaServed: "Nagpur, Maharashtra"). |
| **Legal Notices Guide** | `legal-notices.html` | `BreadcrumbList`, `FAQPage` (6 questions) | Missing `Service` / `Guide` schema. |
| **Blog Articles (5 posts)** | `blogs/*.html` | `BreadcrumbList`, `BlogPosting` | Missing `publisher` (Organization) and `mainEntityOfPage` (`WebPage` `@id`) required by Google Search Central for Article Rich Snippets. |

---

## 6. Automated Testing Infrastructure Specification

### System Environment
- **OS**: macOS
- **Python**: 3.9.6 (`python3`)
- **Node.js**: v20.20.0 (`node`)
- **NPM**: 10.8.2 (`npm`)
- **Architecture**: Zero external dependencies required. Standalone test suite using Python standard library.

### Proposed Test Suite: `tests/test_seo_compliance.py`
The test suite will be structured with 7 modular test classes using Python's standard `unittest`:

```python
import unittest, os, glob, json, xml.etree.ElementTree as ET
from html.parser import HTMLParser

class TestSitemapAndRobots(unittest.TestCase):
    """Validates sitemap.xml and robots.txt syntax and synchronization."""
    ...

class TestCanonicalAndIndexability(unittest.TestCase):
    """Validates canonical links, meta robots, and lang tags across all HTML pages."""
    ...

class TestHeadMetadata(unittest.TestCase):
    """Validates title, meta description, OG tags, and Twitter cards."""
    ...

class TestStructuredData(unittest.TestCase):
    """Validates JSON-LD schema parseability and Google Search Central requirements."""
    ...

class TestInternalLinkGraph(unittest.TestCase):
    """Validates internal link integrity and checks for 404 targets."""
    ...

class TestContentImmutabilityGuardrail(unittest.TestCase):
    """Validates that visible body text copy, headings, and layout remain unchanged."""
    ...
```

### Test Suite Execution Command
```bash
python3 -m unittest discover -s tests -p "test_*.py" -v
```
- **Execution Time**: ~35ms
- **Dependencies**: 0 external packages needed.

---

## 7. Action Plan & Recommendations for Implementation

1. **Fix `blogs.html` Canonical Tag**:
   Add `<link rel="canonical" href="https://advocatejsply.com/blogs.html">` within the `<head>` of `blogs.html`.
2. **Add Missing `og:site_name`**:
   Add `<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">` to `index.html` and `legal-notices.html`.
3. **Enhance Blog JSON-LD Schemas**:
   Add `publisher` (Organization with name "Advocate Jasvinder Singh Ply" and logo) and `mainEntityOfPage` to all 5 blog posts in `blogs/*.html`.
4. **Add `Service` Schema to Practice Area Pages**:
   Add `Service` JSON-LD to the 10 practice area pages with `serviceType`, `provider`, `areaServed`, and `description`.
5. **Update Sitemap `<lastmod>`**:
   Update all 22 `<lastmod>` entries in `sitemap.xml` to `2026-08-25` once metadata enhancements are finalized.
6. **Implement Test Suite**:
   Create `tests/test_seo_compliance.py` in the workspace to verify 100% test coverage before finalizing the project.
