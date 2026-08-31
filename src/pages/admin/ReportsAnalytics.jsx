import React, { useState, useEffect } from 'react';
import './ReportsAnalytics.css';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  Calendar, Download, ChevronDown, ChevronRight, IndianRupee, ShoppingBag, 
  Users, User, Package, ArrowUp, Info, RefreshCw, FileText,
  BarChart2, Percent, CreditCard, Smartphone, MessageCircle, Wallet, ArrowRight
} from 'lucide-react';
import { getReports, exportReports } from '../../services/reportsService';
import { message } from 'antd';

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
  const orderStatusOverview = reportData?.orderStatusOverview || {};

  const formatCurrency = (val) => `₹${(val || 0).toLocaleString('en-IN')}`;
  
  const pieDataMap = salesByChannel?.channels?.map(c => ({
    name: c.name,
    value: c.sales,
    pct: `${c.percentage}%`,
    color: c.name === 'Website' ? '#d59441' : c.name === 'Mobile App' ? '#2d2d2d' : c.name === 'Android App' ? '#8b5a2b' : '#e5d3b3'
  })) || [];

  const orderStatusMap = orderStatusOverview?.statuses?.map(s => ({
    name: s.status,
    value: s.orders,
    percentage: s.percentage,
    color: s.status === 'Delivered' ? '#10b981' : s.status === 'Processing' ? '#f59e0b' : s.status === 'Shipped' ? '#d59441' : s.status === 'Cancelled' ? '#dc2626' : '#ef4444'
  })) || [];

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
                <h2 className="stat-value gold-text">{formatCurrency(summary.totalSales)}</h2>
                <div className="stat-bottom">
                  <span className={`stat-change ${summary.salesGrowth >= 0 ? 'positive' : 'negative'}`}>{summary.salesGrowth >= 0 ? '↑' : '↓'} {Math.abs(summary.salesGrowth || 0)}%</span> <span className="stat-change-text">growth</span>
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
                <h2 className="stat-value">{(summary.totalOrders || 0).toLocaleString()}</h2>
                <div className="stat-bottom">
                  <span className={`stat-change ${summary.ordersGrowth >= 0 ? 'positive' : 'negative'}`}>{summary.ordersGrowth >= 0 ? '↑' : '↓'} {Math.abs(summary.ordersGrowth || 0)}%</span> <span className="stat-change-text">growth</span>
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
                <h2 className="stat-value">{(summary.totalCustomers || 0).toLocaleString()}</h2>
                <div className="stat-bottom">
                  <span className={`stat-change ${summary.customersGrowth >= 0 ? 'positive' : 'negative'}`}>{summary.customersGrowth >= 0 ? '↑' : '↓'} {Math.abs(summary.customersGrowth || 0)}%</span> <span className="stat-change-text">growth</span>
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
                <h2 className="stat-value gold-text">{formatCurrency(summary.averageOrderValue)}</h2>
                <div className="stat-bottom">
                  <span className={`stat-change ${summary.averageOrderValueGrowth >= 0 ? 'positive' : 'negative'}`}>{summary.averageOrderValueGrowth >= 0 ? '↑' : '↓'} {Math.abs(summary.averageOrderValueGrowth || 0)}%</span> <span className="stat-change-text">growth</span>
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
                <select value={dateRange.period} onChange={(e) => setDateRange({...dateRange, period: e.target.value})} style={{ background: 'transparent', border: 'none', color: '#c8a883', outline: 'none', cursor: 'pointer' }}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <div style={{ fontSize: '32px', fontWeight: '500', color: '#333' }}>
                {formatCurrency(summary.totalSales)}
              </div>
              <div style={{ fontSize: '20px', color: summary.salesGrowth >= 0 ? '#4caf50' : '#ef4444', display: 'flex', alignItems: 'center', fontWeight: '500' }}>
                {summary.salesGrowth >= 0 ? '↑' : '↓'} {Math.abs(summary.salesGrowth || 0)}%
              </div>
            </div>

            <div className="ra-chart-area" style={{ height: '300px', margin: '0 -24px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaDataWeeklyMap} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSalesWeekly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c19d67" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#c19d67" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eae1d1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b8375' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#8b8375' }} tickFormatter={(val) => val === 0 ? '0' : val >= 1000 ? `${val/1000}K` : val} />
                  <RechartsTooltip formatter={(value) => parseFloat(value).toFixed(2)} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
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
                    <Pie data={pieDataMap} cx="50%" cy="50%" innerRadius="55%" outerRadius="80%" paddingAngle={4} dataKey="value" stroke="none">
                      {pieDataMap.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="ra-legend-list">
                {pieDataMap.map((item, index) => (
                  <div key={index} className="ra-legend-item">
                    <div className="ra-legend-left">
                      <div className="ra-legend-dot" style={{ backgroundColor: item.color }}></div>
                      <div>
                        <div className="ra-legend-name">{item.name}</div>
                        <div className="ra-legend-vals">{formatCurrency(item.value)} <span className="ra-legend-pct">({item.pct})</span></div>
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

          {/* Returns & Refunds */}
          <div className="ra-card">
            <div className="ra-card-icon-header">
              <div className="ra-icon-sm gold"><Package size={16} /></div>
              <h3 className="ra-card-title">Returns & Refunds</h3>
            </div>
            <div className="ra-metric-list">
              <div className="ra-metric-item">
                <span>Returned Orders</span>
                <span>{returnsRefunds.returnedOrders || 0}</span>
              </div>
              <div className="ra-metric-item">
                <span>Refunds</span>
                <span>{formatCurrency(returnsRefunds.refunds)}</span>
              </div>
            </div>
            <div className="ra-metric-highlight highlight-bg-yellow">
              <span>Return Rate</span>
              <span className="highlight-green">{returnsRefunds.returnRate || 0}%</span>
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
                  <div className="ra-cust-val">{customerOverview.newCustomers || 0}</div>
                  <div className="ra-cust-trend"><ArrowUp size={12} className={customerOverview.newCustomersGrowth >= 0 ? "text-green" : "text-red"}/> <span className={customerOverview.newCustomersGrowth >= 0 ? "text-green" : "text-red"}>{Math.abs(customerOverview.newCustomersGrowth || 0)}%</span> growth</div>
                </div>
              </div>
              <div className="ra-cust-divider"></div>
              <div className="ra-cust-block">
                <div className="ra-icon-md light"><Users size={20} /></div>
                <div>
                  <div className="ra-cust-label">Returning Customers</div>
                  <div className="ra-cust-val">{customerOverview.returningCustomers || 0}</div>
                  <div className="ra-cust-trend"><ArrowUp size={12} className={customerOverview.returningCustomersGrowth >= 0 ? "text-green" : "text-red"}/> <span className={customerOverview.returningCustomersGrowth >= 0 ? "text-green" : "text-red"}>{Math.abs(customerOverview.returningCustomersGrowth || 0)}%</span> growth</div>
                </div>
              </div>
              <div className="ra-cust-divider"></div>
              <div className="ra-cust-block">
                <div className="ra-icon-md light"><User size={20} /></div>
                <div>
                  <div className="ra-cust-label">Total Customers</div>
                  <div className="ra-cust-val">{customerOverview.totalCustomers || 0}</div>
                  <div className="ra-cust-trend"><ArrowUp size={12} className={customerOverview.totalCustomersGrowth >= 0 ? "text-green" : "text-red"}/> <span className={customerOverview.totalCustomersGrowth >= 0 ? "text-green" : "text-red"}>{Math.abs(customerOverview.totalCustomersGrowth || 0)}%</span> growth</div>
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
                    <Pie data={orderStatusMap} cx="50%" cy="50%" innerRadius="50%" outerRadius="75%" paddingAngle={2} dataKey="value" stroke="none">
                      {orderStatusMap.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="ra-donut-center-text" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>{(orderStatusOverview.totalOrders || 0).toLocaleString()}</span><br/><small style={{ fontSize: '10px', color: '#888' }}>Total Orders</small>
                </div>
              </div>
              
              <div className="ra-legend-grid" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {orderStatusMap.map((item, index) => (
                  <div className="ra-legend-item-sm" key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                    <div className="ra-legend-dot" style={{ backgroundColor: item.color, width: '8px', height: '8px', borderRadius: '50%' }}></div>
                    <span className="name" style={{ flex: 1, color: '#4b5563' }}>{item.name}</span>
                    <span className="val" style={{ fontWeight: 600, color: '#111827' }}>{item.value} <small style={{ fontWeight: 400, color: '#9ca3af' }}>({item.percentage || 0}%)</small></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ra-order-rates" style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <div className="ra-rate-box" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>Delivered Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#10b981' }}>{orderStatusOverview.deliveredRate || 0}%</div>
              </div>
              <div className="ra-rate-box" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>Cancellation Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#ef4444' }}>{orderStatusOverview.cancellationRate || 0}%</div>
              </div>
              <div className="ra-rate-box" style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid #f3f4f6', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '8px' }}>Return Rate</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#f59e0b' }}>{orderStatusOverview.returnRate || 0}%</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ReportsAnalytics;
