# Technical & On-Page SEO Audit: Schema.org & JSON-LD Structured Data

**Project:** Advocate Jasvinder Singh Ply (`https://advocatejsply.com/`)  
**Auditor:** Teamwork Preview Explorer #2  
**Date:** 2026-08-25  
**Scope:** 100% of HTML pages in repository (22 total `.html` files)

---

## 1. Executive Summary

A comprehensive automated and manual structured data audit was conducted across all 22 HTML pages in the repository.

### Key Metrics:
- **Total HTML Pages Audited:** 22
- **Total Existing JSON-LD Blocks:** 39
- **JSON Syntax Errors:** 0 (100% valid JSON syntax)
- **Pages with Structured Data:** 22 (100%)
- **Pages with Incomplete / Sub-optimal Structured Data:** 21 (95.5%)
- **Total Detected Omissions / Deficiencies:** 32 specific items across core pages, practice areas, and blog posts.

### High-Level Summary of Findings:
1. **Core / Site-wide Pages (`index.html`, `about.html`, `contact.html`, `services.html`, `blogs.html`, `notice.html`):**
   - `index.html` has a `LegalService` schema and a 1-item `BreadcrumbList`, but is missing the fundamental `WebSite` schema (`@type: "WebSite"`) with site name, URL, description, and publisher entity linkage.
   - `about.html`, `contact.html`, `services.html`, `blogs.html`, and `notice.html` contain **only a `BreadcrumbList` schema** and lack page-type specific schemas (`AboutPage` + `Person`/`Attorney`, `ContactPage`, `Service`/`ItemList` catalog, `Blog`/`CollectionPage`, and `WebApplication` for the interactive notice generator).
2. **Practice Area Pages (11 pages):**
   - All 11 pages define `BreadcrumbList` and `FAQPage`, but **zero practice area pages have `Service` or `LegalService` schema**, missing Google Search rich results for legal services.
   - Several practice area pages have 3 FAQ items in their visible HTML layout but only 2 in their `FAQPage` schema (omitting the 3rd question).
3. **Blog Articles (5 pages in `blogs/`):**
   - All 5 blog articles define `BreadcrumbList` and `BlogPosting`.
   - However, all 5 `BlogPosting` schemas are missing Google Search Central recommended properties: `publisher` (`Organization` with logo), `mainEntityOfPage` (`WebPage`), and `description`.
4. **Interactive Notice Generator (`notice.html`):**
   - Operates as a dynamic web application for drafting legal notices, but lacks `WebApplication` / `SoftwareApplication` / `Service` schema.
5. **Canonical Tag Omission on `blogs.html`:**
   - `blogs.html` is the only page in the site missing `<link rel="canonical" href="https://advocatejsply.com/blogs.html">`.

---

## 2. Complete Inventory & Status Matrix (All 22 Pages)

