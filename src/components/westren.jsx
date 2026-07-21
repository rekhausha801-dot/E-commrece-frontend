import React, { useState } from 'react';
import './Collection.css';
import { 
  Filter, Heart, ShoppingBag, Eye, LayoutGrid, Menu, ChevronDown, ChevronUp, X, SlidersHorizontal, Check, Star
} from 'lucide-react';

import bannerImg from '../assets/images/banner12.png';
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
    reviews: 19,
    badge: '20% OFF',
    badgeClass: 'discount',
    image: westren4Img,
    colors: ['#798cb3', '#e2a3b7', '#a1c29b']
  },
  {
    id: 4,
    title: 'Off-Shoulder Dress',
    price: '₹949',
    originalPrice: '₹1299',
    rating: 5,
    reviews: 22,
    badge: null,
    image: westren5Img,
    colors: ['#e4cdb5', '#c39580', '#2a2a2a']
  },
  {
    id: 5,
    title: 'Puff Sleeve Dress',
    price: '₹849',
    originalPrice: '₹999',
    rating: 5,
    reviews: 17,
    badge: '15% OFF',
    badgeClass: 'discount',
    image: westren6Img,
    colors: ['#7f9e8a', '#c1c1c1', '#a38d7c']
  },
  {
    id: 6,
    title: 'Shirt Dress',
    price: '₹799',
    originalPrice: '₹999',
    rating: 4,
    reviews: 14,
    badge: null,
    image: westren7Img,
    colors: ['#8f402c', '#1a1a1a', '#e8d4b8']
  },
  {
    id: 7,
    title: 'Lavender Tier Dress',
    price: '₹999',
    originalPrice: '₹1399',
    rating: 5,
    reviews: 23,
    badge: null,
    image: westren8Img,
    colors: ['#a69cc4', '#cfba99', '#c1897c']
  },
  {
    id: 8,
    title: 'Stripes Jumpsuit',
    price: '₹949',
    originalPrice: '₹1199',
    rating: 4,
    reviews: 18,
    badge: null,
    image: westren3Img,
    colors: ['#222222', '#ffffff', '#ba9375']
  }
];

const CATEGORIES = [
  { label: "Dresses", count: 56 },
  { label: "Maxi Dresses", count: 24 },
  { label: "Midi Dresses", count: 18 },
  { label: "Bodycon Dresses", count: 16 },
  { label: "Skater Dresses", count: 20 },
  { label: "Off-Shoulder", count: 14 },
  { label: "Jumpsuits", count: 10 },
];

const FABRICS = [
  { label: "Cotton", count: 56 },
  { label: "Rayon", count: 34 },
  { label: "Georgette", count: 28 },
  { label: "Silk", count: 16 },
  { label: "Linen", count: 12 },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL"];

const COLORS = [
  { name: "Pink", hex: "#e1b6bd" },
  { name: "Purple", hex: "#a69cc4" },
  { name: "Blue", hex: "#798cb3" },
  { name: "Green", hex: "#7f9e8a" },
  { name: "Beige", hex: "#e4cdb5" },
  { name: "Black", hex: "#222222" },
];

const RATINGS = [5, 4, 3];

const DISCOUNTS = [
  { label: "10% and above", value: 10, count: 64 },
  { label: "20% and above", value: 20, count: 47 },
  { label: "30% and above", value: 30, count: 29 },
  { label: "40% and above", value: 40, count: 15 },
  { label: "50% and above", value: 50, count: 8 },
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

  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star key={idx} size={12} fill={idx < rating ? "#8f7a5b" : "#e0e0e0"} color={idx < rating ? "#8f7a5b" : "#e0e0e0"} />
    ));
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
      {/* Banner */}
      <div className="collection-banner" style={{ position: 'relative' }}>
        <img 
          src={bannerImg} 
          alt="Western Banner" 
          className="banner-image" 
          style={{ width: '100%', height: '380px', objectFit: 'cover', objectPosition: 'top center' }}
        />
        <div className="banner-text-overlay" style={{
          position: 'absolute',
          left: '8%',
          top: '55%',
          transform: 'translateY(-50%)',
          color: '#2b2b2b',
          maxWidth: '800px',
          textAlign: 'left'
        }}>
          <h1 style={{ 
            fontSize: '52px', 
            fontFamily: '"Playfair Display", Georgia, serif', 
            fontWeight: '600',
            marginBottom: '15px',
            lineHeight: '1.2',
            whiteSpace: 'nowrap'
          }}>
            Western Dress Collection
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#444', 
            marginBottom: '0',
            fontFamily: 'Inter, sans-serif'
          }}>
            Trendy styles for every you
          </p>
        </div>
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
          <div className="top-bar">
            <div className="view-modes">
              <button className="view-btn active" style={{width: 'auto', padding: '0 15px', gap: '8px', fontWeight: 'bold'}} onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
                <LayoutGrid size={18} /> FILTERS
              </button>
              
            </div>
            
            <div className="products-count">Showing 1-12 of 156 products</div>
            
            <div className="sort-container" style={{position: 'relative'}}>
              <div 
                className="sort-select" 
                onClick={() => setIsSortOpen(!isSortOpen)}
                style={{cursor: 'pointer', userSelect: 'none'}}
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
                  borderRadius: '6px',
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
                        fontSize: '0.85rem',
                        color: sortBy === option ? '#8f7a5b' : '#333',
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

          <div className={`unified-products-grid ${isMobileFilterOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {sortedProducts.map(product => (
              <div key={product.id} className="unified-product-card">
                <div className="unified-card-image-wrap">
                  {product.badge && (
                    <div className="unified-badge" style={{ background: product.badgeClass === 'badge-new' ? '#1a1d20' : '#c0a07c' }}>{product.badge}</div>
                  )}
                  <button className="unified-wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                    <Heart 
                      size={16} 
                      fill={wishlist.includes(product.id) ? "#ff4d4f" : "none"} 
                      color={wishlist.includes(product.id) ? "#ff4d4f" : "#555"} 
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
                        <FaStar key={i} size={14} color={i < product.rating ? "#8f7a5b" : "#e0e0e0"} />
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
                  
                  <button className="unified-explore-btn">
                    <ShoppingBag size={16} />
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
