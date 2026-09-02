const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<div className="register-divider">\s*<span>OR<\/span>\s*<\/div>/g;

content = content.replace(regex, '');

fs.writeFileSync(path, content, 'utf8');
console.log("Register.jsx updated. OR divider removed.");
