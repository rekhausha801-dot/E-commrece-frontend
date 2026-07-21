import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import l1 from '../../assets/banners/l1.jpeg';
import j1 from '../../assets/banners/j1.jpeg';
import b1 from '../../assets/banners/b1.jpeg';
import OfferCarousel from '../../components/OfferCarousel';
import Cards from '../../components/Cards';
import TrendyCollection from '../../components/TrendyCollection';
import SummerBanner from '../../components/SummerBanner';
import dressImg from '../../assets/images/dress.jpg';
import kurtiImg from '../../assets/images/kurti.png';
import kurthi2Img from '../../assets/images/kurthi2.png';
import kurthi3Img from '../../assets/images/kurthi3.png';
import kurthi4Img from '../../assets/images/kurthi4.png';
import watchImg from '../../assets/images/watch.png';
import bagImg from '../../assets/images/beauty.png';
import shirtImg from '../../assets/images/man.png';
import shoeImg from '../../assets/images/shoe.png';
import classicBlackWatchImg from '../../assets/images/classic_black_watch.png';
import elegantHandbagImg from '../../assets/images/elegant_handbag.png';
import menCasualShirtImg from '../../assets/images/men_casual_shirt.png';
import trendySneakersImg from '../../assets/images/trendy_sneakers.png';
import beautyCosmeticsImg from '../../assets/images/beauty_cosmetics.png';
import { Heart, ShoppingBag, ShoppingCart, Star, Leaf } from 'lucide-react';

const BRANDS = [
  { name: 'zudio', class: 'brand-zudio', bgClass: 'bg-glass-wave' },
  { name: 'ZARA', class: 'brand-zara', bgClass: 'bg-glass-wave' },
  { name: 'H&M', class: 'brand-hm', bgClass: 'bg-glass-wave' },
  { name: 'Levi\'s', class: 'brand-levis', bgClass: 'bg-glass-wave' },
  { name: 'PUMA', class: 'brand-puma', bgClass: 'bg-glass-wave' }
];

