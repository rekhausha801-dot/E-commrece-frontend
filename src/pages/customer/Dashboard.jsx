import React, { useState, useEffect } from 'react';
import { getCustomerAnalyticsApi } from '../../services/api';
import { ShoppingBag, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { message } from 'antd';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const res = await getCustomerAnalyticsApi();
      if (res.data.success) {
        setStats(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching customer dashboard:", error);
      message.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const orderStatusMap = [
    { name: 'Delivered', value: stats.deliveredOrders, color: '#10b981' },
    { name: 'Pending', value: stats.pendingOrders, color: '#f59e0b' },
    { name: 'Cancelled', value: stats.cancelledOrders, color: '#ef4444' }
  ].filter(item => item.value > 0);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading dashboard...</div>;

  return (
    <div className="cust-dashboard-container">
      <h1 className="cust-dashboard-title">My Dashboard</h1>
      <p className="cust-dashboard-subtitle">Welcome back! Here is an overview of your account.</p>

      <div className="cust-dashboard-grid">
        <div className="cust-stat-card">
          <div className="cust-stat-icon gold"><ShoppingBag size={24} /></div>
          <div className="cust-stat-info">
            <span className="cust-stat-label">Total Orders</span>
            <h2 className="cust-stat-val">{stats.totalOrders}</h2>
          </div>
        </div>
        
        <div className="cust-stat-card">
          <div className="cust-stat-icon green"><CreditCard size={24} /></div>
          <div className="cust-stat-info">
            <span className="cust-stat-label">Total Spent</span>
            <h2 className="cust-stat-val">{formatCurrency(stats.totalSpent)}</h2>
          </div>
        </div>

        <div className="cust-stat-card">
          <div className="cust-stat-icon orange"><Clock size={24} /></div>
          <div className="cust-stat-info">
            <span className="cust-stat-label">Pending Orders</span>
            <h2 className="cust-stat-val">{stats.pendingOrders}</h2>
          </div>
        </div>

        <div className="cust-stat-card">
          <div className="cust-stat-icon blue"><CheckCircle size={24} /></div>
          <div className="cust-stat-info">
            <span className="cust-stat-label">Delivered Orders</span>
            <h2 className="cust-stat-val">{stats.deliveredOrders}</h2>
          </div>
        </div>
      </div>

      <div className="cust-charts-grid">
        <div className="cust-chart-card">
          <h3 className="cust-chart-title">Spending History</h3>
          <div className="cust-chart-wrapper">
            {stats.spendingChartData && stats.spendingChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.spendingChartData}>
                  <defs>
                    <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(val) => val === 0 ? '0' : val >= 1000 ? `${val/1000}K` : val} />
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} formatter={(value) => [formatCurrency(value), "Spent"]} />
                  <Area type="monotone" dataKey="spent" stroke="#16a34a" strokeWidth={3} fill="url(#colorSpent)" activeDot={{ r: 6, fill: '#16a34a', stroke: '#fff', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="cust-no-data">No spending history available</div>
            )}
          </div>
        </div>

        <div className="cust-chart-card">
          <h3 className="cust-chart-title">Order Status</h3>
          <div className="cust-donut-wrapper">
            {orderStatusMap.length > 0 ? (
              <>
                <div style={{ flex: 1, position: 'relative', minHeight: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={orderStatusMap} cx="50%" cy="50%" innerRadius="55%" outerRadius="80%" paddingAngle={2} dataKey="value" stroke="none">
                        {orderStatusMap.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="cust-donut-legend">
                  {orderStatusMap.map((item, i) => (
                    <div key={i} className="cust-legend-item">
                      <div className="cust-legend-dot" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name} ({item.value})</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="cust-no-data">No orders to display</div>
            )}
          </div>
        </div>
      </div>

      <div className="cust-recent-orders-card">
        <div className="cust-recent-orders-header">
          <h3 className="cust-chart-title">Recent Orders</h3>
          <Link to="/account/orders" className="cust-view-all">View All</Link>
        </div>
        {stats.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="cust-table-responsive">
            <table className="cust-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order._id}>
                    <td className="cust-order-id">#{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="cust-order-amount">{formatCurrency(order.grandTotal || order.total || order.amount || 0)}</td>
                    <td>
                      <span className={`cust-status-badge ${(order.orderStatus || 'Pending').toLowerCase()}`}>
                        {order.orderStatus || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="cust-no-data">You haven't placed any orders yet.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
