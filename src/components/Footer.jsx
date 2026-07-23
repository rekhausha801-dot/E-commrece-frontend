import React from 'react';
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
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiYoutube /></a>
          </div>
        </div>

        {/* Shop Column */}
        <div className="footer-col">
          <h4>SHOP</h4>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Deals & Discounts</a></li>
            <li><a href="#">Top Brands</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Clearance Sale</a></li>
          </ul>
        </div>

        {/* Customer Care Column */}
        <div className="footer-col">
          <h4>CUSTOMER CARE</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Payment Methods</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div className="footer-col">
          <h4>COMPANY</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Our Blog</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press & Media</a></li>
            <li><a href="#">Become a Seller</a></li>
            <li><a href="#">Affiliate Program</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Support Info Box */}
        <div className="footer-support-box">
          <div className="support-item">
            <div className="support-icon"><FiHeadphones /></div>
            <div className="support-text">
              <h5>CUSTOMER SUPPORT</h5>
              <p>+91 98765 43210</p>
              <p>support@shopease.com</p>
            </div>
          </div>
          
          <div className="support-divider"></div>
          
          <div className="support-item">
            <div className="support-icon"><FiTruck /></div>
            <div className="support-text">
              <h5>FREE SHIPPING</h5>
              <p>On orders over ₹999</p>
              <p>Across India</p>
            </div>
          </div>
          
          <div className="support-divider"></div>
          
          <div className="support-item">
            <div className="support-icon"><FiShield /></div>
            <div className="support-text">
              <h5>SECURE PAYMENT</h5>
              <p>100% secure payments</p>
              <p>Multiple payment options</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Large Bottom Bar */}
      <div className="footer-bottom-bar-large">
        <div className="bottom-bar-content">
          <div className="bottom-copyright">
            <p>&copy; 2026 RelieTech.</p>
          </div>
          
          <div className="bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
            <a href="#">Careers</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
