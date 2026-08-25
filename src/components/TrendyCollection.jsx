import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, stagger, inView, motion } from 'framer-motion';
import { message } from 'antd';
import { FaFire, FaStar, FaRegStar, FaStarHalfAlt, FaRegHeart, FaHeart, FaTag, FaMagic, FaShoppingBag, FaTshirt, FaPalette, FaArrowRight, FaLeaf, FaShoePrints } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import './TrendyCollection.css';

import dressImg from '../assets/images/dress.jpg';
import poloImg from '../assets/images/polo.jpg';
import cargoImg from '../assets/images/cargo.jpg';
import sneakerImg from '../assets/images/sneaker.jpg';
import jordanImg from '../assets/images/shoe-jordan.jpg';



function CountdownTimer({ targetDateStr, stockLimit, productId, onExpire }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!targetDateStr) return;
    const targetDate = new Date(targetDateStr).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (stockLimit <= 0) {
        setTimeLeft('Sold Out');
        return false;
      } else if (distance < 0) {
        setTimeLeft('00h : 00m : 00s');
        if (onExpire && productId) {
          setTimeout(() => onExpire(productId), 2000);
        }
        return false;
      } else {
        const totalHours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${totalHours.toString().padStart(2, '0')}h : ${minutes.toString().padStart(2, '0')}m : ${seconds.toString().padStart(2, '0')}s`);
        return true;
      }
    };

    if (!calculateTime()) return;

    const interval = setInterval(() => {
      if (!calculateTime()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr, stockLimit, productId, onExpire]);

  return <span style={{ fontSize: '11px', fontWeight: 'bold' }}>{timeLeft || 'Calculating...'}</span>;
}

function StarRating({ rating, reviews }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} className="star star-full" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="star star-half" />);
    } else {
      stars.push(<FaRegStar key={i} className="star star-empty" />);
    }
  }
  return (
    <div className="rating-row">
      <span className="stars">{stars}</span>
      <span className="review-count">({reviews})</span>
    </div>
  );
}

function FeatureIcon({ name }) {
  switch (name) {
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="1" y="6" width="14" height="11" rx="1.5" />
          <path d="M15 10h4l3 3.5V17h-7z" />
          <circle cx="6" cy="19" r="1.6" />
          <circle cx="17.5" cy="19" r="1.6" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12a9 9 0 0115.4-6.4L21 8" />
          <path d="M21 3v5h-5" />
          <path d="M21 12a9 9 0 01-15.4 6.4L3 16" />
          <path d="M3 21v-5h5" />
        </svg>
      );
    case 'headset':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 13v-1a8 8 0 0116 0v1" />
          <rect x="2.5" y="13" width="4" height="6" rx="1.5" />
          <rect x="17.5" y="13" width="4" height="6" rx="1.5" />
          <path d="M20 19v.5a3 3 0 01-3 3h-3" />
        </svg>
      );
    default:
      return null;
  }
}

const TrendyCollection = () => {
  const [likedIds, setLikedIds] = useState([]);
  const { cartItems, addToCart } = useCart();
  const { products, loading } = useProducts();
  const navigate = useNavigate();

  const handleCartClick = async (e, product) => {
    e.stopPropagation();

    // Check global cart state
    const isAdded = cartItems.some(item => item.id === product.id);

    if (isAdded) {
      navigate('/cart');
      return;
    }

    const button = e.currentTarget;
    const card = button.closest('.unified-product-card');
    const img = card ? card.querySelector('img') : null;
    const basket = document.getElementById('navbar-cart-badge');

    if (img && basket) {
      // Temporarily disable the button to prevent spamming
      button.disabled = true;

      const from = img.getBoundingClientRect();
      const to = basket.getBoundingClientRect();

      // Create a flying clone of the image
      const clone = img.cloneNode(true);
      clone.style.position = 'fixed';
      clone.style.top = `${from.top}px`;
      clone.style.left = `${from.left}px`;
      clone.style.width = `${from.width}px`;
      clone.style.height = `${from.height}px`;
      clone.style.borderRadius = '12px';
      clone.style.zIndex = '999999';
      clone.style.pointerEvents = 'none';
      clone.style.objectFit = 'cover';
      clone.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
      document.body.appendChild(clone);

      const dx = to.left + to.width / 2 - (from.left + from.width / 2);
      const dy = to.top + to.height / 2 - (from.top + from.height / 2);

      const FLY_SCALE = to.width / from.width;
      const duration = 0.55;

      // Create a ring element on the basket for the ripple effect
      const ring = document.createElement('div');
      ring.style.position = 'absolute';
      ring.style.inset = '-4px';
      ring.style.border = '2px solid #C89953';
      ring.style.borderRadius = '50%';
      ring.style.opacity = '0';
      ring.style.pointerEvents = 'none';
      ring.style.zIndex = '0';
      if (basket.style.position !== 'absolute') basket.style.position = 'relative';
      basket.appendChild(ring);

      // Animate button press
      animate(button, { scale: [1, 0.95, 1] }, { duration: 0.2 });

      // Simulate a beautiful parabolic arc by mixing linear X with ease-in Y
      await Promise.all([
        animate(clone, { x: dx }, { duration, ease: "linear" }),
        animate(clone, { y: dy, scale: FLY_SCALE, opacity: [1, 1, 0] }, { duration, ease: "easeIn" })
      ]);

      // Remove the flying clone
      clone.remove();

      // Knock the basket with a spring bounce
      animate(basket, { y: [0, 6, -3, 0], scale: [1, 0.9, 1.1, 1] }, { type: "spring", stiffness: 400, damping: 10 });

      // Ripple the ring out
      animate(ring, { scale: [1, 2.5], opacity: [0.8, 0] }, { duration: 0.5, ease: "easeOut" }).then(() => ring.remove());

      button.disabled = false;
    }

    addToCart(product);
    message.success(`${product.title || 'Product'} added to cart!`);
  };

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getDisplayedProducts = () => {
    if (!products || products.length === 0) return [];

    let filteredProducts = products.filter(p => p.homeSection === 'Trending');

    return filteredProducts.slice(0, 4).map(p => {
      const rawPrice = Number(String(p.price || 0).replace(/[^0-9.-]+/g, "")) || 0;
      const rawDiscount = Number(String(p.discount || 0).replace(/[^0-9.-]+/g, "")) || 0;

      let price = rawPrice - (p.discountType === 'Fixed' ? rawDiscount : ((rawPrice * rawDiscount) / 100));
      if (p.homeSection === 'Limited Offers' && p.limitedOfferDetails?.offerPrice) {
        price = Number(String(p.limitedOfferDetails.offerPrice || 0).replace(/[^0-9.-]+/g, "")) || 0;
      }

      return {
        id: p._id || p.id,
        image: (Array.isArray(p.images) && p.images.length > 0) ? (p.images[0]?.url || (typeof p.images[0] === 'string' ? p.images[0] : null)) : (typeof p.images === 'string' ? p.images : (p.image || "https://pngimg.com/uploads/box/box_PNG8.png")),
        title: p.name || p.title,
        price: `₹${Math.round(price)}`,
        originalPrice: rawPrice > 0 ? `₹${rawPrice}` : null,
        discount: rawDiscount > 0 ? (p.discountType === 'Percentage' ? `${rawDiscount}% OFF` : `₹${rawDiscount} OFF`) : null,
        rating: p.rating || 0,
        reviews: p.numReviews || 0,
        badge: p.badge || (p.discount > 0 ? 'SALE' : null),
        timer: (p.homeSection === 'Limited Offers' || String(p.isLimitedOffer) === 'true') ? (p.limitedOfferEndDate || p.limitedOfferDetails?.endDate) : null,
        stockLimit: p.limitedOfferDetails?.stockLimit !== undefined ? p.limitedOfferDetails.stockLimit : (p.countInStock ?? 999),
        countInStock: p.countInStock || 0,
        category: p.category?.name || p.category || 'Uncategorized',
        _backendData: p
      };
    });
  };

  const displayedProducts = getDisplayedProducts();

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading trendy collections...</div>;
  }



  return (
    <section className="trendy-section">


      <div className="trendy-header">
        <div className="trendy-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-icon"><FaFire /></span>
          <span>TRENDING NOW</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="trendy-title">
          Trending <span className="trendy-title-accent">Collections</span>
        </h2>
      </div>

      <div className="unified-products-grid" style={{ marginTop: '30px', marginBottom: '10px' }}>
        {displayedProducts.length > 0 ? displayedProducts.map((product) => (
          <motion.div
            className="unified-product-card"
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            style={{ cursor: 'pointer' }}
          >
            <div className="unified-card-image-wrap">
              <button
                className="unified-wishlist-btn"
                onClick={(e) => toggleLike(e, product.id)}
                aria-label="Add to wishlist"
              >
                {likedIds.includes(product.id) ? <FaHeart color="#ff4d4f" /> : <FaRegHeart color="#555" />}
              </button>
              <img src={product.image} alt={product.title} />
              {(product.stockLimit <= 0 || product.countInStock <= 0) && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(255,255,255,0.6)', zIndex: 3,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{
                    background: '#dc2626', color: '#fff', padding: '8px 16px',
                    fontWeight: 'bold', fontSize: '14px', borderRadius: '4px', letterSpacing: '1px'
                  }}>SOLD OUT</span>
                </div>
              )}
              {product.timer && (
                <div className="unified-timer-pill" style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  backgroundColor: '#fcecdb',
                  color: '#d36a44',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  zIndex: 2
                }}>
                  <CountdownTimer targetDateStr={product.timer} stockLimit={product.stockLimit} />
                </div>
              )}
            </div>

            <div className="unified-card-info">
              <h3 className="unified-card-title">
                {product.title}
              </h3>

              <div className="unified-card-rating">
                <div className="unified-stars">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <FaStar key={i} size={14} color={i < Math.floor(product.rating) ? "#8f7a5b" : "#e0e0e0"} />
                  ))}
                </div>
                <span className="unified-reviews">({product.reviews})</span>
              </div>

              <div className="unified-card-price">
                <span className="unified-price-new">{product.price}</span>
                {product.originalPrice && <span className="unified-price-old">{product.originalPrice}</span>}
                {product.discount && <span className="unified-price-discount">{product.discount}</span>}
              </div>

              <button
                className="unified-add-cart-btn"
                onClick={(e) => handleCartClick(e, product)}
              >
                <FaShoppingBag style={{ marginRight: '8px' }} /> {cartItems.some(item => item.id === product.id) ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
          </motion.div>
        )) : (
          <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            No trending products available right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendyCollection;