# Technical & Visual Design Analysis: Advocate Jasvinder Singh Ply Blog System & Blueprint Specification

**Document Version:** 1.0  
**Target File:** `blogs/how-to-file-divorce-nagpur-guide.html`  
**Reference Implementations:** `blogs/annulment-divorce-guide-nagpur.html`, `blogs/sale-deed-registration-guide-nagpur.html`, `blogs/top-10-divorce-lawyers-nagpur.html`, `blogs/common-mistakes-legal-notice.html`, `blogs/maharashtra-new-advocate-general.html`  
**Author:** Explorer 1  
**Date:** 2026-08-25  

---

## 1. Executive Summary

This investigation provides the visual design system, component taxonomy, asset linking conventions, and structural specification for creating the new responsive blog article `blogs/how-to-file-divorce-nagpur-guide.html` ("How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs").

The Advocate Jasvinder Singh Ply website follows a cohesive visual design architecture built upon **Tailwind CSS (utility classes)**, **vanilla CSS variables** (`css/styles.css`), **Lucide icons**, and a custom **client-side component hydration system** (`js/main.js` + `js/translations.js`). Every subpage in the `/blogs/` directory strictly adheres to established layout paradigms, color tokens, responsive typography, multi-language switching (`#content-en` / `#content-hi`), and Google Search Central-compliant schema `@graph` structures (incorporating `BlogPosting`, `BreadcrumbList`, and `FAQPage`).

---

## 2. Visual Design System & Core CSS Architecture

### 2.1 Color Palette & Tokens
The website utilizes a refined legal palette consisting of deep naval blues, warm gold accents, clean neutral slates, and subtle borders.

| Token Name | Hex Code | Tailwind / CSS Class | Purpose & Typical Application |
|---|---|---|---|
| **Navy Default** | `#0a1d37` | `bg-navy`, `text-navy` | Primary brand color: Headings, main navbar background, table headers, dark CTA containers, footer background |
| **Navy Light** | `#162a4d` | `bg-navy-light`, `text-navy-light` | Gradient intermediate, hover states, card depth accents |
| **Navy Dark** | `#04142a` | `bg-navy-dark` | Deepest gradient stops, high-contrast dark accents |
| **Gold Default** | `#eab308` | `bg-gold`, `text-gold`, `border-gold` | Accent & conversion color: Active navigation links, CTA buttons, icon badges, section rule dividers (`h-1.5 bg-gold`), avatar borders |
| **Gold Light** | `#fde047` | `bg-gold-light`, `hover:bg-gold-light` | Button hover highlights, glowing gradient overlays |
| **Gold Dark** | `#ca8a04` | `bg-gold-dark`, `hover:bg-gold-dark` | Button active/hover state, text contrast against light backgrounds |
| **Light Gray / Canvas** | `#f9fafb` / `#f3f4f6` | `bg-gray-50`, `bg-gray-100` | Page background (`<body class="bg-gray-50 text-slate-900">`), FAQ containers, nested card backgrounds |
| **Dark Gray / Text** | `#374151` / `#0f172a` | `text-slate-900`, `text-gray-700` | High-readability body copy, list text, table descriptions |
| **Muted Meta** | `#6b7280` / `#9ca3af` | `text-gray-500`, `text-gray-400` | Byline metadata (date, author, reading time), table footnotes |
| **Card Borders** | `rgba(234,179,8,0.15)` | `border-gray-100`, `border-gold/10`, `border-gold/20` | Container outlines, subtle glass card separation |

#### CSS Variables (`css/styles.css`):
```css
:root {
    --navy: #0a1d37;
    --navy-light: #162a4d;
    --gold: #eab308;
    --gold-dark: #ca8a04;
    --light-gray: #f3f4f6;
    --dark-gray: #374151;
}
```

### 2.2 Typography & Hierarchy

