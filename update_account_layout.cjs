const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/AccountLayout.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace "Help & Support" with "Help Center"
content = content.replace(
    "{ name: 'Help & Support', path: '/account/support', icon: Headphones },",
    "{ name: 'Help Center', path: '/account/support', icon: Headphones },"
);

fs.writeFileSync(path, content, 'utf8');
console.log("AccountLayout updated");
