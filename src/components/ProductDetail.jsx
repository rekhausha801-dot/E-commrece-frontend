import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Star, ShoppingCart, Search, Info, ChevronRight, 
  Store, CheckCircle2, Package, RefreshCcw, 
  ChevronDown, Heart, Shield, PlayCircle, MoreHorizontal
} from 'lucide-react';
import './ProductDetail.css';

// Import mock images
import dressMain from '../assets/images/banner0.png'; // fallback image
import dressThumb1 from '../assets/images/beauty.png';
import dressThumb2 from '../assets/images/shirt.jpeg';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  
  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState('S');
  const [pincode, setPincode] = useState('635812');

  const images = [
    dressMain, dressThumb1, dressThumb2, dressMain, dressThumb1, dressThumb2
  ];

  const sizes = [
    { label: 'S', price: '308' },
    { label: 'M', price: '297' },
    { label: 'L', price: '308' },
    { label: 'XL', price: '308' },
    { label: 'XXL', price: '308' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <div className="zentro-pdp-wrapper">
      
      {/* Breadcrumbs */}
      <div className="zentro-breadcrumbs">
        <span>Home</span> <ChevronRight size={14} />
        <span>Women</span> <ChevronRight size={14} />
        <span>Clothing</span> <ChevronRight size={14} />
        <span>Dresses</span> <ChevronRight size={14} />
        <span className="current">Solene Blazer</span>
      </div>

      <div className="zentro-pdp-layout">
        
        {/* LEFT COLUMN: Gallery */}
        <div className="zentro-gallery-col">
          <div className="zentro-thumbnails">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`zentro-thumb ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={img} alt={`Thumb ${idx}`} />
                {idx === 5 && <div className="video-icon-overlay"><PlayCircle size={20} fill="#000" color="#fff" /></div>}
              </div>
            ))}
          </div>
          <div className="zentro-main-image-wrap">
            <img src={product?.image || images[activeImage]} alt="Main Product" className="zentro-main-img" />
            <button className="zentro-zoom-btn"><Search size={18} /></button>
          </div>
        </div>

        {/* MIDDLE COLUMN: Product Info */}
        <div className="zentro-info-col">
          <h1 className="zentro-title">{product?.title || 'Solene Blazer'}</h1>
          <p className="zentro-subtitle">{product?.description || 'Stylish Women Fancy Dresses | Casual & Party Wear'}</p>

          <div className="zentro-price-section">
            <span className="zentro-price">{product?.price || '₹297'}</span>
            <span className="zentro-price-suffix">onwards <Info size={14} color="#888" /></span>
          </div>

          <div className="zentro-rating-badge-row">
            <div className="zentro-rating-badge">
              {product?.rating || '4.2'} <Star size={12} fill="#fff" />
            </div>
            <span className="zentro-rating-count">{product?.reviews || '30561'} Ratings, 10263 Reviews <ChevronRight size={14} /></span>
          </div>

          <div className="zentro-size-section">
            <div className="zentro-section-title">Select Size</div>
            <div className="zentro-size-grid">
              {sizes.map((s) => (
                <div key={s.label} className="zentro-size-item">
                  <button 
                    className={`zentro-size-btn ${activeSize === s.label ? 'active' : ''}`}
                    onClick={() => setActiveSize(s.label)}
                  >
                    {s.label}
                  </button>
                  <span className="zentro-size-price">₹{s.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="zentro-highlights-section">
            <div className="zentro-highlights-header">
              <span className="zentro-section-title">Product Highlights</span>
              <button className="zentro-copy-btn">COPY</button>
            </div>
            <div className="zentro-highlights-grid">
              <div className="highlight-item">
                <span className="hl-label">Color</span>
                <span className="hl-value">Black</span>
              </div>
              <div className="highlight-item">
                <span className="hl-label">Fabric</span>
                <span className="hl-value">Cotton Blend</span>
              </div>
              <div className="highlight-item">
                <span className="hl-label">Fit / Shape</span>
                <span className="hl-value">Fit and Flare</span>
              </div>
              <div className="highlight-item">
                <span className="hl-label">Length</span>
                <span className="hl-value">Maxi</span>
              </div>
            </div>
            
            <div className="zentro-additional-details">
              <span>Additional Details</span>
              <ChevronDown size={16} />
            </div>
          </div>

          <div className="zentro-actions-row">
            <button className="zentro-btn zentro-btn-cart">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className="zentro-btn zentro-btn-buy">
              <ChevronRight size={18} /> Buy Now
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar (Seller, Delivery) */}
        <div className="zentro-sidebar-col">
          
          <div className="zentro-sidebar-card">
            <div className="zentro-section-title">Sold By</div>
            <div className="zentro-seller-header">
              <div className="seller-icon-wrap"><Store size={20} color="#800080" /></div>
              <div className="seller-name">DULHAN SAREE</div>
              <button className="seller-view-btn">View Shop</button>
            </div>
            <div className="seller-stats">
              <div className="stat-item">
                <span className="stat-value">4.2 <Star size={10} fill="#800080" color="#800080" /></span>
                <span className="stat-label">102,722 Ratings</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">417</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">94</span>
                <span className="stat-label">Products</span>
              </div>
            </div>
          </div>

          <div className="zentro-sidebar-card">
            <div className="zentro-section-title">Check Delivery Date</div>
            <p className="delivery-subtitle">Enter Delivery Pincode</p>
            <div className="delivery-input-row">
              <input 
                type="text" 
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              <button className="check-btn">CHECK</button>
            </div>
            <ul className="delivery-perks">
              <li><CheckCircle2 size={16} color="#555" /> Enter Pincode for Estimated Delivery Date</li>
              <li><Package size={16} color="#555" /> Dispatch in 2 day</li>
            </ul>
          </div>

          <div className="zentro-trust-row">
            <div className="trust-badge">
              <div className="trust-icon"><Shield size={18} color="#16a34a" /></div>
              <span>Lowest Price</span>
            </div>
            <div className="trust-badge">
              <div className="trust-icon"><RefreshCcw size={18} color="#eab308" /></div>
              <span>Cash on Delivery</span>
            </div>
            <div className="trust-badge">
              <div className="trust-icon"><RefreshCcw size={18} color="#ef4444" /></div>
              <span>7-day Returns</span>
            </div>
          </div>

        </div>
      </div>

      {/* LOWER SECTION: Similar Products & Reviews */}
      <div className="zentro-lower-section">
        
        {/* Left: Similar Products */}
        <div className="zentro-similar-col">
          <div className="section-header">
            <h3>4 Similar Products</h3>
            <button className="view-all-link">View All <ChevronRight size={14} /></button>
          </div>
          <div className="similar-grid">
            {[
              { price: 359, rating: 4.0 }, 
              { price: 282, rating: 4.1 }, 
              { price: 236, rating: 3.2 }, 
              { price: 220, rating: 5.0 }
            ].map((item, i) => (
              <div className="similar-card" key={i}>
                <div className="similar-img-wrap">
                  <img src={dressMain} alt="Similar product" />
                  <Heart size={14} className="heart-icon" />
                </div>
                <div className="similar-info">
                  <span className="price">₹{item.price}</span>
                  <span className="rating">{item.rating} <Star size={10} fill="#fbbf24" color="#fbbf24" /></span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-header" style={{marginTop: '40px'}}>
            <h3>People also viewed</h3>
          </div>
          <div className="similar-grid">
            {[
              { price: 359, rating: 4.0 }, 
              { price: 282, rating: 4.1 }, 
              { price: 236, rating: 3.2 }, 
              { price: 220, rating: 5.0 }
            ].map((item, i) => (
              <div className="similar-card" key={i}>
                <div className="similar-img-wrap">
                  <img src={dressMain} alt="Similar product" />
                  <Heart size={14} className="heart-icon" />
                </div>
                <div className="similar-info">
                  <span className="price">₹{item.price}</span>
                  <span className="rating">{item.rating} <Star size={10} fill="#fbbf24" color="#fbbf24" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Reviews */}
        <div className="zentro-reviews-col">
          <div className="section-header">
            <h3>Customer Reviews (10263)</h3>
          </div>
          
          <div className="review-summary-box">
            <div className="review-left">
              <div className="big-rating">4.2</div>
              <div className="stars-row">
                {[1,2,3,4,5].map(x => <Star key={x} size={14} fill="#16a34a" color="#16a34a" />)}
              </div>
              <div className="based-on">Based on 10,263 reviews</div>
            </div>
            <div className="review-bars">
              {[
                { s: 5, w: '70%', c: 6144, clr: '#16a34a' },
                { s: 4, w: '40%', c: 2819, clr: '#16a34a' },
                { s: 3, w: '15%', c: 824, clr: '#16a34a' },
                { s: 2, w: '5%', c: 276, clr: '#16a34a' },
                { s: 1, w: '5%', c: 200, clr: '#16a34a' },
              ].map(bar => (
                <div className="bar-row" key={bar.s}>
                  <span className="star-label">{bar.s} ★</span>
                  <div className="bar-bg"><div className="bar-fill" style={{width: bar.w, backgroundColor: bar.clr}}></div></div>
                  <span className="count-label">{bar.c}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="write-review-row">
            <button className="write-review-btn">Write a Review</button>
          </div>

          <div className="review-list">
            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="avatar">
                    <img src={dressThumb1} alt="User" />
                  </div>
                  <span className="name">Priya S.</span>
                  <span className="verified">Verified Buyer</span>
                </div>
                <span className="date">12 May 2024</span>
              </div>
              <div className="review-stars">
                {[1,2,3,4,5].map(x => <Star key={x} size={12} fill="#16a34a" color="#16a34a" />)}
              </div>
              <p className="review-text">Superb quality and perfect fitting! Looks exactly like the picture.</p>
              <div className="review-images">
                <img src={dressMain} alt="Review pic" />
                <img src={dressMain} alt="Review pic" />
                <img src={dressMain} alt="Review pic" />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
