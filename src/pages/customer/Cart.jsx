import React, { useState } from 'react';
import { ShoppingBag, MapPin, CreditCard, Receipt, Star, Trash2, Truck, Minus, Plus, RefreshCw, ShieldCheck, Headphones, Tag, Edit2, Lock, ArrowRight, Heart, Check, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';
import kurtiImg from '../../assets/images/kurti.png';
import mens1Img from '../../assets/images/mens1.png';

const initialCart = [
  {
    id: 1,
    brand: 'APPLE',
    title: 'AirPods Pro (2nd generation)',
    color: 'White',
    size: 'One Size',
    price: 249.00,
    oldPrice: 299.00,
    discount: '15% OFF',
    image: kurtiImg,
    stock: 'In Stock',
    delivery: 'Tomorrow, by 8 PM',
    rating: '4.9',
    reviews: '2,450',
    qty: 1
  },
  {
    id: 2,
    brand: 'ZARA',
    title: 'Structured Wool Blend Coat',
    color: 'Camel',
    size: 'M',
    price: 159.99,
    oldPrice: 199.99,
    discount: '20% OFF',
    image: mens1Img,
    stock: 'In Stock',
    delivery: 'Wednesday, by 9 PM',
    rating: '4.8',
    reviews: '1,230',
    qty: 1
  },
  {
    id: 3,
    brand: 'APPLE',
    title: 'AirPods Pro (2nd generation) - Gift',
    color: 'White',
    size: 'One Size',
    price: 249.00,
    oldPrice: 299.00,
    discount: '15% OFF',
    image: kurtiImg,
    stock: 'In Stock',
    delivery: 'Tomorrow, by 8 PM',
    rating: '4.9',
    reviews: '2,450',
    qty: 1
  },
  {
    id: 4,
    brand: 'ZARA',
    title: 'Structured Wool Blend Coat - Gift',
    color: 'Camel',
    size: 'L',
    price: 159.99,
    oldPrice: 199.99,
    discount: '20% OFF',
    image: mens1Img,
    stock: 'In Stock',
    delivery: 'Wednesday, by 9 PM',
    rating: '4.8',
    reviews: '1,230',
    qty: 1
  }
];

const Cart = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQty = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id) => setCartItems(cartItems.filter(item => item.id !== id));

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotal = 449.99;
  const productDiscount = 25.00;
  const couponDiscount = 15.00;
  const shipping = 0;
  const tax = 18.45;
  const grandTotal = 387.44;
  const totalSavings = 40.00;

  return (
    <div className="lux-cart-page">
      <div className="lux-cart-container">
        {/* Stepper */}
        <div className="lux-stepper-container">
          <div className="lux-step active">
            <div className="lux-step-icon">1</div>
            <span className="lux-step-label">Cart</span>
          </div>
          <div className="lux-step-line pending"></div>
          
          <div className="lux-step pending">
            <div className="lux-step-icon">2</div>
            <span className="lux-step-label">Address</span>
          </div>
          <div className="lux-step-line pending"></div>
          
          <div className="lux-step pending">
            <div className="lux-step-icon">3</div>
            <span className="lux-step-label">Payment</span>
          </div>
          <div className="lux-step-line pending"></div>
          
          <div className="lux-step pending">
            <div className="lux-step-icon">4</div>
            <span className="lux-step-label">Summary</span>
          </div>
        </div>

       
        <div className="lux-page-header">
          <div className="header-left-content">
            <div className="title-row">
              <h1 className="main-title">
                <span style={{ color: '#4a3f35' }}>My</span> <span style={{ color: '#b58d4e' }}>Cart</span>
              </h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
              <Leaf size={14} color="#b58d4e" />
              <span style={{ color: '#b58d4e', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Review your items and proceed to checkout
              </span>
              <span style={{ width: '40px', height: '1px', background: '#b58d4e' }}></span>
            </div>
          </div>
          <div className="header-right-content">
            <span className="items-pill">
              <ShoppingBag size={16} color="#B58D4E" /> {cartItemCount} Items
            </span>
          </div>
        </div>

        {/* Main Layout */}
        <div className="lux-cart-layout">

          {/* LEFT SECTION */}
          <div className="lux-cart-left">
            <div className="lux-cart-items-container">
              {cartItems.map((item, index) => (
                <div key={item.id + '-' + index} className="lux-cart-item">
                  <div className="lux-ci-image">
                    <img src={item.image} alt={item.title} />
                  </div>

                  <div className="lux-ci-content">
                    <div className="lux-ci-top-row">
                      <div className="lux-ci-brand">{item.brand}</div>
                      <div className="lux-ci-price-top">
                        {item.oldPrice && <span className="lux-old-price">${item.oldPrice.toFixed(2)}</span>}
                        <span className="lux-discount-badge">{item.discount}</span>
                      </div>
                    </div>

                    <div className="lux-ci-title-row">
                      <h3 className="lux-ci-title">{item.title}</h3>
                      <span className="lux-current-price">${item.price.toFixed(2)}</span>
                    </div>

                    <div className="lux-ci-rating">
                      <Star size={14} className="lux-star" fill="#D4AF37" color="#D4AF37" />
                      <span>{item.rating} ({item.reviews} reviews)</span>
                    </div>

                    <div className="lux-ci-variants-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div className="lux-ci-variants" style={{ marginBottom: 0 }}>
                        Color: {item.color} <span className="lux-divider">|</span> Size: {item.size}
                      </div>

                      <div className="lux-qty-pill">
                        <button onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>
                      </div>
                    </div>

                    <div className="lux-ci-stock-delivery">
                      <div className="stock-info-left">
                        <span className="stock-status"><span className="status-dot"></span>{item.stock}</span>
                        <span className="lux-divider">|</span>
                        <span className="delivery-date">Delivered by {item.delivery}</span>
                        <span className="lux-divider">|</span>
                        <span className="free-shipping"><Truck size={14} /> Free Shipping</span>
                      </div>
                    </div>

                    <div className="lux-ci-footer">
                      <div className="lux-ci-actions-left">
                        <button className="lux-ci-action-text-btn">
                          <Edit2 size={14} color="#B58D4E" /> Edit
                        </button>
                        <span className="lux-divider-light">|</span>
                        <button className="lux-ci-action-text-btn" onClick={() => removeItem(item.id)}>
                          <Trash2 size={14} color="#B58D4E" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lux-cart-features-dark">
              <div className="feature-item-dark">
                <Truck size={24} className="feature-icon-gold" />
                <div className="feature-text-dark">
                  <strong>Free Shipping</strong>
                  <span>On orders above $50</span>
                </div>
              </div>
              <div className="feature-divider"></div>
              <div className="feature-item-dark">
                <RefreshCw size={24} className="feature-icon-gold" />
                <div className="feature-text-dark">
                  <strong>Easy Returns</strong>
                  <span>30-day return policy</span>
                </div>
              </div>
              <div className="feature-divider"></div>
              <div className="feature-item-dark">
                <Lock size={24} className="feature-icon-gold" />
                <div className="feature-text-dark">
                  <strong>Secure Payments</strong>
                  <span>100% secure checkout</span>
                </div>
              </div>
              <div className="feature-divider"></div>
              <div className="feature-item-dark">
                <Headphones size={24} className="feature-icon-gold" />
                <div className="feature-text-dark">
                  <strong>24/7 Support</strong>
                  <span>Dedicated support</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="lux-cart-right">
            <div className="lux-summary-card">
              <div className="lux-summary-header">
                <h2>Order Summary</h2>
                <div className="fancy-divider">
                  <div className="line"></div>
                  <div className="diamond"></div>
                  <div className="line"></div>
                </div>
              </div>

              <div className="lux-summary-rows">
                <div className="lux-summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="lux-summary-row green-text">
                  <span>Product Discount</span>
                  <span>-${productDiscount.toFixed(2)}</span>
                </div>
                <div className="lux-summary-row green-text">
                  <span>Coupon Discount</span>
                  <span>-${couponDiscount.toFixed(2)}</span>
                </div>
                <div className="lux-summary-row">
                  <span>Shipping Fee</span>
                  <span className="green-text">FREE</span>
                </div>
                <div className="lux-summary-row">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="lux-summary-divider"></div>

              <div className="lux-summary-total">
                <span>Grand Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>

              <div className="lux-success-banner">
                <Check size={16} color="#2A7E4F" className="check-icon-filled" />
                <span>You Saved ${totalSavings.toFixed(2)} Today!</span>
              </div>

              <button className="lux-proceed-btn-dark" onClick={() => navigate('/address')}>
                <Lock size={16} /> PROCEED TO CHECKOUT <ArrowRight size={18} />
              </button>

              <div className="or-divider">
                <div className="line"></div>
                <span>OR</span>
                <div className="line"></div>
              </div>

              <button className="lux-continue-btn" onClick={() => navigate('/')}>
                <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} /> CONTINUE SHOPPING
              </button>

              <div className="lux-secure-footer">
                <span className="secure-item"><ShieldCheck size={14} /> Secure Checkout</span>
                <span className="secure-item"><Lock size={14} /> 256-bit SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-crafted-text">
          <div className="line"></div>
          <span>Crafted for a Seamless Experience</span>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
