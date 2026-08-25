import os
import json
import xml.etree.ElementTree as ET

def check_sitemap_and_robots():
    root = '/Users/satpalsingh/Projects/AdvJsply'
    with open('/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/meta_inventory.json', 'r') as f:
        pages = json.load(f)
        
    sitemap_path = os.path.join(root, 'sitemap.xml')
    sitemap_urls = set()
    sitemap_entries = []
    if os.path.exists(sitemap_path):
        tree = ET.parse(sitemap_path)
        sitemap_root = tree.getroot()
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        for url in sitemap_root.findall('sm:url', ns):
            loc = url.find('sm:loc', ns).text.strip()
            lastmod = url.find('sm:lastmod', ns).text.strip() if url.find('sm:lastmod', ns) is not None else None
            changefreq = url.find('sm:changefreq', ns).text.strip() if url.find('sm:changefreq', ns) is not None else None
            priority = url.find('sm:priority', ns).text.strip() if url.find('sm:priority', ns) is not None else None
            sitemap_urls.add(loc)
            sitemap_entries.append({'loc': loc, 'lastmod': lastmod, 'changefreq': changefreq, 'priority': priority})
            
    page_canonicals = set()
    for p in pages:
        if p['canonical']:
            page_canonicals.add(p['canonical'])
        else:
            rel = p['rel_path']
            page_canonicals.add(f"https://advocatejsply.com/{rel if rel != 'index.html' else ''}")

    print(f"Total HTML files: {len(pages)}")
    print(f"Total URLs in sitemap.xml: {len(sitemap_urls)}")
    
    missing_in_sitemap = []
    for p in pages:
        rel = p['rel_path']
        c = p['canonical'] or f"https://advocatejsply.com/{rel if rel != 'index.html' else ''}"
        if c not in sitemap_urls:
            missing_in_sitemap.append({'file': rel, 'canonical': c})
            
    print(f"\nMissing in sitemap ({len(missing_in_sitemap)}):")
    for m in missing_in_sitemap:
        print(f"  - {m['file']} -> {m['canonical']}")
        
    extra_in_sitemap = []
    for s_url in sitemap_urls:
        if s_url not in page_canonicals:
            extra_in_sitemap.append(s_url)
            
    print(f"\nExtra/Unmatched in sitemap ({len(extra_in_sitemap)}):")
    for e in extra_in_sitemap:
        print(f"  - {e}")
        
    with open('/Users/satpalsingh/Projects/AdvJsply/robots.txt', 'r') as f:
        robots_content = f.read()
        
    print(f"\nRobots.txt contents:\n{robots_content}")

if __name__ == '__main__':
    check_sitemap_and_robots()
