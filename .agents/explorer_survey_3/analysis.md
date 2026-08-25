# Technical Survey & Analysis: Test Suite, Blog Catalog & Cross-Linking Architecture

**Explorer**: Explorer 3  
**Date**: 2026-08-25  
**Working Directory**: `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_3/`  
**Target Project**: `/Users/satpalsingh/Projects/AdvJsply`  
**Target New Page**: `blogs/how-to-file-divorce-nagpur-guide.html`  

---

## 1. Automated Compliance Test Suite Analysis (`tests/test_seo_compliance.py`)

### 1.1 Test Suite Overview & Execution
The test suite at `tests/test_seo_compliance.py` is an end-to-end, zero-dependency test framework built exclusively with Python 3.9+ standard library (`unittest`, `html.parser`, `xml.etree.ElementTree`, `json`, `pathlib`, `re`, `hashlib`, `urllib.parse`).

**Execution Commands**:
```bash
python3 tests/test_seo_compliance.py
python3 -m unittest discover -s tests -p "test_*.py" -v
```

### 1.2 Test Tier Breakdown & Current Status
Currently, the test suite executes **25 test cases across 4 tiers** against 22 HTML pages:
- **Tier 1: Feature Coverage — HTML `<head>` Metadata Contracts (11 tests)**
  - `test_01_all_22_html_pages_discovered_on_disk`: Ensures discovered HTML files match `EXPECTED_HTML_FILES`.
  - `test_02_html_lang_attribute_en_IN`: Ensures `<html lang="en-IN">`.
  - `test_03_meta_charset_utf8`: Ensures `<meta charset="UTF-8">`.
  - `test_04_meta_viewport_responsive`: Ensures `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
  - `test_05_title_tag_presence_and_length_bounds`: Enforces 10 ≤ title length ≤ 60 characters.
  - `test_06_title_tags_uniqueness_across_site`: Enforces unique titles across all pages.
  - `test_07_meta_description_presence_and_length_bounds`: Enforces 50 ≤ meta description length ≤ 160 characters.
  - `test_08_meta_description_uniqueness_across_site`: Enforces unique meta descriptions.
  - `test_09_canonical_link_tag_presence_and_format`: Ensures canonical starts with `https://advocatejsply.com/`.
  - `test_10_opengraph_essential_metadata_tags`: Checks `og:title`, `og:description`, `og:url`, `og:image`, `og:type` (`article` for blog pages, `website` for others), `og:site_name` (`Advocate Jasvinder Singh Ply`), and `og:locale` (`en_IN`).
  - `test_11_twitter_cards_essential_metadata_tags`: Checks `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`.

- **Tier 2: Boundary & Schema.org Search Central Contracts (7 tests)**
  - `test_01_social_image_assets_exist_on_disk`: Resolves `og:image` and `twitter:image` to actual local disk files.
  - `test_02_jsonld_syntax_validity_and_schema_context`: Confirms valid JSON syntax and presence of `@context`.
  - `test_03_breadcrumblist_schema_on_all_pages`: Verifies `BreadcrumbList` on all pages with 1-based sequential positioning and URLs.
  - `test_04_blogposting_schema_google_search_central_requirements`: Iterates over `BLOG_PAGES` and enforces required fields: `headline`, `image`, `datePublished`, `dateModified`, `author.name`, `publisher.name`, `publisher.logo`, `mainEntityOfPage`, `description`.
  - `test_05_service_schema_on_practice_pages`: Verifies `Service` / `LegalService` on `PRACTICE_PAGES | {"legal-notices.html"}`.
  - `test_06_faqpage_schema_on_practice_pages`: Verifies `FAQPage` schema with valid `Question` and `acceptedAnswer.text`.
  - `test_07_core_pages_specific_schemas`: Verifies core schemas on `index.html`, `about.html`, `contact.html`, `services.html`, `notice.html`, `blogs.html`.

- **Tier 3: Cross-Feature Combinations & Indexability (4 tests)**
  - `test_01_canonical_matches_og_url`: Enforces exact match between `<link rel="canonical">` and `og:url`.
  - `test_02_canonical_matches_sitemap_loc`: Enforces canonical URL exists as `<loc>` in `sitemap.xml`.
  - `test_03_sitemap_xml_bijection_and_validity`:
    - Checks `len(self.sitemap_urls) == 22` (must become `23`).
    - Compares `sitemap_loc_set == expected_urls` (exact bijection with all HTML files).
    - Checks `lastmod` format `^\d{4}-\d{2}-\d{2}$`.
  - `test_04_robots_txt_crawlability_and_sitemap_directive`: Confirms `User-agent: *`, `Allow: /`, `Sitemap: https://advocatejsply.com/sitemap.xml`.

