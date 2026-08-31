import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Modal, message } from 'antd';
import { getAdminNotificationsApi, markAllNotificationsAsReadApi, getDashboardAnalyticsApi, getRatingAnalyticsApi } from '../../services/api';
import './Dashboard.css';
import {
  LayoutDashboard, BarChart2, FileText, Settings, Users, PieChart,
  Zap, Search, Bell, Plus, TrendingUp, ShoppingBag, ShoppingCart, User,
  ChevronDown, MoreVertical, Heart, Crown, Calendar, Package, ArrowUpRight,
  Clock, RotateCcw, Truck, CheckCircle2, XCircle, FilePlus, Grid, Upload, Send, Menu,
  AlertTriangle, Star, ThumbsUp, ArrowRight, AlertCircle, Hourglass,
  SearchCheckIcon, Trophy, ChevronRight, CreditCard,
  SearchCode,
  SearchCheck,
  SearchCodeIcon,
  SearchSlash,
  SearchIcon,
  DollarSign, MoreHorizontal, Shirt, Lock, Shield, Activity, HelpCircle, LogOut, Globe, Headphones, IndianRupee, ArrowUp, ArrowDown
} from 'lucide-react';
import ProductManagement from './ProductManagement';
import CategoryManagement from './CategoryManagement';
import OrderManagement from './OrderManagement';
import CouponManagement from './CouponManagement';
import ReviewManagement from './ReviewManagement';
import WebsiteSetting from './WebsiteSetting';
import ActivityLogManagement from './ActivityLogManagement';
import HelpSupport from './HelpSupport';
import NotificationManagement, { initialNotifications } from './NotificationManagement';
import { mockProducts } from './ProductManagement';

import BrandManagement from './BrandManagement';
import CustomerManagement from './CustomerManagement';
import BannerManagement from './BannerManagement';
import ReportsAnalytics from './ReportsAnalytics';
import fashionnImage from '../../assets/banners/fashionn.png';
import './ReportsAnalytics.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart,
  PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, LabelList
} from 'recharts';



const revenueData = [
  { name: 'May 18', revenue: 200 },
  { name: 'May 19', revenue: 350 },
  { name: 'May 20', revenue: 520 },
  { name: 'May 21', revenue: 380 },
  { name: 'May 22', revenue: 650 },
  { name: 'May 23', revenue: 780 },
  { name: 'May 24', revenue: 1000 },
];

const sparklineTotalRevenue = [{ v: 4 }, { v: 3 }, { v: 6 }, { v: 4 }, { v: 7 }, { v: 9 }, { v: 12 }];
const sparklineTotalOrders = [{ v: 1 }, { v: 2 }, { v: 1 }, { v: 3 }, { v: 2 }, { v: 3 }, { v: 2 }];
const sparklineTotalCustomers = [{ v: 2 }, { v: 3 }, { v: 2 }, { v: 4 }, { v: 3 }, { v: 5 }, { v: 4 }];
const sparklineTotalProducts = [{ v: 1 }, { v: 2 }, { v: 2 }, { v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }];

