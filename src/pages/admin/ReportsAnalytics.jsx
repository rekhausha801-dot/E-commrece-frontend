import React, { useState } from 'react';
import './ReportsAnalytics.css';
import './Dashboard.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { 
  Calendar, Download, ChevronDown, ChevronRight, ChevronLeft, IndianRupee, ShoppingBag, 
  Users, Package, ArrowUp, ArrowDown, Info, RefreshCw,
  Plus, Grid, Tag, Image as ImageIcon, Send, MoreVertical, FileText, PieChart as PieChartIcon
} from 'lucide-react';
import { PiTShirt, PiDress, PiSneaker, PiHandbag, PiArmchair } from 'react-icons/pi';

const areaData = [
  { name: '01 May', sales: 20000 }, { name: '06 May', sales: 70000 }, { name: '11 May', sales: 50000 },
  { name: '16 May', sales: 90000 }, { name: '21 May', sales: 150000 }, { name: '26 May', sales: 110000 },
  { name: '31 May', sales: 130000 },
];
const sparkData = [{val: 10},{val: 20},{val: 15},{val: 30},{val: 25},{val: 40},{val: 35}];

const pieData = [
  { name: 'Website', value: 645800, color: '#b88645', pct: '51.8%' },
  { name: 'Mobile App', value: 345200, color: '#111827', pct: '27.7%' },
  { name: 'Android App', value: 145300, color: '#6b7280', pct: '11.7%' },
  { name: 'Others', value: 109500, color: '#e0d5c1', pct: '8.8%' },
];

