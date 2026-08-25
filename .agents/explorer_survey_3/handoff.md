# 5-Component Handoff Report: Test Suite, Blog Hub, & Service Cross-Linking Survey

**Explorer**: Explorer 3  
**Date**: 2026-08-25  
**Working Directory**: `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_3/`  
**Target Project**: `/Users/satpalsingh/Projects/AdvJsply`  

---

## 1. Observation

1. **Test Suite Structure (`tests/test_seo_compliance.py`)**:
   - `EXPECTED_HTML_FILES` (lines 42–65): Defines a set of 22 HTML files.
   - `BLOG_PAGES` (lines 90–96): Defines a set of 5 blog HTML files:
     - `"blogs/annulment-divorce-guide-nagpur.html"`
     - `"blogs/common-mistakes-legal-notice.html"`
     - `"blogs/maharashtra-new-advocate-general.html"`
     - `"blogs/sale-deed-registration-guide-nagpur.html"`
     - `"blogs/top-10-divorce-lawyers-nagpur.html"`
   - `BASELINE_CONTENT_HASHES` (lines 100–123): Contains precomputed SHA-256 hashes of visible DOM body text for all 22 pages, including:
     - `"blogs.html": "47774e190de5350e1da346962257be3ff8fdb59170ad961806654031128e481a"`
     - `"divorce-lawyer-nagpur.html": "a1ea50a4ba28d53f30b8c53eba61db7b8fe29f4de620cd8b8ca9b572f5af9270"`
     - `"mutual-divorce-lawyer-nagpur.html": "c3be1db1669ee36e1ffc15762855eaf427be6a51f1df1a19740b786d9a2ccf25"`
   - `test_03_sitemap_xml_bijection_and_validity` (lines 867–873): Asserts `len(self.sitemap_urls) == 22`.
   - `test_04_blogposting_schema_google_search_central_requirements` (lines 602–660): Validates required properties (`headline`, `image`, `datePublished`, `dateModified`, `author.name`, `publisher.name`, `publisher.logo`, `mainEntityOfPage`, `description`) for all entries in `BLOG_PAGES`.
   - Running `python3 tests/test_seo_compliance.py` currently executes 25 tests, passing 25/25 with 0 failures and 0 errors in 0.180s.

2. **Blog Catalog Hub (`blogs.html`)**:
   - Layout: Responsive grid `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">` (lines 166–345).
   - Card Architecture: `<article class="group bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gold/10 flex flex-col relative transform hover:-translate-y-2">`.
   - Image & Badges: Image height `h-64`, badge `<span class="bg-navy/90 backdrop-blur-md text-gold text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-gold/30">Family Law</span>`.
   - Asset Availability: `assets/images/divorce-hero.png` exists locally on disk at `/Users/satpalsingh/Projects/AdvJsply/assets/images/divorce-hero.png`.
   - Schema Markup: Lines 67–139 feature JSON-LD `@graph` containing `["Blog", "CollectionPage"]` with `ItemList` and 5 `ListItem` elements.

3. **Service Pages Layout (`divorce-lawyer-nagpur.html` & `mutual-divorce-lawyer-nagpur.html`)**:
   - Both pages use a 2-column main area + 1-column sidebar layout (`grid grid-cols-1 lg:grid-cols-3 gap-12`).
   - Main column contains intro glass-card (`p-10 rounded-3xl`) and FAQ glass-card (`p-10 rounded-3xl`).
   - Sidebar contains CTA card (`bg-navy text-white p-10 rounded-[32px]`) and location card (`bg-white/95 backdrop-blur-md p-10 rounded-[32px]`).
   - Neither page currently contains links to blog guides.

---

## 2. Logic Chain

1. **Test Suite Synchronization (Observation 1)**:
   - When `blogs/how-to-file-divorce-nagpur-guide.html` is created on disk, `test_01_all_22_html_pages_discovered_on_disk` will fail unless `EXPECTED_HTML_FILES` includes the new path.
   - `test_04_blogposting_schema_google_search_central_requirements` tests all files in `BLOG_PAGES`. Adding `"blogs/how-to-file-divorce-nagpur-guide.html"` to `BLOG_PAGES` ensures Google Search Central schema validation automatically covers the new article.
   - `test_03_sitemap_xml_bijection_and_validity` explicitly checks `len(self.sitemap_urls) == 22`. Once the new URL is added to `sitemap.xml`, this test will fail unless the assertion is updated to `23`.
   - Adding content to `blogs.html`, `divorce-lawyer-nagpur.html`, and `mutual-divorce-lawyer-nagpur.html` changes their visible text and will cause `test_02_content_preservation_guardrail_baseline_hashes` to fail unless `BASELINE_CONTENT_HASHES` is updated with the newly computed SHA-256 hashes for these 3 modified pages and the new blog page.

