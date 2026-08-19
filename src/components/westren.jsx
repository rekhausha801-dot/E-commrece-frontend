import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import './Collection.css';
import {
  Filter, Minus, Heart, ShoppingBag, Eye, LayoutGrid, Menu, ChevronDown, ChevronUp, X, SlidersHorizontal, Check, Star, Shirt, ArrowRight
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { handleFlyingCartAnimation } from '../utils/cartAnimation';

import bannerImg from '../assets/images/westrenwear.png';
import westren2Img from '../assets/images/westren2.png';
import westren3Img from '../assets/images/westren3.png';
import westren4Img from '../assets/images/westren4.png';
import westren5Img from '../assets/images/westren5.png';
import westren6Img from '../assets/images/westren6.png';
import westren7Img from '../assets/images/westren7.png';
import westren8Img from '../assets/images/westren8.png';

const products = [
  {
    id: 1,
    title: 'Floral Maxi Dress',
    price: '₹999',
    originalPrice: '₹1399',
    rating: 5,
    reviews: 26,
    badge: 'NEW',
    badgeClass: 'new',
    image: westren4Img,
    colors: ['#e1b6bd', '#93adc6', '#cfb489']
  },
  {
    id: 2,
    title: 'Black Bodycon Dress',
    price: '₹899',
    originalPrice: '₹1299',
    rating: 4,
    reviews: 31,
    badge: 'BESTSELLER',
    badgeClass: 'bestseller',
    image: westren3Img,
    colors: ['#222222', '#8c1616', '#e0dfdf']
  },
  {
    id: 3,
    title: 'Blue Floral Midi Dress',
    price: '₹879',
    originalPrice: '₹1099',
    rating: 4,
    reviews: 22,
    badge: null,
    image: westren5Img,
    colors: ['#93adc6', '#222222', '#cfb489']
  },
  {
    id: 4,
    title: 'Polka Dot Wrap Dress',
    price: '₹749',
    originalPrice: '₹999',
    rating: 5,
    reviews: 48,
    badge: 'TRENDING',
    badgeClass: 'trending',
    image: westren2Img,
    colors: ['#222222', '#e0dfdf', '#cfb489']
  },
  {
    id: 5,
    title: 'Pink Ruffle Hem Dress',
    price: '₹699',
    originalPrice: '₹899',
    rating: 4,
    reviews: 15,
    badge: '15% OFF',
    badgeClass: 'discount',
    image: westren6Img,
    colors: ['#e1b6bd', '#e0dfdf']
  },
  {
    id: 6,
    title: 'Emerald Green Slip Dress',
    price: '₹1199',
    originalPrice: '₹1599',
    rating: 5,
    reviews: 29,
    badge: null,
    image: westren7Img,
    colors: ['#1b4332', '#cfb489']
  },
  {
    id: 7,
    title: 'White Lace Shift Dress',
    price: '₹1099',
    originalPrice: '₹1499',
    rating: 4,
    reviews: 19,
    badge: null,
    image: westren8Img,
    colors: ['#e0dfdf', '#93adc6']
  },
  {
    id: 8,
    title: 'Burgundy Velvet Dress',
    price: '₹1499',
    originalPrice: '₹1999',
    rating: 5,
    reviews: 42,
    badge: 'PREMIUM',
    badgeClass: 'premium',
    image: bannerImg,
    colors: ['#8c1616', '#222222', '#cfb489']
  }
];

const CATEGORIES = [
  { label: "New Arrivals", count: 56 },
  { label: "Bestsellers", count: 24 },
  { label: "Trending", count: 18 },
  { label: "Discounted", count: 16 }
];

const FABRICS = [
  { label: "Cotton Blend", count: 42 },
  { label: "Polyester", count: 38 },
  { label: "Satin", count: 15 },
  { label: "Velvet", count: 8 },
];

const SIZES = ["XS", "S", "M", "L", "XL"];

const COLORS = [
  { name: "Black", hex: "#222222" },
  { name: "White", hex: "#e0dfdf" },
  { name: "Red", hex: "#8c1616" },
  { name: "Blue", hex: "#93adc6" },
  { name: "Pink", hex: "#e1b6bd" },
  { name: "Green", hex: "#1b4332" },
  { name: "Gold", hex: "#cfb489" }
];

const RATINGS = [5, 4, 3];

const DISCOUNTS = [
  { label: "10% and above", value: 10, count: 42 },
  { label: "20% and above", value: 20, count: 28 },
  { label: "30% and above", value: 30, count: 15 },
  { label: "40% and above", value: 40, count: 7 },
  { label: "50% and above", value: 50, count: 3 },
];

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="filter-panel-section">
      <button
        onClick={() => setOpen(!open)}
        className="filter-panel-header-btn"
      >
        <span className="filter-panel-title">{title}</span>
        {open ? (
          <ChevronUp size={16} className="filter-panel-chevron" />
        ) : (
          <ChevronDown size={16} className="filter-panel-chevron" />
        )}
      </button>
      {open && <div className="filter-panel-content">{children}</div>}
    </div>
  );
}

