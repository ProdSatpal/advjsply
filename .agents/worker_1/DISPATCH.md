## 2026-08-25T09:30:40Z

You are Worker 1. Your working directory for coordination metadata is /Users/satpalsingh/Projects/AdvJsply/.agents/worker_1/ (write all your progress and handoff files there).

MANDATORY: Read /Users/satpalsingh/Projects/AdvJsply/ORIGINAL_REQUEST.md and /Users/satpalsingh/Projects/AdvJsply/PROJECT.md before doing any work.
Also read the detailed analysis blueprints produced by our explorers:
- /Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/analysis.md
- /Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_2/analysis.md
- /Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_3/analysis.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Tasks:
1. Create `blogs/how-to-file-divorce-nagpur-guide.html` following the exact visual design system, typography, header, mobile navigation, breadcrumbs, CTA sections, author bio for Adv. Jasvinder Singh Ply, and footer of existing blog pages (`blogs/annulment-divorce-guide-nagpur.html`). Format the advocate's guide into clean, accessible, semantic sections (legal disclaimer, quick summary comparison table, Family Court Nagpur jurisdiction, mutual consent procedure steps, contested divorce procedure steps, document checklists, timelines, fees/court costs, 6 FAQ items, and consultation CTA).
2. Integrate strict Technical SEO and Schema.org Structured Data:
   - `<html lang="en-IN">`
   - Title: `How to File Divorce in Nagpur Guide | Adv. JS Ply` (50 chars)
   - Meta description: `Step-by-step guide to filing for divorce in Nagpur: learn Family Court jurisdiction, documents checklist, mutual consent vs contested timelines, and costs.` (154 chars)
   - Canonical URL: `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html`
   - Complete Open Graph & Twitter Card tags.
   - Unified `@graph` JSON-LD structured data containing `BlogPosting`, `BreadcrumbList`, and `FAQPage` (with all 6 FAQs).
3. Update `blogs.html`:
   - Add new article card for the divorce guide in the blog grid (with thumbnail `assets/images/divorce-hero.png`, `Family Law` category tag, excerpt, 8 min read, link to `blogs/how-to-file-divorce-nagpur-guide.html`).
   - Update `["Blog", "CollectionPage"]` ItemList schema to include position 6.
4. Update Service Pages Cross-Links:
   - Add contextual callout cards linking to `blogs/how-to-file-divorce-nagpur-guide.html` in `divorce-lawyer-nagpur.html` and `mutual-divorce-lawyer-nagpur.html`.
5. Update `sitemap.xml`:
   - Add `<loc>https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html</loc>` with `<lastmod>2026-08-25</lastmod>`, `<changefreq>weekly</changefreq>`, `<priority>0.8</priority>` (bringing total to 23 pages).
   - Update `<lastmod>` for modified pages.
6. Update and Run Automated Compliance Test Suite:
   - Update `tests/test_seo_compliance.py`: add new page to `EXPECTED_HTML_FILES`, `BLOG_PAGES`, update sitemap count assertion to 23, and update `BASELINE_CONTENT_HASHES` with accurate SHA-256 hashes of all updated files and the new file.
   - Run the test suite: `python3 -m pytest tests/test_seo_compliance.py -v` (or `pytest tests/test_seo_compliance.py -v`) and ensure all tests pass (100% pass rate).

Write a comprehensive report to /Users/satpalsingh/Projects/AdvJsply/.agents/worker_1/handoff.md with all changes made, verification commands, test output, and then send a message back.
