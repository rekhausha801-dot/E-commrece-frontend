import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Badge, Dropdown, Drawer, Input, Menu } from 'antd';
import { 
  FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiBell, FiChevronDown 
} from 'react-icons/fi';
import './Navbar.css';

const megaMenuItems = [
  {
    key: '1',
    label: (
      <div className="mega-menu-content">
        <div className="mega-menu-column">
          <h4>Clothing</h4>
          <Link to="/category/dresses">Dresses</Link>
          <Link to="/category/tops">Tops</Link>
          <Link to="/category/bottoms">Bottoms</Link>
          <Link to="/category/outerwear">Outerwear</Link>
        </div>
        <div className="mega-menu-column">
          <h4>Accessories</h4>
          <Link to="/category/bags">Bags</Link>
          <Link to="/category/shoes">Shoes</Link>
          <Link to="/category/jewelry">Jewelry</Link>
          <Link to="/category/sunglasses">Sunglasses</Link>
        </div>
      </div>
    ),
  },
];

const profileItems = [
  { key: '1', label: <Link to="/profile">My Profile</Link> },
  { key: '2', label: <Link to="/orders">Orders</Link> },
  { key: '3', label: <Link to="/settings">Settings</Link> },
  { type: 'divider' },
  { key: '4', label: <Link to="/login">Login / Register</Link> },
];

const notificationItems = [
  { key: '1', label: <div className="notification-item">Your order #1234 has shipped!</div> },
  { key: '2', label: <div className="notification-item">Flash sale starts in 1 hour!</div> },
];

const Navbar = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  // Close drawer on route change
  useEffect(() => {
    setDrawerVisible(false);
  }, [location.pathname]);

  return (
    <div className="navbar-container">
      <header className="navbar-content">
        {/* Left: Logo */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <FiShoppingCart size={24} color="#f47f20" />
            </div>
            <div className="brand-text-container">
               <span className="brand-text">JR SHOP</span>
               <span className="brand-subtext">Enjoy your shopping</span>
            </div>
          </Link>
        </div>

       
                <div className="navbar-center desktop-only">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link>
          
          <Dropdown menu={{ items: megaMenuItems }} trigger={['hover']} overlayClassName="mega-menu-dropdown">
            <a className={`nav-link ${location.pathname.includes('/category') ? 'active' : ''}`} onClick={(e) => e.preventDefault()}>
              SHOP <FiChevronDown className="nav-arrow" />
            </a>
          </Dropdown>
          
          <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>BLOG <FiChevronDown className="nav-arrow" /></Link>
          
          <Dropdown menu={{ items: [{ key: '1', label: <Link to="/faq">FAQ</Link> }, { key: '2', label: <Link to="/terms">Terms</Link> }] }} trigger={['hover']}>
            <a className="nav-link" onClick={(e) => e.preventDefault()}>
              PAGES <FiChevronDown className="nav-arrow" />
            </a>
          </Dropdown>
          
          <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>ABOUT US</Link>
        </div>

        {/* Right: Search & Icons */}
        <div className="navbar-right">
          <div className="action-icons">
            <Link to="/wishlist" className="icon-btn desktop-only">
              <FiHeart size={20} />
            </Link>

            <Link to="/cart" className="icon-btn desktop-only">
              <Badge count={0} size="small" showZero color="#000" offset={[0, 0]}>
                <FiShoppingCart size={20} />
              </Badge>
            </Link>

            {searchActive ? (
              <div className="search-wrapper active desktop-only">
                <Input 
                  placeholder="Search..." 
                  prefix={<FiSearch />} 
                  autoFocus
                  onBlur={() => setSearchActive(false)}
                />
              </div>
            ) : (
              <button className="icon-btn desktop-only" onClick={() => setSearchActive(true)}>
                <FiSearch size={20} />
              </button>
            )}

            <button className="icon-btn mobile-menu-btn" onClick={toggleDrawer}>
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={drawerVisible}
        width={280}
        className="mobile-drawer"
      >
        <div className="mobile-search">
          <Input placeholder="Search..." prefix={<FiSearch />} size="large" />
        </div>
        
        <Menu mode="inline" defaultSelectedKeys={['home']} className="mobile-menu">
          <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
          <Menu.SubMenu key="shop" title="Shop">
            <Menu.Item key="dresses"><Link to="/category/dresses">Dresses</Link></Menu.Item>
            <Menu.Item key="tops"><Link to="/category/tops">Tops</Link></Menu.Item>
            <Menu.Item key="bags"><Link to="/category/bags">Bags</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="about"><Link to="/about">About us</Link></Menu.Item>
          <Menu.SubMenu key="pages" title="Pages">
            <Menu.Item key="faq"><Link to="/faq">FAQ</Link></Menu.Item>
            <Menu.Item key="terms"><Link to="/terms">Terms</Link></Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="contact"><Link to="/contact">Contact us</Link></Menu.Item>
        </Menu>

        <div className="mobile-drawer-footer">
          <Link to="/profile"><FiUser size={18} /> Profile</Link>
          <Link to="/wishlist"><FiHeart size={18} /> Wishlist</Link>
          <Link to="/notifications">
            <Badge count={2} size="small" offset={[10, 0]} color="#d88f6b">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)' }}>
                 <FiBell size={18} /> Notifications
              </div>
            </Badge>
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
