import os
import glob
import re

workspace_dir = "/Users/satpalsingh/Projects/AdvJsply"
html_files = sorted(glob.glob(os.path.join(workspace_dir, "**/*.html"), recursive=True))

for f in html_files:
    rel = os.path.relpath(f, workspace_dir)
    with open(f, "r", encoding="utf-8", errors="ignore") as fp:
        html = fp.read()
    
    can_m = re.search(r"<link[^>]*rel=[\"']canonical[\"'][^>]*href=[\"'](.*?)[\"']", html, re.IGNORECASE)
    if not can_m:
        can_m = re.search(r"<link[^>]*href=[\"'](.*?)[\"'][^>]*rel=[\"']canonical[\"']", html, re.IGNORECASE)
    can = can_m.group(1) if can_m else "NO_CANONICAL"
    
    # expected canonical
    if rel == "index.html":
        expected = "https://advocatejsply.com/"
    else:
        expected = f"https://advocatejsply.com/{rel}"
        
    status = "OK" if can == expected else f"MISMATCH (found '{can}', expected '{expected}')"
    print(f"{rel:45} -> {status}")
