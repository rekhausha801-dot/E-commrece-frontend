import React, { useState } from 'react';
import { ShoppingBag, MapPin, CreditCard, Receipt, Star, Trash2, Truck, Minus, Plus, RefreshCw, ShieldCheck, Headphones, Tag, Edit2, Lock, ArrowRight, Heart, Check, Leaf, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Cart.css';
import kurtiImg from '../../assets/images/kurti.png';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSettings } from '../../context/SettingsContext';
import CheckoutStepper from '../../components/CheckoutStepper';
import { getShippingFeeApi } from '../../services/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const BASE_URL = API_URL.replace('/api', '');

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) return path;
  if (path.startsWith('/src/') || path.startsWith('/assets/')) return path;
  return path.startsWith('/') ? `${BASE_URL}${path}` : `${BASE_URL}/${path}`;
};

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { cartItems, updateQty, removeItem, updateItemDetails, buyNowData, clearBuyNowData, dynamicShippingFee, cartPricing } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatCurrency } = useSettings();

  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ size: '', color: '', qty: 1 });

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({ size: item.size || '', color: item.color || '', qty: item.qty || 1 });
  };

  const closeEditModal = () => {
    setEditingItem(null);
  };

  const saveEdit = () => {
    if (editingItem) {
      const targetId = editingItem.id || editingItem._id || editingItem.productId;
      updateItemDetails(targetId, editForm);
      closeEditModal();
    }
  };

  const activeItems = buyNowData ? buyNowData.items || [buyNowData] : cartItems;
  const cartItemCount = activeItems.reduce((acc, item) => acc + (item.qty || item.quantity || 1), 0);
  
  const { subtotal, productDiscount, couponDiscount, shippingFee: shipping, tax, grandTotal } = cartPricing;
  const totalSavings = productDiscount + couponDiscount;

  // Clear Buy Now if we want to cancel the flow
  const handleCancelBuyNow = () => {
    clearBuyNowData();
  };

  return (
    <div className="lux-cart-page">
      <div className="lux-cart-container">
       
        <CheckoutStepper currentStep={1} />


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

       
        <div className="lux-cart-layout">

          
          <div className="lux-cart-left">
            <div className="lux-cart-items-container">
              {activeItems.map((item, index) => (
                <div key={item.id || item.productId + '-' + index} className="lux-cart-item">
                  <div className="lux-ci-image">
                    <img src={getImageUrl(item.productImage || item.image)} alt={item.title || item.productName} />
                  </div>

                  <div className="lux-ci-content">
                    <div className="lux-ci-top-row">
                      <div className="lux-ci-brand">{item.brand || 'Gudwear'}</div>
                    </div>

                    <div className="lux-ci-title-row">
                      <h3 className="lux-ci-title">{item.title || item.productName}</h3>
                      <div className="lux-ci-price-container">
                        {item.oldPrice || item.originalPrice ? <span className="lux-old-price">{formatCurrency(item.oldPrice || item.originalPrice)}</span> : null}
                        <span className="lux-current-price">{formatCurrency(item.finalUnitPrice || item.price || 0)}</span>
                        {(item.discount || item.discountAmount > 0) && <span className="lux-discount-badge">{item.discount || `₹${item.discountAmount} OFF`}</span>}
                      </div>
                    </div>

                    <div className="lux-ci-rating">
                      <Star size={14} className="lux-star" fill="#D4AF37" color="#D4AF37" />
                      <span>({item.reviews || '0'} reviews)</span>
                    </div>

                    <div className="lux-ci-variants-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div className="lux-ci-variants" style={{ marginBottom: 0 }}>
                        Color: <span className="variant-value">{item.color || 'N/A'}</span> <span className="lux-divider">|</span> Size: <span className="variant-value">{item.size || 'N/A'}</span>
                      </div>

                      <div className="lux-qty-pill">
                        {!buyNowData && <button onClick={() => updateQty(item.id, -1)}><Minus size={14} /></button>}
                        <span>Qty: {item.qty || item.quantity}</span>
                        {!buyNowData && <button onClick={() => updateQty(item.id, 1)}><Plus size={14} /></button>}
                      </div>
                    </div>

                    <div className="lux-ci-stock-delivery">
                      <div className="stock-info-left">
                        <span className="status-dot"></span>
                        <span className="lux-divider">|</span>
                        <span className="delivery-date">Delivered by {item.delivery || 'Tomorrow'}</span>
                        <span className="lux-divider">|</span>
                        <span className="free-shipping"><Truck size={14} style={{ marginRight: '4px' }} /> Free Shipping</span>
                      </div>
                    </div>

                    <div className="lux-ci-footer" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed #E6DFD3' }}>
                      <div className="lux-ci-actions-left" style={{ display: 'flex', gap: '20px' }}>
                        <button className="lux-ci-action-text-btn" onClick={() => handleEditClick(item)} style={{ color: '#B58D4E', fontWeight: 'bold' }}>
                          <Edit2 size={16} color="#B58D4E" style={{ marginRight: '4px' }} /> Edit
                        </button>
                        <span className="lux-divider-light">|</span>
                        <button className="lux-ci-action-text-btn" onClick={() => buyNowData ? handleCancelBuyNow() : removeItem(item.id)} style={{ color: '#D93B3B', fontWeight: 'bold' }}>
                          <Trash2 size={16} color="#D93B3B" style={{ marginRight: '4px' }} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {buyNowData && (
                <button className="lux-continue-btn" onClick={handleCancelBuyNow} style={{ marginTop: '20px', border: '1px solid #ccc', background: 'transparent' }}>
                  Cancel Buy Now
                </button>
              )}
            </div>

            <div className="lux-cart-features-dark">
              <div className="feature-item-dark">
                <Truck size={24} className="feature-icon-gold" />
                <div className="feature-text-dark">
                  <strong>Free Shipping</strong>
                  <span>On orders above ₹50</span>
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
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="lux-summary-row green-text">
                  <span>Product Discount</span>
                  <span>-{formatCurrency(productDiscount)}</span>
                </div>
                <div className="lux-summary-row green-text">
                  <span>Coupon Discount</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
                <div className="lux-summary-row">
                  <span>Shipping Fee</span>
                  {shipping === 0 ? (
                    <span className="green-text">FREE</span>
                  ) : (
                    <span>{formatCurrency(shipping)}</span>
                  )}
                </div>
                <div className="lux-summary-row">
                  <span>GST</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="lux-summary-divider"></div>

              <div className="lux-summary-total">
                <span>Grand Total</span>
                <span>{formatCurrency(grandTotal)}</span>
              </div>

              <div className="lux-success-banner">
                <Check size={16} color="#2A7E4F" className="check-icon-filled" />
                <span>You Saved ₹{totalSavings.toFixed(2)} Today!</span>
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

        {/* EDIT MODAL */}
        {editingItem && (
          <div className="cart-edit-modal-overlay">
            <div className="cart-edit-modal">
              <div className="modal-header">
                <h3>Edit Item</h3>
                <button onClick={closeEditModal} className="close-btn"><X size={20} /></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Size</label>
                  <select value={editForm.size} onChange={(e) => setEditForm({...editForm, size: e.target.value})}>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="One Size">One Size</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Color</label>
                  <input type="text" value={editForm.color} onChange={(e) => setEditForm({...editForm, color: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <div className="modal-qty-control">
                    <button onClick={() => setEditForm({...editForm, qty: Math.max(1, editForm.qty - 1)})}>-</button>
                    <span>{editForm.qty}</span>
                    <button onClick={() => setEditForm({...editForm, qty: editForm.qty + 1})}>+</button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={closeEditModal}>Cancel</button>
                <button className="save-btn" onClick={saveEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;
