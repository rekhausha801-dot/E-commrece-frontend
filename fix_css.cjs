const fs = require('fs');
const file = 'src/pages/admin/ProductManagement.css';
let css = fs.readFileSync(file, 'utf8');

// The CSS we want to insert
const newCss = `
.page-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #222;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-badge {
  background: #fdfaf5;
  color: #C89953;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 600;
  border: 1px solid #efe5d4;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-outline {
  background: white;
  border: 1px solid #efe5d4;
  color: #C89953;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #fcf8f2;
  border-color: #e5d8c3;
}

.btn-import-dashed {
  background: white;
  border: 1px dashed #C89953;
  color: #C89953;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.btn-import-dashed:hover {
  background: #fcf8f2;
}

.btn-solid-orange {
  background: #C89953;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
}

.btn-solid-orange:hover {
  opacity: 0.9;
}

.filters-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0 16px 0;
}
`;

// replace .page-title { ... } up to .dropdown-wrapper
const regex = /\.page-title\s*\{[\s\S]*?\}([\s\S]*?)(?=\.dropdown-wrapper\s*\{)/;

if (regex.test(css)) {
  css = css.replace(regex, newCss + '\n\n');
  fs.writeFileSync(file, css);
  console.log('Fixed CSS');
} else {
  console.log('Regex did not match');
}
