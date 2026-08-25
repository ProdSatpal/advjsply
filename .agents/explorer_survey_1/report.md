# Comprehensive HTML Page Inventory & Current Metadata Audit

**Project:** Advocate Jasvinder Singh Ply — Technical & On-Page SEO  
**Workspace:** `/Users/satpalsingh/Projects/AdvJsply`  
**Audit Date:** August 25, 2026  
**Auditor:** Teamwork Preview Explorer #1 (`explorer_survey_1`)  
**Scope:** Complete inventory and multi-dimensional metadata audit of all 22 HTML pages in repository.

---

## 1. Executive Summary & Page Inventory

The website comprises **22 public HTML pages** categorized into five functional groups:
- **5 Core Brand & Navigation Pages** (`index.html`, `about.html`, `services.html`, `legal-notices.html`, `contact.html`)
- **10 Practice Area & Specialized Legal Service Pages** (covering Family Law, Matrimonial, Criminal/DV, Property, Contracts, Wills)
- **1 Interactive Tool / Legal Notice Generator Page** (`notice.html`)
- **1 Blog Hub Page** (`blogs.html`)
- **5 In-depth Legal Blog Articles** (located in `/blogs/`)

### High-Level Audit Findings Matrix

| Component | Status | Key Findings & Deficiencies |
| :--- | :---: | :--- |
| **HTML Page Count** | 22 Total | 100% accounted for in workspace and sitemap. |
| **`<title>` Tags** | ⚠️ Sub-optimal | All 22 pages have titles under 60 chars (range: 45–59), but brand suffixes vary across 5 inconsistent naming formats. |
| **`<meta name="description">`** | ⚠️ Issues Found | 2 pages exceed 160 chars (`blogs/maharashtra-new-advocate-general.html`: 166 chars, `mutual-divorce-lawyer-nagpur.html`: 165 chars). 5 pages are under 140 chars. |
| **`<link rel="canonical">`** | ❌ Defect Found | **`blogs.html` is completely missing a canonical link tag**. The other 21 pages have valid canonicals. |
| **Language Attributes** | ⚠️ Warning | All pages use generic `lang="en"` instead of regionalized `lang="en-IN"`. Zero `hreflang` alternate links. |
| **Open Graph (`og:*`)** | ❌ Critical Defect | **20 of 22 pages reference `og-image.jpg` which does NOT exist on disk (404 broken image)**. `index.html` and `legal-notices.html` miss `og:site_name`. All 22 miss `og:locale`. `legal-notices.html` uses incorrect `og:type="article"`. |
| **Twitter Card (`twitter:*`)** | ❌ Critical Defect | All 22 have `summary_large_image`, but 20 reference missing `og-image.jpg`. Missing `twitter:site` / `twitter:creator`. |
| **Charset & Viewport** | ✅ Compliant | All 22 pages have valid `<meta charset="UTF-8">` and responsive mobile `<meta name="viewport">`. |
| **JSON-LD Structured Data** | ⚠️ Deficiencies | Practice pages lack `Service` schemas; blog posts lack `publisher`, `description`, `mainEntityOfPage`; core pages lack `WebSite`, `Organization`, `ContactPage`, `AboutPage`. |
| **Sitemap & Robots** | ✅ Aligned | 22 URLs in `sitemap.xml` perfectly match all 22 HTML pages. `robots.txt` correctly permits crawling. |

---

## 2. Complete HTML Page Inventory & Metadata Audit Table

