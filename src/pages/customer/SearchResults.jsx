import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Filter, ChevronDown, Heart, Search, X } from 'lucide-react';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialKeyword = searchParams.get('q') || '';
  
  const [keyword, setKeyword] = useState(initialKeyword);
  const [products, setProducts] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  // Use a hardcoded API endpoint to match the backend structure we're assuming
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Construct query URL
        const params = new URLSearchParams();
        if (keyword) params.append('q', keyword);
        if (sortBy) params.append('sort', sortBy);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        
        // Fetch from the backend we defined
        const response = await fetch(`${API_URL}/products/search?${params.toString()}`);
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products || []);
          setTotalResults(data.total || 0);
        } else {
          // If the backend isn't ready or returns success false, show dummy data to demonstrate UI
          setProducts(getDummyData(keyword));
          setTotalResults(getDummyData(keyword).length);
        }
      } catch (err) {
        console.error("Error fetching search results:", err);
        // Fallback to dummy data if API fails to show premium UI
        setProducts(getDummyData(keyword));
        setTotalResults(getDummyData(keyword).length);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [location.search, sortBy, selectedCategory]); // Re-run when query or filters change

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  // Premium UI dummy data generator for demonstration
  const getDummyData = (q) => {
    const query = q.toLowerCase();
    const allProducts = [
      { _id: '1', name: 'Premium Embroidered Kurti', brand: 'Relie Luxe', price: 1299, discount: 20, rating: 4.5, numReviews: 120, images: [{url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}], category: 'Women' },
      { _id: '2', name: 'Classic Fit Formal Shirt', brand: 'Relie Men', price: 999, discount: 10, rating: 4.2, numReviews: 85, images: [{url: 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}], category: 'Men' },
      { _id: '3', name: 'Floral Summer Dress', brand: 'Relie Trend', price: 1499, discount: 30, rating: 4.8, numReviews: 210, images: [{url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}], category: 'Women' },
      { _id: '4', name: 'Slim Fit Denim Jeans', brand: 'Relie Denim', price: 1899, discount: 15, rating: 4.0, numReviews: 65, images: [{url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}], category: 'Men' },
      { _id: '5', name: 'Designer Wedding Saree', brand: 'Relie Heritage', price: 5999, discount: 5, rating: 4.9, numReviews: 45, images: [{url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}], category: 'Women' },
      { _id: '6', name: 'Casual Cotton T-Shirt', brand: 'Relie Basic', price: 499, discount: 0, rating: 4.1, numReviews: 320, images: [{url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}], category: 'Men' }
    ];
    
    if (!query) return allProducts;
    return allProducts.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
  };

  return (
    <div className="search-results-page">
      <div className="search-header-banner">
        <div className="container">
          <h1>Search Results</h1>
          <form className="search-page-form" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search for products, brands & categories..."
            />
            <button type="submit" className="search-page-btn"><Search size={20} /></button>
          </form>
          {initialKeyword && (
            <p className="search-results-count">
              Showing <span>{totalResults}</span> results for <strong>"{initialKeyword}"</strong>
            </p>
          )}
        </div>
      </div>

      <div className="container search-layout">
        {/* Sidebar Filters */}
        <aside className="search-sidebar">
          <div className="filter-header">
            <h3><Filter size={18} /> Filters</h3>
            <button className="clear-filters">Clear All</button>
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
                    onChange={() => setSelectedCategory(cat.toLowerCase())}
                  />
                  <span className="checkmark"></span>
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price Range <ChevronDown size={16} /></h4>
            <div className="price-slider-container">
              <input type="range" min="0" max="10000" className="price-slider" />
              <div className="price-inputs">
                <span>₹0</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h4>Brands <ChevronDown size={16} /></h4>
            <div className="filter-options">
              {['Relie Luxe', 'Relie Men', 'Relie Trend', 'Relie Denim'].map(brand => (
                <label key={brand} className="custom-checkbox">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  {brand}
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

          {isLoading ? (
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
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="premium-product-card">
                  <div className="product-image-container">
                    <img src={product.images?.[0]?.url || 'https://placehold.co/300x400'} alt={product.name} />
                    {product.discount > 0 && <div className="discount-badge">{product.discount}% OFF</div>}
                    <button className="wishlist-btn"><Heart size={18} /></button>
                    <div className="quick-view-overlay">
                      <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                  </div>
                  <div className="product-details">
                    <span className="product-brand">{product.brand}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      <span className="stars">{'★'.repeat(Math.round(product.rating))}</span>
                      <span className="reviews-count">({product.numReviews})</span>
                    </div>
                    <div className="product-price-row">
                      <span className="current-price">₹{product.price}</span>
                      {product.discount > 0 && (
                        <span className="original-price">₹{Math.round(product.price / (1 - product.discount/100))}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon"><Search size={48} /></div>
              <h2>No Results Found</h2>
              <p>We couldn't find any matches for "{initialKeyword}".</p>
              <button className="continue-shopping-btn" onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
