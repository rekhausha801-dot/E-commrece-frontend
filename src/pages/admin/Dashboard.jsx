import React, { useState } from 'react';
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
  DollarSign, MoreHorizontal, Shirt
} from 'lucide-react';
import CategoryManagement from './CategoryManagement';
import fashionnImage from '../../assets/banners/fashionn.png';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart,
  PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, LabelList
} from 'recharts';

const revenueData = [
  { name: 'May 18', revenue: 20000 },
  { name: 'May 19', revenue: 35000 },
  { name: 'May 20', revenue: 52000 },
  { name: 'May 21', revenue: 38000 },
  { name: 'May 22', revenue: 65000 },
  { name: 'May 23', revenue: 78000 },
  { name: 'May 24', revenue: 100000 },
];

const sparklineTotalRevenue = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineTotalOrders = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];
const sparklineTotalCustomers = [{ v: 20 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }];
const sparklineTotalProducts = [{ v: 5 }, { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 30 }];

const topSellingProducts = [
  { name: 'Linen Shirt', sold: '256 sold', price: '₹2,45,000', img: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=100' },
  { name: 'Summer Dress', sold: '182 sold', price: '₹1,86,000', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { name: 'Sneakers', sold: '140 sold', price: '₹1,45,000', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { name: 'Handbag', sold: '112 sold', price: '₹98,000', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100' },
];

const topCategoriesData = [
  { name: 'Women', value: 42, color: '#8c673d' },
  { name: 'Men\'s Wear', value: 24, color: '#dfbc88' },
  { name: 'Accessories', value: 16, color: '#b98e54' },
  { name: 'Footwear', value: 10, color: '#eedda8' },
  { name: 'Others', value: 8, color: '#1f1f1f' },
];

const recentOrdersData = [
  { id: '#ORD1042', date: 'May 24, 2024', customer: 'Janani R.', amount: '₹3,450', status: 'Delivered', statusClass: 'delivered', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' },
  { id: '#ORD1043', date: 'May 24, 2024', customer: 'Ravi K.', amount: '₹1,250', status: 'Processing', statusClass: 'processing', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: '#ORD1044', date: 'May 24, 2024', customer: 'Priya S.', amount: '₹4,990', status: 'Pending', statusClass: 'pending', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
];

const lowStockAlertData = [
  { name: 'Women\'s Hoodie', size: 'M', stock: 3, percent: 15, status: 'Low', statusClass: 'low', img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' },
  { name: 'Casual Sandals', size: '6', stock: 2, percent: 10, status: 'Low', statusClass: 'low', img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=100' },
  { name: 'Running Shoes', size: '9', stock: 1, percent: 8, status: 'Low', statusClass: 'low', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { name: 'Classic Sunglasses', size: 'One Size', stock: 4, percent: 12, status: 'Low', statusClass: 'low', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100' },
];

const recentReviewsData = [
  { rating: 5, text: '"Excellent quality and fast delivery!"', author: 'Anjali S.', time: '2 hours ago', helpful: 12, avatar: 'https://i.pravatar.cc/100?img=5', productImg: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=100' },
  { rating: 5, text: '"Loved the fabric and fit."', author: 'Priya M.', time: '5 hours ago', helpful: 8, avatar: 'https://i.pravatar.cc/100?img=9', productImg: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { rating: 5, text: '"Worth every penny!"', author: 'Rahul K.', time: '1 day ago', helpful: 15, avatar: 'https://i.pravatar.cc/100?img=11', productImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
];

const notificationsData = [
  { icon: Bell, title: 'System Update Completed', subtitle: 'Version 2.1.0', time: 'Just now' },
  { icon: ShoppingCart, title: 'New Order Received', subtitle: '#ORD12345', time: '2m ago' },
  { icon: User, title: 'New Customer Registered', subtitle: 'John Doe', time: '15m ago' },
  { icon: Package, title: 'Low Stock Alert', subtitle: 'Women\'s Hoodie (M)', time: '20m ago' },
  { icon: Star, title: 'New Review Received', subtitle: 'Summer Dress', time: '1h ago' },
  { icon: CreditCard, title: 'Payment Processed', subtitle: '$129.00 from Sophia', time: '2h ago' },
];

const calendarData = [
  { date: '24 May', event: 'New Orders & Shipments' },
  { date: '25 May', event: 'Flash Sale (Summer Collection)' },
  { date: '26 May', event: 'Coupon "WELCOME10" Expiring' },
];

const newRecentOrdersTableData = [
  { id: '#ORD-7824', customer: 'Sophia Carter', product: 'Leather Handbag', variant: 'Brown', amount: '$129.00', status: 'Delivered', avatar: 'https://i.pravatar.cc/100?img=1', productImg: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100' },
  { id: '#ORD-7823', customer: 'Liam Anderson', product: 'Classic Sneakers', variant: 'White / 42', amount: '$89.00', status: 'Processing', avatar: 'https://i.pravatar.cc/100?img=11', productImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { id: '#ORD-7822', customer: 'Olivia Bennett', product: 'Floral Midi Dress', variant: 'Cream / M', amount: '$79.00', status: 'Pending', avatar: 'https://i.pravatar.cc/100?img=5', productImg: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { id: '#ORD-7821', customer: 'Noah Mitchell', product: 'Aviator Sunglasses', variant: 'Black', amount: '$59.00', status: 'Delivered', avatar: 'https://i.pravatar.cc/100?img=15', productImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100' },
  { id: '#ORD-7820', customer: 'Emma Walker', product: 'Genuine Leather Belt', variant: 'Brown / 36', amount: '$49.00', status: 'Cancelled', avatar: 'https://i.pravatar.cc/100?img=9', productImg: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' },
];

const newReviewsData = [
  { name: 'Ava Thompson', date: 'May 24, 2025', rating: 5, text: 'Absolutely love the quality and finish!', avatar: 'https://i.pravatar.cc/100?img=1', productImg: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100' },
  { name: 'James Carter', date: 'May 23, 2025', rating: 4, text: 'Super comfortable and stylish.', avatar: 'https://i.pravatar.cc/100?img=11', productImg: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { name: 'Isabella Brown', date: 'May 22, 2025', rating: 5, text: 'The fabric feels amazing. Will buy again!', avatar: 'https://i.pravatar.cc/100?img=5', productImg: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { name: 'William Davis', date: 'May 21, 2025', rating: 5, text: 'Perfect fit and premium quality.', avatar: 'https://i.pravatar.cc/100?img=15', productImg: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100' },
];

const newTopSellingData = [
  { rank: 1, name: 'Floral Maxi Dress', category: 'Women', sold: '1,245', revenue: '$37,350.00', percent: 90, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { rank: 2, name: 'Classic Sneakers', category: 'Footwear', sold: '1,026', revenue: '$30,780.00', percent: 75, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { rank: 3, name: 'Leather Handbag', category: 'Bags', sold: '842', revenue: '$25,260.00', percent: 60, img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100' },
  { rank: 4, name: 'Aviator Sunglasses', category: 'Accessories', sold: '739', revenue: '$14,780.00', percent: 50, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100' },
  { rank: 5, name: 'Genuine Leather Belt', category: 'Accessories', sold: '612', revenue: '$7,344.00', percent: 40, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100' },
];

const newLowStockData = [
  { name: 'Silk Midi Dress', category: 'Women', stock: 5, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { name: 'Quilted Shoulder Bag', category: 'Bags', stock: 8, img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100' },
  { name: 'Minimal White Sneakers', category: 'Footwear', stock: 6, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { name: 'Round Frame Sunglasses', category: 'Accessories', stock: 7, img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100' },
];

const newArrivalsData = [
  { name: 'Velvet Evening Gown', category: 'Women', price: '$249.00', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100', badge: 'New' },
  { name: 'Minimalist Watch', category: 'Accessories', price: '$129.00', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100', badge: 'Trending' },
  { name: 'Canvas Tote Bag', category: 'Bags', price: '$49.00', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100', badge: 'New' },
  { name: 'Sport Sneakers', category: 'Footwear', price: '$119.00', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100', badge: 'Hot' },
];

const lowStockChartData = [
  { name: 'Day 1', value: 5, product: 'Silk Saree' },
  { name: 'Day 2', value: 12, product: 'Cotton Kurti' },
  { name: 'Day 3', value: 27, product: 'Men\'s Polo', isMax: true },
  { name: 'Day 4', value: 15, product: 'Leather Wallet' },
  { name: 'Day 5', value: 8, product: 'Denim Jacket' },
  { name: 'Day 6', value: 14, product: 'Floral Dress' },
  { name: 'Day 7', value: 4, product: 'Gold Plated Necklace', isMin: true },
  { name: 'Day 8', value: 16, product: 'Running Shoes' },
  { name: 'Day 9', value: 10, product: 'Handbag' },
  { name: 'Day 10', value: 14, product: 'Sunglasses' },
];

const ordersOverviewData = [
  { title: 'Pending', count: 42, icon: 'Clock', color: '#ff9800', bg: '#fff4e5' },
  { title: 'Processing', count: 18, icon: 'RotateCcw', color: '#2196f3', bg: '#e3f2fd' },
  { title: 'Shipped', count: 26, icon: 'Truck', color: '#9c27b0', bg: '#f3e5f5' },
  { title: 'Delivered', count: 105, icon: 'CheckCircle2', color: '#4caf50', bg: '#e8f5e9' },
  { title: 'Cancelled', count: 5, icon: 'XCircle', color: '#f44336', bg: '#ffebee' }
];

const recentTransactionsData = [
  { id: '#FS10234', name: 'Laura Peterson', amount: '₹2,450', status: 'Completed', icon: User, bg: '#f2dfc5', fg: '#333' },
  { id: '#FS10233', name: 'Olivia Bennett', amount: '₹1,890', status: 'Processing', icon: ShoppingBag, bg: '#1f1f1f', fg: '#fff' },
  { id: '#FS10232', name: 'Ava Martinez', amount: '₹3,150', status: 'Completed', icon: Package, bg: '#91725b', fg: '#fff' },
  { id: '#FS10231', name: 'Sophia Williams', amount: '₹2,780', status: 'Cancelled', icon: CreditCard, bg: '#4a3727', fg: '#fff' }
];

const topSellingData = [
  { name: 'Summer Dress', sold: 182, price: '₹1,86,000', img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=100' },
  { name: 'Sneakers', sold: 140, price: '₹1,45,000', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
  { name: 'Cotton T-Shirt', sold: 256, price: '₹1,25,000', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
  { name: 'Handbag', sold: 112, price: '₹98,000', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=100' }
];

const sunburstRing1 = [{ name: 'R1', value: 100, fill: '#2e7d32' }];
const sunburstRing2 = [
  { name: 'R2-1', value: 40, fill: '#388e3c' },
  { name: 'R2-2', value: 20, fill: '#1976d2' },
  { name: 'R2-3', value: 15, fill: '#673ab7' },
  { name: 'R2-4', value: 25, fill: '#d84315' }
];
const sunburstRing3 = [
  { name: 'R3-1', value: 20, fill: '#4caf50' },
  { name: 'R3-2', value: 10, fill: '#4caf50' },
  { name: 'R3-3', value: 10, fill: '#4caf50' },
  { name: 'R3-4', value: 10, fill: '#42a5f5' },
  { name: 'R3-5', value: 10, fill: '#42a5f5' },
  { name: 'R3-6', value: 8, fill: '#9575cd' },
  { name: 'R3-7', value: 7, fill: '#9575cd' },
  { name: 'R3-8', value: 12, fill: '#ff8a65' },
  { name: 'R3-9', value: 13, fill: '#ff8a65' }
];
const sunburstRing4 = Array.from({ length: 40 }).map((_, i) => ({
  name: `R4-${i}`,
  value: Math.random() * 5 + 2,
  fill: i < 15 ? '#81c784' : i < 23 ? '#64b5f6' : i < 30 ? '#ba68c8' : '#ffab91'
}));

const ordersOverviewBarData = [
  { name: 'Pending', count: 52, color: '#8c673d' },
  { name: ' ', count: 28, color: '#1f1f1f' },
  { name: 'Shipped', count: 36, color: '#dfbc88' },
  { name: '  ', count: 105, color: '#b98e54' },
  { name: 'Cancelled', count: 25, color: '#eedda8' },
];

const LowStockCustomDot = (props) => {
  const { cx, cy, payload } = props;
  if (payload.name === 'Day 8') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={6} fill="#fff" stroke="#c9a05b" strokeWidth={3} />
      </g>
    );
  }
  return <circle cx={cx} cy={cy} r={4} fill="#c9a05b" strokeWidth={0} />;
};

const Dashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="dashboard-container">
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
            <button className={`nav-item ${activeTab === 'Dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('Dashboard')}><LayoutDashboard size={18} className="nav-icon" /> Dashboard</button>
            <button className={`nav-item ${activeTab === 'Products' ? 'active' : ''}`} onClick={() => setActiveTab('Products')}><Package size={18} className="nav-icon" /> Products</button>
            <button className={`nav-item ${activeTab === 'Categories' ? 'active' : ''}`} onClick={() => setActiveTab('Categories')}><Grid size={18} className="nav-icon" /> Categories</button>
            <button className={`nav-item ${activeTab === 'Brands' ? 'active' : ''}`} onClick={() => setActiveTab('Brands')}><Zap size={18} className="nav-icon" /> Brands</button>
            <button className={`nav-item ${activeTab === 'Orders' ? 'active' : ''}`} onClick={() => setActiveTab('Orders')}><ShoppingCart size={18} className="nav-icon" /> Orders</button>
            <button className={`nav-item ${activeTab === 'Customers' ? 'active' : ''}`} onClick={() => setActiveTab('Customers')}><Users size={18} className="nav-icon" /> Customers</button>
            <button className={`nav-item ${activeTab === 'Coupons' ? 'active' : ''}`} onClick={() => setActiveTab('Coupons')}><Zap size={18} className="nav-icon" /> Coupons</button>
            <button className={`nav-item ${activeTab === 'Reviews' ? 'active' : ''}`} onClick={() => setActiveTab('Reviews')}><Settings size={18} className="nav-icon" /> Reviews</button>
            <button className={`nav-item ${activeTab === 'Banners' ? 'active' : ''}`} onClick={() => setActiveTab('Banners')}><FileText size={18} className="nav-icon" /> Banners</button>
            <button className={`nav-item ${activeTab === 'Reports' ? 'active' : ''}`} onClick={() => setActiveTab('Reports')}><PieChart size={18} className="nav-icon" /> Reports</button>
            <button className={`nav-item ${activeTab === 'Notifications' ? 'active' : ''}`} onClick={() => setActiveTab('Notifications')}><Bell size={18} className="nav-icon" /> Notifications</button>
            <button className={`nav-item ${activeTab === 'Settings' ? 'active' : ''}`} onClick={() => setActiveTab('Settings')}><Settings size={18} className="nav-icon" /> Settings</button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="elevate-card">
            <h4>Elevate<br />Your Store</h4>
            <p>Manage. Grow.<br />Succeed.</p>
            <button className="elevate-btn">View Insights →</button>
          </div>
          <div className="sidebar-footer">
            <p style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}>© 2024 RELIETECH. All rights reserved.</p>
          </div>
        </div>
      </aside>


      <main className="dashboard-main">

        <header className="dashboard-header">
          <div className="header-left">
            <button className="menu-toggle"><Menu size={20} color="#a07d4b" /></button>
            <div className="header-title-wrap">
              <h2>Dashboard</h2>
              <div className="breadcrumbs">

              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <Search size={16} color="#c9a05b" className="search-icon" />
              <input type="text" placeholder="Search products, orders..." />
              <div className="search-shortcut">
                <SearchIcon></SearchIcon>
              </div>
            </div>

            <div className="notification-icon">
              <Bell size={20} color="#333" />
              <span className="notification-badge">8</span>
            </div>

            <div className="admin-profile">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Admin" />
              <div className="admin-info">
                <span className="admin-name">Admin User</span>
                <span className="admin-role">Super Admin</span>
              </div>
              <ChevronDown size={16} color="#888" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        {activeTab === 'Dashboard' && (
          <>
            {/* Welcome Banner */}
            <div style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '32px', overflow: 'hidden', backgroundColor: '#eaddce', marginBottom: '32px', boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>

          {/* The Girl Image (Positioned on the right) */}
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '60%', backgroundImage: `url(${fashionnImage})`, backgroundSize: 'cover', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat', borderTopLeftRadius: '400px 240px', borderBottomLeftRadius: '400px 240px' }}></div>

          {/* Gradient Overlay for Text Readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(234,221,206,1) 0%, rgba(234,221,206,0.95) 35%, rgba(234,221,206,0.7) 50%, rgba(234,221,206,0) 80%)' }}></div>


          <div style={{ position: 'relative', zIndex: 1, height: '100%', padding: '40px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', backgroundColor: '#1a1614', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
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
              <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '56px', fontWeight: '400', color: '#1a1614', margin: 0, lineHeight: '1.15' }}>
                Welcome,<br />Admin
              </h1>
              <p style={{ fontSize: '17px', color: '#685c53', marginTop: '16px', maxWidth: '300px', lineHeight: '1.5' }}>
                Here's what's happening with your store today.
              </p>
            </div>

            {/* Bottom Section */}
            <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-end', marginTop: 'auto' }}>
              {/* Stats Card */}
              <div style={{ backgroundColor: '#211d1b', borderRadius: '24px', padding: '24px 32px', display: 'flex', gap: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={20} color="#c8a883" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>245</div>
                    <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Total Orders</div>
                  </div>
                </div>

                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={20} color="#c8a883" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>128</div>
                    <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Products</div>
                  </div>
                </div>

                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users size={20} color="#c8a883" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>1,450</div>
                    <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Customers</div>
                  </div>
                </div>

                <div style={{ width: '1px', backgroundColor: 'rgba(255,255,255,0.08)' }}></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(200,168,131,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={20} color="#c8a883" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: '24px', fontWeight: '600', color: '#fff' }}>$12,680</div>
                    <div style={{ fontSize: '13px', color: '#8a7d73', marginTop: '2px' }}>Total Sales</div>
                  </div>
                </div>
              </div>

              {/* View Dashboard Button */}
              <button style={{ background: 'linear-gradient(90deg, #d8ab79 0%, #c4945d 100%)', color: '#211d1b', border: 'none', padding: '18px 28px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(216,171,121,0.3)', fontWeight: '600', fontSize: '15px', height: 'fit-content', marginBottom: '8px' }}>
                <Grid size={18} />
                View Dashboard
                <ArrowRight size={18} />
              </button>
            </div>

          </div>

          {/* Floating Total Sales Chart Card */}
          <div style={{ position: 'absolute', right: '48px', bottom: '48px', backgroundColor: '#f0e6d8', borderRadius: '24px', padding: '24px', width: '320px', boxShadow: '0 24px 48px rgba(0,0,0,0.15)', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#8a7d73', fontWeight: '500' }}>Total Sales</span>
              <MoreHorizontal size={20} color="#8a7d73" />
            </div>
            <div style={{ fontSize: '32px', fontFamily: 'Georgia, serif', color: '#1a1614', marginBottom: '16px', fontWeight: '400' }}>
              $12,680
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
                <h2 className="stat-value gold-text">₹8,75,420</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 12.5%</span> <span className="stat-change-text">vs yesterday</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineTotalRevenue}>
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
                <h2 className="stat-value">1,245</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 18</span> <span className="stat-change-text">new today</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineTotalOrders}>
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
                <h2 className="stat-value">3,528</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 35</span> <span className="stat-change-text">new today</span>
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

          <div className="stat-card dark">
            <div className="stat-top">
              <div className="stat-icon gold"><Package size={18} color="#c9a05b" /></div>
              <div className="stat-info">
                <span className="stat-title">Total Products</span>
                <h2 className="stat-value gold-text">560</h2>
                <div className="stat-bottom">
                  <span className="stat-change negative">12</span> <span className="stat-change-text">low stock items</span>
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
              <button style={{ background: 'linear-gradient(180deg, #2a2a2a 0%, #111 100%)', border: '1px solid #444', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', color: '#e5c07b', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)', whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.5px' }}>Last 7 Days <ChevronDown size={12} /></button>
            </div>
            <div className="card-sub-header">
              <h2>₹8,75,420 <span className="stat-change positive text-sm">↑ 12.5%</span></h2>
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
              <button style={{ background: 'transparent', border: '1px solid #d5b97d', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#9c7324', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, letterSpacing: '0.5px' }} onClick={() => alert('View All clicked!')}>View All <ArrowRight size={12} /></button>
            </div>
            <div className="donut-chart-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>

              <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Pending', value: 35, color: '#8c673d' },
                        { name: 'Processing', value: 15, color: '#dfbc88' },
                        { name: 'Shipped', value: 22, color: '#b98e54' },
                        { name: 'Delivered', value: 28, color: '#1f1f1f' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={78}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="none"
                    >
                      {[
                        { name: 'Pending', value: 35, color: '#8c673d' },
                        { name: 'Processing', value: 15, color: '#1f1f1f' },
                        { name: 'Shipped', value: 22, color: '#b98e54' },
                        { name: 'Delivered', value: 28, color: '#dfbc88' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RechartsPieChart>
                </ResponsiveContainer>

                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#222', lineHeight: '1' }}>121</span>
                  <span style={{ fontSize: '10px', color: '#888', marginTop: '4px', lineHeight: '1' }}>Orders</span>
                </div>
              </div>

              <div className="donut-legend-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', marginTop: '24px' }}>
                {[
                  { name: 'Pending', value: 35, color: '#8c673d' },
                  { name: 'Processing', value: 15, color: '#1f1f1f' },
                  { name: 'Shipped', value: 22, color: '#b98e54' },
                  { name: 'Delivered', value: 28, color: '#dfbc88' }
                ].map((item, index) => (
                  <div className="legend-item" key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: item.color }}></div>
                      <span style={{ fontSize: '12px', color: '#444' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '500', color: '#222' }}>{item.value}%</span>
                  </div>
                ))}
              </div>

            </div>
          </div>


        </div>
        <div className="new-layout-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '20px', marginBottom: '20px' }}>


          {/* Recent Orders (Span 8) */}
          <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Low Stock Alert Custom Bar Chart */}
            <div className="premium-glass-card" style={{ backgroundColor: 'transparent', padding: '24px', borderRadius: '16px', border: '1px solid #eaeaea', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#222', letterSpacing: '-0.3px' }}>Low Stock Alert</h3>
              </div>
              <div style={{ height: '240px', width: '100%', position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', paddingBottom: '56px', boxSizing: 'border-box' }}>
                {/* Premium Threshold Line */}
                <div style={{ position: 'absolute', bottom: '71px', left: '8%', right: '8%', borderBottom: '1px dashed rgba(201, 160, 91, 0.5)', zIndex: 1 }}></div>

                {[
                  { name: 'T-Shirts', count: 12, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100' },
                  { name: 'Jeans', count: 8, img: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=100' },
                  { name: 'Hoodies', count: 25, img: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100' },
                  { name: 'Shoes', count: 6, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' },
                ].map((item, idx) => {
                  const max = 40;
                  const percent = Math.min((item.count / max) * 100, 100);
                  const isLow = item.count < 10;
                  const themeBarColor = isLow ? 'linear-gradient(135deg, #e87e74 0%, #c84b41 100%)' : 'linear-gradient(135deg, #e3c18b 0%, #b98e54 100%)';
                  const glowColor = isLow ? 'rgba(200, 75, 65, 0.35)' : 'rgba(201, 160, 91, 0.35)';

                  return (
                    <div key={idx} className="floating-lite" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, height: '100%', justifyContent: 'flex-end', position: 'relative', animationDelay: `${idx * 0.3}s` }}>
                      {/* Top Badge */}
                      <div className="premium-glass-card" style={{ backgroundColor: 'transparent', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '6px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.06)', zIndex: 3, marginBottom: '-12px', position: 'relative' }}>
                        <span style={{ fontSize: '15px', fontWeight: '800', color: isLow ? '#c84b41' : '#b98e54', lineHeight: '1' }}>{item.count}</span>
                        <span style={{ fontSize: '9px', color: '#888', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Units</span>
                      </div>

                      {/* Bar Background Container */}
                      <div style={{ position: 'relative', width: '44px', height: '140px', backgroundColor: '#f9f9f9', borderRadius: '22px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.02)' }}>
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
                          <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#444', marginTop: '6px' }}>{item.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ backgroundColor: '#fdfbf7', padding: '24px', borderRadius: '16px', border: '1px solid #f5eee3', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.04), inset 0 4px 16px rgba(0,0,0,0.04)' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#f8f9fa', border: '1px solid #eee', color: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={20} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', margin: 0 }}>Recent Orders</h3>
                </div>
                <button style={{ background: '#fff', border: '1px solid #eaeaea', padding: '8px 16px', borderRadius: '24px', fontSize: '13px', fontWeight: '600', color: '#444', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                  View All <ArrowRight size={14} color="#888" />
                </button>
              </div>

              {/* Table */}
              <div className="hide-scrollbar" style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap' }}>
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#fff' }}>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Order ID</th>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Customer</th>
                      <th style={{ textAlign: 'left', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Product</th>
                      <th style={{ textAlign: 'right', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Amount</th>
                      <th style={{ textAlign: 'center', padding: '16px 24px', fontSize: '12px', color: '#999', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #eee' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newRecentOrdersTableData.map((order, i) => (
                      <tr key={i} style={{ backgroundColor: i % 2 !== 0 ? '#f8f9fa' : '#fff' }}>
                        <td style={{ padding: '20px 24px', fontSize: '15px', fontWeight: '700', color: '#111' }}>{order.id}</td>
                        <td style={{ padding: '20px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img src={order.avatar} alt={order.customer} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                            <span style={{ fontSize: '15px', fontWeight: '600', color: '#222' }}>{order.customer}</span>
                          </div>
                        </td>
                        <td style={{ padding: '20px 24px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img src={order.productImg} alt={order.product} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <span style={{ fontSize: '15px', fontWeight: '600', color: '#222' }}>{order.product}</span>
                              <span style={{ fontSize: '13px', color: '#888' }}>{order.variant}</span>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '20px 24px', textAlign: 'right', fontSize: '15px', fontWeight: '700', color: '#111' }}>{order.amount}</td>
                        <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                          <span style={{
                            padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                            backgroundColor: order.status === 'Delivered' ? '#e8f5e9' : order.status === 'Processing' ? '#fff4e5' : order.status === 'Pending' ? '#fff4e5' : '#ffebee',
                            color: order.status === 'Delivered' ? '#2e7d32' : order.status === 'Processing' ? '#d97706' : order.status === 'Pending' ? '#d97706' : '#d32f2f'
                          }}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>


          </div>

          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="premium-glass-card" style={{ backgroundColor: 'transparent', padding: '20px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#333' }}>Top Categories</h3>
                <button style={{ background: '#fff', border: '1px solid #eee', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', color: '#555', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>Last 6 Months <ChevronDown size={12} /></button>
              </div>
              <div style={{ height: '220px', width: '100%', marginTop: '16px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCategoriesData.slice(0, 4)} margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#aaa' }} tickFormatter={(val) => `${val}%`} />
                    <RechartsTooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
                      {topCategoriesData.slice(0, 4).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#c9a05b', '#8c673d', '#1f1f1f'][index % 3]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notifications Premium Design */}
            <div style={{ flex: 1, backgroundColor: '#f9f5f0', border: '1px solid #f0ead6', padding: '24px 16px', borderRadius: '32px', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 30px rgba(0,0,0,0.03)' }}>

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', padding: '0 8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '600', fontFamily: '"Inter", sans-serif', margin: 0, color: '#222' }}>Notifications</h3>
                <ArrowUpRight size={20} color="#555" style={{ cursor: 'pointer' }} />
              </div>

              {/* List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notificationsData.map((notif, index) => {
                  const Icon = notif.icon;

                  let StatusIcon = ChevronRight;
                  const titleLower = notif.title.toLowerCase();
                  if (titleLower.includes('completed') || titleLower.includes('processed') || titleLower.includes('received')) {
                    StatusIcon = CheckCircle2;
                  } else if (titleLower.includes('alert') || titleLower.includes('warning')) {
                    StatusIcon = AlertCircle;
                  } else if (titleLower.includes('registered')) {
                    StatusIcon = CheckCircle2;
                  }

                  return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: 'transparent', borderRadius: '50px', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fff', color: '#c9a05b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #f0ead6' }}>
                          <Icon size={22} strokeWidth={1.5} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontSize: '15px', fontWeight: '600', fontFamily: '"Inter", sans-serif', color: '#111' }}>{notif.title}</span>
                          <span style={{ fontSize: '12px', color: '#888', fontWeight: '400', marginTop: '2px' }}>{notif.time}</span>
                        </div>
                      </div>
                      <StatusIcon size={18} color="#c9a05b" style={{ marginRight: '8px', opacity: 0.6 }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div style={{ gridColumn: 'span 12', display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: '24px', marginTop: '4px' }}>
            {/* New Arrivals */}
            <div className="premium-glass-card" style={{ backgroundColor: 'transparent', padding: '24px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '700', margin: 0, color: '#333' }}>New Arrivals</h3>
                <button className="premium-view-btn">View All <ArrowRight size={14} /></button>
              </div>

              <div className="hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', height: '220px', overflowY: 'auto' }}>
                {newArrivalsData.map((item, index, arr) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: index !== arr.length - 1 ? '1px solid #f5f5f5' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflow: 'hidden' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                        <span style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.category}</span>
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#333' }}>
                        {item.price}
                      </span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '20px', backgroundColor: item.badge === 'New' ? '#eef4ed' : item.badge === 'Trending' ? '#fcf6eb' : '#fcedeb' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: item.badge === 'New' ? '#689f38' : item.badge === 'Trending' ? '#f57c00' : '#d32f2f' }}></div>
                        <span style={{ fontSize: '11px', fontWeight: '600', color: item.badge === 'New' ? '#558b2f' : item.badge === 'Trending' ? '#e65100' : '#c62828' }}>{item.badge}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Rating */}
            <div className="premium-glass-card" style={{ backgroundColor: 'transparent', padding: '24px', borderRadius: '16px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#333', margin: '0 0 4px 0' }}>Your Rating</h3>
              <p style={{ fontSize: '12px', color: '#888', margin: '0 0 24px 0' }}>What people feel and comment</p>
              <div className="rating-container" style={{ position: 'relative', height: '220px', width: '100%' }}>
                {/* Large Circle */}
                <div className="rating-circle-1" style={{ position: 'absolute', right: '5px', top: '20px', width: '130px', height: '130px', borderRadius: '50%', backgroundColor: '#5c3a21', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 1 }}>
                  <span style={{ fontSize: '26px', fontWeight: '500' }}>85%</span>
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
              boxShadow: '0 12px 30px rgba(0,0,0,0.15)', 
              height: '100%',
              backgroundColor: '#0a0a0a',
              border: '1px solid #222',
              position: 'relative'
            }}>
              {/* Exact Image Match Background */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0f0f0f', zIndex: 0 }}></div>
              
              {/* Top Right Blob */}
              <div style={{ position: 'absolute', top: '-15%', right: '-25%', width: '70%', height: '55%', background: 'linear-gradient(145deg, #e3c498, #967551)', borderRadius: '40% 40% 60% 40%', boxShadow: '-2px 4px 15px rgba(255, 230, 180, 0.4), inset 15px 15px 30px rgba(0,0,0,0.2)', pointerEvents: 'none', zIndex: 1 }}></div>
              
              {/* Bottom Right Blob */}
              <div style={{ position: 'absolute', bottom: '-20%', right: '-35%', width: '100%', height: '80%', background: 'linear-gradient(145deg, #c4a17a, #876847)', borderRadius: '60% 30% 20% 60%', boxShadow: '-3px -4px 20px rgba(255, 230, 180, 0.3), inset 20px 20px 40px rgba(0,0,0,0.3)', pointerEvents: 'none', zIndex: 1 }}></div>
              
              {/* Left/Bottom Flowing Dark Shape (creates the central black path) */}
              <div style={{ position: 'absolute', bottom: '-40%', left: '-30%', width: '90%', height: '90%', background: '#0a0a0a', borderRadius: '40% 60% 40% 50%', boxShadow: '3px -3px 15px rgba(255, 230, 180, 0.35)', pointerEvents: 'none', zIndex: 1 }}></div>

              <div style={{ padding: '28px 24px', position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h3 style={{ 
                  margin: '0', 
                  fontSize: '24px', 
                  color: '#ffffff', 
                  lineHeight: '1.3', 
                  fontWeight: '400',
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  letterSpacing: '0.2px'
                }}>
                  Analyze<br />trends<br />and forecast<br />your<br />collection<br />success
                </h3>
                
                <div style={{ marginTop: '20px' }}>
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
        
        {activeTab === 'Categories' && <CategoryManagement />}
      </main>
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
