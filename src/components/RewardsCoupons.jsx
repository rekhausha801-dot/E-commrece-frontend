import React from 'react';
import './RewardsCoupons.css';
import { 
  Truck, 
  CheckCircle2, 
  Copy, 
  ArrowRight, 
  Gift,
  Lock,
  Tag,
  Star,
  Sparkles,
  Users
} from 'lucide-react';
import kurti1 from '../assets/images/kurti.png';
import kurti2 from '../assets/images/kurthi2.png';

const RewardsCoupons = ({ hideHeader = false }) => {
  return (
    <section className="rc-container">
      {/* Header */}
      {!hideHeader && (
        <div className="rc-header">
          <div className="rc-header-left">
            <div className="rc-header-icon">
              <Gift size={28} />
            </div>
            <div className="rc-title-wrap">
              <h2 className="rc-title">Rewards & Coupons</h2>
              <p className="rc-subtitle">Complete simple tasks and unlock exciting rewards!</p>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 4 Cards */}
      <div className="rc-grid">
        
        {/* Card 1: Green */}
        <div className="rc-card rc-card-green">
          <div className="rc-card-top">
            <div className="rc-card-header-row">
              <div className="rc-icon-circle">
                <Truck size={24} />
              </div>
              <div className="rc-badge">
                <Lock size={12} /> UNLOCKED
              </div>
            </div>
            <h3 className="rc-card-title">First Login</h3>
            <p className="rc-card-reward">Free Shipping</p>
            
            <div className="rc-star-divider">
              <Star size={10} fill="currentColor" />
            </div>

            <div className="rc-coupon-dashed">
              <Gift size={16} /> Coupon Code: FREESHIP
            </div>
          </div>
          <div className="rc-bottom-section">
            <div className="rc-info-box">
              <CheckCircle2 size={18} /> You've Unlocked!
            </div>
            <button className="rc-action-btn">
              Copy Code <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Card 2: Pink (Buy 1 Get 1) */}
        <div className="rc-card rc-card-pink">
          <div className="rc-card-top">
            <div className="rc-card-header-row">
              <div className="rc-icon-circle">
                1+1
              </div>
              <div className="rc-badge">
                <Lock size={12} /> UNLOCKED
              </div>
            </div>
            <h3 className="rc-card-title">Buy 1 Get 1</h3>
            <p className="rc-card-reward">Only on Kurti</p>
            
            <div className="rc-star-divider">
              <Star size={10} fill="currentColor" />
            </div>

            <div className="rc-kurti-graphic">
              <img src={kurti1} alt="Kurti" className="rc-kurti-1" />
              <div className="rc-kurti-badge">1+1</div>
              <img src={kurti2} alt="Kurti" className="rc-kurti-2" />
            </div>

          </div>
          <div className="rc-bottom-section">
            <div className="rc-info-box">
              <Gift size={20} />
              <span style={{textAlign: 'left'}}>Buy any 1 Kurti and<br/>get 1 Kurti FREE!</span>
            </div>
            <button className="rc-action-btn">
              Explore Collection <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 3: Blue (Buy 2 Get 10% OFF) */}
        <div className="rc-card rc-card-blue">
          <div className="rc-card-top">
            <div className="rc-card-header-row">
              <div className="rc-icon-circle">
                <Tag size={24} />
              </div>
              <div className="rc-badge">
                <Lock size={12} /> UNLOCKED
              </div>
            </div>
            <h3 className="rc-card-title">First Login Special</h3>
            <p className="rc-card-reward">Buy 2 Get 10% OFF</p>
            
            <div className="rc-star-divider">
              <Star size={10} fill="currentColor" />
            </div>

            <div className="rc-progress-container">
              <div className="rc-progress-bar">
                <div className="rc-progress-fill"></div>
              </div>
              <div className="rc-progress-text">2 / 2 Completed</div>
            </div>
          </div>
          <div className="rc-bottom-section">
            <div className="rc-info-box">
              <Gift size={20} />
              <span style={{textAlign: 'left'}}>Add 2 items to your cart and<br/>get 10% OFF on your order!</span>
            </div>
            <button className="rc-action-btn">
              Explore Collection <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Card 4: Purple (Refer a Friend) */}
        <div className="rc-card rc-card-purple">
          <div className="rc-card-top">
            <div className="rc-card-header-row">
              <div className="rc-icon-circle">
                <Users size={24} />
              </div>
              <div className="rc-badge">
                <Lock size={12} /> UNLOCKED
              </div>
            </div>
            <h3 className="rc-card-title">Refer a Friend</h3>
            <p className="rc-card-reward">Get ₹100 OFF</p>
            
            <div className="rc-star-divider">
              <Star size={10} fill="currentColor" />
            </div>

            <div className="rc-coupon-dashed">
              <Gift size={16} /> Coupon Code: REFER100
            </div>
          </div>
          <div className="rc-bottom-section">
            <div className="rc-info-box">
              <CheckCircle2 size={18} /> You've Unlocked!
            </div>
            <button className="rc-action-btn">
              Copy Code <Copy size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default RewardsCoupons;
