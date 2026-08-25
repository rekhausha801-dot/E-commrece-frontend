import React, { useState, useEffect } from 'react';
import { getOffers, getActiveBanners } from '../../services/api';
import {
  Gift, ArrowRight, Tag, Monitor,
  Sparkles, Home, MoreHorizontal, ChevronLeft,
  ChevronRight, Heart, Calendar, Copy, Check,
  ShieldCheck, Clock, Percent, Crown, Truck
} from 'lucide-react';
import './Coupons.css';

// Fallback images
import imgHanging1 from '../../assets/images/occ_casual.png';
import imgHanging2 from '../../assets/images/hd_dress.png';
import couponBanner from '../../assets/banners/coupon.png';

const Coupons = () => {
  const [activeTab, setActiveTab] = useState('All Offers');
  const [copiedCode, setCopiedCode] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [bannerUrl, setBannerUrl] = useState(couponBanner);
  const [activeBanner, setActiveBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCoupons();
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const { data } = await getActiveBanners();
      console.log('Active banners response:', data);
      if (data && data.data && data.data.length > 0) {
        const active = data.data[0];
        setActiveBanner(active);
        if (active.image) {
          const imagePath = active.image.replace(/\\/g, '/');
          const imgUrl = imagePath.startsWith('http') ? imagePath : `http://localhost:5000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
          console.log('Setting banner URL to:', imgUrl);
          setBannerUrl(imgUrl);
        }
      }
    } catch (error) {
      console.error("Failed to fetch banners", error);
    }
  };

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const { data } = await getOffers({ t: new Date().getTime() });
      if (data.success) {
        // Filter out inactive coupons
        setCoupons(data.data.filter(c => c.isActive !== false));
      }
    } catch (error) {
      console.error("Failed to fetch coupons", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const tabs = [
    { name: 'All Offers', icon: <Tag size={16} /> },
    { name: 'Fashion', icon: <Sparkles size={16} /> },
    { name: 'Electronics', icon: <Monitor size={16} /> },
    { name: 'Beauty', icon: <Sparkles size={16} /> },
    { name: 'Home & Living', icon: <Home size={16} /> }
  ];

  // Helper to format discount
  const formatDiscount = (coupon) => {
    if (coupon.discountType === 'Percentage') {
      return { pre: 'FLAT', val: `${coupon.discountValue}%`, post: 'OFF' };
    } else {
      return { pre: 'FLAT', val: `₹${coupon.discountValue}`, post: 'OFF' };
    }
  };

  return (
    <div className="new-coupon-page">
      {/* Custom Hero Banner Replicating the Image */}
      <div className="nc-hero-container" style={{ position: 'relative', padding: '0', background: 'transparent', boxShadow: 'none', margin: '0 0 24px 0', borderRadius: '0', width: '100%', maxWidth: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={bannerUrl} alt="Coupon Banner" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain', borderRadius: '0', margin: '0', padding: '0' }} onError={(e) => { e.target.onerror = null; e.target.src = couponBanner; console.error("Banner image failed to load, falling back to default"); }} />
        {activeBanner && activeBanner.type === 'with_text' && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: activeBanner.textPosition === 'Left' ? 'flex-start' : (activeBanner.textPosition === 'Right' ? 'flex-end' : 'center'),
            padding: '0 10%',
            color: '#fff',
            textAlign: activeBanner.textPosition === 'Left' ? 'left' : (activeBanner.textPosition === 'Right' ? 'right' : 'center')
          }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '10px', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{activeBanner.title}</h1>
            {activeBanner.description && <p style={{ fontSize: '1.5rem', marginBottom: '20px', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>{activeBanner.description}</p>}
            {activeBanner.link && (
              <a href={activeBanner.link} style={{ padding: '12px 28px', backgroundColor: '#c9a05b', color: '#fff', textDecoration: 'none', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Shop Now</a>
            )}
          </div>
        )}
      </div>

      <div className="nc-main-container">
        {/* Category Tabs */}
        <div className="nc-tabs-wrapper">
          <div className="nc-tabs-list">
            {tabs.map(tab => (
              <button
                key={tab.name}
                className={`nc-tab ${activeTab === tab.name ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="nc-coupons-grid">
          
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', width: '100%' }}>Loading offers...</div>
          ) : coupons.length === 0 ? (
             <div style={{ padding: '40px', textAlign: 'center', width: '100%', color: '#6b7280' }}>No active offers available at the moment.</div>
          ) : (
            coupons.map((coupon, index) => {
              const { pre, val, post } = formatDiscount(coupon);
              
              // We can alternate card styles just to keep it looking dynamic and varied
              // Style depends on whether an image was provided
              const styleClass = coupon.image ? 'card-style-1' : 'card-style-4';
              const buttonColor = index % 3 === 0 ? 'theme-brown' : (index % 3 === 1 ? 'theme-gold' : 'theme-rose');
              
              // Basic category filtering check (if you implement category on backend later, you can map it. For now, show on 'All Offers')
              if (activeTab !== 'All Offers' && coupon.category !== activeTab && coupon.category !== 'All Offers') {
                 // For now, since admin panel saves as 'All Offers', they will show in all tabs if we don't filter them out strictly, 
                 // but let's just make them show in 'All Offers' or if category matches
                 return null;
              }

              return (
                <div key={coupon._id} className={`nc-wide-card ${styleClass}`}>
                  {styleClass === 'card-style-1' && (
                    <div className="nwc-image-container">
                      <img src={coupon.image || imgHanging1} alt={coupon.title} className="nwc-image" />
                    </div>
                  )}
                  <div className="nwc-left">
                    <div className="nwc-tag" style={{
                        ...(styleClass === 'card-style-4' ? {alignSelf: 'center', marginBottom: 12} : {}),
                        ...(coupon.isFirstOrderOnly ? { color: '#e11d48', fontWeight: 700 } : {})
                    }}>
                      {styleClass === 'card-style-1' && <span className="nwc-dot" style={coupon.isFirstOrderOnly ? { background: '#e11d48' } : {}}></span>} 
                      {coupon.isFirstOrderOnly ? 'FIRST ORDER ONLY' : (styleClass === 'card-style-4' ? 'TODAY\'S DEAL' : 'SPECIAL OFFER')}
                    </div>
                    
                    {styleClass === 'card-style-4' ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                         <h2 className="nwc-title" style={{ color: '#2D3748', margin: 0, fontWeight: 700, fontSize: coupon.title.length > 15 ? '24px' : '32px' }}>{coupon.title.split(' ')[0]}</h2>
                         <h2 className="nwc-title" style={{ color: '#A38C75', margin: 0, fontWeight: 400, fontSize: coupon.title.length > 15 ? '24px' : '32px', whiteSpace: 'nowrap' }}>{coupon.title.split(' ').slice(1).join(' ')}</h2>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px', width: '100%' }}>
                        <h2 className="nwc-title" style={{ color: '#2D3748', margin: 0, fontWeight: 600, fontSize: coupon.title.length > 15 ? '24px' : '32px', textAlign: 'center' }}>{coupon.title.split(' ')[0]}</h2>
                        <h2 className="nwc-title" style={{ color: '#B36B6B', margin: 0, fontWeight: 600, fontSize: coupon.title.length > 15 ? '22px' : '32px', textAlign: 'center' }}>{coupon.title.split(' ').slice(1).join(' ')}</h2>
                      </div>
                    )}
                    
                    <p className={styleClass === 'card-style-4' ? "nwc-desc-center" : "nwc-desc"} style={{ marginTop: 12, textAlign: 'center', padding: '0 10px' }}>
                      {coupon.description || 'Grab this special discount while it lasts.'}
                    </p>

                    <div className="nwc-discount-box">
                      <div className="nwc-discount-top">
                        <span className="nwc-flat">{pre}</span>
                        <span className="nwc-percent">{val}</span>
                        <span className="nwc-off">{post}</span>
                      </div>
                      <div className="nwc-min-purchase">ON MINIMUM PURCHASE OF ₹{coupon.minPurchase}</div>
                    </div>
                  </div>

                  <div className="nwc-divider"></div>

                  <div className="nwc-right">
                    <p className="nwc-use-code">USE CODE</p>
                    <div className="nwc-code-box">{coupon.couponCode}</div>
                    <button className={`nwc-copy-btn ${buttonColor}`} onClick={() => handleCopy(coupon.couponCode)}>
                      {copiedCode === coupon.couponCode ? (
                        <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                      ) : (
                        <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* Features Section */}
        <div className="nc-features-section">
          <div className="nc-feature">
            <div className="nc-feature-icon"><Tag size={20} /></div>
            <div className="nc-feature-text">
              <h4>Exclusive Offers</h4>
              <p>Handpicked deals just for you</p>
            </div>
          </div>
          <div className="nc-feature">
            <div className="nc-feature-icon"><ShieldCheck size={20} /></div>
            <div className="nc-feature-text">
              <h4>100% Safe</h4>
              <p>Secure & trusted coupons</p>
            </div>
          </div>
          <div className="nc-feature">
            <div className="nc-feature-icon"><Clock size={20} /></div>
            <div className="nc-feature-text">
              <h4>Limited Time</h4>
              <p>Grab the best before it's gone</p>
            </div>
          </div>
          <div className="nc-feature">
            <div className="nc-feature-icon"><Gift size={20} /></div>
            <div className="nc-feature-text">
              <h4>More Savings</h4>
              <p>Extra discounts on top brands</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Coupons;
