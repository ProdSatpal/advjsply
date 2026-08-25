## 2026-08-25T08:59:05Z
You are teamwork_preview_worker for Milestone M3: Indexability, Sitemap & Robots Audit.
Your working directory is `/Users/satpalsingh/Projects/AdvJsply/.agents/worker_m3/`.
The project workspace root is `/Users/satpalsingh/Projects/AdvJsply`.
You MUST read:
1. `/Users/satpalsingh/Projects/AdvJsply/ORIGINAL_REQUEST.md`
2. `/Users/satpalsingh/Projects/AdvJsply/PROJECT.md`
3. `/Users/satpalsingh/Projects/AdvJsply/TEST_INFRA.md`
4. `/Users/satpalsingh/Projects/AdvJsply/TEST_READY.md`
5. `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_3/report.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Specific Milestone M3 Tasks:
1. Update `sitemap.xml`:
   - Refresh `<lastmod>` to `2026-08-25` across all 22 `<url>` entries.
   - Confirm all 22 active public HTML pages are listed with correct HTTPS canonical URLs.
   - Ensure proper XML syntax and schema declaration (`http://www.sitemaps.org/schemas/sitemap/0.9`).
2. Verify `robots.txt`:
   - Ensure `User-agent: *`, `Allow: /`, and `Sitemap: https://advocatejsply.com/sitemap.xml` are accurately defined without blocking any public pages.
3. Run the automated test suite:
   - Execute `python3 tests/test_seo_compliance.py` to confirm all 25 tests pass with 0 failures and 0 errors.
4. Record all details and test execution results in `/Users/satpalsingh/Projects/AdvJsply/.agents/worker_m3/handoff.md`.
5. Send a message to the caller with a concise summary and path to handoff when done.
