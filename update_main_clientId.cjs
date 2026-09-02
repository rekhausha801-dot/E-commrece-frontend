const fs = require('fs');
const mainPath = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/main.jsx';
let content = fs.readFileSync(mainPath, 'utf8');

const regex = /import\.meta\.env\.VITE_GOOGLE_CLIENT_ID \|\| "YOUR_GOOGLE_CLIENT_ID"/g;
const replacement = 'import.meta.env.VITE_GOOGLE_CLIENT_ID || "830862223596-dpe9lhl67h3tndc0n47888qec4j7cpcl.apps.googleusercontent.com"';

if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(mainPath, content, 'utf8');
    console.log("main.jsx updated with fallback Client ID");
} else {
    console.log("Regex not found!");
}
