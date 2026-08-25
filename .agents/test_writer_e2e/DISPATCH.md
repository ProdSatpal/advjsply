## 2026-08-25T08:44:54Z
You are the E2E Test Writer for the AdvJsply Technical & On-Page SEO project.
Your working directory is `/Users/satpalsingh/Projects/AdvJsply/.agents/test_writer_e2e/`.
The project workspace root is `/Users/satpalsingh/Projects/AdvJsply`.
You MUST read:
1. `/Users/satpalsingh/Projects/AdvJsply/ORIGINAL_REQUEST.md`
2. `/Users/satpalsingh/Projects/AdvJsply/PROJECT.md`
3. `/Users/satpalsingh/Projects/AdvJsply/TEST_INFRA.md`

Your Task:
1. Author the automated test suite in `/Users/satpalsingh/Projects/AdvJsply/tests/test_seo_compliance.py` using Python stdlib (no third-party dependencies required).
2. The test suite MUST test all 22 HTML pages across:
   - Tier 1: Canonical links, unique title tags (<=60 chars), meta descriptions (50-160 chars), Open Graph tags, Twitter Card tags, lang="en-IN", charset/viewport.
   - Tier 2: Asset existence check on disk for all og:image / twitter:image references; JSON-LD syntax validation; Schema.org Google Search Central required fields (BlogPosting author/publisher/date/image/headline/mainEntityOfPage; Service provider/name/serviceType/areaServed; FAQPage question/acceptedAnswer; BreadcrumbList item/position; LegalService / LocalBusiness / WebSite / Person / AboutPage / ContactPage / WebApplication).
   - Tier 3: Cross-feature checks (canonical URL equals og:url and matches sitemap.xml <loc>; robots.txt syntax and sitemap link).
   - Tier 4: Content Preservation Guardrail (extract visible text inside <body> excluding <script> and <style> to establish and verify content preservation).
3. Run the test suite using `python3 tests/test_seo_compliance.py` to verify runner functionality and establish the baseline failure report.
4. Create `/Users/satpalsingh/Projects/AdvJsply/TEST_READY.md` summarizing the test suite, test commands, and tier coverage breakdown.
5. Write your handoff report to `/Users/satpalsingh/Projects/AdvJsply/.agents/test_writer_e2e/handoff.md`.
6. Send a message to the caller with the summary and path to handoff when done.
