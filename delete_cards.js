const fs = require('fs');

const filePath = 'src/pages/admin/AddNewProduct.jsx';
const content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

// 729 to 977 means index 728 to 977 (slice end is exclusive)
const newLines = [...lines.slice(0, 728), ...lines.slice(978)];

fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
console.log('Deleted cards 9 to 12');
