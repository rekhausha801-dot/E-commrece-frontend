import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, Bell, ChevronDown, X, ShoppingCart, Shirt, Footprints, Watch } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import useDebounce from '../hooks/useDebounce';
import './Navbar.css';

const megaMenus = [
  { title: "Home", path: "/" },
  {
    title: "Men",
    path: "/category/men",
    categories: [
      { title: "Clothing", items: ["T-Shirts", "Shirts", "Polo T-Shirts", "Jeans", "Trousers", "Cargo Pants", "Hoodies", "Sweatshirts", "Jackets", "Blazers", "Ethnic Wear", "Innerwear"] },
      { title: "Footwear", items: ["Sneakers", "Casual Shoes", "Formal Shoes", "Sandals", "Sports Shoes"] },
      { title: "Accessories", items: ["Watches", "Wallets", "Belts", "Sunglasses", "Bags", "Caps"] }
    ]
  },
  {
    title: "Women",
    path: "/category/women",
    categories: [
      { title: "Clothing", items: ["Kurtis", "Sarees", "Dresses", "Tops", "Women T-Shirts", "Shirts", "Jeans", "Leggings", "Palazzo", "Co-ords", "Ethnic Sets"] },
      { title: "Accessories", items: ["Handbags", "Jewellery", "Watches", "Sunglasses", "Dupattas"] },
      { title: "Footwear", items: ["Heels", "Flats", "Sneakers", "Sandals", "Boots"] }
    ]
  },
  {
    title: "Kids",
    path: "/category/kids",
    categories: [
      { title: "Categories", items: ["Boys Clothing", "Girls Clothing", "Girls T-Shirts", "Baby Clothing", "Footwear", "Toys", "School Essentials", "Accessories", "Newborn Essentials"] }
    ]
  },
  {
    title: "Beauty",
    path: "/category/beauty",
    categories: [
      { title: "Categories", items: ["Makeup", "Skincare", "Haircare", "Fragrances", "Bath & Body", "Personal Care", "Men's Grooming", "Beauty Tools"] }
    ]
  },
  {
    title: "Home & Living",
    path: "/category/home-living",
    categories: [
      { title: "Categories", items: ["Bedsheets", "Curtains", "Cushions", "Blankets", "Kitchen Essentials", "Cookware", "Dinner Sets", "Storage", "Home Decor", "Wall Art", "Lighting", "Bathroom Accessories"] }
    ]
  }
];

const wishlistItems = ["My Wishlist", "Saved for Later", "Recently Wishlisted", "Price Drop Alerts", "Back in Stock", "Move to Cart", "Share Wishlist"];
const notificationItems = ["Order Updates", "Shipping Updates", "Delivered Orders", "Flash Sale Alerts", "Price Drop Notifications", "New Arrivals", "Exclusive Offers", "Coupons", "Back in Stock", "Reward Points"];
const accountItems = ["My Profile", "My Orders", "Wishlist", "Coupons", "Notifications", "Help Center", "Settings", "Logout"];

