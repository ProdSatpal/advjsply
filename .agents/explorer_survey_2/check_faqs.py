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
    
    # Check for FAQ structured data
    faq_matches = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", html, re.DOTALL | re.IGNORECASE)
    ld_faqs = []
    for s in faq_matches:
        try:
            d = json.loads(s)
            if isinstance(d, dict) and d.get("@type") == "FAQPage":
                ld_faqs = d.get("mainEntity", [])
        except:
            pass

    # Check for visible FAQ questions in HTML
    # Typically <button class="...accordion..."> or <h3/h4/summary> with FAQ content
    q_in_html = re.findall(r"<button[^>]*class=[\"'][^\"']*accordion[^\"']*[\"'][^>]*>(.*?)</button>", html, re.DOTALL | re.IGNORECASE)
    if not q_in_html:
        q_in_html = re.findall(r"<details[^>]*>.*?<summary[^>]*>(.*?)</summary>", html, re.DOTALL | re.IGNORECASE)

    print(f"=== {rel} ===")
    print(f"  JSON-LD FAQ count: {len(ld_faqs)}")
    print(f"  Visible FAQ questions count: {len(q_in_html)}")
    if ld_faqs:
        for i, q in enumerate(ld_faqs):
            print(f"    Schema Q{i+1}: {q.get('name')}")
    if q_in_html:
        for i, q in enumerate(q_in_html):
            clean_q = re.sub(r"<[^>]+>", "", q).strip()
            print(f"    HTML Q{i+1}: {clean_q}")
    print()
