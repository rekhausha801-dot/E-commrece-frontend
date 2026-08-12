const fs = require('fs');

const path = 'src/pages/admin/ProductManagement.jsx';
let content = fs.readFileSync(path, 'utf8');

// Fix Modal Blur
content = content.replace("backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center'", "backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'flex-start', margin: 'auto'");

// Inject Ad Settings
const injectTarget = `              </div>
            </div>
              </>
            )}
          </div>
          
          <div className="dash-footer-actions"`;

const adSettingsCode = `              </div>
            </div>

            {/* Card 11: Ad Settings (Promoted) */}
            <div className="dash-card card-span-2">
              <div className="dash-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Ad Settings (Promoted)</h3>
                <div style={{ width: '36px', height: '20px', background: '#e0e0e0', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                   <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }}></div>
                </div>
              </div>
              <div className="dash-card-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Ad Title</label>
                    <input type="text" className="form-input" placeholder="Enter ad title" />
                  </div>
                  <div className="form-group">
                    <label>Ad Discount (%)</label>
                    <input type="number" className="form-input" placeholder="e.g. 20" />
                  </div>
                  <div className="form-group">
                    <label>Ad Price (₹)</label>
                    <input type="number" className="form-input" placeholder="e.g. 799" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Ad Link</label>
                    <select className="form-input custom-select">
                      <option>Use Product Detail Page</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Ad Position</label>
                    <select className="form-input custom-select">
                      <option>Home Page Top Banner</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Options Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="card-span-1">
              {/* Product Status */}
              <div className="dash-card" style={{ margin: 0 }}>
                <div className="dash-card-header"><h3 style={{ margin: 0 }}>Product Status</h3></div>
                <div className="dash-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="radio" name="status" defaultChecked style={{ accentColor: '#d37920' }} /> Active
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="radio" name="status" style={{ accentColor: '#d37920' }} /> Draft
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="radio" name="status" style={{ accentColor: '#d37920' }} /> Inactive
                  </label>
                </div>
              </div>
              {/* Visibility */}
              <div className="dash-card" style={{ margin: 0 }}>
                <div className="dash-card-header"><h3 style={{ margin: 0 }}>Visibility</h3></div>
                <div className="dash-card-content" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="radio" name="visibility" defaultChecked style={{ accentColor: '#d37920' }} /> Public (Visible to all)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', cursor: 'pointer' }}>
                    <input type="radio" name="visibility" style={{ accentColor: '#d37920' }} /> Private (Only admin)
                  </label>
                </div>
              </div>
              {/* Featured Product */}
              <div className="dash-card" style={{ margin: 0 }}>
                <div className="dash-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'none' }}>
                  <h3 style={{ margin: 0 }}>Featured Product</h3>
                  <div style={{ width: '36px', height: '20px', background: '#d37920', borderRadius: '10px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', right: '2px' }}></div>
                  </div>
                </div>
              </div>
              {/* Publish On */}
              <div className="dash-card" style={{ margin: 0 }}>
                <div className="dash-card-header"><h3 style={{ margin: 0 }}>Publish On</h3></div>
                <div className="dash-card-content" style={{ display: 'flex', gap: '8px' }}>
                  <input type="date" className="form-input" style={{ flex: 1, padding: '10px' }} />
                  <input type="time" className="form-input" style={{ flex: 1, padding: '10px' }} />
                </div>
              </div>
            </div>
              </>
            )}
          </div>
          
          <div className="dash-footer-actions"`;

content = content.replace(injectTarget, adSettingsCode);

fs.writeFileSync(path, content);
console.log('Injected successfully!');