| # | File Path | Category | `<title>` (Chars) | `<meta description>` (Chars) | Canonical URL | Open Graph Image | Schemas Present |
|---|---|---|---|---|---|---|---|
| 1 | `index.html` | Core | Advocate Jasvinder Singh Ply \| High Court Lawyer in Nagpur (58) | Expert legal services by Adv. Jasvinder Singh Ply in Nagpur. Specializing in Property Disputes, Family Law, Criminal Defense, and Legal Notice drafting. (152) | `https://advocatejsply.com/` | `assets/images/logo.png` | `LegalService`, `BreadcrumbList` |
| 2 | `about.html` | Core | About Advocate Jasvinder Singh Ply \| Nagpur High Court (57) | Learn about Advocate Jasvinder Singh Ply, a trusted High Court lawyer in Nagpur with expertise in civil, criminal, family, and property law cases. (146) | `https://advocatejsply.com/about.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList` |
| 3 | `services.html` | Core | Legal Services \| Advocate Jasvinder Singh Ply (45) | Comprehensive legal services including Property Registration, Family Disputes, Criminal Law, and Corporate Legal Notices. (121) | `https://advocatejsply.com/services.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList` |
| 4 | `legal-notices.html` | Core | Legal Notices Guide India \| Adv. Jasvinder Singh Ply (52) | Understand Legal Notices in India. Learn about Cheque Bounce, Money Recovery, and Consumer Notices. Draft your notice online or consult an expert. (146) | `https://advocatejsply.com/legal-notices.html` | `assets/images/logo.png` | `BreadcrumbList`, `FAQPage` |
| 5 | `contact.html` | Core | Contact Advocate Jasvinder Singh Ply \| Legal Support Nagpur (59) | Contact Adv. Jasvinder Singh Ply for legal consultations in Nagpur. Call, email, or visit our office at Indora Square for expert legal assistance. (146) | `https://advocatejsply.com/contact.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList` |
| 6 | `divorce-lawyer-nagpur.html` | Practice Area | Contested Divorce Lawyer in Nagpur \| Adv. JS Ply (48) | Facing a contested divorce or child custody battle? Consult the best family court lawyer in Nagpur for strong, strategic representation. (136) | `https://advocatejsply.com/divorce-lawyer-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 7 | `mutual-divorce-lawyer-nagpur.html` | Practice Area | Mutual Consent Divorce Lawyer Nagpur \| Adv. JS Ply (50) | Looking for a mutual consent divorce lawyer in Nagpur? Get fast, confidential, and effective legal solutions with top family court attorney Adv. Jasvinder Singh Ply. (165 ⚠️) | `https://advocatejsply.com/mutual-divorce-lawyer-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 8 | `domestic-violence-lawyer-nagpur.html` | Practice Area | Alimony & DV Lawyer in Nagpur \| Adv. Jasvinder Ply (50) | Facing domestic abuse or fighting for fair alimony? Consult the top alimony and domestic violence lawyer in Nagpur for immediate court protection. (146) | `https://advocatejsply.com/domestic-violence-lawyer-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 9 | `marriage-registration-lawyer-nagpur.html` | Practice Area | Court Marriage Lawyer Nagpur \| Adv. Jasvinder Ply (49) | Fast, hassle-free, and legally sound marriage registration in Nagpur. Consult top court marriage advocate Jasvinder Singh Ply. (126) | `https://advocatejsply.com/marriage-registration-lawyer-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 10 | `legal-notice-service-nagpur.html` | Practice Area | Legal Notice Services Nagpur \| Adv. Jasvinder Ply (49) | Strategic Legal Notice services in Nagpur. Specializing in Cheque Bounce (Sec 138 NI Act), Breach of Contract, and Notices to Govt (Sec 80 CPC). (144) | `https://advocatejsply.com/legal-notice-service-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 11 | `legal-agreements-nagpur.html` | Practice Area | Legal Agreements Lawyer Nagpur \| Adv. Jasvinder Ply (51) | Professional drafting of Legal Agreements in Nagpur. Specialty in Leave and License, Loan Agreements, and customized Service Contracts for experts. (147) | `https://advocatejsply.com/legal-agreements-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 12 | `partnership-deeds-nagpur.html` | Practice Area | Partnership Deed Lawyer in Nagpur \| Adv. JS Ply (47) | Expert drafting and registration of Partnership Deeds in Nagpur. Registration with Registrar of Firms (RoF) Maharashtra for business compliance. (144) | `https://advocatejsply.com/partnership-deeds-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 13 | `property-disputes-nagpur.html` | Practice Area | Property Dispute Lawyer Nagpur \| Adv. Jasvinder Ply (51) | Expert property dispute resolution in Nagpur. Specializing in MahaRERA cases, Partition Suits, and Permanent Injunctions at Nagpur District Court. (146) | `https://advocatejsply.com/property-disputes-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 14 | `property-registry-nagpur.html` | Practice Area | Property Registry Lawyer in Nagpur \| Adv. JS Ply (48) | Expert legal assistance for Property Registry, Sale Deeds, and Gift Deeds in Nagpur. Compliance with Maharashtra Stamp Act and Title Verification. (146) | `https://advocatejsply.com/property-registry-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 15 | `will-writing-nagpur.html` | Practice Area | Will Writing Lawyer in Nagpur \| Adv. Jasvinder Ply (50) | Expert Will writing and estate planning services in Nagpur. Protecting your family's future through legally binding Wills and Trusts. (133) | `https://advocatejsply.com/will-writing-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `FAQPage` |
| 16 | `notice.html` | Tool | Draft Legal Notice Online \| Nagpur \| Adv. Jasvinder (51) | Free online tool to draft legal notices for Cheque Bounce, Money Recovery, and Consumer Disputes in India. Instant educational preview draft. (141) | `https://advocatejsply.com/notice.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList` |
| 17 | `blogs.html` | Blog Hub | Blogs & Legal Insights \| Adv. Jasvinder Singh Ply (49) | Read the latest legal insights, guides, and updates from Advocate Jasvinder Singh Ply. Expert advice on legal notices, property disputes, and more. (147) | **MISSING ❌** | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList` |
| 18 | `blogs/annulment-divorce-guide-nagpur.html` | Blog Article | Annulment vs Divorce Guide Nagpur \| Adv. JS Ply (47) | Confused about marriage annulment or divorce in Nagpur? Read our guide on 'Marriage By Mistake' and legal remedies by Advocate Jasvinder Singh Ply. (147) | `https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `BlogPosting` |
| 19 | `blogs/common-mistakes-legal-notice.html` | Blog Article | Common Mistakes in Legal Notices \| Adv. Jasvinder Singh Ply (59) | Learn about the 5 most common mistakes people make while sending a legal notice in India. Expert legal guide by Advocate Jasvinder Singh Ply. (141) | `https://advocatejsply.com/blogs/common-mistakes-legal-notice.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `BlogPosting` |
| 20 | `blogs/maharashtra-new-advocate-general.html` | Blog Article | Maharashtra New Advocate General 2025 \| Adv. JS Ply (51) | Senior Advocate Dr. Milind Sathe takes charge as Maharashtra's new Advocate General. Learn about his career and how this appointment impacts Nagpur's legal landscape. (166 ⚠️) | `https://advocatejsply.com/blogs/maharashtra-new-advocate-general.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `BlogPosting` |
| 21 | `blogs/sale-deed-registration-guide-nagpur.html` | Blog Article | Sale Deed Registration Guide Nagpur 2026 \| Adv. JS Ply (54) | Step-by-step guide to Sale Deed registration in Nagpur 2026. Learn about stamp duty, NMRDA approvals, and the IGR Maharashtra process. (134) | `https://advocatejsply.com/blogs/sale-deed-registration-guide-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `BlogPosting` |
| 22 | `blogs/top-10-divorce-lawyers-nagpur.html` | Blog Article | Best Lawyers & Advocates in Nagpur (2026) \| Adv. JS Ply (55) | Looking for the best legal help in Nagpur? Our 2026 guide covers top-rated advocates in Family Law, Consumer Court, Civil Litigation, GST & Corporate Law. (154) | `https://advocatejsply.com/blogs/top-10-divorce-lawyers-nagpur.html` | `assets/images/og-image.jpg` *(404)* | `BreadcrumbList`, `BlogPosting` |

