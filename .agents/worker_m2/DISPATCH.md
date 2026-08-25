## 2026-08-25T08:52:36Z
You are teamwork_preview_worker for Milestone M2: Schema.org & JSON-LD Structured Data Standardization.
Your working directory is `/Users/satpalsingh/Projects/AdvJsply/.agents/worker_m2/`.
The project workspace root is `/Users/satpalsingh/Projects/AdvJsply`.
You MUST read:
1. `/Users/satpalsingh/Projects/AdvJsply/ORIGINAL_REQUEST.md`
2. `/Users/satpalsingh/Projects/AdvJsply/PROJECT.md`
3. `/Users/satpalsingh/Projects/AdvJsply/TEST_INFRA.md`
4. `/Users/satpalsingh/Projects/AdvJsply/TEST_READY.md`
5. `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_2/report.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Specific Milestone M2 Tasks:
Standardize and enrich `<script type="application/ld+json">` structured data in `<head>` across all 22 HTML pages:
1. **Core Pages (`index.html`, `about.html`, `contact.html`, `services.html`, `blogs.html`, `notice.html`)**:
   - `index.html`: Unified `@graph` with `WebSite` (`@id: "https://advocatejsply.com/#website"`), `LegalService` (`@id: "https://advocatejsply.com/#legalservice"`, including `name`, `legalName`, `founder`, `address`, `telephone`, `priceRange`, `openingHoursSpecification`, `areaServed`, `url`, `image`, `logo`), and `BreadcrumbList`.
   - `about.html`: Unified `@graph` with `AboutPage` (linked to `#legalservice`), `Person`/`Attorney` (`@id: "https://advocatejsply.com/#attorney"` for Adv. Jasvinder Singh Ply, `jobTitle: "Advocate / Legal Counsel"`, `worksFor: {"@id": "https://advocatejsply.com/#legalservice"}`), and `BreadcrumbList`.
   - `contact.html`: Unified `@graph` with `ContactPage` (referencing `#legalservice` and `ContactPoint`), and `BreadcrumbList`.
   - `services.html`: Unified `@graph` with `CollectionPage` / `ItemList` indexing all legal practice services, referencing `#legalservice`, and `BreadcrumbList`.
   - `blogs.html`: Unified `@graph` with `Blog` / `CollectionPage` referencing `#legalservice`, and `BreadcrumbList`.
   - `notice.html`: Unified `@graph` with `WebApplication` / `Service` (`applicationCategory: "LegalApplication"`, `operatingSystem: "All"`, provider `#legalservice`), and `BreadcrumbList`.

2. **Practice Area Pages (10 pages + `legal-notices.html`)**:
   - All 11 pages (`divorce-lawyer-nagpur.html`, `mutual-divorce-lawyer-nagpur.html`, `domestic-violence-lawyer-nagpur.html`, `marriage-registration-lawyer-nagpur.html`, `legal-notice-service-nagpur.html`, `legal-notices.html`, `legal-agreements-nagpur.html`, `partnership-deeds-nagpur.html`, `property-disputes-nagpur.html`, `property-registry-nagpur.html`, `will-writing-nagpur.html`):
   - Include dedicated `Service` / `LegalService` schema (`name`, `serviceType`, `provider: {"@id": "https://advocatejsply.com/#legalservice"}`, `areaServed: "Nagpur, Maharashtra, India"`, `description`, `url`).
   - Include complete `FAQPage` schema indexing ALL visible FAQs (ensure the 3rd visible FAQ item in `divorce-lawyer-nagpur.html`, `domestic-violence-lawyer-nagpur.html`, `marriage-registration-lawyer-nagpur.html`, and `mutual-divorce-lawyer-nagpur.html` is included).
   - Include complete `BreadcrumbList`.

3. **Blog Articles (5 pages in `blogs/`)**:
   - All 5 articles (`blogs/annulment-divorce-guide-nagpur.html`, `blogs/common-mistakes-legal-notice.html`, `blogs/maharashtra-new-advocate-general.html`, `blogs/sale-deed-registration-guide-nagpur.html`, `blogs/top-10-divorce-lawyers-nagpur.html`):
   - Complete Google Search Central-compliant `BlogPosting` with:
     * `headline`
     * `image` (valid on-disk image asset URL)
     * `datePublished` (ISO format)
     * `dateModified` (ISO format)
     * `author`: `{"@type": "Person", "name": "Advocate Jasvinder Singh Ply", "url": "https://advocatejsply.com/about.html"}`
     * `publisher`: `{"@type": "Organization", "name": "Advocate Jasvinder Singh Ply", "logo": {"@type": "ImageObject", "url": "https://advocatejsply.com/assets/images/logo.png"}}`
     * `mainEntityOfPage`: `{"@type": "WebPage", "@id": "[canonical_url]"}`
     * `description`
   - Include `BreadcrumbList`.
   - On `blogs/top-10-divorce-lawyers-nagpur.html`, also include `FAQPage` for its visible FAQ section.

4. **STRICT GUARDRAIL**:
   - Zero changes to visible text inside `<body>`, layout, forms, styles, or navigation elements.
   - All JSON-LD must be enclosed in `<script type="application/ld+json">` within `<head>`.
   - All JSON-LD must parse as 100% valid JSON with zero syntax errors.

5. **Test & Verify**:
   - Run `python3 tests/test_seo_compliance.py` to verify that all Tier 1, Tier 2, Tier 3, and Tier 4 tests pass!
   - Document all updates in `/Users/satpalsingh/Projects/AdvJsply/.agents/worker_m2/handoff.md`.
   - Send a message to the caller with a concise summary and path to handoff when done.