const getCategoryIcon = (title) => {
  const premiumProps = {
    size: 18,
    strokeWidth: 1.2,
    color: "#C89953" // Signature gold color
  };

  switch (title.toLowerCase()) {
    case 'clothing': return <Shirt {...premiumProps} />;
    case 'footwear': return <Footprints {...premiumProps} />;
    case 'accessories': return <Watch {...premiumProps} />;
    case 'categories': return <ShoppingBag {...premiumProps} />;
    default: return null;
  }
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const searchRef = useRef(null);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim().length >= 2) {
      setIsSearching(true);
      // Simulating API call for suggestions
      setTimeout(() => {
        setSuggestions([
          { type: 'product', name: debouncedSearchQuery + ' Premium T-Shirt', price: '₹499', img: 'https://placehold.co/40x40' },
          { type: 'product', name: 'Luxe ' + debouncedSearchQuery, price: '₹1299', img: 'https://placehold.co/40x40' },
          { type: 'category', name: debouncedSearchQuery + ' for Men' },
          { type: 'brand', name: 'Relie ' + debouncedSearchQuery }
        ]);
        setIsSearching(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchQuery]);

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + (item.qty || 1), 0);

  const { notifications = [], markAllAsRead } = useNotification() || {};
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const location = useLocation();
  const navigate = useNavigate();

  const executeSearch = (query) => {
    if (!query.trim()) return;
    setIsSearchOpen(false);
    
    const lowerQuery = query.toLowerCase().trim();
    
    // Direct category mapping for smart routing
    const routeMap = {
      'kurtis': '/collection',
      'kurti': '/collection',
      'shirts': '/category/shirts',
      'shirt': '/category/shirts',
      't-shirts': '/category/t-shirts',
      'tshirt': '/category/t-shirts',
      'tshirts': '/category/t-shirts',
      'jeans': '/category/jeans',
      'men': '/category/men',
      'women': '/category/women',
      'kids': '/category/kids-fashion',
      'western': '/western',
      'customization': '/category/women-t-shirts',
      'customize': '/category/women-t-shirts',
      
      // Universal Page Routing
      'cart': '/cart',
      'shopping cart': '/cart',
      'bag': '/cart',
      'wishlist': '/wishlist',
      'wish list': '/wishlist',
      'favorites': '/wishlist',
      'login': '/login',
      'log in': '/login',
      'signin': '/login',
      'sign in': '/login',
      'register': '/register',
      'signup': '/register',
      'sign up': '/register',
      'account': '/account/orders',
      'profile': '/account/orders',
      'orders': '/account/my-orders',
      'my orders': '/account/my-orders',
      'home': '/',
      'dashboard': '/dashboard',
      'support': '/account/support',
      'help': '/account/support',
      'contact': '/account/support',
      'coupons': '/coupons',
      'address': '/account/addresses',
      'addresses': '/account/addresses',
      'returns': '/account/returns'
    };

    if (routeMap[lowerQuery]) {
      navigate(routeMap[lowerQuery]);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      executeSearch(searchQuery);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const toggleExpand = (title) => {
    setExpandedMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    
    // Check auth status
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        const user = JSON.parse(userStr);
        setUserName(user.fullName || user.name || '');
      } catch (e) {}
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [location.pathname]);

  // Handle click outside for search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="premium-navbar-wrapper">
      <motion.header 
        className="premium-navbar"
        animate={{
          y: hidden ? -140 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="navbar-left">
          {/* Mobile Menu Button */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <Menu size={24} />
          </button>

          <Link to="/" className="navbar-brand">
            <div className="brand-icon-luxury" style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={28} strokeWidth={1.5} color="#C89953" />
            </div>
            <div className="brand-text-container">
              <span className="brand-text-luxury" style={{ letterSpacing: '2px', color: "#631F20", textTransform: 'uppercase' }}>R</span>
            </div>
          </Link>
        </div>


        <nav className="navbar-center desktop-only">
          <ul className="nav-menu">
            {megaMenus.map((item, index) => (
              <li key={index} className="nav-item has-mega-menu">
                {item.path && !item.categories ? (
                  <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                    {item.title} {item.categories && <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
                  </Link>
                ) : (
                  <span className="nav-link">
                    {item.title} {item.categories && <ChevronDown size={14} style={{ marginLeft: '4px' }} />}
                  </span>
                )}

                {item.categories && (
                  <div className="mega-menu">
                    <div className="mega-menu-content">
                      {item.categories.map((cat, idx) => (
                        <div key={idx} className="mega-menu-column">
                          <h4 className="mega-menu-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {getCategoryIcon(cat.title)}
                            {cat.title}
                          </h4>
                          <ul className="mega-menu-list">
                            {cat.items.map((subItem, sIdx) => (
                              <li key={sIdx}>
                                <Link to={`/category/${subItem.toLowerCase().replace(/\s+/g, '-')}`}>{subItem}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>


        <div className="navbar-right">

          <div className="action-icons">
            {/* Search Icon Expanding */}
            <div className={`search-expand-wrapper desktop-only ${isSearchOpen ? 'open' : ''}`} ref={searchRef}>
              <div className="icon-btn search-trigger" onClick={() => setIsSearchOpen(true)}>
                <div className="icon-badge-wrapper">
                  <Search size={22} />
                </div>
                <span className="icon-label">Search</span>
              </div>

              <div className="search-input-expanded">
                <div className="search-input-container">
                  {!searchQuery && (
                    <div className="search-scrolling-placeholder">
                      <div className="scrolling-text-track">
                        <span>Search "Luxe Watches"</span>
                        <span>Flat 50% Off on Ethnic Wear</span>
                        <span>Search "Summer Collection"</span>
                        <span>Get 20% Cashback on Shoes</span>
                        <span>Search "Luxe Watches"</span>
                      </div>
                    </div>
                  )}
                  <input
                    type="text"
                    autoFocus={isSearchOpen}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchSubmit}
                    className={!searchQuery ? 'hide-placeholder' : ''}
                  />
                </div>
                <div className={`search-actions-wrapper ${searchQuery ? 'has-text' : 'is-empty'}`}>
                  <Search
                    size={18}
                    className="search-icon-expanded"
                    onClick={() => {
                      executeSearch(searchQuery);
                    }}
                    style={{ cursor: 'pointer' }}
                  />
                  <button className="close-search-btn" onClick={(e) => {
                    e.stopPropagation();
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}>
                    <X size={16} />
                  </button>
                </div>
                
                {/* Search Suggestions Dropdown */}
                {searchQuery.trim().length >= 2 && isSearchOpen && (
                  <div className="search-suggestions-dropdown">
                    {isSearching ? (
                      <div className="suggestions-loading">
                        <div className="spinner"></div> Searching...
                      </div>
                    ) : suggestions.length > 0 ? (
                      <div className="suggestions-content">
                        <div className="suggestion-section">
                          <h4>Products</h4>
                          {suggestions.filter(s => s.type === 'product').map((item, i) => (
                            <div key={i} className="suggestion-item product-suggestion" onClick={() => { setIsSearchOpen(false); navigate(`/search?q=${encodeURIComponent(item.name)}`); }}>
                              <img src={item.img} alt={item.name} />
                              <div className="suggestion-details">
                                <span className="suggestion-name">{item.name}</span>
                                <span className="suggestion-price">{item.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="suggestion-section inline-suggestions">
                          <div className="half-section">
                            <h4>Categories</h4>
                            {suggestions.filter(s => s.type === 'category').map((item, i) => (
                              <div key={i} className="suggestion-item text-suggestion" onClick={() => { setIsSearchOpen(false); navigate(`/search?category=${encodeURIComponent(item.name)}`); }}>
                                <Search size={14} /> {item.name}
                              </div>
                            ))}
                          </div>
                          <div className="half-section">
                            <h4>Brands</h4>
                            {suggestions.filter(s => s.type === 'brand').map((item, i) => (
                              <div key={i} className="suggestion-item text-suggestion" onClick={() => { setIsSearchOpen(false); navigate(`/search?brand=${encodeURIComponent(item.name)}`); }}>
                                <Search size={14} /> {item.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-suggestions">No results found for "{searchQuery}"</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Search Icon */}
            <button className="icon-btn mobile-only">
              <Search size={22} />
            </button>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="icon-btn action-item desktop-only" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="icon-badge-wrapper">
                <Heart
                  size={22}
                  fill={location.pathname === '/wishlist' ? '#ff4d4f' : 'none'}
                  color={location.pathname === '/wishlist' ? '#ff4d4f' : 'currentColor'}
                />
              </div>
              <span className="icon-label">Wishlist</span>
            </Link>

            {/* Notifications Link */}
            <Link 
              to="/account/notifications"
              className="icon-btn action-item desktop-only"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="icon-badge-wrapper">
                <Bell size={22} />
                {unreadNotificationCount > 0 && <span className="nav-alert-badge">{unreadNotificationCount}</span>}
              </div>
              <span className="icon-label">Alerts</span>
            </Link>

            {/* Cart Link */}
            <Link to="/cart" className="icon-btn action-item" style={{ textDecoration: 'none', color: 'inherit' }} id="navbar-cart-icon">
              <div className="icon-badge-wrapper" id="navbar-cart-badge">
                <ShoppingBag size={22} />
                {cartCount > 0 && <span className="nav-alert-badge cart-badge">{cartCount}</span>}
              </div>
              <span className="icon-label">Cart</span>
            </Link>

            {/* My Account Dropdown */}
            <div className="icon-btn action-item has-dropdown desktop-only">
              <div className="icon-badge-wrapper">
                <User size={22} />
              </div>
              <span className="icon-label" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>Account <ChevronDown size={12} /></span>
              <div className="dropdown-menu standard-dropdown account-advanced-dropdown">
                <div className="dropdown-welcome-section">
                  <h4 className="welcome-title">{isLoggedIn ? `Welcome, ${userName}` : "Welcome"}</h4>
                  <p className="welcome-subtitle">To access account and manage orders</p>
                  {!isLoggedIn && (
                    <Link to="/login" className="welcome-login-btn">LOGIN / SIGNUP</Link>
                  )}
                </div>
                <div className="dropdown-divider"></div>
                <ul className="dropdown-list two-columns">
                  {(isLoggedIn ? accountItems : accountItems.filter(item => item !== "Logout")).map((item, idx) => (
                    <li key={idx}>
                      {item === "Logout" ? (
                        <a href="/" onClick={handleLogout}>{item}</a>
                      ) : (
                        <Link to={item === "Wishlist" ? "/wishlist" : item === "Coupons" ? "/coupons" : item === "My Profile" ? "/account/profile" : item === "Help Center" ? "/account/support" : `/account/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>
      <aside className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="navbar-brand">
            <div className="brand-icon-luxury" style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={24} strokeWidth={1.5} color="#C89953" />
            </div>
            <span className="brand-text-luxury">Relie shop</span>
          </Link>
          <button className="close-sidebar" onClick={toggleMobileMenu}>
            <X size={24} />
          </button>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {megaMenus.map((item, index) => (
              <li key={index} className="sidebar-item">
                <div className="sidebar-item-header" onClick={() => item.categories ? toggleExpand(item.title) : null}>
                  {item.path && !item.categories ? (
                    <Link to={item.path}>{item.title}</Link>
                  ) : (
                    <span>{item.title}</span>
                  )}
                  {item.categories && (
                    <ChevronDown className={`expand-icon ${expandedMenus[item.title] ? 'rotated' : ''}`} size={18} />
                  )}
                </div>
                {item.categories && (
                  <div className={`sidebar-sub-menu-container ${expandedMenus[item.title] ? 'expanded' : ''}`}>
                    {item.categories.map((cat, idx) => (
                      <div key={idx} className="sidebar-sub-category">
                        <h5 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: '600' }}>
                          {getCategoryIcon(cat.title)}
                          {cat.title}
                        </h5>
                        <ul>
                          {cat.items.map((subItem, sIdx) => (
                            <li key={sIdx}>
                              <Link to={`/category/${subItem.toLowerCase().replace(/\s+/g, '-')}`}>{subItem}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
            <div className="sidebar-divider"></div>
            <li className="sidebar-item"><Link to="/account/orders"><User size={18} /> My Account</Link></li>
            <li className="sidebar-item"><Link to="/wishlist"><Heart size={18} /> Wishlist</Link></li>
            <li className="sidebar-item"><Link to="/account/notifications"><Bell size={18} /> Notifications</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