const Home = () => {
  const [timeLeft, setTimeLeft] = React.useState({ h: 1, m: 10, s: 30 });
  const [wishlist, setWishlist] = React.useState([]);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { h, m, s } = prev;
        if (s > 0) {
          s--;
        } else {
          s = 59;
          if (m > 0) {
            m--;
          } else {
            m = 59;
            if (h > 0) h--;
          }
        }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (val) => val.toString().padStart(2, '0');

  const categories = [
    { name: 'Dresses', path: '/category/dresses' },
    { name: 'Tops', path: '/category/tops' },
    { name: 'Bottoms', path: '/category/bottoms' },
    { name: 'Outerwear', path: '/category/outerwear' },
    { name: 'Bags', path: '/category/bags' },
    { name: 'Shoes', path: '/category/shoes' },
    { name: 'Jewelry', path: '/category/jewelry' },
    { name: 'Accessories', path: '/category/accessories' },
  ];

  return (
    <div className="home-container">
      <style>
        {`
          .wishlist-btn {
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease !important;
          }
          .wishlist-btn:hover {
            transform: scale(1.15);
            box-shadow: 0 4px 10px rgba(0,0,0,0.15) !important;
          }
          .wishlist-btn:active {
            transform: scale(0.9) !important;
          }
          .heart-icon-anim {
            transition: fill 0.3s ease, color 0.3s ease, transform 0.2s ease !important;
          }
          .wishlist-btn:hover .heart-icon-anim {
            transform: scale(1.1);
          }
        `}
      </style>
      <OfferCarousel />
      <Cards />
      <TrendyCollection />
      <div className="trendy-header" style={{ marginTop: '50px', marginBottom: '20px' }}>
        <div className="trendy-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-icon"><Leaf size={11} color="#b58d4e" /></span>
          <span>SEASON SPECIAL</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="trendy-title">
          Summer <span className="trendy-title-accent" style={{ color: '#b58d4e' }}>Collections</span>
        </h2>
      </div>
      <SummerBanner />
      <div className="new-arrival-section" style={{ padding: '10px 0 10px', background: '#faf9f6', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
          <span style={{ width: '30px', height: '1px', background: '#d4af37' }}></span>
          <span style={{ width: '4px', height: '4px', background: '#d4af37', borderRadius: '50%' }}></span>
          <span style={{ fontSize: '14px', letterSpacing: '4px', fontWeight: '600', color: '#333' }}>DISCOVER OUR</span>
          <span style={{ width: '4px', height: '4px', background: '#d4af37', borderRadius: '50%' }}></span>
          <span style={{ width: '30px', height: '1px', background: '#d4af37' }}></span>
        </div>

        <h2 style={{ fontSize: '42px', fontFamily: '"Playfair Display", serif', margin: '0 0 15px 0' }}>
          <span style={{ color: '#111', fontWeight: 'bold' }}>NEW</span> <span style={{ color: '#8f7a5b', fontWeight: 'bold' }}>ARRIVALS</span>
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
          <span style={{ width: '50px', height: '1px', background: '#e0e0e0' }}></span>
          <span style={{ color: '#d4af37', fontSize: '14px' }}>✦</span>
          <span style={{ width: '50px', height: '1px', background: '#e0e0e0' }}></span>
        </div>

        <p style={{ color: '#666', fontSize: '15px', marginBottom: '40px' }}></p>

        <div className="products-grid" style={{ padding: '0 5vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', textAlign: 'left' }}>
          {[
            { id: 5, title: 'Classic Black Watch', image: classicBlackWatchImg, price: '₹1,999', rating: 4, reviews: 128, badge: 'NEW', color: '#1a1d20' },
            { id: 6, title: 'Elegant Handbag', image: elegantHandbagImg, price: '₹2,499', rating: 4, reviews: 96, badge: 'NEW', color: '#b58c5a' },
            { id: 7, title: 'Men Casual Shirt', image: menCasualShirtImg, price: '₹1,299', rating: 4, reviews: 213, badge: 'NEW', color: '#4b7b9d' },
            { id: 8, title: 'Trendy Sneakers', image: trendySneakersImg, price: '₹2,199', rating: 4, reviews: 176, badge: 'NEW', color: '#5a774c' }
          ].map(product => (
            <div key={product.id} className="product-card" style={{ border: '1px solid #e6e6e6', borderRadius: '6px', background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="card-image-wrap" style={{ position: 'relative' }}>
                {product.badge && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px', background: product.color, color: 'white', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', borderRadius: '4px', zIndex: 2 }}>{product.badge}</div>
                )}
                <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)} style={{ top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', position: 'absolute', zIndex: 2 }}>
                  <Heart
                    size={16}
                    fill={wishlist.includes(product.id) ? "#ff4d4f" : "none"}
                    color={wishlist.includes(product.id) ? "#ff4d4f" : "#555"}
                    className="heart-icon-anim"
                  />
                </button>
                <img src={product.image} alt={product.title} style={{ width: '100%', aspectRatio: '1/1.1', objectFit: 'cover' }} />
              </div>

              <div className="card-info" style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 className="card-title" style={{ fontSize: '15px', fontWeight: 'bold', color: '#111', margin: '0 0 8px 0' }}>{product.title}</h3>

                <div className="card-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <div className="stars" style={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} size={14} fill={i < product.rating ? "#8f7a5b" : "#e0e0e0"} color={i < product.rating ? "#8f7a5b" : "#e0e0e0"} />
                    ))}
                  </div>
                  <span className="reviews" style={{ fontSize: '12px', color: '#888', marginLeft: '4px' }}>({product.reviews})</span>
                </div>

                <div className="card-price" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="price-new" style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{product.price}</span>
                  {product.originalPrice && <span className="price-old" style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>{product.originalPrice}</span>}
                  {product.discount && <span className="price-discount" style={{ fontSize: '13px', fontWeight: 'bold', color: '#00a388' }}>{product.discount}</span>}
                </div>

                <button className="explore-btn" style={{ marginTop: 'auto', width: '100%', background: '#d3b585', color: '#3e2a14', border: 'none', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = '#c2a170'} onMouseOut={(e) => e.currentTarget.style.background = '#d3b585'}>
                  Explore Collection
                  <span style={{ fontSize: '16px' }}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limited Offers Section */}
      <div className="brands-section" style={{ marginTop: '10px', marginBottom: '20px' }}>
        <div className="brands-header" style={{ textAlign: 'center' }}>
          <div className="brands-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '15px' }}>
            <span className="brands-line" style={{ height: '1px', background: '#d4af37', width: '40px' }} />
            <span className="brands-star" style={{ color: '#d4af37', fontSize: '14px' }}>✦</span>
            <span className="brands-line" style={{ height: '1px', background: '#d4af37', width: '40px' }} />
          </div>
          <h2 className="brands-title" style={{ fontSize: '32px', fontWeight: '400', letterSpacing: '4px', margin: '0' }}>LIMITED OFFERS</h2>
          <div className="brands-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginTop: '15px', marginBottom: '12px' }}>
            <span className="brands-line" style={{ height: '1px', background: '#d4af37', width: '40px' }} />
            <span className="brands-star" style={{ color: '#d4af37', fontSize: '14px' }}>✦</span>
            <span className="brands-line" style={{ height: '1px', background: '#d4af37', width: '40px' }} />
          </div>
          <p className="brands-subtitle" style={{ color: '#666', fontSize: '15px', marginTop: '10px' }}></p>
        </div>

        <div className="products-grid" style={{ padding: '0 5vw', marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {[
            { id: 1, title: 'Designer Kurthi', image: kurthi3Img, price: '₹499', originalPrice: '₹999', discount: '50% off', rating: 5, reviews: 24 },
            { id: 2, title: 'Floral A-Line Kurti', image: kurthi2Img, price: '₹799', originalPrice: '₹999', discount: '20% off', rating: 4, reviews: 18 },
            { id: 3, title: 'Cotton Daily Wear Kurti', image: kurthi4Img, price: '₹649', originalPrice: '₹899', discount: '28% off', rating: 4, reviews: 31 },
            { id: 4, title: 'Indo Western Kurti', image: kurtiImg, price: '₹899', originalPrice: '₹1199', discount: '25% off', rating: 5, reviews: 42 }
          ].map(product => (
            <div key={product.id} className="product-card" style={{ border: '1px solid #e6e6e6', borderRadius: '6px', background: '#fff', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div className="card-image-wrap" style={{ position: 'relative' }}>
                {product.badge && (
                  <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#c0a07c', color: 'white', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', borderRadius: '4px', zIndex: 2 }}>{product.badge}</div>
                )}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  backgroundColor: '#fcecdb',
                  color: '#d36a44',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  zIndex: 2
                }}>
                  {formatTime(timeLeft.h)}h : {formatTime(timeLeft.m)}m : {formatTime(timeLeft.s)}s
                </div>
                <button className="wishlist-btn" onClick={() => toggleWishlist(product.id)} style={{ top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', position: 'absolute', zIndex: 2 }}>
                  <Heart
                    size={16}
                    fill={wishlist.includes(product.id) ? "#ff4d4f" : "none"}
                    color={wishlist.includes(product.id) ? "#ff4d4f" : "#555"}
                    className="heart-icon-anim"
                  />
                </button>
                <img src={product.image} alt={product.title} style={{ width: '100%', aspectRatio: '1/1.1', objectFit: 'cover' }} />
              </div>

              <div className="card-info" style={{ padding: '16px', textAlign: 'left', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 className="card-title" style={{ fontSize: '15px', fontWeight: 'bold', color: '#111', margin: '0 0 8px 0' }}>{product.title}</h3>

                <div className="card-rating" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <div className="stars" style={{ display: 'flex' }}>
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} size={14} fill={i < product.rating ? "#8f7a5b" : "#e0e0e0"} color={i < product.rating ? "#8f7a5b" : "#e0e0e0"} />
                    ))}
                  </div>
                  <span className="reviews" style={{ fontSize: '12px', color: '#888', marginLeft: '4px' }}>({product.reviews})</span>
                </div>

                <div className="card-price" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <span className="price-new" style={{ fontSize: '18px', fontWeight: 'bold', color: '#000' }}>{product.price}</span>
                  <span className="price-old" style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                  {product.discount && <span className="price-discount" style={{ fontSize: '13px', fontWeight: 'bold', color: '#00a388' }}>{product.discount}</span>}
                </div>

                <button className="explore-btn" style={{ marginTop: 'auto', width: '100%', background: '#d3b585', color: '#3e2a14', border: 'none', borderRadius: '8px', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', transition: 'background 0.3s' }} onMouseOver={(e) => e.currentTarget.style.background = '#c2a170'} onMouseOut={(e) => e.currentTarget.style.background = '#d3b585'}>
                  Explore Collection
                  <span style={{ fontSize: '16px' }}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="brands-section" style={{ marginTop: '10px', marginBottom: '40px' }}>
        <div className="brands-header" style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div className="brands-eyebrow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', color: '#b58d4e', marginBottom: '12px' }}>
            <span className="brands-line" style={{ width: '24px', height: '1px', background: '#e3d3bd' }} />
            <span className="brands-star" style={{ fontSize: '11px', display: 'flex' }}><Star size={11} fill="#b58d4e" color="#b58d4e" /></span>
            <span>TOP BRANDS</span>
            <span className="brands-line" style={{ width: '24px', height: '1px', background: '#e3d3bd' }} />
          </div>
          <h2 className="brands-title" style={{ fontSize: '44px', fontWeight: '800', margin: '0 0 10px', color: '#4a3f35', letterSpacing: '-0.5px' }}>
            Top <span style={{ color: '#b58d4e' }}>Brands</span>
          </h2>
        </div>

        <div className="brands-marquee-container">
          <div className="brands-marquee">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
              <div className={`brand-card ${brand.bgClass}`} key={index}>
                <div className="brand-content-centered">
                  <div className="brand-logo-elegant">
                    {brand.name === 'zudio' ? 'ZUDIO' : brand.name}
                  </div>

                  <div className="brand-floral-divider">
                    <span className="floral-line"></span>
                    <span className="floral-icon-small">✦</span>
                    <span className="floral-line"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