const topCategoriesData = [
  { name: 'Women', value: 8, color: '#8c673d' },
  { name: 'Men\'s Wear', value: 5, color: '#dfbc88' },
  { name: 'Accessories', value: 3, color: '#b98e54' },
  { name: 'Footwear', value: 2, color: '#eedda8' },
  { name: 'Others', value: 1, color: '#1f1f1f' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('adminActiveTab') || 'Dashboard';
  });
  const [settingsTab, setSettingsTab] = useState('Security');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [revenueFilterLabel, setRevenueFilterLabel] = useState('Last 7 Days');
  const [categoriesFilterLabel, setCategoriesFilterLabel] = useState('Last 6 Months');
  const [dashboardData, setDashboardData] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoadingAnalytics(true);
      try {
        const [dashRes, ratingRes] = await Promise.all([
          getDashboardAnalyticsApi(),
          getRatingAnalyticsApi()
        ]);
        if (dashRes.data?.success) setDashboardData(dashRes.data.data);
        if (ratingRes.data?.success) setRatingData(ratingRes.data.data);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
        message.error('Failed to load dashboard data');
      } finally {
        setIsLoadingAnalytics(false);
      }
    };
    fetchAnalytics();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('adminActiveTab', activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    const fetchAdminNotifications = async () => {
      try {
        const res = await getAdminNotificationsApi();
        if (res.data?.success) {
          setNotifications(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch admin notifications:', err);
      }
    };
    fetchAdminNotifications();
  }, []);

  React.useEffect(() => {
    if (activeTab === 'Notifications') {
      const hasUnread = notifications.some(n => n.unread !== false);
      if (hasUnread) {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
        markAllNotificationsAsReadApi().catch(console.error);
      }
    }
  }, [activeTab, notifications]);

  const getRevenueValue = () => {
    return `₹${dashboardData?.kpis?.totalRevenue?.toLocaleString('en-IN') || '0'}`;
  };

  const getRevenuePercentage = () => {
    return '↑ 12.5%';
  };

  const unreadCount = notifications.filter(n => n.unread !== false).length;

  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    role: 'Super Admin',
    email: 'admin@relietech.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
  });

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAdminProfile({
          name: user.fullName || 'Admin User',
          role: user.role === 'admin' ? 'Super Admin' : user.role || 'Admin',
          email: user.email || 'admin@relietech.com',
          avatar: user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'Admin')}&background=random`
        });
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const adminMenu = {
    items: [
      {
        key: 'header',
        label: (
          <div style={{ padding: '8px 4px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src={adminProfile.avatar} alt="Admin" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }} />
            <div>
              <div style={{ fontWeight: '700', fontSize: '15px', color: '#111827', marginBottom: '2px' }}>{adminProfile.name}</div>
              <div style={{ fontSize: '12px', color: '#c9a05b', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{adminProfile.role}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '2px' }}>{adminProfile.email}</div>
            </div>
          </div>
        ),
      },
      { type: 'divider' },
      { key: 'profile', label: <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}><User size={16} color="#4b5563" /> <span style={{ fontWeight: 500, color: '#374151' }}>My Profile</span></div>, onClick: () => { setActiveTab('Settings'); setSettingsTab('Security'); } },
      { type: 'divider' },
      {
        key: 'notifications', label: <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0', justifyContent: 'space-between', width: '200px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Bell size={16} color="#4b5563" /> <span style={{ fontWeight: 500, color: '#374151' }}>Notifications</span></div>
          {unreadCount > 0 && <span style={{ background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>{unreadCount}</span>}
        </div>,
        onClick: () => setActiveTab('Notifications')
      },
      { key: 'activity', label: <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}><Activity size={16} color="#4b5563" /> <span style={{ fontWeight: 500, color: '#374151' }}>Activity Log</span></div>, onClick: () => setActiveTab('ActivityLog') },
      { type: 'divider' },
      { key: 'help', label: <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0' }}><HelpCircle size={16} color="#4b5563" /> <span style={{ fontWeight: 500, color: '#374151' }}>Help & Support</span></div>, onClick: () => setActiveTab('HelpSupport') },
      { type: 'divider' },
      { key: 'logout', label: <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 0', color: '#ef4444' }}><LogOut size={16} /> <span style={{ fontWeight: 600 }}>Logout</span></div>, onClick: () => setIsLogoutModalVisible(true) },
    ]
  };

  const handleSearchChange = (e) => { setGlobalSearch(e.target.value) };

  const searchResults = globalSearch.length > 0 ? {
    products: mockProducts.filter(p => p.name.toLowerCase().includes(globalSearch.toLowerCase()) || p.sku.toLowerCase().includes(globalSearch.toLowerCase())).slice(0, 3),
    orders: []
  } : null;

  return (
    <div className={`dashboard-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar - KEEP UNCHANGED */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <div className="logo-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Crown size={24} color="#c9a05b" strokeWidth={2} />
              <h2 style={{ margin: 0 }}>RELIETECH</h2>
            </div>
            <p style={{ marginTop: '2px' }}>PREMIUM FASHION</p>
          </div>

          <nav className="sidebar-nav">
            <button className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}><LayoutDashboard size={18} className="nav-icon" /> <span className="nav-text">Dashboard</span></button>
            <button className={`nav-item ${activeTab === 'Products' ? 'active' : ''}`} onClick={() => setActiveTab('Products')}><Package size={18} className="nav-icon" /> <span className="nav-text">Products</span></button>
            <button className={`nav-item ${activeTab === 'Categories' ? 'active' : ''}`} onClick={() => setActiveTab('Categories')}><Grid size={18} className="nav-icon" /> <span className="nav-text">Categories</span></button>
            <button className={`nav-item ${activeTab === 'Brands' ? 'active' : ''}`} onClick={() => setActiveTab('Brands')}><Zap size={18} className="nav-icon" /> <span className="nav-text">Brands</span></button>
            <button className={`nav-item ${activeTab === 'Orders' ? 'active' : ''}`} onClick={() => setActiveTab('Orders')}><ShoppingCart size={18} className="nav-icon" /> <span className="nav-text">Orders</span></button>
            <button className={`nav-item ${activeTab === 'Customers' ? 'active' : ''}`} onClick={() => setActiveTab('Customers')}><Users size={18} className="nav-icon" /> <span className="nav-text">Customers</span></button>
            <button className={`nav-item ${activeTab === 'Coupons' ? 'active' : ''}`} onClick={() => setActiveTab('Coupons')}><Zap size={18} className="nav-icon" /> <span className="nav-text">Coupons</span></button>
            <button className={`nav-item ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => setActiveTab('Reviews')}><Settings size={18} className="nav-icon" /> <span className="nav-text">Reviews</span></button>
            <button className={`nav-item ${activeTab === 'Banners' ? 'active' : ''}`} onClick={() => setActiveTab('Banners')}><FileText size={18} className="nav-icon" /> <span className="nav-text">Banners</span></button>
            <button className={`nav-item ${activeTab === 'Reports' ? 'active' : ''}`} onClick={() => setActiveTab('Reports')}><PieChart size={18} className="nav-icon" /> <span className="nav-text">Reports</span></button>
            <button className={`nav-item ${activeTab === 'Notifications' ? 'active' : ''}`} onClick={() => setActiveTab('Notifications')}><Bell size={18} className="nav-icon" /> <span className="nav-text">Notifications</span></button>
            <button className={`nav-item ${activeTab === 'HelpSupport' ? 'active' : ''}`} onClick={() => setActiveTab('HelpSupport')}><Headphones size={18} className="nav-icon" /> <span className="nav-text">Help Support</span></button>
            <button className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}><Settings size={18} className="nav-icon" /> <span className="nav-text">Settings</span></button>
          </nav>
        </div>

        <div>
          <div className="sidebar-bottom">
            <div className="elevate-card">
              <h4>Elevate<br />Your Store</h4>
              <p>Manage. Grow.<br />Succeed.</p>
              <button className="elevate-btn" onClick={() => setActiveTab('Reports')}>View Insights →</button>
            </div>
          </div>
          <div className="sidebar-footer">
            <p style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}>© 2024 RELIETECH. All rights reserved.</p>
          </div>
        </div>
      </aside>


      <main className="dashboard-main">

        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}><Menu size={20} color="#a07d4b" /></button>
            <div className="header-title-wrap">
              <h2>Dashboard</h2>
              <div className="breadcrumbs">

              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="search-bar" style={{ position: 'relative' }}>
              <Search size={16} color="#c9a05b" className="search-icon" />
              <input
                type="text"
                placeholder="Search products, orders..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
              />

              {globalSearch && searchResults && (
                <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: '#fff', borderRadius: '12px', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', border: '1px solid #e5e7eb', zIndex: 100, marginTop: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {searchResults.products.length > 0 && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>Products</div>
                      {searchResults.products.map(p => (
                        <div key={p.id} onClick={() => { setGlobalSearch(''); setActiveTab('Products'); }} style={{ padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                          <Package size={14} color="#6b7280" />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{p.name}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280' }}>{p.sku}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.orders.length > 0 && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>Orders</div>
                      {searchResults.orders.map(o => (
                        <div key={o.id} onClick={() => { setGlobalSearch(''); setActiveTab('Orders'); }} style={{ padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                          <ShoppingCart size={14} color="#6b7280" />
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{o.id} - {o.customer}</div>
                            <div style={{ fontSize: '11px', color: '#6b7280' }}>{o.amount}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {searchResults.products.length === 0 && searchResults.orders.length === 0 && (
                    <div style={{ padding: '16px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>No results found for "{globalSearch}"</div>
                  )}
                </div>
              )}
            </div>

            <div className="notification-icon" onClick={() => setActiveTab('Notifications')} style={{ cursor: 'pointer' }}>
              <Bell size={20} color="#333" />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </div>

            <Dropdown menu={adminMenu} trigger={['click']} placement="bottomRight" arrow={{ pointAtCenter: true }}>
              <div className="admin-profile" style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '30px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                <img src={adminProfile.avatar} alt="Admin" />
                <div className="admin-info">
                  <span className="admin-name">{adminProfile.name}</span>
                  <span className="admin-role">{adminProfile.role}</span>
                </div>
                <ChevronDown size={16} color="#888" />
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Content Area */}
        {activeTab === 'Dashboard' && (
          <>
            {/* Welcome Banner */}
            <div style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '32px', overflow: 'hidden', backgroundColor: '#eaddce', marginBottom: '32px', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>

              {/* The Girl Image (Positioned on the right) */}
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', backgroundImage: `url(${fashionnImage})`, backgroundSize: 'cover', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat', borderTopLeftRadius: '400px 240px', borderBottomLeftRadius: '400px 240px' }}></div>

              {/* Gradient Overlay for Text Readability */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(234,221,206,1) 0%, rgba(234,221,206,0.95) 35%, rgba(234,221,206,0.7) 50%, rgba(234,221,206,0) 80%)' }}></div>


              <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                {/* Top row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#1a1614', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                      <Shirt size={22} color="#c8a883" />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#a08561', letterSpacing: '2px' }}>FASHION STORE</span>
                  </div>

                  <div style={{ backgroundColor: 'rgba(26,22,20,0.9)', backdropFilter: 'blur(10px)', padding: '10px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <Calendar size={16} color="#c8a883" />
                    <span style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>May 28, 2025</span>
                  </div>
                </div>

                {/* Middle Welcome Text */}
                <div style={{ marginTop: '10px' }}>
                  <h1 style={{ fontFamily: '"Inter", sans-serif', fontSize: '56px', fontWeight: '400', color: '#1a1614', margin: 0, lineHeight: '1.15' }}>
                    Welcome,<br />{adminProfile.name.split(' ')[0]}
                  </h1>
                  <p style={{ fontSize: '17px', color: '#685c53', marginTop: '16px', maxWidth: '300px', lineHeight: '1.5' }}>
                    Here's what's happening with your store today.
                  </p>
                </div>

                {/* Bottom Section */}
                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end', marginTop: 'auto' }}>
                  {/* Stats Card */}
                  <div style={{ backgroundColor: '#211d1b', borderRadius: '24px', padding: '24px 32px', display: 'flex', gap: '32px', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingBag size={20} color="#c8a883" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>{dashboardData?.kpis?.totalOrders || '0'}</div>
                        <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Total Orders</div>
                      </div>
                    </div>

                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={20} color="#c8a883" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>{dashboardData?.kpis?.totalProducts || '0'}</div>
                        <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Products</div>
                      </div>
                    </div>

                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={20} color="#c8a883" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>{dashboardData?.kpis?.totalCustomers || '0'}</div>
                        <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Customers</div>
                      </div>
                    </div>

                    <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <DollarSign size={20} color="#c8a883" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>₹{dashboardData?.kpis?.totalRevenue?.toLocaleString('en-IN') || '0'}</div>
                        <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Total Sales</div>
                      </div>
                    </div>
                  </div>

                  {/* View Dashboard Button */}
                  <button style={{ background: 'linear-gradient(90deg, #d8ab79 0%, #c4945d 100%)', color: '#211d1b', border: 'none', padding: '18px 28px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', fontWeight: '600', fontSize: '15px', height: 'fit-content', marginBottom: '8px' }} onClick={() => setActiveTab('Reports')}>
                    <Grid size={18} />
                    View Dashboard
                    <ArrowRight size={18} />
                  </button>
                </div>

              </div>

              {/* Floating Total Sales Chart Card */}
              <div style={{ position: 'absolute', right: '48px', bottom: '48px', backgroundColor: '#f0e6d8', borderRadius: '24px', padding: '24px', width: '320px', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: '#8a7d73', fontWeight: '500' }}>Total Sales</span>
                  <MoreHorizontal size={20} color="#8a7d73" />
                </div>
                <div style={{ fontSize: '32px', fontFamily: '"Inter", sans-serif', color: '#1a1614', marginBottom: '16px', fontWeight: '400' }}>
                  ₹{dashboardData?.kpis?.totalRevenue?.toLocaleString('en-IN') || '0'}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '60px' }}>
                  <div style={{ backgroundColor: '#e2efdf', color: '#4a823b', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start' }}>
                    <ArrowUpRight size={14} strokeWidth={3} /> 18.6% this week
                  </div>

                  <div style={{ width: '120px', height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparklineTotalRevenue}>
                        <defs>
                          <linearGradient id="glowSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c8a883" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#c8a883" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="v" stroke="#b6916a" strokeWidth={3} fill="url(#glowSales)" dot={{ r: 3, fill: '#b6916a', strokeWidth: 0 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-grid" style={{ marginBottom: '32px' }}>
              <div className="stat-card dark">
                <div className="stat-top">
                  <div className="stat-icon gold"><span style={{ fontSize: '18px', fontWeight: 'bold' }}>₹</span></div>
                  <div className="stat-info">
                    <span className="stat-title">Total Revenue</span>
                    <h2 className="stat-value gold-text">₹{dashboardData?.kpis?.totalRevenue?.toLocaleString('en-IN') || '0'}</h2>
                    <div className="stat-bottom">
                      <span className="stat-change positive">↑ 12.5%</span> <span className="stat-change-text">vs yesterday</span>
                    </div>
                  </div>
                </div>
                <div className="stat-chart-sparkline">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineTotalOrders}>
                      <defs>
                        <linearGradient id="glowDark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDark)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="stat-card light">
                <div className="stat-top">
                  <div className="stat-icon gold"><ShoppingBag size={18} color="#554422" /></div>
                  <div className="stat-info">
                    <span className="stat-title">Total Orders</span>
                    <h2 className="stat-value">{dashboardData?.kpis?.totalOrders || '0'}</h2>
                    <div className="stat-bottom">
                      <span className="stat-change positive">↑ 18</span> <span className="stat-change-text">new today</span>
                    </div>
                  </div>
                </div>
                <div className="stat-chart-sparkline">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineTotalCustomers}>
                      <defs>
                        <linearGradient id="glowLight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLight)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="stat-card light">
                <div className="stat-top">
                  <div className="stat-icon gold"><Users size={18} color="#554422" /></div>
                  <div className="stat-info">
                    <span className="stat-title">Total Customers</span>
                    <h2 className="stat-value">{dashboardData?.kpis?.totalCustomers || '0'}</h2>
                    <div className="stat-bottom">
                      <span className="stat-change positive">↑ 35</span> <span className="stat-change-text">new today</span>
                    </div>
                  </div>
                </div>
                <div className="stat-chart-sparkline">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineTotalProducts}>
                      <defs>
                        <linearGradient id="glowLight" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLight)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="stat-card dark">
                <div className="stat-top">
                  <div className="stat-icon gold"><Package size={18} color="#c9a05b" /></div>
                  <div className="stat-info">
                    <span className="stat-title">Total Products</span>
                    <h2 className="stat-value gold-text">{dashboardData?.kpis?.totalProducts || '0'}</h2>
                    <div className="stat-bottom">
                      <span className="stat-change negative">{dashboardData?.lowStockAlerts?.length || '0'}</span> <span className="stat-change-text">low stock items</span>
                    </div>
                  </div>
                </div>
                <div className="stat-chart-sparkline">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineTotalProducts}>
                      <defs>
                        <linearGradient id="glowDark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDark)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="middle-grid">

              <div className="dashboard-card premium-glass-card">
                <div className="card-header">
                  <h3>Revenue Overview</h3>
                  <Dropdown trigger={['click']} menu={{
                    items: [{ key: 'Today', label: 'Today' }, { key: 'Last 7 Days', label: 'Last 7 Days' }, { key: 'Last 30 Days', label: 'Last 30 Days' }, { key: 'This Year', label: 'This Year' }],
                    onClick: ({ key }) => setRevenueFilterLabel(key)
                  }}>
                    <button style={{ background: 'linear-gradient(180deg, #2a2a2a 0%, #111 100%)', border: '1px solid #444', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', color: '#e5c07b', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.5px' }}>{revenueFilterLabel} <ChevronDown size={12} /></button>
                  </Dropdown>
                </div>
                <div className="card-sub-header">
                  <h2>{getRevenueValue()} <span className="stat-change positive text-sm">{getRevenuePercentage()}</span></h2>
                </div>
                <div className="revenue-chart-container" style={{ height: '250px', marginTop: '20px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} tickFormatter={(value) => `${value === 0 ? '0' : value / 1000 + 'K'}`} />
                      <RechartsTooltip cursor={{ stroke: '#e0e0e0', strokeWidth: 1, strokeDasharray: '4 4' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#c9a05b" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" dot={{ r: 4, fill: '#c9a05b', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#fff', stroke: '#c9a05b', strokeWidth: 2 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>


              <div className="dashboard-card premium-glass-card">
                <div className="card-header">
                  <h3>Orders Overview</h3>
                  <button style={{ background: 'transparent', border: '1px solid #d5b97d', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#9c7324', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.5px' }} onClick={() => setActiveTab('Orders')}>View All <ArrowRight size={12} /></button>
                </div>
                <div className="donut-chart-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>

                  <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={(dashboardData?.orderStatusBreakdown?.length > 0 ? dashboardData.orderStatusBreakdown : [{_id:'No Orders', count:1}]).map(item => ({ name: item._id, value: item.count, color: item._id === 'Pending' ? '#8c673d' : item._id === 'Processing' ? '#1f1f1f' : item._id === 'Shipped' ? '#b98e54' : item._id === 'No Orders' ? '#f0f0f0' : '#dfbc88' })) || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={78}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="none"
                        >
                          {(dashboardData?.orderStatusBreakdown?.length > 0 ? dashboardData.orderStatusBreakdown : [{_id:'No Orders', count:1}]).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry._id === 'Pending' ? '#8c673d' : entry._id === 'Processing' ? '#1f1f1f' : entry._id === 'Shipped' ? '#b98e54' : entry._id === 'No Orders' ? '#eaeaea' : '#dfbc88'} />
                          ))}
                        </Pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>

                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#222', lineHeight: '1' }}>{dashboardData?.kpis?.totalOrders || 0}</span>
                      <span style={{ fontSize: '10px', color: '#888', marginTop: '4px', lineHeight: '1' }}>Orders</span>
                    </div>
                  </div>

                  <div className="donut-legend-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '24px' }}>
                    {(dashboardData?.orderStatusBreakdown?.length > 0 ? dashboardData.orderStatusBreakdown : [{_id:'No Orders', count:1}]).map((item, index) => {
                      const percentage = dashboardData?.kpis?.totalOrders > 0 ? Math.round((item.count / dashboardData.kpis.totalOrders) * 100) : 0;
                      const color = item._id === 'Pending' ? '#8c673d' : item._id === 'Processing' ? '#1f1f1f' : item._id === 'Shipped' ? '#b98e54' : '#dfbc88';
                      return (
                        <div className="legend-item" key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: color }}></div>
                            <span style={{ fontSize: '12px', color: '#444' }}>{item._id}</span>
                          </div>
                          <span style={{ fontSize: '12px', fontWeight: '500', color: '#222' }}>{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>


            </div>

            {/* Cloth-wise Rating Breakdown Widget */}
            <div className="premium-glass-card" style={{ marginBottom: '32px', padding: '24px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, color: '#222' }}>Cloth-wise Rating Breakdown</h3>
                <span style={{ fontSize: '12px', color: '#666', background: '#f5f5f5', padding: '4px 10px', borderRadius: '20px' }}>Based on verified reviews</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #eaeaea' }}>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600' }}>Product (Cloth)</th>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>Total Reviews</th>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>5 Star (%)</th>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>4 Star (%)</th>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>3 Star (%)</th>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>2 Star (%)</th>
                      <th style={{ padding: '12px', color: '#888', fontSize: '12px', fontWeight: '600', textAlign: 'center' }}>1 Star (%)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratingData.length > 0 ? ratingData.map((item) => (
                      <tr key={item.productId} style={{ borderBottom: '1px solid #f9f9f9', transition: 'background 0.2s' }}>
                        <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                          {item.productImage ? (
                            <img src={item.productImage} alt={item.productName} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Shirt size={16} color="#999" /></div>
                          )}
                          <span style={{ fontWeight: '600', fontSize: '13px', color: '#222' }}>{item.productName}</span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '500', color: '#555' }}>{item.totalReviews}</td>
                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#10b981' }}>{item.percentages[5]}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#84cc16' }}>{item.percentages[4]}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#f59e0b' }}>{item.percentages[3]}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#f97316' }}>{item.percentages[2]}%</td>
                        <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#ef4444' }}>{item.percentages[1]}%</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" style={{ padding: '24px', textAlign: 'center', color: '#888', fontSize: '13px' }}>No review data available yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="new-layout-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '20px' }}>


              {/* Recent Orders (Span 8) */}
              <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Low Stock Alert Custom Bar Chart */}
                <div className="premium-glass-card" style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#222', letterSpacing: '-0.3px' }}>Low Stock Alert</h3>
                  </div>
                  <div style={{ height: '240px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '56px', boxSizing: 'border-box' }}>
                    {/* Premium Threshold Line */}
                    <div style={{ position: 'absolute', bottom: '71px', left: '8%', right: '8%', borderBottom: '1px dashed rgba(201, 160, 91, 0.5)', zIndex: 1 }}></div>

                    {(dashboardData?.lowStockAlerts || []).slice(0, 4).map((item, idx) => {
                      const max = 40;
                      const percent = Math.min((item.countInStock / max) * 100, 100);
                      const isLow = item.countInStock < 10;
                      const themeBarColor = isLow ? 'linear-gradient(135deg, #e87e74 0%, #c84b41 100%)' : 'linear-gradient(135deg, #e3c18b 0%, #b98e54 100%)';
                      const glowColor = isLow ? 'rgba(200, 75, 65, 0.35)' : 'rgba(201, 160, 91, 0.35)';

                      return (
                        <div key={item._id || idx} className="floating-lite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, height: '100%', justifyContent: 'flex-end', position: 'relative', animationDelay: `${idx * 0.3}s` }}>
                          {/* Top Badge */}
                          <div className="premium-glass-card" style={{ backgroundColor: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '6px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', zIndex: 3, marginBottom: '-12px', position: 'relative' }}>
                            <span style={{ fontSize: '15px', fontWeight: '800', color: isLow ? '#c84b41' : '#b98e54', lineHeight: '1' }}>{item.countInStock}</span>
                            <span style={{ fontSize: '9px', color: '#888', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Units</span>
                          </div>

                          {/* Bar Background Container */}
                          <div style={{ position: 'relative', width: '44px', height: '140px', backgroundColor: '#f9f9f9', borderRadius: '22px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                            {/* Fill */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: `${percent}%`, background: themeBarColor, borderRadius: '22px', transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: `0 0 15px ${glowColor}` }}>
                              {/* Inner Highlight */}
                              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '4px', background: 'rgba(255,255,255,0.6)', borderRadius: '4px' }}></div>
                              <div style={{ position: 'absolute', top: 0, bottom: 0, left: '2px', width: '4px', background: 'linear-gradient(90deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)', borderRadius: '4px' }}></div>
                            </div>
                            {/* 3D Glass overlay */}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.05) 100%)', borderRadius: '22px', pointerEvents: 'none' }}></div>
                          </div>

                          {/* Bottom Image and Label */}
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'absolute', bottom: '-64px' }}>
                            <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: isLow ? '2px solid rgba(200, 75, 65, 0.2)' : '2px solid rgba(201, 160, 91, 0.2)' }}>
                              <img src={item.images?.[0]?.url || 'https://via.placeholder.com/100'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: '600', color: '#444', marginTop: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80px' }}>{item.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ backgroundColor: '#fdfbf7', padding: '24px', borderRadius: '16px', border: '1px solid #f5eee3', display: 'flex', flexDirection: 'column', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#f8f9fa', border: '1px solid #eee', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ShoppingBag size={20} strokeWidth={1.5} />
                      </div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', margin: 0 }}>Recent Orders</h3>
                    </div>
                    <button onClick={() => setActiveTab('Orders')} style={{ background: '#fff', border: '1px solid #eaeaea', padding: '8px 16px', borderRadius: '24px', fontSize: '13px', fontWeight: '600', color: '#444', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                      View All <ArrowRight size={14} color="#888" />
                    </button>
                  </div>

                  {/* Table */}
                  <div className="hide-scrollbar" style={{ overflowX: 'auto' }}>
                    <table style={{ width: '160%', borderCollapse: 'collapse', whiteSpace: 'nowrap', tableLayout: 'fixed' }}>
                      <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#fff' }}>
                        <tr>
                          <th style={{ width: '15%', textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Order ID</th>
                          <th style={{ width: '20%', textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Customer</th>
                          <th style={{ width: '25%', textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Product</th>
                          <th style={{ width: '20%', textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Amount</th>
                          <th style={{ width: '20%', textAlign: 'center', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(dashboardData?.recentOrders || []).map((order, i) => (
                          <tr key={order._id || i} style={{ backgroundColor: i % 2 !== 0 ? '#f8f9fa' : '#fff' }}>
                            <td style={{ padding: '20px 24px', fontSize: '15px', fontWeight: '700', color: '#111' }}>
                              #{order._id?.substring(order._id.length - 6).toUpperCase()}
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <span style={{ fontSize: '15px', fontWeight: '600', color: '#222' }}>{order.customer?.customerId?.name || 'Guest'}</span>
                              </div>
                            </td>
                            <td style={{ padding: '20px 24px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Package size={16} color="#888" /></div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <span style={{ fontSize: '15px', fontWeight: '600', color: '#222' }}>Order items</span>
                                  <span style={{ fontSize: '13px', color: '#888' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '20px 24px', textAlign: 'left', fontSize: '15px', fontWeight: '700', color: '#111' }}>
                              ₹{order.grandTotal?.toLocaleString('en-IN')}
                            </td>
                            <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                              <span style={{
                                padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                                backgroundColor: order.orderStatus === 'Delivered' ? '#e8f5e9' : order.orderStatus === 'Processing' ? '#fff4e5' : order.orderStatus === 'Pending' ? '#fff4e5' : '#ffebee',
                                color: order.orderStatus === 'Delivered' ? '#2e7d32' : order.orderStatus === 'Processing' ? '#d97706' : order.orderStatus === 'Pending' ? '#d97706' : '#d32f2f'
                              }}>{order.orderStatus}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>


              </div>

              <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="premium-glass-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#333' }}>Top Categories</h3>
                    <Dropdown trigger={['click']} menu={{
                      items: [{ key: 'Last 7 Days', label: 'Last 7 Days' }, { key: 'Last 30 Days', label: 'Last 30 Days' }, { key: 'Last 6 Months', label: 'Last 6 Months' }, { key: 'This Year', label: 'This Year' }],
                      onClick: ({ key }) => setCategoriesFilterLabel(key)
                    }}>
                      <button style={{ background: '#fff', border: '1px solid #eee', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#555', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>{categoriesFilterLabel} <ChevronDown size={12} /></button>
                    </Dropdown>
                  </div>
                  <div style={{ height: '220px', width: '100%', marginTop: '16px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topCategoriesData.slice(0, 4)} margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} tickFormatter={(val) => `${val}%`} />
                        <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
                          {topCategoriesData.slice(0, 4).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#c9a05b', '#8c673d', '#1f1f1f'][index % 3]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Notifications Premium Design - Light Theme */}
                <div style={{ flex: 1, backgroundColor: '#fff', border: '1px solid #f0ead6', padding: '24px', borderRadius: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                  
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', fontFamily: '"Inter", sans-serif', margin: 0, color: '#111', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Bell size={18} color="#c9a05b" /> Notifications
                    </h3>
                    <button onClick={() => setActiveTab('Notifications')} style={{ background: '#fffcf6', border: '1px solid #f4e8d3', padding: '6px 14px', borderRadius: '20px', color: '#c9a05b', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s' }}>
                      View All
                    </button>
                  </div>

                  {/* List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {(notifications || []).slice(0, 4).map((notif, index) => {
                      const Icon = Bell;

                      let iconColor = '#6b7280';
                      let bgColor = '#f3f4f6';
                      let dotColor = '#6b7280';
                      const titleLower = notif.title.toLowerCase();
                      
                      if (titleLower.includes('order') || titleLower.includes('received')) {
                        iconColor = '#c9a05b'; 
                        bgColor = '#fffbf2';
                        dotColor = '#c9a05b';
                      } else if (titleLower.includes('alert') || titleLower.includes('warning') || titleLower.includes('return')) {
                        iconColor = '#ef4444'; 
                        bgColor = '#fef2f2';
                        dotColor = '#ef4444';
                      } else if (titleLower.includes('registered')) {
                        iconColor = '#8b5cf6'; 
                        bgColor = '#f5f3ff';
                        dotColor = '#8b5cf6';
                      } else if (titleLower.includes('payment')) {
                        iconColor = '#10b981';
                        bgColor = '#ecfdf5';
                        dotColor = '#10b981';
                      }

                      return (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#fff', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s ease', border: '1px solid #f3f4f6', position: 'relative', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }} className="dashboard-notif-card">
                          

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: bgColor, color: iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <Icon size={18} strokeWidth={2} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {index < 2 && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: dotColor }}></div>}
                                <span style={{ fontSize: '14px', fontWeight: index < 2 ? '700' : '600', fontFamily: '"Inter", sans-serif', color: '#111', letterSpacing: '-0.2px' }}>{notif.title}</span>
                              </div>
                              <span style={{ fontSize: '12px', color: '#888', fontWeight: '500', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={10} color="#aaa" /> {notif.time}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {index === 0 && <span style={{ fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', background: '#fef3dd', color: '#d97706' }}>Medium</span>}
                            {index === 1 && <span style={{ fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px', background: '#fce8eb', color: '#e75b75' }}>High</span>}
                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }} className="arrow-btn">
                              <ArrowUpRight size={14} color="#6b7280" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: '1fr 1fr 0.7fr', gap: '24px', marginTop: '4px' }}>
                {/* New Arrivals */}
                <div className="premium-glass-card" style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', height: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#333' }}>New Arrivals</h3>
                    <button className="premium-view-btn">View All <ArrowRight size={14} /></button>
                  </div>

                  <div className="hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                    {(dashboardData?.topSellingProducts || []).slice(0, 3).map((item, index, arr) => (
                      <div key={item._id || index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: index !== arr.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <img src={item.images?.[0]?.url || 'https://via.placeholder.com/100'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                            <span style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.category || 'Clothing'}</span>
                          </div>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: '#333' }}>
                            ₹{item.price?.toLocaleString('en-IN') || 0}
                          </span>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', backgroundColor: '#fcf6eb' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#f57c00' }}></div>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#e65100' }}>{item.badge || 'Trending'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Middle: Rating */}
                <div className="premium-glass-card" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#333', margin: '0 0 4px 0' }}>Your Rating</h3>
                  <p style={{ fontSize: '12px', color: '#888', margin: '0 0 16px 0' }}>What people feel and comment</p>
                  <div className="rating-container" style={{ position: 'relative', height: '140px', width: '100%' }}>
                    {/* Large Circle */}
                    <div className="rating-circle-1" style={{ position: 'absolute', right: '5px', top: '10px', width: '110px', height: '110px', borderRadius: '50%', backgroundColor: '#5c3a21', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 1 }}>
                      <span style={{ fontSize: '22px', fontWeight: '500' }}>85%</span>
                      <span style={{ fontSize: '11px', fontWeight: '400' }}>Fabric Quality</span>
                    </div>
                    {/* Medium Circle */}
                    <div className="rating-circle-2" style={{ position: 'absolute', left: '20px', top: '0px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#b58c70', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 2, opacity: 0.9 }}>
                      <span style={{ fontSize: '18px', fontWeight: '500' }}>85%</span>
                      <span style={{ fontSize: '10px', fontWeight: '400' }}>Fit & Comfort</span>
                    </div>
                    {/* Small Circle */}
                    <div className="rating-circle-3" style={{ position: 'absolute', left: '0px', bottom: '15px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#835334', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 3, opacity: 0.9 }}>
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>92%</span>
                      <span style={{ fontSize: '9px', fontWeight: '400' }}>Packaging</span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Exact Image Match Card */}
                <div className="premium-glass-card" style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)',
                  height: '100%',
                  backgroundColor: '#0a0a0a',
                  border: '1px solid #222',
                  position: 'relative'
                }}>
                  {/* Exact Image Match Background */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0f0f0f', zIndex: 0 }}></div>

                  {/* Top Right Blob */}
                  <div style={{ position: 'absolute', top: '-15%', right: '-25%', width: '70%', height: '55%', background: 'linear-gradient(145deg, #e3c498, #967551)', borderRadius: '40% 40% 60% 40%', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', pointerEvents: 'none', zIndex: 1 }}></div>

                  {/* Bottom Right Blob */}
                  <div style={{ position: 'absolute', bottom: '-20%', right: '-35%', width: '100%', height: '80%', background: 'linear-gradient(145deg, #c4a17a, #876847)', borderRadius: '60% 30% 20% 60%', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', pointerEvents: 'none', zIndex: 1 }}></div>

                  {/* Left/Bottom Flowing Dark Shape (creates the central black path) */}
                  <div style={{ position: 'absolute', bottom: '-40%', left: '-30%', width: '90%', height: '90%', background: '#0a0a0a', borderRadius: '40% 60% 40% 50%', boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.24)', pointerEvents: 'none', zIndex: 1 }}></div>

                  <div style={{ padding: '20px 20px', position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <h3 style={{
                      margin: '0',
                      fontSize: '24px',
                      color: '#ffffff',
                      lineHeight: '1.3',
                      fontWeight: '400',
                      fontFamily: '"Inter", sans-serif',
                      letterSpacing: '0.2px'
                    }}>
                      Analyze<br />trends<br />and forecast<br />your<br />collection<br />success
                    </h3>

                    <div style={{ marginTop: '12px' }}>
                      <button style={{
                        background: 'linear-gradient(135deg, #b58d5e 0%, #e3c498 50%, #c49f70 100%)',
                        color: '#000',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        boxShadow: '0 4px 15px rgba(201, 160, 91, 0.2)',
                        transition: 'all 0.3s ease'
                      }}>
                        See more
                      </button>
                    </div>
                  </div>
                </div>

              </div>




            </div>

          </>
        )}

        {activeTab === 'Products' && <ProductManagement globalSearch={globalSearch} />}
        {activeTab === 'Categories' && <CategoryManagement />}
        {activeTab === 'Orders' && <OrderManagement globalSearch={globalSearch} />}
        {activeTab === 'Coupons' && <CouponManagement />}
        {activeTab === 'Reviews' && <ReviewManagement />}
        {activeTab === 'Settings' && <WebsiteSetting initialTab={settingsTab} />}
        {activeTab === 'Notifications' && <NotificationManagement setActiveTab={setActiveTab} notifications={notifications} setNotifications={setNotifications} />}
        {activeTab === 'ActivityLog' && <ActivityLogManagement />}
        {activeTab === 'HelpSupport' && <HelpSupport />}
        {activeTab === 'Brands' && <BrandManagement setActiveTab={setActiveTab} />}
        {activeTab === 'Customers' && <CustomerManagement />}
        {activeTab === 'Banners' && <BannerManagement />}
        {activeTab === 'Reports' && <ReportsAnalytics />}
      </main>

      <Modal
        title={null}
        open={isLogoutModalVisible}
        onCancel={() => setIsLogoutModalVisible(false)}
        footer={null}
        width={400}
        centered
        styles={{ body: { padding: '32px 24px', textAlign: 'center' } }}
        closeIcon={<XCircle size={20} color="#9ca3af" />}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyItems: 'center', width: '56px', height: '56px', background: '#fef2f2', borderRadius: '50%', marginBottom: '20px' }}>
          <LogOut size={28} color="#ef4444" style={{ margin: 'auto' }} />
        </div>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 700, color: '#111827' }}>Logout</h3>
        <p style={{ margin: '0 0 32px 0', fontSize: '14px', color: '#6b7280', lineHeight: 1.5 }}>
          Are you sure you want to logout from your admin account? You will need to re-enter your credentials to access the dashboard.
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setIsLogoutModalVisible(false)}
            style={{ flex: 1, padding: '12px', background: '#fff', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              localStorage.removeItem('userInfo');
              localStorage.removeItem('adminActiveTab');
              navigate('/login');
            }}
            style={{ flex: 1, padding: '12px', background: '#ef4444', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}
          >
            Logout
          </button>
        </div>
      </Modal>
    </div>
  );
};

const CustomDot = (props) => {
  const { cx, cy, payload } = props;

  if (payload.isMax) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={14} fill="#f09650" opacity={0.6} />
        <circle cx={cx} cy={cy} r={6} fill="#fff" />
        <circle cx={cx} cy={cy} r={2} fill="#f09650" />
        <text x={cx + 18} y={cy + 4} fill="#aaa" fontSize="11px" fontWeight="bold">27°C</text>
      </g>
    );
  }

  if (payload.isMin) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={14} fill="#633c3a" opacity={0.8} />
        <circle cx={cx} cy={cy} r={6} fill="#fff" />
        <circle cx={cx} cy={cy} r={2} fill="#633c3a" />
        <text x={cx + 18} y={cy + 4} fill="#aaa" fontSize="11px" fontWeight="bold">-5°C</text>
      </g>
    );
  }

  return (
    <circle cx={cx} cy={cy} r={3} fill="#777" stroke="#fff" strokeWidth={2} />
  );
};

const StarIcon = ({ filled }) => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill={filled ? "#c9a05b" : "none"} stroke={filled ? "#c9a05b" : "#ddd"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

export default Dashboard;
