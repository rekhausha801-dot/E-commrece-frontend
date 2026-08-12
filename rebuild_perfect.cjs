const fs = require('fs');
const text = fs.readFileSync('restored.jsx', 'utf8');
const footerIndex = text.indexOf('<div className="dash-footer-actions"');
const goodCode = text.substring(0, footerIndex);

const fixScript = fs.readFileSync('fix_syntax.cjs', 'utf8');
const footerStart = fixScript.indexOf('const newFooter = `') + 'const newFooter = `'.length;
const footerEnd = fixScript.lastIndexOf('`;');
const footerStr = fixScript.substring(footerStart, footerEnd);

fs.writeFileSync('src/pages/admin/ProductManagement.jsx', goodCode + footerStr);
console.log('Rebuilt successfully!');
