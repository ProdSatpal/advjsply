# E2E Test Infra: AdvJsply SEO & Technical Optimization

## Test Philosophy
- Opaque-box, requirement-driven automated verification.
- Validates all 22 HTML pages, sitemap.xml, robots.txt, schema JSON-LD, metadata lengths, canonicals, social images, and verifies 100% visible body content preservation.
- Zero external dependencies: uses Python 3.9+ standard library (`unittest`, `html.parser`, `xml.etree.ElementTree`, `json`, `hashlib`, `re`).

## Feature Inventory Coverage

| # | Feature | Source | Tier 1 (Coverage) | Tier 2 (Boundary/Edge) | Tier 3 (Cross-Feature) | Tier 4 (Real-World) |
|---|---------|--------|:-----------------:|:----------------------:|:----------------------:|:-------------------:|
| 1 | Canonical Tags | R1, AC | 22/22 pages | Empty/malformed URL checks | Canonical = og:url = sitemap URL | Crawler duplicate avoidance |
| 2 | Title & Meta Description | R1, AC | 22/22 pages | Length bounds (title <= 60, desc 50-160) | Title vs H1 semantic match | SERP Snippet Preview simulation |
| 3 | Open Graph & Twitter Cards | R1, AC | 22/22 pages | Missing tags / invalid og:type | Asset existence on disk (200 OK) | Social Card Rendering preview |
| 4 | Language & Encoding | R1 | 22/22 pages | Missing charset / lang tags | lang="en-IN" with og:locale="en_IN" | International/Local SEO targeting |
| 5 | JSON-LD Schema Validity | R2, AC | 22/22 pages | Syntax errors / broken JSON strings | Unified @graph entity resolution | Google Search Central Rich Snippet |
| 6 | Schema Required Fields | R2, AC | 22/22 pages | Missing author/publisher/date on blogs | FAQ visible content parity | LocalBusiness & Attorney Knowledge Panel |
| 7 | Sitemap Synchronization | R3, AC | 22 URLs | Malformed XML / orphan URLs | 1-to-1 bijection with HTML files | Freshness lastmod timestamp verification |
| 8 | Robots.txt Crawlability | R3, AC | All User-agents | Missing Allow / missing Sitemap | Sitemap location match | Search bot crawl accessibility |
| 9 | Content Preservation | R4, AC | 22/22 pages | Header / body / form hash checks | Visual layout DOM element parity | Zero regressions on user-facing text |

## Test Architecture
- **Location**: `tests/test_seo_compliance.py`
- **Runner invocation**: `python3 tests/test_seo_compliance.py` or `python3 -m unittest tests/test_seo_compliance.py`
- **Output**: Standard unittest runner with exit code 0 on complete pass.

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: > 22 assertions per category (Metadata, Schemas, Sitemap, Robots).
- **Tier 2 (Boundary & Corner Cases)**: Length boundaries (title 10-60 chars, description 50-160 chars, JSON-LD mandatory types).
- **Tier 3 (Cross-Feature Combinations)**: Canonical vs og:url vs sitemap URL parity; local assets verification for all image references.
- **Tier 4 (Real-World Acceptance)**: Google Search Central Rich Results simulator + Content Hash Invariance verification.
- **Total Assertions**: > 100 automated checks across all 22 pages.
