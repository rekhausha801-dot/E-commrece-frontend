import React, { useState } from 'react';
import './Collection.css';
import { 
  Filter, Minus, Heart, ShoppingBag, Eye, LayoutGrid, Menu, ChevronDown, ChevronUp, X, SlidersHorizontal, Check, Star, Shirt
} from 'lucide-react';
import KurtiBanner from './KurtiBanner';

import kurthi5Img from '../assets/images/kurthi5.png';
import top3Img from '../assets/images/top3.png';
import topImg from '../assets/images/top.png';
import kurthi2Img from '../assets/images/kurthi2.png';
import croptopImg from '../assets/images/croptop.png';
import kurthi4Img from '../assets/images/kurthi4.png';
import bannerImg from '../assets/images/baner3.png';
import kurtiImg from '../assets/images/kurti.png';
import dfdImg from '../assets/images/dfd.png';
import kurthi3Img from '../assets/images/kurthi3.png';
import kurti1Img from '../assets/images/kurti1.png';
import kurti2BannerImg from '../assets/images/kurti2.png';

const products = [
  {
    id: 1,
    title: 'Embroidered Anarkali Kurti',
    price: '₹899',
    originalPrice: '₹1299',
    rating: 5,
    reviews: 24,
    badge: 'NEW',
    badgeClass: 'new',
    image: kurtiImg,
    colors: ['#9f3653', '#6d4c41', '#212121']
  },
  {
    id: 2,
    title: 'Printed Straight Kurti',
    price: '₹699',
    originalPrice: '₹999',
    rating: 4,
    reviews: 18,
    badge: 'BESTSELLER',
    badgeClass: 'bestseller',
    image: kurthi5Img,
    colors: ['#c62828', '#b71c1c', '#2e7d32']
  },
  {
    id: 3,
    title: 'Floral A-Line Kurti',
    price: '₹799',
    originalPrice: '₹999',
    rating: 4,
    reviews: 31,
    badge: '20% OFF',
    badgeClass: 'discount',
    image: kurthi2Img,
    colors: ['#00838f', '#f06292', '#ffb300']
  },
  {
    id: 4,
    title: 'Cotton Daily Wear Kurti',
    price: '₹649',
    originalPrice: '₹899',
    rating: 4,
    reviews: 26,
    badge: null,
    image: kurthi4Img,
    colors: ['#9f3653', '#37474f', '#283593']
  },
  {
    id: 5,
    title: 'Rayon Printed Kurti',
    price: '₹749',
    originalPrice: '₹999',
    rating: 4,
    reviews: 17,
    badge: '15% OFF',
    badgeClass: 'discount',
    image: croptopImg,
    colors: ['#00838f', '#37474f']
  },
  {
    id: 6,
    title: 'Chikankari Kurti',
    price: '₹1299',
    originalPrice: '₹1599',
    rating: 5,
    reviews: 23,
    badge: null,
    image: topImg,
    colors: ['#ffb703', '#fb8500']
  },
  {
    id: 7,
    title: 'Indo Western Kurti',
    price: '₹899',
    originalPrice: '₹1199',
    rating: 4,
    reviews: 15,
    badge: null,
    image: dfdImg,
    colors: ['#111111', '#d32f2f']
  },
  {
    id: 8,
    title: 'Embroidered Kurti',
    price: '₹999',
    originalPrice: '₹1499',
    rating: 5,
    reviews: 19,
    badge: null,
    image: kurthi3Img,
    colors: ['#827717', '#e6c200']
  }
];

const CATEGORIES = [
  { label: "Anarkali Kurtis", count: 32 },
  { label: "Straight Kurtis", count: 48 },
  { label: "A-Line Kurtis", count: 26 },
  { label: "Co-Ord Sets", count: 18 },
  { label: "Short Kurtis", count: 22 },
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
  { name: "Maroon", hex: "#7C2D3B" },
  { name: "Rose", hex: "#D8607A" },
  { name: "Blush", hex: "#E8B7C4" },
  { name: "Coral", hex: "#E86A4E" },
  { name: "Mustard", hex: "#E3A62B" },
  { name: "Forest", hex: "#3B6B4A" },
  { name: "Olive", hex: "#6B7A3A" },
  { name: "Navy", hex: "#2A3A5C" },
  { name: "Camel", hex: "#B4855A" },
  { name: "Rust", hex: "#B45535" },
  { name: "Ivory", hex: "#F1EAE0" },
  { name: "Charcoal", hex: "#2B2B2E" },
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

export default function Collection() {
  
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
      <KurtiBanner />

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
            
            <div className="products-count" style={{ fontSize: '13px', color: '#666', fontWeight: '500' }}>
              Showing 1-12 of 156 products
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
