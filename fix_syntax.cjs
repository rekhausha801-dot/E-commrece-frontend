const fs = require('fs');
const path = 'src/pages/admin/ProductManagement.jsx';
let content = fs.readFileSync(path, 'utf8');

const footerIndex = content.indexOf('<div className="dash-footer-actions"');
if (footerIndex === -1) {
  console.log('Could not find dash-footer-actions');
  process.exit(1);
}

// Extract everything up to that point
content = content.substring(0, footerIndex);

// The correct footer and modal
const newFooter = `<div className="dash-footer-actions" style={{ justifyContent: 'space-between' }}>
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
          </div>
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }} onClick={() => setIsImportModalOpen(false)}>
          <div style={{ background: '#fff', borderRadius: '12px', width: '95%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', padding: '20px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#666' }} onClick={() => setIsImportModalOpen(false)}>
              <X size={18} />
            </button>
            
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#111' }}>Import Products</h2>
              <p style={{ margin: 0, color: '#555', fontSize: '12px' }}>Upload an Excel file (.xls or .xlsx) to import products in bulk.</p>
            </div>

            {/* Stepper */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '0 8px', margin: '2px 0' }}>
              <div style={{ position: 'absolute', top: '14px', left: '25px', right: '25px', height: '2px', background: '#eaeaea', zIndex: 1 }}></div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#d37920', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>1</div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#d37920' }}>Upload File</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f5f5f5', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>2</div>
                <span style={{ fontSize: '11px', fontWeight: '500', color: '#888' }}>Map Columns</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f5f5f5', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>3</div>
                <span style={{ fontSize: '11px', fontWeight: '500', color: '#888' }}>Preview Data</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', zIndex: 2, position: 'relative', background: '#fff', padding: '0 8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f5f5f5', color: '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '12px' }}>4</div>
                <span style={{ fontSize: '11px', fontWeight: '500', color: '#888' }}>Import</span>
              </div>
            </div>

            {/* Drag and Drop Area */}
            <div style={{ border: '2px dashed #eaeaea', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#fafafa' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#e0f3e6', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <FileSpreadsheet size={20} color="#2e7d32" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 6px 0', color: '#111' }}>Drag and drop your Excel file here</h3>
              <p style={{ margin: '0 0 8px 0', color: '#888', fontSize: '11px' }}>or</p>
              <input type="file" accept=".xls,.xlsx" ref={importFileInputRef} style={{ display: 'none' }} />
              <button style={{ background: '#d37920', color: '#fff', border: 'none', padding: '6px 20px', borderRadius: '6px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', marginBottom: '12px' }} onClick={() => importFileInputRef.current?.click()}>Choose File</button>
              <p style={{ margin: '0 0 4px 0', color: '#555', fontSize: '11px' }}>Only Excel files (.xls, .xlsx) are supported</p>
              <p style={{ margin: 0, color: '#888', fontSize: '10px' }}>Maximum file size: 10MB</p>
            </div>

            {/* Download Sample */}
            <div style={{ background: '#f0f9f4', border: '1px solid #dcf0e3', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileSpreadsheet size={18} color="#2e7d32" />
                <div>
                  <h4 style={{ margin: '0 0 2px 0', color: '#2e7d32', fontSize: '12px', fontWeight: '600' }}>Download Sample File</h4>
                  <p style={{ margin: 0, color: '#4a8e57', fontSize: '11px' }}>Get the example format to prepare your Excel file</p>
                </div>
              </div>
              <Download size={16} color="#2e7d32" />
            </div>

            {/* Important Notes */}
            <div style={{ background: '#fff9f0', border: '1px solid #f9eedf', borderRadius: '8px', padding: '12px 14px' }}>
              <h4 style={{ margin: '0 0 6px 0', color: '#b26112', fontSize: '12px', fontWeight: 'bold' }}>Important Notes</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={12} color="#d37920" />
                  <span style={{ fontSize: '11px', color: '#555' }}>First row of your file should contain column headers.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={12} color="#d37920" />
                  <span style={{ fontSize: '11px', color: '#555' }}>Make sure your file follows the sample format.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={12} color="#d37920" />
                  <span style={{ fontSize: '11px', color: '#555' }}>Image URLs in Excel will be used for product images.</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={12} color="#d37920" />
                  <span style={{ fontSize: '11px', color: '#555' }}>Duplicate products (by SKU) will be skipped.</span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
              <button style={{ padding: '8px 20px', background: '#fff', border: '1px solid #ddd', borderRadius: '6px', fontWeight: '600', fontSize: '12px', color: '#555', cursor: 'pointer' }} onClick={() => setIsImportModalOpen(false)}>Cancel</button>
              <button style={{ padding: '8px 20px', background: '#d37920', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '12px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>Next <ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductManagement;
`;

fs.writeFileSync(path, content + newFooter);
console.log('Fixed syntax error by replacing the footer and modal');
