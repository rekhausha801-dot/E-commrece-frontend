import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion, useCycle } from 'framer-motion';
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

// ---------------------------------------------------------------------------
// Framer Motion Animation Variants & Utils
// ---------------------------------------------------------------------------
const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(22px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    pointerEvents: "auto",
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    pointerEvents: "none",
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button onClick={toggle} style={{
    outline: "none",
    border: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    cursor: "pointer",
    position: "absolute",
    top: 15,
    left: 17,
    width: 45,
    height: 45,
    borderRadius: "50%",
    background: "transparent",
    zIndex: 1001,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </button>
);

const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });
  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);
  return dimensions.current;
};

// ---------------------------------------------------------------------------
// AdminLayout Component
// ---------------------------------------------------------------------------
const AdminLayout = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);
  const [isProductsOpen, setIsProductsOpen] = useState(true);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  return (
    <div className="admin-layout">
      {/* Animated Floating Sidebar */}
      <motion.nav
        className="admin-sidebar"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "280px",
            background: "#f8f9fa",
            boxShadow: isOpen ? "4px 0 15px rgba(0,0,0,0.05)" : "none"
          }}
          variants={sidebarVariants}
        />

        <MenuToggle toggle={() => toggleOpen()} />

        <motion.div variants={navVariants} style={{ position: 'relative', zIndex: 1000, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: '60px' }}>
          <div className="sidebar-brand" style={{ paddingLeft: '24px', paddingTop: '10px' }}>
            <ShoppingBag size={24} className="brand-icon" />
            <div className="brand-text">
              <h2>ShopMax</h2>
              <span>Admin Panel</span>
            </div>
          </div>

          <nav className="sidebar-nav" style={{ padding: '0 16px' }}>
            <motion.div variants={itemVariants}>
              <NavLink to="/admin/dashboard" className="nav-item">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
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
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/orders" className="nav-item">
                <ShoppingCart size={18} />
                <span>Orders</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/customers" className="nav-item">
                <Users size={18} />
                <span>Customers</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/inventory" className="nav-item">
                <Package size={18} />
                <span>Inventory</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/coupons" className="nav-item">
                <Tag size={18} />
                <span>Coupons</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/reviews" className="nav-item">
                <MessageSquare size={18} />
                <span>Reviews</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/reports" className="nav-item">
                <BarChart2 size={18} />
                <span>Reports</span>
              </NavLink>
            </motion.div>



            <motion.div variants={itemVariants}>
              <NavLink to="/admin/users" className="nav-item">
                <User size={18} />
                <span>Users</span>
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants}>
              <NavLink to="/admin/support" className="nav-item">
                <HelpCircle size={18} />
                <span>Support</span>
              </NavLink>
            </motion.div>
          </nav>

          <motion.div variants={itemVariants} className="sidebar-premium" style={{ margin: 'auto 16px 20px' }}>
            <Crown className="premium-icon" color="#d3a763" size={28} />
            <h4>Upgrade to Premium</h4>
            <p>Unlock all features &<br />get more powerful tools.</p>
            <button className="upgrade-btn">Upgrade Now</button>
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Navbar */}
        <header className="admin-header">
          <div className="header-left">
            <div className="breadcrumbs" style={{ marginLeft: '10px' }}>
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
<<<<<<< HEAD

            <button className="notification-btn">
              <Bell size={20} />
              <span className="badge">5</span>
            </button>
=======
            
            <div className="notification-wrapper" style={{ position: 'relative' }}>
              <button className="notification-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                <Bell size={20} />
                <span className="badge">5</span>
              </button>
              
              {isNotifOpen && (
                <div className="notification-dropdown">
                  <div className="notif-header">
                    <h4>Notifications</h4>
                    <span className="notif-mark-read">Mark all as read</span>
                  </div>
                  <div className="notif-list">
                    <div className="notif-item unread">
                      <div className="notif-icon order"><ShoppingCart size={14}/></div>
                      <div className="notif-content">
                        <p>New order <strong>#1047</strong> received.</p>
                        <span>2 min ago</span>
                      </div>
                    </div>
                    <div className="notif-item unread">
                      <div className="notif-icon alert"><Package size={14}/></div>
                      <div className="notif-content">
                        <p>Product "Women's Jacket" is low in stock.</p>
                        <span>15 min ago</span>
                      </div>
                    </div>
                    <div className="notif-item">
                      <div className="notif-icon user"><User size={14}/></div>
                      <div className="notif-content">
                        <p>New customer registered.</p>
                        <span>1 hr ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="notif-footer">
                    View all notifications
                  </div>
                </div>
              )}
            </div>
>>>>>>> 18ef50130343d4fbe1500235de333a1d5733004b

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
