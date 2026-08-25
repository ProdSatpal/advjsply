import os
import glob
import re
import json

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))

for f in html_files:
    rel = os.path.relpath(f, workspace_dir)
    with open(f, "r", encoding="utf-8", errors="ignore") as fp:
        html = fp.read()
    
    # Extract JSON-LD FAQs
    faq_matches = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", html, re.DOTALL | re.IGNORECASE)
    ld_faqs = []
    for s in faq_matches:
        try:
            d = json.loads(s)
            if isinstance(d, dict) and d.get("@type") == "FAQPage":
                ld_faqs = [q.get("name", "") for q in d.get("mainEntity", []) if isinstance(q, dict)]
        except:
            pass

    # Extract HTML FAQs with data-i18n ending with Q or FAQ headers
    # Look for patterns like <h3...data-i18n="...Q...">Question</h3> or headings inside FAQ sections
    html_faqs = []
    # Pattern 1: data-i18n containing Q or Faq
    h3_faqs = re.findall(r"<h3[^>]*data-i18n=[\"'][^\"']*[Ff]aq[^\"']*Q[\"'][^>]*>(.*?)</h3>", html, re.DOTALL | re.IGNORECASE)
    if h3_faqs:
        html_faqs = [re.sub(r"<[^>]+>", "", x).strip() for x in h3_faqs]
    else:
        # Pattern 2: FAQ section container
        faq_section = re.search(r"Frequently Asked Questions.*?</section>|Frequently Asked Questions.*?</div>\s*</div>\s*</div>", html, re.DOTALL | re.IGNORECASE)
        if faq_section:
            qs = re.findall(r"<h[34][^>]*>(.*?)</h[34]>", faq_section.group(0), re.DOTALL | re.IGNORECASE)
            html_faqs = [re.sub(r"<[^>]+>", "", x).strip() for x in qs if x.strip() and not "Frequently Asked Questions" in x]

    print(f"=== {rel} ===")
    print(f"  JSON-LD FAQs ({len(ld_faqs)}):")
    for q in ld_faqs:
        print(f"    - {q}")
    print(f"  HTML FAQs ({len(html_faqs)}):")
    for q in html_faqs:
        print(f"    - {q}")
    
    # Check differences
    missing_in_ld = [q for q in html_faqs if not any(q.lower() in lq.lower() or lq.lower() in q.lower() for lq in ld_faqs)]
    if missing_in_ld:
        print(f"  ⚠️ Visible questions NOT in JSON-LD FAQPage: {missing_in_ld}")
    print()
