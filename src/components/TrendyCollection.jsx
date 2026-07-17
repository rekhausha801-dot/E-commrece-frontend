import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFire, FaStar, FaRegStar, FaStarHalfAlt, FaRegHeart, FaHeart, FaTag, FaMagic, FaShoppingBag } from 'react-icons/fa';
import './TrendyCollection.css';

const coatImg = 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&q=80&auto=format&fit=crop';
const vestImg = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80&auto=format&fit=crop';
const beanieImg = 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80&auto=format&fit=crop';
const braletteImg = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80&auto=format&fit=crop';
const slippersImg = 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80&auto=format&fit=crop';

const TABS = [
  { id: 'trending', label: 'Trending Now', icon: <FaFire /> },
  { id: 'bestsellers', label: 'Best Sellers', icon: <FaStar /> },
  { id: 'new', label: 'New Arrivals', icon: <FaMagic /> },
  { id: 'limited', label: 'Limited Offers', icon: <FaTag /> },
];


const ALL_PRODUCTS = [
  {
    id: 1,
    image: coatImg,
    badge: 'NEW',
    badgeClass: 'badge-new',
    title: 'Chalier Warm Winter Headband for Women',
    rating: 4,
    reviews: 128,
    price: '$119.00',
    oldPrice: '$200.00',
    cartClass: 'cart-tan',
  },
  {
    id: 2,
    image: vestImg,
    badge: '-20%',
    badgeClass: 'badge-sale',
    title: "Lailezou Women's V Neck Knit Sweater Vest",
    rating: 4.5,
    reviews: 86,
    price: '$39.00',
    oldPrice: '$49.00',
    cartClass: 'cart-outline',
  },
  {
    id: 3,
    image: beanieImg,
    badge: 'BESTSELLER',
    badgeClass: 'badge-bestseller',
    title: 'Men Letter Label Decor woolen Beanie hat',
    rating: 4,
    reviews: 64,
    price: '$24.99',
    oldPrice: null,
    cartClass: 'cart-green',
  },
  {
    id: 4,
    image: braletteImg,
    badge: 'NEW',
    badgeClass: 'badge-new-pink',
    title: 'Maidenform Pure Comfort Lace Bralette',
    rating: 4.5,
    reviews: 102,
    price: '$40.00',
    oldPrice: null,
    cartClass: 'cart-pink',
  },
  {
    id: 5,
    image: slippersImg,
    badge: 'HOT',
    badgeClass: 'badge-hot',
    title: 'Mahza Woman Sweater Autumn And Winter',
    rating: 4.5,
    reviews: 74,
    price: '$50.00',
    oldPrice: null,
    cartClass: 'cart-orange',
  },
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
    switch (activeTab) {
      case 'trending':
        return [ALL_PRODUCTS[0], ALL_PRODUCTS[1], ALL_PRODUCTS[2], ALL_PRODUCTS[3]];
      case 'bestsellers':
        return [ALL_PRODUCTS[2], ALL_PRODUCTS[4], ALL_PRODUCTS[0], ALL_PRODUCTS[1]];
      case 'new':
        return [ALL_PRODUCTS[3], ALL_PRODUCTS[0], ALL_PRODUCTS[4], ALL_PRODUCTS[2]];
      case 'limited':
        return [ALL_PRODUCTS[1], ALL_PRODUCTS[3], ALL_PRODUCTS[2], ALL_PRODUCTS[4]];
      default:
        return [ALL_PRODUCTS[0], ALL_PRODUCTS[1], ALL_PRODUCTS[2], ALL_PRODUCTS[3]];
    }
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
              <span className={`trendy-badge ${product.badgeClass}`}>{product.badge}</span>
              <button
                className={`like-btn ${likedIds.includes(product.id) ? 'liked' : ''}`}
                onClick={(e) => toggleLike(e, product.id)}
                aria-label="Add to wishlist"
              >
                {likedIds.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
              <img src={product.image} alt={product.title} className="trendy-image" />
            </div>

            <div className="trendy-info">
              <h3 className="trendy-product-title">{product.title}</h3>

              <StarRating rating={product.rating} reviews={product.reviews} />

              <div className="trendy-price">
                <span className="new-price">{product.price}</span>
                {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
              </div>

              <button 
                className={`add-to-cart ${product.cartClass}`}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="cart-icon"><FaShoppingBag /></span>
                <span>Add to Cart</span>
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