- **Tier 4: Content Preservation Guardrail & Real-World Integrity (3 tests)**
  - `test_01_dom_visible_text_extractable_and_non_empty`: Verifies visible body text > 100 characters.
  - `test_02_content_preservation_guardrail_baseline_hashes`: Compares SHA-256 hash of extracted visible body text against `BASELINE_CONTENT_HASHES`.
  - `test_03_schema_graph_id_resolution`: Validates that `@id` in JSON-LD matches accepted URI patterns (`#legalservice`, `#website`, `#attorney`, `#organization`, `#breadcrumb`, `#faq`, `#service`, `#app`, `#webpage`, `#article`).

---

### 1.3 Exact Code Updates Required in `tests/test_seo_compliance.py`

When adding `blogs/how-to-file-divorce-nagpur-guide.html`, the following updates to `tests/test_seo_compliance.py` are mandatory:

1. **`EXPECTED_HTML_FILES` Set (Line 42-65)**:
   Add `"blogs/how-to-file-divorce-nagpur-guide.html"`.
   ```python
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
       "blogs/how-to-file-divorce-nagpur-guide.html",  # <-- NEW
       "blogs/maharashtra-new-advocate-general.html",
       "blogs/sale-deed-registration-guide-nagpur.html",
       "blogs/top-10-divorce-lawyers-nagpur.html",
   }
   ```

2. **`BLOG_PAGES` Set (Line 90-96)**:
   Add `"blogs/how-to-file-divorce-nagpur-guide.html"`.
   ```python
   BLOG_PAGES = {
       "blogs/annulment-divorce-guide-nagpur.html",
       "blogs/common-mistakes-legal-notice.html",
       "blogs/how-to-file-divorce-nagpur-guide.html",  # <-- NEW
       "blogs/maharashtra-new-advocate-general.html",
       "blogs/sale-deed-registration-guide-nagpur.html",
       "blogs/top-10-divorce-lawyers-nagpur.html",
   }
   ```

3. **`BASELINE_CONTENT_HASHES` Dictionary (Line 100-123)**:
   - Add `"blogs/how-to-file-divorce-nagpur-guide.html"` with its computed SHA-256 text hash.
   - Update hash for `"blogs.html"` (since a new blog card is added).
   - Update hash for `"divorce-lawyer-nagpur.html"` (since cross-links are added).
   - Update hash for `"mutual-divorce-lawyer-nagpur.html"` (since cross-links are added).

4. **Sitemap Count Assertion in `test_03_sitemap_xml_bijection_and_validity` (Line 870-871)**:
   Change count assertion from `22` to `23`:
   ```python
   self.assertEqual(
       len(self.sitemap_urls), 23,
       f"sitemap.xml must contain exactly 23 URLs, found {len(self.sitemap_urls)}"
   )
   ```

5. **Docstrings & Comments**:
   Update docstrings in `TestTier1MetadataAndHeadContract.test_01_all_22_html_pages_discovered_on_disk` (rename or docstring to 23 pages), `test_04_blogposting_schema_google_search_central_requirements` ("all 6 blog articles"), `test_03_sitemap_xml_bijection_and_validity` ("contains exactly 23 URLs"), and suite header comments.

---

### 1.4 Verification Contract Checklist for the New Page (`blogs/how-to-file-divorce-nagpur-guide.html`)

