import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, Heart, Search, X, Star } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { useWishlist } from '../../context/WishlistContext';
import './SearchResults.css';
import { searchProductsApi } from '../../services/api';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialKeyword = searchParams.get('q') || '';

  const [keyword, setKeyword] = useState(initialKeyword);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (initialKeyword) params.append('q', initialKeyword);
        if (sortBy) params.append('sort', sortBy);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        
        const response = await searchProductsApi(params.toString());
        
        if (response.data && response.data.success) {
          setProducts(response.data.products || []);
          setTotalResults(response.data.total || 0);
        } else {
          setProducts([]);
          setTotalResults(0);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results");
        setProducts([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [initialKeyword, sortBy, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate("/search?q=" + encodeURIComponent(keyword));
    }
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
          {initialKeyword && (
            <p className="search-results-count">
              Showing {totalResults} results for <strong>"{initialKeyword}"</strong>
            </p>
          )}
        </div>
      </div>

      <div className="container">
        <div className="search-content-grid">
          {/* Main Content */}
          <div className="search-main-content">
            {/* Toolbar */}
            <div className="search-toolbar">
              <div className="toolbar-left">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-dropdown">
                  <option value="relevance">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="search-loading">
                <div className="spinner"></div>
                <p>Searching for products...</p>
              </div>
            ) : error ? (
              <div className="search-error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="btn-solid-brown">Try Again</button>
              </div>
            ) : products.length > 0 ? (
              <div className="results-grid">
                {products.map(product => (
                  <div key={product._id} className="result-card">
                    <div className="card-image">
                      <Link to={/product/ + product._id}>
                        <img 
                          src={product.images && product.images.length > 0 ? product.images[0].url : 'https://placehold.co/400x500'} 
                          alt={product.name} 
                        />
                      </Link>
                      <button className="wishlist-btn"><Heart size={18} /></button>
                      {product.discount > 0 && <span className="discount-badge">-{product.discount}%</span>}
                    </div>
                    <div className="card-details">
                      <p className="brand-name">{product.brand}</p>
                      <Link to={/product/ + product._id} className="product-name">{product.name}</Link>
                      <div className="price-row">
                        <span className="current-price">?{Math.round(product.price * (1 - (product.discount || 0) / 100))}</span>
                        {product.discount > 0 && <span className="original-price">?{product.price}</span>}
                      </div>
                      <div className="rating-row">
                        <span className="star">?</span>
                        <span className="rating-value">{product.rating}</span>
                        <span className="review-count">({product.numReviews})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  <Search size={48} />
                </div>
                <h2>No matches found</h2>
                <p>We couldn't find anything for "{initialKeyword}". Try checking your spelling or using more general terms.</p>
                <button onClick={() => navigate('/collections/all')} className="btn-outline-brown">Browse All Products</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
