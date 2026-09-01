import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';
import l1 from '../../assets/banners/l1.jpeg';
import j1 from '../../assets/banners/j1.jpeg';
import b1 from '../../assets/banners/b1.jpeg';
import OfferCarousel from '../../components/OfferCarousel';
import Cards from '../../components/Cards';
import TrendyCollection from '../../components/TrendyCollection';
import KurtiBanner from '../../components/KurtiBanner';
import SummerBanner from '../../components/SummerBanner';
import PromoBanner from '../../components/PromoBanner';
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
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { getBrands } from '../../services/api';

const SectionHeader = ({ eyebrowText, titleDark, titleGold }) => (
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    {eyebrowText && (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
        <span style={{ width: '40px', height: '1px', background: 'var(--primary-color)' }}></span>
        <Leaf size={14} color="var(--primary-color)" />
        <span style={{ color: 'var(--primary-color)', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>{eyebrowText}</span>
        <span style={{ width: '40px', height: '1px', background: 'var(--primary-color)' }}></span>
      </div>
    )}
    <h2 style={{ fontSize: '42px', fontWeight: '800', margin: '0', fontFamily: '"Inter", sans-serif', letterSpacing: '-1px' }}>
      <span style={{ color: '#4a3f35' }}>{titleDark}</span> <span style={{ color: 'var(--primary-color)' }}>{titleGold}</span>
    </h2>
  </div>
);

const CountdownTimer = ({ targetDateStr, stockLimit, productId, onExpire }) => {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
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

    // Run immediately so it doesn't show 'Calculating...' for 1 second
    if (!calculateTime()) return;

    const interval = setInterval(() => {
      if (!calculateTime()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr, stockLimit, productId, onExpire]);

  return <>{timeLeft || 'Calculating...'}</>;
};

const BRANDS = [
  { name: 'LACOSTE', domain: 'lacoste.com', bgClass: 'bg-glass-wave' },
  { name: 'ZARA', domain: 'zara.com', bgClass: 'bg-glass-wave' },
  { name: 'H&M', domain: 'hm.com', bgClass: 'bg-glass-wave' },
  { name: 'Levi\'s', domain: 'levi.com', bgClass: 'bg-glass-wave' },
  { name: 'PUMA', domain: 'puma.com', bgClass: 'bg-glass-wave' },
  { name: 'GUCCI', domain: 'gucci.com', bgClass: 'bg-glass-wave' }
];

const Home = () => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { products } = useProducts();
  const [brands, setBrands] = React.useState(BRANDS);

  const formatProduct = (p) => {
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
  };

  const [limitedOffers, setLimitedOffers] = React.useState([]);

  React.useEffect(() => {
    if (products) {
      const validOffers = products
        .filter(p => p.homeSection === 'Limited Offers' || String(p.isLimitedOffer) === 'true')
        .map(formatProduct)
        .filter(p => !p.timer || new Date(p.timer).getTime() > new Date().getTime())
        .sort((a, b) => new Date(b._backendData?.createdAt || 0) - new Date(a._backendData?.createdAt || 0))
        .slice(0, 4);
      setLimitedOffers(validOffers);
    }
  }, [products]);

  const handleOfferExpire = React.useCallback((productId) => {
    setLimitedOffers(prev => prev.filter(p => p.id !== productId));
  }, []);

  const newArrivals = products?.filter(p => p.homeSection === 'New Arrivals').map(formatProduct).slice(0, 4) || [];

  React.useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await getBrands();
        const brandsData = data.data || data;
        if (brandsData && brandsData.length > 0) {
          const activeBrands = brandsData.filter(b => b.status !== 'Inactive');
          if (activeBrands.length > 0) {
            const mappedBrands = activeBrands.map(b => ({
              name: b.brandName,
              domain: '',
              bgClass: 'bg-glass-wave'
            }));
            setBrands(mappedBrands);
          }
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const categories = [
    { name: 'Custom T-Shirts', path: '/category/custom-t-shirts' },
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

      <OfferCarousel />
      <Cards />

      {/* Limited Offers Section */}
      <div className="brands-section" style={{ marginTop: '10px', marginBottom: '20px' }}>
        <SectionHeader eyebrowText="SEASON SPECIAL" titleDark="Limited" titleGold="Offers" />

        <div className="unified-products-grid" style={{ padding: '0 5vw', marginTop: '30px' }}>
          {limitedOffers.length > 0 ? limitedOffers.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="unified-product-card"
              onClick={() => navigate(`/product/${product.id}`, { state: { product: product._backendData } })}
            >
              <div className="unified-card-image-wrap">
                {product.badge && (
                  <div className="unified-badge" style={{ background: '#c0a07c' }}>{product.badge}</div>
                )}
                {product.timer && (
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
                    <CountdownTimer targetDateStr={product.timer} stockLimit={product.stockLimit} productId={product.id} onExpire={handleOfferExpire} />
                  </div>
                )}
                <button className="unified-wishlist-btn" onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}>
                  <Heart
                    size={16}
                    fill={isInWishlist(product.id) ? "#ff4d4f" : "none"}
                    color={isInWishlist(product.id) ? "#ff4d4f" : "#555"}
                    className="heart-icon-anim"
                  />
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

                <button className="unified-explore-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
                  Explore Collection
                  <span style={{ fontSize: '16px' }}>→</span>
                </button>
              </div>
            </motion.div>
          )) : (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No limited offers available right now.
            </div>
          )}
        </div>
      </div>

      <TrendyCollection />
      <div className="trendy-header" style={{ marginTop: '10px', marginBottom: '20px' }}>
        <div className="trendy-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-icon"><Leaf size={11} color="var(--primary-color)" /></span>
          <span>SEASON SPECIAL</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="trendy-title">
          Summer <span className="trendy-title-accent" style={{ color: 'var(--primary-color)' }}>Collections</span>
        </h2>
      </div>
      <SummerBanner />
      <div id="new-arrivals" className="new-arrival-section" style={{ padding: '10px 0 10px', background: '#faf9f6', textAlign: 'center' }}>
        <SectionHeader eyebrowText="SEASON SPECIAL" titleDark="New" titleGold="Arrivals" />

        <div className="unified-products-grid" style={{ padding: '0 5vw', textAlign: 'left' }}>
          {newArrivals.length > 0 ? newArrivals.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="unified-product-card"
              onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            >
              <div className="unified-card-image-wrap">
                {product.badge && (
                  <div className="unified-badge" style={{ background: product.color }}>{product.badge}</div>
                )}
                <button className="unified-wishlist-btn" onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}>
                  <Heart
                    size={16}
                    fill={isInWishlist(product.id) ? "#ff4d4f" : "none"}
                    color={isInWishlist(product.id) ? "#ff4d4f" : "#555"}
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

                <button className="unified-explore-btn" onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}>
                  Explore Collection
                  <span style={{ fontSize: '16px' }}>→</span>
                </button>
              </div>
            </motion.div>
          )) : (
            <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No new arrivals right now.
            </div>
          )}
        </div>
      </div>


      {/* <VirtualTryOn /> */}


      <div id="top-brands" className="brands-section" style={{ marginTop: '30px', marginBottom: '60px', width: '100%' }}>
        <SectionHeader eyebrowText="EXCLUSIVE BRANDS" titleDark="Top" titleGold="Brands" />

        <div className="brands-marquee-container">
          <div className="brands-marquee">
            {(brands.length > 0 ? Array(Math.max(3, Math.ceil(18 / brands.length))).fill(brands).flat() : []).map((brand, index) => (
              <motion.div
                className={`brand-card ${brand.bgClass}`}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="brand-content-centered">
                  <div className="brand-logo-elegant">
                    {brand.name}
                  </div>
                  <div className="brand-floral-divider">
                    <span className="floral-line"></span>
                    <span className="floral-icon-small">✦</span>
                    <span className="floral-line"></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>



    </div>
  );
};

export default Home;
