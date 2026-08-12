const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/AddNewProduct.jsx', 'utf8');

const startIdx = code.indexOf('<div className="main-grid-area">');
const endIdx = code.indexOf('        {/* SIDEBAR AREA */}');

const mainGrid = code.substring(startIdx, endIdx);

// Extract all cards
const cards = [];
const regex = /(<div className="new-card.*?>[\s\S]*?)(?=\n\s*<div className="new-card|\n\s*<\/div>\n\n)/g;
let match;
while ((match = regex.exec(mainGrid)) !== null) {
    cards.push(match[1]);
}

if (cards.length === 8) {
    const newGrid = `<div className="main-grid-area">
          {/* Left Column */}
          <div className="main-col">
            ${cards[0].replace(' span-2', '')}
            ${cards[2].replace(' span-2', '')}
            <div className="split-row">
              ${cards[4].replace(' span-1', '')}
              ${cards[5].replace(' span-1', '')}
            </div>
          </div>

          {/* Right Column */}
          <div className="main-col">
            ${cards[1].replace(' span-2', '')}
            ${cards[3].replace(' span-2', '')}
            <div className="split-row">
              ${cards[6].replace(' span-1', '')}
              ${cards[7].replace(' span-1', '')}
            </div>
          </div>
        </div>
`;
    
    let newCode = code.substring(0, startIdx) + newGrid + code.substring(endIdx);
    
    // Also remove header-breadcrumbs
    newCode = newCode.replace(/\s*<div className="header-breadcrumbs">[\s\S]*?<\/div>/, '');
    
    fs.writeFileSync('src/pages/admin/AddNewProduct.jsx', newCode, 'utf8');
    console.log('Successfully restructured!');
} else {
    console.log('Found', cards.length, 'cards. Expected 8.');
}
