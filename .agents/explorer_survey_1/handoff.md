# Handoff Report: Visual Design System & New Blog Blueprint Specification

**Agent:** Explorer 1  
**Working Directory:** `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/`  
**Date:** 2026-08-25  
**Handoff Type:** Hard (Task complete)  

---

## 1. Observation

Direct observations from codebase inspection across `/Users/satpalsingh/Projects/AdvJsply`:

1. **Blog File Architecture:**
   - Existing blog articles located at `blogs/`: `annulment-divorce-guide-nagpur.html` (298 lines), `sale-deed-registration-guide-nagpur.html` (322 lines), `top-10-divorce-lawyers-nagpur.html` (464 lines), `common-mistakes-legal-notice.html` (298 lines), `maharashtra-new-advocate-general.html` (310 lines).
   - In all blog pages, the main structure is:
     ```html
     <body class="bg-gray-50 text-slate-900">
         <div id="navbar-container"></div>
         <article class="pt-32 pb-20">
             <div class="container mx-auto px-6 max-w-4xl">
                 <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                     <img src="../assets/images/..." class="w-full h-80 object-cover">
                     <div class="p-8 md:p-12">
                         <div id="content-en" class="lang-content active prose prose-slate max-w-none">
                             ...
                         </div>
                     </div>
                 </div>
                 <!-- Author Box -->
                 <div class="mt-12 bg-white rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                     <img src="../assets/images/profile.jpg" alt="Adv. Jasvinder Singh Ply" class="w-24 h-24 rounded-full object-cover border-4 border-gold">
                     ...
                 </div>
                 <!-- Back Navigation -->
                 <div class="mt-12 flex justify-between">
                     <a href="../blogs.html" class="flex items-center text-navy font-bold hover:text-gold transition-colors">
                         <i data-lucide="arrow-left" class="mr-2 h-5 w-5"></i> Back to All Blogs
                     </a>
                 </div>
             </div>
         </article>
         <div id="footer-container"></div>
         <!-- Scripts -->
         <script src="../js/translations.js"></script>
         <script src="../js/main.js"></script>
         <script>
             function setBlogLang(lang) {
                 const l = (lang === 'hi') ? 'hi' : 'en';
                 document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('active'));
                 const target = document.getElementById('content-' + l);
                 if (target) target.classList.add('active');
             }
             document.addEventListener('DOMContentLoaded', () => {
                 const currentLang = localStorage.getItem('language') || 'en';
                 setBlogLang(currentLang === 'hi' ? 'hi' : 'en');
             });
         </script>
     </body>
     ```

2. **Asset Path Conventions:**
   - Blog subpages reference assets relatively using `../assets/images/`, `../css/styles.css`, and `../js/`.
   - The required hero image `assets/images/divorce-hero.png` exists on disk (49,033 bytes) and profile avatar `assets/images/profile.jpg` exists (209,443 bytes).
   - In `main.js:59`, the navbar dynamically checks `window.location.pathname.includes('/blogs/') ? '../' : ''` when rendering `assets/images/logo.png`.
   - Structured metadata tags (`og:image`, `twitter:image`, schema `publisher.logo.url`) require absolute URLs starting with `https://advocatejsply.com/`.

3. **Styling & Design Tokens:**
   - `css/styles.css` defines `:root` variables `--navy: #0a1d37; --navy-light: #162a4d; --gold: #eab308; --gold-dark: #ca8a04; --light-gray: #f3f4f6; --dark-gray: #374151;` and imports fonts Playfair Display (Serif) and Inter (Sans-Serif).
   - Tailwind script in `<head>` extends colors `navy` (`light: '#162a4d', DEFAULT: '#0a1d37', dark: '#04142a'`) and `gold` (`light: '#fde047', DEFAULT: '#eab308', dark: '#ca8a04'`).
   - Lucide icons are used via `<i data-lucide="icon-name"></i>` and initialized via `lucide.createIcons()` in `main.js`.

4. **Component Patterns:**
   - **Summary Comparison Table:** From `sale-deed-registration-guide-nagpur.html:177-204`, wrapped in `<div class="overflow-x-auto my-8">` with `<table class="min-w-full bg-white border border-gray-200">` and `<thead class="bg-navy text-white">`.
   - **Checklist Cards:** Unordered lists with `list-disc pl-6 space-y-4 mb-8` and dual card grids `grid md:grid-cols-2 gap-6`.
   - **Procedure Step Cards:** `<ol class="space-y-4 my-8 pl-0 list-none">` with numbered circle badges `<span class="flex-shrink-0 w-8 h-8 bg-gold/20 text-gold font-bold rounded-full flex items-center justify-center text-sm">`.
   - **FAQ Section:** `bg-gray-50 p-8 md:p-10 rounded-3xl border border-gray-100` containing border-accented questions (`border-l-4 border-gold pl-6 py-2` and `border-l-4 border-navy pl-6 py-2`).
   - **In-Article CTA Banner:** `bg-navy text-white p-8 md:p-12 rounded-3xl my-10 shadow-2xl` with WhatsApp link (`https://wa.me/918857972717`) and Consultation link (`../contact.html`).

