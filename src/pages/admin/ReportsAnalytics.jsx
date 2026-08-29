import React, { useState } from 'react';
import './ReportsAnalytics.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, Download, ChevronDown, ChevronRight, IndianRupee, ShoppingBag, 
  Users, User, Package, ArrowUp, Info, RefreshCw, FileText,
  BarChart2, Percent, CreditCard, Smartphone, MessageCircle, Wallet, ArrowRight
} from 'lucide-react';

const areaData = [
  { name: '01 May', sales: 20000 }, { name: '02 May', sales: 45000 }, { name: '03 May', sales: 65000 }, { name: '04 May', sales: 85000 }, { name: '05 May', sales: 110000 },
  { name: '06 May', sales: 80000 }, { name: '07 May', sales: 95000 }, { name: '08 May', sales: 100000 }, { name: '09 May', sales: 75000 }, { name: '10 May', sales: 90000 },
  { name: '11 May', sales: 115000 }, { name: '12 May', sales: 140000 }, { name: '13 May', sales: 110000 }, { name: '14 May', sales: 110000 }, { name: '15 May', sales: 85000 },
  { name: '16 May', sales: 105000 }, { name: '17 May', sales: 140000 }, { name: '18 May', sales: 120000 }, { name: '19 May', sales: 145000 }, { name: '20 May', sales: 170000 },
  { name: '21 May', sales: 140000 }, { name: '22 May', sales: 105000 }, { name: '23 May', sales: 140000 }, { name: '24 May', sales: 160000 }, { name: '25 May', sales: 180000 },
  { name: '26 May', sales: 145000 }, { name: '27 May', sales: 115000 }, { name: '28 May', sales: 140000 }, { name: '29 May', sales: 140000 }, { name: '30 May', sales: 160000 },
  { name: '31 May', sales: 140000 },
];

const areaDataWeekly = [
  { name: 'May 18', sales: 20000 },
  { name: 'May 19', sales: 35000 },
  { name: 'May 20', sales: 52000 },
  { name: 'May 21', sales: 38000 },
  { name: 'May 22', sales: 65000 },
  { name: 'May 23', sales: 78000 },
  { name: 'May 24', sales: 100000 }
];

const sparklineTotalRevenue = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineTotalOrders = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];
const sparklineTotalCustomers = [{ v: 20 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }];
const sparklineTotalProducts = [{ v: 5 }, { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 30 }];

const pieData = [
  { name: 'Website', value: 645800, color: '#d59441', pct: '51.8%' },
  { name: 'Mobile App', value: 345200, color: '#2d2d2d', pct: '27.7%' },
  { name: 'Android App', value: 145300, color: '#8b5a2b', pct: '11.7%' },
  { name: 'Others', value: 109500, color: '#e5d3b3', pct: '8.8%' },
];

const orderStatusData = [
  { name: 'Delivered', value: 785, color: '#10b981' },
  { name: 'Processing', value: 245, color: '#f59e0b' },
  { name: 'Shipped', value: 145, color: '#d59441' },
  { name: 'Cancelled', value: 70, color: '#dc2626' },
  { name: 'Returned', value: 48, color: '#ef4444' }
];

const ReportsAnalytics = () => {
  return (
    <div className="ra-container report-ui-redesign">
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', marginBottom: '24px', border: '1px solid #f9f9f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1.5px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart2 size={22} color="#d97706" />
          </div>
          <div style={{ width: '2.5px', height: '22px', background: '#d97706', borderRadius: '2px' }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Reports & Analytics</h1>
            <div style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Dashboard <ChevronRight size={12} /> <span style={{ color: '#d97706', fontWeight: '500' }}>Reports</span>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#f8f9fa', border: '1px solid #e5e7eb', padding: '10px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#4b5563', cursor: 'pointer', fontWeight: '500' }}>
            <Calendar size={16} color="#d97706" />
            <span>01 May 2025 - 31 May 2025</span>
            <ChevronDown size={16} />
          </div>
          <button style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)' }}>
            <Download size={16} strokeWidth={2.5} /> Export Report
          </button>
        </div>
      </div>

      <div className="ra-content">
        {/* ROW 1: Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '32px' }}>
          <div className="stat-card dark">
            <div className="stat-top">
              <div className="stat-icon gold"><span style={{ fontSize: '18px', fontWeight: 'bold' }}>â‚¹</span></div>
              <div className="stat-info">
                <span className="stat-title">Total Revenue</span>
                <h2 className="stat-value gold-text">â‚¹8,75,420</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">â†‘ 12.5%</span> <span className="stat-change-text">vs yesterday</span>
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
                <h2 className="stat-value">1,245</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">â†‘ 18</span> <span className="stat-change-text">new today</span>
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
                <h2 className="stat-value">3,528</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">â†‘ 35</span> <span className="stat-change-text">new today</span>
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
                <h2 className="stat-value gold-text">â‚¹999</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">â†‘ 2.4%</span> <span className="stat-change-text">vs yesterday</span>
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
          <div className="ra-card" style={{ background: '#f8f3eb', border: '1px solid #eaddce', borderRadius: '16px', padding: '24px 24px 0 24px', overflow: 'hidden' }}>
            <div className="ra-card-header" style={{ marginBottom: '16px', borderBottom: 'none', padding: 0 }}>
              <h3 className="ra-card-title" style={{ color: '#1f2937', fontSize: '16px', fontWeight: '600' }}>Revenue Overview</h3>
              <div style={{ background: '#1a1a1a', color: '#c8a883', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500' }}>
                Last 7 Days <ChevronDown size={14} />
              </div>
            </div>
            
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#333' }}>
                ₹8,75,420
              </div>
              <div style={{ fontSize: '20px', color: '#4caf50', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                ↑ 12.5%
              </div>
            </div>

            <div className="ra-chart-area" style={{ height: '300px', margin: '0 -24px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaDataWeekly} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSalesWeekly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c19d67" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#c19d67" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eae1d1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b8375' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b8375' }} tickFormatter={(val) => val === 0 ? '0' : val >= 1000 ? `${val/1000}K` : val} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Area type="natural" dataKey="sales" stroke="#c19d67" strokeWidth={3} fill="url(#colorSalesWeekly)" dot={{ r: 4, fill: '#c19d67', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#c19d67', stroke: '#fff', strokeWidth: 2 }} />
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
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={2} dataKey="value" stroke="none">
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
          <div className="ra-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 className="ra-card-title">Customer Overview</h3>
            <div className="ra-cust-flex" style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
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
          <div className="ra-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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


