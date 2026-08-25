import re
import json
from pathlib import Path
from html.parser import HTMLParser

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")

for html_file in PROJECT_ROOT.rglob("*.html"):
    if ".agents" in str(html_file):
        continue
    rel = html_file.relative_to(PROJECT_ROOT)
    with open(html_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check og:image, twitter:image, schema images
    og_imgs = re.findall(r'property="og:image"\s+content="([^"]+)"', content)
    tw_imgs = re.findall(r'name="twitter:image"\s+content="([^"]+)"', content)
    
    # Check JSON-LD
    schema_blocks = re.findall(r'<script type="application/ld\+json">([\s\S]*?)</script>', content)
    schema_imgs = []
    for s in schema_blocks:
        try:
            data = json.loads(s)
            def find_imgs(obj):
                if isinstance(obj, dict):
                    for k, v in obj.items():
                        if k in ["image", "logo"] and isinstance(v, str):
                            schema_imgs.append(v)
                        elif isinstance(v, (dict, list)):
                            find_imgs(v)
                elif isinstance(obj, list):
                    for item in obj:
                        find_imgs(item)
            find_imgs(data)
        except Exception:
            pass

    for img_url in set(og_imgs + tw_imgs + schema_imgs):
        if img_url.startswith("https://advocatejsply.com/"):
            local_path = PROJECT_ROOT / img_url[len("https://advocatejsply.com/"):]
        elif img_url.startswith("/"):
            local_path = PROJECT_ROOT / img_url.lstrip("/")
        elif img_url.startswith("http"):
            continue # external
        else:
            local_path = html_file.parent / img_url
            
        if not local_path.is_file():
            print(f"ERROR: {rel} references missing image: {img_url} (resolved to {local_path})")

print("Image asset check complete.")
