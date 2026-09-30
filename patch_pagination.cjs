const fs = require('fs');
const path = require('path');

// 1. Patch AddNewProduct.jsx
const jsxPath = path.join(__dirname, 'src/pages/admin/AddNewProduct.jsx');
let jsxCode = fs.readFileSync(jsxPath, 'utf8');
jsxCode = jsxCode.replace(
  /{[\s]*\/\* Pagination Buttons \*\/[\s]*}\s*<div style={{ gridColumn: '1 \/ -1', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 24px 0', marginTop: '0' }}>/g,
  `{/* Pagination Buttons */}
          <div className="pagination-buttons-container" style={{ gridColumn: '1 / -1', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0 24px 0', marginTop: '0' }}>`
);
fs.writeFileSync(jsxPath, jsxCode, 'utf8');

// 2. Patch ProductManagement.css
const cssPath = path.join(__dirname, 'src/pages/admin/ProductManagement.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');
const mediaQuery = `
@media (max-width: 768px) {
  .pagination-buttons-container {
    flex-direction: column !important;
    gap: 16px;
  }
  .pagination-buttons-container > div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .pagination-buttons-container button {
    width: 100%;
    justify-content: center;
  }
  .pagination-dots {
    position: static !important;
    transform: none !important;
    margin: 8px 0;
  }
}
`;
if (!cssCode.includes('.pagination-buttons-container')) {
  cssCode += mediaQuery;
  fs.writeFileSync(cssPath, cssCode, 'utf8');
}
console.log('Successfully patched pagination responsiveness');
