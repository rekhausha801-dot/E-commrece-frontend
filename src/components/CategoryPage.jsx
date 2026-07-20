import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Collection.css';
import { 
  Filter, Heart, ShoppingBag, Eye, LayoutGrid, Menu, ChevronDown, ChevronUp, X, SlidersHorizontal, Check, Star
} from 'lucide-react';

// Import images
import bannerImg from '../assets/images/banner.png';
import banner0Img from '../assets/images/banner0.png';
import banner7Img from '../assets/images/banner7.png';
import banner12Img from '../assets/images/banner12.png';
import banner13Img from '../assets/images/banner13.png';
import banner15Img from '../assets/images/baner15.png';
import banner16Img from '../assets/images/banner16.png';
import dffImg from '../assets/images/dff.png';


import manImg from '../assets/images/man.png';
import shirtImg from '../assets/images/shirt.jpeg';
import shoeImg from '../assets/images/shoe.png';
import homeImg from '../assets/images/home.png';
import beautyImg from '../assets/images/beauty.png';
import watchImg from '../assets/images/watch.png';
import kidsImg from '../assets/images/kids.jpeg';
import mens1 from '../assets/images/mens1.png';
import mens2 from '../assets/images/mens2.png';
import mens3 from '../assets/images/mens3.png';
import mens4 from '../assets/images/mens4.png';
import mens5 from '../assets/images/mens5.png';
import mens from '../assets/images/man.png';
import footwear2Img from '../assets/images/footwear2.png';
import footwear3Img from '../assets/images/footwear3.png';
import footwear4Img from '../assets/images/footwear4.png';




import imgImg from '../assets/images/img.jpeg';
import watchBannerImg from '../assets/images/img2.jpeg';

// New images
import newHome1 from '../assets/images/new_home_decor_1.png';
import newHome2 from '../assets/images/new_home_decor_2.png';
import newHome3 from '../assets/images/new_home_decor_3.png';
import newHome4 from '../assets/images/new_home_decor_4.png';

import newBeauty1 from '../assets/images/new_beauty_1.png';
import newBeauty2 from '../assets/images/new_beauty_2.png';
import newBeauty3 from '../assets/images/new_beauty_3.png';
import newBeauty4 from '../assets/images/new_beauty_4.png';

import newKids1 from '../assets/images/new_kids_1.png';
import newKids2 from '../assets/images/new_kids_2.png';
import newKids3 from '../assets/images/new_kids_3.png';
import newKids4 from '../assets/images/new_kids_4.png';

import newFootwear1 from '../assets/images/new_footwear_1.png';


const CATEGORY_DATA = {
  'menswear': {
    title: "Mens Wear",
    banner: banner0Img,
    images: [mens1, mens2, mens3, mens4, mens5,mens]
  },
  'footwear': {
    title: "Footwear Collection",
    banner: banner7Img,
    images: [newFootwear1, footwear2Img, footwear3Img, footwear4Img]
  },
  'westernwear': {
    title: "Western Wear",
    banner: banner12Img,
    images: [shirtImg, manImg, kidsImg, beautyImg]
  },
  'western-dresses': {
    title: "Western Dresses",
    banner: banner12Img,
    images: [shirtImg, manImg, kidsImg, beautyImg]
  },
  'western': {
    title: "Western Wear",
    banner: banner12Img,
    images: [shirtImg, manImg, kidsImg, beautyImg]
  },
  'home-decor': {
    title: "Home Decor",
    banner: banner13Img,
    images: [newHome1, newHome2, newHome3, newHome4]
  },
  'beauty': {
    title: "Beauty & Personal Care",
    banner: banner13Img,
    images: [newBeauty1, newBeauty2, newBeauty3, newBeauty4]
  },
  'accessories': {
    title: "Accessories",
    banner: banner16Img,
    images: [watchImg, watchImg, watchImg, watchImg]
  },
  'kids-fashion': {
    title: "Kids Fashion",
    banner: banner15Img,
    images: [newKids1, newKids2, newKids3, newKids4]
  }
};

const CATEGORIES = [
  { label: "New Arrivals", count: 56 },
  { label: "Bestsellers", count: 24 },
  { label: "Trending", count: 18 },
  { label: "Discounted", count: 16 }
];

