import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, 
  FiPhone, FiMail, FiTruck, FiChevronDown 
} from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header-wrapper">
      {/* Top Barnknkjn */}
      <div className="top-bar desktop-only">
        <div className="top-bar-container">
          <div className="top-bar-left">
            <span className="top-bar-item"><FiPhone /> Customer Support: +1 (234) 567-890</span>
            <span className="top-bar-item"><FiMail /> support@example.com</span>
          </div>
          <div className="top-bar-right">
            <Link to="/track" className="top-bar-link"><FiTruck /> Track Order</Link>
            <span className="top-bar-item">English <FiChevronDown /></span>
            <span className="top-bar-item">USD <FiChevronDown /></span>
          </div>
        </div>
      </div>

      {/* Middle Bar */}
      <div className="middle-bar">
        <div className="middle-bar-container">
          <Link to="/" className="navbar-logo">
            FashionStore
          </Link>

          <div className="search-container desktop-only">
            <input type="text" placeholder="Search for products..." className="search-input" />
            <button className="search-button">
              <FiSearch size={20} />
            </button>
          </div>

          <div className="header-actions">
            <Link to="/profile" className="action-item desktop-only">
              <FiUser size={22} />
              <span className="action-text">Account</span>
            </Link>
            
            <Link to="/wishlist" className="action-item desktop-only">
              <div className="icon-wrapper">
                <FiHeart size={22} />
                <span className="badge">0</span>
              </div>
              <span className="action-text">Wishlist</span>
            </Link>

            <Link to="/cart" className="action-item">
              <div className="icon-wrapper">
                <FiShoppingCart size={22} />
                <span className="badge">3</span>
              </div>
              <span className="action-text">Cart</span>
            </Link>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Navigation */}
      <nav className="bottom-bar desktop-only">
        <div className="bottom-bar-container">
          <ul className="nav-menu">
            <li className="nav-item active"><Link to="/">Home</Link></li>
            <li className="nav-item"><Link to="/about">About</Link></li>
            <li className="nav-item"><Link to="/categories">Category</Link></li>
            <li className="nav-item"><Link to="/product-details">Product Details</Link></li>
            <li className="nav-item"><Link to="/cart">Cart</Link></li>
            <li className="nav-item"><Link to="/checkout">Checkout</Link></li>
            <li className="nav-item dropdown">
              <Link to="#">Dropdown <FiChevronDown /></Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="#">Megamenu 1 <FiChevronDown /></Link>
            </li>
            <li className="nav-item dropdown">
              <Link to="#">Megamenu 2 <FiChevronDown /></Link>
            </li>
            <li className="nav-item"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Promo Banner */}
      <div className="promo-banner">
        <div className="promo-container">
          <FiTruck /> <span>Free shipping on orders over $50</span>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <input type="text" placeholder="Search for products..." />
            <button type="button" className="mobile-search-btn">
              <FiSearch size={20} />
            </button>
          </div>
          <Link to="/" className="mobile-nav-link" onClick={toggleMobileMenu}>Home</Link>
          <Link to="/about" className="mobile-nav-link" onClick={toggleMobileMenu}>About</Link>
          <Link to="/categories" className="mobile-nav-link" onClick={toggleMobileMenu}>Category</Link>
          <Link to="/wishlist" className="mobile-nav-link" onClick={toggleMobileMenu}>
            <FiHeart size={20} /> Wishlist
          </Link>
          <Link to="/profile" className="mobile-nav-link" onClick={toggleMobileMenu}>
            <FiUser size={20} /> Account
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
