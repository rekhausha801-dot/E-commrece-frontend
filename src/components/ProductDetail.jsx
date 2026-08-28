import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { animate, stagger, inView, scroll, motion, useScroll, useTransform } from 'framer-motion';
import { animateView } from 'motion-dom';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { message, Image } from 'antd';
import {
  Star, ShoppingCart, ChevronRight, ChevronLeft, ArrowRight, Ruler,
  CheckCircle2, ShieldCheck, RefreshCcw, Heart, Plus, Minus, Check, Eye,
  Truck, CreditCard, Box, Navigation, MoreHorizontal, MoreVertical, Trash2, ThumbsUp, ShoppingBag, Palette, Shield,
  Camera, MessageCircle, Edit2, Info, Award, X, Leaf, ArrowDown, Zap,
  Flower2, Mountain, Feather, Flame, Rocket, Compass, Send, Headphones, Palmtree, Upload
} from 'lucide-react';
import CustomerReviews from './CustomerReviews';
import './ProductDetail.css';


import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { handleFlyingCartAnimation } from '../utils/cartAnimation';
import { getPredefinedDesigns, uploadDesign } from '../services/customDesignService';
import { createReviewApi, getProductReviewsApi, getProductRatingSummaryApi, markReviewHelpfulApi, deleteCustomerReviewApi } from '../services/api';

function ParallaxHighlightCard({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div ref={ref} className="pdp-highlight-card" style={{ y }}>
      {children}
    </motion.div>
  );
}

