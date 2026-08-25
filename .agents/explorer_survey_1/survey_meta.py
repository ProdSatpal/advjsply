import os
import glob
import json
import re
from html.parser import HTMLParser

class HeadMetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_head = False
        self.in_title = False
        self.in_json_ld = False
        self.html_lang = None
        self.title = ""
        self.meta_tags = []
        self.link_tags = []
        self.json_ld_raw = []
        self.current_json_ld = ""
        
    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        tag_lower = tag.lower()
        
        if tag_lower == 'html':
            self.html_lang = attr_dict.get('lang')
            
        elif tag_lower == 'head':
            self.in_head = True
            
        elif self.in_head:
            if tag_lower == 'title':
                self.in_title = True
                self.title = ""
            elif tag_lower == 'meta':
                self.meta_tags.append(attr_dict)
            elif tag_lower == 'link':
                self.link_tags.append(attr_dict)
            elif tag_lower == 'script' and attr_dict.get('type') == 'application/ld+json':
                self.in_json_ld = True
                self.current_json_ld = ""
                
    def handle_endtag(self, tag):
        tag_lower = tag.lower()
        if tag_lower == 'head':
            self.in_head = False
        elif tag_lower == 'title':
            self.in_title = False
        elif tag_lower == 'script' and self.in_json_ld:
            self.in_json_ld = False
            self.json_ld_raw.append(self.current_json_ld.strip())
            self.current_json_ld = ""
            
    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_json_ld:
            self.current_json_ld += data

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
    parser = HeadMetadataParser()
    parser.feed(content)
    
    # Extract metadata items
    charset = None
    viewport = None
    description = None
    keywords = None
    robots = None
    author = None
    
    og_tags = {}
    twitter_tags = {}
    other_meta = []
    
    for m in parser.meta_tags:
        if 'charset' in m:
            charset = m['charset']
        elif m.get('http-equiv', '').lower() == 'content-type':
            charset = m.get('content')
            
        name = m.get('name', '').lower()
        prop = m.get('property', '').lower()
        cnt = m.get('content', '')
        
        if name == 'viewport':
            viewport = cnt
        elif name == 'description':
            description = cnt
        elif name == 'keywords':
            keywords = cnt
        elif name == 'robots':
            robots = cnt
        elif name == 'author':
            author = cnt
        elif prop.startswith('og:') or name.startswith('og:'):
            k = prop if prop.startswith('og:') else name
            og_tags[k] = cnt
        elif name.startswith('twitter:') or prop.startswith('twitter:'):
            k = name if name.startswith('twitter:') else prop
            twitter_tags[k] = cnt
        else:
            other_meta.append(m)
            
    canonical = None
    hreflangs = []
    other_links = []
    
    for l in parser.link_tags:
        rel = l.get('rel', '').lower()
        href = l.get('href', '')
        if rel == 'canonical':
            canonical = href
        elif rel == 'alternate' and 'hreflang' in l:
            hreflangs.append({'hreflang': l['hreflang'], 'href': href})
        else:
            other_links.append(l)
            
    json_lds = []
    json_ld_errors = []
    for idx, raw in enumerate(parser.json_ld_raw):
        try:
            parsed = json.loads(raw)
            types = []
            if isinstance(parsed, dict):
                types.append(parsed.get('@type', 'Unknown'))
                if '@graph' in parsed:
                    for item in parsed['@graph']:
                        types.append(item.get('@type', 'Unknown'))
            elif isinstance(parsed, list):
                for item in parsed:
                    if isinstance(item, dict):
                        types.append(item.get('@type', 'Unknown'))
            json_lds.append({'index': idx, 'type': types, 'data': parsed})
        except Exception as e:
            json_ld_errors.append({'index': idx, 'raw': raw[:100], 'error': str(e)})

    return {
        'file': filepath,
        'html_lang': parser.html_lang,
        'title': parser.title.strip(),
        'title_len': len(parser.title.strip()),
        'charset': charset,
        'viewport': viewport,
        'description': description,
        'description_len': len(description) if description else 0,
        'keywords': keywords,
        'robots': robots,
        'author': author,
        'canonical': canonical,
        'hreflangs': hreflangs,
        'og_tags': og_tags,
        'twitter_tags': twitter_tags,
        'json_ld_count': len(parser.json_ld_raw),
        'json_ld_types': [j['type'] for j in json_lds],
        'json_ld_errors': json_ld_errors,
        'json_ld_parsed': [j['data'] for j in json_lds]
    }

def main():
    root = '/Users/satpalsingh/Projects/AdvJsply'
    html_files = sorted(glob.glob(os.path.join(root, '**/*.html'), recursive=True))
    html_files = [f for f in html_files if '.agents' not in f]
    
    results = []
    for f in html_files:
        rel = os.path.relpath(f, root)
        data = analyze_file(f)
        data['rel_path'] = rel
        results.append(data)
        
    with open('/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/meta_inventory.json', 'w', encoding='utf-8') as out:
        json.dump(results, out, indent=2)
        
    print(f"Successfully analyzed {len(results)} HTML files and saved to meta_inventory.json.")
    
    # Print high level summary
    for r in results:
        print(f"=== {r['rel_path']} ===")
        print(f"  Lang: {r['html_lang']}")
        print(f"  Title ({r['title_len']} chars): {r['title']}")
        print(f"  Description ({r['description_len']} chars): {r['description']}")
        print(f"  Canonical: {r['canonical']}")
        print(f"  OG tags count: {len(r['og_tags'])}, Twitter tags count: {len(r['twitter_tags'])}")
        print(f"  JSON-LD blocks: {r['json_ld_count']} -> {r['json_ld_types']}")
        if r['json_ld_errors']:
            print(f"  JSON-LD ERRORS: {r['json_ld_errors']}")

if __name__ == '__main__':
    main()
