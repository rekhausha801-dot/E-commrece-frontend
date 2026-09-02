const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div style=\{\{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' \}\}>\s*<GoogleLogin[\s\S]*?\/>\s*<\/div>/g;

content = content.replace(regex, '');

fs.writeFileSync(path, content, 'utf8');
console.log("Register.jsx updated. GoogleLogin removed.");
