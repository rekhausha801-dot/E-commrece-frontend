const fs = require('fs');

const code = fs.readFileSync('src/pages/admin/AddNewProduct.jsx', 'utf8');

// The main grid area
const mainGridStart = code.indexOf('<div className="main-grid-area">');
const sidebarStart = code.indexOf('{/* SIDEBAR AREA */}');

const beforeGrid = code.substring(0, mainGridStart);
const afterGrid = code.substring(sidebarStart);
const gridArea = code.substring(mainGridStart, sidebarStart);

// Extract all cards
let cards = {};

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
        let cardNum = parseInt(badgeMatch[1]);
        cards[cardNum] = cardHtml;
    }
    
    idx += cardHtml.length;
}

// Now we build the new main-grid-area WITHOUT split-rows
let newGridArea = `        <div className="main-grid-area">\n`;

const addCard = (num) => {
    if (cards[num]) {
        let html = cards[num];
        // Add span-2 to 9 and 10 if not present
        if ((num === 9 || num === 10) && !html.includes('span-2')) {
            html = html.replace('<div className="new-card"', '<div className="new-card span-2"');
        }
        // Add gridRow: span 2 to card 11
        if (num === 11 && !html.includes('gridRow')) {
            html = html.replace('<div className="new-card"', '<div className="new-card" style={{ gridRow: "span 2" }}');
        }
        
        newGridArea += '          ' + html.split('\n').join('\n          ') + '\n\n';
    }
};

// Row 1
addCard(1);
addCard(2);

// Row 2
addCard(3);
addCard(4);

// Row 3
addCard(5);
addCard(6);

// Row 4
addCard(7);
addCard(8);

// Row 5
addCard(9);

// Row 6
addCard(10);

// Row 7 & 8 (Card 11 spans 2 rows on left)
addCard(11);
addCard(12);
addCard(13);

newGridArea += `        </div>\n        `;

const finalCode = beforeGrid + newGridArea + afterGrid;
fs.writeFileSync('src/pages/admin/AddNewProduct.jsx', finalCode, 'utf8');

console.log('Successfully removed split-rows and laid out cards linearly!');
