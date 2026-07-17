import React from 'react';
import { Link } from 'react-router-dom';
import './NewArrivals.css';

import bgImg from '../assets/images/banner.png'; 
import lehengaImg from '../assets/images/kurthi2.png';
import menswearImg from '../assets/images/mens1.png';
import sareeImg from '../assets/images/sarees1.png';
import jewelryImg from '../assets/images/watch.png';

const NewArrivals = () => {
  return (
    <section className="premium-banner-section">
      <div className="premium-banner-container">
        
        {/* Background Image & Overlay */}
        <div className="premium-bg-wrapper">
          <img src={bgImg} alt="Background" className="premium-bg-img" />
          <div className="premium-bg-overlay"></div>
        </div>

        {/* Content */}
        <div className="premium-content-wrapper">
          
          {/* Left Side Text */}
          <div className="premium-banner-left">
            <h2 className="premium-title">
              <span className="premium-star">✦</span> Gold
            </h2>
            <p className="premium-subtitle">Products you Love. Quality we Trust.</p>
            <Link to="/collection" className="premium-shop-btn">
              Shop Now
            </Link>
          </div>

          {/* Right Side Categories */}
          <div className="premium-banner-right">
            <div className="premium-category-grid">
              
              <Link to="/category/lehengas" className="premium-cat-card">
                <div className="premium-cat-img-wrapper">
                  <img src={lehengaImg} alt="Lehengas" />
                </div>
                <span className="premium-cat-label">Lehengas</span>
              </Link>

              <Link to="/category/menswear" className="premium-cat-card">
                <div className="premium-cat-img-wrapper">
                  <img src={menswearImg} alt="Menswear" />
                </div>
                <span className="premium-cat-label">Menwear</span>
              </Link>

              <Link to="/category/sarees" className="premium-cat-card">
                <div className="premium-cat-img-wrapper">
                  <img src={sareeImg} alt="Sarees" />
                </div>
                <span className="premium-cat-label">Sarees</span>
              </Link>

              <Link to="/category/jewellery" className="premium-cat-card">
                <div className="premium-cat-img-wrapper">
                  <img src={jewelryImg} alt="Jewellery" />
                </div>
                <span className="premium-cat-label">Jewellery</span>
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
