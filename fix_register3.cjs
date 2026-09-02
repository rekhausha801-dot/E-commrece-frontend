const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/customer/Register.jsx';
let content = fs.readFileSync(path, 'utf8');

// Check if it already has </>, if not, add it before the last ");\n};"
if (!content.includes('</>')) {
    const lastIndex = content.lastIndexOf(');');
    if (lastIndex !== -1) {
        content = content.substring(0, lastIndex) + '</>\n  );\n' + content.substring(lastIndex + 3);
        fs.writeFileSync(path, content, 'utf8');
        console.log("Added </>");
    } else {
        console.log("Could not find );");
    }
} else {
    console.log("Already has </>");
}
