const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/admin/Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const lines = content.split('\n');
const newLines = lines.filter(line => !line.includes("Change Password</span></div>") && !line.includes("Account Settings</span></div>"));

if (lines.length !== newLines.length) {
    fs.writeFileSync(path, newLines.join('\n'), 'utf8');
    console.log(`Dashboard updated. Removed ${lines.length - newLines.length} lines.`);
} else {
    console.log("No lines removed!");
}
