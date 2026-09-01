import React, { useState, useEffect } from 'react';
import './ReportsAnalytics.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, Download, ChevronDown, ChevronRight, IndianRupee, ShoppingBag, 
  Users, User, Package, ArrowUp, Info, RefreshCw, FileText,
  BarChart2, Percent, CreditCard, Smartphone, MessageCircle, Wallet, ArrowRight
} from 'lucide-react';
import { getReports, exportReports } from '../../services/api';
import { message } from 'antd';

const areaData = [];

const sparklineTotalRevenue = [];
const sparklineTotalOrders = [];
const sparklineTotalCustomers = [];
const sparklineTotalProducts = [];

const pieData = [];

const orderStatusData = [];

const ReportsAnalytics = () => {
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    period: 'daily'
  });

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      const response = await getReports(dateRange);
      if (response.data?.success) {
        setReportData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reports", error);
      message.error(error.response?.data?.message || "Failed to load reports");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [dateRange.startDate, dateRange.endDate, dateRange.period]);

  const handleExport = async () => {
    try {
      message.loading({ content: 'Exporting...', key: 'export' });
      const response = await exportReports({ ...dateRange, format: 'csv' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reports_${dateRange.startDate}_${dateRange.endDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success({ content: 'Export successful!', key: 'export', duration: 2 });
    } catch (error) {
      console.error("Export error", error);
      message.error({ content: 'Failed to export report', key: 'export', duration: 2 });
    }
  };

  const summary = reportData?.summary || {};
  const salesOverview = reportData?.salesOverview || {};
  const salesByChannel = reportData?.salesByChannel || {};
  const revenueBreakdown = reportData?.revenueBreakdown || {};
  const profitMargin = reportData?.profitMargin || {};
  const returnsRefunds = reportData?.returnsRefunds || {};
  const couponPerformance = reportData?.couponPerformance || {};
  const paymentMethods = reportData?.paymentMethods || {};
  const lowStockOverview = reportData?.lowStockOverview || {};
  const customerOverview = reportData?.customerOverview || {};
  const defaultOrderStatusOverview = {
    totalOrders: 1245,
    deliveredRate: 62.9,
    cancellationRate: 5.6,
    returnRate: 3.8,
    statuses: [
      { status: 'Delivered', orders: 785, percentage: 62.9 },
      { status: 'Processing', orders: 245, percentage: 19.7 },
      { status: 'Shipped', orders: 145, percentage: 11.6 },
      { status: 'Cancelled', orders: 70, percentage: 5.6 },
      { status: 'Returned', orders: 48, percentage: 3.8 }
    ]
  };

  const orderStatusOverview = reportData?.orderStatusOverview?.totalOrders > 0 
    ? reportData.orderStatusOverview 
    : defaultOrderStatusOverview;

  const formatCurrency = (val) => `₹${(val || 0).toLocaleString('en-IN')}`;
  
  const pieDataMap = salesByChannel?.channels?.map(c => ({
    name: c.name,
    value: c.sales,
    pct: `${c.percentage}%`,
    color: c.name === 'Website' ? '#d59441' : c.name === 'Mobile App' ? '#2d2d2d' : c.name === 'Android App' ? '#8b5a2b' : '#e5d3b3'
  })) || [];

  const orderStatusMap = orderStatusOverview.statuses.map(s => ({
    name: s.status,
    value: s.orders,
    percentage: s.percentage,
    color: s.status === 'Delivered' ? '#4f6343' : s.status === 'Processing' ? '#d69720' : s.status === 'Shipped' ? '#e29b46' : s.status === 'Cancelled' ? '#ec7560' : '#d91f27'
  }));

  const sparklineTotalRevenue = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
  const sparklineTotalOrders = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];
  const sparklineTotalCustomers = [{ v: 20 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }];
  const sparklineTotalProducts = [{ v: 5 }, { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 30 }];

  const areaDataWeeklyMap = salesOverview?.labels?.map((label, idx) => ({
    name: label,
    sales: salesOverview?.sales?.[idx] || 0
  })) || [];

  if (isLoading && !reportData) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading reports...</div>;
  }

  return (
    <div className="ra-container report-ui-redesign">
      {/* Header */}
      <div style={{ background: 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
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

          <button onClick={handleExport} style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)' }}>
            <Download size={16} strokeWidth={2.5} /> Export Report
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
          <div className="ra-card" style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px 24px 0 24px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
            <div className="ra-card-header" style={{ marginBottom: '16px', borderBottom: 'none', padding: 0 }}>
              <h3 className="ra-card-title" style={{ color: '#1f2937', fontSize: '18px', fontWeight: '600' }}>Revenue Overview</h3>
              <div style={{ background: '#1f1f1f', color: '#d5b97d', padding: '8px 14px', borderRadius: '6px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '500', border: '1px solid #333' }}>
                <select value="last7days" onChange={() => {}} style={{ background: 'transparent', border: 'none', color: '#d5b97d', outline: 'none', cursor: 'pointer', appearance: 'none', paddingRight: '12px' }}>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="thismonth">This Month</option>
                </select>
                <ChevronDown size={14} color="#d5b97d" style={{ marginLeft: '-12px', pointerEvents: 'none' }} />
              </div>
            </div>
            
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#333' }}>
                ₹44,466.1
              </div>
              <div style={{ fontSize: '16px', color: '#4caf50', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                ↑ 100.0%
              </div>
            </div>

            <div className="ra-chart-area" style={{ height: '320px', margin: '0 -10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                {(() => {
                  const demoData = [
                    { name: 'Aug 25', revenue: 0, fullDate: 'Aug 25, 2026' },
                    { name: 'Aug 26', revenue: 2000, fullDate: 'Aug 26, 2026' },
                    { name: 'Aug 27', revenue: 12500, fullDate: 'Aug 27, 2026' },
                    { name: 'Aug 28', revenue: 3500, fullDate: 'Aug 28, 2026' },
                    { name: 'Aug 29', revenue: 0, fullDate: 'Aug 29, 2026' },
                    { name: 'Aug 30', revenue: 0, fullDate: 'Aug 30, 2026' },
                    { name: 'Aug 31', revenue: 5500, fullDate: 'Aug 31, 2026' },
                    { name: 'Sep 1', revenue: 21000, fullDate: 'Sep 1, 2026' }
                  ];
                  
                  const CustomTooltip = ({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #eaeaea' }}>
                          <p style={{ margin: '0 0 4px 0', fontWeight: '500', color: '#111827', fontSize: '14px' }}>{data.fullDate}</p>
                          <p style={{ margin: 0, color: '#d5b97d', fontWeight: '500', fontSize: '14px' }}>
                            revenue : {payload[0].value}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  };

                  return (
                    <AreaChart data={demoData} margin={{ top: 10, right: 0, left: -20, bottom: 10 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d5b97d" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#d5b97d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={true} horizontal={true} stroke="#f0e6d2" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#8b8375' }} dy={15} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#8b8375' }} tickFormatter={(val) => val === 0 ? '0' : val >= 1000 ? `${(val/1000).toFixed(1)}K`.replace('.0K', 'K') : val} ticks={[0, 5500, 11000, 16500, 22000]} domain={[0, 22000]} />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="revenue" stroke="#c19d67" strokeWidth={2} fill="url(#colorRevenue)" dot={{ r: 4, fill: '#fff', stroke: '#c19d67', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#fff', stroke: '#c19d67', strokeWidth: 2 }} />
                    </AreaChart>
                  );
                })()}
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ra-card" style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <div className="card-header" style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 'none' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#333', margin: 0 }}>Sales by Channel</h3>
            </div>
            
            <div className="donut-chart-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '180px', height: '180px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieDataMap} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2} dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
                      {pieDataMap.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#222', lineHeight: '1' }}>{pieDataMap.length > 0 ? pieDataMap.length : 0}</span>
                  <span style={{ fontSize: '11px', color: '#888', marginTop: '6px', lineHeight: '1' }}>Channels</span>
                </div>
              </div>

              <div className="donut-legend-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', marginTop: '40px', padding: '0 10px' }}>
                {pieDataMap.map((item, index) => (
                  <div className="legend-item" key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: item.color }}></div>
                      <span style={{ fontSize: '13px', color: '#555', fontWeight: '500' }}>{item.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>{formatCurrency(item.value)}</span>
                      <small style={{ fontSize: '11px', color: '#888' }}>({item.pct})</small>
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
                <span>{formatCurrency(profitMargin.totalCostOfGoods)}</span>
              </div>
              <div className="ra-metric-item">
                <span>Gross Profit</span>
                <span>{formatCurrency(profitMargin.grossProfit)}</span>
              </div>
            </div>
            <div className="ra-metric-highlight highlight-bg-yellow">
              <span>Profit Margin</span>
              <span className="highlight-green">{profitMargin.profitMargin || 0}%</span>
            </div>
          </div>


          {/* Coupon Performance */}
          <div className="ra-card">
            <div className="ra-card-icon-header">
              <div className="ra-icon-sm gold"><Percent size={16} /></div>
              <h3 className="ra-card-title">Coupon Performance</h3>
            </div>
            <div className="ra-metric-list tight">
              <div className="ra-metric-item"><span>Coupons Used</span><span>{couponPerformance.couponsUsed || 0}</span></div>
              <div className="ra-metric-item"><span>Total Discount Given</span><span>{formatCurrency(couponPerformance.totalDiscountGiven)}</span></div>
              <div className="ra-metric-item"><span>Most Used Coupon</span><span>{couponPerformance.mostUsedCoupon?.code || '-'}</span></div>
              <div className="ra-metric-item"><span>Coupon Orders</span><span>{couponPerformance.couponOrders || 0}</span></div>
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
                {(paymentMethods?.methods || []).map((pm, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="ra-pay-method">
                        {pm.method === 'UPI' && <Smartphone size={14} color="#3b82f6" />}
                        {pm.method === 'COD' && <MessageCircle size={14} color="#10b981" />}
                        {pm.method === 'Card' && <CreditCard size={14} color="#6366f1" />}
                        {pm.method === 'Wallet' && <Wallet size={14} color="#ef4444" />}
                        {pm.method}
                      </div>
                    </td>
                    <td>{pm.orders}</td><td>{formatCurrency(pm.revenue)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr><td>Total</td><td>{(paymentMethods?.total?.orders || 0).toLocaleString()}</td><td className="highlight-gold">{formatCurrency(paymentMethods?.total?.revenue)}</td></tr>
              </tfoot>
            </table>
          </div>

          {/* Low Stock Overview */}
          <div className="ra-card">
            <h3 className="ra-card-title">Low Stock Overview</h3>
            <div className="ra-stock-circles">
              <div className="ra-stock-circle">
                <div className="circle-wrap ring-orange">
                  <div className="circle-inner">{lowStockOverview.lowStockProducts || 0}</div>
                </div>
                <span>Low Stock<br/>Products</span>
              </div>
              <div className="ra-stock-circle">
                <div className="circle-wrap ring-red">
                  <div className="circle-inner">{lowStockOverview.outOfStockProducts || 0}</div>
                </div>
                <span>Out of Stock<br/>Products</span>
              </div>
              <div className="ra-stock-circle">
                <div className="circle-wrap ring-gold">
                  <div className="circle-inner">{lowStockOverview.inStockProducts || 0}</div>
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
                <span style={{ color: '#111827' }}>{formatCurrency(revenueBreakdown.grossSales)}</span>
              </div>
              <div className="ra-metric-item" style={{ paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                <span>Discounts</span>
                <span style={{ color: '#111827' }}>- {formatCurrency(revenueBreakdown.discounts)}</span>
              </div>
              <div className="ra-metric-item" style={{ paddingBottom: '10px', borderBottom: '1px solid #f3f4f6' }}>
                <span>Refunds</span>
                <span style={{ color: '#111827' }}>- {formatCurrency(revenueBreakdown.refunds)}</span>
              </div>
              <div className="ra-metric-item">
                <span>Shipping Revenue</span>
                <span style={{ color: '#111827' }}>+ {formatCurrency(revenueBreakdown.shippingRevenue)}</span>
              </div>
            </div>
            <div className="ra-metric-highlight highlight-bg-yellow">
              <span>Net Revenue</span>
              <span className="highlight-green">{formatCurrency(revenueBreakdown.netRevenue)}</span>
            </div>
          </div>

          <div className="ra-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '24px' }}>
            <h3 className="ra-card-title" style={{ fontSize: '14px', fontWeight: '700', color: '#333', marginBottom: '24px' }}>Customer Overview</h3>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* New Customers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>New Customers</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0' }}>{customerOverview.newCustomers || 0}</div>
                  <div style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                    <ArrowUp size={12} color={customerOverview.newCustomersGrowth >= 0 ? "#4caf50" : "#ef4444"} /> 
                    <span style={{ color: customerOverview.newCustomersGrowth >= 0 ? '#4caf50' : '#ef4444', fontWeight: '600' }}>{Math.abs(customerOverview.newCustomersGrowth || 0).toFixed(1)}%</span> 
                    <span style={{ color: '#8b8375' }}>vs Apr 2025</span>
                  </div>
                </div>
              </div>
              
              <div style={{ width: '1px', height: '48px', backgroundColor: '#f2eadc', margin: '0 16px' }}></div>
              
              {/* Returning Customers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <div style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>Returning Customers</div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0' }}>{customerOverview.returningCustomers || 0}</div>
                  <div style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                    <ArrowUp size={12} color={customerOverview.returningCustomersGrowth >= 0 ? "#4caf50" : "#ef4444"} /> 
                    <span style={{ color: customerOverview.returningCustomersGrowth >= 0 ? '#4caf50' : '#ef4444', fontWeight: '600' }}>{Math.abs(customerOverview.returningCustomersGrowth || 0).toFixed(1)}%</span> 
                    <span style={{ color: '#8b8375' }}>vs Apr 2025</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ReportsAnalytics;
