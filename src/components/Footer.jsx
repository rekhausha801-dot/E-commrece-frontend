import React from 'react';
import './Footer.css';
import { 
  FiTruck, FiShield, FiRefreshCw, FiHeadphones, FiAward, FiTag,
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiLock, FiGlobe,
  FiMapPin, FiPhone, FiVideo, FiMail
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
            {/* JR Shopper. */}
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

        <div className="footer-col">
          <h4>CONTACT US</h4>
          <ul>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', color: 'black', fontSize: '14px', marginBottom: '16px', lineHeight: '1.6' }}>
              <div className="contact-icon-wrapper">
                <FiMapPin size={16} />
              </div>
              <span style={{ marginTop: '4px' }}>
                No 15, Shopping Street, <br />
                T.Nagar, Chennai - 600017
              </span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'black', fontSize: '14px', marginBottom: '16px' }}>
              <div className="contact-icon-wrapper">
                <FiPhone size={16} />
              </div>
              <span>+91 9344567889</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'black', fontSize: '14px', marginBottom: '16px' }}>
              <div className="contact-icon-wrapper">
                <FiMail size={16} />
              </div>
              <a href="mailto:relietech@gmail.com" style={{ textDecoration: 'none', color: 'black' }}>relietech@gmail.com</a>
            </li>
          </ul>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