5. **Compliance Test Suite Contracts:**
   - `tests/test_seo_compliance.py` inspects `EXPECTED_HTML_FILES`, `BLOG_PAGES`, `BASELINE_CONTENT_HASHES`, and `sitemap.xml`.
   - BlogPosting schema requires: `headline`, `image`, `datePublished`, `dateModified`, `author.name`, `publisher.name`, `publisher.logo`, `mainEntityOfPage`, `description`.
   - FAQPage schema requires: `mainEntity` list of `Question` entities with `name` and `acceptedAnswer.text`.
   - BreadcrumbList schema requires: sequential `position` (1, 2, 3), `name`, `item`.

---

## 2. Logic Chain

1. **Premise:** The new blog page `blogs/how-to-file-divorce-nagpur-guide.html` must be visually and functionally indistinguishable from existing blog posts while providing the authoritative advocate guide from `ORIGINAL_REQUEST.md`.
2. **Path Resolution Rule:** Because blog posts live in the `/blogs/` subfolder, all file references to static assets and scripts in HTML source must use `../` relative prefixes (`../assets/...`, `../css/...`, `../js/...`), while all Open Graph, Twitter, schema, and sitemap references must use canonical `https://advocatejsply.com/...` paths.
3. **Typography & Layout Hierarchy:** The layout container `container mx-auto px-6 max-w-4xl` with `bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100` provides identical desktop and mobile responsiveness across viewports.
4. **Structured Data Validation:** Standardizing on a single `@graph` block containing `BlogPosting`, `FAQPage`, and `BreadcrumbList` ensures 100% test pass rate in Tier 2 tests of `tests/test_seo_compliance.py`.
5. **Cross-Linking & Discoverability:** The new page must be indexed in `sitemap.xml` with `<lastmod>2026-08-25</lastmod>`, listed as a card in `blogs.html`, referenced in `divorce-lawyer-nagpur.html` and `mutual-divorce-lawyer-nagpur.html`, and added to the test suite dictionary in `tests/test_seo_compliance.py`.

---

## 3. Caveats

1. **No Source Modifications Made:** As an Explorer agent operating in read-only mode, no changes have been committed to source code or tests. Full implementation blueprints are provided in `analysis.md`.
2. **Multi-language Translation Scope:** The provided text in `ORIGINAL_REQUEST.md` is in English. While `#content-en` contains the complete guide, an accompanying `#content-hi` (Hindi) section or fallback should be structured to support the language switch handler (`setBlogLang`).
3. **Hero Image Sharing:** `assets/images/divorce-hero.png` is currently shared with `annulment-divorce-guide-nagpur.html`. This is fully functional and passes all disk asset resolution checks.

---

## 4. Conclusion

A complete, 100% parity visual blueprint and schema contract for `blogs/how-to-file-divorce-nagpur-guide.html` has been defined and documented in `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/analysis.md`.

Implementing this blueprint will provide:
1. Exact visual design parity with existing blogs (navy/gold palette, Playfair/Inter typography, responsive tables, cards, checklists, and FAQs).
2. Clean integration with the dynamic header, mobile menu, language switcher, and footer.
3. Zero-defect SEO and structured data compliance (`BlogPosting`, `FAQPage`, `BreadcrumbList`).
4. Complete site-wide integration plan across `blogs.html`, related service pages, `sitemap.xml`, and `tests/test_seo_compliance.py`.

---

## 5. Verification Method

To independently verify the findings and blueprint:

1. **Inspect Analysis and Blueprint:**
   View `/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/analysis.md`.

2. **Verify Asset Existence:**
   ```bash
   ls -la /Users/satpalsingh/Projects/AdvJsply/assets/images/divorce-hero.png
   ls -la /Users/satpalsingh/Projects/AdvJsply/assets/images/profile.jpg
   ls -la /Users/satpalsingh/Projects/AdvJsply/css/styles.css
   ls -la /Users/satpalsingh/Projects/AdvJsply/js/main.js
   ```

3. **Verify Compliance Test Suite Execution:**
   ```bash
   python3 /Users/satpalsingh/Projects/AdvJsply/tests/test_seo_compliance.py
   ```
   (Once the implementer creates the new page, updates `sitemap.xml`, and updates `tests/test_seo_compliance.py`, this test command will verify 100% compliance across all 23 pages.)
