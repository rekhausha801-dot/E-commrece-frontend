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
      <div className="footer-features">
        <div className="feature-item">
          <FiTruck className="feature-icon" />
          <div className="feature-text">
            <h4>Free Shipping</h4>
            <p>On orders over ₹499</p>
          </div>
        </div>
        <div className="feature-item">
          <FiShield className="feature-icon" />
          <div className="feature-text">
            <h4>Secure Payment</h4>
            <p>100% secure payments</p>
          </div>
        </div>
        <div className="feature-item">
          <FiRefreshCw className="feature-icon" />
          <div className="feature-text">
            <h4>Easy Returns</h4>
            <p>30 days return policy</p>
          </div>
        </div>
        <div className="feature-item">
          <FiHeadphones className="feature-icon" />
          <div className="feature-text">
            <h4>24/7 Support</h4>
            <p>We're here to help</p>
          </div>
        </div>
        <div className="feature-item">
          <FiAward className="feature-icon" />
          <div className="feature-text">
            <h4>Best Quality</h4>
            <p>Satisfaction guaranteed</p>
          </div>
        </div>
        <div className="feature-item">
          <FiTag className="feature-icon" />
          <div className="feature-text">
            <h4>Best Prices</h4>
            <p>Guaranteed value</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-col-brand">
          <div className="footer-logo">
            <span className="logo-icon">🛍️</span> Shopper.
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
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Sports & Outdoors</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>CUSTOMER SERVICE</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Returns & Refunds</a></li>
            <li><a href="#">Track Your Order</a></li>
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

          <h4 className="app-download-title">DOWNLOAD OUR APP</h4>
          <p className="app-download-desc">Shop anytime, anywhere.</p>
          <div className="app-buttons">
            <button className="app-btn">
              <FaGooglePlay className="app-icon" />
              <div className="app-btn-text">
                <span>GET IT ON</span>
                <strong>Google Play</strong>
              </div>
            </button>
            <button className="app-btn">
              <FaApple className="app-icon" />
              <div className="app-btn-text">
                <span>Download on the</span>
                <strong>App Store</strong>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* We Accept & Stats */}
      <div className="footer-we-accept">
        <div className="payment-methods">
          <div className="we-accept-title">
            <span className="line"></span>
            <span>WE ACCEPT</span>
            <span className="line"></span>
          </div>
          <div className="payment-icons">
            <span className="payment-icon visa">VISA</span>
            <span className="payment-icon mastercard"><div className="mc-circle-red"></div><div className="mc-circle-orange"></div></span>
            <span className="payment-icon rupay">RuPay</span>
            <span className="payment-icon upi">UPI</span>
            <span className="payment-icon paytm">Paytm</span>
            <span className="payment-icon amazonpay">amazon<span>pay</span></span>
          </div>
        </div>
        
        <div className="divider-vertical"></div>

        <div className="footer-stats">
          <div className="stat-item">
            <div className="stat-icon-box">📦</div>
            <div className="stat-text">
              <strong>10,000+</strong>
              <span>Products</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-box">👥</div>
            <div className="stat-text">
              <strong>500K+</strong>
              <span>Happy Customers</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-box"><FiGlobe size={24} /></div>
            <div className="stat-text">
              <strong>100+</strong>
              <span>Countries</span>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon-box"><FiShield size={24} /></div>
            <div className="stat-text">
              <strong>100%</strong>
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dark Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="secure-checkout">
            <div className="lock-icon-container">
              <FiLock />
            </div>
            <div className="secure-text">
              <strong>100% Secure Checkout</strong>
              <span>Your data and payments<br/>are always safe with us.</span>
            </div>
          </div>

          <div className="bottom-links-copy">
            <div className="bottom-links">
              <a href="#">Terms & Conditions</a>
              <span className="separator">|</span>
              <a href="#">Privacy Policy</a>
              <span className="separator">|</span>
              <a href="#">Refund Policy</a>
              <span className="separator">|</span>
              <a href="#">Shipping Policy</a>
              <span className="separator">|</span>
              <a href="#">Sitemap</a>
            </div>
            <div className="copyright">
              © 2025 Shopper. All Rights Reserved.
            </div>
          </div>

          <div className="language-selector">
            <button className="lang-btn">
              <FiGlobe />
              <span>India (IN) | English</span>
              <span className="dropdown-arrow">⌄</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
