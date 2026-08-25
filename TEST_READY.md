# Test Suite Specification & Baseline Audit Report: AdvJsply Technical & On-Page SEO

**Workspace Root**: `/Users/satpalsingh/Projects/AdvJsply`  
**Test Suite Path**: `/Users/satpalsingh/Projects/AdvJsply/tests/test_seo_compliance.py`  
**Framework**: Python Standard Library (`unittest`, `html.parser`, `xml.etree.ElementTree`, `json`, `pathlib`, `re`, `hashlib`, `urllib.parse`)  
**External Dependencies**: 0 (Zero external packages required)  
**Execution Time**: ~150 ms  

---

## 1. Test Suite Overview

The automated test suite `tests/test_seo_compliance.py` provides 100% opaque-box, requirement-driven automated verification across all **22 active HTML pages**, XML sitemap, `robots.txt`, asset existence, Schema.org JSON-LD structured data, and content preservation guardrails.

### Scope & Target Inventory:
- **Core Pages (7)**: `index.html`, `about.html`, `services.html`, `legal-notices.html`, `contact.html`, `notice.html`, `blogs.html`
- **Practice Area Pages (10)**: `divorce-lawyer-nagpur.html`, `domestic-violence-lawyer-nagpur.html`, `legal-agreements-nagpur.html`, `legal-notice-service-nagpur.html`, `marriage-registration-lawyer-nagpur.html`, `mutual-divorce-lawyer-nagpur.html`, `partnership-deeds-nagpur.html`, `property-disputes-nagpur.html`, `property-registry-nagpur.html`, `will-writing-nagpur.html`
- **Blog Article Pages (5)**: `blogs/annulment-divorce-guide-nagpur.html`, `blogs/common-mistakes-legal-notice.html`, `blogs/maharashtra-new-advocate-general.html`, `blogs/sale-deed-registration-guide-nagpur.html`, `blogs/top-10-divorce-lawyers-nagpur.html`
- **Configuration & Indexability Artifacts (2)**: `sitemap.xml`, `robots.txt`

---

## 2. Test Execution Commands

### Diagnostic Runner (Recommended)
```bash
python3 tests/test_seo_compliance.py
```

### Standard Unittest Runner
```bash
python3 -m unittest discover -s tests -p "test_*.py" -v
```

---

## 3. Tier Coverage Breakdown

| Tier | Focus Area | Test Count | Current Pass | Current Fail | Description |
|---|---|:---:|:---:|:---:|---|
| **Tier 1** | **HTML Head Metadata & Feature Coverage** | 11 | 7 | 4 | Validates canonical links, `<title>` presence and lengths (10–60 chars), `<meta name="description">` lengths (50–160 chars), Open Graph (`og:*`) tags, Twitter Card tags, `<html lang="en-IN">`, `<meta charset="UTF-8">`, and responsive `<meta name="viewport">`. |
| **Tier 2** | **Boundary, Assets & Search Central Schemas** | 7 | 3 | 4 | Verifies disk existence for all `og:image` / `twitter:image` assets (detecting 404s); validates JSON-LD syntax; asserts Schema.org entity contracts (`BlogPosting` publisher/author/image/headline/date, `Service` provider/areaServed/serviceType, `FAQPage` questions/answers, `BreadcrumbList` positions/names/URLs, `LegalService`, `WebSite`, `Person`, `AboutPage`, `ContactPage`, `WebApplication`). |
| **Tier 3** | **Cross-Feature Parity & Indexability** | 4 | 2 | 2 | Asserts cross-component parity: `canonical URL == og:url == sitemap <loc>`; verifies 1-to-1 bijection between 22 HTML files and sitemap entries; checks `robots.txt` crawlability and sitemap link directive. |
| **Tier 4** | **Content Preservation Guardrail & Knowledge Graph** | 3 | 3 | 0 | Extracts visible body text (excluding `<script>`, `<style>`, `<noscript>`, `<svg>`) and computes SHA-256 baseline hashes across all 22 pages to ensure 0% user-facing content regressions during SEO refactoring; validates Schema `@graph` `@id` resolution. |
| **TOTAL** | **Full SEO Compliance Suite** | **25** | **15** | **10** | **Comprehensive automated quality gate.** |

