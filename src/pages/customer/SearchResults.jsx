import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, Heart, Search, X, Star } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useWishlist } from '../../context/WishlistContext';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialKeyword = searchParams.get('q') || '';

  const [keyword, setKeyword] = useState(initialKeyword);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get all real products from context
  const { products: allProducts, loading } = useProducts();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist() || {};

  // Sync keyword when URL changes
  useEffect(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const isWishlisted = (id) => wishlistItems?.some(item => (item._id || item.id) === id);

  const handleWishlistToggle = (product) => {
    if (!addToWishlist || !removeFromWishlist) return;
    if (isWishlisted(product._id || product.id)) {
      removeFromWishlist(product._id || product.id);
    } else {
      addToWishlist(product);
    }
  };

  // Filter logic
  const filteredProducts = useMemo(() => {
    let base = [];

    if (initialKeyword.trim()) {
      // When searching: search across ALL products
      const q = initialKeyword.toLowerCase();
      base = allProducts.filter(p =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.subCategory?.toLowerCase().includes(q)
      );
    } else {
      // No search query: show products tagged as 'Search' display section
      base = allProducts.filter(p =>
        p.displaySection === 'Search' || p.display_section === 'Search'
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      base = base.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        base = [...base].sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        base = [...base].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'newest':
        base = [...base].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
      case 'rating':
        base = [...base].sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        base = [...base].sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0));
        break;
      default:
        break; // relevance: keep original order
    }

    return base;
  }, [allProducts, initialKeyword, sortBy, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const getDiscountedPrice = (price, discount) => {
    if (!discount) return null;
    return Math.round(price / (1 - discount / 100));
  };

  const getProductImage = (product) => {
    return product.images?.[0]?.url || product.images?.[0] || 'https://placehold.co/300x400/f3ece4/a07d4b?text=No+Image';
  };

  return (
    <div className="search-results-page">
      {/* Header */}
      <div className="search-header-banner">
        <div className="container">
          <h1>{initialKeyword ? 'Search Results' : 'All Products'}</h1>
          <form className="search-page-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for products, brands & categories..."
            />
            {keyword && (
              <button type="button" className="clear-search-btn" onClick={() => { setKeyword(''); navigate('/search'); }}>
                <X size={16} />
              </button>
            )}
            <button type="submit" className="search-page-btn"><Search size={20} /></button>
          </form>
          <p className="search-results-count">
            {loading ? 'Loading...' : (
              initialKeyword
                ? <>Showing <span>{filteredProducts.length}</span> results for <strong>"{initialKeyword}"</strong></>
                : <>Showing <span>{filteredProducts.length}</span> products</>
            )}
          </p>
        </div>
      </div>

      <div className="container search-layout">
        {/* Sidebar Filters */}
        <aside className="search-sidebar">
          <div className="filter-header">
            <h3><Filter size={18} /> Filters</h3>
            <button className="clear-filters" onClick={() => { setSelectedCategory('all'); setSortBy('relevance'); }}>Clear All</button>
          </div>

          <div className="filter-group">
            <h4>Categories <ChevronDown size={16} /></h4>
            <div className="filter-options">
              {['All', 'Men', 'Women', 'Kids', 'Accessories', 'Footwear'].map(cat => (
                <label key={cat} className="custom-checkbox">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory.toLowerCase() === cat.toLowerCase()}
                    onChange={() => setSelectedCategory(cat.toLowerCase() === 'all' ? 'all' : cat)}
                  />
                  <span className="checkmark"></span>
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Sort By <ChevronDown size={16} /></h4>
            <div className="filter-options">
              {[
                { value: 'relevance', label: 'Relevance' },
                { value: 'popularity', label: 'Popularity' },
                { value: 'newest', label: 'Newest First' },
                { value: 'price_asc', label: 'Price: Low to High' },
                { value: 'price_desc', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' },
              ].map(opt => (
                <label key={opt.value} className="custom-checkbox">
                  <input
                    type="radio"
                    name="sort"
                    checked={sortBy === opt.value}
                    onChange={() => setSortBy(opt.value)}
                  />
                  <span className="checkmark"></span>
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="search-main-content">
          <div className="results-toolbar">
            <div className="toolbar-left">
              <span className="mobile-filter-btn"><Filter size={18} /> Filter</span>
              <span style={{ fontSize: '13px', color: '#666' }}>{filteredProducts.length} items</span>
            </div>
            <div className="toolbar-right">
              <span className="sort-label">Sort by:</span>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="relevance">Relevance</option>
                <option value="popularity">Popularity</option>
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="product-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-text short"></div>
                  <div className="skeleton-text long"></div>
                  <div className="skeleton-text price"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => {
                const pid = product._id || product.id;
                const price = product.price || 0;
                const discount = product.discount || 0;
                const originalPrice = discount > 0 ? getDiscountedPrice(price, discount) : null;
                const wishlisted = isWishlisted(pid);

                return (
                  <div key={pid} className="premium-product-card" onClick={() => navigate(`/product/${pid}`)} style={{ cursor: 'pointer' }}>
                    <div className="product-image-container">
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        onError={e => { e.target.src = 'https://placehold.co/300x400/f3ece4/a07d4b?text=No+Image'; }}
                      />
                      {discount > 0 && <div className="discount-badge">{discount}% OFF</div>}
                      <button
                        className="wishlist-btn"
                        style={{ color: wishlisted ? '#ff4d4f' : '#888' }}
                        onClick={e => { e.stopPropagation(); handleWishlistToggle(product); }}
                      >
                        <Heart size={18} fill={wishlisted ? '#ff4d4f' : 'none'} />
                      </button>
                      <div className="quick-view-overlay">
                        <button className="add-to-cart-btn" onClick={e => { e.stopPropagation(); navigate(`/product/${pid}`); }}>
                          View Product
                        </button>
                      </div>
                    </div>
                    <div className="product-details">
                      {product.brand && <span className="product-brand">{product.brand}</span>}
                      <h3 className="product-name">{product.name}</h3>
                      {product.rating > 0 && (
                        <div className="product-rating">
                          <span className="stars">{'★'.repeat(Math.round(product.rating))}</span>
                          {product.numReviews > 0 && <span className="reviews-count">({product.numReviews})</span>}
                        </div>
                      )}
                      <div className="product-price-row">
                        <span className="current-price">₹{price.toLocaleString('en-IN')}</span>
                        {originalPrice && (
                          <span className="original-price">₹{originalPrice.toLocaleString('en-IN')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><Search size={48} /></div>
              <h2>{initialKeyword ? 'No Results Found' : 'No Products Available'}</h2>
              <p>
                {initialKeyword
                  ? `We couldn't find any matches for "${initialKeyword}". Try different keywords.`
                  : 'No products have been added to the Search section yet.'}
              </p>
              <button className="continue-shopping-btn" onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
