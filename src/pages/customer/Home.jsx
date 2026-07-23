import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import l1 from '../../assets/banners/l1.jpeg';
import j1 from '../../assets/banners/j1.jpeg';
import b1 from '../../assets/banners/b1.jpeg';
import OfferCarousel from '../../components/OfferCarousel';
import Cards from '../../components/Cards';
import TrendyCollection from '../../components/TrendyCollection';
import KurtiBanner from '../../components/KurtiBanner';
import ShopByOccasion from '../../components/ShopByOccasion';
import SummerBanner from '../../components/SummerBanner';
import dressImg from '../../assets/images/dress.jpg';
import kurtiImg from '../../assets/images/kurti.png';
import kurthi2Img from '../../assets/images/kurthi2.png';
import kurthi3Img from '../../assets/images/kurthi3.png';
import kurthi5Img from '../../assets/images/kurthi5.png';
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

const SectionHeader = ({ eyebrowText, titleDark, titleGold }) => (
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
      <span style={{ width: '40px', height: '1px', background: '#b58d4e' }}></span>
      <Leaf size={14} color="#b58d4e" />
      <span style={{ color: '#b58d4e', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>{eyebrowText}</span>
      <span style={{ width: '40px', height: '1px', background: '#b58d4e' }}></span>
    </div>
    <h2 style={{ fontSize: '42px', fontWeight: '800', margin: '0', fontFamily: '"Inter", sans-serif', letterSpacing: '-1px' }}>
      <span style={{ color: '#4a3f35' }}>{titleDark}</span> <span style={{ color: '#b58d4e' }}>{titleGold}</span>
    </h2>
  </div>
);

const BRANDS = [
  { name: 'LACOSTE', domain: 'lacoste.com', bgClass: 'bg-glass-wave' },
  { name: 'ZARA', domain: 'zara.com', bgClass: 'bg-glass-wave' },
  { name: 'H&M', domain: 'hm.com', bgClass: 'bg-glass-wave' },
  { name: 'Levi\'s', domain: 'levi.com', bgClass: 'bg-glass-wave' },
  { name: 'PUMA', domain: 'puma.com', bgClass: 'bg-glass-wave' },
  { name: 'GUCCI', domain: 'gucci.com', bgClass: 'bg-glass-wave' }
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
      <div className="trendy-header" style={{ marginTop: '10px', marginBottom: '20px' }}>
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
        <SectionHeader eyebrowText="SEASON SPECIAL" titleDark="New" titleGold="Arrivals" />

        <div className="unified-products-grid" style={{ padding: '0 5vw', textAlign: 'left' }}>
          {[
            { id: 5, title: 'Classic Black Watch', image: classicBlackWatchImg, price: '₹1,999', rating: 4, reviews: 128, badge: 'NEW', color: '#1a1d20' },
            { id: 6, title: 'Elegant Handbag', image: elegantHandbagImg, price: '₹2,499', rating: 4, reviews: 96, badge: 'NEW', color: '#b58c5a' },
            { id: 7, title: 'Men Casual Shirt', image: menCasualShirtImg, price: '₹1,299', rating: 4, reviews: 213, badge: 'NEW', color: '#4b7b9d' },
            { id: 8, title: 'Trendy Sneakers', image: trendySneakersImg, price: '₹2,199', rating: 4, reviews: 176, badge: 'NEW', color: '#5a774c' }
          ].map(product => (
            <div key={product.id} className="unified-product-card">
              <div className="unified-card-image-wrap">
                {product.badge && (
                  <div className="unified-badge" style={{ background: product.color }}>{product.badge}</div>
                )}
                <button className="unified-wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                  <Heart
                    size={16}
                    fill={wishlist.includes(product.id) ? "#ff4d4f" : "none"}
                    color={wishlist.includes(product.id) ? "#ff4d4f" : "#555"}
                    className="heart-icon-anim"
                  />
                </button>
                <img src={product.image} alt={product.title} />
              </div>

              <div className="unified-card-info">
                <h3 className="unified-card-title">{product.title}</h3>

                <div className="unified-card-rating">
                  <div className="unified-stars">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} size={14} fill={i < product.rating ? "#8f7a5b" : "#e0e0e0"} color={i < product.rating ? "#8f7a5b" : "#e0e0e0"} />
                    ))}
                  </div>
                  <span className="unified-reviews">({product.reviews})</span>
                </div>

                <div className="unified-card-price">
                  <span className="unified-price-new">{product.price}</span>
                  {product.originalPrice && <span className="unified-price-old">{product.originalPrice}</span>}
                  {product.discount && <span className="unified-price-discount">{product.discount}</span>}
                </div>

                <button className="unified-explore-btn">
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
        <SectionHeader eyebrowText="SEASON SPECIAL" titleDark="Limited" titleGold="Offers" />

        <div className="unified-products-grid" style={{ padding: '0 5vw', marginTop: '30px' }}>
          {[
            { id: 1, title: 'Designer Kurthi', image: kurthi3Img, price: '₹499', originalPrice: '₹999', discount: '50% off', rating: 5, reviews: 24 },
            { id: 2, title: 'Floral A-Line Kurti', image: kurthi2Img, price: '₹799', originalPrice: '₹999', discount: '20% off', rating: 4, reviews: 18 },
            { id: 3, title: 'Cotton Daily Wear Kurti', image: kurthi4Img, price: '₹649', originalPrice: '₹899', discount: '28% off', rating: 4, reviews: 31 },
            { id: 4, title: 'Indo Western Kurti', image: kurthi5Img, price: '₹899', originalPrice: '₹1199', discount: '25% off', rating: 5, reviews: 42 }
          ].map(product => (
            <div key={product.id} className="unified-product-card">
              <div className="unified-card-image-wrap">
                {product.badge && (
                  <div className="unified-badge" style={{ background: '#c0a07c' }}>{product.badge}</div>
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
                <button className="unified-wishlist-btn" onClick={() => toggleWishlist(product.id)}>
                  <Heart
                    size={16}
                    fill={wishlist.includes(product.id) ? "#ff4d4f" : "none"}
                    color={wishlist.includes(product.id) ? "#ff4d4f" : "#555"}
                    className="heart-icon-anim"
                  />
                </button>
                <img src={product.image} alt={product.title} />
              </div>

              <div className="unified-card-info">
                <h3 className="unified-card-title">{product.title}</h3>

                <div className="unified-card-rating">
                  <div className="unified-stars">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <Star key={i} size={14} fill={i < product.rating ? "#8f7a5b" : "#e0e0e0"} color={i < product.rating ? "#8f7a5b" : "#e0e0e0"} />
                    ))}
                  </div>
                  <span className="unified-reviews">({product.reviews})</span>
                </div>

                <div className="unified-card-price">
                  <span className="unified-price-new">{product.price}</span>
                  <span className="unified-price-old">{product.originalPrice}</span>
                  {product.discount && <span className="unified-price-discount">{product.discount}</span>}
                </div>

                <button className="unified-explore-btn">
                  Explore Collection
                  <span style={{ fontSize: '16px' }}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="brands-section" style={{ marginTop: '30px', marginBottom: '40px', width: '100%' }}>
        <SectionHeader eyebrowText="SEASON SPECIAL" titleDark="Top" titleGold="Brands" />

        <div className="brands-marquee-container">
          <div className="brands-marquee">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, index) => (
              <div className={`brand-card ${brand.bgClass}`} key={index}>
                <div className="brand-content-centered">
                  <img 
                    src={`https://icon.horse/icon/${brand.domain}`} 
                    alt={`${brand.name} logo`} 
                    className="brand-logo-img" 
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }} 
                  />
                  <div className="brand-logo-elegant">
                    {brand.name}
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

      <ShopByOccasion />

    </div>
  );
};

export default Home;