2. **Blog Hub Integration (Observation 2)**:
   - To match the visual and structural design system, the new card in `blogs.html` must use the exact article markup, category badge (`Family Law`), thumbnail image (`assets/images/divorce-hero.png`), and Lucide icons (`calendar`, `clock`, `arrow-right`).
   - The JSON-LD schema in `blogs.html` must include a 6th `ListItem` in `itemListElement` pointing to `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html` to maintain structured data parity.

3. **Service Page Cross-Linking (Observation 3)**:
   - Contextual linking between practice pages and in-depth blog guides boosts topical authority and user engagement.
   - In `divorce-lawyer-nagpur.html` (contested divorce), the ideal placement is a highlighted callout card between the introductory section and FAQ section, highlighting procedural jurisdiction, contested grounds, and timelines.
   - In `mutual-divorce-lawyer-nagpur.html` (mutual consent divorce), the ideal placement is a highlighted callout card between the introduction and FAQs, focusing on Section 13B procedures, 6-month cooling-off waiver, and MoU checklists.
   - Additional sidebar resource cards can also be added for multi-device discoverability.

---

## 3. Caveats

- **No Caveats.** All 22 existing HTML pages, `sitemap.xml`, `robots.txt`, `assets/images/`, and `tests/test_seo_compliance.py` were inspected and verified with running diagnostics.

---

## 4. Conclusion

1. **Test Suite Modifications**:
   - In `tests/test_seo_compliance.py`:
     1. Add `"blogs/how-to-file-divorce-nagpur-guide.html"` to `EXPECTED_HTML_FILES`.
     2. Add `"blogs/how-to-file-divorce-nagpur-guide.html"` to `BLOG_PAGES`.
     3. Update `test_03_sitemap_xml_bijection_and_validity` assertion: `len(self.sitemap_urls) == 23`.
     4. Update `BASELINE_CONTENT_HASHES` with recomputed hashes for `blogs.html`, `divorce-lawyer-nagpur.html`, `mutual-divorce-lawyer-nagpur.html`, and `blogs/how-to-file-divorce-nagpur-guide.html`.
     5. Update docstrings and comments referencing 22 pages to 23 pages.

2. **`blogs.html` Updates**:
   - Insert new blog card matching the standard 3-column responsive card markup with `assets/images/divorce-hero.png` and `Family Law` badge.
   - Add 6th ListItem to `itemListElement` in the `["Blog", "CollectionPage"]` schema.

3. **Cross-Linking on Service Pages**:
   - Add contextual callout card in `divorce-lawyer-nagpur.html` linking to `blogs/how-to-file-divorce-nagpur-guide.html`.
   - Add contextual callout card in `mutual-divorce-lawyer-nagpur.html` linking to `blogs/how-to-file-divorce-nagpur-guide.html`.

4. **Detailed Technical Artifact**:
   - Comprehensive analysis, code snippets, schemas, and instructions are documented in `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_3/analysis.md`.

---

## 5. Verification Method

1. **Run Automated Test Suite**:
   ```bash
   python3 tests/test_seo_compliance.py
   python3 -m unittest discover -s tests -p "test_*.py" -v
   ```
   **Expected Result**: All 25 tests pass (0 failures, 0 errors) against all 23 HTML pages and 23 sitemap URLs.

2. **Check Sitemap Validity**:
   Verify `sitemap.xml` contains 23 `<url>` entries and includes `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html` with valid `lastmod` format `2026-08-25`.

3. **Check Cross-Links on Service Pages**:
   Inspect `divorce-lawyer-nagpur.html` and `mutual-divorce-lawyer-nagpur.html` for valid `href="blogs/how-to-file-divorce-nagpur-guide.html"` links and responsive styling.

4. **Check Blog Hub Integration**:
   Inspect `blogs.html` for the new card linking to `blogs/how-to-file-divorce-nagpur-guide.html` and verified JSON-LD schema entity.

---
