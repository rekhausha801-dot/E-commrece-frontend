import React from 'react';
import './Footer.css';
import { 
  FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiAward, FiTag,
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLock, FiGlobe
} from 'react-icons/fi';
import { FaPinterestP, FaGooglePlay, FaApple, FaCcVisa, FaCcMastercard, FaAmazonPay } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Features Top Bar */}
    
      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-col-brand">
          <div className="footer-logo">
            JR Shopper.
          </div>
          <p className="brand-desc">
            Your one-stop destination for trendy products, best deals and an exceptional shopping experience.
          </p>
          <div className="social-links">
            <a href="#"><FiFacebook /></a>
            <a href="#"><FiInstagram /></a>
            <a href="#"><FiTwitter /></a>
            <a href="#"><FaPinterestP /></a>
            <a href="#"><FiYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>SHOP</h4>
          <ul>
            <li><a href="#">All Products</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Offers & Discounts</a></li>
            <li><a href="#">Top Brands</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Clearance Sale</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>CATEGORIES</h4>
          <ul>
            <li><a href="#">Men</a></li>
            <li><a href="#">Women</a></li>
            <li><a href="#">Kids</a></li>
            <li><a href="#">Footwear</a></li>
            <li><a href="#">Bags & Accessories</a></li>
            <li><a href="#">Home & Living</a></li>
            <li><a href="#">Beauty & Personal Care</a></li>
            
          </ul>
        </div>

        <div className="footer-col">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-col-newsletter">
          <h4>NEWSLETTER</h4>
          <p>Subscribe to get updates on new arrivals, exclusive offers and more.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