---

## 3. Deep-Dive Deficiencies & Inconsistencies Audit

### Defect 1: Missing Canonical Tag on `blogs.html`
- **Location:** `/Users/satpalsingh/Projects/AdvJsply/blogs.html`
- **Severity:** High / Blocker
- **Observation:** `blogs.html` has no `<link rel="canonical">` element in `<head>`.
- **Recommendation:** Add `<link rel="canonical" href="https://advocatejsply.com/blogs.html">`.

### Defect 2: Missing Open Graph & Twitter Social Image Asset (`og-image.jpg` 404)
- **Severity:** High / Blocker
- **Observation:** 20 out of 22 HTML pages set `og:image` and `twitter:image` to `https://advocatejsply.com/assets/images/og-image.jpg`.
- **Root Cause:** The file `og-image.jpg` does not exist in `/assets/images/`. The directory contains:
  - `advocate-general-hero.png`
  - `advocate.png`
  - `advocate_mask.png`
  - `blog-hero.png`
  - `divorce-hero.png`
  - `logo.png`
  - `profile.jpg`
  - `saledeed-hero.png`
  - `top10-hero.png`
- **Recommendation:**
  1. For blog articles, point `og:image` and `twitter:image` to their exact featured hero image (e.g. `https://advocatejsply.com/assets/images/advocate-general-hero.png`, `divorce-hero.png`, `saledeed-hero.png`, `top10-hero.png`, `blog-hero.png`).
  2. For site-wide fallback and core pages, either reference existing `https://advocatejsply.com/assets/images/logo.png` / `profile.jpg` or ensure a standardized default social share card is created/referenced.

