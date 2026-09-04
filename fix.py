import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace React import
if 'Suspense' not in content:
    content = re.sub(r'import React from ["\']react["\'];', 'import React, { Suspense } from "react";', content)

# Regex to find imports
import_regex = re.compile(r'import\s+(\w+)\s+from\s+["\']\./(pages|components)/(.*?)["\'];')

lazy_imports = []

def replace_func(match):
    comp_name = match.group(1)
    folder = match.group(2)
    file_name = match.group(3)
    if comp_name in ['Navbar', 'Footer', 'ShopBanner', 'Collection']:
        return match.group(0)
    
    lazy_imports.append(f'const {comp_name} = React.lazy(() => import("./{folder}/{file_name}"));')
    return ''

content = import_regex.sub(replace_func, content)

# Add lazy imports
content = content.replace('// 🛡️ Route Guards', '\n'.join(lazy_imports) + '\n\n// 🛡️ Route Guards')

if '<Suspense' not in content:
    content = content.replace('<Routes>', '<Suspense fallback={<div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}>\n        <Routes>')
    content = content.replace('</Routes>', '</Routes>\n        </Suspense>')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("App.jsx updated with lazy loading.")
