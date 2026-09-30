const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/admin/CustomerManagement.css');
let content = fs.readFileSync(file, 'utf8');

const mediaQuery = `
@media (max-width: 768px) {
  .cm-main-layout {
    flex-direction: column;
  }
  .cm-details-sidebar {
    width: 100% !important;
    margin-top: 16px;
  }
  .cm-ro-item {
    flex-wrap: wrap;
    gap: 8px;
  }
  .cm-actions-group {
    flex-direction: column;
    gap: 12px;
  }
  .cm-btn-action {
    width: 100%;
  }
}
`;

if (!content.includes('@media (max-width: 768px) {\\n  .cm-main-layout {')) {
  content += mediaQuery;
  fs.writeFileSync(file, content, 'utf8');
  console.log('Appended mobile responsive fixes to CustomerManagement.css');
} else {
  console.log('Mobile responsive fixes already exist in CustomerManagement.css');
}
