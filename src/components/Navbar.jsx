import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiBell, FiChevronDown, FiX } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import './Navbar.css';

const menuItems = [
  { title: "HOME", path: "/" },
  { 
    title: "CATEGORIES", 
    children: ["Women", "Men", "Kids", "Footwear", "Accessories", "Beauty"] 
  },
  { title: "BLOG", path: "/blog" },
  { title: "ABOUT", path: "/about" },
  { title: "CONTACT", path: "/contact" }
];

const accountItems = [
  "My Profile", "Orders", "Wishlist", "Addresses", "Logout"
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleExpand = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="premium-navbar-wrapper">
      <header className="premium-navbar">
        <div className="navbar-left">
          {/* Mobile Menu Button */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <FiMenu size={24} />
          </button>
          
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <HiOutlineShoppingBag size={28} color="#b28146" />
            </div>
            <div className="brand-text-container">
               <span className="brand-text">JR SHOP</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-center desktop-only">
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className={`nav-item ${item.children ? 'has-dropdown' : ''}`}>
                {item.path ? (
                  <Link 
                    to={item.path} 
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <span className="nav-link">
                    {item.title} <FiChevronDown size={14} className="nav-arrow" />
                  </span>
                )}
                
                {item.children && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                       {/* Icon based on title */}
                       {item.title === 'CATEGORIES' && <span>Categories</span>}
                       {item.title === 'OFFERS' && <span>Offers</span>}
                       {item.title === 'BRANDS' && <span>Brands</span>}
                    </div>
                    <ul className="dropdown-list">
                      {item.children.map((child, idx) => (
                        <li key={idx}>
                          <Link to={`/category/${child.toLowerCase().replace(/\s+/g, '-')}`}>{child}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Search & Icons */}
        <div className="navbar-right">
          <div className="search-bar desktop-only">
            <input type="text" placeholder="Search products..." />
            <button className="search-btn"><FiSearch size={18} /></button>
          </div>
          
          <div className="action-icons">
            {/* Mobile Search Icon */}
            <button className="icon-btn mobile-only">
              <FiSearch size={22} />
            </button>

            <Link to="/wishlist" className="icon-btn action-item desktop-only">
              <div className="icon-badge-wrapper">
                <FiHeart size={22} />
              </div>
              <span className="icon-label">Wishlist</span>
            </Link>

            <div className="icon-btn action-item desktop-only">
              <div className="icon-badge-wrapper">
                <FiBell size={22} />
                <span className="nav-alert-badge">2</span>
              </div>
              <span className="icon-label">Alerts</span>
            </div>

            <div className="icon-btn action-item has-dropdown">
              <div className="icon-badge-wrapper">
                <FiShoppingCart size={22} />
              </div>
              <span className="icon-label desktop-only">Cart</span>
              <div className="dropdown-menu cart-dropdown desktop-only">
                <div className="dropdown-header">Cart (2)</div>
                <div className="cart-preview">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <span className="amount">₹2,499</span>
                  </div>
                  <Link to="/cart" className="cart-btn view-cart">VIEW CART</Link>
                  <Link to="/checkout" className="cart-btn checkout">CHECKOUT</Link>
                </div>
              </div>
            </div>

            <div className="icon-btn action-item has-dropdown desktop-only">
              <div className="icon-badge-wrapper">
                <FiUser size={22} />
              </div>
              <span className="icon-label">Account</span>
              <div className="dropdown-menu account-dropdown">
                <div className="dropdown-header">Account</div>
                <ul className="dropdown-list">
                  {accountItems.map((item, idx) => (
                    <li key={idx}>
                      <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
      <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon">
              <HiOutlineShoppingBag size={24} color="#b28146" />
            </div>
            <span className="brand-text">JR SHOP</span>
          </Link>
          <button className="close-sidebar" onClick={toggleMobileMenu}>
            <FiX size={24} />
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="sidebar-item">
                <div className="sidebar-item-header" onClick={() => item.children ? toggleExpand(item.title) : null}>
                  {item.path ? (
                    <Link to={item.path}>{item.title}</Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                  {item.children && (
                    <FiChevronDown className={`expand-icon ${expandedMenus[item.title] ? 'rotated' : ''}`} />
                  )}
                </div>
                {item.children && (
                  <ul className={`sidebar-sub-menu ${expandedMenus[item.title] ? 'expanded' : ''}`}>
                    {item.children.map((child, idx) => (
                      <li key={idx}>
                        <Link to={`/category/${child.toLowerCase().replace(/\s+/g, '-')}`}>{child}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
