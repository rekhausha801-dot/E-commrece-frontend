const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/admin/ProductManagement.css');
let content = fs.readFileSync(file, 'utf8');
content += `\n@media (max-width: 768px) {\n  .main-grid-area { grid-template-columns: 1fr; }\n  .form-row, .form-row-2, .form-row-3, .form-row-4 { grid-template-columns: 1fr; }\n}\n`;
fs.writeFileSync(file, content);
console.log('Appended to ProductManagement.css');
