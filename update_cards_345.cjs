const fs = require('fs');

const card3 = `          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">3</span>
              <h3>Pricing & Inventory</h3>
            </div>
            <div className="card-body">
              <div className="form-row-4">
                <div className="form-group">
                  <label>Price (₹) <span className="req">*</span></label>
                  <input type="text" placeholder="Enter price" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Discount Type</label>
                  <select><option>Percentage</option></select>
                </div>
                <div className="form-group">
                  <label>Discount (%)</label>
                  <input type="text" placeholder="Enter discount" />
                </div>
                <div className="form-group">
                  <label>Sale Price (₹)</label>
                  <input type="text" placeholder="Auto calculated" disabled className="bg-gray" />
                </div>
              </div>
              <div className="form-row-4 mt-3">
                <div className="form-group">
                  <label>Cost Price (₹)</label>
                  <input type="text" placeholder="Enter cost price" />
                </div>
                <div className="form-group">
                  <label>Stock Quantity <span className="req">*</span></label>
                  <input type="text" placeholder="Enter stock" />
                </div>
                <div className="form-group">
                  <label>Low Stock Alert</label>
                  <input type="text" placeholder="Enter alert quantity" />
                </div>
                <div className="form-group">
                  <label>Product Status <span className="req">*</span></label>
                  <select><option>In Stock</option></select>
                </div>
              </div>
            </div>
          </div>`;

const card4 = `          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">4</span>
              <h3>Product Variants</h3>
            </div>
            <div className="card-body">
              <div className="variant-row">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#222' }}>Size</label>
                  <button className="btn-outline-orange" style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #ffccaa', color: '#d37920', background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#d37920"/> Add Size</button>
                </div>
                <div className="variant-options">
                  <div className="variant-pill">XS</div>
                  <div className="variant-pill">S</div>
                  <div className="variant-pill">M</div>
                  <div className="variant-pill">L</div>
                  <div className="variant-pill">XL</div>
                  <div className="variant-pill">XXL</div>
                  <div className="variant-pill">3XL</div>
                  <div className="variant-pill">4XL</div>
                  <div className="variant-pill">5XL</div>
                </div>
              </div>
              <div className="variant-row mt-4" style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <label style={{ margin: 0, fontWeight: 600, fontSize: '14px', color: '#222' }}>Color</label>
                  <button className="btn-outline-orange" style={{ padding: '6px 16px', borderRadius: '6px', border: '1px solid #ffccaa', color: '#d37920', background: '#fff', cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}><Plus size={14} color="#d37920"/> Add Color</button>
                </div>
                <div className="variant-options">
                  <div className="color-pill"><span style={{background:'#000'}}></span>Black</div>
                  <div className="color-pill"><span style={{background:'#fff', border:'1px solid #e0e0e0'}}></span>White</div>
                  <div className="color-pill"><span style={{background:'#0000ff'}}></span>Blue</div>
                  <div className="color-pill"><span style={{background:'#ff0000'}}></span>Red</div>
                  <div className="color-pill"><span style={{background:'#008000'}}></span>Green</div>
                  <div className="color-pill"><span style={{background:'#ffff00'}}></span>Yellow</div>
                </div>
              </div>
            </div>
          </div>`;

const card5 = `          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">5</span>
              <h3>Specifications</h3>
            </div>
            <div className="card-body p-0">
              <table className="spec-table">
                <thead><tr><th>Specification</th><th>Value</th></tr></thead>
                <tbody>
                  <tr><td>Fabric</td><td><input type="text" placeholder="Enter value" /></td></tr>
                  <tr><td>Fit</td><td><input type="text" placeholder="Enter value" /></td></tr>
                  <tr><td>Sleeve</td><td><input type="text" placeholder="Enter value" /></td></tr>
                  <tr><td>Occasion</td><td><input type="text" placeholder="Enter value" /></td></tr>
                </tbody>
              </table>
              <div className="p-3"><button className="btn-text-add">+ Add Row</button></div>
            </div>
          </div>`;

let code = fs.readFileSync('src/pages/admin/AddNewProduct.jsx', 'utf8');

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

function replaceCard(num, newHtml) {
    let searchStr = '<span className="card-badge">' + num + '</span>';
    let spanIdx = code.indexOf(searchStr);
    if (spanIdx !== -1) {
        // Find the beginning of the card
        let cardStart = code.lastIndexOf('<div className="new-card"', spanIdx);
        let cardHtml = extractBalancedDiv(code, cardStart);
        if (cardHtml) {
            code = code.substring(0, cardStart) + newHtml + code.substring(cardStart + cardHtml.length);
        }
    }
}

replaceCard(3, card3);
replaceCard(4, card4);
replaceCard(5, card5);

fs.writeFileSync('src/pages/admin/AddNewProduct.jsx', code, 'utf8');
console.log('Updated Cards 3, 4, 5!');