const AddReportForm = ({ reportType, setReportType }) => {
  const reportTypes = [
    { id: 'sales', title: 'Sales Report', desc: 'Detailed overview of sales and revenue.', icon: <IndianRupee size={24} /> },
    { id: 'orders', title: 'Order Report', desc: 'View order details and status summary.', icon: <ShoppingBag size={24} /> },
    { id: 'customers', title: 'Customer Report', desc: 'Customer acquisition and behavior insights.', icon: <Users size={24} /> },
    { id: 'products', title: 'Product Report', desc: 'Product performance and stock insights.', icon: <Package size={24} /> },
    { id: 'inventory', title: 'Inventory Report', desc: 'Stock levels and inventory summary.', icon: <Grid size={24} /> },
    { id: 'coupons', title: 'Coupon Report', desc: 'Coupon usage and performance report.', icon: <Tag size={24} /> },
  ];

  return (
    <div className="ra-add-report-view">
      {/* 1. Select Report Type */}
      <div className="ra-form-section">
        <h3 className="ra-section-title">1. Select Report Type</h3>
        <div className="ra-rt-container">
          <div className="ra-rt-grid">
            {reportTypes.map((type) => (
              <div 
                key={type.id} 
                className={`ra-rt-card ${reportType === type.id ? 'active' : ''}`}
                onClick={() => setReportType(type.id)}
              >
                <div className="ra-rt-radio">
                  <div className="ra-rt-radio-inner"></div>
                </div>
                <div className="ra-rt-icon">{type.icon}</div>
                <h4 className="ra-rt-title">{type.title}</h4>
                <p className="ra-rt-desc">{type.desc}</p>
              </div>
            ))}
          </div>
          <div className="ra-rt-info">
            <h4><Info size={16} /> About Reports</h4>
            <p>Generate comprehensive reports based on your selected criteria. You can export or schedule reports as per your requirement.</p>
          </div>
        </div>
      </div>

      {/* 2. Select Date Range */}
      <div className="ra-form-section">
        <h3 className="ra-section-title">2. Select Date Range</h3>
        <div className="ra-form-row">
          <div className="ra-form-group">
            <label>Preset Range</label>
            <div className="ra-select-wrap">
              <Calendar size={16} className="ra-input-icon" />
              <select><option>Custom Range</option><option>Last 7 Days</option><option>This Month</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Start Date</label>
            <div className="ra-select-wrap">
              <input type="text" defaultValue="01/05/2025" />
              <Calendar size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>End Date</label>
            <div className="ra-select-wrap">
              <input type="text" defaultValue="31/05/2025" />
              <Calendar size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Compare With (Optional)</label>
            <div className="ra-select-wrap">
              <select><option>Previous Period</option><option>Previous Year</option><option>None</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filters (Optional) */}
      <div className="ra-form-section">
        <h3 className="ra-section-title">3. Filters (Optional)</h3>
        <div className="ra-form-row ra-filters-grid">
          <div className="ra-form-group">
            <label>Category</label>
            <div className="ra-select-wrap">
              <select><option>All Categories</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Brand</label>
            <div className="ra-select-wrap">
              <select><option>All Brands</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Payment Method</label>
            <div className="ra-select-wrap">
              <select><option>All Payment Methods</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Sales Channel</label>
            <div className="ra-select-wrap">
              <select><option>All Channels</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Customer Type</label>
            <div className="ra-select-wrap">
              <select><option>All Customers</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Order Status</label>
            <div className="ra-select-wrap">
              <select><option>All Status</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Country</label>
            <div className="ra-select-wrap">
              <select><option>All Countries</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
          <div className="ra-form-group">
            <label>Device Type</label>
            <div className="ra-select-wrap">
              <select><option>All Devices</option></select>
              <ChevronDown size={16} className="ra-select-arrow" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Report Options */}
      <div className="ra-form-section" style={{ paddingBottom: '32px' }}>
        <h3 className="ra-section-title">4. Report Options</h3>
        <div className="ra-options-row">
          <div className="ra-checkbox-group">
            <label className="ra-checkbox-label">
              <input type="checkbox" defaultChecked />
              <div className="ra-cb-text">
                <span className="ra-cb-title">Include Charts & Graphs</span>
                <span className="ra-cb-desc">Show visual representation</span>
              </div>
            </label>
            <label className="ra-checkbox-label">
              <input type="checkbox" defaultChecked />
              <div className="ra-cb-text">
                <span className="ra-cb-title">Include Summary</span>
                <span className="ra-cb-desc">Show key summary metrics</span>
              </div>
            </label>
            <label className="ra-checkbox-label">
              <input type="checkbox" />
              <div className="ra-cb-text">
                <span className="ra-cb-title">Include Detailed Data</span>
                <span className="ra-cb-desc">Show detailed records</span>
              </div>
            </label>
            <label className="ra-checkbox-label">
              <input type="checkbox" />
              <div className="ra-cb-text">
                <span className="ra-cb-title">Send Email Report</span>
                <span className="ra-cb-desc">Receive report in your email</span>
              </div>
            </label>
          </div>
          <div className="ra-export-group">
            <div className="ra-form-group" style={{ width: '200px' }}>
              <label>Export Format</label>
              <div className="ra-select-wrap">
                <FileText size={16} className="ra-input-icon" />
                <select><option>Excel (.xlsx)</option><option>PDF (.pdf)</option><option>CSV (.csv)</option></select>
                <ChevronDown size={16} className="ra-select-arrow" />
              </div>
            </div>
          </div>
        </div>
        <div className="ra-form-actions" style={{ display: 'flex', gap: '16px', justifyContent: 'flex-start', marginTop: '24px' }}>
          <button className="ra-btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><RefreshCw size={16} /> Reset</button>
          <button className="ra-btn-primary" style={{ backgroundColor: '#c9a05b', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}><PieChartIcon size={16} /> Generate Report</button>
        </div>
      </div>
      <div className="ra-tip-box" style={{ padding: '16px', backgroundColor: '#fcf8f3', borderRadius: '8px', border: '1px solid #eadecb', color: '#6b7280', fontSize: '13px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span className="ra-tip-icon" style={{ color: '#c9a05b' }}>💡 Tip:</span> You can save this report configuration for future use from the generated report page.
      </div>
    </div>
  );
};

const ReportsAnalytics = () => {
  const [isAddingReport, setIsAddingReport] = useState(false);
  const [reportType, setReportType] = useState('sales');
  return (
    <div className="ra-container">
      <div className="ra-header">
        <div className="ra-header-left">
          <h2>Reports</h2>
        </div>
        <div className="ra-header-actions">
          <button className="ra-btn-primary">
            <Download size={16} /> Export Report
          </button>
          <button className="ra-btn-primary" style={{ backgroundColor: '#111827', color: '#fff', border: 'none' }} onClick={() => setIsAddingReport(!isAddingReport)}>
            {isAddingReport ? <ChevronLeft size={16} /> : <Plus size={16} />}
            {isAddingReport ? 'Back to Dashboard' : 'Add Report'}
          </button>
        </div>
      </div>

      {isAddingReport ? (
        <div className="ra-content">
          <AddReportForm reportType={reportType} setReportType={setReportType} />
        </div>
      ) : (
        <div className="ra-content">
        {/* ROW 1: Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '32px' }}>
          <div className="stat-card dark">
            <div className="stat-top">
              <div className="stat-icon gold"><span style={{ fontSize: '18px', fontWeight: 'bold' }}>₹</span></div>
              <div className="stat-info">
                <span className="stat-title">Total Sales</span>
                <h2 className="stat-value gold-text">₹12,45,800</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 18.6%</span> <span className="stat-change-text">vs Apr 2025</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="glowDarkSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkSales)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light">
            <div className="stat-top">
              <div className="stat-icon gold"><ShoppingBag size={18} color="#554422" /></div>
              <div className="stat-info">
                <span className="stat-title">Total Orders</span>
                <h2 className="stat-value">1,245</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 12.4%</span> <span className="stat-change-text">vs Apr 2025</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="glowLightOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightOrders)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light">
            <div className="stat-top">
              <div className="stat-icon gold"><Users size={18} color="#554422" /></div>
              <div className="stat-info">
                <span className="stat-title">Total Customers</span>
                <h2 className="stat-value">856</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 9.3%</span> <span className="stat-change-text">vs Apr 2025</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="glowLightCustomers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightCustomers)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card dark">
            <div className="stat-top">
              <div className="stat-icon gold"><Package size={18} color="#c9a05b" /></div>
              <div className="stat-info">
                <span className="stat-title">Average Order Value</span>
                <h2 className="stat-value gold-text">₹999</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 6.7%</span> <span className="stat-change-text">vs Apr 2025</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkData}>
                  <defs>
                    <linearGradient id="glowDarkAOV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkAOV)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ROW 2: Overview & Channel */}
        <div className="ra-row">
          <div className="ra-col-70">
            <div className="ra-card">
              <div className="ra-card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>Sales Overview</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', border: '1px solid #eadecb', borderRadius: '8px', backgroundColor: '#fff', color: '#4b5563', fontSize: '12px', cursor: 'pointer' }}>
                    <Calendar size={14} color="#6b7280" />
                    This Month
                    <ChevronDown size={14} color="#6b7280" />
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', border: '1px solid #eadecb', borderRadius: '8px', backgroundColor: '#fcf8f3', color: '#888', cursor: 'pointer' }}>
                    <MoreVertical size={16} color="#c9a05b" />
                  </button>
                </div>
              </div>
              <div className="ra-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#d59441" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#d59441" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0e6d8" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(val) => val === 0 ? '0' : `${val/1000}K`} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} itemStyle={{ color: '#d59441', fontWeight: 600 }} />
                    <Area type="monotone" dataKey="sales" stroke="#d59441" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" dot={{ r: 4, fill: '#fff', stroke: '#d59441', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="ra-col-30">
            <div className="ra-card" style={{ height: '100%' }}>
              <div className="ra-card-title">
                Sales by Channel
                <span className="ra-view-all">View All</span>
              </div>
              <div className="ra-chart-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="ra-custom-legend">
                {pieData.map((item, index) => (
                  <div key={index} className="ra-legend-item">
                    <div className="ra-legend-left">
                      <div className="ra-legend-dot" style={{ backgroundColor: item.color }}></div>
                      {item.name}
                    </div>
                    <div className="ra-legend-right">
                      <div className="ra-legend-value">₹{(item.value/100).toLocaleString('en-IN')}</div>
                      <div className="ra-legend-percent">({item.pct})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: Categories, Products, Customers/Orders */}
        <div className="ra-row">
          <div className="ra-col-33">
            <div className="ra-card" style={{ height: '100%' }}>
              <div className="ra-card-title">
                Top Categories by Sales
                <span className="ra-view-all">View All</span>
              </div>
              <div>
                {[
                  { title: 'Men Clothing', val: '3,45,200', pct: '27.7%', icon: <PiTShirt size={22} color="#c9a05b" />, width: '55%' },
                  { title: 'Women Clothing', val: '2,95,800', pct: '23.8%', icon: <PiDress size={22} color="#c9a05b" />, width: '45%' },
                  { title: 'Footwear', val: '1,85,600', pct: '14.9%', icon: <PiSneaker size={22} color="#c9a05b" />, width: '35%' },
                  { title: 'Accessories', val: '1,25,400', pct: '10.0%', icon: <PiHandbag size={22} color="#c9a05b" />, width: '25%' },
                  { title: 'Home & Living', val: '95,800', pct: '7.7%', icon: <PiArmchair size={22} color="#c9a05b" />, width: '15%' }
                ].map((cat, i) => (
                  <div key={i} className="r-cat-item">
                    <div className="r-cat-icon">{cat.icon}</div>
                    <div className="r-cat-info">
                      <div className="r-cat-title">{cat.title}</div>
                      <div className="r-cat-progress-bg">
                        <div className="r-cat-progress-fill" style={{ width: cat.width }}></div>
                      </div>
                    </div>
                    <div className="r-cat-stats">
                      <div className="r-cat-val">₹{cat.val}</div>
                      <div className="r-cat-pct">{cat.pct}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ra-col-33">
            <div className="ra-card" style={{ height: '100%' }}>
              <div className="ra-card-title">
                Top Selling Products
                <span className="ra-view-all">View All</span>
              </div>
              <div className="r-prod-col-headers">
                <span>Product</span>
                <span>Sold</span>
              </div>
              <div>
                {[
                  { title: 'Casual Cotton T-Shirt', val: '845', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
                  { title: 'Slim Fit Jeans', val: '620', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=100' },
                  { title: 'Sneakers for Men', val: '512', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
                  { title: 'Women Kurti', val: '478', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
                  { title: 'Leather Wallet', val: '365', img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' }
                ].map((prod, i) => (
                  <div key={i} className="r-prod-item">
                    <div className="r-prod-img-wrap"><img src={prod.img} alt={prod.title} /></div>
                    <div className="r-prod-title">{prod.title}</div>
                    <div className="r-prod-val">{prod.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ra-col-33 ra-col-stacked">
            <div className="ra-card">
              <div className="ra-card-title">
                Customer Overview
                <span className="ra-view-all">View All</span>
              </div>
              <div className="r-cust-grid-new">
                <div className="r-cust-box">
                  <div className="r-cust-box-top">
                    <div className="r-cust-icon-wrap"><Users size={16} color="#c9a05b" strokeWidth={1.5}/></div>
                    <span className="r-cust-label">New<br/>Customers</span>
                  </div>
                  <div className="r-cust-val">256</div>
                  <div className="r-trend-box">
                    <div className="r-trend-col-left">
                      <ArrowUp size={12} color="#10b981" />
                      <span className="r-trend-pct" style={{color: '#10b981'}}>14.2%</span>
                    </div>
                    <div className="r-trend-col-right">
                      <span>vs Apr</span>
                      <span>2025</span>
                    </div>
                  </div>
                </div>
                <div className="r-cust-box">
                  <div className="r-cust-box-top">
                    <div className="r-cust-icon-wrap"><Users size={16} color="#c9a05b" strokeWidth={1.5}/></div>
                    <span className="r-cust-label">Returning<br/>Customers</span>
                  </div>
                  <div className="r-cust-val">600</div>
                  <div className="r-trend-box">
                    <div className="r-trend-col-left">
                      <ArrowUp size={12} color="#10b981" />
                      <span className="r-trend-pct" style={{color: '#10b981'}}>8.1%</span>
                    </div>
                    <div className="r-trend-col-right">
                      <span>vs Apr</span>
                      <span>2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="ra-card">
              <div className="ra-card-title">
                Order Status Overview
                <span className="ra-view-all">View All</span>
              </div>
              <div className="r-order-status-content">
                <div className="r-donut-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={[{value:785,color:'#c9a05b'},{value:245,color:'#1a1a1a'},{value:145,color:'#888'},{value:70,color:'#dc2626'}]} innerRadius={35} outerRadius={50} paddingAngle={0} dataKey="value" stroke="#fff" strokeWidth={2}>
                        {[{color:'#c9a05b'},{color:'#1a1a1a'},{color:'#888'},{color:'#dc2626'}].map((e, i) => <Cell key={i} fill={e.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="r-donut-center"><ShoppingBag size={18} color="#c9a05b" /></div>
                </div>
                <div className="ra-custom-legend" style={{marginTop:0, flexGrow:1}}>
                  {[
                    { name: 'Delivered', val: '785', pct: '(62.9%)', color: '#c9a05b' },
                    { name: 'Processing', val: '245', pct: '(19.7%)', color: '#1a1a1a' },
                    { name: 'Shipped', val: '145', pct: '(11.6%)', color: '#888' },
                    { name: 'Cancelled', val: '70', pct: '(5.6%)', color: '#dc2626' }
                  ].map((item, i) => (
                    <div key={i} className="ra-legend-item">
                      <div className="ra-legend-left">
                        <div className="ra-legend-dot" style={{ backgroundColor: item.color }}></div>
                        {item.name}
                      </div>
                      <div className="ra-legend-right">
                        <div className="ra-legend-value">{item.val}</div>
                        <div className="ra-legend-percent">{item.pct}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 4: Recent Activities, Quick Actions, Calendar */}
        <div className="ra-row">
          <div className="ra-col-33">
            <div className="ra-card" style={{ height: '100%' }}>
              <div className="ra-card-title">
                Recent Activities
                <span className="ra-view-all">View All</span>
              </div>
              <div className="ra-activity-list">
                {[
                  { text: 'New order #ORD1047 has been placed', time: '2 min ago', color: '#dc2626' },
                  { text: 'Product "Women\'s Jacket" is low in stock', time: '15 min ago', color: '#b88645' },
                  { text: 'New customer registered: Sneha R.', time: '25 min ago', color: '#3b82f6' },
                  { text: 'Coupon "WELCOME10" used by John D.', time: '35 min ago', color: '#10b981' }
                ].map((act, i) => (
                  <div key={i} className="ra-activity-item">
                    <div className="ra-activity-dot" style={{ backgroundColor: act.color }}></div>
                    <div className="ra-activity-text">{act.text}</div>
                    <div className="ra-activity-time">{act.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="ra-col-33">
            <div className="ra-card" style={{ height: '100%' }}>
              <div className="ra-card-title">
                Calendar
                <span className="ra-view-all">View All</span>
              </div>
              <div className="cal-wrapper">
                <div className="cal-events-area">
                  {[
                    { date: '24 May', text: 'New Orders & Shipments' },
                    { date: '25 May', text: 'Flash Sale (Summer Collection)' },
                    { date: '26 May', text: 'Coupon "WELCOME10" Expiring' },
                    { date: '30 May', text: 'Monthly Sale Report' }
                  ].map((item, i) => (
                    <div key={i} className="cal-event-item">
                      <div className="cal-event-date">{item.date}</div>
                      <div className="cal-event-text">{item.text}</div>
                    </div>
                  ))}
                </div>
                <div className="cal-icon-large">
                  <div className="cal-icon-large-top">May</div>
                  <div className="cal-icon-large-num">24</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default ReportsAnalytics;