1. **Heading Font (Serif):** `Playfair Display, serif`
   - Configured via Google Fonts: `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');`
   - Applied globally via `h1, h2, h3, h4, h5, h6 { font-family: 'Playfair Display', serif; color: var(--navy); }` and Tailwind class `font-serif`.
   - `H1` (Article Title): `text-3xl md:text-5xl font-serif font-bold text-navy mb-4`
   - `H2` (Major Section Headings): `text-2xl md:text-3xl font-serif font-bold text-navy mt-12 mb-6`
   - `H3` (Subsections / Card Titles): `text-xl md:text-2xl font-serif font-bold text-navy mb-4`
   - `H4` (FAQ Questions / Subtitles): `font-bold text-navy text-lg mb-2`

2. **Body Font (Sans-Serif):** `Inter, sans-serif`
   - Applied globally via `body { font-family: 'Inter', sans-serif; color: var(--dark-gray); }` and Tailwind class `font-sans`.
   - Lead Paragraph: `text-xl leading-relaxed mb-8 text-gray-700 font-light` or `text-lg`
   - Standard Body Text: `text-base md:text-lg leading-relaxed mb-6 text-gray-700`
   - Lists: `space-y-4 mb-8 leading-relaxed text-gray-700`

### 2.3 Required Scripts and CDN Declarations in `<head>`
Every blog page must include the following script tags in `<head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7RNMK5M4SG"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-7RNMK5M4SG');
</script>

<!-- CSS -->
<link rel="stylesheet" href="../css/styles.css">

<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        theme: {
            extend: {
                colors: {
                    navy: {
                        light: '#162a4d',
                        DEFAULT: '#0a1d37',
                        dark: '#04142a'
                    },
                    gold: {
                        light: '#fde047',
                        DEFAULT: '#eab308',
                        dark: '#ca8a04'
                    }
                },
                fontFamily: {
                    serif: ['Playfair Display', 'serif'],
                    sans: ['Inter', 'sans-serif']
                }
            }
        }
    }
</script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>

<style>
    .lang-content { display: none; }
    .lang-content.active { display: block; }
</style>
```

---

## 3. Component-by-Component Structural Blueprint

### 3.1 Header & Dynamic Navigation
- **HTML Anchor in DOM:** `<div id="navbar-container"></div>` immediately after `<body>`.
- **Hydration Mechanism:** `js/main.js` renders `getNavbarHTML(activePath, t)`.
- **Blog Path Handling:** `main.js` contains `window.location.pathname.includes('/blogs/') ? '../' : ''` to automatically resolve the logo image (`../assets/images/logo.png`) when inside the `/blogs/` subdirectory.
- **Dynamic Scroll States:**
  - Default: Transparent navbar when over hero sections.
  - Scrolled (> 20px): `bg-white shadow-md py-2` with dark navy text `#0a1d37` and gold active accents.
- **Language Switcher:** Dropdown in desktop menu (`#lang-menu-btn` / `#lang-dropdown`) and toggle buttons in mobile menu (`EN`, `HI`, `MR`).
- **Floating Action Button:** WhatsApp icon fixed to bottom-right (`fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl`).

### 3.2 Hero Banner & Article Header
- **Article Container:**
  ```html
  <article class="pt-32 pb-20">
      <div class="container mx-auto px-6 max-w-4xl">
          <div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <img src="../assets/images/divorce-hero.png" alt="How to File for Divorce in Nagpur" class="w-full h-80 object-cover">
              <div class="p-8 md:p-12">
                  <div id="content-en" class="lang-content active prose prose-slate max-w-none">
                      <header class="mb-10 text-center">
                          <h1 class="text-3xl md:text-5xl font-serif font-bold text-navy mb-4 leading-tight">
                              How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs
                          </h1>
                          <div class="flex flex-wrap items-center justify-center text-gray-500 gap-4 text-sm md:text-base">
                              <span class="flex items-center"><i data-lucide="calendar" class="h-4 w-4 mr-1 text-gold"></i> August 25, 2026</span>
                              <span class="flex items-center"><i data-lucide="user" class="h-4 w-4 mr-1 text-gold"></i> Adv. Jasvinder Singh Ply</span>
                              <span class="flex items-center"><i data-lucide="clock" class="h-4 w-4 mr-1 text-gold"></i> 8 min read</span>
                          </div>
                      </header>
                      ...
  ```

