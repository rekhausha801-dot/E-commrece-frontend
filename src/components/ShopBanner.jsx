import React, { useState, useEffect } from 'react';
import './ShopBanner.css';
import shopImg from '../assets/images/kurthi5.png';
import { FaArrowRight } from 'react-icons/fa';
import { getActiveBanners } from '../services/api';

const ShopBanner = () => {
  const [dynamicBanner, setDynamicBanner] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await getActiveBanners();
        setDebugInfo(JSON.stringify(data));
        if (data && data.success) {
          const shopBanners = data.data.filter(b => b.placement === 'Product Page');
          if (shopBanners.length > 0) {
            setDynamicBanner(shopBanners[0]);
          }
        }
      } catch (error) {
        setDebugInfo('Error: ' + error.message);
        console.error("Error fetching banners", error);
      }
    };
    fetchBanners();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  const titleText = dynamicBanner && dynamicBanner.title ? dynamicBanner.title : "EXCLUSIVE COLLECTION";
  const descText = dynamicBanner && dynamicBanner.description ? dynamicBanner.description : "NEW SEASON";
  const bannerImage = dynamicBanner && dynamicBanner.image ? getImageUrl(dynamicBanner.image) : shopImg;

  if (dynamicBanner) {
    return (
      <section className="shop-banner-wrapper" style={{ position: 'relative', width: '100%', height: '400px', background: 'none' }}>
        <img 
          src={bannerImage} 
          alt={titleText} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 0 }} 
        />
        
        {dynamicBanner.type === 'with_text' && (
          <>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.3)',
              zIndex: 1
            }}></div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: dynamicBanner.textPosition === 'Center' ? '50%' : dynamicBanner.textPosition === 'Right' ? '80%' : '10%',
              transform: dynamicBanner.textPosition === 'Center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
              textAlign: dynamicBanner.textPosition === 'Center' ? 'center' : 'left',
              zIndex: 2,
              color: 'white',
              maxWidth: '600px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: dynamicBanner.textPosition === 'Center' ? 'center' : 'flex-start'
            }}>
              {dynamicBanner.description && (
                <div style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '2px', marginBottom: '15px', color: '#e0d0b8' }}>
                  {dynamicBanner.description}
                </div>
              )}
              {dynamicBanner.title && (
                <h2 style={{ fontSize: '48px', fontWeight: '600', lineHeight: '1.2', marginBottom: '25px', whiteSpace: 'pre-line' }}>
                  {dynamicBanner.title}
                </h2>
              )}
              {dynamicBanner.link ? (
                <a href={dynamicBanner.link} className="shop-btn" style={{ textDecoration: 'none' }}>
                  SHOP NOW <FaArrowRight className="shop-btn-icon" />
                </a>
              ) : (
                <button className="shop-btn">
                  SHOP NOW <FaArrowRight className="shop-btn-icon" />
                </button>
              )}
            </div>
          </>
        )}
      </section>
    );
  }

  // Fallback split layout
  return (
    <section className="shop-banner-wrapper">
      <div className="shop-banner">
        <div className="shop-banner-content">
          <div className="shop-banner-inner">
            <div className="shop-eyebrow">
              <span className="shop-line" />
              <span className="shop-season">{descText}</span>
              <span className="shop-line" />
            </div>
            <h2 className="shop-title">EXCLUSIVE<br />COLLECTION</h2>
            <button className="shop-btn">
              SHOP NOW <FaArrowRight className="shop-btn-icon" />
            </button>
          </div>
        </div>
        <div className="shop-banner-image">
          <img src={bannerImage} alt={titleText} />
        </div>
      </div>
    </section>
  );
};

export default ShopBanner;
