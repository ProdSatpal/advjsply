import json

with open('/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/meta_inventory.json') as f:
    pages = json.load(f)

for p in pages:
    print(f"\n=======================================================")
    print(f"PAGE: {p['rel_path']}")
    print(f"JSON-LD Count: {p['json_ld_count']}")
    for idx, j_data in enumerate(p['json_ld_parsed']):
        print(f"--- Schema {idx+1} ---")
        print(json.dumps(j_data, indent=2))