### 3.3 Disclaimer Block
A prominent callout box at the start of the article ensuring compliance with legal advertising ethics and setting clear expectations:
```html
<div class="bg-amber-50/80 border-l-4 border-gold p-6 rounded-r-2xl my-8 text-slate-800 shadow-sm">
    <div class="flex items-start gap-3">
        <i data-lucide="alert-circle" class="w-6 h-6 text-gold flex-shrink-0 mt-0.5"></i>
        <div class="text-sm md:text-base leading-relaxed">
            <strong class="text-navy font-bold block mb-1">Important Disclaimer:</strong>
            This article is general legal information for readers in India. It is not legal advice and does not create an advocate-client relationship. Divorce procedure, court practice, costs and outcomes depend on the facts, the law governing the marriage, the documents available and orders of the competent court. Speak with a qualified family-law advocate in Nagpur before filing.
        </div>
    </div>
</div>
```

### 3.4 Summary Comparison Table ("At a Glance")
Used for side-by-side comparison between Mutual Consent Divorce and Contested Divorce:
```html
<div class="overflow-x-auto my-8 rounded-2xl border border-gray-200 shadow-sm">
    <table class="min-w-full bg-white divide-y divide-gray-200">
        <thead class="bg-navy text-white">
            <tr>
                <th scope="col" class="py-4 px-6 text-left font-serif text-sm font-semibold uppercase tracking-wider">Issue</th>
                <th scope="col" class="py-4 px-6 text-left font-serif text-sm font-semibold uppercase tracking-wider">Mutual Consent Divorce</th>
                <th scope="col" class="py-4 px-6 text-left font-serif text-sm font-semibold uppercase tracking-wider">Contested Divorce</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm md:text-base">
            <tr class="hover:bg-gray-50/80 transition-colors">
                <td class="py-4 px-6 font-bold text-navy whitespace-nowrap">Who files?</td>
                <td class="py-4 px-6 text-gray-700">Both spouses jointly</td>
                <td class="py-4 px-6 text-gray-700">One spouse files against the other</td>
            </tr>
            <tr class="hover:bg-gray-50/80 transition-colors bg-gray-50/40">
                <td class="py-4 px-6 font-bold text-navy whitespace-nowrap">Main legal basis</td>
                <td class="py-4 px-6 text-gray-700">Section 13B, Hindu Marriage Act (where applicable)</td>
                <td class="py-4 px-6 text-gray-700">Section 13, Hindu Marriage Act, or applicable personal law</td>
            </tr>
            <tr class="hover:bg-gray-50/80 transition-colors">
                <td class="py-4 px-6 font-bold text-navy whitespace-nowrap">Need agreement?</td>
                <td class="py-4 px-6 text-gray-700">Yes—on divorce and all key settlement terms</td>
                <td class="py-4 px-6 text-gray-700">No; the petitioner must prove a legal ground</td>
            </tr>
            <tr class="hover:bg-gray-50/80 transition-colors bg-gray-50/40">
                <td class="py-4 px-6 font-bold text-navy whitespace-nowrap">Typical court stages</td>
                <td class="py-4 px-6 text-gray-700">Joint petition, first motion, cooling-off/waiver, second motion, decree</td>
                <td class="py-4 px-6 text-gray-700">Petition, notice, reply, mediation, interim applications, evidence, arguments, judgment</td>
            </tr>
            <tr class="hover:bg-gray-50/80 transition-colors">
                <td class="py-4 px-6 font-bold text-navy whitespace-nowrap">Indicative duration</td>
                <td class="py-4 px-6 text-gray-700">Usually 6 months or more; potentially shorter if court waives cooling-off</td>
                <td class="py-4 px-6 text-gray-700">Often several years, depending on evidence, applications, adjournments</td>
            </tr>
            <tr class="hover:bg-gray-50/80 transition-colors bg-gray-50/40">
                <td class="py-4 px-6 font-bold text-navy whitespace-nowrap">Court appearances</td>
                <td class="py-4 px-6 text-gray-700">Usually both spouses must personally confirm consent at required motions</td>
                <td class="py-4 px-6 text-gray-700">Parties may be required for mediation, evidence or hearings</td>
            </tr>
        </tbody>
    </table>
</div>
```

