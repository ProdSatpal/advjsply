import json
import os
import re
from pathlib import Path
from html.parser import HTMLParser

PROJECT_ROOT = Path("/Users/satpalsingh/Projects/AdvJsply")

PAGES = [
    "index.html",
    "about.html",
    "services.html",
    "legal-notices.html",
    "contact.html",
    "notice.html",
    "blogs.html",
    "divorce-lawyer-nagpur.html",
    "domestic-violence-lawyer-nagpur.html",
    "legal-agreements-nagpur.html",
    "legal-notice-service-nagpur.html",
    "marriage-registration-lawyer-nagpur.html",
    "mutual-divorce-lawyer-nagpur.html",
    "partnership-deeds-nagpur.html",
    "property-disputes-nagpur.html",
    "property-registry-nagpur.html",
    "will-writing-nagpur.html",
    "blogs/annulment-divorce-guide-nagpur.html",
    "blogs/common-mistakes-legal-notice.html",
    "blogs/maharashtra-new-advocate-general.html",
    "blogs/sale-deed-registration-guide-nagpur.html",
    "blogs/top-10-divorce-lawyers-nagpur.html",
]

class PageInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.charset = None
        self.viewport = None
        self.title = ""
        self.desc = ""
        self.canonical = ""
        self.og = {}
        self.tw = {}
        self.jsonld_blocks = []
        self._in_head = False
        self._in_title = False
        self._in_script = False
        self._script_type = None
        self._script_buf = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        t = tag.lower()
        if t == "html":
            self.lang = d.get("lang")
        elif t == "head":
            self._in_head = True
        elif t == "title" and self._in_head:
            self._in_title = True
        elif t == "meta":
            if "charset" in d:
                self.charset = d["charset"]
            if d.get("name") == "viewport":
                self.viewport = d.get("content")
            if d.get("name") == "description":
                self.desc = d.get("content", "")
            if "property" in d and d["property"].startswith("og:"):
                self.og[d["property"]] = d.get("content", "")
            if "name" in d and d["name"].startswith("twitter:"):
                self.tw[d["name"]] = d.get("content", "")
        elif t == "link" and d.get("rel") == "canonical":
            self.canonical = d.get("href", "")
        elif t == "script":
            self._in_script = True
            self._script_type = d.get("type", "").lower()
            self._script_buf = []

    def handle_endtag(self, tag):
        t = tag.lower()
        if t == "head":
            self._in_head = False
        elif t == "title":
            self._in_title = False
        elif t == "script":
            if self._script_type == "application/ld+json":
                self.jsonld_blocks.append("".join(self._script_buf).strip())
            self._in_script = False
            self._script_type = None

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        elif self._in_script and self._script_type == "application/ld+json":
            self._script_buf.append(data)

print(f"{'Page':<45} | {'Title Len':<9} | {'Desc Len':<8} | {'Schemas':<40}")
print("-" * 110)

for p in PAGES:
    with open(PROJECT_ROOT / p, "r", encoding="utf-8") as f:
        content = f.read()
    pi = PageInspector()
    pi.feed(content)
    pi.close()
    
    schemas = []
    for b in pi.jsonld_blocks:
        try:
            parsed = json.loads(b)
            if "@graph" in parsed:
                for item in parsed["@graph"]:
                    t = item.get("@type")
                    if isinstance(t, list):
                        schemas.extend(t)
                    elif t:
                        schemas.append(t)
            elif "@type" in parsed:
                t = parsed.get("@type")
                if isinstance(t, list):
                    schemas.extend(t)
                elif t:
                    schemas.append(t)
        except Exception as e:
            schemas.append(f"ERROR: {e}")
            
    print(f"{p:<45} | {len(pi.title.strip()):<9} | {len(pi.desc.strip()):<8} | {', '.join(schemas)}")
