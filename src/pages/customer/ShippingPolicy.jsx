import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Truck, Clock, ShieldCheck, HelpCircle } from 'lucide-react';
import '../customer/Support.css'; // Reusing support css for consistency

const ShippingPolicy = () => {
  return (
    <div className="faq-page-wrapper">
      <div className="faq-hero-section">
        <div className="faq-breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={14} /> 
          <span className="current">Shipping Policy</span>
        </div>
        
        <div className="faq-hero-content">
          <div className="faq-hero-text">
            <h1>Shipping & Delivery</h1>
            <p>Everything you need to know about<br/>our shipping process and policies.</p>
          </div>
          
          <div className="faq-hero-graphics">
            <div className="graphic-bubble blue-bubble" style={{ background: '#FDF7ED', border: '2px solid #C89953' }}>
              <Truck size={32} color="#C89953" />
            </div>
            <div className="graphic-bubble small-dot"></div>
            <div className="graphic-bubble dots-bubble">
              <span>...</span>
            </div>
            <div className="graphic-bubble yellow-bubble"></div>
          </div>
        </div>
      </div>

      <div className="faq-main-container" style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <div className="faq-list-card" style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '24px', color: '#111827', marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
            Our Shipping Policy
          </h2>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', color: '#C89953', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Truck size={20} /> Free Shipping
            </h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '15px' }}>
              We offer free standard shipping on all orders over ₹999 across India. For orders below ₹999, a nominal flat shipping rate will be applied at checkout.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', color: '#C89953', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Clock size={20} /> Processing & Delivery Times
            </h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '15px' }}>
              All orders are processed within 1-2 business days. Standard delivery typically takes 3-5 business days depending on your location. During peak seasons or sales events, processing may take slightly longer.
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', color: '#C89953', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <ShieldCheck size={20} /> Order Tracking
            </h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '15px' }}>
              Once your order has been dispatched, you will receive an email confirmation containing your shipping tracking number. You can also track your order directly from your Account Dashboard under "My Orders".
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', color: '#C89953', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <HelpCircle size={20} /> Need Assistance?
            </h3>
            <p style={{ color: '#4b5563', lineHeight: '1.6', fontSize: '15px' }}>
              If you have any questions or concerns regarding your order's shipping status, please don't hesitate to <Link to="/support" style={{ color: '#111827', textDecoration: 'underline', fontWeight: '500' }}>contact our support team</Link>. We are always here to help!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