export function SimilarProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();
  const isAdded = cartItems.some(item => item.id === product.id);
  const initialColor = product.colors && product.colors.length > 0
    ? (typeof product.colors[0] === 'string' ? `color-0` : product.colors[0].name)
    : '';
  const [activeColor, setActiveColor] = useState(initialColor);
  const activeColorObj = product.colors?.find((c, idx) => {
    const cName = typeof c === 'string' ? `color-${idx}` : c.name;
    return cName === activeColor;
  });
  const displayImage = activeColorObj?.image || product.image || (product.colors && typeof product.colors[0] !== 'string' ? product.colors[0]?.image : null);
  const isOutOfStock = activeColorObj ? !activeColorObj.inStock : false;

  return (
    <motion.div
      className={`pdp-lo-card unified-product-card ${isOutOfStock ? 'out-of-stock-card' : ''}`}
      onClick={() => onQuickView(product)}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      style={{ height: '100%', alignSelf: 'stretch' }}
    >
      <div className="unified-card-image-wrap">
        {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
        <div className="unified-badge" style={{ background: '#d3b585', opacity: 0.9 }}>
          {product.badge || 'SIMILAR'}
        </div>
        <button className="unified-wishlist-btn" onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}>
          <Heart size={16} fill={isInWishlist(product.id) ? '#ff4d4f' : 'none'} color={isInWishlist(product.id) ? '#ff4d4f' : '#666'} />
        </button>
        <img src={displayImage} alt={product.title} />
        <button
          className="pdp-quick-view-btn"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
        >
          <Eye size={16} style={{ marginRight: '6px' }} /> Quick View
        </button>
      </div>

      <div className="unified-card-info">
        <h3 className="unified-card-title">{product.title}</h3>

        <div className="unified-card-rating">
          <div className="unified-stars">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={14} fill={i <= (product.rating || 0) ? "#C89953" : "#e0e0e0"} color={i <= (product.rating || 0) ? "#C89953" : "#e0e0e0"} />
            ))}
          </div>
          <span className="unified-reviews">({product.reviews || 0})</span>
        </div>

        <div className="unified-card-price">
          <span className="unified-price-new">{product.price?.toString().startsWith('₹') ? product.price : `₹${product.price || 0}`}</span>
          {product.originalPrice && (
            <span className="unified-price-old">{product.originalPrice.toString().startsWith('₹') ? product.originalPrice : `₹${product.originalPrice}`}</span>
          )}
          {product.discount && (
            <span className="unified-price-discount">{product.discount}</span>
          )}
        </div>



        {isOutOfStock ? (
          <button className="unified-add-cart-btn" style={{ background: '#fce4e4', color: '#d32f2f' }} onClick={(e) => e.stopPropagation()}>
            Notify Me
          </button>
        ) : (
          <button className="unified-add-cart-btn" onClick={async (e) => {
            e.stopPropagation();
            if (isAdded) {
              navigate('/cart');
            } else {
              await handleFlyingCartAnimation(e);
              const productToAdd = { ...product };
              if (product?.customizable && activeDesign) {
                productToAdd.customization = {
                  designImage: activeDesign.icon,
                  designName: activeDesign.name,
                  designType: activeDesign.category === 'Uploaded' ? 'uploaded' : 'predefined',
                  designPosition: activePosition,
                  designSize: 'medium',
                  selectedColor: activeColor,
                  selectedSize: activeSize
                };
              }
              addToCart(productToAdd);
              message.success(`${product.title || 'Product'} added to cart!`);
            }
          }}>
            {isAdded ? "Go to Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function ProductDetail() {
  const { productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { cartItems, addToCart, setBuyNowData } = useCart();
  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const { products: contextProducts } = useProducts();

  const [baseProduct, setBaseProduct] = useState(location.state?.product || null);
  const [isLoading, setIsLoading] = useState(!baseProduct);

  useEffect(() => {
    if (productId) {

      if (contextProducts && contextProducts.length > 0) {
        const found = contextProducts.find(p => String(p.id) === String(productId) || String(p._id) === String(productId));
        if (found) {
          setBaseProduct(found);
          setIsLoading(false);
        }
      }

      // Then fetch fresh data from backend to ensure we have gallery, specs, etc.
      import('../services/productService').then(({ getProductById }) => {
        getProductById(productId)
          .then(res => {
            if (res.success) setBaseProduct(res.data);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      });
    }
  }, [productId, contextProducts]);

  const product = baseProduct ? {
    ...baseProduct,
    category: baseProduct.category || baseProduct._backendData?.category?.name || baseProduct._backendData?.category || 'Uncategorized',
    customizable: baseProduct.customizable,
    designs: baseProduct.designs
  } : null;

  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeDesign, setActiveDesign] = useState(product?.designs ? product.designs[0] : null);
  const [activePosition, setActivePosition] = useState('front');
  const [isUploading, setIsUploading] = useState(false);
  const [customDesignsList, setCustomDesignsList] = useState([]);

  useEffect(() => {
    if (product?.customizable) {
      getPredefinedDesigns().then(designs => {
        setCustomDesignsList(designs);
        if (!activeDesign && designs.length > 0) {
          setActiveDesign(designs[0]);
        }
      });
    }
  }, [product?.customizable]);

  const isAdded = product ? cartItems.some(item => item.id === product.id) : false;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', content: '', image: null });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState([]);
  const fileInputRef = useRef(null);
  const customizerScrollRef = useRef(null);

  const [ratingSummary, setRatingSummary] = useState(null);

  useEffect(() => {
    if (productId) {
      getProductReviewsApi(productId)
        .then(res => {
          if (res.data && res.data.success) {
            const fetchedReviews = res.data.data.map(r => ({
              id: r._id,
              userId: r.user?._id || r.user,
              name: r.user?.name || 'Anonymous',
              avatar: r.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user?.name || 'A')}&background=fef3c7&color=d97706&size=100`,
              purchased: product?.title || "Product",
              rating: r.rating,
              title: r.title || 'Feedback',
              content: r.comment,
              image: r.images && r.images.length > 0 ? r.images[0] : null,
              date: new Date(r.createdAt).toLocaleDateString(),
              verified: r.isVerifiedPurchase,
              helpfulCount: r.helpfulCount || 0,
              hasVotedHelpful: false
            }));
            setReviews(fetchedReviews);
            setCustomerPhotos(fetchedReviews.filter(r => r.image).map(r => r.image));
          }
        })
        .catch(err => console.error("Error fetching product reviews:", err));

      getProductRatingSummaryApi(productId)
        .then(res => {
          if (res.data && res.data.success) {
            setRatingSummary(res.data);
          }
        })
        .catch(err => console.error("Error fetching rating summary:", err));
    }
  }, [productId, product?.title]);

  const scrollCustomizer = (direction) => {
    if (customizerScrollRef.current) {
      const scrollAmount = 200;
      customizerScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setReviewForm({ ...reviewForm, image: imageUrl, file });
    }
  };

  const [customerPhotos, setCustomerPhotos] = useState([]);



  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('rating', reviewForm.rating || 0);
      formData.append('title', reviewForm.title);
      formData.append('comment', reviewForm.content);
      if (reviewForm.file) {
        formData.append('images', reviewForm.file);
      }

      const res = await createReviewApi(formData);
      if (res.data && res.data.success) {
        message.success('Review submitted successfully and is pending approval.');
        setIsReviewModalOpen(false);
        setReviewForm({ rating: 0, title: '', content: '', image: null, file: null });
      } else {
        message.error(res.data?.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      message.error(error.response?.data?.message || 'Error submitting review. Please try again.');
    }
  };

  const images = product?.images?.length > 0
    ? product.images.map(img => img.url)
    : product?.image ? [product.image] : [];

  const sizes = product?.sizes && product.sizes.length > 0 ? product.sizes : [];
  const colors = (product?.colors && product.colors.length > 0) ? product.colors : [];

  useEffect(() => {
    if (colors.length > 0 && !colors.find(c => c.name === activeColor)) {
      setActiveColor(colors[0].name);
    }
  }, [product, colors, activeColor]);

  const activeColorObj = colors.length > 0 ? (colors.find(c => c.name === activeColor) || colors[0]) : null;

  const displayImageSrc = (product?.customizable && activeDesign?.modelImage)
    ? activeDesign.modelImage
    : (activeColorObj?.image || product?.image || '');
  const displayImages = product?.images?.length > 0
    ? product.images.map(img => img.url)
    : displayImageSrc ? [displayImageSrc] : [];

  const similarProducts = React.useMemo(() => {
    if (!contextProducts || !product) return [];

    const currentTitle = (product.title || '').toLowerCase();
    const isKurti = currentTitle.includes('kurti') || currentTitle.includes('kurta');
    const isTshirt = currentTitle.includes('t-shirt') || currentTitle.includes('tshirt') || currentTitle.includes('shirt') || currentTitle.includes('top');
    const isDress = currentTitle.includes('dress');

    return contextProducts.filter(p => {
      if (p.id === product.id) return false;

      const sameCategory = p.categoryId === product.categoryId || p.category?.toLowerCase() === product.category?.toLowerCase();
      const pTitle = (p.title || '').toLowerCase();
      let keywordMatch = true;

      if (isKurti) {
        keywordMatch = pTitle.includes('kurti') || pTitle.includes('kurta');
      } else if (isTshirt) {
        keywordMatch = pTitle.includes('t-shirt') || pTitle.includes('tshirt') || pTitle.includes('shirt') || pTitle.includes('top');
      } else if (isDress) {
        keywordMatch = pTitle.includes('dress');
      }

      return sameCategory && keywordMatch;
    }).slice(0, 4);
  }, [contextProducts, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveDesign(product?.designs ? product.designs[0] : null);
  }, [productId, product?.id]);

  const handleQtyChange = (type) => {
    if (type === 'inc' && quantity < 10) setQuantity(q => q + 1);
    if (type === 'dec' && quantity > 1) setQuantity(q => q - 1);
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const [zoomStyle, setZoomStyle] = useState({});

  const adsData = React.useMemo(() => {
    if (!contextProducts || contextProducts.length === 0) return [];
    // Determine current product type from title
    const currentTitle = (product?.title || '').toLowerCase();
    const isKurti = currentTitle.includes('kurti') || currentTitle.includes('kurta');
    const isTshirt = currentTitle.includes('t-shirt') || currentTitle.includes('tshirt') || currentTitle.includes('shirt') || currentTitle.includes('top');
    const isDress = currentTitle.includes('dress');

    // Get all products with >= 30% discount
    let discountedProducts = contextProducts.filter(p => {
      const isNotCurrent = p.id !== product?.id;

      const cleanPrice = (val) => typeof val === 'string' ? parseFloat(val.replace(/[^\d.]/g, '')) : val;
      const oPrice = cleanPrice(p.originalPrice);
      const cPrice = cleanPrice(p.price);

      const calcDiscount = oPrice && cPrice ? Math.round(((oPrice - cPrice) / oPrice) * 100) : 0;

      // The backend returns things like "20 OFF", "10 OFF", "10% OFF". Extract the raw number.
      const rawDiscount = p._backendData?.discount || p.discount;
      const discountValue = rawDiscount ? parseFloat(rawDiscount.toString().replace(/[^\d.]/g, '')) : 0;

      const isHighDiscount = calcDiscount >= 10 || discountValue >= 10;

      return isHighDiscount && isNotCurrent;
    });

    // Prioritize products that match the current category or keyword
    let filtered = discountedProducts.filter(p => {
      const isSameCategory = p.categoryId === product?.categoryId || p.category === product?.category;
      const pTitle = (p.title || '').toLowerCase();

      if (isKurti) {
        return pTitle.includes('kurti') || pTitle.includes('kurta');
      } else if (isTshirt) {
        return pTitle.includes('t-shirt') || pTitle.includes('tshirt') || pTitle.includes('shirt') || pTitle.includes('top');
      } else if (isDress) {
        return pTitle.includes('dress');
      }

      // If it's not a kurti, tshirt, or dress, fallback to strict category matching
      return isSameCategory;
    });

    return filtered
      .slice(0, 5) // Keep up to 5 items
      .map(p => {
        const cleanPrice = (val) => typeof val === 'string' ? parseFloat(val.replace(/[^\d.]/g, '')) : val;
        const oPrice = cleanPrice(p.originalPrice);
        const cPrice = cleanPrice(p.price);
        return {
          id: p.id,
          image: p.image,
          title: p.title,
          discount: p.discount || (oPrice && cPrice && oPrice > cPrice ? `${Math.round(((oPrice - cPrice) / oPrice) * 100)}% OFF` : null),
          oldPrice: p.originalPrice,
          newPrice: p.price,
          _backendData: p._backendData
        };
      });
  }, [contextProducts, product?.id]);

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    if (adsData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [adsData.length]);

  const [currentUser, setCurrentUser] = useState(null);
  const [activeReviewMenu, setActiveReviewMenu] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Error parsing user from localStorage", e);
      }
    }
  }, []);

  const handleHelpfulClick = async (reviewId, hasVoted) => {
    if (hasVoted) return; // Prevent multiple votes

    try {
      const res = await markReviewHelpfulApi(reviewId);
      if (res.data && res.data.success) {
        setReviews(prevReviews => prevReviews.map(r => {
          if (r.id === reviewId) {
            return { ...r, helpfulCount: res.data.helpfulCount, hasVotedHelpful: true };
          }
          return r;
        }));
      }
    } catch (error) {
      console.error('Error marking review helpful:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const res = await deleteCustomerReviewApi(reviewId);
      if (res.data && res.data.success) {
        message.success('Review deleted successfully');
        setReviews(prev => prev.filter(r => r.id !== reviewId));
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      message.error(error.response?.data?.message || 'Failed to delete review');
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  return (
    <>
      <div className="pdp-top-banner">
        <Truck size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
        Free Shipping on all orders over ₹10
      </div>

      <div className="pdp-page-wrapper">
        <div className="pdp-breadcrumbs">
          <span>Home</span> <ChevronRight size={12} />
          <span>Women</span> <ChevronRight size={12} />
          <span>Kurtis & Kurtas</span> <ChevronRight size={12} />
          <span className="current">{product?.title}</span>
        </div>

        <div className="pdp-main-container">
          {/* Left Column Wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '24px', height: 'max-content' }}>
            {/* Gallery */}
            <div className="pdp-gallery-section">
              <div className="pdp-thumbnails">
                {displayImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`pdp-thumb ${activeImage === idx ? 'active' : ''}`}
                    onClick={() => setActiveImage(idx)}
                    style={{ position: 'relative' }}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} />
                    {product?.customizable && (
                      <div style={{ position: 'absolute', top: '55%', left: '56%', transform: 'translate(-50%, -50%)', width: '40%', height: '40%', mixBlendMode: 'multiply', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {activeDesign?.icon && !activeDesign?.isBaseImage && (
                          <img src={activeDesign.icon} alt={activeDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '16px' }}>
                <div
                  className="pdp-main-image-container"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {product?.discount && (
                    <div className="pdp-discount-badge">{product.discount}</div>
                  )}
                  <button className="pdp-wishlist-heart-btn" onClick={() => {
                    if (product) {
                      toggleWishlist(product);
                    }
                  }}>
                    <Heart size={18} fill={isInWishlist(product?.id) ? '#8B4513' : 'none'} color={isInWishlist(product?.id) ? '#8B4513' : '#666'} />
                  </button>

                  <button className="pdp-nav-btn pdp-prev" onClick={prevImage}><ChevronLeft size={20} /></button>
                  <div style={{ width: '100%', height: '100%', transition: 'transform 0.1s ease-out', ...zoomStyle }}>
                    <img src={displayImages[activeImage]} alt="Main Product" className="pdp-main-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {product?.customizable && (
                      <div style={{ position: 'absolute', top: '65%', left: '56%', transform: 'translate(-50%, -50%)', width: '35%', height: '35%', mixBlendMode: 'multiply', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {activeDesign?.icon && !activeDesign?.isBaseImage && (
                          <img src={activeDesign.icon} alt={activeDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        )}
                      </div>
                    )}
                  </div>
                  <button className="pdp-nav-btn pdp-next" onClick={nextImage}><ChevronRight size={20} /></button>
                </div>
              </div>
            </div>

          </div>

          <div className="pdp-info-section">
            {adsData.length > 0 && (
              <div style={{ overflow: 'hidden', width: '100%', borderRadius: '12px', marginBottom: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(-${currentAdIndex * 100}%)`
                  }}
                >
                  {adsData.map((ad) => (
                    <div key={ad.id} className="pdp-ad-banner" style={{ minWidth: '100%', flex: '0 0 100%', boxSizing: 'border-box', margin: 0, cursor: 'pointer' }} onClick={() => navigate(`/product/${ad.id}`)}>
                      <img src={ad.image} alt="Ad Product" className="pdp-ad-img" />
                      <div className="pdp-ad-content">
                        <div className="pdp-ad-title">{ad.title}</div>
                        <div className="pdp-ad-price-row">
                          <span className="pdp-ad-discount"><ArrowDown size={12} strokeWidth={3} /> {ad.discount}</span>
                          <span className="pdp-ad-old-price">{ad.oldPrice}</span>
                          <span className="pdp-ad-new-price">{ad.newPrice}</span>
                        </div>
                      </div>
                      <div className="pdp-ad-badge">Ads</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product?.badge && (
              <div className="pdp-collection-tag-new">
                {product.badge}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {product?.brand}
              </span>
              <h1 className="pdp-product-title-new" style={{ margin: 0 }}>{product?.title}</h1>
              {product?.sku && <span style={{ fontSize: '12px', color: '#999' }}>SKU: {product.sku}</span>}
            </div>

            <div 
              className="pdp-rating-summary-new" 
              style={{ cursor: 'pointer' }}
              onClick={() => {
                document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Star size={14} fill="#C89953" color="#C89953" />
              <span className="pdp-rating-num-new">{product?.rating || 0}</span>
              <span className="pdp-rating-text-new">({product?.reviews || 0} Ratings)</span>
              <span className="pdp-rating-divider-new">|</span>
              <Box size={14} className="pdp-sold-icon-new" />
              <span className="pdp-sold-text-new">{product?.soldCount || 0} Sold</span>
            </div>


            <div className="pdp-short-description" style={{ marginTop: '12px', marginBottom: '16px', color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
              <p>{product?.description}</p>


              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                {(product?.tags || []).map(tag => (
                  <span key={tag} style={{ background: '#f5f5f5', color: '#666', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', fontWeight: 'bold' }}>#{tag}</span>
                ))}
              </div>
            </div>

            <div className="pdp-price-block-new">
              <span className="pdp-current-price-new">
                {product?.price?.toString().startsWith('₹') ? product.price : `₹${product?.price || 0}`}
              </span>
              {product?.originalPrice && (
                <span className="pdp-original-price-new">
                  {product.originalPrice.toString().startsWith('₹') ? product.originalPrice : `₹${product.originalPrice}`}
                </span>
              )}
              {product?.discount && (
                <span className="pdp-discount-text-new">{product.discount}</span>
              )}
            </div>
            <div className="pdp-status-badges-new">
              {(product?.stock !== undefined || product?.countInStock !== undefined) && (
                <div className="pdp-stock-status-new" style={{ color: (product.stock > 0 || product.countInStock > 0) ? '#2e7d32' : '#d32f2f', background: (product.stock > 0 || product.countInStock > 0) ? '#e8f5e9' : '#ffebee' }}>
                  <span className="pdp-status-dot-new" style={{ background: (product.stock > 0 || product.countInStock > 0) ? '#2e7d32' : '#d32f2f' }}></span> {(product.stock > 0 || product.countInStock > 0) ? 'In Stock' : 'Out of Stock'}
                </div>
              )}

              {product?.customizable && (
                <div className="pdp-right-col-customizer" style={{ marginTop: '20px' }}>
                  <div className="pdp-customizer-header" style={{ padding: '0', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>CHOOSE YOUR DESIGN</h3>
                  </div>
                  <div className="pdp-customizer-designs" style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button className="pdp-customizer-nav" onClick={() => scrollCustomizer('left')} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><ChevronLeft size={16} /></button>
                    <div ref={customizerScrollRef} className="pdp-customizer-designs-scroll" style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollbarWidth: 'none', flex: 1, padding: '4px' }}>
                      {product.designs.map((design, idx) => (
                        <div
                          key={design.id}
                          className={`pdp-design-option-full ${activeDesign?.id === design.id ? 'active' : ''}`}
                          onClick={() => setActiveDesign(design)}
                          style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer',
                            minWidth: '70px', padding: '12px 8px', borderRadius: '8px',
                            background: activeDesign?.id === design.id ? '#fff' : 'transparent',
                            border: activeDesign?.id === design.id ? '1px solid #b58d4e' : '1px solid transparent',
                            position: 'relative',
                            boxShadow: activeDesign?.id === design.id ? '0 2px 8px rgba(181,141,78,0.1)' : 'none',
                            transition: 'all 0.2s'
                          }}
                        >
                          {activeDesign?.id === design.id && (
                            <div style={{
                              position: 'absolute', top: '-6px', right: '-6px', background: '#b58d4e',
                              borderRadius: '50%', width: '18px', height: '18px', display: 'flex',
                              alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 2
                            }}>
                              <Check size={10} strokeWidth={3} />
                            </div>
                          )}
                          <div style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {design.icon ? (
                              <div style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${design.icon})`,
                                backgroundSize: design.id === 1 ? '500%' : 'contain',
                                backgroundPosition: design.id === 1 ? 'center 40%' : 'center',
                                backgroundRepeat: 'no-repeat',
                                mixBlendMode: 'multiply'
                              }} />
                            ) : (
                              (() => {
                                const IconComp = {
                                  Flower2, Mountain, Feather, Flame, Leaf, Rocket, Compass, Send, Headphones, Palmtree
                                }[design.iconName];
                                return IconComp ? <IconComp size={30} color={design.iconColor} strokeWidth={1.5} /> : null;
                              })()
                            )}
                          </div>
                          <span style={{ fontSize: '11px', fontWeight: '600', color: '#333' }}>
                            {(idx + 1).toString().padStart(2, '0')}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button className="pdp-customizer-nav" onClick={() => scrollCustomizer('right')} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><ChevronRight size={16} /></button>
                  </div>
                </div>
              )}
            </div>

            <div className="pdp-options-horizontal-divider"></div>

            <div className="pdp-options-grid-new">
              <div className="pdp-options-left">
                {colors.length > 0 && (
                  <div className="pdp-option-section-new">
                    <div className="pdp-option-title-new">COLOR: <span className="font-normal">{activeColor}</span></div>
                    <div className="pdp-color-swatches-new">
                      {colors.map(color => (
                        <div
                          key={color.name}
                          className={`pdp-color-swatch-new ${activeColor === color.name ? 'active' : ''}`}
                          style={{ backgroundColor: color.hex }}
                          onClick={async (e) => {
                            if (activeColor === color.name) return;

                            const pageX = e.clientX;
                            const pageY = e.clientY;

                            const update = () => {
                              flushSync(() => {
                                setActiveColor(color.name);
                                setActiveImage(0);
                              });
                            };

                            if (!document.startViewTransition) {
                              update();
                              return;
                            }

                            try {
                              const animation = await animateView(update, {
                                duration: 0.4,
                                ease: [0.28, 0.02, 0.1, 0.99],
                              }).new(
                                {
                                  clipPath: [
                                    `circle(0% at ${pageX}px ${pageY}px)`,
                                    `circle(150% at ${pageX}px ${pageY}px)`,
                                  ],
                                },
                                { duration: 0.6, ease: "easeIn" }
                              );
                            } catch (err) {
                              update();
                            }
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pdp-options-right pdp-quantity-section-new">
                <div className="pdp-option-section-new">
                  <div className="pdp-option-title-new">QUANTITY</div>
                  <div className="pdp-qty-wrapper-new">
                    <div className="pdp-qty-controls-new">
                      <button onClick={() => handleQtyChange('dec')}><Minus size={14} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => handleQtyChange('inc')}><Plus size={14} /></button>
                    </div>
                    {product?.stock !== undefined && (
                      <span className="pdp-qty-left-new" style={{ color: product.stock <= (product?.lowStockAlert || 0) ? '#e53e3e' : '#4a5568' }}>
                        <Box size={12} style={{ marginRight: '4px' }} /> Only {product.stock} Left
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pdp-options-horizontal-divider"></div>

            {sizes.length > 0 && (
              <div className="pdp-option-section-new pdp-size-section-new" style={{ marginBottom: '8px' }}>
                <div className="pdp-option-header-new">
                  <div className="pdp-option-title-new">SIZE</div>
                  <button className="pdp-size-guide-btn-new" onClick={() => setShowSizeGuide(true)}>
                    <Ruler size={14} style={{ transform: 'rotate(-45deg)', marginRight: '6px' }} /> Size Guide <ChevronRight size={14} style={{ marginLeft: '2px' }} />
                  </button>
                </div>
                <div className="pdp-size-selector-new">
                  {sizes.map(size => (
                    <button
                      key={size}
                      className={`pdp-size-btn-new ${activeSize === size ? 'active' : ''}`}
                      onClick={() => setActiveSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="pdp-selected-size-text">Selected Size: {activeSize}</div>
              </div>
            )}

            <div className="pdp-options-horizontal-divider" style={{ marginTop: '0' }}></div>

            <div className="pdp-action-buttons" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
              <button
                className="pdp-btn-wishlist-large"
                onClick={() => {
                  if (product) {
                    toggleWishlist(product);
                  }
                }}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 0', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', color: '#8B4513', fontWeight: '600', cursor: 'pointer' }}
              >
                <Heart size={16} fill={isInWishlist(product?.id) ? '#8B4513' : 'none'} color="#8B4513" /> Wishlist
              </button>
              {(activeColorObj ? activeColorObj.inStock : (product?.countInStock > 0)) ? (
                <>
                  {product?.customizable && (
                    <button
                      className="pdp-btn-customize"
                      onClick={() => navigate(`/customize/${product.id}`, { state: { product } })}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 0', background: '#b58d4e', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                    >
                      <Palette size={16} /> Customize
                    </button>
                  )}
                  <button
                    className="pdp-btn-add-cart"
                    onClick={async (e) => {
                      if (isAdded) {
                        navigate('/cart');
                      } else {
                        await handleFlyingCartAnimation(e, 'img', '.pdp-image-section');
                        addToCart({ ...product, selectedColor: activeColor, selectedSize: activeSize, quantity, selectedDesign: activeDesign });
                        message.success(`${product?.title || 'Product'} added to cart!`);
                      }
                    }}
                    style={{ flex: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 0', background: '#8B4513', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                  >
                    <ShoppingCart size={16} /> {isAdded ? "Go to Cart" : "Add to Cart"}
                  </button>
                  <button
                    className="pdp-btn-buy-now"
                    disabled={isBuyNowLoading}
                    onClick={async () => {
                      if (product.sizes && product.sizes.length > 0 && !activeSize) {
                        return message.error('Please select a size');
                      }
                      if (product.colors && product.colors.length > 0 && !activeColor) {
                        return message.error('Please select a color');
                      }
                      if (quantity < 1) {
                        return message.error('Quantity must be at least 1');
                      }

                      setIsBuyNowLoading(true);
                      try {
                        // Assuming axios is used for API calls
                        const response = await fetch('/api/checkout/buy-now', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            productId: product.id || product._id,
                            size: activeSize,
                            color: activeColor,
                            quantity: quantity
                          })
                        });
                        const data = await response.json();

                        if (data.success) {
                          setBuyNowData(data);
                          navigate('/cart');
                        } else {
                          message.error(data.message || 'Failed to initiate checkout');
                        }
                      } catch (error) {
                        console.error('Buy Now Error:', error);
                        message.error('An error occurred during checkout');
                      } finally {
                        setIsBuyNowLoading(false);
                      }
                    }}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 0', background: '#000', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: '600', cursor: isBuyNowLoading ? 'not-allowed' : 'pointer', opacity: isBuyNowLoading ? 0.7 : 1 }}
                  >
                    {isBuyNowLoading ? 'Processing...' : 'Buy Now'}
                  </button>
                </>
              ) : (
                <button
                  className="pdp-btn-notify-me"
                  style={{ flex: 2, padding: '14px 0', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', color: '#333', fontWeight: '600', cursor: 'pointer' }}
                >
                  Notify Me When Available
                </button>
              )}
            </div>

            <div className="pdp-service-highlights" style={{ marginTop: '32px' }}>
              <div className="pdp-service-item">
                <Truck size={20} className="pdp-service-icon" />
                <div>
                  <strong>Free Delivery</strong>
                  <p>For the First order only</p>
                </div>
              </div>
              <div className="pdp-service-item">
                <RefreshCcw size={20} className="pdp-service-icon" />
                <div>
                  <strong>Easy Returns</strong>
                  <p>7 days return policy</p>
                </div>
              </div>
              <div className="pdp-service-item">
                <ShieldCheck size={20} className="pdp-service-icon" />
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Removed Full Width Customizer Section */}

        {/* Removed Sticky Bottom Bar */}

        {/* Tabs Box Section */}
        <div className="pdp-tabs-box">
          <div className="pdp-tabs-header">
            {['description', 'specifications', 'sizeGuide', 'reviews', 'faqs'].map((key) => {
              const labels = {
                description: 'Product Description',
                specifications: 'Specifications',
                sizeGuide: 'Size Guide',
                reviews: (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Customer Reviews {reviews.length > 0 && `(${reviews.length})`}
                    {product?.rating && <span className="pdp-tab-rating-badge"><Star size={10} fill="#E26A2C" color="#E26A2C" /> {product.rating}</span>}
                  </span>
                ),
                faqs: 'Frequently Asked Questions'
              };
              return (
                <button
                  key={key}
                  className={`pdp-tab-btn ${activeTab === key ? 'active' : ''}`}
                  onClick={() => setActiveTab(key)}
                >
                  {labels[key]}
                </button>
              );
            })}
          </div>

          <div className="pdp-tab-content">
            {activeTab === 'description' && (
              <div className="pdp-desc-content pdp-desc-split">
                <div className="pdp-desc-left">
                  <h3 className="pdp-overview-title"><Star size={18} fill="#E26A2C" color="#E26A2C" className="pdp-star-icon-inline" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', transform: 'scale(0.8)' }} /> Product Overview</h3>
                  <p>{product?.description}</p>
                </div>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="pdp-desc-content pdp-desc-split">
                <div className="pdp-desc-left" style={{ flex: 1 }}>
                  <h3 className="pdp-overview-title"><Star size={18} fill="#E26A2C" color="#E26A2C" className="pdp-star-icon-inline" style={{ transform: 'scale(0.8)' }} /> Product Specifications</h3>
                  <ul className="pdp-overview-list">
                    {product?.specifications ? product.specifications.map((spec, idx) => (
                      <li key={idx}><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>{spec.name}:</strong> {spec.value}</li>
                    )) : (
                      <li>No specifications available.</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'sizeGuide' && (
              <div className="pdp-desc-content">
                <h3 className="pdp-overview-title"><Star size={18} fill="#E26A2C" color="#E26A2C" className="pdp-star-icon-inline" style={{ transform: 'scale(0.8)' }} /> Size & Fit Guide</h3>
                <p style={{ color: '#555', fontSize: '14px', marginBottom: '24px' }}>Please refer to the size chart below to find your perfect fit. All measurements are in inches.</p>
                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '16px' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid #F5E6D3' }}>
                        <th style={{ padding: '12px', color: '#222' }}>Size</th>
                        <th style={{ padding: '12px', color: '#222' }}>Bust</th>
                        <th style={{ padding: '12px', color: '#222' }}>Waist</th>
                        <th style={{ padding: '12px', color: '#222' }}>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #F5F5F5' }}><td style={{ padding: '12px', fontWeight: '600', color: '#E26A2C' }}>S</td><td style={{ padding: '12px', color: '#555' }}>34"</td><td style={{ padding: '12px', color: '#555' }}>30"</td><td style={{ padding: '12px', color: '#555' }}>44"</td></tr>
                      <tr style={{ borderBottom: '1px solid #F5F5F5' }}><td style={{ padding: '12px', fontWeight: '600', color: '#E26A2C' }}>M</td><td style={{ padding: '12px', color: '#555' }}>36"</td><td style={{ padding: '12px', color: '#555' }}>32"</td><td style={{ padding: '12px', color: '#555' }}>44"</td></tr>
                      <tr style={{ borderBottom: '1px solid #F5F5F5' }}><td style={{ padding: '12px', fontWeight: '600', color: '#E26A2C' }}>L</td><td style={{ padding: '12px', color: '#555' }}>38"</td><td style={{ padding: '12px', color: '#555' }}>34"</td><td style={{ padding: '12px', color: '#555' }}>44"</td></tr>
                      <tr><td style={{ padding: '12px', fontWeight: '600', color: '#E26A2C' }}>XL</td><td style={{ padding: '12px', color: '#555' }}>40"</td><td style={{ padding: '12px', color: '#555' }}>36"</td><td style={{ padding: '12px', color: '#555' }}>44"</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="pdp-desc-content" style={{ textAlign: 'center', padding: '48px 0' }}>
                <Star size={48} fill="#FFF2E8" color="#E26A2C" strokeWidth={1} style={{ marginBottom: '16px' }} />
                <h3 className="pdp-overview-title" style={{ justifyContent: 'center', marginBottom: '8px' }}>Customer Reviews</h3>
                <p style={{ color: '#777', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>Scroll down to the reviews section below to see what our verified buyers are saying about this product.</p>
              </div>
            )}
            {activeTab === 'faqs' && (
              <div className="pdp-desc-content">
                <h3 className="pdp-overview-title"><Star size={18} fill="#E26A2C" color="#E26A2C" className="pdp-star-icon-inline" style={{ transform: 'scale(0.8)' }} /> Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                  {product?.faqs && product.faqs.length > 0 ? product.faqs.map((faq, idx) => (
                    <div key={idx} style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '20px' }}>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#222', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E26A2C' }}></div> {faq.question}</h4>
                      <p style={{ margin: '0', fontSize: '14px', color: '#666', paddingLeft: '14px' }}>{faq.answer}</p>
                    </div>
                  )) : (
                    <p style={{ color: '#777' }}>No frequently asked questions available for this product.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Redesigned Layout */}
        <div className="pdp-reviews-redesigned-section" id="reviews-section">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ width: '40px', height: '1px', background: '#b58d4e' }}></span>
              <Leaf size={14} color="#b58d4e" />
              <span style={{ color: '#b58d4e', fontSize: '13px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase' }}>WHAT OUR CUSTOMERS SAY</span>
              <span style={{ width: '40px', height: '1px', background: '#b58d4e' }}></span>
            </div>
            <h2 style={{ fontSize: '32px', fontWeight: '800', margin: '0', fontFamily: '"Inter", sans-serif', letterSpacing: '-1px' }}>
              <span style={{ color: '#4a3f35' }}>Customer</span> <span style={{ color: '#b58d4e' }}>Reviews</span>
            </h2>
          </div>

          {/* Container 1: Summary */}
          <div className="pdp-reviews-new-summary">
            <div className="pdp-rns-score-col">
              <div className="pdp-rns-score-wrap">
                <span className="pdp-rns-big-score">{ratingSummary?.averageRating || product?.rating || 0}</span>
              </div>
              <div className="pdp-rns-stars">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill={(ratingSummary?.averageRating || product?.rating || 0) >= i ? "#C89953" : "none"} color="#C89953" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />)}
              </div>
              <div className="pdp-summary-divider" style={{ width: '60%', margin: '16px auto' }}>
                <div className="pdp-diamond" style={{ width: '6px', height: '6px', background: '#C89953', border: 'none' }}></div>
              </div>
              <span className="pdp-rns-based-on">Based on {ratingSummary?.totalReviews || product?.reviews || 0} Reviews</span>
            </div>

            <div className="pdp-rns-badge-divider" style={{ margin: '0' }}></div>

            <div className="pdp-rns-bars-col">
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratingSummary?.ratingBreakdown?.[star] || 0;
                const total = ratingSummary?.totalReviews || 1;
                const pct = ratingSummary?.totalReviews ? `${(count / total) * 100}%` : '0%';
                return (
                <div className="pdp-rns-bar-row" key={star}>
                  <span className="pdp-rns-bar-label">{star} <Star size={10} fill="#C89953" color="#C89953" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} /></span>
                  <div className="pdp-rns-progress-track">
                    <div className="pdp-rns-progress-fill" style={{ width: pct }}></div>
                  </div>
                  <span className="pdp-rns-bar-count">{count}</span>
                </div>
              )})}
            </div>

            <div className="pdp-rns-badge-divider"></div>

            <div className="pdp-rns-badge-item">
              <div className="pdp-rns-badge-icon"><Award size={28} color="#C89953" strokeWidth={1.5} /></div>
              <div className="pdp-diamond" style={{ marginBottom: '12px', width: '6px', height: '6px', background: '#C89953', border: 'none' }}></div>
              <span className="pdp-rns-badge-title">Quality You Can Trust</span>
              <span className="pdp-rns-badge-desc">Real experiences from<br />real customers</span>
            </div>

            <div className="pdp-rns-badge-divider"></div>

            <div className="pdp-rns-badge-item">
              <div className="pdp-rns-badge-icon"><Heart size={28} color="#C89953" strokeWidth={1.5} /></div>
              <div className="pdp-diamond" style={{ marginBottom: '12px', width: '6px', height: '6px', background: '#C89953', border: 'none' }}></div>
              <span className="pdp-rns-badge-title">Loved by Thousands</span>
              <span className="pdp-rns-badge-desc">Join thousands of happy<br />customers</span>
            </div>

            <div className="pdp-rns-badge-divider"></div>

            <div className="pdp-rns-right">
              <button
                className="pdp-rns-write-btn"
                onClick={() => setIsReviewModalOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #111 0%, #333 100%)',
                  borderRadius: '30px',
                  padding: '12px 24px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  fontSize: '13px',
                  letterSpacing: '0.5px'
                }}
              >
                <Edit2 size={16} /> Write a Review
              </button>
              <a href="#" className="pdp-rns-verify-link">How are reviews verified? <Info size={14} /></a>
            </div>
          </div>

          {/* Container 3: Review Cards */}
          <div className="pdp-reviews-new-cards">
            <div className="pdp-rnc-header" style={{ marginBottom: '24px' }}>
              <div className="pdp-rnc-title-group">
                <h3>What Customers Are Saying</h3>
              </div>
              <a href="#" className="pdp-rnc-view-more">View All Reviews <ArrowRight size={14} /></a>
            </div>
            <div className="pdp-rnc-scroll">
              {reviews.map((review) => (
                <div className="pdp-rnc-card" key={review.id}>
                  {/* Header: Avatar & Name & Menu */}
                  <div className="pdp-rnc-header-user" style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={review.avatar} alt="Avatar" className="pdp-rnc-user-avatar" />
                      <span className="pdp-rnc-user-name-new">{review.name}</span>
                    </div>
                    {currentUser && (currentUser._id === review.userId || currentUser.id === review.userId) && (
                      <div style={{ position: 'relative' }}>
                        <button 
                          onClick={() => setActiveReviewMenu(activeReviewMenu === review.id ? null : review.id)}
                          style={{ 
                            background: activeReviewMenu === review.id ? '#f0f0f0' : 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            color: activeReviewMenu === review.id ? '#111' : '#888', 
                            padding: '6px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f5f5f5'; e.currentTarget.style.color = '#111'; }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = activeReviewMenu === review.id ? '#f0f0f0' : 'transparent'; e.currentTarget.style.color = activeReviewMenu === review.id ? '#111' : '#888'; }}
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {activeReviewMenu === review.id && (
                          <div style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '12px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
                            zIndex: 10,
                            overflow: 'hidden',
                            minWidth: '120px',
                            marginTop: '8px',
                            padding: '4px'
                          }}>
                            <button 
                              onClick={() => {
                                handleDeleteReview(review.id);
                                setActiveReviewMenu(null);
                              }}
                              style={{ 
                                background: 'transparent', 
                                border: 'none', 
                                color: '#e53e3e', 
                                fontSize: '13px', 
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '10px 12px',
                                width: '100%',
                                textAlign: 'left',
                                borderRadius: '8px',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fff5f5'; e.currentTarget.style.color = '#c53030'; }}
                              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#e53e3e'; }}
                            >
                              <Trash2 size={15} /> Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Meta: Rating Pill & Date */}
                  <div className="pdp-rnc-meta-new">
                    <div className="pdp-rnc-rating-pill">
                      {Number(review.rating).toFixed(1)} <Star size={12} fill="#fff" color="#fff" />
                    </div>
                    <span className="pdp-rnc-date-new">• Posted on {review.date}</span>
                  </div>

                  {/* Text */}
                  <p className="pdp-rnc-text-new">
                    {review.title && <strong style={{ color: '#111' }}>{review.title} <br/> </strong>}
                    {review.content}
                  </p>

                  {/* Images */}
                  {review.image && (
                    <div className="pdp-rnc-images-new">
                      <Image 
                        src={review.image} 
                        alt="Review attachment" 
                        width={80} 
                        height={80} 
                        style={{ objectFit: 'cover', borderRadius: '8px', border: '1px solid #EAEAEA' }}
                      />
                    </div>
                  )}

                    {/* Helpful */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                    <div 
                      className="pdp-rnc-helpful-new" 
                      onClick={() => handleHelpfulClick(review.id, review.hasVotedHelpful)}
                      style={{ cursor: review.hasVotedHelpful ? 'default' : 'pointer', margin: 0 }}
                    >
                      <ThumbsUp 
                        size={18} 
                        fill={review.hasVotedHelpful ? "#03A685" : "#707684"} 
                        color={review.hasVotedHelpful ? "#03A685" : "#707684"} 
                        className="pdp-rnc-helpful-icon" 
                      />
                      <span style={{ color: review.hasVotedHelpful ? "#03A685" : "#707684" }}>
                        Helpful ({review.helpfulCount})
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pdp-rnc-dots">
              <span className="pdp-rnc-dot active"></span>
              <span className="pdp-rnc-dot"></span>
              <span className="pdp-rnc-dot"></span>
              <span className="pdp-rnc-dot"></span>
              <span className="pdp-rnc-dot"></span>
            </div>
          </div>
        </div>

        {/* Limited Offers */}
        <div className="pdp-carousel-section pdp-limited-offers-section">
          <div className="pdp-lo-header">
            <h2 className="pdp-lo-title">
              <span className="pdp-title-dark">Similar</span> <span className="pdp-title-gold">Products</span>
            </h2>
          </div>
          <div className="pdp-carousel-grid-container similar-products-carousel">
            <div className="pdp-carousel-grid">
              {similarProducts.map((prod) => (
                <SimilarProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => navigate(`/product/${p.id}`, { state: { product: p } })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="pdp-modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="pdp-modal-content" onClick={e => e.stopPropagation()}>
            <div className="pdp-modal-header">
              <h2>Size Guide</h2>
              <button className="pdp-modal-close" onClick={() => setShowSizeGuide(false)}>×</button>
            </div>
            <div className="pdp-modal-body">
              <p className="pdp-modal-desc">Please use the table below to find your perfect fit. Measurements are in inches.</p>
              <div className="pdp-table-container">
                <table className="pdp-size-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Bust</th>
                      <th>Waist</th>
                      <th>Hips</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>XS</td><td>32&quot;</td><td>26&quot;</td><td>34&quot;</td></tr>
                    <tr><td>S</td><td>34&quot;</td><td>28&quot;</td><td>36&quot;</td></tr>
                    <tr><td>M</td><td>36&quot;</td><td>30&quot;</td><td>38&quot;</td></tr>
                    <tr><td>L</td><td>38&quot;</td><td>32&quot;</td><td>40&quot;</td></tr>
                    <tr><td>XL</td><td>40&quot;</td><td>34&quot;</td><td>42&quot;</td></tr>
                    <tr><td>XXL</td><td>42&quot;</td><td>36&quot;</td><td>44&quot;</td></tr>
                  </tbody>
                </table>
              </div>
              <div className="pdp-how-to-measure">
                <h3>How to Measure</h3>
                <ul>
                  <li><strong>Bust:</strong> Measure under your arms around the fullest part of your bust.</li>
                  <li><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</li>
                  <li><strong>Hips:</strong> Measure around the fullest part of your hips.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="pdp-review-modal-overlay" onClick={() => setIsReviewModalOpen(false)}>
          <div className="pdp-review-modal" onClick={e => e.stopPropagation()}>
            <div className="pdp-review-modal-header">
              <h3>Write a Review</h3>
              <button className="pdp-review-modal-close" onClick={() => setIsReviewModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <form className="pdp-review-form" onSubmit={handleSubmitReview}>
              <div className="pdp-review-form-group">
                <label>Overall Rating</label>
                <div className="pdp-review-star-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={28}
                      className="pdp-interactive-star"
                      fill={(hoveredStar || reviewForm.rating) >= star ? '#C89953' : 'transparent'}
                      color={(hoveredStar || reviewForm.rating) >= star ? '#C89953' : '#CCC'}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    />
                  ))}
                </div>
              </div>

              <div className="pdp-review-form-group">
                <label>Review Title</label>
                <input
                  type="text"
                  placeholder="Summary of your experience"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  required
                />
              </div>

              <div className="pdp-review-form-group">
                <label>Your Review</label>
                <textarea
                  placeholder="Tell us what you liked or disliked..."
                  rows={4}
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  required
                ></textarea>
              </div>

              <div className="pdp-review-form-group">
                <label>Add a Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handlePhotoUpload}
                />
                <div
                  className="pdp-review-photo-upload"
                  onClick={() => fileInputRef.current?.click()}
                  style={reviewForm.image ? { padding: '8px' } : {}}
                >
                  {reviewForm.image ? (
                    <div style={{ position: 'relative', width: '100%', textAlign: 'center' }}>
                      <img src={reviewForm.image} alt="Preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '4px' }} />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setReviewForm({ ...reviewForm, image: null }); fileInputRef.current.value = ""; }}
                        style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer' }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Camera size={24} color="#888" />
                      <span>Click to upload image</span>
                    </>
                  )}
                </div>
              </div>

              <button type="submit" className="pdp-review-submit-btn">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
