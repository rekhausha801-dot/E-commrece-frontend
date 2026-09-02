const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Payment.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /console\.error\('Failed to place order:', error\);[\s\S]*?message\.error\(`Failed to place order:[^`]+`\);/g;
const newError = `console.error('Failed to place order:', error);
      alert('Backend Error:\\n' + (error.response?.data?.stack || error.response?.data?.message || error.message));
      message.error(\`Failed to place order\`);`;

content = content.replace(regex, newError);
fs.writeFileSync(path, content, 'utf8');
console.log("Updated Payment.jsx error reporting");
