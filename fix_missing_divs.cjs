const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/AddNewProduct.jsx', 'utf8');

// The missing closing tags for cards 1 to 8:
// Card 1 ends right before Card 3:
code = code.replace(/(\n\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">3<\/span>)/, '\n          </div>$1');

// Card 3 ends right before split-row:
code = code.replace(/(\n\s*<div className="split-row">)/, '\n          </div>$1'); // Note: this replaces the FIRST split-row.

// Card 5 ends right before Card 6:
code = code.replace(/(\n\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">6<\/span>)/, '\n          </div>$1');

// Card 6 ends right before Card 9:
code = code.replace(/(\n\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">9<\/span>)/, '\n          </div>$1');

// Card 2 ends right before Card 4:
code = code.replace(/(\n\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">4<\/span>)/, '\n          </div>$1');

// Card 4 ends right before the SECOND split-row (which is before Card 7):
code = code.replace(/(\n\s*<div className="split-row">\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">7<\/span>)/, '\n          </div>$1');

// Card 7 ends right before Card 8:
code = code.replace(/(\n\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">8<\/span>)/, '\n          </div>$1');

// Card 8 ends right before Card 10:
code = code.replace(/(\n\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">10<\/span>)/, '\n          </div>$1');

fs.writeFileSync('src/pages/admin/AddNewProduct.jsx', code, 'utf8');
console.log('Fixed missing div tags!');
