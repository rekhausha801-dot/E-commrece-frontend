import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Calendar, Clock, ArrowRight } from 'lucide-react';
import './OrderConfirmed.css';

const OrderConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="oc-page-wrapper">
      <div className="oc-container">
        
        {/* Background Decorative Elements */}
        <div className="oc-bg-waves"></div>
        
        {/* Floating Confetti (using 6 elements for simplicity) */}
        <div className="oc-confetti c-1"></div>
        <div className="oc-confetti c-2"></div>
        <div className="oc-confetti c-3"></div>
        <div className="oc-confetti c-4"></div>
        <div className="oc-confetti c-5"></div>
        <div className="oc-confetti c-6"></div>

        {/* Main Badge */}
        <div className="oc-badge-wrapper">
          <div className="oc-badge-outer-ring"></div>
          <div className="oc-badge-inner-circle">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c99a53" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="4 12 9 17 20 6" className="oc-checkmark"></polyline>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="oc-title">Order Confirmed!</h1>
        
        <div className="oc-divider">
          <div className="oc-divider-line"></div>
          <div className="oc-divider-star">✦</div>
          <div className="oc-divider-line"></div>
        </div>

        <p className="oc-subtitle-black">Thank you for shopping with us.</p>
        <p className="oc-subtitle-gold">Your order is being processed.</p>

        {/* Footer Bar */}
        <div className="oc-footer-bar">
          
          <div className="oc-fb-col">
            <div className="oc-fb-icon">
              <Package size={20} color="#c99a53" />
            </div>
            <div className="oc-fb-text">
              <span className="oc-fb-label">Order ID</span>
              <span className="oc-fb-value">LX78451236</span>
            </div>
          </div>

          <div className="oc-fb-divider"></div>

          <div className="oc-fb-col">
            <div className="oc-fb-icon">
              <Calendar size={20} color="#c99a53" />
            </div>
            <div className="oc-fb-text">
              <span className="oc-fb-label">Order Date</span>
              <span className="oc-fb-value">25 May, 2025</span>
            </div>
          </div>

          <div className="oc-fb-divider"></div>

          <div className="oc-fb-col">
            <div className="oc-fb-icon">
              <Clock size={20} color="#c99a53" />
            </div>
            <div className="oc-fb-text">
              <span className="oc-fb-label">Estimated Delivery</span>
              <span className="oc-fb-value">28 May – 30 May, 2025</span>
            </div>
          </div>

          <button className="oc-view-orders-btn" onClick={() => navigate('/account/orders')}>
            View My Orders <ArrowRight size={16} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderConfirmed;
