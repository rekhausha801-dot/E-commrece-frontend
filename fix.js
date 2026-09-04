const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace standard react import with Suspense
if (!content.includes('Suspense')) {
    content = content.replace(/import React from ["']react["'];/, 'import React, { Suspense } from "react";');
}

// Find all imports from pages and components, but NOT Navbar, Footer, ShopBanner
const importRegex = /import (\w+) from ["']\.\/(pages|components)\/(.+?)["'];/g;
const lazyImports = [];

content = content.replace(importRegex, (match, componentName, folder, file) => {
  if (['Navbar', 'Footer', 'ShopBanner', 'Collection'].includes(componentName)) {
    return match; // Keep these static
  }
  lazyImports.push('const ' + componentName + ' = React.lazy(() => import("./' + folder + '/' + file + '"));');
  return ''; // Remove the static import
});

// Add lazy imports
content = content.replace(/\/\/ \uD83D\uDEE1\uFE0F Route Guards/g, lazyImports.join('\n') + '\n\n// \uD83D\uDEE1\uFE0F Route Guards');

// Wrap Routes in Suspense
if (!content.includes('<Suspense fallback')) {
    content = content.replace(/<Routes>/g, '<Suspense fallback={<div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}>\n        <Routes>');
    content = content.replace(/<\/Routes>/g, '</Routes>\n        </Suspense>');
}

fs.writeFileSync(filePath, content);
console.log('App.jsx optimized with React.lazy');
