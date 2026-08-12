const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/AddNewProduct.jsx', 'utf8');

const card9 = `          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">9</span>
              <h3>What Customers Are Asking (Missing Details)</h3>
            </div>
            <div className="card-body row-flex">
              <div className="missing-details-icon">
                <div className="question-circle">?</div>
                <p>These are the important details customers want to know about this product.</p>
              </div>
              <div className="missing-details-list">
                <ul>
                  <li><span>Does this product have a size chart?</span> <button className="btn-text-add">+ Add Answer</button></li>
                  <li><span>Is Cash on Delivery available?</span> <button className="btn-text-add">+ Add Answer</button></li>
                  <li><span>Can I exchange the product if size doesn't fit?</span> <button className="btn-text-add">+ Add Answer</button></li>
                  <li><span>Is this product available in other colors?</span> <button className="btn-text-add">+ Add Answer</button></li>
                  <li><span>Is this product suitable for summer?</span> <button className="btn-text-add">+ Add Answer</button></li>
                </ul>
                <button className="btn-text-add mt-3" style={{fontSize: '12px', fontWeight: 'bold'}}>View All Missing Details &rarr;</button>
              </div>
            </div>
          </div>`;

const card11 = `          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">11</span>
              <h3>Product Information</h3>
            </div>
            <div className="card-body">
              <div className="form-row-4">
                <div className="form-group">
                  <label>Barcode / ISBN</label>
                  <input type="text" placeholder="Enter barcode" />
                </div>
                <div className="form-group">
                  <label>HSN Code</label>
                  <input type="text" placeholder="Enter HSN code" />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input type="text" placeholder="Enter weight" />
                </div>
                <div className="form-group">
                  <label>Dimensions (cm)</label>
                  <div className="dim-inputs">
                    <input type="text" placeholder="L" />
                    <input type="text" placeholder="W" />
                    <input type="text" placeholder="H" />
                  </div>
                </div>
              </div>
              <div className="form-row-4 mt-3">
                <div className="form-group">
                  <label>Country of Origin</label>
                  <select><option>Select country</option></select>
                </div>
                <div className="form-group">
                  <label>Manufacturer</label>
                  <input type="text" placeholder="Enter manufacturer" />
                </div>
                <div className="form-group">
                  <label>Package Contents</label>
                  <input type="text" placeholder="Enter package contents" />
                </div>
                <div className="form-group">
                  <label>Warranty</label>
                  <input type="text" placeholder="Enter warranty details" />
                </div>
              </div>
            </div>
          </div>`;

const card10 = `          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">10</span>
              <h3>Next Customer Write a Review</h3>
            </div>
            <div className="card-body row-flex">
              <div className="review-icon-area">
                <div className="star-circle">☆</div>
                <p>Be the first to review this product and help other customers.</p>
              </div>
              <div className="review-input-area">
                <div className="form-group mb-2">
                  <label>Your Rating</label>
                  <div className="stars">☆☆☆☆☆</div>
                </div>
                <div className="form-group">
                  <label>Your Review</label>
                  <textarea placeholder="Write your review about this product..." rows="3"></textarea>
                  <div className="char-count right">0/500</div>
                </div>
                <button className="btn-submit-review">Submit Review</button>
              </div>
            </div>
          </div>`;

const card12_13 = `          <div className="split-row">
            <div className="new-card">
              <div className="card-header">
                <span className="card-badge">12</span>
                <h3>Shipping Information</h3>
              </div>
              <div className="card-body">
                <div className="form-row-2">
                  <div className="form-group">
                    <label>Shipping Weight (kg)</label>
                    <input type="text" placeholder="Enter weight" />
                  </div>
                  <div className="form-group">
                    <label>Shipping Class</label>
                    <select><option>Select class</option></select>
                  </div>
                </div>
                <div className="form-row-2 mt-3">
                  <div className="form-group">
                    <label>Processing Time</label>
                    <select><option>Select time</option></select>
                  </div>
                  <div className="form-group">
                    <label>Delivery Time</label>
                    <select><option>Select time</option></select>
                  </div>
                </div>
              </div>
            </div>

            <div className="new-card">
              <div className="card-header">
                <span className="card-badge">13</span>
                <h3>Additional Options</h3>
              </div>
              <div className="card-body additional-options-list">
                <div className="toggle-row"><span>Allow Cash on Delivery</span> <div className="toggle active"></div></div>
                <div className="toggle-row"><span>Allow Product Return</span> <div className="toggle active"></div></div>
                <div className="toggle-row"><span>Show on Homepage</span> <div className="toggle active"></div></div>
                <div className="toggle-row"><span>Enable Product Reviews</span> <div className="toggle active"></div></div>
                <div className="toggle-row"><span>Require Prescription</span> <div className="toggle"></div></div>
              </div>
            </div>
          </div>`;

const card14 = `
          <div className="new-card">
            <div className="card-header">
              <span className="card-badge">14</span>
              <h3>Related Products</h3>
            </div>
            <div className="card-body">
              <div className="search-row">
                <div className="search-input">
                  <Search size={14} color="#999" />
                  <input type="text" placeholder="Search products..." />
                </div>
                <button className="btn-text-add">+ Add Product</button>
              </div>
              <div className="empty-related">No related products added</div>
            </div>
          </div>`;

const footer = `
      {/* Footer Actions */}
      <div className="add-product-footer">
        <div className="footer-left">
          <button className="btn-duplicate">
            <div className="btn-icon">📄</div>
            <div className="btn-content">
              <strong>Duplicate Product</strong>
              <p>Create a copy of this product</p>
            </div>
            <span className="btn-link">Duplicate</span>
          </button>
          
          <button className="btn-duplicate">
            <div className="btn-icon">👁️</div>
            <div className="btn-content">
              <strong>Preview Product</strong>
              <p>Preview how this product looks</p>
            </div>
            <span className="btn-link">Preview</span>
          </button>
        </div>
        
        <div className="footer-right">
          <button className="btn-draft-box">
            <div className="btn-icon">💾</div>
            <div className="btn-content">
              <strong>Save as Draft</strong>
              <p>Save product as draft</p>
            </div>
            <span className="btn-link">Save Draft</span>
          </button>

          <button className="btn-publish-box" onClick={() => onSave({ name: productName, price })}>
            <div className="check-circle"><Check size={16} /></div>
            <div className="btn-content">
              <strong>All good to go!</strong>
              <p>Click Save Product to publish this product.</p>
            </div>
          </button>
        </div>
      </div>
`;

// Insert 9 and 11 into left column
code = code.replace(/(<div className="split-row">\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">5.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/s, '$1\n' + card9 + '\n' + card11);

// Insert 10 and 12_13 into right column
code = code.replace(/(<div className="split-row">\s*<div className="new-card">\s*<div className="card-header">\s*<span className="card-badge">7.*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>)/s, '$1\n' + card10 + '\n' + card12_13);

// Insert 14 into sidebar
code = code.replace(/(<div className="new-card mb-4">\s*<div className="card-header no-border">\s*<h3>Publish On.*?<\/div>\s*<\/div>)/s, '$1\n' + card14);

// Insert footer before final </div>
code = code.replace(/(<\/div>\s*<\/div>\s*)$/, footer + '$1');

fs.writeFileSync('src/pages/admin/AddNewProduct.jsx', code, 'utf8');
console.log('Restored all deleted sections!');
