import os
import glob
import json
import xml.etree.ElementTree as ET

def deep_audit():
    root = '/Users/satpalsingh/Projects/AdvJsply'
    with open('/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/meta_inventory.json', 'r') as f:
        pages = json.load(f)
        
    # Read sitemap.xml
    sitemap_path = os.path.join(root, 'sitemap.xml')
    sitemap_urls = []
    if os.path.exists(sitemap_path):
        tree = ET.parse(sitemap_path)
        sitemap_root = tree.getroot()
        # handle namespace
        ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        for url in sitemap_root.findall('sm:url', ns):
            loc = url.find('sm:loc', ns)
            lastmod = url.find('sm:lastmod', ns)
            changefreq = url.find('sm:changefreq', ns)
            priority = url.find('sm:priority', ns)
            sitemap_urls.append({
                'loc': loc.text if loc is not None else '',
                'lastmod': lastmod.text if lastmod is not None else '',
                'changefreq': changefreq.text if changefreq is not None else '',
                'priority': priority.text if priority is not None else ''
            })
            
    # Read robots.txt
    robots_path = os.path.join(root, 'robots.txt')
    robots_txt = ""
    if os.path.exists(robots_path):
        with open(robots_path, 'r') as f:
            robots_txt = f.read()
            
    audit_report = {
        'total_pages': len(pages),
        'sitemap_url_count': len(sitemap_urls),
        'sitemap_urls': sitemap_urls,
        'robots_txt': robots_txt,
        'page_audits': []
    }
    
    # Categorize pages
    categories = {
        'core': ['index.html', 'about.html', 'services.html', 'legal-notices.html', 'contact.html'],
        'practice_areas': [
            'divorce-lawyer-nagpur.html', 'mutual-divorce-lawyer-nagpur.html',
            'domestic-violence-lawyer-nagpur.html', 'marriage-registration-lawyer-nagpur.html',
            'legal-notice-service-nagpur.html', 'legal-agreements-nagpur.html',
            'partnership-deeds-nagpur.html', 'property-disputes-nagpur.html',
            'property-registry-nagpur.html', 'will-writing-nagpur.html'
        ],
        'generator': ['notice.html'],
        'blog_index': ['blogs.html'],
        'blog_articles': [
            'blogs/annulment-divorce-guide-nagpur.html',
            'blogs/common-mistakes-legal-notice.html',
            'blogs/maharashtra-new-advocate-general.html',
            'blogs/sale-deed-registration-guide-nagpur.html',
            'blogs/top-10-divorce-lawyers-nagpur.html'
        ]
    }
    
    for p in pages:
        rel = p['rel_path']
        cat = 'other'
        for c_name, c_files in categories.items():
            if rel in c_files:
                cat = c_name
                break
                
        # Issues detection
        issues = []
        warnings = []
        
        # 1. Title
        title = p['title']
        t_len = p['title_len']
        if not title:
            issues.append('Missing <title> tag')
        elif t_len > 60:
            warnings.append(f'Title tag length ({t_len} chars) exceeds recommended ~60 chars')
        elif t_len < 30:
            warnings.append(f'Title tag length ({t_len} chars) is short')
            
        # 2. Description
        desc = p['description']
        d_len = p['description_len']
        if not desc:
            issues.append('Missing <meta name="description">')
        elif d_len > 160:
            warnings.append(f'Meta description length ({d_len} chars) exceeds recommended ~160 chars')
        elif d_len < 70:
            warnings.append(f'Meta description length ({d_len} chars) is short')
            
        # 3. Canonical
        canon = p['canonical']
        if not canon:
            issues.append('Missing canonical link tag')
        else:
            expected_canon = f"https://advocatejsply.com/{rel if rel != 'index.html' else ''}"
            if canon != expected_canon and not (rel == 'index.html' and canon in ['https://advocatejsply.com/', 'https://advocatejsply.com']):
                warnings.append(f'Canonical mismatch: found "{canon}", expected "{expected_canon}"')
                
        # 4. Lang
        lang = p['html_lang']
        if not lang:
            issues.append('Missing lang attribute on <html>')
        elif lang == 'en':
            warnings.append('Generic lang="en" instead of localized "en-IN" for Indian legal practice')
            
        # 5. Open Graph
        og = p['og_tags']
        required_og = ['og:title', 'og:description', 'og:url', 'og:type', 'og:image']
        recommended_og = ['og:site_name', 'og:locale']
        for rog in required_og:
            if rog not in og:
                issues.append(f'Missing required Open Graph tag: {rog}')
        for rog in recommended_og:
            if rog not in og:
                warnings.append(f'Missing recommended Open Graph tag: {rog}')
                
        # OG image check
        if 'og:image' in og:
            img_val = og['og:image']
            if img_val.startswith('/') or img_val.startswith('assets/'):
                warnings.append(f'og:image is relative path ("{img_val}"), should be absolute URL')
                
        # 6. Twitter
        tw = p['twitter_tags']
        required_tw = ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']
        for rtw in required_tw:
            if rtw not in tw:
                issues.append(f'Missing required Twitter tag: {rtw}')
                
        # 7. Charset & Viewport
        if not p['charset']:
            issues.append('Missing <meta charset>')
        if not p['viewport']:
            issues.append('Missing <meta name="viewport">')
            
        # 8. Schema validation
        schemas = p['json_ld_types']
        if not schemas:
            issues.append('No JSON-LD structured data found')
            
        audit_report['page_audits'].append({
            'file': rel,
            'category': cat,
            'title': title,
            'title_len': t_len,
            'description': desc,
            'description_len': d_len,
            'canonical': canon,
            'html_lang': lang,
            'charset': p['charset'],
            'viewport': p['viewport'],
            'og_tags': og,
            'twitter_tags': tw,
            'json_ld_types': schemas,
            'issues': issues,
            'warnings': warnings
        })
        
    with open('/Users/satpalsingh/Projects/AdvJsply/.agents/explorer_survey_1/deep_audit.json', 'w') as f:
        json.dump(audit_report, f, indent=2)
        
    print("Deep audit complete. Issues summarized below:")
    for pa in audit_report['page_audits']:
        print(f"\n[{pa['category']}] {pa['file']}:")
        if pa['issues']:
            print("  ISSUES:")
            for iss in pa['issues']:
                print(f"    - ❌ {iss}")
        if pa['warnings']:
            print("  WARNINGS:")
            for w in pa['warnings']:
                print(f"    - ⚠️ {w}")

if __name__ == '__main__':
    deep_audit()