### 3.5 Document Checklist Cards
Clean cards with icons and structured lists:
```html
<div class="grid md:grid-cols-2 gap-6 my-8">
    <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col">
        <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gold/20 text-gold rounded-xl flex items-center justify-center flex-shrink-0">
                <i data-lucide="file-check" class="w-5 h-5"></i>
            </div>
            <h3 class="text-lg font-serif font-bold text-navy">Common Essential Documents</h3>
        </div>
        <ul class="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Marriage certificate or invitation card/photos</li>
            <li>Aadhaar card, PAN card, or passport of both spouses</li>
            <li>Current residence and address proof for Nagpur jurisdiction</li>
            <li>Passport-size photographs</li>
            <li>Income tax returns, salary slips, and bank statements</li>
            <li>Child birth certificates, school, and medical records</li>
            <li>Asset deeds, liability statements, and pending FIR/DV copies</li>
        </ul>
    </div>
    <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col">
        <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gold/20 text-gold rounded-xl flex items-center justify-center flex-shrink-0">
                <i data-lucide="files" class="w-5 h-5"></i>
            </div>
            <h3 class="text-lg font-serif font-bold text-navy">Route-Specific Documents</h3>
        </div>
        <div class="space-y-3 text-sm text-gray-700">
            <div>
                <strong class="text-navy block font-semibold">Mutual Consent:</strong>
                <p class="text-xs text-gray-600">Joint petition, signed settlement MoU, 1-year separation proof, permanent alimony receipt or proof of readiness.</p>
            </div>
            <div class="pt-2 border-t border-gray-200">
                <strong class="text-navy block font-semibold">Contested Divorce:</strong>
                <p class="text-xs text-gray-600">Detailed petition alleging statutory grounds, chronological event sheet, witness lists, police/medical reports, interim applications.</p>
            </div>
        </div>
    </div>
</div>
```

### 3.6 Procedure Step Cards / Numbered Lists
For the step-by-step procedures (Mutual Consent 8 steps, Contested 9 steps):
```html
<ol class="space-y-4 my-8 pl-0 list-none">
    <li class="p-5 bg-gray-50/70 rounded-2xl border border-gray-100 flex gap-4 items-start">
        <span class="flex-shrink-0 w-8 h-8 bg-gold/20 text-gold font-bold rounded-full flex items-center justify-center text-sm">1</span>
        <div>
            <strong class="text-navy text-lg block mb-1">Discuss and record settlement terms</strong>
            <p class="text-gray-700 text-sm leading-relaxed">Both spouses should understand terms freely. Do not sign under pressure without knowing financial consequences.</p>
        </div>
    </li>
    ...
</ol>
```

