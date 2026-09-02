const fs = require('fs');
const path = 'C:/Users/Devi/Downloads/E-Commerce/E-Commerce/client/src/pages/admin/Dashboard.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex1 = /      \{ key: 'password', label: <div style=\{\{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' \}\}><Lock size=\{16\} color="#4b5563" \/> <span style=\{\{ fontWeight: 500, color: '#374151' \}\}>Change Password<\/span><\/div>, onClick: \(\) => \{ setActiveTab\('Settings'\); setSettingsTab\('Security'\); \} \},\n/g;
const regex2 = /      \{ key: 'settings', label: <div style=\{\{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' \}\}><Settings size=\{16\} color="#4b5563" \/> <span style=\{\{ fontWeight: 500, color: '#374151' \}\}>Account Settings<\/span><\/div>, onClick: \(\) => \{ setActiveTab\('Settings'\); setSettingsTab\('General'\); \} \},\n/g;

content = content.replace(regex1, '');
content = content.replace(regex2, '');

fs.writeFileSync(path, content, 'utf8');
console.log("Dashboard updated");
