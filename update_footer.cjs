const fs = require('fs');
const path = 'src/pages/admin/ProductManagement.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStart = `{currentStep === 6 ? (
            <div className="dash-footer-actions-final"`;
const targetEnd = `) : (
            <div className="dash-footer-actions"`;

const startIndex = content.indexOf(targetStart);
const endIndex = content.indexOf(targetEnd);

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find footer!");
  process.exit(1);
}

const replacement = `{currentStep === 6 ? (
            <div className="dash-footer-actions-final" style={{ display: 'flex', gap: '16px', marginTop: '20px', width: '100%', flexWrap: 'wrap' }}>
              
              <div style={{ flex: '1 1 250px', background: '#fff', border: '1px solid #f9eedf', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText size={20} color="#d37920" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#111' }}>Duplicate Product</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>Create a copy of this product</p>
                </div>
                <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #d37920', borderRadius: '6px', color: '#d37920', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Duplicate</button>
              </div>
              
              <div style={{ flex: '1 1 250px', background: '#fff', border: '1px solid #f9eedf', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Eye size={20} color="#d37920" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#111' }}>Preview Product</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>Preview how this product looks</p>
                </div>
                <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #d37920', borderRadius: '6px', color: '#d37920', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Preview</button>
              </div>
              
              <div style={{ flex: '1 1 250px', background: '#fff', border: '1px solid #f9eedf', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff4e6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Save size={20} color="#d37920" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: '#111' }}>Save as Draft</h4>
                  <p style={{ margin: 0, fontSize: '11px', color: '#888' }}>Save product as draft</p>
                </div>
                <button style={{ padding: '6px 14px', background: '#fff', border: '1px solid #d37920', borderRadius: '6px', color: '#d37920', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}>Save Draft</button>
              </div>
              
              <div style={{ flex: '1.5 1 300px', background: '#e8f5e9', border: '1px solid #c8e6c9', borderRadius: '8px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #2e7d32', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: '10px', height: '14px', borderBottom: '2.5px solid #2e7d32', borderRight: '2.5px solid #2e7d32', transform: 'rotate(45deg)', marginBottom: '4px' }}></div>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: 'bold', color: '#2e7d32' }}>All good to go!</h4>
                  <p style={{ margin: 0, fontSize: '12px', color: '#4a8e57' }}>Click Save Product to publish this product.</p>
                </div>
              </div>

            </div>
          `;

content = content.substring(0, startIndex) + replacement + content.substring(endIndex);

fs.writeFileSync(path, content);
console.log('Footer updated to exact match!');
