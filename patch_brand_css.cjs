const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/admin/BrandManagement.css');
let content = fs.readFileSync(file, 'utf8');

const mediaQuery2 = `
@media (max-width: 768px) {
  .bm-header-title-row {
    flex-direction: column;
    gap: 16px;
  }
  
  .ab-footer-actions {
    flex-direction: column;
    gap: 16px;
  }
  
  .ab-footer-actions button {
    width: 100%;
    justify-content: center;
  }
  
  .ab-btn-back {
    width: 100%;
    justify-content: center;
  }
}
`;

if (!content.includes('.ab-footer-actions {\\n    flex-direction: column;')) {
  content += mediaQuery2;
  fs.writeFileSync(file, content, 'utf8');
  console.log('Appended additional mobile responsive fixes to BrandManagement.css');
}
