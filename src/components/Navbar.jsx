import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, Bell, ChevronDown, X, ShoppingCart } from 'lucide-react';
import './Navbar.css';

const megaMenus = [
  { title: "Home", path: "/" },
  {
    title: "Men",
    categories: [
      { title: "Clothing", items: ["T-Shirts", "Shirts", "Polo T-Shirts", "Jeans", "Trousers", "Cargo Pants", "Hoodies", "Sweatshirts", "Jackets", "Blazers", "Ethnic Wear", "Innerwear"] },
      { title: "Footwear", items: ["Sneakers", "Casual Shoes", "Formal Shoes", "Sandals", "Sports Shoes"] },
      { title: "Accessories", items: ["Watches", "Wallets", "Belts", "Sunglasses", "Bags", "Caps"] }
    ]
  },
  {
    title: "Women",
    categories: [
      { title: "Clothing", items: ["Kurtis", "Sarees", "Dresses", "Tops", "T-Shirts", "Shirts", "Jeans", "Leggings", "Palazzo", "Co-ords", "Ethnic Sets"] },
      { title: "Accessories", items: ["Handbags", "Jewellery", "Watches", "Sunglasses", "Dupattas"] },
      { title: "Footwear", items: ["Heels", "Flats", "Sneakers", "Sandals", "Boots"] }
    ]
  },
  {
    title: "Kids",
    categories: [
      { title: "Categories", items: ["Boys Clothing", "Girls Clothing", "Baby Clothing", "Footwear", "Toys", "School Essentials", "Accessories", "Newborn Essentials"] }
    ]
  },
  {
    title: "Beauty",
    categories: [
      { title: "Categories", items: ["Makeup", "Skincare", "Haircare", "Fragrances", "Bath & Body", "Personal Care", "Men's Grooming", "Beauty Tools"] }
    ]
  },
  {
    title: "Home & Living",
    categories: [
      { title: "Categories", items: ["Bedsheets", "Curtains", "Cushions", "Blankets", "Kitchen Essentials", "Cookware", "Dinner Sets", "Storage", "Home Decor", "Wall Art", "Lighting", "Bathroom Accessories"] }
    ]
  }
];

const wishlistItems = ["My Wishlist", "Saved for Later", "Recently Wishlisted", "Price Drop Alerts", "Back in Stock", "Move to Cart", "Share Wishlist"];
const notificationItems = ["Order Updates", "Shipping Updates", "Delivered Orders", "Flash Sale Alerts", "Price Drop Notifications", "New Arrivals", "Exclusive Offers", "Coupons", "Back in Stock", "Reward Points"];
const accountItems = ["My Profile", "My Orders", "Track Order", "Wishlist", "Saved Addresses", "Payment Methods", "Wallet", "Gift Cards", "Coupons", "Reward Points", "Returns & Refunds", "Notifications", "Help Center", "Customer Support", "Settings", "Logout"];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate('/collection');
    }
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
      <header className="premium-navbar">
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
               <span className="brand-text-luxury" style={{ letterSpacing: '2px',color:"#631F20",textTransform: 'uppercase'}}>R</span>
            </div>
          </Link>
        </div>

        
        <nav className="navbar-center desktop-only">
          <ul className="nav-menu">
            {megaMenus.map((item, index) => (
              <li key={index} className="nav-item has-mega-menu">
                {item.path ? (
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
                          <h4 className="mega-menu-title">{cat.title}</h4>
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
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  autoFocus={isSearchOpen}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />
                <Search size={18} className="search-icon-expanded" />
                <button className="close-search-btn" onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen(false);
                }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Search Icon */}
            <button className="icon-btn mobile-only">
              <Search size={22} />
            </button>

            {/* Wishlist Link */}
            <Link to="/wishlist" className="icon-btn action-item desktop-only" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="icon-badge-wrapper">
                <Heart size={22} />
              </div>
              <span className="icon-label">Wishlist</span>
            </Link>

            {/* Notifications Dropdown */}
            <div className="icon-btn action-item has-dropdown desktop-only">
              <div className="icon-badge-wrapper">
                <Bell size={22} />
                <span className="nav-alert-badge">3</span>
              </div>
              <span className="icon-label">Alerts</span>
              <div className="dropdown-menu standard-dropdown">
                <div className="dropdown-header">Notifications</div>
                <ul className="dropdown-list">
                  {notificationItems.map((item, idx) => (
                    <li key={idx}><Link to="/notifications">{item}</Link></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Cart Link */}
            <Link to="/cart" className="icon-btn action-item" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="icon-badge-wrapper">
                <ShoppingBag size={22} />
                <span className="nav-alert-badge cart-badge">2</span>
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
                <div className="dropdown-header">My Account</div>
                <ul className="dropdown-list two-columns">
                  {accountItems.map((item, idx) => (
                    <li key={idx}>
                      <Link to={item === "Logout" ? "/" : item === "Wishlist" ? "/wishlist" : `/account/${item.toLowerCase().replace(/\s+/g, '-')}`}>{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

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
                  {item.path ? (
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
                        <h5>{cat.title}</h5>
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
            <li className="sidebar-item"><Link to="/account/profile"><User size={18} /> My Account</Link></li>
            <li className="sidebar-item"><Link to="/wishlist"><Heart size={18} /> Wishlist</Link></li>
            <li className="sidebar-item"><Link to="/notifications"><Bell size={18} /> Notifications</Link></li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
