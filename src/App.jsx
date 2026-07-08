import React from 'react';
import { ShoppingBag, ShoppingCart, User } from 'lucide-react';

const products = [
  { id: 1, name: 'Premium Wireless Headphones', price: '$299.00' },
  { id: 2, name: 'Minimalist Smartwatch', price: '$199.00' },
  { id: 3, name: 'Mechanical Keyboard', price: '$149.00' },
  { id: 4, name: 'Ultra-thin Laptop Stand', price: '$49.00' }
];

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">Zecondz</div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">Categories</a>
        </div>
        <div className="nav-links" style={{ gap: '1.5rem' }}>
          <a href="#"><User size={20} /></a>
          <a href="#"><ShoppingCart size={20} /></a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <h1>Elevate Your Digital Lifestyle</h1>
          <p>Discover our curated collection of premium tech accessories designed for modern professionals who appreciate aesthetics and performance.</p>
          <button className="btn btn-primary">Shop Collection</button>
        </section>

        <section className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <ShoppingBag size={48} color="rgba(255,255,255,0.1)" />
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price">{product.price}</div>
                <button className="btn btn-secondary">Add to Cart</button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
