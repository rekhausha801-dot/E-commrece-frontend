import React from 'react';
import './kurtiBanner.css';
import kurti2Img from '../assets/images/kurti2.png';
import { FaArrowRight } from 'react-icons/fa';

const kurtiBanner = () => {
  return (
    <section className="kurti-banner-wrapper" style={{ height: '480px' }}>
      <div className="kurti-banner">
       
        <div className="kurti-banner-image">
          <img src={kurti2Img} alt="Kurti Collection" />
        </div>

        {/* Left side content */}
        <div className="kurti-banner-content">
          <div className="kurti-banner-inner">
            <div className="kurti-eyebrow">
              <span className="kurti-line" />
              <span className="kurti-season">NEW SEASON</span>
              <span className="kurti-line" />
            </div>
            

            <h2 className="kurti-title">KURTI</h2>
            <h3 className="kurti-subtitle">COLLECTIONS</h3>
            

          </div>
        </div>
      </div>
    </section>
  );
};

export default kurtiBanner;
