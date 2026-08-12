const fs = require('fs');

const path = 'src/pages/admin/ProductManagement.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update nextStep logic
content = content.replace(
  'const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));',
  'const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));'
);

// 2. Build Step 6 Content
const step6Content = `
            {currentStep === 6 && (
              <>
            {/* Card 11: Product Information */}
            <div className="dash-card card-span-2">
              <div className="dash-card-header">
                <span className="step-number">11</span>
                <h3>Product Information</h3>
              </div>
              <div className="dash-card-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Barcode / ISBN</label>
                    <input type="text" className="form-input" placeholder="Enter barcode" />
                  </div>
                  <div className="form-group">
                    <label>HSN Code</label>
                    <input type="text" className="form-input" placeholder="Enter HSN code" />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input type="number" className="form-input" placeholder="Enter weight" />
                  </div>
                  <div className="form-group">
                    <label>Dimensions (cm)</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input type="number" className="form-input" placeholder="L" style={{ flex: 1 }} />
                      <input type="number" className="form-input" placeholder="W" style={{ flex: 1 }} />
                      <input type="number" className="form-input" placeholder="H" style={{ flex: 1 }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country of Origin</label>
                    <select className="form-input custom-select">
                      <option>Select country</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Manufacturer</label>
                    <input type="text" className="form-input" placeholder="Enter manufacturer" />
                  </div>
                  <div className="form-group">
                    <label>Package Contents</label>
                    <input type="text" className="form-input" placeholder="Enter package contents" />
                  </div>
                  <div className="form-group">
                    <label>Warranty</label>
                    <input type="text" className="form-input" placeholder="Enter warranty details" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 12: Shipping Information */}
            <div className="dash-card card-span-1">
              <div className="dash-card-header">
                <span className="step-number">12</span>
                <h3>Shipping Information</h3>
              </div>
              <div className="dash-card-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label>Shipping Weight (kg)</label>
                    <input type="number" className="form-input" placeholder="Enter weight" />
                  </div>
                  <div className="form-group" style={{ position: 'relative' }}>
                    <label>Shipping Class</label>
                    <select className="form-input custom-select">
                      <option>Select class</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9f9f9', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>Free Shipping</span>
                    <div style={{ width: '36px', height: '20px', background: '#e0e0e0', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Processing Time</label>
                    <select className="form-input custom-select">
                      <option>Select time</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Delivery Time</label>
                    <select className="form-input custom-select">
                      <option>Select time</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 13: Additional Options */}
            <div className="dash-card card-span-1" style={{ margin: 0 }}>
              <div className="dash-card-header">
                <span className="step-number">13</span>
                <h3>Additional Options</h3>
              </div>
              <div className="dash-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: "Allow Cash on Delivery", active: true },
                  { label: "Allow Product Return", active: true },
                  { label: "Show on Homepage", active: false },
                  { label: "Enable Product Reviews", active: true },
                  { label: "Require Prescription", active: false }
                ].map((opt, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#444' }}>{opt.label}</span>
                    <div style={{ width: '36px', height: '20px', background: opt.active ? '#2e7d32' : '#e0e0e0', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: opt.active ? '2px' : 'auto', left: opt.active ? 'auto' : '2px' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 14: Related Products */}
            <div className="dash-card card-span-1" style={{ margin: 0 }}>
              <div className="dash-card-header">
                <span className="step-number">14</span>
                <h3>Related Products</h3>
              </div>
              <div className="dash-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="form-input" placeholder="Search products..." style={{ flex: 1 }} />
                  <button className="btn-dash-secondary" style={{ padding: '0 16px', background: '#fff', border: '1px solid #d37920', color: '#d37920', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>+ Add Product</button>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #ddd', borderRadius: '8px', minHeight: '120px', background: '#fafafa' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>No related products added</span>
                </div>
              </div>
            </div>
              </>
            )}
`;

// Insert the step6 content right before the closing of the grid and the footer actions
const targetInjection = `            </div>
              </>
            )}
          </div>
          
          <div className="dash-footer-actions"`;

content = content.replace(targetInjection, step6Content + '\n' + targetInjection);

// 3. Update the footer actions to handle the special Step 6 footer
const oldFooter = `<div className="dash-footer-actions" style={{ justifyContent: 'space-between' }}>
            {currentStep === 1 ? (
              <button className="btn-dash-cancel" onClick={handleCancel}>Cancel</button>
            ) : (
              <button className="btn-dash-cancel" onClick={prevStep}><ChevronLeft size={16} /> Previous</button>
            )}
            
            {currentStep < 5 ? (
              <button className="btn-dash-save" onClick={nextStep}>Next Step <ChevronRight size={16} /></button>
            ) : (
              <button className="btn-dash-save" onClick={handleSaveProduct}><Save size={16} /> Save Product</button>
            )}
          </div>`;

const newFooter = `{currentStep === 6 ? (
            <div className="dash-footer-actions-final" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', borderTop: '1px solid #eaeaea', paddingTop: '20px', width: '100%', flexWrap: 'wrap' }}>
              <button className="btn-dash-cancel" style={{ marginRight: 'auto' }} onClick={prevStep}><ChevronLeft size={16} /> Previous</button>
              
              <button className="btn-dash-secondary" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500' }}>
                <FileText size={16} /> Duplicate Product
              </button>
              
              <button className="btn-dash-secondary" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500' }}>
                <Eye size={16} /> Preview Product
              </button>
              
              <button className="btn-dash-secondary" style={{ padding: '10px 16px', background: '#fff', border: '1px solid #ddd', borderRadius: '8px', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '500' }}>
                <Save size={16} /> Save as Draft
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', background: '#e0f3e6', padding: '10px 16px', borderRadius: '8px', gap: '12px', border: '1px solid #c8e6c9' }}>
                 <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ width: '12px', height: '12px', borderBottom: '2px solid #2e7d32', borderRight: '2px solid #2e7d32', transform: 'rotate(45deg)', marginBottom: '2px' }}></div>
                 </div>
                 <div>
                   <p style={{ margin: 0, color: '#2e7d32', fontWeight: '600', fontSize: '13px' }}>All good to go!</p>
                   <p style={{ margin: 0, color: '#4a8e57', fontSize: '11px' }}>Click Save Product to publish this product.</p>
                 </div>
                 <button className="btn-dash-save" onClick={handleSaveProduct} style={{ marginLeft: '12px', padding: '10px 24px', whiteSpace: 'nowrap' }}>Save Product</button>
              </div>
            </div>
          ) : (
            <div className="dash-footer-actions" style={{ justifyContent: 'space-between' }}>
              {currentStep === 1 ? (
                <button className="btn-dash-cancel" onClick={handleCancel}>Cancel</button>
              ) : (
                <button className="btn-dash-cancel" onClick={prevStep}><ChevronLeft size={16} /> Previous</button>
              )}
              
              <button className="btn-dash-save" onClick={nextStep}>Next Step <ChevronRight size={16} /></button>
            </div>
          )}`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync(path, content);
console.log('Step 6 injected successfully');
