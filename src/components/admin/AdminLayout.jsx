import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Box, 
  ShoppingCart, 
  Users, 
  Package, 
  Tag, 
  MessageSquare, 
  BarChart2, 
  Settings, 
  User, 
  HelpCircle,
  Menu,
  Search,
  Bell,
  ChevronDown,
  Crown
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  return (
    <div className="admin-layout">



      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <ShoppingBag size={24} className="brand-icon" />
          <div className="brand-text">
            <h2>ShopMax</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className="nav-item">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <div className={`nav-group ${isProductsOpen ? 'open' : ''}`}>
            <button 
              className={`nav-item ${isProductsOpen ? 'active' : ''}`}
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              <Box size={18} />
              <span>Products</span>
              <ChevronDown size={16} className={`chevron ${isProductsOpen ? 'open' : ''}`} />
            </button>
            {isProductsOpen && (
              <div className="sub-nav">
                <div className="sub-nav-item active">
                  <span className="dot"></span> Product List
                </div>
                <NavLink to="/admin/products/add" className="sub-nav-item">Add Product</NavLink>
                <NavLink to="/admin/categories" className="sub-nav-item">Categories</NavLink>
                <NavLink to="/admin/brands" className="sub-nav-item">Brands</NavLink>
              </div>
            )}
          </div>

          <NavLink to="/admin/orders" className="nav-item">
            <ShoppingCart size={18} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/admin/customers" className="nav-item">
            <Users size={18} />
            <span>Customers</span>
          </NavLink>

          <NavLink to="/admin/inventory" className="nav-item">
            <Package size={18} />
            <span>Inventory</span>
          </NavLink>

          <NavLink to="/admin/coupons" className="nav-item">
            <Tag size={18} />
            <span>Coupons</span>
          </NavLink>

          <NavLink to="/admin/reviews" className="nav-item">
            <MessageSquare size={18} />
            <span>Reviews</span>
          </NavLink>

          <NavLink to="/admin/reports" className="nav-item">
            <BarChart2 size={18} />
            <span>Reports</span>
          </NavLink>

          <NavLink to="/admin/settings" className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </NavLink>

          <NavLink to="/admin/users" className="nav-item">
            <User size={18} />
            <span>Users</span>
          </NavLink>

          <NavLink to="/admin/support" className="nav-item">
            <HelpCircle size={18} />
            <span>Support</span>
          </NavLink>
        </nav>

        <div className="sidebar-premium">
          <Crown className="premium-icon" color="#d3a763" size={28} />
          <h4>Upgrade to Premium</h4>
          <p>Unlock all features &<br/>get more powerful tools.</p>
          <button className="upgrade-btn">Upgrade Now</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Navbar */}
        <header className="admin-header">
          <div className="header-left">
            <button className="menu-toggle">
              <Menu size={20} />
            </button>
            <div className="breadcrumbs">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#222' }}>Product Management</h1>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px', display: 'flex', gap: '4px' }}>
                  <span style={{ color: '#d37920' }}>Dashboard</span>
                  <span className="separator">&gt;</span>
                  <span>Products</span>
                  <span className="separator">&gt;</span>
                  <span className="current" style={{ color: '#d37920' }}>Product Management</span>
                </div>
              </div>
            </div>
          </div>

          <div className="header-right">
            <div className="search-bar">
              <input type="text" placeholder="Search products..." />
              <Search size={16} className="search-icon" />
            </div>
            
            <button className="notification-btn">
              <Bell size={20} />
              <span className="badge">5</span>
            </button>

            <div className="admin-profile">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Admin" />
              <div className="profile-info">
                <span className="name">Admin User</span>
                <span className="role">Super Admin</span>
              </div>
              <ChevronDown size={14} />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
