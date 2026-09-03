import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification, Modal, message } from 'antd';
import {
  Check,
  Lock,
  ArrowRight,
  ArrowLeft,
  Tag,
  ShieldCheck,
  CreditCard,
  MapPin,
  Truck,
  Home,
  ShoppingBag,
  Edit2
} from 'lucide-react';
import './Payment.css';
import '../customer/Summary.css'; // Reuse summary styles
import CheckoutStepper from '../../components/CheckoutStepper';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useNotification } from '../../context/NotificationContext';
import { createOrderApi, processPaymentApi, getOffers, checkCouponUsageApi } from '../../services/api';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, buyNowData, clearBuyNowData, selectedAddress, selectedPaymentMethod, setSelectedPaymentMethod, cartPricing } = useCart();
  const { addOrder } = useOrders();
  const { addNotification } = useNotification();

  const [selectedMethod, setSelectedMethod] = useState('cod');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Payment Status State
  const [paymentStatus, setPaymentStatus] = useState('idle'); 
  const [onlineMethod, setOnlineMethod] = useState('');
  const [walletProvider, setWalletProvider] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [orderId, setOrderId] = useState(null);
  const [activeTab, setActiveTab] = useState('cod');

  // Coupon state
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [enteredCode, setEnteredCode] = useState('');
  const [selectedCouponCode, setSelectedCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponUsedModalOpen, setCouponUsedModalOpen] = useState(false);

  // We read the base cartPricing which already has correct subtotal, productDiscount, tax, and shipping.
  // The only thing we override dynamically here is couponDiscount, which updates tax and grandTotal.
  const baseSubtotal = cartPricing.subtotal || 0;
  const baseProductDiscount = cartPricing.productDiscount || 0;
  const baseShippingFee = cartPricing.shippingFee || 0;
  
  const [couponDiscount, setCouponDiscount] = useState(0);

  const totalDiscount = baseProductDiscount + couponDiscount;
  const tax = Math.max(0, (baseSubtotal - baseProductDiscount) * 0.041);
  const appliedShippingFee = baseSubtotal > 0 ? baseShippingFee : 0;
  const grandTotal = baseSubtotal > 0 ? Math.max(0, baseSubtotal - baseProductDiscount - couponDiscount + tax + appliedShippingFee) : 0;

  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await getOffers();
        if (data.success) {
          const mapped = data.data.filter(c => c.isActive).map(c => {
            const calculatedSave = c.discountType === 'Percentage' 
              ? Math.floor((baseSubtotal * c.discountValue) / 100) 
              : c.discountValue;
            
            return {
              code: c.couponCode,
              save: calculatedSave,
              desc: c.description || (c.discountType === 'Percentage' ? `${c.discountValue}% off` : `₹${c.discountValue} off`),
              expiry: new Date(c.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
              minPurchase: c.minPurchase || 0,
              discountType: c.discountType,
              discountValue: c.discountValue,
              originalCoupon: c
            };
          });
          setAvailableCoupons(mapped);
        }
      } catch (e) {
        console.error("Failed to fetch coupons", e);
      }
    };
    fetchCoupons();
  }, [baseSubtotal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let activeItems = [];
  if (buyNowData) {
    if (Array.isArray(buyNowData)) activeItems = buyNowData;
    else if (buyNowData.items && Array.isArray(buyNowData.items)) activeItems = buyNowData.items;
    else if (buyNowData.products && Array.isArray(buyNowData.products)) activeItems = buyNowData.products;
    else if (buyNowData.productId || buyNowData.id || buyNowData._id) activeItems = [buyNowData];
  }
  if (!activeItems || activeItems.length === 0) activeItems = cartItems || [];

  const cartItemCount = activeItems.reduce((acc, item) => acc + (item.qty || item.quantity || 1), 0);

  if (!selectedAddress) {
    return (
      <div className="lux-payment-page" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
            <MapPin size={48} color="#e53e3e" style={{ margin: '0 auto 20px auto' }} />
            <h2 style={{ color: '#1a1a1a', marginBottom: '12px' }}>Address Missing</h2>
            <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.5' }}>Please select a delivery address to continue.</p>
            <button 
              onClick={() => navigate('/address')}
              style={{ backgroundColor: '#c99a53', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}
            >
              Return to Address Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleApplyCoupon = async () => {
    const codeToApply = enteredCode || selectedCouponCode;
    const found = availableCoupons.find(c => c.code.toUpperCase() === codeToApply.toUpperCase());
    if (found) {
      if (baseSubtotal < found.minPurchase) {
        message.error(`Minimum purchase of ₹${found.minPurchase} required`);
        return;
      }

      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const user = JSON.parse(userStr);
          if (user && user.email) {
            const { data } = await checkCouponUsageApi({ code: codeToApply, email: user.email });
            if (data.used) {
              setIsCouponModalOpen(false);
              setCouponUsedModalOpen(true);
              return;
            }
          }
        }
      } catch (err) {
        console.error("Error checking coupon usage", err);
        // If the backend returned a 400 with our message about already using a coupon
        if (err.response && err.response.status === 400 && err.response.data.message.includes('already used a coupon')) {
           setIsCouponModalOpen(false);
           setCouponUsedModalOpen(true);
           return;
        } else if (err.response && err.response.status === 400) {
           message.error(err.response.data.message);
           return;
        }
      }

      setAppliedCoupon(found);
      setCouponDiscount(found.save);
      setIsCouponModalOpen(false);
      message.success('Coupon Applied Successfully');
    } else if (codeToApply) {
      message.error('Invalid Coupon Code');
    }
  };

  const processOnlinePayment = async () => {
    setPaymentStatus('processing');
    setPaymentError('');
    try {
      const payload = {
        checkoutType: buyNowData ? 'buyNow' : 'cart',
        items: activeItems.map(item => ({
          productId: item.productId || item.id || item._id,
          productName: item.name || item.productName || item.title || 'Product',
          quantity: item.qty || item.quantity || 1,
          size: item.size || item.selectedSize || 'Free',
          color: item.color || item.selectedColor || 'Default',
          customText: item.customText || null,
          customTextColor: item.customTextColor || null,
          customTextFont: item.customTextFont || null,
          selectedDesign: item.selectedDesign || null,
          selectedDesignColor: item.selectedDesignColor || null,
          colorizeImage: item.colorizeImage || false
        })),
        paymentMethod: {
          type: 'online',
          method: onlineMethod
        },
        couponCode: appliedCoupon ? appliedCoupon.code : ''
      };

      const response = await processPaymentApi(payload);
      
      if (response.data.success) {
        setPaymentStatus('success');
        // Wait briefly so user sees the success state, then finalize order
        setTimeout(() => {
          processOrderCreation(response.data.payment.paymentId);
        }, 1500);
      } else {
        setPaymentStatus('failed');
        setPaymentError(response.data.message || 'Payment failed');
      }
    } catch (error) {
      setPaymentStatus('failed');
      setPaymentError(error.response?.data?.message || error.message);
    }
  };

  const processOrderCreation = async (paymentId = null) => {
    if (cartItemCount === 0) return;
    
    setIsPlacingOrder(true);
    try {
      const payload = {
        checkoutType: buyNowData ? 'buyNow' : 'cart',
        items: activeItems.map(item => ({
          productId: item.productId || item.id || item._id,
          productName: item.name || item.productName || item.title || 'Product',
          quantity: item.qty || item.quantity || 1,
          size: item.size || item.selectedSize || 'Free',
          color: item.color || item.selectedColor || 'Default',
          customText: item.customText || null,
          customTextColor: item.customTextColor || null,
          customTextFont: item.customTextFont || null,
          selectedDesign: item.selectedDesign || null,
          selectedDesignColor: item.selectedDesignColor || null,
          colorizeImage: item.colorizeImage || false
        })),
        addressId: selectedAddress._id || selectedAddress.id,
        paymentMethod: {
          type: selectedMethod,
          label: selectedMethod === 'cod' ? 'Cash on Delivery' : 'Pay Online',
          method: selectedMethod === 'online' ? onlineMethod : ''
        },
        couponCode: appliedCoupon ? appliedCoupon.code : '',
        couponDiscount: couponDiscount || 0
      };

      if (paymentId) {
        payload.paymentId = paymentId;
      }

      let orderId = `ORD${Math.floor(100000 + Math.random() * 900000)}`;

      if (typeof createOrderApi === 'function') {
        const response = await createOrderApi(payload);
        if (response?.data?.success && response.data.data) {
           orderId = response.data.data._id || response.data.data.orderId || response.data.data.orderNumber || orderId;
        }
      }

      if (typeof addOrder === 'function') {
        const newOrderObj = {
          id: orderId,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          createdAt: new Date().toISOString(),
          products: activeItems.map(item => ({
            productName: item.name || item.productName || item.title,
            productImage: item.image || item.productImage || '',
            quantity: item.qty || item.quantity || 1,
            price: grandTotal / cartItemCount, // approximation
            size: item.size || 'Free',
            color: item.color || 'Default',
          })),
          amount: grandTotal,
          total: grandTotal,
          payment: selectedMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online',
          status: 'Processing',
          orderStatus: 'Processing'
        };
        addOrder(newOrderObj);
      }

      navigate(`/order-confirmed/${orderId}`, { replace: true });
      
      setTimeout(() => {
        if (buyNowData) clearBuyNowData();
        else clearCart();
      }, 0);

      if (addNotification) {
        addNotification({
          title: "Order Confirmed",
          message: "Your order has been confirmed successfully.",
          time: "Just now",
          type: "order"
        });
      }

    } catch (error) {
      console.error('Failed to place order:', error);
      const backendError = error.response?.data?.message || error.message || 'Order creation failed.';
      console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      console.error('BACKEND ERROR MESSAGE IS: ', backendError);
      console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      message.error(backendError);
      setPaymentStatus('failed');
      setPaymentError(backendError);
    } finally {
      setIsPlacingOrder(false);
      // We don't close modal here immediately if it failed, so user can read the error
    }
  };

  const handleActionClick = () => {
    if (selectedMethod === 'cod') {
      processOrderCreation();
    } else if (selectedMethod === 'online') {
      setPaymentStatus('idle');
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <div className="lux-payment-page">
      {/* Coupon Already Used Modal */}
      <Modal
        open={couponUsedModalOpen}
        onCancel={() => setCouponUsedModalOpen(false)}
        onOk={() => setCouponUsedModalOpen(false)}
        okText="OK"
        cancelButtonProps={{ style: { display: 'none' } }}
        centered
        closable={true}
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#c0392b' }}>
            <span style={{ fontSize: '22px' }}>⚠️</span>
            <span style={{ fontWeight: 700, fontSize: '18px' }}>Coupon Already Used</span>
          </div>
        }
      >
        <div style={{ padding: '10px 0', textAlign: 'center' }}>
          <div style={{ fontSize: '52px', marginBottom: '12px' }}>🎟️</div>
          <p style={{ fontSize: '16px', color: '#333', marginBottom: '8px', fontWeight: 600 }}>
            You have already used a coupon!
          </p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Each customer can only use <strong>one coupon in total</strong>. You cannot apply any more coupons.
          </p>
        </div>
      </Modal>

      <div className="lux-cart-container">
        <CheckoutStepper currentStep={3} />

        <div className="lux-summary-layout">
          {/* Left Column: Products, Address, Payment Methods */}
          <div className="lux-summary-left">
            <h2 className="summary-section-title">Product Details</h2>

            {activeItems.map((item, index) => (
              <div key={item.id || item.productId || index} className="summary-product-card">
                <div className="spc-delivery-banner">
                  <Truck size={16} className="gold-icon" />
                  <span>Estimated Delivery Tomorrow</span>
                </div>
                <div className="spc-divider"></div>

                <div className="spc-content">
                  <div className="spc-image-wrap" style={{ position: 'relative' }}>
                    <img src={item.image || item.productImage || '/placeholder-product.png'} alt={item.name || item.title || item.productName} className="spc-image" />
                    {item.selectedDesign && item.selectedDesign.icon && (
                      <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: '35%', mixBlendMode: 'multiply', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.colorizeImage && item.selectedDesignColor && item.selectedDesignColor !== '#000000' ? (
                          <div style={{
                            width: '100%', height: '100%',
                            backgroundColor: item.selectedDesignColor,
                            WebkitMaskImage: `url(${item.selectedDesign.icon})`,
                            WebkitMaskSize: 'contain',
                            WebkitMaskPosition: 'center',
                            WebkitMaskRepeat: 'no-repeat',
                            maskImage: `url(${item.selectedDesign.icon})`,
                            maskSize: 'contain',
                            maskPosition: 'center',
                            maskRepeat: 'no-repeat'
                          }} title={item.selectedDesign.name} />
                        ) : (
                          <>
                            <img src={item.selectedDesign.icon} alt={item.selectedDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            {item.selectedDesignColor && item.selectedDesignColor !== '#000000' && (
                              <div style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                backgroundColor: item.selectedDesignColor,
                                mixBlendMode: 'screen',
                                pointerEvents: 'none',
                                WebkitMaskImage: `url(${item.selectedDesign.icon})`,
                                WebkitMaskSize: 'contain',
                                WebkitMaskPosition: 'center',
                                WebkitMaskRepeat: 'no-repeat',
                                maskImage: `url(${item.selectedDesign.icon})`,
                                maskSize: 'contain',
                                maskPosition: 'center',
                                maskRepeat: 'no-repeat'
                              }} />
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="spc-details">
                    <h3 className="spc-title">{item.name || item.title || item.productName}</h3>
                    <div className="spc-returns">
                      <Check size={14} color="#2a7e4f" />
                      <span>All issue easy returns</span>
                    </div>
                    <div className="spc-meta">
                      Size: {item.size || item.selectedSize || 'Free'} &nbsp;&bull;&nbsp; Qty: {item.qty || item.quantity || 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Address Card */}
            <div className="summary-address-card" style={{ marginBottom: '20px', marginTop: '20px' }}>
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
                    <span className="sac-name">{selectedAddress.fullName}</span>
                    <span className="sac-tag">{selectedAddress.addressType || 'Home'}</span>
                  </div>
                  <p className="sac-text">
                    {selectedAddress.mobileNumber}<br/>
                    {selectedAddress.addressLine1}, {selectedAddress.addressLine2 && `${selectedAddress.addressLine2},`} {selectedAddress.landmark && `${selectedAddress.landmark},`}<br />
                    {selectedAddress.city}, {selectedAddress.state} {selectedAddress.pincode}
                  </p>
                </div>
                <button className="spc-edit-btn" onClick={() => navigate('/address')}>
                  <Edit2 size={12} /> Change
                </button>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="summary-address-card" style={{ marginBottom: '20px' }}>
              <h2 className="summary-section-title with-icon" style={{ margin: '0 0 20px 0', paddingBottom: '16px', borderBottom: '1px dashed #e6dfd5', color: '#3d3224' }}>
                <CreditCard size={20} color="#c99a53" />
                Select Payment Method
              </h2>
              <div className="payment-options-list">
                {/* Cash on Delivery */}
                <div
                  className={`payment-option-card ${selectedMethod === 'cod' ? 'selected' : ''}`}
                  onClick={() => setSelectedMethod('cod')}
                >
                  <div className="po-icon-box">
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
                  style={{ flexDirection: 'column', alignItems: 'stretch' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <div className="po-icon-box">
                      <CreditCard size={24} color="#c99a53" />
                    </div>
                    <div className="po-body">
                      <div className="po-top-row">
                        <div className="po-name-group">
                          <span className="po-name">Pay Online</span>
                        </div>
                      </div>
                      <p className="po-desc">UPI, Cards, Net Banking</p>
                    </div>
                    <div className={`po-radio ${selectedMethod === 'online' ? 'checked' : ''}`}>
                      {selectedMethod === 'online' && <Check size={14} color="#FFF" strokeWidth={3} />}
                    </div>
                  </div>

                  {selectedMethod === 'online' && (
                    <div className="wallet-sub-options" onClick={(e) => e.stopPropagation()} style={{ marginTop: '20px', paddingLeft: '56px' }}>
                      <div className="wallet-item">
                        <input type="radio" id="o-upi" name="online_method" checked={onlineMethod === 'upi'} onChange={() => setOnlineMethod('upi')} />
                        <label htmlFor="o-upi">
                          <span style={{ fontWeight: 'bold', color: '#1a1f71', fontSize: '15px' }}>UPI</span>
                        </label>
                      </div>
                      <div className="wallet-item">
                        <input type="radio" id="o-card" name="online_method" checked={onlineMethod === 'card'} onChange={() => setOnlineMethod('card')} />
                        <label htmlFor="o-card">
                          <span style={{ fontWeight: 'bold', color: '#555', fontSize: '15px' }}>Credit / Debit Card</span>
                        </label>
                      </div>
                      <div className="wallet-item">
                        <input type="radio" id="o-netbanking" name="online_method" checked={onlineMethod === 'netbanking'} onChange={() => setOnlineMethod('netbanking')} />
                        <label htmlFor="o-netbanking">
                          <span style={{ fontWeight: 'bold', color: '#555', fontSize: '15px' }}>Net Banking</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Price Details & Coupons */}
          <div className="lux-summary-right">
            <div className="summary-price-card">
              <div className="sp-header">
                <div className="sp-icon-box">
                  <ShoppingBag size={20} color="#c99a53" />
                </div>
                <h3 className="sp-title">Price Details ({cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'})</h3>
              </div>
              <div className="sp-divider"></div>

              <div className="sp-body">
                <div className="sp-row">
                  <span className="sp-label">Subtotal</span>
                  <span className="sp-val">₹{baseSubtotal.toFixed(2)}</span>
                </div>
                <div className="sp-row">
                  <span className="sp-label">Product Discount</span>
                  <span className="sp-val" style={{ color: '#2a7e4f' }}>-₹{baseProductDiscount.toFixed(2)}</span>
                </div>
                <div className="sp-row sp-coupon-row">
                  <span className="sp-label">Coupon Discount</span>
                  {appliedCoupon ? (
                    <div className="sp-coupon-applied">
                      <span className="sp-val sp-discount">-₹{couponDiscount.toFixed(2)}</span>
                      <button className="sp-remove-coupon" onClick={() => { setAppliedCoupon(null); setCouponDiscount(0); }}>Remove</button>
                    </div>
                  ) : (
                    <button 
                      className="sp-apply-coupon" 
                      onClick={() => {
                        if (baseSubtotal >= 2000) {
                          setIsCouponModalOpen(true);
                        } else {
                          Modal.warning({
                            title: 'Minimum Purchase Required',
                            content: 'Minimum purchase of ₹2000 is required to apply coupons.',
                            okText: 'OK',
                            centered: true
                          });
                        }
                      }}
                    >
                      Apply Coupon
                    </button>
                  )}
                </div>
                <div className="sp-row">
                  <span className="sp-label">GST</span>
                  <span className="sp-val">₹{tax.toFixed(2)}</span>
                </div>
                <div className="sp-row">
                  <span className="sp-label">Delivery Charges</span>
                  {appliedShippingFee === 0 ? (
                    <span className="sp-val" style={{ color: '#2a7e4f' }}>FREE</span>
                  ) : (
                    <span className="sp-val">₹{appliedShippingFee.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="sp-divider sp-divider-bottom"></div>

              <div className="sp-total-row">
                <span className="sp-total-label">Order Total</span>
                <span className="sp-total-val">₹{grandTotal.toFixed(2)}</span>
              </div>

              <div className="sp-savings-banner">
                <ShieldCheck size={16} />
                <span>You are saving ₹{(totalDiscount).toFixed(2)} on this order</span>
              </div>

              <button 
                className="sp-place-order-btn" 
                onClick={handleActionClick}
                disabled={isPlacingOrder}
                style={{ opacity: isPlacingOrder ? 0.6 : 1 }}
              >
                <div className="sp-btn-content">
                  <Lock size={16} /> {isPlacingOrder ? "Processing..." : (selectedMethod === 'cod' ? "Place Order" : `Pay ₹${grandTotal.toFixed(2)}`)}
                </div>
                {!isPlacingOrder && <ArrowRight size={18} />}
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

      {/* Coupon Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '600', color: '#3d3224' }}>
            <Tag size={20} color="#c99a53" />
            Apply Coupon Code
          </div>
        }
        open={isCouponModalOpen}
        onCancel={() => setIsCouponModalOpen(false)}
        footer={null}
        width={450}
        centered
        className="coupon-modal"
      >
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            <input 
              type="text" 
              placeholder="Enter coupon code" 
              value={enteredCode}
              onChange={(e) => { setEnteredCode(e.target.value.toUpperCase()); setSelectedCouponCode(''); }}
              style={{ flex: 1, padding: '12px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', textTransform: 'uppercase' }}
            />
            <button 
              onClick={handleApplyCoupon}
              disabled={!enteredCode && !selectedCouponCode}
              style={{ padding: '0 24px', backgroundColor: (enteredCode || selectedCouponCode) ? '#c99a53' : '#f3f4f6', color: (enteredCode || selectedCouponCode) ? '#fff' : '#9ca3af', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: (enteredCode || selectedCouponCode) ? 'pointer' : 'not-allowed', transition: 'all 0.2s' }}
            >
              APPLY
            </button>
          </div>
          <div className="coupon-list">
            {availableCoupons.map((coupon, index) => (
              <div key={index} className={`coupon-item ${selectedCouponCode === coupon.code ? 'selected' : ''}`} onClick={() => { setSelectedCouponCode(coupon.code); setEnteredCode(''); }}>
                <div className="ci-left">
                  <div className={`ci-radio ${selectedCouponCode === coupon.code ? 'checked' : ''}`}>
                    {selectedCouponCode === coupon.code && <div className="ci-radio-inner"></div>}
                  </div>
                </div>
                <div className="ci-right">
                  <div className="ci-code-row">
                    <span className="ci-code">{coupon.code}</span>
                    <span className="ci-save">Save ₹{coupon.save}</span>
                  </div>
                  <p className="ci-desc">{coupon.desc}</p>
                  <p className="ci-expiry">Expires on: {coupon.expiry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Online Payment Modal */}
      <Modal
        title={null}
        open={isPaymentModalOpen}
        onCancel={() => {
          if (paymentStatus !== 'processing' && !isPlacingOrder && paymentStatus !== 'success') {
            setIsPaymentModalOpen(false);
          }
        }}
        footer={null}
        width={400}
        centered
        mask={{ closable: false }}
        closable={paymentStatus !== 'processing' && !isPlacingOrder && paymentStatus !== 'success'}
      >
        <div style={{ textAlign: 'center', padding: '30px 10px 10px 10px' }}>
          
          {paymentStatus === 'idle' && (
            <>
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '14px', color: '#666' }}>Amount to Pay</span>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', margin: '10px 0' }}>
                  ₹{grandTotal.toFixed(2)}
                </div>
                <span style={{ display: 'inline-block', padding: '4px 12px', background: '#f3f4f6', borderRadius: '20px', fontSize: '12px', color: '#555', textTransform: 'uppercase', fontWeight: '600' }}>
                  {onlineMethod}
                </span>
              </div>
              
              <div style={{ background: '#fdfbf7', border: '1px dashed #c99a53', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <ShieldCheck size={40} color="#2a7e4f" style={{ margin: '0 auto 12px auto', display: 'block' }} />
                <p style={{ margin: 0, color: '#3d3224', fontSize: '14px', lineHeight: '1.5' }}>
                  This is a secure, encrypted payment gateway. Please do not refresh the page.
                </p>
              </div>

              <button
                onClick={processOnlinePayment}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#c99a53',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Pay Securely
              </button>
            </>
          )}

          {paymentStatus === 'processing' && (
            <div style={{ padding: '40px 20px' }}>
              <div className="payment-spinner" style={{ 
                width: '50px', height: '50px', 
                border: '4px solid #f3f3f3', borderTop: '4px solid #c99a53', 
                borderRadius: '50%', margin: '0 auto 20px auto', animation: 'spin 1s linear infinite' 
              }}></div>
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3 style={{ fontSize: '20px', color: '#1a1a1a', marginBottom: '8px' }}>Processing Payment</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Please wait, do not close or refresh this window.</p>
            </div>
          )}

          {paymentStatus === 'success' && (
            <div style={{ padding: '40px 20px' }}>
              <div style={{ 
                width: '60px', height: '60px', background: '#2a7e4f', borderRadius: '50%',
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto'
              }}>
                <Check size={30} color="#fff" strokeWidth={3} />
              </div>
              <h3 style={{ fontSize: '22px', color: '#2a7e4f', marginBottom: '8px' }}>Payment Successful</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>Please wait while we confirm your order...</p>
              {isPlacingOrder && <div style={{ marginTop: '20px', fontSize: '13px', color: '#888' }}>Finalizing order details...</div>}
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div style={{ padding: '30px 10px' }}>
              <div style={{ 
                width: '60px', height: '60px', background: '#e53e3e', borderRadius: '50%',
                display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 20px auto'
              }}>
                <span style={{ color: '#fff', fontSize: '32px', fontWeight: 'bold' }}>✕</span>
              </div>
              <h3 style={{ fontSize: '22px', color: '#e53e3e', marginBottom: '12px' }}>Payment Failed</h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '30px', background: '#fdf2f2', padding: '12px', borderRadius: '8px' }}>
                {paymentError || 'An unexpected error occurred during payment.'}
              </p>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  style={{ flex: 1, padding: '12px', background: '#fff', border: '1px solid #ddd', color: '#333', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={processOnlinePayment}
                  style={{ flex: 1, padding: '12px', background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

        </div>
      </Modal>
    </div>
  );
};

export default Payment;