To ensure the new page passes all assertions in `test_seo_compliance.py`, it must satisfy:
1. **`<html lang="en-IN">`**: Root tag.
2. **`<meta charset="UTF-8">`**: In `<head>`.
3. **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`**: In `<head>`.
4. **`<title>`**: Unique, length between 10 and 60 chars (e.g. `How to File Divorce in Nagpur | Adv. JS Ply` - 45 chars).
5. **`<meta name="description">`**: Unique, length between 50 and 160 chars (e.g. `Step-by-step advocate guide to filing for divorce in Nagpur. Learn Family Court jurisdiction, mutual vs contested procedures, documents, timelines & costs.` - 154 chars).
6. **`<link rel="canonical" href="https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html">`**: Matching canonical.
7. **Open Graph Tags**:
   - `og:type`: `"article"`
   - `og:locale`: `"en_IN"`
   - `og:site_name`: `"Advocate Jasvinder Singh Ply"`
   - `og:url`: `"https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html"`
   - `og:title`: Same or high-relevance title
   - `og:description`: Same or high-relevance description
   - `og:image`: `"https://advocatejsply.com/assets/images/divorce-hero.png"` (confirmed exists on disk)
8. **Twitter Card Tags**:
   - `twitter:card`: `"summary_large_image"`
   - `twitter:title`, `twitter:description`, `twitter:image`
9. **JSON-LD Schema (`<script type="application/ld+json">`)**:
   Unified `@graph` containing:
   - **`BlogPosting`**:
     - `@id`: `"https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#article"`
     - `headline`: `"How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs"`
     - `description`: Article summary / description
     - `image`: `["https://advocatejsply.com/assets/images/divorce-hero.png"]`
     - `datePublished`: `"2026-08-25T08:00:00+05:30"`
     - `dateModified`: `"2026-08-25T08:00:00+05:30"`
     - `inLanguage`: `"en-IN"`
     - `mainEntityOfPage`: `{"@type": "WebPage", "@id": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html"}`
     - `author`: `{"@type": "Person", "@id": "https://advocatejsply.com/#attorney", "name": "Advocate Jasvinder Singh Ply", "url": "https://advocatejsply.com/about.html"}`
     - `publisher`: `{"@type": "Organization", "@id": "https://advocatejsply.com/#legalservice", "name": "Advocate Jasvinder Singh Ply", "logo": {"@type": "ImageObject", "url": "https://advocatejsply.com/assets/images/logo.png"}}`
   - **`BreadcrumbList`**:
     - `@id`: `"https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#breadcrumb"`
     - Item 1: Position 1, Name "Home", Item `https://advocatejsply.com/`
     - Item 2: Position 2, Name "Blogs", Item `https://advocatejsply.com/blogs.html`
     - Item 3: Position 3, Name "How to File for Divorce in Nagpur", Item `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html`
   - **`FAQPage`**:
     - `@id`: `"https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#faq"`
     - `mainEntity`: Array of `Question` objects with all 6 FAQs from the guide, each with `name` and `acceptedAnswer.text`.

---

## 2. `blogs.html` Structure & Card Integration

### 2.1 Blog Catalog Structure
In `blogs.html`, the articles are rendered inside a 3-column responsive grid:
```html
<section class="py-24 bg-white relative">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <!-- Article Cards -->
        </div>
    </div>
</section>
```

### 2.2 Canonical Card Markup Specification
Based on the existing cards (e.g. `blogs/annulment-divorce-guide-nagpur.html` and `blogs/sale-deed-registration-guide-nagpur.html`), the exact card markup for the new article is:

```html
<!-- Blog Card: How to File for Divorce in Nagpur Guide (New) -->
<article class="group bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gold/10 flex flex-col relative transform hover:-translate-y-2">
    <div class="relative h-64 overflow-hidden">
        <img src="assets/images/divorce-hero.png" alt="How to File for Divorce in Nagpur" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute top-6 left-6">
            <span class="bg-navy/90 backdrop-blur-md text-gold text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-gold/30">Family Law</span>
        </div>
    </div>
    <div class="p-8 flex-grow flex flex-col bg-white">
        <div class="flex items-center text-gray-400 text-xs mb-4 space-x-6">
            <span class="flex items-center gap-2">
                <i data-lucide="calendar" class="h-4 w-4 text-gold"></i>
                August 25, 2026
            </span>
            <span class="flex items-center gap-2">
                <i data-lucide="clock" class="h-4 w-4 text-gold"></i>
                8 min read
            </span>
        </div>
        <h2 class="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">
            <a href="blogs/how-to-file-divorce-nagpur-guide.html" class="after:absolute after:inset-0">
                How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs
            </a>
        </h2>
        <p class="text-gray-600 mb-8 line-clamp-3 font-light leading-relaxed">
            Step-by-step advocate guide to mutual consent and contested divorce in Nagpur Family Court. Learn about court jurisdiction, documents required, timelines, and costs.
        </p>
        <div class="mt-auto pt-6 border-t border-gray-100">
            <span class="inline-flex items-center text-navy font-bold group-hover:text-gold transition-colors gap-2">
                Read Full Article <i data-lucide="arrow-right" class="h-4 w-4 transform group-hover:translate-x-2 transition-transform"></i>
            </span>
        </div>
    </div>
</article>
```

### 2.3 `blogs.html` Schema `@graph` Update
In `blogs.html`, update the JSON-LD `@graph` entity `["Blog", "CollectionPage"]` by adding the 6th item to `itemListElement`:
```json
{
  "@type": "ListItem",
  "position": 6,
  "name": "How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs",
  "url": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html"
}
```

---

## 3. Service Pages Cross-Linking Integration

### 3.1 Page 1: `divorce-lawyer-nagpur.html` (Contested Divorce Lawyer)

#### Architectural Layout Analysis:
- Layout: 3-column grid (`container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12`).
- Main Column (`lg:col-span-2`):
  1. Main glass card: `Protecting Your Rights & Future` (Lines 157-172)
  2. FAQ glass card: `Frequently Asked Questions` (Lines 174-199)
- Sidebar (`space-y-10`):
  1. Primary CTA: `Secure Your Future` (Lines 203-220)
  2. Location card: `Legal Presence` (Lines 222-235)

#### Recommended Cross-Linking Locations & Markup:

**Location A (Primary Contextual Banner in Main Column)**:
Insert between the main content glass card and the FAQ glass card in `divorce-lawyer-nagpur.html`:

```html
<!-- Contextual Guide Callout -->
<div class="glass-card p-8 rounded-3xl border-l-8 border-gold bg-gradient-to-r from-gold/10 via-white to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
    <div class="space-y-2">
        <div class="flex items-center gap-2">
            <span class="bg-navy text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Advocate Guide</span>
            <span class="text-xs text-gray-500 flex items-center gap-1"><i data-lucide="book-open" class="w-3.5 h-3.5 text-gold"></i> Complete Roadmap</span>
        </div>
        <h3 class="text-xl font-serif font-bold text-navy">How to File for Divorce in Nagpur: Step-by-Step Guide</h3>
        <p class="text-gray-600 text-sm font-light leading-relaxed">
            Detailed procedural guide covering Nagpur Family Court jurisdiction, contested grounds, document checklists, timelines, and court costs.
        </p>
    </div>
    <a href="blogs/how-to-file-divorce-nagpur-guide.html" class="inline-flex items-center text-navy font-bold bg-gold hover:bg-gold-dark px-6 py-3.5 rounded-2xl transition-all whitespace-nowrap gap-2 text-sm shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
        Read Full Guide <i data-lucide="arrow-right" class="w-4 h-4"></i>
    </a>
</div>
```

**Location B (Sidebar Resource Card)**:
Insert in the sidebar between `Secure Your Future` and `Legal Presence`:

```html
<!-- Sidebar Featured Guide Card -->
<div class="bg-navy text-white p-8 rounded-[32px] shadow-xl border border-gold/30 relative overflow-hidden group">
    <div class="absolute inset-0 carbon-pattern opacity-10"></div>
    <div class="relative z-10">
        <div class="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-3">
            <i data-lucide="file-text" class="w-4 h-4"></i> Legal Resource
        </div>
        <h4 class="text-xl font-serif font-bold mb-3 leading-snug">Nagpur Divorce Filing Guide</h4>
        <p class="text-gray-300 text-sm font-light mb-6 leading-relaxed">
            Understand court procedures, evidence preservation, maintenance, and custody before filing.
        </p>
        <a href="blogs/how-to-file-divorce-nagpur-guide.html" class="inline-flex items-center text-gold font-bold hover:text-white transition-colors gap-2 text-sm">
            Read Comprehensive Guide <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
    </div>
</div>
```

---

### 3.2 Page 2: `mutual-divorce-lawyer-nagpur.html` (Mutual Consent Divorce Lawyer)

#### Architectural Layout Analysis:
- Layout: 3-column grid (`container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12`).
- Main Column (`lg:col-span-2`):
  1. Main glass card: `Navigating Divorce with Dignity` (Lines 157-169)
  2. FAQ glass card: `Frequently Asked Questions` (Lines 171-196)
- Sidebar (`space-y-10`):
  1. Primary CTA: `Secure Your Future` (Lines 200-215)
  2. Location card: `Legal Hub` (Lines 217-230)

#### Recommended Cross-Linking Locations & Markup:

**Location A (Primary Contextual Banner in Main Column)**:
Insert between the main content glass card and the FAQ glass card in `mutual-divorce-lawyer-nagpur.html`:

```html
<!-- Contextual Guide Callout -->
<div class="glass-card p-8 rounded-3xl border-l-8 border-gold bg-gradient-to-r from-gold/10 via-white to-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
    <div class="space-y-2">
        <div class="flex items-center gap-2">
            <span class="bg-navy text-gold text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Practical Guide</span>
            <span class="text-xs text-gray-500 flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5 text-gold"></i> 8 Min Read</span>
        </div>
        <h3 class="text-xl font-serif font-bold text-navy">Nagpur Mutual Consent Divorce Process & Timeline Guide</h3>
        <p class="text-gray-600 text-sm font-light leading-relaxed">
            Learn about Section 13B procedures, 6-month cooling-off waiver applications, required MoU clauses, and Family Court motion hearings.
        </p>
    </div>
    <a href="blogs/how-to-file-divorce-nagpur-guide.html" class="inline-flex items-center text-navy font-bold bg-gold hover:bg-gold-dark px-6 py-3.5 rounded-2xl transition-all whitespace-nowrap gap-2 text-sm shadow-md hover:shadow-xl transform hover:-translate-y-0.5">
        Read Full Guide <i data-lucide="arrow-right" class="w-4 h-4"></i>
    </a>
</div>
```

**Location B (Sidebar Resource Card)**:
Insert in the sidebar between `Secure Your Future` and `Legal Hub`:

```html
<!-- Sidebar Featured Guide Card -->
<div class="bg-navy text-white p-8 rounded-[32px] shadow-xl border border-gold/30 relative overflow-hidden group">
    <div class="absolute inset-0 carbon-pattern opacity-10"></div>
    <div class="relative z-10">
        <div class="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider mb-3">
            <i data-lucide="file-text" class="w-4 h-4"></i> Legal Resource
        </div>
        <h4 class="text-xl font-serif font-bold mb-3 leading-snug">Nagpur Divorce Filing Guide</h4>
        <p class="text-gray-300 text-sm font-light mb-6 leading-relaxed">
            Complete guide to mutual consent documents, cooling-off waiver rules, and settlement agreements.
        </p>
        <a href="blogs/how-to-file-divorce-nagpur-guide.html" class="inline-flex items-center text-gold font-bold hover:text-white transition-colors gap-2 text-sm">
            Read Comprehensive Guide <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </a>
    </div>
</div>
```

---

## 4. `sitemap.xml` Integration Blueprint
In `sitemap.xml`, add the new URL entry under the `<!-- Blog Posts -->` section:
```xml
  <url>
    <loc>https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html</loc>
    <lastmod>2026-08-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
```
Total `<url>` entries in `sitemap.xml` will be 23.

---

## 5. Summary Table of Actionable Tasks for Workers

| Target File | Required Action | Critical Constraints |
|---|---|---|
| `blogs/how-to-file-divorce-nagpur-guide.html` | Create full HTML page with advocate guide, table, checklists, FAQ, and schema | `<html lang="en-IN">`, unique `<title>` (10-60 chars), unique `<meta description>` (120-155 chars), canonical URL, BlogPosting + BreadcrumbList + FAQPage `@graph` schema |
| `blogs.html` | Add blog card with thumbnail `assets/images/divorce-hero.png` and update schema ItemList | Exact Tailwind classes, badge `Family Law`, link to `blogs/how-to-file-divorce-nagpur-guide.html`, position 6 in schema |
| `divorce-lawyer-nagpur.html` | Add contextual cross-link callout card and/or sidebar resource card | Match site color palette (Navy/Gold), Lucide icons, responsive layout |
| `mutual-divorce-lawyer-nagpur.html` | Add contextual cross-link callout card and/or sidebar resource card | Match site color palette (Navy/Gold), Lucide icons, responsive layout |
| `sitemap.xml` | Add new `<url>` block with `lastmod="2026-08-25"` | Exactly 23 `<url>` entries |
| `tests/test_seo_compliance.py` | Add new file to `EXPECTED_HTML_FILES`, `BLOG_PAGES`, recompute SHA-256 hashes for `BASELINE_CONTENT_HASHES`, update sitemap count to 23 | 100% test pass rate across all 25 tests |

