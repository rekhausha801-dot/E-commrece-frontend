import React from 'react';
import './SummerBanner.css';
import seaImg from '../assets/banners/glo.png'; // Updated to use glo.png
import { FaArrowRight } from 'react-icons/fa';

const SummerBanner = () => {
  return (
    <section className="summer-banner-wrapper">
      <div className="summer-banner">
       
        <div className="summer-banner-image">
          <img src={seaImg} alt="Summer Collection" />
        </div>
       
        <div className="summer-banner-curve-container">
          <svg className="summer-curve-svg" viewBox="0 0 100 400" preserveAspectRatio="none">
            
            <path d="M0,0 L50,0 C100,120 0,280 50,400 L0,400 Z" fill="#FAF8F5" />
           
            <path d="M50,0 C100,120 0,280 50,400" fill="none" stroke="#d4b78f" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Left side content */}
        <div className="summer-banner-content">
          <div className="summer-banner-inner">
            <div className="summer-icon-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22V12M12 12C9.5 10.5 7 11.5 6 13M12 12C14.5 10.5 17 11.5 18 13M12 12C10.5 8.5 7.5 7 5 8M12 12C13.5 8.5 16.5 7 19 8M12 12C11 6 8.5 4 6 4M12 12C13 6 15.5 4 18 4" stroke="#a67c52" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="summer-eyebrow">
              <span className="summer-line" />
              <span className="summer-season">NEW SEASON</span>
              <span className="summer-line" />
            </div>
            

            <h2 className="summer-title">SUMMER</h2>
            <h3 className="summer-subtitle">COLLECTION</h3>
            
            <p className="summer-desc">
              Breezy fabrics. Sun-kissed colors.<br />
              Effortless styles for every moment.
            </p>
            
            <button className="summer-shop-btn">
              SHOP NOW <FaArrowRight className="summer-btn-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerBanner;
