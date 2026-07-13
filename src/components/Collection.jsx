import React from 'react';
import './Collection.css';

const products = [
  {
    id: 1,
    title: 'Magna aliqua ut enim ad minim',
    price: '$199.99',
    originalPrice: '$249.99',
    rating: 4.5,
    reviews: 15,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Veniam quis nostrud exercitation',
    price: '$45.99',
    rating: 4,
    reviews: 21,
    badge: null,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Ullamco laboris nisi ut aliquip',
    price: '$69.99',
    rating: 4,
    reviews: 11,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Ex ea commodo consequat',
    price: '$159.99',
    rating: 5,
    reviews: 29,
    badge: null,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Duis aute irure dolor in',
    price: '$89.99',
    originalPrice: '$120.00',
    rating: 4.5,
    reviews: 42,
    badge: 'Sale',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Reprehenderit in voluptate',
    price: '$129.50',
    rating: 4,
    reviews: 18,
    badge: null,
    image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Velit esse cillum dolore',
    price: '$54.99',
    rating: 3.5,
    reviews: 8,
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=400&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Lorem ipsum dolor sit amet',
    price: '$75.00',
    originalPrice: '$95.00',
    rating: 4.5,
    reviews: 56,
    badge: null,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400&auto=format&fit=crop'
  }
];



export default function Collection() {
  return (
    <div className="store-container">
      <div className="store-grid">
        {products.map(product => (
          <div key={product.id} className="store-card">
            
            <div className="image-container">
              {product.badge && <span className="badge">{product.badge}</span>}
              <img src={product.image} alt={product.title} />
              
              <div className="hover-overlay">

                <div className="action-icons">
                  <button className="action-circle" aria-label="Wishlist">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  </button>
                  <button className="action-circle" aria-label="Quick View">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button className="action-circle" aria-label="Compare">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="card-details">
              <h3 className="card-title">{product.title}</h3>
              <div className="card-pricing">
                <span className="price-current">{product.price}</span>
                {product.originalPrice && (
                  <span className="price-old">{product.originalPrice}</span>
                )}
              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
