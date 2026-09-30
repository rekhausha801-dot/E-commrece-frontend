const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/admin/ProductManagement.css');
let content = fs.readFileSync(file, 'utf8');

// Ensure card body is scrollable on mobile
const mediaQuery = `
@media (max-width: 768px) {
  .card-body {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .spec-table {
    min-width: 400px;
  }
}
`;

if (!content.includes('min-width: 400px')) {
  content += mediaQuery;
  fs.writeFileSync(file, content);
  console.log('Appended table scroll fix to ProductManagement.css');
} else {
  console.log('Table scroll fix already exists');
}
