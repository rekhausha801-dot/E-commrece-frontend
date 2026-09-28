const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/admin/CouponManagement.jsx');
let content = fs.readFileSync(file, 'utf8');

// Remove minWidth: '400px', from the specific div
content = content.replace(/minWidth: '400px',\s*/g, '');

fs.writeFileSync(file, content);
console.log('Removed minWidth from CouponManagement.jsx');
