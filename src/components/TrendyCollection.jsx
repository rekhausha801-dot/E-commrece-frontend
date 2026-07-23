import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaStar, FaRegStar, FaStarHalfAlt, FaRegHeart, FaHeart, FaTag, FaMagic, FaShoppingBag, FaTshirt, FaPalette, FaArrowRight, FaLeaf, FaShoePrints } from 'react-icons/fa';
import './TrendyCollection.css';

import dressImg from '../assets/images/dress.jpg';
import poloImg from '../assets/images/polo.jpg';
import cargoImg from '../assets/images/cargo.jpg';
import sneakerImg from '../assets/images/sneaker.jpg';
import jordanImg from '../assets/images/shoe-jordan.jpg';

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
    title: 'Designer Kurthi',
    price: '₹499',
    originalPrice: '₹999',
    discount: '50% off',
    rating: 4.5,
    reviews: 24,
    timer: '01h : 02m : 53s'
  },
  {
    id: 2,
    image: poloImg,
    title: 'Classic Polo Shirt',
    price: '₹1,499',
    originalPrice: '₹2,499',
    discount: '40% off',
    rating: 4,
    reviews: 128,
    timer: '05h : 12m : 44s'
  },
  {
    id: 3,
    image: jordanImg,
    title: 'Air Jordan 1 High',
    price: '₹12,999',
    originalPrice: '₹15,999',
    discount: '18% off',
    rating: 5,
    reviews: 89,
    timer: '00h : 45m : 12s'
  },
  {
    id: 4,
    image: cargoImg,
    title: 'Cargo Pants',
    price: '₹1,899',
    originalPrice: '₹2,999',
    discount: '36% off',
    rating: 4,
    reviews: 215,
    timer: '12h : 30m : 00s'
  }
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

      <div className="unified-products-grid" style={{ marginTop: '30px', marginBottom: '10px' }}>
        {displayedProducts.map((product) => (
          <div 
            className="unified-product-card" 
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
          >
            <div className="unified-card-image-wrap">
              <button
                className="unified-wishlist-btn"
                onClick={(e) => toggleLike(e, product.id)}
                aria-label="Add to wishlist"
              >
                {likedIds.includes(product.id) ? <FaHeart color="#ff4d4f" /> : <FaRegHeart color="#555" />}
              </button>
              <img src={product.image} alt={product.title} />
              {product.timer && (
                <div className="unified-timer-pill">
                  {product.timer}
                </div>
              )}
            </div>

            <div className="unified-card-info">
              <h3 className="unified-card-title">
                {product.title}
              </h3>
              
              <div className="unified-card-rating">
                <div className="unified-stars">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <FaStar key={i} size={14} color={i < Math.floor(product.rating) ? "#8f7a5b" : "#e0e0e0"} />
                  ))}
                </div>
                <span className="unified-reviews">({product.reviews})</span>
              </div>

              <div className="unified-card-price">
                <span className="unified-price-new">{product.price}</span>
                {product.originalPrice && <span className="unified-price-old">{product.originalPrice}</span>}
                {product.discount && <span className="unified-price-discount">{product.discount}</span>}
              </div>

              <button 
                className="unified-explore-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/collection');
                }}
              >
                Explore Collection <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendyCollection;