const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace standard react import with Suspense
content = content.replace(/import React from ["']react["'];/, 'import React, { Suspense } from "react";');

// Find all imports from pages and components, but NOT Navbar, Footer, ShopBanner
const importRegex = /import (\w+) from ["']\.\/(pages|components)\/(.+?)["'];/g;
let match;
const lazyImports = [];

content = content.replace(importRegex, (match, componentName, folder, file) => {
  if (['Navbar', 'Footer', 'ShopBanner', 'Collection'].includes(componentName)) {
    return match; // Keep these static
  }
  lazyImports.push(const  = React.lazy(() => import('.//')););
  return ''; // Remove the static import
});

// Add lazy imports after Context imports
content = content.replace(/import AdminLogin from "\.\/pages\/admin\/AdminLogin";/, (match) => {
  return lazyImports.join('\n');
});
// Wait, AdminLogin was just removed by the regex! Let's insert lazyImports before the route guards instead.
content = content.replace(/\/\/ "?"?"? Route Guards/, lazyImports.join('\n') + '\n\n// "?"?"? Route Guards');

// Wrap Routes in Suspense
content = content.replace(/<Routes>/g, '<Suspense fallback={<div style={{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>Loading...</div>}>\n        <Routes>');
content = content.replace(/<\/Routes>/g, '</Routes>\n        </Suspense>');

fs.writeFileSync(filePath, content);
console.log('App.jsx optimized with React.lazy');