---

## 4. Baseline Test Run Results (Pre-Optimization)

```
================================================================================
 ADVJSLPY TECHNICAL & ON-PAGE SEO COMPLIANCE AUDIT TEST RUNNER
================================================================================
 Workspace Root : /Users/satpalsingh/Projects/AdvJsply
 Total Pages    : 22 HTML files
 Sitemap Target : /Users/satpalsingh/Projects/AdvJsply/sitemap.xml
 Robots Target  : /Users/satpalsingh/Projects/AdvJsply/robots.txt
--------------------------------------------------------------------------------
 Tests Run   : 25
 Passed      : 15
 Failures    : 10
 Errors      : 0
================================================================================
```

### Detailed Baseline Defect Inventory (10 Failing Tests):

1. **`test_02_html_lang_attribute_en_IN` (Tier 1)**
   - *Status*: FAILED (22 pages)
   - *Defect*: All 22 HTML pages declare generic `<html lang="en">` instead of regionalized `<html lang="en-IN">`.
   - *Milestone Target*: M1

2. **`test_07_meta_description_presence_and_length_bounds` (Tier 1)**
   - *Status*: FAILED (2 pages)
   - *Defect*: Meta descriptions exceed 160 character boundary on `blogs/maharashtra-new-advocate-general.html` (166 chars) and `mutual-divorce-lawyer-nagpur.html` (165 chars).
   - *Milestone Target*: M1

3. **`test_09_canonical_link_tag_presence_and_format` (Tier 1)**
   - *Status*: FAILED (1 page)
   - *Defect*: `blogs.html` is completely missing `<link rel="canonical" href="https://advocatejsply.com/blogs.html">`.
   - *Milestone Target*: M1

4. **`test_10_opengraph_essential_metadata_tags` (Tier 1)**
   - *Status*: FAILED (22 pages)
   - *Defect*: Missing `og:locale="en_IN"` across all 22 pages; missing `og:site_name` on `index.html` and `legal-notices.html`; incorrect `og:type="article"` on `legal-notices.html`.
   - *Milestone Target*: M1

5. **`test_01_social_image_assets_exist_on_disk` (Tier 2)**
   - *Status*: FAILED (40 occurrences across 20 pages)
   - *Defect*: 20 HTML pages reference non-existent `assets/images/og-image.jpg` (404 broken asset).
   - *Milestone Target*: M1

6. **`test_04_blogposting_schema_google_search_central_requirements` (Tier 2)**
   - *Status*: FAILED (5 blog pages)
   - *Defect*: All 5 blog articles in `blogs/*.html` lack Google Search Central required properties: `publisher` (`Organization` + logo), `mainEntityOfPage` (`WebPage`), and `description`.
   - *Milestone Target*: M2

7. **`test_05_service_schema_on_practice_pages` (Tier 2)**
   - *Status*: FAILED (11 pages)
   - *Defect*: All 10 practice area pages (`*-nagpur.html`) and `legal-notices.html` lack dedicated `Service` / `LegalService` structured data.
   - *Milestone Target*: M2

8. **`test_07_core_pages_specific_schemas` (Tier 2)**
   - *Status*: FAILED (7 violations)
   - *Defect*: `index.html` lacks `WebSite`; `about.html` lacks `AboutPage` and `Person`/`Attorney`; `contact.html` lacks `ContactPage`; `services.html` lacks `CollectionPage`/`ItemList`; `notice.html` lacks `WebApplication`; `blogs.html` lacks `Blog`/`CollectionPage`.
   - *Milestone Target*: M2

9. **`test_01_canonical_matches_og_url` (Tier 3)**
   - *Status*: FAILED (1 page)
   - *Defect*: `blogs.html` fails canonical vs `og:url` parity due to missing canonical tag.
   - *Milestone Target*: M1 / M3