const FABRICS = [
  { label: "Cotton", count: 56 },
  { label: "Premium", count: 34 },
  { label: "Synthetic", count: 28 },
];

const SIZES = ["S", "M", "L", "XL", "XXL"];

const COLORS = [
  { name: "Blue", hex: "#798cb3" },
  { name: "Black", hex: "#222222" },
  { name: "White", hex: "#ffffff" },
  { name: "Red", hex: "#cfb489" },
];

const RATINGS = [5, 4, 3];

const DISCOUNTS = [
  { label: "10% and above", value: 10, count: 64 },
  { label: "20% and above", value: 20, count: 47 },
  { label: "30% and above", value: 30, count: 29 },
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

export default function CategoryPage() {
  const { categoryId } = useParams();
  const currentCategory = CATEGORY_DATA[categoryId] || {
    title: "Exclusive Collection",
    banner: bannerImg,
    images: [manImg, shoeImg, watchImg, beautyImg]
  };

  // Generate 8 mock products based on the category images (useMemo prevents them from shuffling when clicking like)
  const products = React.useMemo(() => Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    title: `${currentCategory.title} Item ${index + 1}`,
    price: `₹${Math.floor(Math.random() * 1000) + 499}`,
    originalPrice: `₹${Math.floor(Math.random() * 1000) + 1499}`,
    rating: Math.floor(Math.random() * 2) + 4,
    reviews: Math.floor(Math.random() * 50) + 10,
    badge: index === 0 ? 'NEW' : index === 1 ? 'BESTSELLER' : null,
    badgeClass: index === 0 ? 'new' : index === 1 ? 'bestseller' : '',
    image: currentCategory.images[index % currentCategory.images.length]
  })), [currentCategory]);
  
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
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
        <img src={currentCategory.banner} alt={currentCategory.title} className="banner-image" style={{ objectPosition: 'top center' }} />
        {currentCategory.title && (
          <div className="banner-text-overlay" style={{
            position: 'absolute',
            left: '8%',
            top: '54%',
            transform: 'translateY(-50%)',
            color: '#2b2b2b',
            maxWidth: '450px'
          }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontFamily: '"Playfair Display", Georgia, serif', 
              fontWeight: '700',
              marginBottom: '15px',
              lineHeight: '1.1'
            }}>
              {currentCategory.title}
            </h1>
            <p style={{ 
              fontSize: '16px', 
              color: '#444', 
              marginBottom: '0',
              lineHeight: '1.6'
            }}>
              Discover our latest collection. Crafted for comfort, designed for elegance to elevate your everyday style.
            </p>
          </div>
        )}
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

          <div className={`products-grid ${isMobileFilterOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            {sortedProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="card-image-wrap">
                  {product.badge && (
                    <span className={`badge ${product.badgeClass}`}>{product.badge}</span>
                  )}
                  <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                    <Heart 
                      size={16} 
                      fill={wishlist.includes(product.id) ? "#ff4d4f" : "none"} 
                      color={wishlist.includes(product.id) ? "#ff4d4f" : "currentColor"} 
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </button>
                  <img src={product.image} alt={product.title} />
                </div>
                
                <div className="card-info">
                  <h3 className="card-title">{product.title}</h3>
                  
                  <div className="card-rating">
                    <div className="stars">{renderStars(product.rating)}</div>
                    <span className="reviews">({product.reviews})</span>
                  </div>
                  
                  <div className="card-price">
                    <span className="price-new">{product.price}</span>
                    <span className="price-old">{product.originalPrice}</span>
                    {product.originalPrice && product.price && (
                      <span className="price-discount" style={{ color: '#00a388', fontWeight: 'bold', fontSize: '14px', marginLeft: '8px' }}>
                        {Math.round(((parseInt(product.originalPrice.replace('₹', '')) - parseInt(product.price.replace('₹', ''))) / parseInt(product.originalPrice.replace('₹', ''))) * 100)}% off
                      </span>
                    )}
                  </div>
                  
                  <div className="card-actions">
                    <button className="add-cart">
                      <ShoppingBag size={14} />
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
