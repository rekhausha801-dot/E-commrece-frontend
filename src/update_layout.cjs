const fs = require('fs');

const cssPath = 'pages/admin/ProductManagement.css';
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('.card-span-3')) {
  css = css.replace('.card-span-2 {', '.card-span-3 { grid-column: span 3; }\n.card-span-2 {');
  fs.writeFileSync(cssPath, css);
  console.log('Added card-span-3 to CSS');
}

const jsxPath = 'pages/admin/ProductManagement.jsx';
let jsx = fs.readFileSync(jsxPath, 'utf8');
const searchStr = '/* Card 11: Product Information */\n            <div className="dash-card card-span-2">';
const replaceStr = '/* Card 11: Product Information */\n            <div className="dash-card card-span-3">';
if (jsx.includes(searchStr)) {
  jsx = jsx.replace(searchStr, replaceStr);
  fs.writeFileSync(jsxPath, jsx);
  console.log('Updated Card 11 to card-span-3');
} else {
  console.log('Could not find Card 11 string to replace. Attempting fallback...');
  jsx = jsx.replace('/* Card 11: Product Information */\n            <div className="dash-card card-span-2">', '/* Card 11: Product Information */\n            <div className="dash-card card-span-3">');
  // Or fallback with regex
  jsx = jsx.replace(/\/\* Card 11: Product Information \*\/\s*<div className="dash-card card-span-2">/, '/* Card 11: Product Information */\n            <div className="dash-card card-span-3">');
  fs.writeFileSync(jsxPath, jsx);
}