10. **`test_02_canonical_matches_sitemap_loc` (Tier 3)**
    - *Status*: FAILED (1 page)
    - *Defect*: `blogs.html` canonical tag is missing from page markup.
    - *Milestone Target*: M1 / M3

---

## 5. Content Preservation Guardrail Verification (Tier 4)

All 22 HTML pages have their visible body text extracted and fingerprinted via SHA-256:
- `about.html`: `41d17bdaed022f7fc30402e0459b8cc3469d132da660f7a4b85ada128e178105`
- `blogs.html`: `47774e190de5350e1da346962257be3ff8fdb59170ad961806654031128e481a`
- `blogs/annulment-divorce-guide-nagpur.html`: `f4fdb5306f1b693a71499f5ef35f35cf88055d3af270c34ecff216a5b233dd5d`
- `blogs/common-mistakes-legal-notice.html`: `0597892441dd15c9a5e6fe145d7f095f5541487e8fe2d9c04116b34b81183b81`
- `blogs/maharashtra-new-advocate-general.html`: `c0bc2d773dd83952498b609769a39a200e1128e8dddaebd94f55bc4aa4d1ebc0`
- `blogs/sale-deed-registration-guide-nagpur.html`: `9c201f94d3d49c69a6ac100a0bd3ed655f50ee7048a932d39b6bd93862109ddc`
- `blogs/top-10-divorce-lawyers-nagpur.html`: `f067393a8dcd9926e2c23dd3212e1cac788f7b284f6c5fbd4463aeb0cdcbcf37`
- `contact.html`: `26d1b1fad97447394cc16a8c667889cabcca339ad512f19305de1d4114ffa9b3`
- `divorce-lawyer-nagpur.html`: `a1ea50a4ba28d53f30b8c53eba61db7b8fe29f4de620cd8b8ca9b572f5af9270`
- `domestic-violence-lawyer-nagpur.html`: `89f74e4d7cdde207b8ff4b3ae94574a9b5c2927514622b21131de1d8ddd06ef2`
- `index.html`: `e9f13bb76f5b1745d724fc9f73896711f6035b14cc359545fed44ab38633f2f7`
- `legal-agreements-nagpur.html`: `acd75c79913f388bdfea398c39324c5b24c3fdf7746a6555453be2218c72f274`
- `legal-notice-service-nagpur.html`: `31e0d48864ce2adaf3b330a26daced1f5e1ef5cd489cf1aa8abefe1350768913`
- `legal-notices.html`: `5ea640f64d3ed5a443e11a88a81831e1907fd852ea5541eca888a3a19600d55d`
- `marriage-registration-lawyer-nagpur.html`: `e205b41055906cbbeb845381c123e6d090c0d9875949d2ac9111486b26e42e89`
- `mutual-divorce-lawyer-nagpur.html`: `c3be1db1669ee36e1ffc15762855eaf427be6a51f1df1a19740b786d9a2ccf25`
- `notice.html`: `c31a3091e4e3d0d686ab0440ad4eb785aa6bbdfb4e21e8717f3c364239f9f6ac`
- `partnership-deeds-nagpur.html`: `903b5bd3f8816be0d2df17de52a66a9f18f959ee2cc11001a82ddda80000d53c`
- `property-disputes-nagpur.html`: `5a7242011abe26f6433a20d3c32adbdf8424601efacec2023dde7ef969708aac`
- `property-registry-nagpur.html`: `d3b79c905559ce2006e395ca451eee14f88458578cba988b9cbf780512fc93dd`
- `services.html`: `82fbc2230b5fc49c7559d40bb8f8cdf52c92235b77f5d0a1153a0f3bc66f4d41`
- `will-writing-nagpur.html`: `ec6bd470142df36d066c55f09cb5fcc3548e35847649dc55c97866c3ad78dba9`

Any unintentional modification to visible on-page copy during upcoming milestone work will immediately fail `TestTier4ContentPreservationAndRealWorld.test_02_content_preservation_guardrail_baseline_hashes`.
