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
  Camera, MessageCircle, Edit2, Info, Award, X, Leaf, ArrowDown, Zap, Sparkles, RotateCcw, CheckCircle,
  Flower2, Mountain, Feather, Flame, Rocket, Compass, Send, Headphones, Palmtree, Upload
} from 'lucide-react';
import CustomerReviews from './CustomerReviews';
import './ProductDetail.css';


import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { handleFlyingCartAnimation } from '../utils/cartAnimation';
import { uploadDesign } from '../services/customDesignService';
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
  const DESIGN_COLORS = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#008000', '#FFFF00', '#FFC0CB', '#808080'];
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
  const [activeDesign, setActiveDesign] = useState(null);
  const [activeDesignColor, setActiveDesignColor] = useState('#000000');
  const [showRgbPicker, setShowRgbPicker] = useState(false);
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });
  const [colorizeImage, setColorizeImage] = useState(false);

  const [activePosition, setActivePosition] = useState('front');
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    if (product?.customizable && product?.designs?.length > 0) {
      if (!activeDesign || !product.designs.some(d => d.id === activeDesign.id)) {
        setActiveDesign(product.designs[0]);
      }
    }
  }, [product?.customizable, product?.designs]);

  const isAdded = product ? cartItems.some(item => item.id === product.id) : false;

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', content: '', image: null });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [reviews, setReviews] = useState([]);
  const fileInputRef = useRef(null);
  const customizerScrollRef = useRef(null);

  const [ratingSummary, setRatingSummary] = useState(null);

  const fetchReviewsData = (targetId) => {
    const idToFetch = targetId || product?._id || product?.id || productId;
    if (!idToFetch) return;

    getProductReviewsApi(idToFetch)
      .then(res => {
        if (res.data && res.data.success) {
          const fetchedReviews = res.data.data.map(r => ({
            id: r._id,
            userId: r.user?._id || r.user,
            name: r.user?.fullName || r.user?.name || 'Customer',
            avatar: r.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user?.fullName || r.user?.name || 'Customer')}&background=fef3c7&color=d97706&size=100`,
            purchased: product?.title || "Product",
            rating: r.rating,
            title: r.title || '',
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

    getProductRatingSummaryApi(idToFetch)
      .then(res => {
        if (res.data && res.data.success) {
          setRatingSummary(res.data);
        }
      })
      .catch(err => console.error("Error fetching rating summary:", err));
  };

  useEffect(() => {
    if (productId || product?._id || product?.id) {
      fetchReviewsData(product?._id || product?.id || productId);
    }
  }, [productId, product?._id, product?.id, product?.title]);

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
    const token = localStorage.getItem('token');
    if (!token) {
      message.warning('Please log in to submit a review');
      navigate('/login');
      return;
    }

    if (!reviewForm.rating || Number(reviewForm.rating) <= 0) {
      message.warning('Please select a star rating between 1 and 5');
      return;
    }

    if (!reviewForm.content || !reviewForm.content.trim()) {
      message.warning('Please enter your review comments');
      return;
    }

    try {
      const actualProdId = product?._id || product?.id || productId;
      const formData = new FormData();
      formData.append('productId', actualProdId);
      formData.append('rating', Number(reviewForm.rating));
      formData.append('title', reviewForm.title || '');
      formData.append('comment', reviewForm.content.trim());
      if (reviewForm.file) {
        formData.append('images', reviewForm.file);
      }

      const res = await createReviewApi(formData);
      if (res.data && res.data.success) {
        message.success(res.data.message || 'Review submitted successfully!');
        setIsReviewModalOpen(false);
        setReviewForm({ rating: 0, title: '', content: '', image: null, file: null });
        // Immediately refresh reviews and rating summary on the page
        fetchReviewsData(actualProdId);
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
    const isShoe = currentTitle.includes('shoe') || currentTitle.includes('sneaker') || currentTitle.includes('footwear');

    return contextProducts.filter(p => {
      if (p.id === product.id) return false;

      const pCat = (p.category?.name || p.category || 'Uncategorized').toLowerCase();
      const currCat = (product.category?.name || product.category || 'Uncategorized').toLowerCase();
      const sameCategory = (p.categoryId === product.categoryId && p.categoryId) || (pCat === currCat && pCat !== 'uncategorized');
      
      const pTitle = (p.title || '').toLowerCase();
      let keywordMatch = true;

      if (isKurti) {
        keywordMatch = pTitle.includes('kurti') || pTitle.includes('kurta');
      } else if (isTshirt) {
        keywordMatch = pTitle.includes('t-shirt') || pTitle.includes('tshirt') || pTitle.includes('shirt') || pTitle.includes('top');
      } else if (isDress) {
        keywordMatch = pTitle.includes('dress');
      } else if (isShoe) {
        keywordMatch = pTitle.includes('shoe') || pTitle.includes('sneaker') || pTitle.includes('footwear');
      } else {
        if (pCat === 'uncategorized' && currCat === 'uncategorized') {
           const firstWord = currentTitle.split(' ')[0];
           keywordMatch = firstWord ? pTitle.includes(firstWord) : false;
        }
      }

      return sameCategory || keywordMatch;
    }).slice(0, 4);
  }, [contextProducts, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveDesign(null);
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
      <div className="pdp-page-wrapper">
        <div className="pdp-breadcrumbs">
          <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
          {product?.category && (
            <>
              <ChevronRight size={12} />
              <span>{typeof product.category === 'object' ? product.category.name : product.category}</span>
            </>
          )}
          {product?.subCategory && (
            <>
              <ChevronRight size={12} />
              <span>{product.subCategory}</span>
            </>
          )}
          <ChevronRight size={12} />
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
                      <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: '35%', mixBlendMode: 'multiply', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {activeDesign && !activeDesign?.isBaseImage && (
                          activeDesign.icon ? (
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                              {colorizeImage && activeDesignColor !== '#000000' ? (
                                <div style={{
                                  width: '100%', height: '100%',
                                  backgroundColor: activeDesignColor,
                                  WebkitMaskImage: `url(${activeDesign.icon})`,
                                  WebkitMaskSize: 'contain',
                                  WebkitMaskPosition: 'center',
                                  WebkitMaskRepeat: 'no-repeat',
                                  maskImage: `url(${activeDesign.icon})`,
                                  maskSize: 'contain',
                                  maskPosition: 'center',
                                  maskRepeat: 'no-repeat'
                                }} title={activeDesign.name} />
                              ) : (
                                <>
                                  <img src={activeDesign.icon} alt={activeDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                  {activeDesignColor && activeDesignColor !== '#000000' && (
                                    <div style={{
                                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                      backgroundColor: activeDesignColor,
                                      mixBlendMode: 'screen',
                                      pointerEvents: 'none',
                                      WebkitMaskImage: `url(${activeDesign.icon})`,
                                      WebkitMaskSize: 'contain',
                                      WebkitMaskPosition: 'center',
                                      WebkitMaskRepeat: 'no-repeat',
                                      maskImage: `url(${activeDesign.icon})`,
                                      maskSize: 'contain',
                                      maskPosition: 'center',
                                      maskRepeat: 'no-repeat'
                                    }} />
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            (() => {
                              const iconKey = (activeDesign.iconName || activeDesign.name || '').toLowerCase();
                              let IconComp = null;
                              if (iconKey.includes('flower')) IconComp = Flower2;
                              else if (iconKey.includes('mountain')) IconComp = Mountain;
                              else if (iconKey.includes('feather')) IconComp = Feather;
                              else if (iconKey.includes('flame')) IconComp = Flame;
                              else if (iconKey.includes('rocket')) IconComp = Rocket;
                              else if (iconKey.includes('compass')) IconComp = Compass;
                              else if (iconKey.includes('send') || iconKey.includes('paper')) IconComp = Send;
                              else if (iconKey.includes('headphone')) IconComp = Headphones;
                              else if (iconKey.includes('palm') || iconKey.includes('tree')) IconComp = Palmtree;

                              return IconComp ? <IconComp size={64} color={activeDesignColor} strokeWidth={1.5} /> : null;
                            })()
                          )
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
                    <Heart size={18} fill={isInWishlist(product?.id) ? 'var(--primary-color)' : 'none'} color={isInWishlist(product?.id) ? 'var(--primary-color)' : '#666'} />
                  </button>

                  <button className="pdp-nav-btn pdp-prev" onClick={prevImage}><ChevronLeft size={20} /></button>
                  <div style={{ width: '100%', height: '100%', transition: 'transform 0.1s ease-out', ...zoomStyle }}>
                    <img src={displayImages[activeImage]} alt="Main Product" className="pdp-main-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {product?.customizable && (
                      <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: '35%', mixBlendMode: 'multiply', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {activeDesign && !activeDesign?.isBaseImage && (
                          activeDesign.icon ? (
                            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                              {colorizeImage && activeDesignColor !== '#000000' ? (
                                <div style={{
                                  width: '100%', height: '100%',
                                  backgroundColor: activeDesignColor,
                                  WebkitMaskImage: `url(${activeDesign.icon})`,
                                  WebkitMaskSize: 'contain',
                                  WebkitMaskPosition: 'center',
                                  WebkitMaskRepeat: 'no-repeat',
                                  maskImage: `url(${activeDesign.icon})`,
                                  maskSize: 'contain',
                                  maskPosition: 'center',
                                  maskRepeat: 'no-repeat'
                                }} title={activeDesign.name} />
                              ) : (
                                <>
                                  <img src={activeDesign.icon} alt={activeDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                  {activeDesignColor && activeDesignColor !== '#000000' && (
                                    <div style={{
                                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                      backgroundColor: activeDesignColor,
                                      mixBlendMode: 'screen',
                                      pointerEvents: 'none',
                                      WebkitMaskImage: `url(${activeDesign.icon})`,
                                      WebkitMaskSize: 'contain',
                                      WebkitMaskPosition: 'center',
                                      WebkitMaskRepeat: 'no-repeat',
                                      maskImage: `url(${activeDesign.icon})`,
                                      maskSize: 'contain',
                                      maskPosition: 'center',
                                      maskRepeat: 'no-repeat'
                                    }} />
                                  )}
                                </>
                              )}
                            </div>
                          ) : (
                            (() => {
                              const iconKey = (activeDesign.iconName || activeDesign.name || '').toLowerCase();
                              let IconComp = null;
                              if (iconKey.includes('flower')) IconComp = Flower2;
                              else if (iconKey.includes('mountain')) IconComp = Mountain;
                              else if (iconKey.includes('feather')) IconComp = Feather;
                              else if (iconKey.includes('flame')) IconComp = Flame;
                              else if (iconKey.includes('rocket')) IconComp = Rocket;
                              else if (iconKey.includes('compass')) IconComp = Compass;
                              else if (iconKey.includes('send') || iconKey.includes('paper')) IconComp = Send;
                              else if (iconKey.includes('headphone')) IconComp = Headphones;
                              else if (iconKey.includes('palm') || iconKey.includes('tree')) IconComp = Palmtree;

                              return IconComp ? <IconComp size={140} color={activeDesignColor} strokeWidth={1.5} /> : null;
                            })()
                          )
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

            {/* Brand, Badges, SKU Header */}
            <div className="pdp-luxury-header-row">
              <div className="pdp-brand-tag">
                <span className="pdp-brand-name">{product?.brand || 'PREMIUM SELECTION'}</span>
              </div>
              {product?.badge && (
                <div className="pdp-luxury-badge-pill">
                  <Sparkles size={13} className="pdp-badge-sparkle" /> {product.badge}
                </div>
              )}
              {product?.sku && (
                <span className="pdp-sku-pill">SKU: {product.sku}</span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="pdp-luxury-product-title">{product?.title}</h1>

            {/* Rating & Social Proof Bar */}
            <div
              className="pdp-luxury-rating-bar"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <div className="pdp-rating-stars-badge">
                <Star size={14} fill="#C89953" color="#C89953" />
                <span className="pdp-rating-score-bold">{Number(product?.rating || 5).toFixed(1)}</span>
              </div>
              <span className="pdp-rating-reviews-count">({product?.reviews || product?.numReviews || 1} Customer Reviews)</span>
              <span className="pdp-rating-sep">•</span>
              <span className="pdp-sold-badge-pill">
                <CheckCircle size={13} color="#059669" /> {product?.soldCount ? `${product.soldCount} Sold` : 'Verified Quality'}
              </span>
            </div>

            {/* Luxury Price Presentation Card */}
            <div className="pdp-luxury-price-card">
              <div className="pdp-price-primary-row">
                <div className="pdp-price-amount-wrap">
                  <span className="pdp-luxury-currency">₹</span>
                  <span className="pdp-luxury-current-price">
                    {typeof product?.price === 'number'
                      ? product.price.toLocaleString('en-IN')
                      : (product?.price?.toString().replace(/[^\d.]/g, '') || '0')}
                  </span>
                </div>

                {product?.originalPrice && (
                  <span className="pdp-luxury-original-price">
                    {product.originalPrice.toString().startsWith('₹') ? product.originalPrice : `₹${product.originalPrice}`}
                  </span>
                )}

                {product?.discount && (
                  <div className="pdp-luxury-discount-tag">
                    <Zap size={13} fill="#d97706" color="#d97706" /> {product.discount}
                  </div>
                )}
              </div>

              <div className="pdp-price-sub-row">
                <span className="pdp-tax-notice">Inclusive of all taxes</span>
                <span className="pdp-price-dot">•</span>
                <span className="pdp-delivery-notice">🚚 Free Express Delivery Available</span>
              </div>
            </div>

            {/* Stock Status Bar */}
            <div className="pdp-luxury-stock-bar">
              <div className="pdp-stock-indicator">
                <span className="pdp-pulse-dot"></span>
                <span className="pdp-stock-text">
                  {(product?.stock > 0 || product?.countInStock > 0 || product?.stock === undefined)
                    ? 'In Stock — Ready for Immediate Dispatch'
                    : 'Currently Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description & Tags */}
            {product?.description && (
              <div className="pdp-luxury-description">
                <p>{product.description}</p>
                {product?.tags && product.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {product.tags.map(tag => (
                      <span key={tag} style={{ background: '#f5efe6', color: '#8f6c34', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600' }}>#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Customizer Option (If product is customizable) */}
            {product?.customizable && (
              <div className="pdp-right-col-customizer" style={{ marginBottom: '20px' }}>
                <div className="pdp-customizer-header" style={{ padding: '0', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#1a1614' }}>CHOOSE YOUR DESIGN</h3>
                </div>
                <div className="pdp-customizer-designs" style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button className="pdp-customizer-nav" onClick={() => scrollCustomizer('left')} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><ChevronLeft size={16} /></button>
                  <div ref={customizerScrollRef} className="pdp-customizer-designs-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollbarWidth: 'none', flex: 1, padding: '4px' }}>
                    {product.designs.map((design, idx) => (
                      <div
                        key={design.id}
                        className={`pdp-design-option-full ${activeDesign?.id === design.id ? 'active' : ''}`}
                        onClick={() => setActiveDesign(design)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer',
                          minWidth: '65px', padding: '10px 6px', borderRadius: '10px',
                          background: activeDesign?.id === design.id ? '#faf5eb' : '#fff',
                          border: activeDesign?.id === design.id ? '1.5px solid var(--primary-color)' : '1px solid #e5e7eb',
                          position: 'relative',
                          boxShadow: activeDesign?.id === design.id ? '0 2px 8px rgba(var(--primary-color-rgb),0.2)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        {activeDesign?.id === design.id && (
                          <div style={{
                            position: 'absolute', top: '-5px', right: '-5px', background: 'var(--primary-color)',
                            borderRadius: '50%', width: '16px', height: '16px', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', color: '#fff', zIndex: 2
                          }}>
                            <Check size={10} strokeWidth={3} />
                          </div>
                        )}
                        <div style={{ width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                              const iconKey = (design.iconName || design.name || '').toLowerCase();
                              let IconComp = null;
                              if (iconKey.includes('flower')) IconComp = Flower2;
                              else if (iconKey.includes('mountain')) IconComp = Mountain;
                              else if (iconKey.includes('feather')) IconComp = Feather;
                              else if (iconKey.includes('flame')) IconComp = Flame;
                              else if (iconKey.includes('rocket')) IconComp = Rocket;
                              else if (iconKey.includes('compass')) IconComp = Compass;
                              else if (iconKey.includes('send') || iconKey.includes('paper')) IconComp = Send;
                              else if (iconKey.includes('headphone')) IconComp = Headphones;
                              else if (iconKey.includes('palm') || iconKey.includes('tree')) IconComp = Palmtree;

                              return IconComp ? <IconComp size={26} color={design.iconColor || '#000'} strokeWidth={1.5} /> : <span style={{ fontSize: '10px' }}>{design.name?.substring(0, 4)}</span>;
                            })()
                          )}
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#333' }}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="pdp-customizer-nav" onClick={() => scrollCustomizer('right')} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><ChevronRight size={16} /></button>
                </div>

                {/* Design Color Picker */}
                {activeDesign && (
                  <div style={{ marginTop: '16px', padding: '0', animation: 'fadeIn 0.3s ease-in-out' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#1a1614' }}>DESIGN COLOR :</h3>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {/* Standard colors */}
                      {['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#008000', '#FFFF00', '#FFC0CB', '#808080'].map(color => (
                        <button
                          key={color}
                          onClick={() => { setActiveDesignColor(color); setShowRgbPicker(false); }}
                          style={{
                            width: '28px', height: '28px', borderRadius: '50%',
                            backgroundColor: color,
                            cursor: 'pointer',
                            border: color === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                            outline: activeDesignColor === color && !showRgbPicker ? '2px solid var(--primary-color)' : 'none',
                            outlineOffset: '2px',
                            padding: 0
                          }}
                          title={`Color: ${color}`}
                        />
                      ))}
                      {/* Custom RGB Color Picker Toggle */}
                      <button
                        onClick={() => setShowRgbPicker(!showRgbPicker)}
                        style={{
                          width: '28px', height: '28px', borderRadius: '50%',
                          background: 'linear-gradient(to right, #ff0000, #00ff00, #0000ff)',
                          cursor: 'pointer',
                          border: showRgbPicker ? '2px solid var(--primary-color)' : '1px solid #ccc',
                          padding: 0
                        }}
                        title="Custom RGB Color"
                      />

                      {/* Reset Button */}
                      <button
                        onClick={() => { setActiveDesignColor('#000000'); setShowRgbPicker(false); setRgbColor({ r: 0, g: 0, b: 0 }); }}
                        style={{ fontSize: '11px', fontWeight: '600', padding: '6px 10px', borderRadius: '4px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#333' }}
                      >
                        Reset
                      </button>
                    </div>

                    {/* Colorize Image Toggle */}
                    {activeDesign.icon && (
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', gap: '6px', fontSize: '11px', fontWeight: '600', color: '#444' }}>
                          <input
                            type="checkbox"
                            checked={colorizeImage}
                            onChange={(e) => setColorizeImage(e.target.checked)}
                            style={{ accentColor: 'var(--primary-color)', cursor: 'pointer' }}
                          />
                          Colorize Image (Transparent logos only)
                        </label>
                      </div>
                    )}

                    {/* RGB Sliders */}
                    {showRgbPicker && (
                      <div style={{ marginTop: '16px', padding: '16px', background: '#faf5eb', borderRadius: '10px', border: '1px solid #f0e6d2' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          {['r', 'g', 'b'].map((channel) => (
                            <div key={channel} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span style={{ width: '16px', fontWeight: '800', fontSize: '12px', color: channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6', textTransform: 'uppercase' }}>{channel}</span>
                              <input
                                type="range"
                                min="0" max="255"
                                value={rgbColor[channel]}
                                onChange={(e) => {
                                  const newRgb = { ...rgbColor, [channel]: parseInt(e.target.value) };
                                  setRgbColor(newRgb);
                                  setActiveDesignColor(`#${(1 << 24 | newRgb.r << 16 | newRgb.g << 8 | newRgb.b).toString(16).slice(1)}`);
                                }}
                                style={{ flex: 1, accentColor: channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6' }}
                              />
                              <span style={{ width: '30px', fontSize: '12px', fontWeight: '600', color: '#444', textAlign: 'right' }}>{rgbColor[channel]}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            )}

            {/* Color Swatches */}
            {colors.length > 0 && (
              <div className="pdp-luxury-option-card">
                <div className="pdp-luxury-option-header">
                  <span className="pdp-opt-label">COLOR:</span>
                  <span className="pdp-opt-val">{activeColor}</span>
                </div>
                <div className="pdp-luxury-swatches">
                  {colors.map(color => (
                    <button
                      key={color.name}
                      className={`pdp-luxury-swatch ${activeColor === color.name ? 'active' : ''}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
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
                          await animateView(update, {
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
                    >
                      {activeColor === color.name && <Check size={12} color={color.hex === '#fff' || color.hex === '#ffffff' ? '#000' : '#fff'} strokeWidth={3} />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Size Selection Container */}
            <div className="pdp-options-selection-grid">
              {/* Quantity */}
              <div className="pdp-luxury-qty-card">
                <div>
                  <span className="pdp-opt-label">QUANTITY</span>
                  {product?.stock !== undefined && (
                    <div style={{ fontSize: '11px', color: product.stock <= (product?.lowStockAlert || 5) ? '#e53e3e' : '#6b7280', marginTop: '2px', fontWeight: '600' }}>
                      Only {product.stock} units available
                    </div>
                  )}
                </div>
                <div className="pdp-luxury-stepper">
                  <button className="pdp-step-btn" onClick={() => handleQtyChange('dec')}>
                    <Minus size={14} />
                  </button>
                  <span className="pdp-step-count">{quantity}</span>
                  <button className="pdp-step-btn" onClick={() => handleQtyChange('inc')}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Sizes */}
              {sizes.length > 0 && (
                <div className="pdp-luxury-size-card">
                  <div className="pdp-luxury-size-header">
                    <span className="pdp-opt-label">SELECT SIZE: <span style={{ color: 'var(--primary-color)', textTransform: 'none' }}>{activeSize}</span></span>
                    <button className="pdp-luxury-guide-btn" onClick={() => setShowSizeGuide(true)}>
                      <Ruler size={13} style={{ transform: 'rotate(-45deg)' }} /> Size Guide
                    </button>
                  </div>
                  <div className="pdp-luxury-size-grid">
                    {sizes.map(size => (
                      <button
                        key={size}
                        className={`pdp-luxury-size-pill ${activeSize === size ? 'active' : ''}`}
                        onClick={() => setActiveSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Action Buttons */}
            <div className="pdp-luxury-cta-group">
              <button
                className="pdp-luxury-btn-wishlist"
                onClick={() => {
                  if (product) {
                    toggleWishlist(product);
                  }
                }}
                title="Save to Wishlist"
              >
                <Heart size={20} fill={isInWishlist(product?.id) ? 'var(--primary-color)' : 'none'} color={isInWishlist(product?.id) ? 'var(--primary-color)' : '#4b5563'} />
              </button>

              {(activeColorObj ? activeColorObj.inStock : (product?.countInStock > 0 || product?.stock === undefined)) ? (
                <>

                  <button
                    className="pdp-luxury-btn-cart"
                    onClick={async (e) => {
                      if (isAdded) {
                        navigate('/cart');
                      } else {
                        await handleFlyingCartAnimation(e, 'img', '.pdp-image-section');
                        addToCart({ ...product, selectedColor: activeColor, selectedSize: activeSize, quantity, selectedDesign: activeDesign, selectedDesignColor: activeDesignColor, colorizeImage });
                        message.success(`${product?.title || 'Product'} added to cart!`);
                      }
                    }}
                  >
                    <ShoppingBag size={18} /> {isAdded ? "Go to Cart" : "Add to Cart"}
                  </button>
                  <button
                    className="pdp-luxury-btn-buy"
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
                        const buyNowItem = {
                          ...product,
                          selectedColor: activeColor,
                          selectedSize: activeSize,
                          quantity: quantity,
                          selectedDesign: activeDesign,
                          selectedDesignColor: activeDesignColor,
                          colorizeImage
                        };
                        
                        setBuyNowData(buyNowItem);
                        navigate('/cart');
                      } catch (error) {
                        console.error('Buy Now Error:', error);
                        message.error('An error occurred during checkout');
                      } finally {
                        setIsBuyNowLoading(false);
                      }
                    }}
                  >
                    <Zap size={17} /> {isBuyNowLoading ? 'Processing...' : 'Buy Now'}
                  </button>
                </>
              ) : (
                <button
                  className="pdp-btn-notify-me"
                  style={{ flex: 2, padding: '14px 0', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '12px', color: '#333', fontWeight: '600', cursor: 'pointer' }}
                >
                  Notify Me When Available
                </button>
              )}
            </div>

            <div className="pdp-service-highlights" style={{ marginTop: '24px' }}>
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
            {[
              { key: 'description', label: 'Description', show: Boolean(product?.description) },
              { key: 'specifications', label: 'Specifications', show: Boolean(product?.specifications && product.specifications.length > 0) },
              { key: 'sizeGuide', label: 'Size Guide', show: Boolean(sizes.length > 0) },
              { key: 'faqs', label: 'FAQs', show: Boolean(product?.faqs && product.faqs.length > 0) },
            ].filter(t => t.show).map((tab) => (
              <button
                key={tab.key}
                className={`pdp-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="pdp-tab-content">
            {activeTab === 'description' && product?.description && (
              <div className="pdp-desc-content">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'specifications' && product?.specifications && product.specifications.length > 0 && (
              <div className="pdp-desc-content">
                <ul className="pdp-overview-list">
                  {product.specifications.map((spec, idx) => (
                    <li key={idx}><strong>{spec.name}:</strong> {spec.value}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'sizeGuide' && sizes.length > 0 && (
              <div className="pdp-desc-content">
                <div style={{ overflowX: 'auto', background: '#fff', borderRadius: '8px', border: '1px solid #eee', padding: '12px' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <th style={{ padding: '8px' }}>Size</th>
                        <th style={{ padding: '8px' }}>Bust</th>
                        <th style={{ padding: '8px' }}>Waist</th>
                        <th style={{ padding: '8px' }}>Length</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizes.map(s => (
                        <tr key={s} style={{ borderBottom: '1px solid #f9f9f9' }}>
                          <td style={{ padding: '8px', fontWeight: '600' }}>{s}</td>
                          <td style={{ padding: '8px', color: '#666' }}>Standard fit</td>
                          <td style={{ padding: '8px', color: '#666' }}>Standard fit</td>
                          <td style={{ padding: '8px', color: '#666' }}>Standard fit</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'faqs' && product?.faqs && product.faqs.length > 0 && (
              <div className="pdp-desc-content">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.faqs.map((faq, idx) => (
                    <div key={idx} style={{ background: '#fafafa', border: '1px solid #eee', borderRadius: '8px', padding: '14px' }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#111' }}>{faq.question}</h4>
                      <p style={{ margin: '0', fontSize: '13px', color: '#666' }}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="pdp-custom-reviews-section" id="reviews-section">
          {/* Header */}
          <div className="pdp-crs-header">
            <div className="pdp-crs-eyebrow">
              <span className="pdp-crs-line"></span>
              <Leaf size={14} color="#C89953" />
              <span className="pdp-crs-eyebrow-text">WHAT OUR CUSTOMERS SAY</span>
              <span className="pdp-crs-line"></span>
            </div>
            <h2 className="pdp-crs-title">
              Customer <span style={{ color: '#C89953' }}>Reviews</span>
            </h2>
          </div>

          {/* Summary Card */}
          <div className="pdp-crs-summary-card">
            {/* Left Score */}
            <div className="pdp-crs-score-col">
              <span className="pdp-crs-big-score">{ratingSummary?.averageRating || (product?.rating ? Number(product.rating).toFixed(1) : '5')}</span>
              <div className="pdp-crs-stars">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    size={16}
                    fill={(ratingSummary?.averageRating || product?.rating || 5) >= i ? "#C89953" : "transparent"}
                    color="#C89953"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
              <div className="pdp-crs-diamond">♦</div>
              <span className="pdp-crs-based-on">Based on {ratingSummary?.totalReviews || reviews.length || 1} Reviews</span>
            </div>

            {/* Middle Bars */}
            <div className="pdp-crs-bars-col">
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratingSummary?.ratingBreakdown?.[star] || reviews.filter(r => r.rating === star).length || (star === 5 && reviews.length === 0 ? 1 : 0);
                const total = ratingSummary?.totalReviews || reviews.length || 1;
                const pct = total > 0 ? `${(count / total) * 100}%` : '0%';
                return (
                  <div className="pdp-crs-bar-row" key={star}>
                    <span className="pdp-crs-bar-label">{star} <Star size={10} fill="#C89953" color="#C89953" /></span>
                    <div className="pdp-crs-progress-track">
                      <div className="pdp-crs-progress-fill" style={{ width: pct }}></div>
                    </div>
                    <span className="pdp-crs-bar-count">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Badges */}
            <div className="pdp-crs-badges-col">
              <div className="pdp-crs-badge">
                <div className="pdp-crs-badge-icon">
                  <Award size={24} color="#C89953" strokeWidth={1.5} />
                </div>
                <div className="pdp-crs-diamond">♦</div>
                <strong>Quality You Can Trust</strong>
                <span>Real experiences from<br />real customers</span>
              </div>
              <div className="pdp-crs-badge">
                <div className="pdp-crs-badge-icon">
                  <Heart size={24} color="#C89953" strokeWidth={1.5} />
                </div>
                <div className="pdp-crs-diamond">♦</div>
                <strong>Loved by Thousands</strong>
                <span>Join thousands of happy<br />customers</span>
              </div>
            </div>

            {/* Right Button */}
            <div className="pdp-crs-action-col">
              <button
                className="pdp-crs-write-btn"
                onClick={() => setIsReviewModalOpen(true)}
              >
                <Edit2 size={14} /> Write a Review
              </button>
              <div className="pdp-crs-verified-text">
                How are reviews verified? <Info size={12} />
              </div>
            </div>
          </div>

          {/* Reviews List Header */}
          <div className="pdp-crs-list-header">
            <h3>What Customers Are Saying</h3>
            <button className="pdp-crs-view-all">View All Reviews &rarr;</button>
          </div>

          {/* Reviews Grid/Carousel */}
          {reviews.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: '#6b7280', background: '#fff', borderRadius: '12px', border: '1px solid #eaeaea' }}>
                <Star size={32} color="#d1d5db" style={{ marginBottom: '8px' }} />
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '500' }}>No reviews yet for this product.</p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="pdp-crs-cards-container">
              {reviews.map((review) => (
                <div className="pdp-crs-card" key={review.id}>
                  <div className="pdp-crs-card-user">
                    <img src={review.avatar} alt="Avatar" className="pdp-crs-avatar" />
                    <span className="pdp-crs-name">{review.name}</span>
                  </div>
                  <div className="pdp-crs-card-meta">
                    <span className="pdp-crs-rating-pill">
                      {Number(review.rating).toFixed(1)} <Star size={10} fill="#fff" color="#fff" />
                    </span>
                    <span className="pdp-crs-date">• Posted on {review.date}</span>
                  </div>
                  <div className="pdp-crs-card-title">{review.title}</div>
                  <div className="pdp-crs-card-content">{review.content}</div>
                  {review.image && (
                    <div className="pdp-crs-card-image">
                      <Image src={review.image} alt="Review attachment" width={60} height={80} style={{ objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                  )}
                  <div
                    className="pdp-crs-card-helpful"
                    onClick={() => handleHelpfulClick(review.id, review.hasVotedHelpful)}
                  >
                    <ThumbsUp size={14} fill={review.hasVotedHelpful ? "#888" : "transparent"} /> Helpful ({review.helpfulCount || 0})
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Carousel Dots */}
          {reviews.length > 0 && (
            <div className="pdp-crs-carousel-dots">
              <span className="pdp-crs-dot active"></span>
              <span className="pdp-crs-dot"></span>
              <span className="pdp-crs-dot"></span>
              <span className="pdp-crs-dot"></span>
            </div>
          )}
        </div>

        {/* Similar Products */}
        {similarProducts && similarProducts.length > 0 && (
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
        )}
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
                />
              </div>

              <div className="pdp-review-form-group">
                <label>Your Review</label>
                <textarea
                  placeholder="Tell us what you liked or disliked..."
                  rows={4}
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
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
