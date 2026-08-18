import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import './Collection.css';
import { 
  Filter, Heart, ShoppingBag, Eye, LayoutGrid, Menu, ChevronDown, ChevronUp, X, SlidersHorizontal, Check, Star, ArrowRight, Shirt
} from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';

// Import images
import bannerImg from '../assets/images/banner.png';
import banner0Img from '../assets/images/banner0.png';
import banner7Img from '../assets/images/banner7.png';
import banner12Img from '../assets/images/banner12.png';
import banner13Img from '../assets/images/banner13.png';
import banner15Img from '../assets/images/baner15.png';
import banner16Img from '../assets/images/banner16.png';
import dffImg from '../assets/images/dff.png';
import westernBannerImg from '../assets/images/westrenwear.png';
import menBannerImg from '../assets/images/men9.png';


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
import tShirtImg from '../assets/images/t-shirt.png';
import hdShirtImg from '../assets/images/hd_shirt.png';
import poloImg from '../assets/images/polo.jpg';
import menTshirtImg from '../assets/images/casual_tshirt.png';
import tshirtBlack from '../assets/images/tshirt_black.png';
import tshirtWhite from '../assets/images/tshirt_white.png';
import tshirtNavy from '../assets/images/tshirt_navy.png';
import tshirtRed from '../assets/images/tshirt_red.png';
import tshirtOlive from '../assets/images/tshirt_olive.png';
import tshirtGrey from '../assets/images/tshirt_grey.png';
import poloBlack from '../assets/images/polo_black.png';
import poloWhite from '../assets/images/polo_white.png';
import poloNavy from '../assets/images/polo_navy.png';
import poloMaroon from '../assets/images/polo_maroon.png';
import poloGrey from '../assets/images/polo_grey.png';
import poloOlive from '../assets/images/polo_olive.png';




import imgImg from '../assets/images/img.jpeg';
import watchBannerImg from '../assets/images/img2.jpeg';


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

import classicBlackWatchImg from '../assets/images/classic_black_watch.png';
import stylishSunglassesImg from '../assets/images/stylish_sunglasses.png';
import premiumLeatherBeltImg from '../assets/images/premium_leather_belt.png';
import silverBraceletImg from '../assets/images/silver_bracelet.png';
import goldEarringsImg from '../assets/images/gold_earrings.png';
import leatherWalletImg from '../assets/images/leather_wallet.png';
import silkNecktieImg from '../assets/images/silk_necktie.png';
import topImg from '../assets/images/top.png';
import top2Img from '../assets/images/top2.jpeg';
import top3Img from '../assets/images/top3.png';
import wtshirt1 from '../assets/images/T-shirt10.png';
import wtshirt2 from '../assets/images/women_tshirt_2_1785476463079.png';
import wtshirt3 from '../assets/images/women_tshirt_3_1785476471701.png';
import wtshirt4 from '../assets/images/women_tshirt_4_1785476481060.png';
import wtshirt5 from '../assets/images/women_tshirt_5_1785476490108.png';
import wtshirt6 from '../assets/images/women_tshirt_6_1785476500329.png';
import wtshirt7 from '../assets/images/women_tshirt_7_1785476509699.png';
import wtshirt8 from '../assets/images/women_tshirt_8_1785476520232.png';
import wmodel1 from '../assets/images/T-shirt10.png';
import wmodel2 from '../assets/images/wtshirt_model_2_1785476733517.png';
import wmodel3 from '../assets/images/wtshirt_model_3_1785476746885.png';
import wmodel4 from '../assets/images/wtshirt_model_4_1785476755830.png';
import wmodel5 from '../assets/images/wtshirt_model_5_1785476766000.png';
import tshirt1Img from '../assets/images/t-shirt1.png';
import tshirt2Img from '../assets/images/t-shirt2.png';
import tshirt3Img from '../assets/images/t-shirt3.png';

