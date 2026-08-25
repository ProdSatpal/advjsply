# Project Plan: Technical & On-Page SEO Audit & Optimization

## Objectives
Execute a complete technical and on-page SEO audit and optimization across all HTML pages, structured data schemas, sitemap, and robots configuration in the project without altering any visible user-facing body content copy.

## Phases
1. **Phase 0: Survey & Discovery (Exploration)**
   - Spawn 3 Explorers to map all HTML files (core, practice areas, notice generator, blog posts), check existing metadata/canonical/OG/Twitter tags, check JSON-LD schemas, and inspect sitemap.xml & robots.txt.
   - Synthesize findings into `PROJECT.md` Feature Inventory & Architecture.

2. **Phase 1: Dual Track Initiation**
   - **E2E Testing Track**: Build comprehensive automated test suite (validator script) to check all HTML pages for valid metadata, valid JSON-LD schemas against schema.org & Google Search Central standards, sitemap & robots synchronization, and content preservation hash checks.
   - **Implementation Track**:
     - Milestone 1: Technical SEO & Metadata Optimization across all HTML pages (<head>, title, description, OG, Twitter, canonical, lang/hreflang).
     - Milestone 2: Schema.org & JSON-LD Structured Data across all HTML pages (LegalService, LocalBusiness, Organization, WebSite, Service, FAQPage, BreadcrumbList, BlogPosting/Article, zero missing required fields).
     - Milestone 3: Indexability, Sitemap & Robots Audit (sitemap.xml and robots.txt synchronized with all active public HTML pages).

3. **Phase 2: Verification, Adversarial Hardening & Content Preservation Audit**
   - Run full automated test suite on all pages.
   - Reviewer, Challenger, and Forensic Auditor checks for zero visible content changes and complete schema/metadata compliance.
   - Pass gate and report victory claim.