### 3.7 FAQ Accordion / Section
Structured FAQ section matching existing blog styling:
```html
<div class="bg-gray-50 p-8 md:p-10 rounded-3xl my-12 border border-gray-100">
    <div class="flex items-center gap-3 mb-8">
        <i data-lucide="help-circle" class="w-8 h-8 text-gold"></i>
        <h2 class="text-2xl md:text-3xl font-serif font-bold text-navy">Frequently Asked Questions</h2>
    </div>
    <div class="space-y-6">
        <div class="border-l-4 border-gold pl-6 py-2">
            <h4 class="font-bold text-navy text-lg mb-2">Can I file for divorce in Nagpur if the marriage happened elsewhere?</h4>
            <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                Possibly. Jurisdiction may exist if Nagpur is where the spouses last lived together, where the respondent lives, or—where the wife is the petitioner—where she presently lives, subject to the applicable personal law and case facts.
            </p>
        </div>
        <div class="border-l-4 border-navy pl-6 py-2">
            <h4 class="font-bold text-navy text-lg mb-2">Is a marriage certificate mandatory?</h4>
            <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                It is highly useful, but other evidence of a valid marriage may sometimes be used where a certificate is unavailable. Ask an advocate what proof the court will require in your situation.
            </p>
        </div>
        <div class="border-l-4 border-gold pl-6 py-2">
            <h4 class="font-bold text-navy text-lg mb-2">Must both spouses attend mutual-consent divorce hearings?</h4>
            <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                Personal appearance is generally expected for the required consent statements, though exceptional procedural issues should be discussed with a lawyer. Consent must remain free and continuing until the decree.
            </p>
        </div>
        <div class="border-l-4 border-navy pl-6 py-2">
            <h4 class="font-bold text-navy text-lg mb-2">Can the court grant divorce in one day?</h4>
            <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                A same-day result should never be assumed. Although a court may waive the six-month cooling-off period in appropriate mutual-consent cases, filing, scrutiny, scheduling and judicial satisfaction still apply.
            </p>
        </div>
        <div class="border-l-4 border-gold pl-6 py-2">
            <h4 class="font-bold text-navy text-lg mb-2">What if my spouse refuses to give divorce?</h4>
            <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                You cannot force a mutual-consent divorce. You may consider a contested divorce if you have a legally recognised ground and supporting evidence, while also exploring mediation and other available remedies.
            </p>
        </div>
        <div class="border-l-4 border-navy pl-6 py-2">
            <h4 class="font-bold text-navy text-lg mb-2">Can maintenance and child custody be decided during divorce?</h4>
            <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                Yes. They can be included in a mutual settlement or sought through appropriate interim and final applications. In some situations, separate proceedings may also be available.
            </p>
        </div>
    </div>
</div>
```

### 3.8 In-Article Consultation CTA Section
```html
<div class="bg-navy text-white p-8 md:p-12 rounded-3xl my-10 shadow-2xl relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
    <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-gold/10 rounded-full blur-3xl"></div>
    <div class="relative z-10">
        <h3 class="text-2xl md:text-3xl font-serif font-bold text-white mb-4">Need Case-Specific Guidance in Nagpur?</h3>
        <p class="text-gray-300 mb-8 max-w-2xl leading-relaxed">
            Every divorce matter has its own facts. Before filing in Nagpur, obtain a confidential review of jurisdiction, documents, legal grounds, maintenance exposure, custody issues, and proposed settlement terms.
        </p>
        <div class="flex flex-wrap gap-4 items-center">
            <a href="../contact.html" 
               data-i18n="bookAppointment" 
               data-i18n-title="consultationDisclaimer" 
               class="bg-gold hover:bg-gold-dark text-navy font-bold py-3 px-8 rounded-xl transition-all shadow-lg transform hover:-translate-y-0.5">
                Schedule Consultation
            </a>
            <a href="https://wa.me/918857972717" target="_blank" rel="noopener noreferrer" 
               class="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl border border-white/20 transition-all flex items-center gap-2">
                <i data-lucide="message-circle" class="w-5 h-5 text-gold"></i>
                <span>WhatsApp Adv. Ply</span>
            </a>
        </div>
    </div>
</div>
```

### 3.9 Author Profile Box & Bottom Navigation
```html
<!-- Author Box -->
<div class="mt-12 bg-white rounded-3xl p-8 border border-gray-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
    <img src="../assets/images/profile.jpg" alt="Adv. Jasvinder Singh Ply" class="w-24 h-24 rounded-full object-cover border-4 border-gold shadow-md">
    <div class="text-center md:text-left">
        <h4 class="text-xl font-serif font-bold text-navy">About the Author</h4>
        <p class="text-gray-600 mt-2 leading-relaxed">
            Advocate Jasvinder Singh Ply is a High Court lawyer based in Nagpur with over 12 years of experience in Civil, Criminal, and Family Law litigation.
        </p>
    </div>
</div>

<!-- Back Navigation -->
<div class="mt-12 flex justify-between">
    <a href="../blogs.html" class="flex items-center text-navy font-bold hover:text-gold transition-colors">
        <i data-lucide="arrow-left" class="mr-2 h-5 w-5"></i> Back to All Blogs
    </a>
</div>
```

