import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Star, ShoppingCart, ShoppingBag, Search, ChevronRight, 
  MapPin, CheckCircle2, ShieldCheck, RefreshCcw, Heart, Share2, Tag
} from 'lucide-react';
import './ProductDetail.css';

import dressMain from '../assets/images/banner0.png';
import dressThumb1 from '../assets/images/beauty.png';
import dressThumb2 from '../assets/images/shirt.jpeg';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  
  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState('Navy Blue');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const images = product?.image 
    ? [product.image, product.image, product.image, product.image] 
    : [dressMain, dressThumb1, dressThumb2, dressMain];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Navy Blue', hex: '#1a237e' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Emerald', hex: '#047857' },
    { name: 'Dusty Rose', hex: '#b48c95' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const handleQtyChange = (type) => {
    if (type === 'inc' && quantity < 10) setQuantity(q => q + 1);
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  return (
    <div className="pdp-page-wrapper">
      
      {/* Breadcrumbs */}
      <div className="pdp-breadcrumbs">
        <span>Home</span> <ChevronRight size={14} />
        <span>Women</span> <ChevronRight size={14} />
        <span>Western Wear</span> <ChevronRight size={14} />
        <span>Dresses</span> <ChevronRight size={14} />
        <span className="current">{product?.title || 'Premium Floral Print Dress'}</span>
      </div>

      <div className="pdp-main-container">
        {/* Left Column: Image Gallery (40%) */}
        <div className="pdp-gallery-section">
          <div className="pdp-thumbnails">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`pdp-thumb ${activeImage === idx ? 'active' : ''}`}
                onMouseEnter={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumbnail ${idx}`} />
              </div>
            ))}
          </div>
          <div className="pdp-main-image-container">
            <img src={images[activeImage]} alt="Main Product" className="pdp-main-image" />
            <button 
              className={`pdp-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart size={20} fill={isWishlisted ? '#f43f5e' : 'none'} color={isWishlisted ? '#f43f5e' : '#4b5563'} />
            </button>
            <button className="pdp-share-btn">
              <Share2 size={20} color="#4b5563" />
            </button>
          </div>
        </div>

        {/* Right Column: Product Info (60%) */}
        <div className="pdp-info-section">
          <h1 className="pdp-product-title">{product?.title || 'Premium Floral Print A-Line Maxi Dress'}</h1>
          
          <div className="pdp-rating-summary">
            <div className="pdp-rating-badge">
              4.6 <Star size={12} fill="#fff" />
            </div>
            <span className="pdp-rating-count">12,548 Ratings</span>
          </div>

          <div className="pdp-price-block">
            <span className="pdp-current-price">₹999</span>
            <span className="pdp-original-price">₹1,999</span>
            <span className="pdp-discount">50% OFF</span>
            <div className="pdp-tax-info">Inclusive of all taxes</div>
          </div>

          <div className="pdp-variants-section">
            <div className="pdp-variant-title">
              Select Color: <strong>{activeColor}</strong>
            </div>
            <div className="pdp-color-swatches">
              {colors.map(color => (
                <button 
                  key={color.name}
                  className={`pdp-color-swatch ${activeColor === color.name ? 'active' : ''}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setActiveColor(color.name)}
                  title={color.name}
                />
              ))}
            </div>

            <div className="pdp-variant-title" style={{ marginTop: '24px' }}>Select Size</div>
            <div className="pdp-size-selector">
              {sizes.map(s => (
                <button 
                  key={s} 
                  className={`pdp-size-btn ${activeSize === s ? 'active' : ''}`}
                  onClick={() => setActiveSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-quantity-section">
            <div className="pdp-variant-title">Quantity</div>
            <div className="pdp-qty-controls">
              <button onClick={() => handleQtyChange('dec')}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQtyChange('inc')}>+</button>
            </div>
          </div>

          <div className="pdp-delivery-section">
            <div className="pdp-variant-title">Check Delivery</div>
            <div className="pdp-pincode-input">
              <MapPin size={18} color="#6b7280" />
              <input 
                type="text" 
                placeholder="Enter Pincode" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength="6"
              />
              <button>Check</button>
            </div>
            <ul className="pdp-delivery-promises">
              <li><CheckCircle2 size={16} color="#10b981" /> Delivery by Tomorrow</li>
              <li><CheckCircle2 size={16} color="#10b981" /> Free Delivery</li>
              <li><CheckCircle2 size={16} color="#10b981" /> Cash on Delivery Available</li>
            </ul>
          </div>

          <div className="pdp-action-buttons">
            <button className="pdp-btn-add-cart">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="pdp-btn-buy-now">
              <ShoppingBag size={20} /> Buy Now
            </button>
          </div>
          
        </div>
      </div>

      {/* Structured Sections Below Main Fold */}
      <div className="pdp-details-wrapper">
        <div className="pdp-details-grid">
          
          <div className="pdp-section-card">
            <h2 className="pdp-section-title">Product Details</h2>
            <div className="pdp-attributes-grid">
              <div className="pdp-attr">
                <span className="pdp-attr-label">Fabric</span>
                <span className="pdp-attr-value">Premium Cotton Blend</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Pattern</span>
                <span className="pdp-attr-value">Printed</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Fit</span>
                <span className="pdp-attr-value">Regular Fit</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Neck</span>
                <span className="pdp-attr-value">Round Neck</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Sleeve</span>
                <span className="pdp-attr-value">Half Sleeve</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Occasion</span>
                <span className="pdp-attr-value">Casual</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Wash Care</span>
                <span className="pdp-attr-value">Machine Wash</span>
              </div>
              <div className="pdp-attr">
                <span className="pdp-attr-label">Country of Origin</span>
                <span className="pdp-attr-value">India</span>
              </div>
            </div>
          </div>

          <div className="pdp-section-card">
            <h2 className="pdp-section-title">Product Description</h2>
            <ul className="pdp-description-list">
              <li>Premium quality cotton fabric with a soft finish.</li>
              <li>Comfortable for everyday wear.</li>
              <li>Perfect for casual outings, office wear and travel.</li>
              <li>Breathable material suitable for all seasons.</li>
              <li>Skin-friendly fabric with long-lasting color.</li>
            </ul>
          </div>

          <div className="pdp-section-card">
            <h2 className="pdp-section-title">Product Specifications</h2>
            <table className="pdp-spec-table">
              <tbody>
                <tr><td>Brand</td><td>Zentro Style</td></tr>
                <tr><td>Material</td><td>Cotton</td></tr>
                <tr><td>Color</td><td>Navy Blue</td></tr>
                <tr><td>Fabric Type</td><td>Cotton Blend</td></tr>
                <tr><td>Sleeve Type</td><td>Half Sleeve</td></tr>
                <tr><td>Pattern</td><td>Floral Print</td></tr>
                <tr><td>Fit</td><td>Regular Fit</td></tr>
                <tr><td>Weight</td><td>350g</td></tr>
                <tr><td>Package Contains</td><td>1 Dress</td></tr>
                <tr><td>Manufactured By</td><td>Fashion Hub India</td></tr>
                <tr><td>Country of Origin</td><td>India</td></tr>
              </tbody>
            </table>
          </div>

          <div className="pdp-section-card">
            <h2 className="pdp-section-title">Offers</h2>
            <ul className="pdp-offers-list">
              <li><Tag size={16} color="#d97706" /> Flat ₹200 OFF on orders above ₹1499</li>
              <li><Tag size={16} color="#d97706" /> Buy 2 Get 1 Free</li>
              <li><Tag size={16} color="#d97706" /> 10% Instant Discount on HDFC Bank Cards</li>
              <li><Tag size={16} color="#d97706" /> Festival Special Offer applied in cart</li>
              <li><Tag size={16} color="#d97706" /> Free Shipping on all prepaid orders</li>
            </ul>
          </div>

          <div className="pdp-section-card pdp-reviews-card">
            <h2 className="pdp-section-title">Customer Reviews</h2>
            <div className="pdp-review-overview">
              <div className="pdp-review-score">
                <span className="pdp-big-rating">4.6 <Star size={24} fill="#fff" /></span>
                <span className="pdp-review-counts">12,548 Ratings<br/>2,143 Reviews</span>
              </div>
              <div className="pdp-review-bars">
                {[
                  { star: 5, pct: '78%' },
                  { star: 4, pct: '14%' },
                  { star: 3, pct: '5%' },
                  { star: 2, pct: '2%' },
                  { star: 1, pct: '1%' },
                ].map(bar => (
                  <div className="pdp-bar-row" key={bar.star}>
                    <span className="pdp-star-label">{bar.star} ★</span>
                    <div className="pdp-progress-bg">
                      <div className="pdp-progress-fill" style={{ width: bar.pct }}></div>
                    </div>
                    <span className="pdp-pct-label">{bar.pct}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pdp-section-card">
            <h2 className="pdp-section-title">Delivery Information</h2>
            <ul className="pdp-delivery-details-list">
              <li><MapPin size={18} /> Enter Pincode for exact dates</li>
              <li><CheckCircle2 size={18} /> Delivery in 2–4 Days</li>
              <li><CheckCircle2 size={18} /> Free Delivery</li>
              <li><RefreshCcw size={18} /> Cash on Delivery Available</li>
              <li><ShieldCheck size={18} /> Easy 7-Day Returns</li>
              <li><ShieldCheck size={18} /> Secure Packaging</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Bar for Mobile */}
      <div className="pdp-mobile-sticky-bar">
        <div className="pdp-mobile-price">
          <span className="pdp-m-price">₹999</span>
          <span className="pdp-m-off">50% OFF</span>
        </div>
        <div className="pdp-mobile-actions">
          <button className="pdp-btn-add-cart">Add to Cart</button>
          <button className="pdp-btn-buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
