import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import {
  Check,
  Truck,
  ShieldCheck,
  MapPin,
  Home,
  ShoppingBag,
  Lock,
  ArrowRight,
  ArrowLeft,
  Store,
  Edit2,
  Wallet,
  X,
  Minus,
  Plus
} from 'lucide-react';
import './Summary.css';
import './Payment.css'; // Reuse stepper styles
import './Address.css'; // Reuse drawer styles
import sareeImage from '../../assets/Maroon.png';
import tshirtImage from '../../assets/Tshirt.png';

const Summary = () => {
  const navigate = useNavigate();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [editQty, setEditQty] = useState(1);
  const [editSize, setEditSize] = useState('Free');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateItem = () => {
    setIsEditDrawerOpen(false);
    notification.open({
      message: <span style={{ color: '#1a1a1a', fontSize: '16px', fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>Selection Saved</span>,
      description: <span style={{ color: '#666', fontSize: '14px', fontFamily: "'Inter', sans-serif" }}>Your item details have been successfully updated.</span>,
      icon: (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#c99a53',
          border: '1px solid #c99a53',
          borderRadius: '50%',
          width: '36px',
          height: '36px',
          boxShadow: '0 4px 12px rgba(201, 154, 83, 0.3)'
        }}>
          <Check size={20} color="#ffffff" strokeWidth={2.5} />
        </div>
      ),
      placement: 'bottomRight',
      duration: 3,
      style: {
        borderRadius: '12px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
        border: '1px solid #f0e9df',
        backgroundColor: '#ffffff',
        padding: '20px 24px'
      }
    });
  };

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
            <span className="lux-step-label">Addresses</span>
          </div>
          <div className="lux-step-line completed"></div>

          <div className="lux-step completed" onClick={() => navigate('/payment')}>
            <div className="lux-step-icon"><Check size={16} /></div>
            <span className="lux-step-label">Payment</span>
          </div>
          <div className="lux-step-line completed"></div>

          <div className="lux-step active">
            <div className="lux-step-icon">4</div>
            <span className="lux-step-label">Summary</span>
          </div>
        </div>

        <div className="lux-summary-layout">
          {/* Left Column */}
          <div className="lux-summary-left">
            <h2 className="summary-section-title">Product Details</h2>

            {/* Product Card 1 */}
            <div className="summary-product-card">
              <div className="spc-delivery-banner">
                <Truck size={16} className="gold-icon" />
                <span>Estimated Delivery by Monday, 03rd Aug</span>
              </div>
              <div className="spc-divider"></div>

              <div className="spc-content">
                <div className="spc-image-wrap">
                  <img src={sareeImage} alt="Saree" className="spc-image" />
                </div>

                <div className="spc-details">
                  <h3 className="spc-title">GEORGETTE EMBROIDERY WORK SAREE</h3>
                  <div className="spc-price">₹468</div>
                  <div className="spc-returns">
                    <Check size={14} color="#2a7e4f" />
                    <span>All issue easy returns</span>
                  </div>
                  <div className="spc-meta">
                    Size: Free Size &nbsp;&bull;&nbsp; Qty: 1
                  </div>
                </div>

                <button className="spc-edit-btn" onClick={() => setIsEditDrawerOpen(true)}>
                  <Edit2 size={12} /> Edit
                </button>
              </div>

              <div className="spc-divider"></div>
              <div className="spc-footer">
                <Store size={14} className="gold-icon" />
                <span>Sold by: Silkora_Saree</span>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="summary-product-card">
              <div className="spc-delivery-banner">
                <Truck size={16} className="gold-icon" />
                <span>Estimated Delivery by Tuesday, 04th Aug</span>
              </div>
              <div className="spc-divider"></div>

              <div className="spc-content">
                <div className="spc-image-wrap">
                  <img src={tshirtImage} alt="T-Shirt" className="spc-image" />
                </div>

                <div className="spc-details">
                  <h3 className="spc-title">4 PCS Crochet Threads, Soft Threads for Crocheting...</h3>
                  <div className="spc-price">₹124</div>
                  <div className="spc-returns">
                    <Check size={14} color="#2a7e4f" />
                    <span>All issue easy returns</span>
                  </div>
                  <div className="spc-meta">
                    Size: Free Size &nbsp;&bull;&nbsp; Qty: 1
                  </div>
                </div>

                <button className="spc-edit-btn" onClick={() => setIsEditDrawerOpen(true)}>
                  <Edit2 size={12} /> Edit
                </button>
              </div>
            </div>

            {/* Address Card */}
            <div className="summary-address-card" style={{ marginBottom: '20px' }}>
              <h2 className="summary-section-title with-icon" style={{ margin: '0 0 20px 0', paddingBottom: '16px', borderBottom: '1px dashed #e6dfd5', color: '#3d3224' }}>
                <MapPin size={20} color="#c99a53" />
                Delivery Address
              </h2>
              <div className="sac-content">
                <div className="sac-icon-box">
                  <Home size={20} color="#c99a53" />
                </div>
                <div className="sac-details">
                  <div className="sac-header">
                    <span className="sac-name">Home</span>
                    <span className="sac-tag">Default</span>
                  </div>
                  <p className="sac-text">
                    123, MG Road, Near City Mall,<br />
                    Bangalore, Karnataka 560001
                  </p>
                </div>
                <button className="spc-edit-btn" onClick={() => navigate('/address')}>
                  <Edit2 size={12} /> Edit
                </button>
              </div>
            </div>

            {/* Payment Card */}
            <div className="summary-address-card">
              <h2 className="summary-section-title with-icon" style={{ margin: '0 0 20px 0', paddingBottom: '16px', borderBottom: '1px dashed #e6dfd5', color: '#3d3224' }}>
                <Wallet size={20} color="#c99a53" />
                Payment Method
              </h2>
              <div className="sac-content">
                <div className="sac-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c99a53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M6 12h.01M18 12h.01" />
                  </svg>
                </div>
                <div className="sac-details">
                  <div className="sac-header">
                    <span className="sac-name">Cash on Delivery</span>
                  </div>
                  <p className="sac-text">
                    Pay with cash upon delivery.
                  </p>
                </div>
                <button className="spc-edit-btn" onClick={() => navigate('/payment')}>
                  <Edit2 size={12} /> Edit
                </button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lux-summary-right">
            <div className="summary-price-card">
              <div className="sp-header">
                <div className="sp-icon-box">
                  <ShoppingBag size={20} color="#c99a53" />
                </div>
                <h3 className="sp-title">Price Details (10 Items)</h3>
              </div>

              <div className="sp-divider"></div>

              <div className="sp-body">
                <div className="sp-row">
                  <span className="sp-label">Product Price</span>
                  <span className="sp-val">₹2138</span>
                </div>
                <div className="sp-row">
                  <span className="sp-label">Additional Fees</span>
                  <span className="sp-val">₹60</span>
                </div>
              </div>

              <div className="sp-divider sp-divider-bottom"></div>

              <div className="sp-total-row">
                <span className="sp-total-label">Order Total</span>
                <span className="sp-total-val">₹2198</span>
              </div>

              <div className="sp-savings-banner">
                <ShieldCheck size={16} />
                <span>You are saving ₹237 on this order</span>
              </div>

              <button className="sp-place-order-btn" onClick={() => navigate('/order-confirmed')}>
                <div className="sp-btn-content">
                  <Lock size={16} /> Place Order
                </div>
                <ArrowRight size={18} />
              </button>

              <div className="sp-or-divider">
                <span>or</span>
              </div>

              <button className="sp-continue-shopping-btn" onClick={() => navigate('/')}>
                <ArrowLeft size={16} /> Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Edit Item Drawer */}
      {isEditDrawerOpen && (
        <>
          <div className="drawer-overlay premium" onClick={() => setIsEditDrawerOpen(false)}></div>
          <div className="premium-edit-drawer">
            <div className="ped-header">
              <h3>Modify Selection</h3>
              <button onClick={() => setIsEditDrawerOpen(false)} className="ped-close-btn">
                <X size={20} color="#1A1A1A" />
              </button>
            </div>

            <div className="ped-content">
              <div className="ped-product-preview">
                <img src={sareeImage} alt="Product" className="ped-img" />
                <div className="ped-info">
                  <span className="ped-brand">SILKORA</span>
                  <h4>Georgette Embroidery Work Saree</h4>
                  <div className="ped-price">₹468</div>
                </div>
              </div>

              <div className="ped-divider"></div>

              <div className="ped-section">
                <label className="ped-label">Select Size</label>
                <div className="ped-size-grid">
                  <div className={`ped-size-box ${editSize === 'S' ? 'active' : ''}`} onClick={() => setEditSize('S')}>S</div>
                  <div className={`ped-size-box ${editSize === 'M' ? 'active' : ''}`} onClick={() => setEditSize('M')}>M</div>
                  <div className={`ped-size-box ${editSize === 'Free' ? 'active' : ''}`} onClick={() => setEditSize('Free')}>Free</div>
                  <div className={`ped-size-box ${editSize === 'XL' ? 'active' : ''}`} onClick={() => setEditSize('XL')}>XL</div>
                </div>
              </div>

              <div className="ped-section">
                <label className="ped-label">Quantity</label>
                <div className="ped-qty-wrapper">
                  <button className="ped-qty-btn" onClick={() => setEditQty(q => Math.max(1, q - 1))}><Minus size={16} /></button>
                  <span className="ped-qty-val">{editQty}</span>
                  <button className="ped-qty-btn" onClick={() => setEditQty(q => q + 1)}><Plus size={16} /></button>
                </div>
              </div>
            </div>

            <div className="ped-footer">
              <button className="ped-save-btn" onClick={handleUpdateItem}>
                Update Item
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;