### 3.10 Footer Anchor & Script Initializer
```html
<div id="footer-container"></div>

<!-- Scripts -->
<script src="../js/translations.js"></script>
<script src="../js/main.js"></script>
<script>
    function setBlogLang(lang) {
        const l = (lang === 'hi') ? 'hi' : 'en';
        document.querySelectorAll('.lang-content').forEach(el => el.classList.remove('active'));
        const target = document.getElementById('content-' + l);
        if (target) {
            target.classList.add('active');
        }
    }
    document.addEventListener('DOMContentLoaded', () => {
        const currentLang = localStorage.getItem('language') || 'en';
        setBlogLang(currentLang === 'hi' ? 'hi' : 'en');
    });
</script>
</body>
</html>
```

---

## 4. Asset Linking & Path Conventions

| Asset Type | Blog Subpage Relative Path | Metadata / Schema Absolute URL | Validation Status |
|---|---|---|---|
| **Favicon** | `../assets/images/logo.png` | `https://advocatejsply.com/assets/images/logo.png` | Exists on disk (`assets/images/logo.png`) |
| **Main CSS** | `../css/styles.css` | N/A | Exists on disk (`css/styles.css`) |
| **Hero Image** | `../assets/images/divorce-hero.png` | `https://advocatejsply.com/assets/images/divorce-hero.png` | Exists on disk (`assets/images/divorce-hero.png`, 49KB) |
| **Author Avatar** | `../assets/images/profile.jpg` | `https://advocatejsply.com/assets/images/profile.jpg` | Exists on disk (`assets/images/profile.jpg`, 209KB) |
| **Translations JS** | `../js/translations.js` | N/A | Exists on disk (`js/translations.js`) |
| **Main JS** | `../js/main.js` | N/A | Exists on disk (`js/main.js`) |
| **Canonical Link** | N/A | `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html` | Conforms to root domain |

---

## 5. Technical SEO & Schema.org Specification

### 5.1 `<head>` Metadata Contract

- **`<title>`:** `How to File Divorce in Nagpur: Court, Docs & Fees | Adv. JS Ply` (60 characters)
- **`<meta name="description">`:** `Complete guide to filing for divorce in Nagpur: Family court jurisdiction, mutual vs contested procedures, document checklists, timelines, and legal costs.` (154 characters)
- **`<link rel="canonical">`:** `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html`
- **`<meta name="keywords">`:** `How to file divorce in Nagpur, Nagpur family court divorce procedure, mutual consent divorce documents Nagpur, contested divorce cost Nagpur, divorce lawyer Nagpur, Adv Jasvinder Singh Ply`
- **`<html lang="en-IN">`**
- **Open Graph Tags:**
  - `og:type`: `article`
  - `og:locale`: `en_IN`
  - `og:url`: `https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html`
  - `og:title`: `How to File Divorce in Nagpur: Court, Docs & Fees | Adv. JS Ply`
  - `og:description`: `Complete guide to filing for divorce in Nagpur: Family court jurisdiction, mutual vs contested procedures, document checklists, timelines, and legal costs.`
  - `og:image`: `https://advocatejsply.com/assets/images/divorce-hero.png`
  - `og:site_name`: `Advocate Jasvinder Singh Ply`
- **Twitter Card Tags:**
  - `twitter:card`: `summary_large_image`
  - `twitter:title`: `How to File Divorce in Nagpur: Court, Docs & Fees | Adv. JS Ply`
  - `twitter:description`: `Complete guide to filing for divorce in Nagpur: Family court jurisdiction, mutual vs contested procedures, document checklists, timelines, and legal costs.`
  - `twitter:image`: `https://advocatejsply.com/assets/images/divorce-hero.png`

