const fs = require('fs');
const file = 'src/pages/admin/ProductManagement.css';
let css = fs.readFileSync(file, 'utf8');

// The CSS we want to insert
const newCss = `
.last-updated { font-size: 11px; color: #aaa; margin-top: 16px; }

.bg-gray { background-color: #f9f9f9; }

/* New List View Styles */
.list-view-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: white;
  border-radius: 12px;
  border: 1px solid #efe5d4;
  padding: 24px;
  min-height: calc(100vh - 100px);
}

.list-view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f8f8f8;
  padding-bottom: 16px;
}
`;

// replace from .last-updated up to .page-title
const regex = /\.chart-legend\s*\.dot\.red\s*\{\s*background:\s*#ef4444;\s*\}([\s\S]*?)(?=\.page-title\s*\{)/;

if (regex.test(css)) {
  css = css.replace(regex, '.chart-legend .dot.red { background: #ef4444; }\n' + newCss + '\n');
  fs.writeFileSync(file, css);
  console.log('Fixed CSS');
} else {
  console.log('Regex did not match');
}
