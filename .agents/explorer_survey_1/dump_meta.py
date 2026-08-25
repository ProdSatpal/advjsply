import json

with open('/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/meta_inventory.json') as f:
    pages = json.load(f)

for idx, p in enumerate(pages, 1):
    print(f"\n--- Page {idx}: {p['rel_path']} ---")
    print(f"HTML lang: {p['html_lang']}")
    print(f"Charset: {p['charset']}")
    print(f"Viewport: {p['viewport']}")
    print(f"Title ({p['title_len']} chars): {p['title']}")
    print(f"Description ({p['description_len']} chars): {p['description']}")
    print(f"Canonical: {p['canonical']}")
    print(f"Author: {p['author']}")
    print(f"Robots: {p['robots']}")
    print(f"Keywords: {p['keywords']}")
    print("Open Graph tags:")
    for k, v in sorted(p['og_tags'].items()):
        print(f"  {k}: {v}")
    print("Twitter tags:")
    for k, v in sorted(p['twitter_tags'].items()):
        print(f"  {k}: {v}")
    print(f"JSON-LD Schemas ({p['json_ld_count']} blocks):")
    for j_idx, j_data in enumerate(p['json_ld_parsed']):
        j_type = j_data.get('@type') if isinstance(j_data, dict) else 'List'
        print(f"  Block {j_idx+1}: @type={j_type}")
