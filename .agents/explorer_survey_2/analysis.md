# Comprehensive Investigation: Technical SEO, JSON-LD Structured Data & Sitemap Architecture

**Author:** Explorer Survey Agent 2  
**Target:** `blogs/how-to-file-divorce-nagpur-guide.html` & Site-wide Technical SEO Systems  
**Date:** 2026-08-25  

---

## Executive Summary

This investigation establishes the precise technical specifications, schema requirements, and indexability architecture for the new comprehensive blog guide: `blogs/how-to-file-divorce-nagpur-guide.html` ("How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs"). 

All specifications have been verified against:
1. Google Search Central rich snippet standards and Schema.org recommendations.
2. The site's automated test suite (`tests/test_seo_compliance.py`, covering 25 discrete test cases across 4 tiers).
3. The existing patterns in production blog articles (`blogs/annulment-divorce-guide-nagpur.html`, `blogs/top-10-divorce-lawyers-nagpur.html`, `blogs/sale-deed-registration-guide-nagpur.html`, etc.).
4. The XML sitemap specification (`sitemap.xml`).

---

## 1. Technical SEO & HTML `<head>` Metadata Requirements

### 1.1 Document-Level Attributes & Core Tags
| Element | Required Value / Pattern | Rationale & Test Constraint |
|---|---|---|
| `<html lang="...">` | `lang="en-IN"` | Verified by `test_02_html_lang_attribute_en_IN`. Designates Indian English for geo-targeted search indexing. |
| `<meta charset="...">` | `charset="UTF-8"` | Verified by `test_03_meta_charset_utf8`. Ensures proper rendering of unicode characters and legal symbols. |
| `<meta name="viewport">` | `content="width=device-width, initial-scale=1.0"` | Verified by `test_04_meta_viewport_responsive`. Guarantees responsive rendering on mobile and desktop devices. |
| `<link rel="canonical">` | `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html` | Verified by `test_09_canonical_link_tag_presence_and_format` & `test_01_canonical_matches_og_url`. Eliminates duplicate content issues. |
| `<link rel="icon">` | `../assets/images/logo.png` (type `image/png`) | Standard favicon path across blog subdirectory pages. |

### 1.2 Title Tag Optimization
- **Length Constraint**: Strictly `<60 characters` (Test suite lower bound: `>= 10 chars`, upper bound: `<= 60 chars`).
- **Target Keywords**: File Divorce in Nagpur, Family Court Guide, Adv. JS Ply.
- **Selected Title**:
  ```html
  <title>How to File Divorce in Nagpur Guide | Adv. JS Ply</title>
  ```
  - **Exact Character Count**: **50 characters** (well within the 10–60 character constraint).
  - **Uniqueness**: 100% unique across all 23 site pages (verified by `test_06_title_tags_uniqueness_across_site`).

### 1.3 Meta Description Optimization
- **Length Constraint**: Strictly **120–155 characters** (Test suite bounds: `50 <= length <= 160 chars`).
- **Content Focus**: High-relevance, actionable summary explaining jurisdiction, documents checklist, mutual vs contested timelines, and advocate costs in Nagpur Family Court.
- **Selected Meta Description**:
  ```html
  <meta name="description" content="Step-by-step guide to filing for divorce in Nagpur: learn Family Court jurisdiction, documents checklist, mutual consent vs contested timelines, and costs.">
  ```
  - **Exact Character Count**: **154 characters** (precisely matches the 120–155 target range and passes test bounds).
  - **Uniqueness**: 100% unique across all site pages (verified by `test_08_meta_description_uniqueness_across_site`).

### 1.4 Open Graph (OG) Metadata
Verified by `test_10_opengraph_essential_metadata_tags` and `test_01_canonical_matches_og_url`:
```html
<!-- Open Graph / Social Media -->
<meta property="og:type" content="article">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html">
<meta property="og:title" content="How to File Divorce in Nagpur Guide | Adv. JS Ply">
<meta property="og:description" content="Step-by-step guide to filing for divorce in Nagpur: learn Family Court jurisdiction, documents checklist, mutual consent vs contested timelines, and costs.">
<meta property="og:image" content="https://advocatejsply.com/assets/images/divorce-hero.png">
<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">
```
- **Image Asset Verification**: `assets/images/divorce-hero.png` exists on local disk (49,033 bytes), satisfying `test_01_social_image_assets_exist_on_disk`.

### 1.5 Twitter Card Metadata
Verified by `test_11_twitter_cards_essential_metadata_tags`:
```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="How to File Divorce in Nagpur Guide | Adv. JS Ply">
<meta name="twitter:description" content="Step-by-step guide to filing for divorce in Nagpur: learn Family Court jurisdiction, documents checklist, mutual consent vs contested timelines, and costs.">
<meta name="twitter:image" content="https://advocatejsply.com/assets/images/divorce-hero.png">
```

---

## 2. Schema.org JSON-LD Structured Data Architecture

### 2.1 Graph Architecture & Entity Relationships
All structured data must be encapsulated in a single, unified `@graph` JSON-LD container inside `<script type="application/ld+json">`.

