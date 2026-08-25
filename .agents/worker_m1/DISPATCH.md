## 2026-08-25T08:49:29Z
You are teamwork_preview_worker for Milestone M1: Technical SEO & Head Metadata Optimization.
Your working directory is `/Users/satpalsingh/Projects/AdvJsply/.agents/worker_m1/`.
The project workspace root is `/Users/satpalsingh/Projects/AdvJsply`.
You MUST read:
1. `/Users/satpalsingh/Projects/AdvJsply/ORIGINAL_REQUEST.md`
2. `/Users/satpalsingh/Projects/AdvJsply/PROJECT.md`
3. `/Users/satpalsingh/Projects/AdvJsply/TEST_INFRA.md`
4. `/Users/satpalsingh/Projects/AdvJsply/TEST_READY.md`
5. `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/report.md`

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Specific Milestone M1 Tasks:
1. Update `<html lang="en-IN">` on all 22 HTML pages.
2. Insert `<link rel="canonical" href="https://advocatejsply.com/blogs.html">` into `blogs.html`. Ensure all other 21 pages maintain accurate canonical links.
3. Optimize `<title>` tags across all 22 HTML pages so every page has a unique, high-relevance title (<= 60 chars) with consistent brand naming (`| Adv. Jasvinder Singh Ply` or `| Adv. JS Ply`).
4. Optimize `<meta name="description">` on all 22 HTML pages to be between 50 and 160 characters. Specifically tighten `blogs/maharashtra-new-advocate-general.html` (was 166 chars) and `mutual-divorce-lawyer-nagpur.html` (was 165 chars) without altering keyword intent.
5. Standardize Open Graph and Twitter Card tags across all 22 pages:
   - Add `<meta property="og:locale" content="en_IN">` to all 22 pages.
   - Add missing `<meta property="og:site_name" content="Advocate Jasvinder Singh Ply">` to `index.html` and `legal-notices.html`.
   - Change `og:type` from `"article"` to `"website"` on `legal-notices.html`.
   - Fix broken social image references (`og-image.jpg` 404s) across 20 pages by mapping `og:image` and `twitter:image` to existing valid images in `assets/images/`:
     * `blogs/annulment-divorce-guide-nagpur.html` -> `https://advocatejsply.com/assets/images/divorce-hero.png`
     * `blogs/common-mistakes-legal-notice.html` -> `https://advocatejsply.com/assets/images/blog-hero.png`
     * `blogs/maharashtra-new-advocate-general.html` -> `https://advocatejsply.com/assets/images/advocate-general-hero.png`
     * `blogs/sale-deed-registration-guide-nagpur.html` -> `https://advocatejsply.com/assets/images/saledeed-hero.png`
     * `blogs/top-10-divorce-lawyers-nagpur.html` -> `https://advocatejsply.com/assets/images/top10-hero.png`
     * Core & practice area pages -> `https://advocatejsply.com/assets/images/profile.jpg` or `assets/images/logo.png`.
6. STRICT GUARDRAIL: Do NOT modify any visible text inside `<body>`, headings, forms, navigation elements, or layout styling. All modifications must be restricted strictly to `<head>` and `<html>` opening tag.
7. Run the test suite using `python3 tests/test_seo_compliance.py` to verify that all Tier 1 tests and the social image asset test pass.
8. Document all edits and test output in `/Users/satpalsingh/Projects/AdvJsply/.agents/worker_m1/handoff.md`.
9. Send a message to the caller with a concise summary and path to handoff when done.
