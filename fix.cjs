const fs = require('fs');
const file = 'c:\\\\Users\\\\Devi\\\\Downloads\\\\E-Commerce\\\\E-Commerce\\\\server\\\\client\\\\src\\\\components\\\\Navbar.css';
let content = fs.readFileSync(file, 'utf8');

// Strip out the corrupted text (which might be full of null bytes)
// We just slice it off after the last valid block
const splitToken = '@keyframes slideDown {';
const parts = content.split(splitToken);
if (parts.length > 1) {
  let cleanPart = parts[0] + splitToken + parts[1].split('}')[0] + '}\n}\n\n';
  
  const newStyles = `
.dropdown-welcome-section {
  padding: 16px 20px;
}

.welcome-title {
  font-size: 14px;
  font-weight: 700;
  color: #3e4152;
  margin: 0 0 4px 0;
}

.welcome-subtitle {
  font-size: 12px;
  color: #535766;
  margin: 0 0 16px 0;
}

.welcome-login-btn {
  display: inline-block;
  border: 1px solid #f5f5f6;
  color: #ff3f6c;
  background-color: transparent;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s;
}

.welcome-login-btn:hover {
  border-color: #ff3f6c;
}

.dropdown-divider {
  height: 1px;
  background-color: #f5f5f6;
  margin: 0 20px 8px 20px;
}
`;

  fs.writeFileSync(file, cleanPart + newStyles);
  console.log('Fixed successfully');
}
