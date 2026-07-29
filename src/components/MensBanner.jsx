import React from 'react';
import './MensBanner.css';
import menImg from '../assets/images/men9.png';
import { FaArrowRight } from 'react-icons/fa';

const MensBanner = () => {
  return (
    <section className="mens-banner-wrapper" style={{ height: '480px' }}>
      <div className="mens-banner">
       
        <div className="mens-banner-image">
          <img src={menImg} alt="Mens Collection" />
        </div>

        {/* Left side content */}
        <div className="mens-banner-content">
          <div className="mens-banner-inner">
            <div className="mens-eyebrow">
              <span className="mens-line" />
              <span className="mens-season">NEW ARRIVALS</span>
              <span className="mens-line" />
            </div>
            
            <h2 className="mens-title">MENS</h2>
            <h3 className="mens-subtitle">COLLECTIONS</h3>
            
            <button className="mens-shop-btn">
              SHOP NOW <FaArrowRight className="mens-btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MensBanner;
