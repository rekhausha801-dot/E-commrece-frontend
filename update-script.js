const fs = require('fs');
const jsxFile = '../client/src/pages/admin/ReportsAnalytics.jsx';
let jsx = fs.readFileSync(jsxFile, 'utf8');

const oldStr =           {/* Customer Overview */}
          <div className="ra-card">
            <h3 className="ra-card-title">Customer Overview</h3>
            <div className="ra-cust-flex">;

const newStr =           {/* Customer Overview */}
          <div className="ra-card ra-cust-overview-card">
            <h3 className="ra-card-title">Customer Overview</h3>
            <div className="ra-cust-flex" style={{ padding: '0 0 24px 0', borderBottom: '1px solid #f3f4f6', marginBottom: '24px' }}>;

jsx = jsx.replace(oldStr, newStr);

const oldCust2 =                   <div className="ra-cust-trend"><ArrowUp size={12} className="text-green"/> <span className="text-green">9.3%</span> vs Apr 2025</div>
                </div>
              </div>
            </div>
          </div>;

const newCust2 =                   <div className="ra-cust-trend"><ArrowUp size={12} className="text-green"/> <span className="text-green">9.3%</span> vs Apr 2025</div>
                </div>
              </div>
            </div>
            
            <div className="ra-cust-bottom-grid">
              <div className="ra-cust-chart-section">
                <div className="ra-cust-chart-header">
                  <span className="ra-cust-chart-title">Customer Growth (by Date)</span>
                  <div className="ra-card-filter">
                    Daily <ChevronDown size={14} />
                  </div>
                </div>
                <div className="ra-cust-chart-area">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCustNew" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d59441" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#d59441" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(val) => val === 0 ? '0' : val >= 100000 ? \\\\\\L\\\ : \\\\\\K\\\} />
                      <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }} />
                      <Area type="monotone" dataKey="sales" stroke="#d59441" strokeWidth={2} fill="url(#colorCustNew)" dot={{ r: 4, fill: '#fff', stroke: '#d59441', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="ra-cust-locations">
                <h4 className="ra-loc-title">Top Locations</h4>
                <div className="ra-loc-list">
                  <div className="ra-loc-item">
                    <span className="loc-name">Tamil Nadu</span>
                    <div className="loc-bar-wrap"><div className="loc-bar" style={{ width: '25.6%' }}></div></div>
                    <span className="loc-pct">25.6%</span>
                  </div>
                  <div className="ra-loc-item">
                    <span className="loc-name">Maharashtra</span>
                    <div className="loc-bar-wrap"><div className="loc-bar" style={{ width: '18.7%' }}></div></div>
                    <span className="loc-pct">18.7%</span>
                  </div>
                  <div className="ra-loc-item">
                    <span className="loc-name">Karnataka</span>
                    <div className="loc-bar-wrap"><div className="loc-bar" style={{ width: '15.4%' }}></div></div>
                    <span className="loc-pct">15.4%</span>
                  </div>
                  <div className="ra-loc-item">
                    <span className="loc-name">Delhi</span>
                    <div className="loc-bar-wrap"><div className="loc-bar" style={{ width: '10.3%' }}></div></div>
                    <span className="loc-pct">10.3%</span>
                  </div>
                  <div className="ra-loc-item">
                    <span className="loc-name">Gujarat</span>
                    <div className="loc-bar-wrap"><div className="loc-bar" style={{ width: '8.2%' }}></div></div>
                    <span className="loc-pct">8.2%</span>
                  </div>
                  <div className="ra-loc-item">
                    <span className="loc-name">Others</span>
                    <div className="loc-bar-wrap"><div className="loc-bar" style={{ width: '21.8%' }}></div></div>
                    <span className="loc-pct">21.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>;

jsx = jsx.replace(oldCust2, newCust2);
jsx = jsx.replace('<div className="ra-grid-2">', '<div className="ra-grid-cust-2">');

fs.writeFileSync(jsxFile, jsx);