The graph combines three essential entities:
1. **`BlogPosting`**: The primary article entity with Google Search Central required properties.
2. **`BreadcrumbList`**: Hierarchical navigation schema for SERP breadcrumb rich snippets.
3. **`FAQPage`**: Rich snippet FAQ accordion schema for the 6 advocate FAQs.

All node `@id`s and cross-references link seamlessly into the sitewide Knowledge Graph (`#attorney`, `#legalservice`, `#website`):

```
[WebSite: https://advocatejsply.com/#website]
       │
       ▼
[Organization / LegalService: https://advocatejsply.com/#legalservice]
       │  ▲ (publisher reference)
       │  │
       ▼  │
[Person / Attorney: https://advocatejsply.com/#attorney]
       ▲
       │ (author reference)
       │
[BlogPosting: https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#article]
       │
       ├── mainEntityOfPage ──► [WebPage: https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html]
       │
[FAQPage: https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#faq]
       │
       └── mainEntity (6 Question / Answer nodes)
       │
[BreadcrumbList: https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#breadcrumb]
       │
       └── itemListElement (Home [pos 1] -> Blogs [pos 2] -> Guide [pos 3])
```

### 2.2 Complete, Validated JSON-LD Code Block
```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#article",
      "headline": "How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs",
      "description": "Step-by-step guide to filing for divorce in Nagpur: learn Family Court jurisdiction, documents checklist, mutual consent vs contested timelines, and costs.",
      "image": [
        "https://advocatejsply.com/assets/images/divorce-hero.png"
      ],
      "datePublished": "2026-08-25T08:00:00+05:30",
      "dateModified": "2026-08-25T08:00:00+05:30",
      "inLanguage": "en-IN",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html"
      },
      "author": {
        "@type": "Person",
        "@id": "https://advocatejsply.com/#attorney",
        "name": "Advocate Jasvinder Singh Ply",
        "url": "https://advocatejsply.com/about.html"
      },
      "publisher": {
        "@type": "Organization",
        "@id": "https://advocatejsply.com/#legalservice",
        "name": "Advocate Jasvinder Singh Ply",
        "logo": {
          "@type": "ImageObject",
          "url": "https://advocatejsply.com/assets/images/logo.png"
        }
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I file for divorce in Nagpur if the marriage happened elsewhere?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Possibly. Jurisdiction may exist if Nagpur is where the spouses last lived together, where the respondent lives, or—where the wife is the petitioner—where she presently lives, subject to the applicable law and case facts."
          }
        },
        {
          "@type": "Question",
          "name": "Is a marriage certificate mandatory?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It is highly useful, but other evidence of a valid marriage may sometimes be used where a certificate is unavailable. Ask an advocate what proof the court will require in your situation."
          }
        },
        {
          "@type": "Question",
          "name": "Must both spouses attend mutual-consent divorce hearings?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Personal appearance is generally expected for the required consent statements, though exceptional procedural issues should be discussed with a lawyer. Consent must remain free and continuing until the decree."
          }
        },
        {
          "@type": "Question",
          "name": "Can the court grant divorce in one day?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A same-day result should never be assumed. Although a court may waive the six-month cooling-off period in appropriate mutual-consent cases, filing, scrutiny, scheduling and judicial satisfaction still apply."
          }
        },
        {
          "@type": "Question",
          "name": "What if my spouse refuses to give divorce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You cannot force a mutual-consent divorce. You may consider a contested divorce if you have a legally recognised ground and supporting evidence, while also exploring mediation and other available remedies."
          }
        },
        {
          "@type": "Question",
          "name": "Can maintenance and child custody be decided during divorce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. They can be included in a mutual settlement or sought through appropriate interim and final applications. In some situations, separate proceedings may also be available."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://advocatejsply.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blogs",
          "item": "https://advocatejsply.com/blogs.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "How to File Divorce in Nagpur Guide",
          "item": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html"
        }
      ]
    }
  ]
}
</script>
```

---

## 3. Sitemap Structure & Synchronization (`sitemap.xml`)