| # | Page File Path | Page Type | Existing Schemas | Missing / Recommended Schemas | Status |
|---|---|---|---|---|---|
| 1 | `index.html` | Homepage | `LegalService`, `BreadcrumbList` | `WebSite`, `Attorney`/`Person` linkage, `areaServed`, `description` | ⚠️ Incomplete |
| 2 | `about.html` | About Page | `BreadcrumbList` | `AboutPage`, `Person` (`Attorney`), `LegalService` ref | ❌ Deficient |
| 3 | `contact.html` | Contact Page | `BreadcrumbList` | `ContactPage`, `ContactPoint`, `LegalService` ref | ❌ Deficient |
| 4 | `services.html` | Services Hub | `BreadcrumbList` | `Service`, `ItemList` / `OfferCatalog`, `CollectionPage` | ❌ Deficient |
| 5 | `blogs.html` | Blog Archive | `BreadcrumbList` | `Blog` / `CollectionPage`, `ItemList` (also missing canonical tag) | ❌ Deficient |
| 6 | `notice.html` | Tool / Generator | `BreadcrumbList` | `WebApplication` / `SoftwareApplication`, `Service` | ❌ Deficient |
| 7 | `divorce-lawyer-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`), 3rd FAQ Q in `FAQPage` | ⚠️ Incomplete |
| 8 | `mutual-divorce-lawyer-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`), 3rd FAQ Q in `FAQPage` | ⚠️ Incomplete |
| 9 | `domestic-violence-lawyer-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`), 3rd FAQ Q in `FAQPage` | ⚠️ Incomplete |
| 10 | `marriage-registration-lawyer-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`), 3rd FAQ Q in `FAQPage` | ⚠️ Incomplete |
| 11 | `legal-agreements-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 12 | `legal-notice-service-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 13 | `legal-notices.html` | Practice Area Guide | `BreadcrumbList`, `FAQPage` (6 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 14 | `partnership-deeds-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 15 | `property-disputes-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 16 | `property-registry-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 17 | `will-writing-nagpur.html` | Practice Area | `BreadcrumbList`, `FAQPage` (2 Qs) | `Service` (`LegalService`) | ⚠️ Incomplete |
| 18 | `blogs/annulment-divorce-guide-nagpur.html` | Blog Article | `BreadcrumbList`, `BlogPosting` | `publisher`, `mainEntityOfPage`, `description` in `BlogPosting` | ⚠️ Incomplete |
| 19 | `blogs/common-mistakes-legal-notice.html` | Blog Article | `BreadcrumbList`, `BlogPosting` | `publisher`, `mainEntityOfPage`, `description` in `BlogPosting` | ⚠️ Incomplete |
| 20 | `blogs/maharashtra-new-advocate-general.html` | Blog Article | `BreadcrumbList`, `BlogPosting` | `publisher`, `mainEntityOfPage`, `description` in `BlogPosting` | ⚠️ Incomplete |
| 21 | `blogs/sale-deed-registration-guide-nagpur.html` | Blog Article | `BreadcrumbList`, `BlogPosting` | `publisher`, `mainEntityOfPage`, `description` in `BlogPosting` | ⚠️ Incomplete |
| 22 | `blogs/top-10-divorce-lawyers-nagpur.html` | Blog Article | `BreadcrumbList`, `BlogPosting` | `publisher`, `mainEntityOfPage`, `description` in `BlogPosting`, `FAQPage` | ⚠️ Incomplete |

---

## 3. Detailed Audit Findings by Category

### Category A: Core & Site-wide Pages

#### 1. `index.html` (Homepage)
- **Current Markup:**
  - Block 1: `LegalService` (`name`, `image`, `logo`, `@id`, `url`, `telephone`, `address`, `geo`, `openingHoursSpecification`, `priceRange`).
  - Block 2: `BreadcrumbList` (1 item: "Home").
- **Issues & Gaps:**
  1. **Missing `WebSite` Schema:** No `WebSite` schema is defined. Google uses `WebSite` schema to understand site identity, canonical site URL, brand name, and sitelinks searchbox eligibility.
  2. **Entity `@id` Standardization:** In `LegalService`, `@id` is set to `"https://advocatejsply.com"`, which directly collides with the homepage URL. The standard URI identifier is `"https://advocatejsply.com/#legalservice"` or `"https://advocatejsply.com/#organization"`.
  3. **Missing Business Attributes:**
     - `description`: Missing clear description of the legal practice.
     - `areaServed`: Missing explicit coverage areas (`Nagpur`, `Maharashtra`, `India`).
     - `founder` / `employee`: Missing `@type: "Person"` representing Advocate Jasvinder Singh Ply.
     - `hasOfferCatalog`: Missing reference to the practice areas offered.
     - `sameAs`: Missing links to external profiles or maps.

#### 2. `about.html`
- **Current Markup:** Only `BreadcrumbList` (Home -> About).
- **Issues & Gaps:**
  1. **Missing `AboutPage` Schema:** Should identify the page as an `AboutPage` whose `mainEntity` is Advocate Jasvinder Singh Ply (`@type: "Person"` / `"Attorney"`).
  2. **Missing `Person` / `Attorney` Schema:** Essential for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) in legal search results. Needs `name`, `jobTitle`, `worksFor`, `knowsAbout`, `alumniOf`, `address`, `telephone`, `url`, `image`.

#### 3. `contact.html`
- **Current Markup:** Only `BreadcrumbList` (Home -> Contact).
- **Issues & Gaps:**
  1. **Missing `ContactPage` Schema:** No structured data identifying office hours, contact phone, contact type, email, or geographic coordinates.
  2. **Missing `ContactPoint`:** No structured `ContactPoint` (`contactType: "legal consultation"`, `telephone: "+918857972717"`, `availableLanguage: ["English", "Hindi", "Marathi"]`).

#### 4. `services.html`
- **Current Markup:** Only `BreadcrumbList` (Home -> Services).
- **Issues & Gaps:**
  1. **Missing `CollectionPage` / `ItemList` / `Service` Catalog:** Does not expose the full catalog of legal services (Family Law, Mutual Divorce, Contested Divorce, Domestic Violence, Property Disputes, MahaRERA, Sale Deed Registration, Will Writing, Legal Agreements, Partnership Deeds, Legal Notice Services) to search crawlers.

#### 5. `blogs.html`
- **Current Markup:** Only `BreadcrumbList` (Home -> Blogs).
- **Issues & Gaps:**
  1. **Missing `Blog` / `CollectionPage` Schema:** Does not list the published articles in structured data.
  2. **Missing Canonical Tag in HTML:** `<link rel="canonical" href="https://advocatejsply.com/blogs.html">` is missing from the `<head>` of `blogs.html`.

#### 6. `notice.html`
- **Current Markup:** Only `BreadcrumbList` (Home -> Legal Notice Generator).
- **Issues & Gaps:**
  1. **Missing `WebApplication` / `SoftwareApplication` Schema:** `notice.html` is an interactive legal notice drafting tool. Providing `WebApplication` structured data (`applicationCategory: "LegalApplication"`, `operatingSystem: "All"`, `offers: {price: "0"}`) allows Google to present interactive tool rich snippets.

---

### Category B: Practice Area Pages (11 Pages)

#### 1. Missing `Service` / `LegalService` Schema (100% of Practice Area Pages)
- None of the 11 practice area pages contain a `Service` or `LegalService` schema block.
- **Impact:** Practice pages miss Google rich results for specific legal services in local queries (e.g. "divorce lawyer in Nagpur", "MahaRERA advocate Nagpur", "property registration lawyer Nagpur").
- **Required Properties for Service Schema:**
  - `@type`: `"Service"` (or `["Service", "LegalService"]`)
  - `@id`: `"https://advocatejsply.com/<page>.html#service"`
  - `name`: Service Name (e.g. "Contested Divorce & Child Custody Legal Representation in Nagpur")
  - `serviceType`: Legal Category (e.g. "Family Law Litigation")
  - `provider`: `{"@id": "https://advocatejsply.com/#legalservice"}`
  - `areaServed`: `{"@type": "City", "name": "Nagpur", "addressRegion": "Maharashtra", "addressCountry": "IN"}`
  - `description`: Detailed service overview matching on-page content
  - `offers`: `{"@type": "Offer", "priceRange": "$$", "priceCurrency": "INR"}`
  - `mainEntityOfPage`: `{"@type": "WebPage", "@id": "https://advocatejsply.com/<page>.html"}`

#### 2. FAQ Schema Incompleteness / Discrepancies
- **`divorce-lawyer-nagpur.html`:**
  - HTML body has 3 FAQ items:
    1. "What are the grounds for contested divorce?"
    2. "Can I get a divorce without spouse’s consent?"
    3. "Is there a lady lawyer for sensitive child custody?"
  - Existing `FAQPage` schema only includes questions 1 and 2; question 3 is missing.
- **`domestic-violence-lawyer-nagpur.html`:**
  - HTML body has 3 FAQ items:
    1. "How to file a domestic violence case in Nagpur?"
    2. "Can I get immediate court protection?"
    3. "Who is the best lawyer for DV in Nagpur?"
  - Existing `FAQPage` schema only includes questions 1 and 2; question 3 is missing.
- **`marriage-registration-lawyer-nagpur.html`:**
  - HTML body has 3 FAQ items:
    1. "How to register a marriage in Nagpur?"
    2. "What documents are required for court marriage?"
    3. "Who is the best lawyer for Special Marriage Act?"
  - Existing `FAQPage` schema only includes questions 1 and 2; question 3 is missing.
- **`mutual-divorce-lawyer-nagpur.html`:**
  - HTML body has 3 FAQ items:
    1. "How do I file for a mutual consent divorce in Nagpur?"
    2. "What is the cooling-off period (Aapsi sehmati se talaq)?"
    3. "How much does a mutual divorce lawyer charge in Nagpur?"
  - Existing `FAQPage` schema only includes questions 1 and 2; question 3 is missing.

#### 3. Breadcrumb Hierarchy Consistency
- 10 practice pages use a standard 3-tier trail: `Home -> Services -> [Practice Page]`.
- `legal-notices.html` uses a 2-tier trail: `Home -> Legal Notices Guide`.
- Recommendation: Standardize `legal-notices.html` to align with the rest of the service pages or clearly reflect its guide structure.

---

### Category C: Blog Articles (5 Pages in `blogs/`)

#### Missing Recommended Properties in `BlogPosting` Structured Data:
All 5 blog articles (`annulment-divorce-guide-nagpur.html`, `common-mistakes-legal-notice.html`, `maharashtra-new-advocate-general.html`, `sale-deed-registration-guide-nagpur.html`, `top-10-divorce-lawyers-nagpur.html`) define `headline`, `image`, `datePublished`, `dateModified`, and `author`. However, all 5 lack:

1. **`publisher` Property (Google Search Central Recommended):**
   - Missing:
     ```json
     "publisher": {
       "@type": "Organization",
       "@id": "https://advocatejsply.com/#legalservice",
       "name": "Advocate Jasvinder Singh Ply",
       "logo": {
         "@type": "ImageObject",
         "url": "https://advocatejsply.com/assets/images/logo.png"
       }
     }
     ```
2. **`mainEntityOfPage` Property:**
   - Missing:
     ```json
     "mainEntityOfPage": {
       "@type": "WebPage",
       "@id": "https://advocatejsply.com/blogs/<filename>.html"
     }
     ```
3. **`description` Property:**
   - None of the 5 articles include `"description"` in `BlogPosting`, despite having meta descriptions in HTML.
4. **Article-Level FAQ Schema (`blogs/top-10-divorce-lawyers-nagpur.html`):**
   - The article body on `top-10-divorce-lawyers-nagpur.html` includes FAQ questions ("How much does a lawyer in Nagpur cost?", "How long will my divorce process take in Nagpur?"), but no `FAQPage` schema is provided.

---

## 4. Architecture Recommendation: Unified `@graph` JSON-LD Pattern

### Why `@graph`?
Currently, pages use multiple disjoint `<script type="application/ld+json">` tags (e.g. one for `BreadcrumbList`, one for `FAQPage`, one for `LegalService`). This disconnects entities in Google's Knowledge Graph.

By combining all structured data entities into a single `@graph` array per page:
- Google understands that the `WebSite` is published by the `LegalService`.
- The `Service` is offered by the `LegalService` (`@id: "https://advocatejsply.com/#legalservice"`).
- The `BlogPosting` is authored by `Person` (`Advocate Jasvinder Singh Ply`) and published by `Organization` (`Advocate Jasvinder Singh Ply`).
- Breadcrumbs and WebPages are explicitly linked to their parent hierarchy.

---

## 5. Specification & Code Templates for Implementation

### Template 1: Homepage (`index.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://advocatejsply.com/#website",
      "url": "https://advocatejsply.com/",
      "name": "Advocate Jasvinder Singh Ply",
      "description": "High Court Advocate and Legal Consultant in Nagpur specializing in family law, civil disputes, property registry, and legal documentation.",
      "publisher": {
        "@id": "https://advocatejsply.com/#legalservice"
      },
      "inLanguage": "en"
    },
    {
      "@type": ["LegalService", "Attorney"],
      "@id": "https://advocatejsply.com/#legalservice",
      "name": "Advocate Jasvinder Singh Ply",
      "alternateName": "Adv. JS Ply Law Office Nagpur",
      "url": "https://advocatejsply.com/",
      "logo": "https://advocatejsply.com/assets/images/logo.png",
      "image": "https://advocatejsply.com/assets/images/logo.png",
      "description": "Premier legal counsel in Nagpur specializing in contested divorce, mutual divorce, domestic violence, property disputes, MahaRERA, and legal agreements.",
      "telephone": "+918857972717",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Buddh Nagar, Indora Square",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra",
        "postalCode": "440017",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.1722807,
        "longitude": 79.1011674
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "10:00",
        "closes": "19:00"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Nagpur"
        },
        {
          "@type": "AdministrativeArea",
          "name": "Maharashtra"
        }
      ],
      "founder": {
        "@type": "Person",
        "name": "Advocate Jasvinder Singh Ply",
        "jobTitle": "High Court Advocate",
        "url": "https://advocatejsply.com/about.html"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://advocatejsply.com/"
        }
      ]
    }
  ]
}
</script>
```

---

### Template 2: About Page (`about.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://advocatejsply.com/about.html#webpage",
      "url": "https://advocatejsply.com/about.html",
      "name": "About Advocate Jasvinder Singh Ply | Legal Expert in Nagpur",
      "description": "Learn about Advocate Jasvinder Singh Ply, a dedicated High Court advocate and legal advisor in Nagpur with expertise in family, civil, and property law.",
      "breadcrumb": {
        "@id": "https://advocatejsply.com/about.html#breadcrumb"
      },
      "mainEntity": {
        "@id": "https://advocatejsply.com/about.html#attorney"
      }
    },
    {
      "@type": "Person",
      "@id": "https://advocatejsply.com/about.html#attorney",
      "name": "Advocate Jasvinder Singh Ply",
      "jobTitle": "High Court Advocate & Legal Consultant",
      "worksFor": {
        "@id": "https://advocatejsply.com/#legalservice"
      },
      "image": "https://advocatejsply.com/assets/images/profile.jpg",
      "url": "https://advocatejsply.com/about.html",
      "telephone": "+918857972717",
      "knowsAbout": [
        "Family Law",
        "Contested Divorce",
        "Mutual Consent Divorce",
        "Domestic Violence Act (PWDVA)",
        "Property Disputes & MahaRERA",
        "Sale Deed Registration",
        "Will Writing & Estate Planning",
        "Legal Notice Drafting"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Buddh Nagar, Indora Square",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra",
        "postalCode": "440017",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/about.html#breadcrumb",
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
          "name": "About",
          "item": "https://advocatejsply.com/about.html"
        }
      ]
    }
  ]
}
</script>
```

---

### Template 3: Contact Page (`contact.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://advocatejsply.com/contact.html#webpage",
      "url": "https://advocatejsply.com/contact.html",
      "name": "Contact Advocate Jasvinder Singh Ply | Legal Support Nagpur",
      "description": "Get in touch with Advocate Jasvinder Singh Ply for legal consultation in Nagpur. Call +91 8857972717 or visit our office at Buddh Nagar, Indora Square, Nagpur.",
      "mainEntity": {
        "@id": "https://advocatejsply.com/#legalservice"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/contact.html#breadcrumb",
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
          "name": "Contact",
          "item": "https://advocatejsply.com/contact.html"
        }
      ]
    }
  ]
}
</script>
```

---

### Template 4: Services Hub Page (`services.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://advocatejsply.com/services.html#webpage",
      "url": "https://advocatejsply.com/services.html",
      "name": "Legal Services & Practice Areas | Advocate Jasvinder Singh Ply",
      "description": "Comprehensive legal services in Nagpur: Family Law, Mutual Divorce, Contested Divorce, Domestic Violence, Property Disputes, MahaRERA, Sale Deed Registration, and Will Writing.",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Mutual Consent Divorce",
            "url": "https://advocatejsply.com/mutual-divorce-lawyer-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contested Divorce",
            "url": "https://advocatejsply.com/divorce-lawyer-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Domestic Violence",
            "url": "https://advocatejsply.com/domestic-violence-lawyer-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Marriage Registration",
            "url": "https://advocatejsply.com/marriage-registration-lawyer-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Legal Agreements",
            "url": "https://advocatejsply.com/legal-agreements-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "Legal Notice Services",
            "url": "https://advocatejsply.com/legal-notice-service-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 7,
            "name": "Partnership Deeds",
            "url": "https://advocatejsply.com/partnership-deeds-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 8,
            "name": "Property Disputes",
            "url": "https://advocatejsply.com/property-disputes-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 9,
            "name": "Property Registry",
            "url": "https://advocatejsply.com/property-registry-nagpur.html"
          },
          {
            "@type": "ListItem",
            "position": 10,
            "name": "Will Writing",
            "url": "https://advocatejsply.com/will-writing-nagpur.html"
          }
        ]
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/services.html#breadcrumb",
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
          "name": "Services",
          "item": "https://advocatejsply.com/services.html"
        }
      ]
    }
  ]
}
</script>
```

---

### Template 5: Interactive Tool Page (`notice.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://advocatejsply.com/notice.html#app",
      "name": "Online Legal Notice Drafting Tool Nagpur",
      "url": "https://advocatejsply.com/notice.html",
      "applicationCategory": "LegalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "description": "Interactive online tool to draft structured legal notices for cheque bounce, property dispute, contract breach, or money recovery with expert lawyer review in Nagpur.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      },
      "provider": {
        "@id": "https://advocatejsply.com/#legalservice"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/notice.html#breadcrumb",
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
          "name": "Legal Notice Generator",
          "item": "https://advocatejsply.com/notice.html"
        }
      ]
    }
  ]
}
</script>
```

---

### Template 6: Practice Area Service Pages (Example: `divorce-lawyer-nagpur.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://advocatejsply.com/divorce-lawyer-nagpur.html#service",
      "name": "Contested Divorce & Child Custody Legal Services",
      "serviceType": "Family Law Litigation",
      "description": "Strategic, fierce legal representation for contested divorce, asset division, alimony, and child custody battles in Nagpur Family Court.",
      "provider": {
        "@id": "https://advocatejsply.com/#legalservice"
      },
      "areaServed": {
        "@type": "City",
        "name": "Nagpur",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "offers": {
        "@type": "Offer",
        "priceRange": "$$",
        "priceCurrency": "INR"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://advocatejsply.com/divorce-lawyer-nagpur.html"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://advocatejsply.com/divorce-lawyer-nagpur.html#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the grounds for contested divorce?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under the Hindu Marriage Act, you can initiate a contested divorce on several robust grounds including cruelty (mental or physical), adultery, desertion (continuous for at least two years), conversion to another religion, mental disorder, or renunciation."
          }
        },
        {
          "@type": "Question",
          "name": "Can I get a divorce without spouse's consent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. If your spouse refuses a mutual agreement, you have the absolute legal right to file for a contested divorce based on specific statutory grounds such as cruelty, desertion, or adultery."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a lady lawyer for sensitive child custody?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Many clients prefer female counsel when navigating sensitive family dynamics, especially child custody. Our practice closely collaborates with experienced female attorneys handling child custody in Nagpur."
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/divorce-lawyer-nagpur.html#breadcrumb",
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
          "name": "Services",
          "item": "https://advocatejsply.com/services.html"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Contested Divorce",
          "item": "https://advocatejsply.com/divorce-lawyer-nagpur.html"
        }
      ]
    }
  ]
}
</script>
```

---

### Template 7: Blog Articles (Example: `blogs/annulment-divorce-guide-nagpur.html`)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html#article",
      "headline": "\"Marriage By Mistake\"? Simple Guide to Annulment and Divorce in Nagpur",
      "description": "Understand the clear legal differences between Marriage Annulment and Divorce in Nagpur, Maharashtra under the Hindu Marriage Act.",
      "image": [
        "https://advocatejsply.com/assets/images/divorce-hero.png"
      ],
      "datePublished": "2026-03-22T08:00:00+05:30",
      "dateModified": "2026-04-17T08:00:00+05:30",
      "inLanguage": "en",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html"
      },
      "author": {
        "@type": "Person",
        "name": "Adv. Jasvinder Singh Ply",
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
      "@type": "BreadcrumbList",
      "@id": "https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html#breadcrumb",
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
          "name": "Annulment vs Divorce Guide",
          "item": "https://advocatejsply.com/blogs/annulment-divorce-guide-nagpur.html"
        }
      ]
    }
  ]
}
</script>
```

