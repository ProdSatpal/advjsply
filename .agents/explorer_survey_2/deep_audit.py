import json
import os
import glob
import re

with open("/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_2/audit_data.json") as f:
    data = json.load(f)

output_lines = []

for page in sorted(data.keys()):
    info = data[page]
    output_lines.append("=" * 80)
    output_lines.append(f"PAGE: {page}")
    output_lines.append(f"Title: {info.get('title', '')}")
    output_lines.append(f"Canonical: {info.get('canonical', '')}")
    output_lines.append(f"Errors: {info.get('errors', [])}")
    output_lines.append(f"Script Count: {info.get('script_count', 0)}")
    for idx, block in enumerate(info.get("blocks", [])):
        block_type = block.get("@type", "Unknown") if isinstance(block, dict) else "Non-dict"
        output_lines.append(f"--- Block {idx+1}: {block_type} ---")
        output_lines.append(json.dumps(block, indent=2))
    output_lines.append("")

with open("/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_2/all_schemas_dump.txt", "w", encoding="utf-8") as f:
    f.write("\n".join(output_lines))

print("Dumped all schemas to all_schemas_dump.txt")