### Defect 3: Meta Description Length Violations
- **Severity:** Medium
- **Violations:**
  1. `blogs/maharashtra-new-advocate-general.html`: **166 characters**  
     *Current:* `"Senior Advocate Dr. Milind Sathe takes charge as Maharashtra's new Advocate General. Learn about his career and how this appointment impacts Nagpur's legal landscape."*  
     *Proposed (152 chars):* `"Dr. Milind Sathe appointed Maharashtra's new Advocate General. Discover his legal career, landmark cases, and key impact on Nagpur and High Court practice."*
  2. `mutual-divorce-lawyer-nagpur.html`: **165 characters**  
     *Current:* `"Looking for a mutual consent divorce lawyer in Nagpur? Get fast, confidential, and effective legal solutions with top family court attorney Adv. Jasvinder Singh Ply."*  
     *Proposed (154 chars):* `"Looking for a mutual consent divorce lawyer in Nagpur? Get fast, confidential legal support and 6-month waiver assistance with Adv. Jasvinder Singh Ply."*

### Defect 4: Inconsistent Brand Suffixes in `<title>` Tags
- **Severity:** Medium
- **Observation:** Five different brand representations are used in `<title>` tags across the 22 pages:
  1. `| Adv. JS Ply` (9 pages)
  2. `| Adv. Jasvinder Ply` (6 pages)
  3. `| Adv. Jasvinder Singh Ply` (2 pages)
  4. `| Advocate Jasvinder Singh Ply` (4 pages)
  5. `| Adv. Jasvinder` (1 page: `notice.html`)
- **Recommendation:** Standardize brand suffixes based on available space while prioritizing local SEO:
  - Full: `| Adv. Jasvinder Singh Ply` (or `| Advocate Jasvinder Singh Ply`)
  - Compact: `| Adv. JS Ply - Nagpur`

### Defect 5: Missing Open Graph `og:site_name` and `og:locale`
- **Severity:** Low/Medium
- **Observation:**
  - `index.html` and `legal-notices.html` are missing `<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">`.
  - All 22 pages are missing `<meta property="og:locale" content="en_IN">`.

### Defect 6: Incorrect Open Graph Type on `legal-notices.html`
- **Severity:** Low
- **Observation:** `legal-notices.html` specifies `og:type="article"` despite being a main category landing page and guide. It should be `og:type="website"`.

### Defect 7: Generic HTML Language Attribute & Missing Regional Annotation
- **Severity:** Low/Medium
- **Observation:** All 22 pages declare `<html lang="en">`. For an Indian legal service operating under Indian law and courts in Nagpur, `<html lang="en-IN">` is best practice for geo-targeting.

### Defect 8: JSON-LD Structured Data Deficiencies (R2 Scope)
- **Practice Area Pages (10 pages):** All 10 include `BreadcrumbList` and `FAQPage`, but miss a dedicated `Service` or `LegalService` schema describing the legal offering, service area (Nagpur, Maharashtra), provider, and terms.
- **Blog Article Pages (5 pages):** BlogPosting schema lacks `publisher` (Organization with logo), `description`, `mainEntityOfPage` (URL), and `inLanguage` ("en-IN").
- **Core Pages (`about.html`, `services.html`, `contact.html`, `notice.html`): Only contain `BreadcrumbList`. Missing `AboutPage`, `ContactPage`, `LegalService`, `SoftwareApplication` (for the notice generator).
- **Homepage (`index.html`):** Has `LegalService` and `BreadcrumbList`. Can be enhanced with `WebSite` schema.

---

## 4. Verification Check Commands & Evidence
- Inventory script: `python3 .agents/explorer_survey_1/survey_meta.py`
- Deep audit analyzer: `python3 .agents/explorer_survey_1/deep_audit.py`
- Sitemap alignment: `python3 .agents/explorer_survey_1/check_sitemap.py`
- Metadata dump: `python3 .agents/explorer_survey_1/dump_meta.py`