export default function WesternCollection() {
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  const handleCartClick = async (e, product) => {
    e.stopPropagation();
    if (addedToCart[product.id]) {
      navigate('/cart');
    } else {
      await handleFlyingCartAnimation(e);
      setAddedToCart(prev => ({ ...prev, [product.id]: true }));
      addToCart(product);
      message.success(`${product.title || 'Product'} added to cart!`);
    }
  };

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [minPrice, setMinPrice] = useState(299);
  const [maxPrice, setMaxPrice] = useState(3532);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Popularity');
  const [isSortOpen, setIsSortOpen] = useState(false);

  const totalFilters = selectedCategories.length + selectedFabrics.length + selectedSizes.length + selectedColors.length + (selectedRating ? 1 : 0) + (selectedDiscount ? 1 : 0);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedRating(null);
    setSelectedDiscount(null);
    setMinPrice(299);
    setMaxPrice(3532);
  };

  const toggle = (arr, setArr, value) => {
    setArr(
      arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', ''));
      case 'Price: High to Low':
        return parseInt(b.price.replace('₹', '')) - parseInt(a.price.replace('₹', ''));
      case 'Rating':
        return b.rating - a.rating;
      case 'Popularity':
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="collection-page">
      <div className="collection-banner-container" style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', marginBottom: '30px' }}>
        <img src={bannerImg} alt="Western Wear Banner" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '8%',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 100%)',
          color: '#ffffff'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ width: '40px', height: '1px', backgroundColor: '#e5c398' }} />
            <span style={{ fontSize: '9px', fontWeight: '600', letterSpacing: '3px', color: '#e5c398', textTransform: 'uppercase' }}>NEW SEASON</span>
            <span style={{ width: '40px', height: '1px', backgroundColor: '#e5c398' }} />
          </div>
          <h2 style={{ fontSize: '52px', fontWeight: '400', letterSpacing: '2px', margin: '0', lineHeight: 1 }}>WESTERN</h2>
          <h3 style={{ fontSize: '26px', fontWeight: '400', letterSpacing: '7px', color: '#e5c398', margin: '8px 0 0 0' }}>WEAR</h3>

          <button style={{
            marginTop: '30px',
            padding: '14px 32px',
            backgroundColor: '#e5c398',
            color: '#111',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            width: 'fit-content',
            letterSpacing: '1px',
            transition: 'background-color 0.3s'
          }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d4b082'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e5c398'}
          >
            SHOP NOW <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="pdp-breadcrumbs" style={{ padding: '20px 5% 0', fontSize: '14px' }}>
        <span onClick={() => navigate('/')} style={{ color: '#666', cursor: 'pointer' }}>Home</span>
        <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
        <span onClick={() => navigate('/category/womenswear')} style={{ color: '#666', cursor: 'pointer' }}>Women</span>
        <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
        <span onClick={() => navigate('/category/clothing')} style={{ color: '#666', cursor: 'pointer' }}>Clothing</span>
        <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
        <span className="current" style={{ color: '#222', fontWeight: '600' }}>Western Wear</span>
      </div>

      <div className="collection-main">
        {/* Sidebar */}
        <div className={`sidebar-overlay ${isMobileFilterOpen ? 'open' : ''}`} onClick={() => setIsMobileFilterOpen(false)}></div>
        <aside className={`collection-sidebar ${isMobileFilterOpen ? 'open' : ''}`} style={{ width: '280px', flexShrink: 0 }}>
          <div className="filter-sidebar-container">
            {/* Header */}
            <div className="filter-sidebar-top">
              <div className="filter-sidebar-title">
                <SlidersHorizontal size={20} />
                <span>Refine Results</span>
                {totalFilters > 0 && <span className="filter-count-badge">{totalFilters}</span>}
              </div>
              {totalFilters > 0 && (
                <button className="filter-reset-btn" onClick={resetFilters}>Reset</button>
              )}
            </div>

            {/* Active Filter Pills */}
            {totalFilters > 0 && (
              <div className="active-filters-container">
                {selectedCategories.map(cat => (
                  <span key={cat} className="active-filter-pill" onClick={() => toggle(selectedCategories, setSelectedCategories, cat)}>
                    {cat} <X size={12} />
                  </span>
                ))}
                {selectedFabrics.map(fab => (
                  <span key={fab} className="active-filter-pill" onClick={() => toggle(selectedFabrics, setSelectedFabrics, fab)}>
                    {fab} <X size={12} />
                  </span>
                ))}
                {selectedSizes.map(size => (
                  <span key={size} className="active-filter-pill" onClick={() => toggle(selectedSizes, setSelectedSizes, size)}>
                    Size: {size} <X size={12} />
                  </span>
                ))}
                {selectedColors.map(color => (
                  <span key={color} className="active-filter-pill" onClick={() => toggle(selectedColors, setSelectedColors, color)}>
                    {color} <X size={12} />
                  </span>
                ))}
                {selectedRating && (
                  <span className="active-filter-pill" onClick={() => setSelectedRating(null)}>
                    {selectedRating}★ & above <X size={12} />
                  </span>
                )}
                {selectedDiscount && (
                  <span className="active-filter-pill" onClick={() => setSelectedDiscount(null)}>
                    {selectedDiscount}% & above <X size={12} />
                  </span>
                )}
              </div>
            )}

            <div className="filter-sidebar-body">
              {/* Price */}
              <Section title="PRICE">
                <div className="custom-price-slider">
                  <div className="slider-track-line"></div>
                  <div
                    className="slider-track-active"
                    style={{
                      left: `${(minPrice / 5000) * 100}%`,
                      right: `${100 - (maxPrice / 5000) * 100}%`,
                    }}
                  ></div>
                  <div className="slider-inputs">
                    <input
                      type="range"
                      min={0}
                      max={5000}
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))
                      }
                      className="range-input"
                    />
                    <input
                      type="range"
                      min={0}
                      max={5000}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))
                      }
                      className="range-input"
                    />
                  </div>
                </div>
                <div className="price-display-text">
                  ₹{minPrice.toLocaleString("en-IN")} - ₹{maxPrice.toLocaleString("en-IN")}
                </div>
              </Section>

              {/* Discount */}
              <Section title="DISCOUNT">
                <div className="filter-list">
                  {DISCOUNTS.map((d) => {
                    const active = selectedDiscount === d.value;
                    return (
                      <button
                        key={d.value}
                        onClick={() => setSelectedDiscount(active ? null : d.value)}
                        className="filter-list-item"
                      >
                        <div className="filter-list-left">
                          <span className={`filter-radio ${active ? 'active' : ''}`}>
                            {active && <span className="radio-inner"></span>}
                          </span>
                          <span className={`filter-label ${active ? 'active' : ''}`}>{d.label}</span>
                        </div>
                        <span className="filter-count">{d.count}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Category */}
              <Section title="CATEGORY">
                <div className="filter-list">
                  {CATEGORIES.map((cat) => {
                    const active = selectedCategories.includes(cat.label);
                    return (
                      <button
                        key={cat.label}
                        onClick={() => toggle(selectedCategories, setSelectedCategories, cat.label)}
                        className="filter-list-item"
                      >
                        <div className="filter-list-left">
                          <span className={`filter-checkbox ${active ? 'active' : ''}`}>
                            {active && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span className={`filter-label ${active ? 'active' : ''}`}>{cat.label}</span>
                        </div>
                        <span className="filter-count">{cat.count}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Fabric */}
              <Section title="FABRIC">
                <div className="filter-list">
                  {FABRICS.map((f) => {
                    const active = selectedFabrics.includes(f.label);
                    return (
                      <button
                        key={f.label}
                        onClick={() => toggle(selectedFabrics, setSelectedFabrics, f.label)}
                        className="filter-list-item"
                      >
                        <div className="filter-list-left">
                          <span className={`filter-checkbox ${active ? 'active' : ''}`}>
                            {active && <Check size={12} strokeWidth={3} />}
                          </span>
                          <span className={`filter-label ${active ? 'active' : ''}`}>{f.label}</span>
                        </div>
                        <span className="filter-count">{f.count}</span>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Size */}
              <Section title="SIZE">
                <div className="size-pill-grid">
                  {SIZES.map((s) => {
                    const active = selectedSizes.includes(s);
                    return (
                      <button
                        key={s}
                        onClick={() => toggle(selectedSizes, setSelectedSizes, s)}
                        className={`size-pill ${active ? 'active' : ''}`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Color */}
              <Section title="COLOR">
                <div className="color-swatch-grid">
                  {COLORS.map((c) => {
                    const active = selectedColors.includes(c.name);
                    return (
                      <button
                        key={c.name}
                        title={c.name}
                        onClick={() => toggle(selectedColors, setSelectedColors, c.name)}
                        className={`color-swatch-btn ${active ? 'active' : ''}`}
                      >
                        <div
                          className="color-swatch-inner"
                          style={{ backgroundColor: c.hex }}
                        ></div>
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* Rating */}
              <Section title="CUSTOMER RATING">
                <div className="rating-filter-list">
                  {RATINGS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                      className={`rating-filter-btn ${selectedRating === r ? 'active' : ''}`}
                    >
                      <div className="rating-filter-stars">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            fill={idx < r ? "#8f7a5b" : "#e0e0e0"}
                            color={idx < r ? "#8f7a5b" : "#e0e0e0"}
                          />
                        ))}
                      </div>
                      <span className="rating-filter-text">& above</span>
                    </button>
                  ))}
                </div>
              </Section>
            </div>

            {/* Footer button */}
            <div className="filter-sidebar-footer">
              <button className="show-results-btn" onClick={() => setIsMobileFilterOpen(false)}>
                Show Results
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="collection-content">
          <div className="top-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: 'none' }}>
            <div className="view-modes">
              <button
                className="view-btn"
                style={{
                  width: 'auto',
                  padding: '8px 16px',
                  gap: '8px',
                  fontWeight: '600',
                  backgroundColor: '#8f7a5b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '13px',
                  letterSpacing: '0.5px'
                }}
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <LayoutGrid size={16} /> FILTERS
              </button>
            </div>
            

            
            <div className="sort-container" style={{position: 'relative'}}>
              <div 
                className="sort-select" 
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{
                  cursor: 'pointer',
                  userSelect: 'none',
                  border: '1px solid #e0e0e0',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#555',
                  backgroundColor: 'white'
                }}
              >
                Sort by: {sortBy} <ChevronDown size={14} color="#666" />
              </div>
              {isSortOpen && (
                <div className="sort-dropdown" style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '5px',
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '4px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 10,
                  minWidth: '160px',
                  overflow: 'hidden'
                }}>
                  {['Popularity', 'Price: Low to High', 'Price: High to Low', 'Rating'].map((option, idx, arr) => (
                    <div
                      key={option}
                      className="sort-option"
                      onClick={() => {
                        setSortBy(option);
                        setIsSortOpen(false);
                      }}
                      style={{
                        padding: '10px 15px',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: sortBy === option ? '#8f7a5b' : '#555',
                        fontWeight: sortBy === option ? '600' : '400',
                        backgroundColor: sortBy === option ? '#fbf8f4' : 'white',
                        borderBottom: idx === arr.length - 1 ? 'none' : '1px solid #f0f0f0'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fbf8f4'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = sortBy === option ? '#fbf8f4' : 'white'}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <motion.div layout className={`unified-products-grid ${isMobileFilterOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <AnimatePresence mode="popLayout">
              {sortedProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="unified-product-card"
                  onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                >
                <div className="unified-card-image-wrap">
                  {product.badge && (
                    <div className="unified-badge" style={{ background: product.badgeClass === 'badge-new' ? '#1a1d20' : '#c0a07c' }}>{product.badge}</div>
                  )}
                  <button
                    className="unified-wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                  >
                    <Heart
                      size={16}
                      fill={isInWishlist(product.id) ? "#ff4d4f" : "none"}
                      color={isInWishlist(product.id) ? "#ff4d4f" : "#555"}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </button>
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="unified-card-info">
                  <h3 className="unified-card-title">{product.title}</h3>

                  <div className="unified-card-rating">
                    <div className="unified-stars">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} size={14} fill={i < product.rating ? "#8f7a5b" : "#e0e0e0"} color={i < product.rating ? "#8f7a5b" : "#e0e0e0"} />
                      ))}
                    </div>
                    <span className="unified-reviews">({product.reviews})</span>
                  </div>

                  <div className="unified-card-price">
                    <span className="unified-price-new">{product.price}</span>
                    {product.originalPrice && <span className="unified-price-old">{product.originalPrice}</span>}
                    {product.originalPrice && product.price && (
                      <span className="unified-price-discount">
                        {Math.round(((parseInt(product.originalPrice.replace('₹', '')) - parseInt(product.price.replace('₹', ''))) / parseInt(product.originalPrice.replace('₹', ''))) * 100)}% off
                      </span>
                    )}
                  </div>

                  <button className="unified-explore-btn" onClick={(e) => handleCartClick(e, product)}>
                    <ShoppingBag size={16} />
                    {addedToCart[product.id] ? "GO TO CART" : "ADD TO CART"}
                  </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
