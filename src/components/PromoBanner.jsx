import React, { useState } from 'react';
import { Heart, Calendar, Ticket, Truck, Copy, Check } from 'lucide-react';
import './PromoBanner.css';
import imgShipping from '../assets/images/coupon_bg_bag.png';
import imgFashion from '../assets/images/coupon_bg_fashion.png';
import imgBeauty from '../assets/images/coupon_bg_beauty.png';

const PromoBanner = () => {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  return (
    <div className="coupons-section">
      <div className="coupons-grid">

        {/* Card 1: Free Shipping */}
        <div className="coupon-card">
          <div className="coupon-top coupon-top-shipping">
            <div className="coupon-top-content">
              <div className="coupon-eyebrow">FREE SHIPPING</div>

              <div className="coupon-main-offer shipping-offer">
                <span className="large-text">Free</span>
                <span className="large-text">Delivery</span>
              </div>


              <div className="coupon-top-desc">
                <p>On all orders</p>
                <p>No minimum purchase</p>
              </div>

              <div
                className="coupon-code-wrapper"
                onClick={() => handleCopy('FREESHIP')}
                style={{ cursor: 'pointer' }}
                title="Copy Code"
              >
                CODE: FREESHIP
              </div>
            </div>

            <div className="coupon-image-right">
              <img src={imgShipping} alt="Free Shipping" />
            </div>
          </div>

          <div className="coupon-bottom">
            <div className="coupon-header">
              <h3 className="coupon-title">Free Shipping</h3>
              <button className="coupon-heart-btn" aria-label="Save coupon">
                <Heart size={20} />
              </button>
            </div>

            <div className="coupon-desc">
              <p>Enjoy free delivery on every order.</p>
              <p>No minimum purchase.</p>
            </div>

            <div className="coupon-divider"></div>

            <div className="coupon-validity">
              <Calendar size={18} className="coupon-cal-icon" />
              <span>Valid Till 30 Sep, 2026</span>
            </div>

            <button className="coupon-get-btn" onClick={() => handleCopy('FREESHIP')}>
              {copiedCode === 'FREESHIP' ? (
                <><Check size={20} className="coupon-ticket-icon" /> Copied!</>
              ) : (
                <><Copy size={20} className="coupon-ticket-icon" /> Copy Code</>
              )}
            </button>
          </div>
        </div>

        {/* Card 2: Beauty */}
        <div className="coupon-card">
          <div className="coupon-top coupon-top-beauty">
            <div className="coupon-top-content">
              <div className="coupon-eyebrow">BEAUTY OFFER</div>

              <div className="coupon-main-offer beauty-offer">
                <span className="medium-text">Flat</span>
                <span className="giant-text">₹299</span>
                <span className="medium-text">OFF</span>
              </div>

              <div className="coupon-top-desc">
                <p>On orders above ₹999</p>
              </div>

              <div
                className="coupon-code-wrapper"
                onClick={() => handleCopy('BEAUTY299')}
                style={{ cursor: 'pointer' }}
                title="Copy Code"
              >
                CODE: BEAUTY299
              </div>
            </div>

            <div className="coupon-image-right">
              <img src={imgBeauty} alt="Beauty Offer" />
            </div>
          </div>

          <div className="coupon-bottom">
            <div className="coupon-header">
              <h3 className="coupon-title">Just Herbs</h3>
              <button className="coupon-heart-btn" aria-label="Save coupon">
                <Heart size={20} />
              </button>
            </div>

            <div className="coupon-desc">
              <p>Get flat ₹299 off on orders</p>
              <p>above ₹999</p>
            </div>

            <div className="coupon-divider"></div>

            <div className="coupon-validity">
              <Calendar size={18} className="coupon-cal-icon" />
              <span>Expires in 2 days</span>
            </div>

            <button className="coupon-get-btn" onClick={() => handleCopy('BEAUTY299')}>
              {copiedCode === 'BEAUTY299' ? (
                <><Check size={20} className="coupon-ticket-icon" /> Copied!</>
              ) : (
                <><Copy size={20} className="coupon-ticket-icon" /> Copy Code</>
              )}
            </button>
          </div>
        </div>

        {/* Card 3: Fashion */}
        <div className="coupon-card">
          <div className="coupon-top coupon-top-fashion">
            <div className="coupon-top-content">
              <div className="coupon-eyebrow">FASHION</div>
              <div className="coupon-sub-script">Special Offer</div>

              <div className="coupon-main-offer fashion-offer">
                <span className="giant-text">30</span>
                <div className="stacked-text">
                  <span className="stacked-top">%</span>
                  <span className="stacked-bottom">OFF</span>
                </div>
              </div>

              <div className="coupon-top-desc">
                <p>On orders above ₹2999</p>
              </div>

              <div
                className="coupon-code-wrapper"
                onClick={() => handleCopy('STYLE30')}
                style={{ cursor: 'pointer' }}
                title="Copy Code"
              >
                CODE: STYLE30
              </div>
            </div>

            <div className="coupon-image-right">
              <img src={imgFashion} alt="Fashion Offer" className="fashion-img" />
            </div>
          </div>

          <div className="coupon-bottom">
            <div className="coupon-header">
              <h3 className="coupon-title">Fashion Store</h3>
              <button className="coupon-heart-btn" aria-label="Save coupon">
                <Heart size={20} />
              </button>
            </div>

            <div className="coupon-desc">
              <p>Get flat 30% off on orders</p>
              <p>above ₹2999</p>
            </div>

            <div className="coupon-divider"></div>

            <div className="coupon-validity">
              <Calendar size={18} className="coupon-cal-icon" />
              <span>Valid Till 31 Aug, 2026</span>
            </div>

            <button className="coupon-get-btn" onClick={() => handleCopy('STYLE30')}>
              {copiedCode === 'STYLE30' ? (
                <><Check size={20} className="coupon-ticket-icon" /> Copied!</>
              ) : (
                <><Copy size={20} className="coupon-ticket-icon" /> Copy Code</>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromoBanner;