---

## 6. Actionable Implementation Checklist for Subsequent Milestone

1. **Site-wide Core Pages:**
   - [ ] Implement `WebSite` and upgraded `LegalService` `@graph` on `index.html`.
   - [ ] Implement `AboutPage` + `Person` (`Attorney`) on `about.html`.
   - [ ] Implement `ContactPage` + `ContactPoint` on `contact.html`.
   - [ ] Implement `CollectionPage` + `ItemList` service catalog on `services.html`.
   - [ ] Implement `Blog` + `CollectionPage` on `blogs.html` and add missing `<link rel="canonical" href="https://advocatejsply.com/blogs.html">`.
   - [ ] Implement `WebApplication` + `Service` on `notice.html`.

2. **11 Practice Area Pages:**
   - [ ] Inject `Service` structured data into all 11 practice area pages.
   - [ ] Synchronize all 3 visible FAQ accordion questions into `FAQPage` schema on `divorce-lawyer-nagpur.html`, `domestic-violence-lawyer-nagpur.html`, `marriage-registration-lawyer-nagpur.html`, `mutual-divorce-lawyer-nagpur.html`.
   - [ ] Align breadcrumb list item structure across all practice area pages.

3. **5 Blog Articles:**
   - [ ] Add `publisher` (`Organization` + logo), `mainEntityOfPage`, and `description` to `BlogPosting` across all 5 blog articles.
   - [ ] Add `FAQPage` schema on `blogs/top-10-divorce-lawyers-nagpur.html` for its embedded questions.

4. **Validation:**
   - [ ] Run automated schema parser across all 22 HTML files after implementation to ensure zero errors and 100% Google Search Central compliance.
