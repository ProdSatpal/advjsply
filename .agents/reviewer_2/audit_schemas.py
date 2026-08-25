import json, os, sys, re
from pathlib import Path

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")
sys.path.insert(0, str(PROJECT_ROOT))
from tests.test_seo_compliance import get_all_pages_audit_data, EXPECTED_HTML_FILES, CORE_PAGES, PRACTICE_PAGES, BLOG_PAGES

audit = get_all_pages_audit_data()

print("================================================================")
print("             SCHEMA.ORG & JSON-LD AUDIT REPORT")
print("================================================================")

# 1. CORE PAGES
print("\n--- 1. CORE PAGES (7 PAGES) ---")
core_list = ["index.html", "about.html", "contact.html", "services.html", "blogs.html", "notice.html", "legal-notices.html"]
for cp in core_list:
    data = audit[cp]
    print("\n[{}]".format(cp))
    raw = json.loads(data.jsonld_raw_blocks[0])
    context = raw.get("@context")
    graph = raw.get("@graph", [])
    print("  @context: {}".format(context))
    print("  @graph entity count: {}".format(len(graph)))
    for entity in graph:
        etype = entity.get("@type")
        eid = entity.get("@id", "N/A")
        print("    * Type: {} | @id: {}".format(etype, eid))

# 2. PRACTICE PAGES
print("\n--- 2. PRACTICE AREA PAGES (10 PAGES) ---")
practice_list = sorted(PRACTICE_PAGES)
for pp in practice_list:
    data = audit[pp]
    print("\n[{}]".format(pp))
    raw = json.loads(data.jsonld_raw_blocks[0])
    graph = raw.get("@graph", [])
    for entity in graph:
        etype = entity.get("@type")
        eid = entity.get("@id", "N/A")
        print("    * Type: {} | @id: {}".format(etype, eid))
        if etype == "Service":
            print("      name: {}".format(entity.get("name")))
            print("      serviceType: {}".format(entity.get("serviceType")))
            print("      areaServed: {}".format(entity.get("areaServed")))
            print("      provider: {}".format(entity.get("provider")))
        elif etype == "FAQPage":
            questions = entity.get("mainEntity", [])
            print("      FAQ Question Count: {}".format(len(questions)))
            for idx, q in enumerate(questions):
                print("        Q{}: {}".format(idx+1, q.get("name", "")[:60]))

# 3. BLOG POSTS
print("\n--- 3. BLOG ARTICLE PAGES (5 PAGES) ---")
blog_list = sorted(BLOG_PAGES)
for bp in blog_list:
    data = audit[bp]
    print("\n[{}]".format(bp))
    raw = json.loads(data.jsonld_raw_blocks[0])
    graph = raw.get("@graph", [])
    for entity in graph:
        etype = entity.get("@type")
        eid = entity.get("@id", "N/A")
        print("    * Type: {} | @id: {}".format(etype, eid))
        if etype in ["BlogPosting", "Article"]:
            print("      headline: {}".format(entity.get("headline")))
            print("      datePublished: {}".format(entity.get("datePublished")))
            print("      dateModified: {}".format(entity.get("dateModified")))
            print("      author: {}".format(entity.get("author")))
            print("      publisher: {}".format(entity.get("publisher")))
            print("      image: {}".format(entity.get("image")))
            print("      mainEntityOfPage: {}".format(entity.get("mainEntityOfPage")))
            print("      description: {}".format(entity.get("description")))
        elif etype == "FAQPage":
            questions = entity.get("mainEntity", [])
            print("      FAQ Question Count: {}".format(len(questions)))
            for idx, q in enumerate(questions):
                print("        Q{}: {}".format(idx+1, q.get("name", "")[:60]))
