const fs = require('fs');

const code = fs.readFileSync('src/pages/admin/AddNewProduct.jsx', 'utf8');

// The main grid area
const mainGridStart = code.indexOf('<div className="main-grid-area">');
const sidebarStart = code.indexOf('{/* SIDEBAR AREA */}');

const beforeGrid = code.substring(0, mainGridStart);
const afterGrid = code.substring(sidebarStart);
const gridArea = code.substring(mainGridStart, sidebarStart);

// We need to extract all cards 1 to 13
// A card always starts with <div className="new-card"> or <div className="new-card span-2">
// Or a split-row starts with <div className="split-row">
// Wait, we just want to extract each card individually and then strip out split-rows.

let cards = {};

// Helper to extract a balanced div starting from a given index
function extractBalancedDiv(str, startIdx) {
    let i = startIdx;
    let divCount = 0;
    while (i < str.length) {
        if (str.substr(i, 4) === '<div') {
            divCount++;
            i += 4;
        } else if (str.substr(i, 5) === '</div') {
            divCount--;
            i += 5;
            if (divCount === 0) {
                // Find the > to close it
                while (str[i] !== '>' && i < str.length) { i++; }
                return str.substring(startIdx, i + 1);
            }
        } else {
            i++;
        }
    }
    return null;
}

let idx = 0;
while ((idx = gridArea.indexOf('<div className="new-card', idx)) !== -1) {
    let cardHtml = extractBalancedDiv(gridArea, idx);
    if (!cardHtml) {
        idx += 10;
        continue;
    }
    
    // Find card badge
    let badgeMatch = cardHtml.match(/<span className="card-badge">(\d+)<\/span>/);
    if (badgeMatch) {
        cards[parseInt(badgeMatch[1])] = cardHtml;
    }
    
    idx += cardHtml.length;
}

// Now we build the new main-grid-area
let newGridArea = `        <div className="main-grid-area">\n`;

let leftCol = `          <div className="main-col">\n`;
let rightCol = `          <div className="main-col">\n`;

// Left Column: 1, 3, 5, 7, 9, 11, 13
let leftIds = [1, 3, 5, 7, 9, 11, 13];
leftIds.forEach(id => {
    if (cards[id]) {
        leftCol += '            ' + cards[id].split('\n').join('\n            ') + '\n\n';
    }
});
leftCol += `          </div>\n`;

// Right Column: 2, 4, 6, 8, 10, 12
let rightIds = [2, 4, 6, 8, 10, 12];
rightIds.forEach(id => {
    if (cards[id]) {
        rightCol += '            ' + cards[id].split('\n').join('\n            ') + '\n\n';
    }
});
rightCol += `          </div>\n`;

newGridArea += leftCol + rightCol + `        </div>\n        `;

const finalCode = beforeGrid + newGridArea + afterGrid;
fs.writeFileSync('src/pages/admin/AddNewProduct.jsx', finalCode, 'utf8');

console.log('Successfully reordered cards to left/right columns by odd/even sequence.');
