import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react';
import './OrderConfirmed.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const OrderConfirmed = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      // If we don't have a real mongo ID (e.g. it's the mock ORD12345), just show mock for now
      if (!orderId || orderId.startsWith('ORD')) {
        setTimeout(() => {
          setOrder({
            orderId: orderId || 'LX78451236',
            createdAt: new Date().toISOString(),
            orderStatus: 'Processing',
            paymentMethod: 'Prepaid'
          });
          setIsLoading(false);
        }, 1000);
        return;
      }

      const res = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success && data.data) {
        setOrder(data.data);
      } else {
        setError(data.message || 'Failed to fetch order details');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching order details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="oc-page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Loader2 className="spinner" size={40} color="#c99a53" style={{ animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="oc-page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Oops!</h2>
          <p>{error || 'Order not found'}</p>
          <button className="oc-view-orders-btn" onClick={() => navigate('/account/orders')} style={{ margin: '20px auto' }}>
            View My Orders
          </button>
        </div>
      </div>
    );
  }

  const deliveryDate = new Date(order.createdAt);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const deliveryDateEnd = new Date(deliveryDate);
  deliveryDateEnd.setDate(deliveryDateEnd.getDate() + 2);

  return (
    <div className="oc-page-wrapper">
      <div className="oc-container">
        
        {/* Background Decorative Elements */}
        <div className="oc-bg-waves"></div>
        
        {/* Floating Confetti */}
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
              <span className="oc-fb-value">{order.orderId || order._id}</span>
            </div>
          </div>

          <div className="oc-fb-divider"></div>

          <div className="oc-fb-col">
            <div className="oc-fb-icon">
              <Calendar size={20} color="#c99a53" />
            </div>
            <div className="oc-fb-text">
              <span className="oc-fb-label">Order Date</span>
              <span className="oc-fb-value">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="oc-fb-divider"></div>

          <div className="oc-fb-col">
            <div className="oc-fb-icon">
              <Clock size={20} color="#c99a53" />
            </div>
            <div className="oc-fb-text">
              <span className="oc-fb-label">Estimated Delivery</span>
              <span className="oc-fb-value">{deliveryDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – {deliveryDateEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
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
