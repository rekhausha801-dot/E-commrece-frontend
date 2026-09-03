import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { 
  FiHeadphones, FiTruck, FiShield,
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLinkedin, FiMail
} from 'react-icons/fi';
import { FaPinterestP } from 'react-icons/fa';
import { BsBagHeartFill } from 'react-icons/bs';
const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Decorative SVG Waves */}
      <div className="footer-waves">
        <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="wave-svg left-wave">
          <path d="M0,0 C150,150 200,350 400,500 L0,500 Z" fill="rgba(218, 176, 137, 0.15)" />
          <path d="M0,200 C150,300 250,450 500,500 L0,500 Z" fill="rgba(218, 176, 137, 0.25)" />
        </svg>
        <svg viewBox="0 0 500 500" preserveAspectRatio="none" className="wave-svg right-wave">
          <path d="M500,100 C350,200 300,350 100,500 L500,500 Z" fill="rgba(218, 176, 137, 0.15)" />
          <path d="M500,300 C350,400 250,450 0,500 L500,500 Z" fill="rgba(218, 176, 137, 0.25)" />
        </svg>
      </div>

      <div className="footer-main">
        {/* Brand Column */}
        <div className="footer-col-brand">
          <div className="footer-logo">
            <div className="logo-icon-container">
              <div className="logo-icon-bg"></div>
              <BsBagHeartFill className="logo-icon" />
            </div>
            ShopEase
          </div>
          <p className="brand-desc">
            Your trusted store for quality products and a better shopping experience.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"><FiYoutube /></a>
          </div>
        </div>

        {/* Shop Column */}
        <div className="footer-col">
          <h4>SHOP</h4>
          <ul>
            <li><Link to="/collection">All Products</Link></li>
            <li><a href="/#new-arrivals">New Arrivals</a></li>
            <li><Link to="/category/best-sellers">Best Sellers</Link></li>
            <li><Link to="/coupons">Deals & Discounts</Link></li>
            <li><a href="/#top-brands">Top Brands</a></li>
            <li><a href="/#categories">Categories</a></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="footer-col">
          <h4>CUSTOMER CARE</h4>
          <ul>
            <li><Link to="/support">Help Center</Link></li>
            <li><Link to="/account/my-orders">Track Order</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
            <li><Link to="/account/payment-methods">Payment Methods</Link></li>
            <li><Link to="/account/faqs">FAQ</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul>
            <li><Link to="/shop">About Us</Link></li>
            <li><Link to="/shop">Our Blog</Link></li>
            <li><Link to="/shop">Careers</Link></li>
            <li><Link to="/shop">Press & Media</Link></li>
            <li><Link to="/shop">Become a Seller</Link></li>
            <li><Link to="/shop">Affiliate Program</Link></li>
            <li><Link to="/support">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-support-box">
          <Link to="/support" className="support-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="support-icon"><FiHeadphones /></div>
            <div className="support-text">
              <h5>CUSTOMER SUPPORT</h5>
              <p>+91 98765 43210</p>
              <p>support@shopease.com</p>
            </div>
          </Link>
          
          <div className="support-divider"></div>
          
          <Link to="/shipping-policy" className="support-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="support-icon"><FiTruck /></div>
            <div className="support-text">
              <h5>FREE SHIPPING</h5>
              <p>On orders over ₹999</p>
              <p>Across India</p>
            </div>
          </Link>
          
          <div className="support-divider"></div>
          
          <Link to="/account/payment-methods" className="support-item" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="support-icon"><FiShield /></div>
            <div className="support-text">
              <h5>SECURE PAYMENT</h5>
              <p>100% secure payments</p>
              <p>Multiple payment options</p>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Large Bottom Bar */}
      <div className="footer-bottom-bar-large">
        <div className="bottom-bar-content">
          <div className="bottom-copyright">
            <p>&copy; 2026 RelieTech.</p>
          </div>
          
          <div className="bottom-links">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