import tshirt6Img from '../assets/images/t-shirt6.png';
import tshirt7Img from '../assets/images/t-shirt7.png';
import tshirt8Img from '../assets/images/t-shirt8.png';
const CATEGORY_DATA = {
  'girls-t-shirts': {
    title: "Girls T-Shirts Collection",
    banner: banner15Img,
    images: [wmodel5, wmodel4, wmodel3, wmodel2, wmodel1, newKids1, newKids2, tshirtWhite]
  },
  'women-t-shirts': {
    title: "Women's T-Shirts Collection",
    banner: banner0Img,
    images: [tshirt8Img, tshirt1Img, tshirt2Img, tshirt3Img, tshirt6Img, tshirt7Img, tShirtImg, wmodel1, wmodel2, wmodel3, wmodel4, wmodel5, wtshirt1, wtshirt2, wtshirt3, tshirtWhite, topImg, top2Img, top3Img, tshirtBlack, tshirtRed]
  },
  'womenswear': {
    title: "Womenswear Collection",
    banner: banner0Img,
    images: [beautyImg, bannerImg, imgImg, manImg]
  },
  'menswear': {
    title: "Menswear Collection",
    banner: menBannerImg,
    images: [mens1, mens2, mens3, mens4, mens5,mens]
  },
  't-shirts': {
    title: "T-Shirts Collection",
    banner: menBannerImg,
    images: [tshirtBlack, tshirtWhite, tshirtNavy, tshirtRed, tshirtOlive, tshirtGrey]
  },
  'shirts': {
    title: "Shirts Collection",
    banner: menBannerImg,
    images: [menTshirtImg, hdShirtImg, menTshirtImg, manImg]
  },
  'polo-t-shirts': {
    title: "Polo T-Shirts Collection",
    banner: menBannerImg,
    images: [poloBlack, poloWhite, poloNavy, poloMaroon, poloGrey, poloOlive]
  },
  'footwear': {
    title: "Footwear Collection",
    banner: banner7Img,
    images: [newFootwear1, footwear2Img, footwear3Img, footwear4Img]
  },
  'westernwear': {
    title: "Western Wear",
    banner: westernBannerImg,
    images: [shirtImg, manImg, kidsImg, beautyImg]
  },
  'western-dresses': {
    title: "Western Dresses",
    banner: westernBannerImg,
    images: [shirtImg, manImg, kidsImg, beautyImg]
  },
  'western': {
    title: "Western Wear",
    banner: westernBannerImg,
    images: [shirtImg, manImg, kidsImg, beautyImg]
  },
  'home-decor': {
    title: "Home Decor",
    banner: homeImg,
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
    images: [
      watchImg, 
      stylishSunglassesImg, 
      premiumLeatherBeltImg, 
      classicBlackWatchImg,
      silverBraceletImg,
      goldEarringsImg,
      leatherWalletImg,
      silkNecktieImg
    ]
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
  const navigate = useNavigate();
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  const handleCartClick = (e, product) => {
    e.stopPropagation();
    if (addedToCart[product.id]) {
      navigate('/cart');
    } else {
      setAddedToCart(prev => ({ ...prev, [product.id]: true }));
      addToCart(product);
      message.success(`${product.title || 'Product'} added to cart!`);
    }
  };

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
    image: currentCategory.images[index % currentCategory.images.length],
    categoryId: categoryId
  })), [currentCategory, categoryId]);
  
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ecommerce_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem('ecommerce_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const handleWishlistToggle = (product) => {
    // If not already in wishlist, add it before navigating
    if (!wishlist.some(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
    navigate('/wishlist');
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
      {currentCategory.banner && (
        <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', marginBottom: '30px' }}>
          <img 
            src={currentCategory.banner} 
            alt={currentCategory.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }} 
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '8%',
            background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)',
            color: '#ffffff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ width: '40px', height: '1px', backgroundColor: '#e5c398' }} />
              <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '3px', color: '#e5c398', textTransform: 'uppercase' }}>NEW SEASON</span>
              <span style={{ width: '40px', height: '1px', backgroundColor: '#e5c398' }} />
            </div>
            
            {categoryId === 'menswear' ? (
              <>
                <h2 style={{ fontSize: '64px', fontWeight: '400', letterSpacing: '2px', margin: '0', lineHeight: 1 }}>MENS</h2>
                <h3 style={{ fontSize: '32px', fontWeight: '400', letterSpacing: '7px', color: '#e5c398', margin: '8px 0 0 0' }}>WEAR</h3>
              </>
            ) : (
              <h2 style={{ fontSize: '48px', fontWeight: '400', letterSpacing: '2px', margin: '0', lineHeight: 1.2, textTransform: 'uppercase' }}>
                {currentCategory.title}
              </h2>
            )}
            
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
      )}

      <div className="pdp-breadcrumbs" style={{ padding: '20px 5% 0', fontSize: '14px' }}>
        <span onClick={() => navigate('/')} style={{ color: '#666', cursor: 'pointer' }}>Home</span>
        <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
        <span onClick={() => navigate('/category/womenswear')} style={{ color: '#666', cursor: 'pointer' }}>Category</span>
        <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>
        <span className="current" style={{ color: '#222', fontWeight: '600' }}>{currentCategory.title}</span>
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
                <span>Refine Result</span>
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
                  <button className="unified-wishlist-btn" onClick={(e) => { e.stopPropagation(); handleWishlistToggle(product); }}>
                    <Heart 
                      size={16} 
                      fill={wishlist.some(item => item.id === product.id) ? "#ff4d4f" : "none"} 
                      color={wishlist.some(item => item.id === product.id) ? "#ff4d4f" : "#555"} 
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
