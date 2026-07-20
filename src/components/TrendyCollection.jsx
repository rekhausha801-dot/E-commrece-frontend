import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaStar, FaRegStar, FaStarHalfAlt, FaRegHeart, FaHeart, FaTag, FaMagic, FaShoppingBag, FaTshirt, FaPalette, FaArrowRight, FaLeaf, FaShoePrints } from 'react-icons/fa';
import './TrendyCollection.css';

import dressImg from '../assets/images/dress.jpg';
import poloImg from '../assets/images/polo.jpg';
import cargoImg from '../assets/images/cargo.jpg';
import sneakerImg from '../assets/images/sneaker.jpg';

const TABS = [
  { id: 'trending', label: 'Trending Now', icon: <FaFire /> },
  { id: 'bestsellers', label: 'Best Sellers', icon: <FaStar /> },
  { id: 'new', label: 'New Arrivals', icon: <FaMagic /> },
  { id: 'limited', label: 'Limited Offers', icon: <FaTag /> },
];


const ALL_PRODUCTS = [
  {
    id: 1,
    image: dressImg,
    badge: 'TRENDING',
    badgeClass: 'badge-trending',
    title: 'Elegant Midi Dress',
    description: 'Flowy brown midi dress with a tied waist for a perfect silhouette.',
    stats: [
      { icon: <FaTshirt />, text: '50+ Designs' },
      { icon: <FaPalette />, text: 'Premium Silk' },
      { icon: <FaStar />, text: 'Best Sellers' }
    ]
  },
  {
    id: 2,
    image: poloImg,
    badge: 'NEW',
    badgeClass: 'badge-new',
    title: 'Classic Polo Shirt',
    description: 'Classic fit polo shirt in premium brown cotton.',
    stats: [
      { icon: <FaTshirt />, text: '100+ Styles' },
      { icon: <FaPalette />, text: '10+ Colors' },
      { icon: <FaMagic />, text: 'New Arrivals' }
    ]
  },
  {
    id: 3,
    image: cargoImg,
    badge: 'BESTSELLER',
    badgeClass: 'badge-bestseller',
    title: 'Cargo Pants Collection',
    description: 'Utility-inspired designs with multiple pockets and premium fabrics.',
    stats: [
      { icon: <FaTshirt />, text: '95+ Styles' },
      { icon: <FaPalette />, text: 'Regular Fit' },
      { icon: <FaMagic />, text: 'New Season' }
    ]
  }
];

const BRANDS = [
  { name: 'ZARA', class: 'brand-zara' },
  { name: 'H&M', class: 'brand-hm' },
  { name: 'Levi\'s', class: 'brand-levis' },
  { name: 'PUMA', class: 'brand-puma' },
  { name: 'adidas', class: 'brand-adidas' }
];

function StarRating({ rating, reviews }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="star star-full" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="star star-half" />);
    } else {
      stars.push(<FaRegStar key={i} className="star star-empty" />);
    }
  }
  return (
    <div className="rating-row">
      <span className="stars">{stars}</span>
      <span className="review-count">({reviews})</span>
    </div>
  );
}

function FeatureIcon({ name }) {
  switch (name) {
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="1" y="6" width="14" height="11" rx="1.5" />
          <path d="M15 10h4l3 3.5V17h-7z" />
          <circle cx="6" cy="19" r="1.6" />
          <circle cx="17.5" cy="19" r="1.6" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 0115.4-6.4L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 01-15.4 6.4L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case 'headset':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 13v-1a8 8 0 0116 0v1" />
          <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
          <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
          <path d="M20 19v.5a3 3 0 01-3 3h-3" />
        </svg>
      );
    default:
      return null;
  }
}

const TrendyCollection = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [likedIds, setLikedIds] = useState([]);

  const navigate = useNavigate();

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getDisplayedProducts = () => {
    return ALL_PRODUCTS;
  };

  const displayedProducts = getDisplayedProducts();

  return (
    <section className="trendy-section">
      <div className="trendy-header">
        <div className="trendy-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-icon"><FaFire /></span>
          <span>TRENDING NOW</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="trendy-title">
          Trending <span className="trendy-title-accent">Collections</span>
        </h2>
        
      </div>

      {/* <div className="trendy-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`trendy-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div> */}

      <div className="trendy-grid">
        {displayedProducts.map((product) => (
          <div 
            className="trendy-card" 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="trendy-image-wrapper">
              <span className={`trendy-badge ${product.badgeClass}`}>
                {product.badge === 'NEW' && <FaLeaf className="badge-icon" />} {product.badge}
              </span>
              <button
                className={`trendy-wishlist-btn ${likedIds.includes(product.id) ? 'active' : ''}`}
                onClick={(e) => toggleLike(e, product.id)}
                aria-label="Add to wishlist"
              >
                {likedIds.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <img src={product.image} alt={product.title} className="trendy-image" />
              <svg className="wave-overlay" viewBox="0 0 100 24" preserveAspectRatio="none">
                <path d="M0,0 L60,16 Q85,26 100,14 L100,24 L0,24 Z" fill="#f8f6f0" />
              </svg>
            </div>

            <div className="trendy-info">
              <span className="trendy-category-eyebrow">TRENDING</span>
              
              <h3 className="trendy-product-title">
                {product.title.replace(' Collection', '')}
                <span className="cursive-text">Collection</span>
              </h3>
              
              <div className="divider-line"></div>
              
              <div className="trendy-stats">
                {product.stats && product.stats.map((stat, idx) => (
                  <React.Fragment key={idx}>
                    <div className="trendy-stat-item">
                      <div className="stat-icon-wrapper">{stat.icon}</div>
                      <div className="stat-text">
                        <strong>{stat.text.split(' ')[0]}</strong>
                        <span>{stat.text.split(' ').slice(1).join(' ')}</span>
                      </div>
                    </div>
                    {idx < product.stats.length - 1 && <div className="stat-divider"></div>}
                  </React.Fragment>
                ))}
              </div>

              {/* <p className="trendy-product-desc">{product.description}</p> */}

              <button className="trendy-explore-btn">
                Explore Collection <FaArrowRight className="explore-icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="brands-section">
        <div className="brands-header">
          <div className="brands-eyebrow">
            <span className="brands-line" />
            <span className="brands-star">✦</span>
            <span className="brands-line" />
          </div>
          <h2 className="brands-title">TOP BRANDS</h2>
          <div className="brands-eyebrow" style={{ marginBottom: '12px' }}>
            <span className="brands-line" />
            <span className="brands-star">✦</span>
            <span className="brands-line" />
          </div>
          <p className="brands-subtitle">Discover 100+ premium brands and love your style</p>
        </div>

        <div className="brands-marquee-container">
          <div className="brands-marquee">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
              <div className="brand-card" key={index}>
                <span className={`brand-logo-text ${brand.class}`}>{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default TrendyCollection;