import React, { useState, useEffect } from 'react';
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

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { name: 'All Offers', icon: <Tag size={16} /> },
    { name: 'Fashion', icon: <Sparkles size={16} /> },
    { name: 'Electronics', icon: <Monitor size={16} /> },
    { name: 'Beauty', icon: <Sparkles size={16} /> },
    { name: 'Home & Living', icon: <Home size={16} /> }
  ];

  return (
    <div className="new-coupon-page">
      {/* Custom Hero Banner Replicating the Image */}
      <div className="nc-hero-container" style={{ padding: '0', background: 'transparent', boxShadow: 'none', margin: '-48px 0 -20px 0', borderRadius: '0', width: '100%', maxWidth: '100%' }}>
        <img src={couponBanner} alt="Coupon Banner" style={{ width: '100%', display: 'block', objectFit: 'cover', borderRadius: '0 !important', margin: '0', padding: '0' }} />
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

          {/* Card 3: Wardrobe Refresh */}
          {(activeTab === 'All Offers' || activeTab === 'Fashion') && (
            <div className="nc-wide-card card-style-3">
              <div className="nwc-image-left">
                <img src={imgHanging1} alt="Wardrobe" />
              </div>
              <div className="nwc-left">
                <div className="nwc-tag"><span className="nwc-dot"></span> SPECIAL OFFER</div>
                <h2 className="nwc-title">Wardrobe</h2>
                <h3 className="nwc-subtitle script-font">Refresh</h3>
                <p className="nwc-desc">Revamp your look with<br />our trending new styles.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">FLAT</span>
                    <span className="nwc-percent">20%</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON MINIMUM PURCHASE OF ₹1499</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">REFRESH2</div>
                <button className="nwc-copy-btn theme-rose" onClick={() => handleCopy('REFRESH2')}>
                  {copiedCode === 'REFRESH2' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Beauty Edit */}
          {(activeTab === 'All Offers' || activeTab === 'Beauty') && (
            <div className="nc-wide-card card-style-4">
              <div className="nwc-left">
                <div className="nwc-tag-center">TODAY'S DEAL</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', justifyContent: 'center' }}>
                  <h2 className="nwc-title-serif">Beauty</h2>
                  <h3 className="nwc-subtitle-script">Edit</h3>
                </div>
                <p className="nwc-desc-center" style={{ marginTop: 16 }}>Expertly curated premium beauty styles exclusively.<br />Absolutely irresistible mind blowing beauty offers.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">FLAT</span>
                    <span className="nwc-percent">25%</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON ORDERS ABOVE ₹1999</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">EDIT25</div>
                <button className="nwc-copy-btn theme-gold" onClick={() => handleCopy('EDIT25')}>
                  {copiedCode === 'EDIT25' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Card 1: New Season */}
          {(activeTab === 'All Offers' || activeTab === 'Fashion') && (
            <div className="nc-wide-card card-style-1">
              <div className="nwc-left">
                <div className="nwc-tag"><span className="nwc-dot"></span> EXCLUSIVE OFFER</div>
                <h2 className="nwc-title">New Season</h2>
                <h3 className="nwc-subtitle">NEW STYLE</h3>
                <p className="nwc-desc">Elevate your entire wardrobe style with<br />our absolutely stunning new fashion collection.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">FLAT</span>
                    <span className="nwc-percent">15%</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON MINIMUM PURCHASE OF ₹999</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">STYLE15</div>
                <button className="nwc-copy-btn theme-brown" onClick={() => handleCopy('STYLE15')}>
                  {copiedCode === 'STYLE15' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Chic Picks */}
          {(activeTab === 'All Offers' || activeTab === 'Beauty') && (
            <div className="nc-wide-card card-style-2">
              <div className="nwc-image-container">
                <img src={imgHanging2} alt="Dresses" />
              </div>

              <div className="nwc-divider" style={{ margin: '24px 20px' }}></div>

              <div className="nwc-content-full">
                <div className="nwc-tag-center"><Clock size={12} style={{ marginRight: 4 }} /> LIMITED TIME</div>
                <h2 className="nwc-title-center">Chic Picks</h2>
                <h3 className="nwc-subtitle-center">JUST FOR YOU</h3>
                <div className="nwc-heart-divider"><Heart size={10} fill="#B36B6B" color="#B36B6B" /></div>
                <p className="nwc-desc-center">Grab your most loved absolute favorites<br />at incredibly huge special discounted prices.</p>

                <div className="nwc-horizontal-code" style={{ marginBottom: 6 }}>
                  <span className="nwc-h-label">CODE</span>
                  <span className="nwc-h-value">CHIC10</span>
                  <button className="nwc-h-copy theme-pink" onClick={() => handleCopy('CHIC10')}>
                    {copiedCode === 'CHIC10' ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="nwc-min-purchase-center" style={{ marginBottom: 0 }}>GET 10% OFF ON ORDERS ABOVE ₹1299</p>
              </div>
            </div>
          )}

          {/* Card 5: Tech Gadgets */}
          {(activeTab === 'All Offers' || activeTab === 'Electronics') && (
            <div className="nc-wide-card card-style-1">
              <div className="nwc-left">
                <div className="nwc-tag"><span className="nwc-dot"></span> BIG SAVINGS</div>
                <h2 className="nwc-title">Tech Gadgets</h2>
                <h3 className="nwc-subtitle">SMART DEALS</h3>
                <p className="nwc-desc">Upgrade your fast paced daily life<br />with the absolutely smartest modern tech.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">UPTO</span>
                    <span className="nwc-percent">40%</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON SELECT ELECTRONICS</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">TECH40</div>
                <button className="nwc-copy-btn theme-brown" onClick={() => handleCopy('TECH40')}>
                  {copiedCode === 'TECH40' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Card 6: Home Essentials */}
          {(activeTab === 'All Offers' || activeTab === 'Home & Living') && (
            <div className="nc-wide-card card-style-1">
              <div className="nwc-left">
                <div className="nwc-tag"><span className="nwc-dot"></span> FESTIVE OFFER</div>
                <h2 className="nwc-title">Home Decor</h2>
                <h3 className="nwc-subtitle">LIVING SPACES</h3>
                <p className="nwc-desc">Make your sweet lovely home beautiful<br />with our absolutely stunning new collection.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">FLAT</span>
                    <span className="nwc-percent">10%</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON ORDERS ABOVE ₹2999</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">HOME10</div>
                <button className="nwc-copy-btn theme-brown" style={{ backgroundColor: '#719A71' }} onClick={() => handleCopy('HOME10')}>
                  {copiedCode === 'HOME10' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Card 7: Special Deal */}
          {(activeTab === 'All Offers' || activeTab === 'Electronics' || activeTab === 'Home & Living') && (
            <div className="nc-wide-card card-style-1">
              <div className="nwc-left">
                <div className="nwc-tag"><span className="nwc-dot"></span> MEGA DEAL</div>
                <h2 className="nwc-title">Super Saver</h2>
                <h3 className="nwc-subtitle">ANYTHING & EVERYTHING</h3>
                <p className="nwc-desc">Get incredibly huge massive discounts across<br />all our wide ranging premium categories.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">FLAT</span>
                    <span className="nwc-percent">₹500</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON ORDERS ABOVE ₹4999</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">MEGA500</div>
                <button className="nwc-copy-btn theme-brown" style={{ backgroundColor: '#9F7AEA' }} onClick={() => handleCopy('MEGA500')}>
                  {copiedCode === 'MEGA500' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Card 8: Weekend Flash */}
          {(activeTab === 'All Offers') && (
            <div className="nc-wide-card card-style-1">
              <div className="nwc-left">
                <div className="nwc-tag"><span className="nwc-dot"></span> FLASH SALE</div>
                <h2 className="nwc-title">Weekend</h2>
                <h3 className="nwc-subtitle">LIMITED TIME</h3>
                <p className="nwc-desc">Grab massive extra special flat discounts<br />during this absolutely crazy festive weekend.</p>

                <div className="nwc-discount-box">
                  <div className="nwc-discount-top">
                    <span className="nwc-flat">EXTRA</span>
                    <span className="nwc-percent">30%</span>
                    <span className="nwc-off">OFF</span>
                  </div>
                  <div className="nwc-min-purchase">ON ORDERS ABOVE ₹1499</div>
                </div>
              </div>

              <div className="nwc-divider"></div>

              <div className="nwc-right">
                <p className="nwc-use-code">USE CODE</p>
                <div className="nwc-code-box">WKND30</div>
                <button className="nwc-copy-btn theme-gold" style={{ backgroundColor: '#D9A24D' }} onClick={() => handleCopy('WKND30')}>
                  {copiedCode === 'WKND30' ? (
                    <><Check size={14} style={{ marginRight: 6 }} /> COPIED!</>
                  ) : (
                    <><Copy size={14} style={{ marginRight: 6 }} /> COPY CODE</>
                  )}
                </button>
              </div>
            </div>
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
