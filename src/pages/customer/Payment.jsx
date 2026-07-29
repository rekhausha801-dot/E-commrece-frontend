import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Lock,
  ArrowRight,
  Tag,
  ShieldCheck,
  RefreshCw,
  Phone,
  Mail,
  Headset,
  CreditCard
} from 'lucide-react';
import './Payment.css';
import './Cart.css';

const Payment = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [selectedMethod, setSelectedMethod] = useState('cod');

  return (
    <div className="lux-payment-page">
      <div className="lux-cart-container">
        {/* Stepper */}
        <div className="lux-stepper-container">
          <div className="lux-step completed" onClick={() => navigate('/cart')}>
            <div className="lux-step-icon"><Check size={16} /></div>
            <span className="lux-step-label">Cart</span>
          </div>
          <div className="lux-step-line completed"></div>

          <div className="lux-step completed" onClick={() => navigate('/address')}>
            <div className="lux-step-icon"><Check size={16} /></div>
            <span className="lux-step-label">Address</span>
          </div>
          <div className="lux-step-line completed"></div>

          <div className="lux-step active">
            <div className="lux-step-icon">3</div>
            <span className="lux-step-label">Payment</span>
          </div>
          <div className="lux-step-line pending"></div>

          <div className="lux-step pending">
            <div className="lux-step-icon">4</div>
            <span className="lux-step-label">Summary</span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="lux-payment-layout">
          {/* Left Column */}
          <div className="lux-payment-left">
            <div className="payment-title-block">
              <h2 className="payment-title">
                Select <span className="premium-accent">Payment</span> Method
              </h2>
            </div>

            <div className="payment-options-list">
              {/* Cash on Delivery */}
              <div
                className={`payment-option-card ${selectedMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('cod')}
              >
                <div className="po-icon-box">
                  {/* Wallet/Cash icon placeholder */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c99a53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                </div>

                <div className="po-body">
                  <div className="po-top-row">
                    <div className="po-name-group">
                      <span className="po-name">Cash on Delivery</span>
                      <span className="cod-tag">COD</span>
                    </div>
                    <span className="po-price">₹2183</span>
                  </div>
                  <p className="po-desc">Pay in cash when your order is delivered</p>
                </div>

                <div className={`po-radio ${selectedMethod === 'cod' ? 'checked' : ''}`}>
                  {selectedMethod === 'cod' && <Check size={14} color="#FFF" strokeWidth={3} />}
                </div>
              </div>

              {/* Pay Online */}
              <div
                className={`payment-option-card ${selectedMethod === 'online' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('online')}
              >
                <div className="po-icon-box">
                  <CreditCard size={24} color="#c99a53" />
                </div>

                <div className="po-body">
                  <div className="po-top-row">
                    <div className="po-name-group">
                      <span className="po-name">Pay Online</span>
                      <span className="save-tag">Save ₹237</span>
                    </div>
                    <div className="po-price-group">
                      <span className="po-old-price">₹2183</span>
                      <span className="po-new-price">₹1946</span>
                    </div>
                  </div>
                  <p className="po-desc">UPI, Cards, Net Banking &amp; Wallets</p>

                  {/* Payment Icons Row */}
                  <div className="payment-icons-row">
                    <span style={{ fontWeight: 'bold', color: '#1a1f71', fontSize: '13px' }}>VISA</span>
                    <span style={{ fontWeight: 'bold', color: '#eb001b', fontSize: '13px' }}>MC</span>
                    <span style={{ fontWeight: 'bold', color: '#0070ba', fontSize: '13px' }}>RuPay</span>
                    <span style={{ fontStyle: 'italic', fontWeight: 'bold', fontSize: '14px', color: '#005445' }}>UPI</span>
                    <span style={{ fontWeight: 'bold', color: '#ea4335', fontSize: '12px' }}>G Pay</span>
                    <span style={{ fontWeight: 'bold', color: '#5f259f', fontSize: '12px' }}>PhonePe</span>
                    <span style={{ fontWeight: 'bold', color: '#00baf2', fontSize: '12px' }}>Paytm</span>
                  </div>
                </div>

                <div className={`po-radio ${selectedMethod === 'online' ? 'checked' : ''}`}>
                  {selectedMethod === 'online' && <Check size={14} color="#FFF" strokeWidth={3} />}
                </div>
              </div>

              {/* Wallets */}
              <div
                className={`payment-option-card ${selectedMethod === 'wallets' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('wallets')}
              >
                <div className="po-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c99a53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                  </svg>
                </div>

                <div className="po-body">
                  <div className="po-top-row">
                    <div className="po-name-group">
                      <span className="po-name">Wallets</span>
                    </div>
                  </div>
                  <p className="po-desc">Pay using popular wallets</p>
                </div>

                <div className={`po-radio ${selectedMethod === 'wallets' ? 'checked' : ''}`}>
                  {selectedMethod === 'wallets' && <Check size={14} color="#FFF" strokeWidth={3} />}
                </div>
              </div>

              {/* EMI Options */}
              <div
                className={`payment-option-card ${selectedMethod === 'emi' ? 'selected' : ''}`}
                onClick={() => setSelectedMethod('emi')}
              >
                <div className="po-icon-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c99a53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>

                <div className="po-body">
                  <div className="po-top-row">
                    <div className="po-name-group">
                      <span className="po-name">EMI Options</span>
                    </div>
                  </div>
                  <p className="po-desc">Easy monthly instalments</p>
                </div>

                <div className={`po-radio ${selectedMethod === 'emi' ? 'checked' : ''}`}>
                  {selectedMethod === 'emi' && <Check size={14} color="#FFF" strokeWidth={3} />}
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="left-help-section">
              <div className="left-help-item">
                <Headset size={24} color="#c99a53" strokeWidth={1.5} />
                <div className="lhi-text">
                  <span className="lhi-title">Need Help?</span>
                  <span className="lhi-sub">We're here for you</span>
                </div>
              </div>
              <div className="left-help-item">
                <Phone size={24} color="#c99a53" strokeWidth={1.5} />
                <div className="lhi-text">
                  <span className="lhi-title">+91 98765 43210</span>
                  <span className="lhi-sub">24/7 Customer Support</span>
                </div>
              </div>
              <div className="left-help-item">
                <Mail size={24} color="#c99a53" strokeWidth={1.5} />
                <div className="lhi-text">
                  <span className="lhi-title">support@yourstore.com</span>
                  <span className="lhi-sub">We reply within minutes</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column */}
          <div className="lux-payment-right">
            <div className="price-details-card">
              <h3 className="price-header-title">Order Summary</h3>

              <div className="price-items-banner">
                <div className="items-count-badge">
                  <Lock size={16} color="#c99a53" />
                  <span>10 Items in your cart</span>
                </div>
              </div>

              <div className="price-body">
                <div className="price-row">
                  <span className="price-label">Subtotal (10 Items)</span>
                  <span className="price-val">₹2144</span>
                </div>
                <div className="price-row green-row">
                  <span className="price-label">Discounts</span>
                  <span className="price-val">- ₹21</span>
                </div>
                <div className="price-row green-row">
                  <span className="price-label">Delivery Charges</span>
                  <span className="price-val">FREE</span>
                </div>

                <div className="price-divider"></div>

                <div className="price-total-row">
                  <span className="total-label">Order Total</span>
                  <span className="total-val">₹2183</span>
                </div>
              </div>

              <div className="price-saving-banner">
                <Tag size={16} />
                <span>You saved ₹21 on this order!</span>
              </div>

              <div className="price-footer">
                <div className="continue-info-box">
                  <Lock size={16} color="#555" className="info-lock" />
                  <span>Clicking on 'Continue' will not deduct any money</span>
                </div>

                <button className="place-order-btn-gold" onClick={() => navigate('/summary')}>
                  Continue to Summary <ArrowRight size={18} />
                </button>

                <div className="safe-payments-footer">
                  <ShieldCheck size={16} color="#c99a53" />
                  <span>Safe and secure payments.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
