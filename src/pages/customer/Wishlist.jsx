import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { Heart, Flame, Search, Grid, List, ChevronDown, Share2, ArrowRight, ShieldCheck, Truck, ShoppingCart, ShoppingBag, Bell, Tag, Gift, Star, Home, Filter, ArrowUpDown, Leaf } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Wishlist.css';
import '../../components/Collection.css';
import bannerImg from "../../assets/banners/list.png";
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { handleFlyingCartAnimation } from '../../utils/cartAnimation';
import { motion, AnimatePresence } from 'framer-motion';
import westren3Img from '../../assets/images/westren3.png';
import kurtiImg from '../../assets/images/kurti.png';
import westren4Img from '../../assets/images/westren4.png';
import mens1Img from '../../assets/images/mens1.png';
import mens2Img from '../../assets/images/mens2.png';

// Dummy data for sections
const recommended = [
  { id: 'r1', brand: 'MANGO', title: 'Linen Blend Shirt', price: '$49.99', image: westren4Img },
  { id: 'r2', brand: 'ZARA', title: 'Straight Fit Jeans', price: '$59.99', image: mens1Img },
  { id: 'r3', brand: 'ALDO', title: 'Quilted Chain Bag', price: '$69.99', image: westren3Img },
  { id: 'r4', brand: 'H&M', title: 'Ribbed Tank Top', price: '$19.99', image: kurtiImg },
  { id: 'r5', brand: 'NIKE', title: 'Court Vision Low', price: '$74.99', image: mens2Img },
  { id: 'r6', brand: 'ZARA', title: 'Knit Cardigan', price: '$49.99', image: westren4Img }
];

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lux-custom-select" ref={dropdownRef}>
      <div className={`lux-select-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span>{value}</span>
        <ChevronDown size={14} className={`select-chevron ${isOpen ? 'open' : ''}`} />
      </div>
      {isOpen && (
        <div className="lux-select-dropdown">
          {options.map((option) => (
            <div
              key={option}
              className={`lux-select-option ${value === option ? 'selected' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Wishlist = () => {
  const { wishlistItems, toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [addedToCart, setAddedToCart] = useState({});

  const handleCartClick = async (e, product) => {
    e.stopPropagation();
    if (addedToCart[product.id]) {
      navigate('/cart');
    } else {
      await handleFlyingCartAnimation(e);
      setAddedToCart(prev => ({ ...prev, [product.id]: true }));
      addToCart(product);
      message.success(`${product.title || 'Item'} added to cart!`);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('All Items');
  const [sortBy, setSortBy] = useState('Recently Added');

  // Apply filters and search
  let displayedItems = [...wishlistItems];

  if (searchTerm) {
    displayedItems = displayedItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  if (filterBy === 'In Stock') {
    // Mocking stock filter by checking price presence or you can just leave it as is if no stock data is present
    displayedItems = displayedItems.filter(item => item.price);
  }

  // Apply sorting
  if (sortBy === 'Price: Low to High') {
    displayedItems.sort((a, b) => {
      const priceA = parseFloat(a.price?.replace(/[^0-9.-]+/g, "")) || 0;
      const priceB = parseFloat(b.price?.replace(/[^0-9.-]+/g, "")) || 0;
      return priceA - priceB;
    });
  } else if (sortBy === 'Price: High to Low') {
    displayedItems.sort((a, b) => {
      const priceA = parseFloat(a.price?.replace(/[^0-9.-]+/g, "")) || 0;
      const priceB = parseFloat(b.price?.replace(/[^0-9.-]+/g, "")) || 0;
      return priceB - priceA;
    });
  }

  return (
    <div className="lux-wishlist-container">
      {/* Header Banner */}
      <div className="lux-wishlist-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="lux-banner-content">
          <h1 className="lux-banner-title">My Wishlist</h1>
          <h2 className="lux-banner-subtitle">Your Favorites, Always Within Reach</h2>
          <p className="lux-banner-desc">Save now. Shop whenever you're ready.</p>
          <button className="lux-btn-dark" onClick={() => navigate('/collection')}>
            Continue Shopping <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="lux-controls-wrapper">
        <div className="lux-controls-card">
          <div className="lux-controls-left">
            <div className="lux-controls-icon">
              <Heart size={24} fill="currentColor" />
            </div>
            <div className="lux-controls-title">
              <h3>{wishlistItems.length} Saved Items</h3>
              <p>Everything you love, all in one place.</p>
            </div>
          </div>
          <div className="lux-controls-right">
            <button className="lux-btn-dark" onClick={() => {
              if (wishlistItems.length > 0) {
                wishlistItems.forEach(item => addToCart(item));
                message.success({
                  content: 'All items moved to Cart!',
                  className: 'custom-class',
                  style: {
                    marginTop: '5vh',
                    color: '#0f5132',
                    backgroundColor: '#d1e7dd',
                    border: '1px solid #badbcc',
                    padding: '8px 16px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '14px'
                  },
                });
                setTimeout(() => {
                  navigate('/cart');
                }, 1000);
              } else {
                message.warning('Your wishlist is empty!');
              }
            }}>
              <ShoppingCart size={14} /> Move All to Cart
            </button>
            <button className="lux-btn-outline" onClick={() => navigate('/')}>
              <Home size={14} style={{ marginRight: '6px' }} /> Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="lux-filter-bar-container">
        <div className="lux-filter-bar">
          <div className="lux-search-box">
            <div className="search-icon-bg">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search Wishlist"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="lux-filter-divider"></div>

          <div className="lux-filter-center">
            <div className="lux-filter-item">
              <Filter size={16} className="filter-icon" />
              <span>Filter By</span>
              <CustomSelect
                value={filterBy}
                onChange={setFilterBy}
                options={['All Items', 'In Stock']}
              />
            </div>

            <div className="lux-filter-divider"></div>

            <div className="lux-filter-item">
              <ArrowUpDown size={16} className="filter-icon" />
              <span>Sort By</span>
              <CustomSelect
                value={sortBy}
                onChange={setSortBy}
                options={['Recently Added', 'Price: Low to High', 'Price: High to Low']}
              />
            </div>
          </div>

          <div className="lux-view-toggles" style={{ marginLeft: 'auto' }}>
            <button className={`lux-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}><Grid size={16} /></button>
            <button className={`lux-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><List size={16} /></button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="lux-main-content">
        {wishlistItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', background: '#fff', borderRadius: '12px', border: '1px solid #f0f0f0', marginBottom: '60px' }}>
            <Heart size={48} color="#ddd" style={{ marginBottom: '16px' }} />
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#222' }}>Your wishlist is empty</h3>
            <p style={{ color: '#777', margin: '0 0 24px 0' }}>Explore our collection and add your favorite items here.</p>
            <button className="lux-btn-dark" onClick={() => navigate('/collection')}>Explore Now</button>
          </div>
        ) : (
          <div className={`unified-products-grid ${viewMode === 'list' ? 'list-view' : 'sidebar-closed'}`} style={{ padding: 0, marginBottom: '80px' }}>
            {displayedItems.length === 0 ? (
              <div style={{ width: '100%', textAlign: 'center', padding: '40px 0', color: '#666', gridColumn: '1 / -1' }}>
                No items match your search or filter.
              </div>
            ) : displayedItems.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
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
                        <Star key={i} size={14} fill={i < (product.rating || 5) ? "#8f7a5b" : "#e0e0e0"} color={i < (product.rating || 5) ? "#8f7a5b" : "#e0e0e0"} />
                      ))}
                    </div>
                    <span className="unified-reviews">({product.reviews || '2.5k'})</span>
                  </div>

                  <div className="unified-card-price">
                    <span className="unified-price-new">{product.price}</span>
                    {product.originalPrice && <span className="unified-price-old">{product.originalPrice}</span>}
                  </div>

                  <button
                    className="unified-explore-btn"
                    onClick={(e) => handleCartClick(e, product)}
                  >
                    <ShoppingBag size={16} />
                    {addedToCart[product.id] ? "GO TO CART" : "ADD TO CART"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Recommended */}
        <div style={{ marginBottom: '40px' }}>
          <div className="lux-section-header">
            <h3 className="lux-section-title">Recommended for You</h3>
            <a href="#" className="lux-section-link">View All <ArrowRight size={14} /></a>
          </div>
          <div className="unified-products-grid">
            {recommended.slice(0, 4).map(item => (
              <div
                className="unified-product-card"
                key={item.id}
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
              >
                <div className="unified-card-image-wrap">
                  <button
                    className="unified-wishlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(item);
                    }}
                  >
                    <Heart
                      size={16}
                      fill={isInWishlist(item.id) ? "#ff4d4f" : "none"}
                      color={isInWishlist(item.id) ? "#ff4d4f" : "#555"}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                  </button>
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="unified-card-info">
                  <h3 className="unified-card-title">{item.title}</h3>

                  <div className="unified-card-rating">
                    <div className="unified-stars">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} size={14} fill={i < (item.rating || 5) ? "#8f7a5b" : "#e0e0e0"} color={i < (item.rating || 5) ? "#8f7a5b" : "#e0e0e0"} />
                      ))}
                    </div>
                    <span className="unified-reviews">({item.reviews || '1.2k'})</span>
                  </div>

                  <div className="unified-card-price">
                    <span className="unified-price-new">{item.price}</span>
                    {item.oldPrice && <span className="unified-price-old">{item.oldPrice}</span>}
                  </div>

                  <button
                    className="unified-explore-btn"
                    onClick={(e) => handleCartClick(e, item)}
                  >
                    <ShoppingBag size={16} />
                    {addedToCart[item.id] ? "GO TO CART" : "ADD TO CART"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Value Props */}
        <div className="lux-features">
          <div className="lux-feature-item">
            <div className="lux-feature-icon-wrapper">
              <Heart size={22} strokeWidth={1.5} className="lux-feature-icon" />
            </div>
            <div className="lux-feature-text">
              <h4>Save Favorites</h4>
              <p>Keep all your favorite items in one place.</p>
            </div>
          </div>
          <div className="lux-feature-item">
            <div className="lux-feature-icon-wrapper">
              <Bell size={22} strokeWidth={1.5} className="lux-feature-icon" />
            </div>
            <div className="lux-feature-text">
              <h4>Price Drop Alerts</h4>
              <p>Get notified when prices drop on saved items.</p>
            </div>
          </div>
          <div className="lux-feature-item">
            <div className="lux-feature-icon-wrapper">
              <Truck size={22} strokeWidth={1.5} className="lux-feature-icon" />
            </div>
            <div className="lux-feature-text">
              <h4>Fast Delivery</h4>
              <p>Enjoy quick and reliable delivery.</p>
            </div>
          </div>
          <div className="lux-feature-item">
            <div className="lux-feature-icon-wrapper">
              <ShieldCheck size={22} strokeWidth={1.5} className="lux-feature-icon" />
            </div>
            <div className="lux-feature-text">
              <h4>Secure Checkout</h4>
              <p>Shop with confidence and secure payments.</p>
            </div>
          </div>
          <div className="lux-feature-item">
            <div className="lux-feature-icon-wrapper">
              <Gift size={22} strokeWidth={1.5} className="lux-feature-icon" />
            </div>
            <div className="lux-feature-text">
              <h4>Exclusive Offers</h4>
              <p>Access special offers and member benefits.</p>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="lux-bottom-banner">
          <div className="lux-bb-left">
            <h2>Found something you love?</h2>
            <p>Add it to your cart and enjoy a seamless checkout experience.</p>
          </div>
          <div className="lux-bb-right">
            <button className="lux-btn-dark" onClick={() => navigate('/collection')}>Continue Shopping</button>
            <button className="lux-btn-outline" onClick={() => navigate('/cart')}><ShoppingCart size={14} /> View Cart</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wishlist;
