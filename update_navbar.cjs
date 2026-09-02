const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/components/Navbar.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace the link logic for Help Center
const oldLink = `item === "My Profile" ? "/account/profile" : \`/account/\${item.toLowerCase().replace(/\\s+/g, '-')}\``;
const newLink = `item === "My Profile" ? "/account/profile" : item === "Help Center" ? "/account/support" : \`/account/\${item.toLowerCase().replace(/\\s+/g, '-')}\``;

content = content.replace(oldLink, newLink);

fs.writeFileSync(path, content, 'utf8');
console.log("Navbar updated");
