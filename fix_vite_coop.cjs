const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/vite.config.js';
let content = fs.readFileSync(path, 'utf8');

const newServerConfig = `  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      "Cross-Origin-Embedder-Policy": "unsafe-none"
    },`;

content = content.replace("  server: {", newServerConfig);

fs.writeFileSync(path, content, 'utf8');
console.log("vite.config.js updated with COOP headers");