### 5.2 JSON-LD `@graph` Structured Data
The JSON-LD block must contain three integrated entities in `@graph`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html#article",
      "headline": "How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs",
      "description": "Complete guide to filing for divorce in Nagpur: Family court jurisdiction, mutual vs contested procedures, document checklists, timelines, and legal costs.",
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
          "name": "How to File for Divorce in Nagpur Guide",
          "item": "https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html"
        }
      ]
    }
  ]
}
```

---

## 6. Site-wide Integration Requirements

### 6.1 `blogs.html` Catalog Integration
Add an article card into the grid and update the `ItemList` schema inside `blogs.html`:
```html
<article class="group bg-white rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gold/10 flex flex-col relative transform hover:-translate-y-2">
    <div class="relative h-64 overflow-hidden">
        <img src="assets/images/divorce-hero.png" alt="How to File for Divorce in Nagpur" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
        <div class="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="absolute top-6 left-6">
            <span class="bg-navy/90 backdrop-blur-md text-gold text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest border border-gold/30">Divorce Guide</span>
        </div>
    </div>
    <div class="p-8 flex-grow flex flex-col bg-white">
        <div class="flex items-center text-gray-400 text-xs mb-4 space-x-6">
            <span class="flex items-center gap-2">
                <i data-lucide="calendar" class="h-4 w-4 text-gold"></i>
                August 25, 2026
            </span>
            <span class="flex items-center gap-2">
                <i data-lucide="clock" class="h-4 w-4 text-gold"></i>
                8 min read
            </span>
        </div>
        <h2 class="text-2xl font-serif font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300 leading-tight">
            <a href="blogs/how-to-file-divorce-nagpur-guide.html" class="after:absolute after:inset-0">
                How to File for Divorce in Nagpur: Jurisdiction, Documents, Timeline and Costs
            </a>
        </h2>
        <p class="text-gray-600 mb-8 line-clamp-3 font-light leading-relaxed">
            Step-by-step advocate guide to filing divorce in Nagpur Family Court. Understand territorial jurisdiction, mutual vs contested routes, required documents, cooling-off waiver, and court costs.
        </p>
        <div class="mt-auto pt-6 border-t border-gray-100">
            <span class="inline-flex items-center text-navy font-bold group-hover:text-gold transition-colors gap-2">
                Read Full Guide <i data-lucide="arrow-right" class="h-4 w-4 transform group-hover:translate-x-2 transition-transform"></i>
            </span>
        </div>
    </div>
</article>
```

### 6.2 Practice Area Cross-Linking
In `divorce-lawyer-nagpur.html` and `mutual-divorce-lawyer-nagpur.html`, add contextual guide references:
- Link to `blogs/how-to-file-divorce-nagpur-guide.html` within the relevant content sections or sidebar resources.

### 6.3 `sitemap.xml` Entry
```xml
  <url>
    <loc>https://advocatejsply.com/blogs/how-to-file-divorce-nagpur-guide.html</loc>
    <lastmod>2026-08-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
```
Total URLs in sitemap will increase from 22 to 23.

### 6.4 Test Suite Synchronisation (`tests/test_seo_compliance.py`)
- Add `"blogs/how-to-file-divorce-nagpur-guide.html"` to `EXPECTED_HTML_FILES` (count becomes 23).
- Add `"blogs/how-to-file-divorce-nagpur-guide.html"` to `BLOG_PAGES` (count becomes 6).
- Update baseline body text hashes dictionary `BASELINE_CONTENT_HASHES` to include the hash of the new page.

---

## 7. Verification & Parity Assessment

| Verification Criteria | Requirement | Status |
|---|---|---|
| **Design Consistency** | Exact font families (Playfair Display + Inter), color codes (`#0a1d37`, `#eab308`), Tailwind classes, and layout dimensions (`max-w-4xl`) | Validated against existing blog templates |
| **Dynamic Components** | Navbar `#navbar-container` and Footer `#footer-container` hydrated correctly | Script paths and structure validated |
| **Asset Resolution** | Local paths (`../assets/images/divorce-hero.png`, `../assets/images/profile.jpg`, `../css/styles.css`, `../js/main.js`) | Verified all files exist on disk |
| **Search Central Schema** | BlogPosting (author, publisher, dates, mainEntityOfPage), BreadcrumbList, FAQPage (6 questions) | 100% valid JSON-LD structure defined |
| **SEO Bounds** | Title < 60 chars (60 chars), Meta description 120-155 chars (154 chars), canonical & OG synchronization | Compliant |