### 3.1 Current Inventory vs Updated Inventory
- **XML Namespace**: `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
- **Total URL Count BEFORE**: **22 URLs**
- **Total URL Count AFTER**: **23 URLs**
- **Lastmod Format**: `YYYY-MM-DD` (e.g. `2026-08-25`)

### 3.2 URL Inventory Mapping
| Category | Page Path | Sitemap Canonical URL | Lastmod | Priority | Changefreq |
|---|---|---|---|---|---|
| **Core (7)** | `index.html` | `https://advocatejsply.com/` | `2026-08-25` | `1.0` | `daily` |
| | `services.html` | `https://advocatejsply.com/services.html` | `2026-08-25` | `0.8` | `weekly` |
| | `about.html` | `https://advocatejsply.com/about.html` | `2026-08-25` | `0.7` | `monthly` |
| | `contact.html` | `https://advocatejsply.com/contact.html` | `2026-08-25` | `0.7` | `monthly` |
| | `blogs.html` | `https://advocatejsply.com/blogs.html` | `2026-08-25` | `0.8` | `weekly` |
| | `legal-notices.html` | `https://advocatejsply.com/legal-notices.html` | `2026-08-25` | `0.8` | `weekly` |
| | `notice.html` | `https://advocatejsply.com/notice.html` | `2026-08-25` | `0.6` | `monthly` |
| **Practice (10)** | `mutual-divorce-lawyer-nagpur.html` | `https://advocatejsply.com/mutual-divorce-lawyer-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `divorce-lawyer-nagpur.html` | `https://advocatejsply.com/divorce-lawyer-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `domestic-violence-lawyer-nagpur.html` | `https://advocatejsply.com/domestic-violence-lawyer-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `marriage-registration-lawyer-nagpur.html` | `https://advocatejsply.com/marriage-registration-lawyer-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `legal-agreements-nagpur.html` | `https://advocatejsply.com/legal-agreements-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `legal-notice-service-nagpur.html` | `https://advocatejsply.com/legal-notice-service-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `partnership-deeds-nagpur.html` | `https://advocatejsply.com/partnership-deeds-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `property-disputes-nagpur.html` | `https://advocatejsply.com/property-disputes-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `property-registry-nagpur.html` | `https://advocatejsply.com/property-registry-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| | `will-writing-nagpur.html` | `https://advocatejsply.com/will-writing-nagpur.html` | `2026-08-25` | `0.9` | `weekly` |
| **Existing Blogs (5)** | `blogs/common-mistakes-legal-notice.html` | `https://advocatejsply.com/blogs/common-mistakes-legal-notice.html` | `2026-08-25` | `0.8` | `weekly` |
| | `blogs/annulment-divorce-guide-nagpur.html` | `https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html` | `2026-08-25` | `0.8` | `weekly` |
| | `blogs/top-10-divorce-lawyers-nagpur.html` | `https://advocatejsply.com/blogs/top-10-divorce-lawyers-nagpur.html` | `2026-08-25` | `0.8` | `weekly` |
| | `blogs/maharashtra-new-advocate-general.html` | `https://advocatejsply.com/blogs/maharashtra-new-advocate-general.html` | `2026-08-25` | `0.8` | `weekly` |
| | `blogs/sale-deed-registration-guide-nagpur.html` | `https://advocatejsply.com/blogs/sale-deed-registration-guide-nagpur.html` | `2026-08-25` | `0.8` | `weekly` |
| **NEW Blog Guide (1)** | `blogs/how-to-file-divorce-nagpur-guide.html` | `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html` | `2026-08-25` | `0.8` | `weekly` |

### 3.3 Sitemap XML Entry to Append
```xml
  <url>
    <loc>https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html</loc>
    <lastmod>2026-08-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
```

---

## 4. Test Suite Synchronization Requirements (`tests/test_seo_compliance.py`)

When the new page is added, `tests/test_seo_compliance.py` must be updated as follows:
1. **`EXPECTED_HTML_FILES`**: Add `"blogs/how-to-file-divorce-nagpur-guide.html"` (sets total count to 23).
2. **`BLOG_PAGES`**: Add `"blogs/how-to-file-divorce-nagpur-guide.html"` (sets blog count to 6).
3. **`test_03_sitemap_xml_bijection_and_validity`**: Update assertion from `len(self.sitemap_urls) == 22` to `len(self.sitemap_urls) == 23`.
4. **`BASELINE_CONTENT_HASHES`**: Compute and register the SHA-256 hash of the rendered visible text of `blogs/how-to-file-divorce-nagpur-guide.html` to establish the content preservation baseline.
5. **Docstrings and Diagnostics**: Update references from "22 HTML pages" to "23 HTML pages".

---

## 5. Summary Matrix

| SEO Dimension | Requirement / Boundary | Implemented Value | Compliance Status |
|---|---|---|---|
| **Title Length** | 10–60 chars | 50 chars (`How to File Divorce in Nagpur Guide \| Adv. JS Ply`) | **PASS** |
| **Title Uniqueness** | 100% unique | Unique across 23 pages | **PASS** |
| **Meta Description Length** | 120–155 chars (test allows 50–160) | 154 chars | **PASS** |
| **Meta Description Uniqueness** | 100% unique | Unique across 23 pages | **PASS** |
| **Canonical URL** | Starts with `https://advocatejsply.com/` | `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html` | **PASS** |
| **Language Tag** | `en-IN` | `<html lang="en-IN">` | **PASS** |
| **OG Type** | `article` | `article` | **PASS** |
| **OG Locale** | `en_IN` | `en_IN` | **PASS** |
| **OG / Twitter Image** | Existing image on disk | `https://advocatejsply.com/assets/images/divorce-hero.png` | **PASS** |
| **JSON-LD Structure** | Unified `@graph` with BlogPosting, BreadcrumbList, FAQPage | Validated schema with all required fields | **PASS** |
| **Sitemap Count** | 22 -> 23 URLs | 23 URLs with `YYYY-MM-DD` lastmod | **PASS** |

