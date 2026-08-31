import React, { useState } from 'react';
import './ReportsAnalytics.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, Download, ChevronDown, IndianRupee, ShoppingBag, 
  Users, User, Package, ArrowUp, Info, RefreshCw, FileText,
  BarChart2, Percent, CreditCard, Smartphone, MessageCircle, Wallet, ArrowRight
} from 'lucide-react';

const areaData = [];

const sparklineTotalRevenue = [];
const sparklineTotalOrders = [];
const sparklineTotalCustomers = [];
const sparklineTotalProducts = [];

const pieData = [];

const orderStatusData = [];

const ReportsAnalytics = () => {
  return (
    <div className="ra-container report-ui-redesign">
      <div className="ra-header">
        <div className="ra-header-left">
          <h2>Reports</h2>
          <div className="ra-breadcrumbs">Dashboard <span className="ra-breadcrumb-sep">{'>'}</span> <span className="ra-breadcrumb-active">Reports</span></div>
        </div>
        <div className="ra-header-actions">
          <div className="ra-date-picker">
            <Calendar size={16} />
            <span>01 May 2025 - 31 May 2025</span>
            <ChevronDown size={16} />
          </div>
          <button className="ra-btn-export">
            <Download size={16} /> Export Report <ChevronDown size={16} className="ml-2" />
          </button>
        </div>
      </div>

      <div className="ra-content">
        {/* ROW 1: Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '32px' }}>
          <div className="stat-card dark">
            <div className="stat-top">
              <div className="stat-icon gold"><span style={{ fontSize: '18px', fontWeight: 'bold' }}>₹</span></div>
              <div className="stat-info">
                <span className="stat-title">Total Revenue</span>
                <h2 className="stat-value gold-text">₹0</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">0%</span> <span className="stat-change-text">vs yesterday</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineTotalRevenue}>
                  <defs>
                    <linearGradient id="glowDark1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDark1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light">
            <div className="stat-top">
              <div className="stat-icon gold"><ShoppingBag size={18} color="#554422" /></div>
              <div className="stat-info">
                <span className="stat-title">Total Orders</span>
                <h2 className="stat-value">0</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">0</span> <span className="stat-change-text">new today</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineTotalOrders}>
                  <defs>
                    <linearGradient id="glowLight1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLight1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light">
            <div className="stat-top">
              <div className="stat-icon gold"><Users size={18} color="#554422" /></div>
              <div className="stat-info">
                <span className="stat-title">Total Customers</span>
                <h2 className="stat-value">0</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">0</span> <span className="stat-change-text">new today</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineTotalCustomers}>
                  <defs>
                    <linearGradient id="glowLight2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLight2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card dark">
            <div className="stat-top">
              <div className="stat-icon gold"><Package size={18} color="#c9a05b" /></div>
              <div className="stat-info">
                <span className="stat-title">Average Order Value</span>
                <h2 className="stat-value gold-text">₹0</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">0%</span> <span className="stat-change-text">vs yesterday</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineTotalProducts}>
                  <defs>
                    <linearGradient id="glowDark2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDark2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ROW 2: Charts and Breakdowns */}
        <div className="ra-grid-sales">
          <div className="ra-card">
            <div className="ra-card-header">
              <h3 className="ra-card-title">Sales Overview</h3>
              <div className="ra-card-filter">
                Daily <ChevronDown size={14} />
              </div>
            </div>
            <div className="ra-chart-area">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSalesNew" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d59441" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#d59441" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} dy={10} ticks={['01 May', '06 May', '11 May', '16 May', '21 May', '26 May', '31 May']} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6b7280' }} tickFormatter={(val) => val === 0 ? '0' : val >= 100000 ? `${val/100000}L` : `${val/1000}K`} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: '1px solid #eee' }} />
                  <Area type="monotone" dataKey="sales" stroke="#d59441" strokeWidth={2} fill="url(#colorSalesNew)" dot={{ r: 4, fill: '#fff', stroke: '#d59441', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ra-card">
            <h3 className="ra-card-title">Sales by Channel</h3>
            <div className="ra-donut-legend-wrap">
              <div className="ra-donut-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="ra-legend-list">
                {pieData.map((item, index) => (
                  <div key={index} className="ra-legend-item">
                    <div className="ra-legend-left">
                      <div className="ra-legend-dot" style={{ backgroundColor: item.color }}></div>
                      <div>
                        <div className="ra-legend-name">{item.name}</div>
                        <div className="ra-legend-vals">₹{(item.value).toLocaleString('en-IN')} <span className="ra-legend-pct">({item.pct})</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* ROW 3: Detailed Metrics Grid */}
        <div className="ra-grid-3-cards">
          {/* Profit & Margin */}
          <div className="ra-card">
            <div className="ra-card-icon-header">
              <div className="ra-icon-sm gold"><BarChart2 size={16} /></div>
              <h3 className="ra-card-title">Profit & Margin</h3>
            </div>
            <div className="ra-metric-list">
              <div className="ra-metric-item">
                <span>Total Cost of Goods</span>
                <span>₹7,13,300</span>
              </div>
              <div className="ra-metric-item">
                <span>Gross Profit</span>
                <span>₹4,25,000</span>
              </div>
            </div>
            <div className="ra-metric-highlight highlight-bg-yellow">
              <span>Profit Margin</span>
              <span className="highlight-green">34.1%</span>
            </div>
          </div>

          {/* Returns & Refunds */}
          <div className="ra-card">
            <div className="ra-card-icon-header">
              <div className="ra-icon-sm gold"><Package size={16} /></div>
              <h3 className="ra-card-title">Returns & Refunds</h3>
            </div>
            <div className="ra-metric-list">
              <div className="ra-metric-item">
                <span>Returned Orders</span>
                <span>48</span>
              </div>
              <div className="ra-metric-item">
                <span>Refunds</span>
                <span>₹22,500</span>
              </div>
            </div>
            <div className="ra-metric-highlight highlight-bg-yellow">
              <span>Return Rate</span>
              <span className="highlight-green">3.8%</span>
            </div>
          </div>

          {/* Coupon Performance */}
          <div className="ra-card">
            <div className="ra-card-icon-header">
              <div className="ra-icon-sm gold"><Percent size={16} /></div>
              <h3 className="ra-card-title">Coupon Performance</h3>
            </div>
            <div className="ra-metric-list tight">
              <div className="ra-metric-item"><span>Coupons Used</span><span>270</span></div>
              <div className="ra-metric-item"><span>Total Discount Given</span><span>₹85,000</span></div>
              <div className="ra-metric-item"><span>Most Used Coupon</span><span>WELCOME10</span></div>
              <div className="ra-metric-item"><span>Coupon Orders</span><span>210</span></div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="ra-card">
            <div className="ra-card-icon-header">
              <div className="ra-icon-sm gold"><CreditCard size={16} /></div>
              <h3 className="ra-card-title">Payment Methods</h3>
            </div>
            <table className="ra-table-sm">
              <thead>
                <tr><th>Method</th><th>Orders</th><th>Revenue</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="ra-pay-method">
                      <Smartphone size={14} color="#3b82f6" /> UPI
                    </div>
                  </td>
                  <td>520</td><td>₹5,20,000</td>
                </tr>
                <tr>
                  <td>
                    <div className="ra-pay-method">
                      <MessageCircle size={14} color="#10b981" /> COD
                    </div>
                  </td>
                  <td>380</td><td>₹3,10,000</td>
                </tr>
                <tr>
                  <td>
                    <div className="ra-pay-method">
                      <CreditCard size={14} color="#6366f1" /> Card
                    </div>
                  </td>
                  <td>275</td><td>₹3,40,000</td>
                </tr>
                <tr>
                  <td>
                    <div className="ra-pay-method">
                      <Wallet size={14} color="#ef4444" /> Wallet
                    </div>
                  </td>
                  <td>70</td><td>₹75,800</td>
                </tr>
              </tbody>
              <tfoot>
                <tr><td>Total</td><td>1,245</td><td className="highlight-gold">₹12,45,800</td></tr>
              </tfoot>
            </table>
          </div>

          {/* Low Stock Overview */}
          <div className="ra-card">
            <h3 className="ra-card-title">Low Stock Overview</h3>
            <div className="ra-stock-circles">
              <div className="ra-stock-circle">
                <div className="circle-wrap ring-orange">
                  <div className="circle-inner">18</div>
                </div>
                <span>Low Stock<br/>Products</span>
              </div>
              <div className="ra-stock-circle">
                <div className="circle-wrap ring-red">
                  <div className="circle-inner">7</div>
                </div>
                <span>Out of Stock<br/>Products</span>
              </div>
              <div className="ra-stock-circle">
                <div className="circle-wrap ring-gold">
                  <div className="circle-inner">142</div>
                </div>
                <span>In Stock<br/>Products</span>
              </div>
            </div>
            <button className="ra-btn-full gold-bg">View Products</button>
          </div>

          {/* Revenue Breakdown */}
          <div className="ra-card">
            <h3 className="ra-card-title">Revenue Breakdown</h3>
            <div className="ra-metric-list" style={{ gap: '14px' }}>
              <div className="ra-metric-item" style={{ paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                <span>Gross Sales</span>
                <span style={{ color: '#111827' }}>₹12,45,800</span>
              </div>
              <div className="ra-metric-item" style={{ paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                <span>Discounts</span>
                <span style={{ color: '#111827' }}>- ₹85,000</span>
              </div>
              <div className="ra-metric-item" style={{ paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                <span>Refunds</span>
                <span style={{ color: '#111827' }}>- ₹22,500</span>
              </div>
              <div className="ra-metric-item">
                <span>Shipping Revenue</span>
                <span style={{ color: '#111827' }}>+ ₹30,000</span>
              </div>
            </div>
            <div className="ra-metric-highlight highlight-bg-yellow">
              <span>Net Revenue</span>
              <span className="highlight-green">₹11,38,300</span>
            </div>
          </div>
        </div>

        {/* ROW 4: Overview Areas */}
        <div className="ra-grid-2">
          {/* Customer Overview */}
          <div className="ra-card">
            <h3 className="ra-card-title">Customer Overview</h3>
            <div className="ra-cust-flex">
              <div className="ra-cust-block">
                <div className="ra-icon-md light"><Users size={20} /></div>
                <div>
                  <div className="ra-cust-label">New Customers</div>
                  <div className="ra-cust-val">256</div>
                  <div className="ra-cust-trend"><ArrowUp size={12} className="text-green"/> <span className="text-green">14.2%</span> vs Apr 2025</div>
                </div>
              </div>
              <div className="ra-cust-divider"></div>
              <div className="ra-cust-block">
                <div className="ra-icon-md light"><Users size={20} /></div>
                <div>
                  <div className="ra-cust-label">Returning Customers</div>
                  <div className="ra-cust-val">600</div>
                  <div className="ra-cust-trend"><ArrowUp size={12} className="text-green"/> <span className="text-green">8.1%</span> vs Apr 2025</div>
                </div>
              </div>
              <div className="ra-cust-divider"></div>
              <div className="ra-cust-block">
                <div className="ra-icon-md light"><User size={20} /></div>
                <div>
                  <div className="ra-cust-label">Total Customers</div>
                  <div className="ra-cust-val">856</div>
                  <div className="ra-cust-trend"><ArrowUp size={12} className="text-green"/> <span className="text-green">9.3%</span> vs Apr 2025</div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Status Overview */}
          <div className="ra-card">
            <h3 className="ra-card-title">Order Status Overview</h3>
            
            <div className="ra-order-status-wrap" style={{ display: 'flex', alignItems: 'center', gap: '24px', height: '160px', marginTop: '16px' }}>
              <div className="ra-donut-chart" style={{ flex: 1, height: '100%', position: 'relative' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      {orderStatusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="ra-donut-center-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>1,245</span><br/><small style={{ fontSize: '10px', color: '#888' }}>Total Orders</small>
                </div>
              </div>
              
              <div className="ra-legend-grid" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {orderStatusData.map((item, index) => (
                  <div className="ra-legend-item-sm" key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <div className="ra-legend-dot" style={{ backgroundColor: item.color, width: '8px', height: '8px', borderRadius: '50%' }}></div>
                    <span className="name" style={{ flex: 1, color: '#4b5563' }}>{item.name}</span>
                    <span className="val" style={{ fontWeight: 600, color: '#111827' }}>{item.value} <small style={{ fontWeight: 400, color: '#9ca3af' }}>({(item.value/1245*100).toFixed(1)}%)</small></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ra-order-rates" style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <div className="ra-rate-box" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>Delivered Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>62.9%</div>
              </div>
              <div className="ra-rate-box" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>Cancellation Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>5.6%</div>
              </div>
              <div className="ra-rate-box" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>Return Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#f59e0b' }}>3.8%</div>
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
};

export default ReportsAnalytics;


