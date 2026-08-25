# Project: Advocate Jasvinder Singh Ply — Divorce Guide Blog & SEO Integration

## Architecture
- Static HTML5 website with Tailwind CSS utility classes, custom `css/styles.css`, vanilla JavaScript (`js/main.js`, `js/translations.js`), and centralized assets directory (`assets/images/`).
- Automated Python/pytest test harness (`tests/test_seo_compliance.py`) enforcing SEO, metadata, JSON-LD Schema.org `@graph`, sitemap.xml bijection, responsive meta, open graph, accessibility alt tags, and baseline SHA-256 integrity.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Blog Guide HTML Creation | Author `blogs/how-to-file-divorce-nagpur-guide.html` with full semantic structure (disclaimer, summary table, jurisdiction, mutual vs contested procedures, checklist, timelines, costs, 6 FAQs, CTA banner, author bio, header/footer) matching exact design system. | M1 | Survey (Explorer 1) |
| 2 | Technical SEO & Structured Data | Embed strict SEO meta tags (<60 char title, 120-155 char description, canonical URL, OG, Twitter) and valid Search Central `@graph` JSON-LD (BlogPosting, BreadcrumbList, FAQPage). | M1 | Survey (Explorer 2) |
| 3 | Blog Catalog & Service Cross-Links | Update `blogs.html` with 6th article card and schema ItemList; add contextual callout cards linking to new guide in `divorce-lawyer-nagpur.html` and `mutual-divorce-lawyer-nagpur.html`. | M2 | Survey (Explorer 3) |
| 4 | Sitemap & Test Suite Synchronization | Add new guide to `sitemap.xml` with 2026-08-25 lastmod (23 pages total). Update `tests/test_seo_compliance.py` (EXPECTED_HTML_FILES, BLOG_PAGES, sitemap count assertion, BASELINE_CONTENT_HASHES) and verify 100% test pass rate. | M2 | Survey (Explorer 2, 3) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Blog Guide Authoring & Schema | Create `blogs/how-to-file-divorce-nagpur-guide.html` with complete responsive design, typography, semantic sections, and @graph JSON-LD structured data. | none | DONE |
| M2 | Site Integration, Sitemap & Test Pass | Update `blogs.html`, `divorce-lawyer-nagpur.html`, `mutual-divorce-lawyer-nagpur.html`, `sitemap.xml`, and `tests/test_seo_compliance.py`. Run test suite to 100% pass. | M1 | DONE |

## Code Layout
- `blogs/how-to-file-divorce-nagpur-guide.html` — New comprehensive blog guide
- `blogs.html` — Main blogs directory/listing page
- `divorce-lawyer-nagpur.html` — Practice page for divorce law
- `mutual-divorce-lawyer-nagpur.html` — Practice page for mutual consent divorce
- `sitemap.xml` — XML sitemap listing all 23 indexed URLs
- `tests/test_seo_compliance.py` — Pytest automated compliance test suite

## Interface Contracts
- Canonical URL: `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html`
- Asset Paths for Blog Subpages: relative paths `../assets/images/divorce-hero.png`, `../css/styles.css`, `../js/main.js`
- Schema Graph Entities: `BlogPosting`, `BreadcrumbList`, `FAQPage`
- Test Suite: 23 total files in `EXPECTED_HTML_FILES`, 6 files in `BLOG_PAGES`, 23 URLs in `sitemap.xml`
