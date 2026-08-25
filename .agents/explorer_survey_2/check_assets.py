import os
import glob
import re
import json

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
assets_images = os.listdir(os.path.join(workspace_dir, "assets", "images")) if os.path.exists(os.path.join(workspace_dir, "assets", "images")) else []
print(f"Images in assets/images/: {assets_images}")

# Check all images referenced in JSON-LD
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))
referenced_images = set()

for f in html_files:
    with open(f, "r", encoding="utf-8", errors="ignore") as fp:
        html = fp.read()
    scripts = re.findall(r"<script[^>]*type=[\"']application/ld\+json[\"'][^>]*>(.*?)</script>", html, re.DOTALL | re.IGNORECASE)
    for s in scripts:
        try:
            d = json.loads(s.strip())
            # extract any string ending in .png, .jpg, .jpeg, .webp, .svg
            raw_s = json.dumps(d)
            imgs = re.findall(r"https?://advocatejsply\.com/([^\"']+\.(?:png|jpg|jpeg|webp|svg))", raw_s)
            referenced_images.update(imgs)
        except:
            pass

print("\nReferenced Images in JSON-LD:")
for img in sorted(referenced_images):
    local_path = os.path.join(workspace_dir, img)
    exists = os.path.exists(local_path)
    print(f"  {img} -> Exists on disk? {exists}")
