import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import {
  Star, ShoppingCart, ChevronRight, ChevronLeft, ArrowRight, Ruler,
  CheckCircle2, ShieldCheck, RefreshCcw, Heart, Plus, Minus, Check, Eye,
  Truck, CreditCard, Box, Navigation, MoreHorizontal, ThumbsUp, ShoppingBag, Palette, Shield,
  Camera, MessageCircle, Edit2, Info, Award, X, Leaf, ArrowDown, Zap,
  Flower2, Mountain, Feather, Flame, Rocket, Compass, Send, Headphones, Palmtree
} from 'lucide-react';
import CustomerReviews from './CustomerReviews';
import './ProductDetail.css';

import placeholderMain from '../assets/images/banner0.png';
import placeholderThumb1 from '../assets/images/beauty.png';
import placeholderThumb2 from '../assets/images/shirt.jpeg';

import kurtiImg from '../assets/images/kurti.png';
import kurthi2Img from '../assets/images/kurthi2.png';
import kurthi3Img from '../assets/images/kurthi3.png';
import kurthi4Img from '../assets/images/kurthi4.png';
import kurthi5Img from '../assets/images/kurthi5.png';

import westren2Img from '../assets/images/westren2.png';
import westren3Img from '../assets/images/westren3.png';
import westren4Img from '../assets/images/westren4.png';
import westren5Img from '../assets/images/westren5.png';

import { GLOBAL_PRODUCTS, getSimilarProducts, determineProductCategory, customizableDesigns } from '../data/mockProducts';

function SimilarProductCard({ product, onQuickView }) {
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);
  // Use product colors if available, otherwise just use its main image
  const [activeColor, setActiveColor] = useState(product.colors ? product.colors[0].name : '');
  const activeColorObj = product.colors?.find(c => c.name === activeColor);
  const displayImage = activeColorObj?.image || product.image || product.colors?.[0]?.image;
  const isOutOfStock = activeColorObj ? !activeColorObj.inStock : false;

  return (
    <div
      className={`pdp-lo-card unified-product-card ${isOutOfStock ? 'out-of-stock-card' : ''}`}
      onClick={() => onQuickView(product)}
    >
      <div className="unified-card-image-wrap">
        {isOutOfStock && <div className="out-of-stock-overlay">Out of Stock</div>}
        <div className="unified-badge" style={{ background: '#d3b585', opacity: 0.9 }}>
          {product.badge || 'SIMILAR'}
        </div>
        <button className="unified-wishlist-btn" onClick={(e) => e.stopPropagation()}>
          <Heart size={16} color="#666" />
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
              <Star key={i} size={14} fill={i <= (product.rating || 5) ? "#C89953" : "#e0e0e0"} color={i <= (product.rating || 5) ? "#C89953" : "#e0e0e0"} />
            ))}
          </div>
          <span className="unified-reviews">({product.reviews || 24})</span>
        </div>

        <div className="unified-card-price">
          <span className="unified-price-new">₹{product.price || '499'}</span>
          <span className="unified-price-old">₹{product.originalPrice || '999'}</span>
          <span className="unified-price-discount">{product.discount || '50% OFF'}</span>
        </div>

        {product.colors && (
          <div className="unified-color-swatches">
            {product.colors.map((color, idx) => {
              const colorName = typeof color === 'string' ? `color-${idx}` : color.name;
              const colorHex = typeof color === 'string' ? color : color.hex;
              return (
                <div
                  key={colorName}
                  className={`color-swatch ${activeColor === colorName ? 'active' : ''}`}
                  style={{
                    backgroundColor: colorHex,
                    border: activeColor === colorName ? '2px solid #000' : '1px solid rgba(0,0,0,0.1)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveColor(colorName);
                  }}
                />
              );
            })}
            {product.colors.length > 2 && (
              <span className="color-more">+{product.colors.length - 2} more</span>
            )}
          </div>
        )}

        {isOutOfStock ? (
          <button className="unified-add-cart-btn" style={{ background: '#fce4e4', color: '#d32f2f' }} onClick={(e) => e.stopPropagation()}>
            Notify Me
          </button>
        ) : (
          <button className="unified-add-cart-btn" onClick={(e) => {
            e.stopPropagation();
            if (isAdded) {
              navigate('/cart');
            } else {
              setIsAdded(true);
              message.success(`${product.title || 'Product'} added to cart!`);
            }
          }}>
            <ShoppingBag size={14} style={{ marginRight: '8px' }} /> {isAdded ? "Go to Cart" : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  let baseProduct = location.state?.product || GLOBAL_PRODUCTS.find(p => p.id === parseInt(productId)) || null;

  // Dynamically attach customization ONLY for the specific White T-Shirt (ID 100) or t-shirt7 or t-shirt8
  const isCustomizableTShirt = baseProduct?.id === 100 || (baseProduct?.image && (baseProduct.image.includes('t-shirt7') || baseProduct.image.includes('t-shirt8')));
  
  const product = baseProduct ? {
    ...baseProduct,
    customizable: isCustomizableTShirt ? true : baseProduct.customizable,
    designs: isCustomizableTShirt ? customizableDesigns : baseProduct.designs
  } : null;

  const [activeImage, setActiveImage] = useState(0);
  const [activeSize, setActiveSize] = useState('M');
  const [activeColor, setActiveColor] = useState('Brown');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [activeDesign, setActiveDesign] = useState(product?.designs ? product.designs[0] : null);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, title: '', content: '', image: null });
  const [hoveredStar, setHoveredStar] = useState(0);
  const fileInputRef = useRef(null);
  const customizerScrollRef = useRef(null);

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
      setReviewForm({ ...reviewForm, image: imageUrl });
    }
  };

  const [customerPhotos, setCustomerPhotos] = useState([
    kurtiImg, kurthi2Img, kurthi3Img, kurthi4Img, kurthi5Img, westren2Img, westren3Img
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Priya Sharma",
      avatar: kurthi4Img,
      purchased: "Floral Anarkali Kurta",
      rating: 5,
      content: "Absolutely love the quality! The fabric is so soft and comfortable. Perfect fit and exactly as shown in the pictures.",
    },
    {
      id: 2,
      name: "Neha Verma",
      avatar: kurthi2Img,
      purchased: "Embroidered Straight Kurta",
      rating: 5,
      content: "Beautiful design and excellent stitching. I've received so many compliments when I wore this!",
    },
    {
      id: 3,
      name: "Anjali Mehta",
      avatar: kurthi3Img,
      purchased: "Printed Cotton Kurta Set",
      rating: 5,
      content: "Fast delivery and great packaging. The color and quality exceeded my expectations. Will shop again!",
    },
    {
      id: 4,
      name: "Sanya Kapoor",
      avatar: kurtiImg,
      purchased: "Chikankari Kurta",
      rating: 5,
      content: "Very classy and elegant. The material feels premium. Totally worth the price!",
    }
  ]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const newReview = {
        id: Date.now(),
        name: "You",
        avatar: placeholderThumb1,
        purchased: product?.title || "Floral A-Line Kurti",
        rating: reviewForm.rating || 5,
        title: reviewForm.title,
        content: reviewForm.content,
      };

      if (reviewForm.image) {
        setCustomerPhotos([reviewForm.image, ...customerPhotos]);
      }

      setReviews([newReview, ...reviews]);
      setIsReviewModalOpen(false);
      setReviewForm({ rating: 0, title: '', content: '', image: null });
    }, 300);
  };

  const images = product?.image
    ? [product.image, product.image, product.image, product.image, product.image, product.image]
    : [placeholderMain, placeholderThumb1, placeholderThumb2, placeholderMain, placeholderThumb1, placeholderThumb2];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL', '6XL'];
  // Use product colors if available, otherwise fallback to default colors
  const colors = product?.colors || [
    { name: 'Beige', hex: '#F5E6D3', inStock: true, image: kurthi4Img },
    { name: 'Brown', hex: '#8B4513', inStock: true, image: product?.image || kurthi2Img },
    { name: 'Black', hex: '#1C1C1C', inStock: false, image: kurthi3Img }
  ];

  // Initialize activeColor properly if it doesn't match the current colors
  useEffect(() => {
    if (!colors.find(c => c.name === activeColor)) {
      setActiveColor(colors[0].name);
    }
  }, [product, colors, activeColor]);

  const activeColorObj = colors.find(c => c.name === activeColor) || colors[0];

  const displayImageSrc = (product?.customizable && activeDesign?.modelImage)
    ? activeDesign.modelImage
    : (activeColorObj?.image || product?.image || placeholderMain);
  const displayImages = Array(6).fill(displayImageSrc);

  const similarProducts = getSimilarProducts(product);

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

  const adsData = [
    {
      id: 1,
      image: westren3Img,
      title: "Gudwear Casual Roll Up Sleeves Printed Women Black Top",
      discount: "83%",
      oldPrice: "1,499",
      newPrice: "₹256"
    },
    {
      id: 2,
      image: kurthi2Img,
      title: "Elegant Cotton Embroidered Straight Kurta",
      discount: "60%",
      oldPrice: "2,499",
      newPrice: "₹999"
    },
    {
      id: 3,
      image: westren2Img,
      title: "Stylish Denim Jacket for Women",
      discount: "40%",
      oldPrice: "3,999",
      newPrice: "₹2,399"
    }
  ];

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % adsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
          <span className="current">{product?.title || 'Floral A-Line Kurti'}</span>
        </div>

        <div className="pdp-main-container">
          {/* Left Column Wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    {product?.customizable && activeDesign?.icon && !activeDesign?.isBaseImage && (
                      <div style={{ position: 'absolute', top: '55%', left: '56%', transform: 'translate(-50%, -50%)', width: '40%', height: '40%', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
                        <img src={activeDesign.icon} alt={activeDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                  <div className="pdp-discount-badge">-40%</div>
                  <button className="pdp-wishlist-heart-btn" onClick={() => setIsWishlisted(!isWishlisted)}>
                    <Heart size={18} fill={isWishlisted ? '#8B4513' : 'none'} color={isWishlisted ? '#8B4513' : '#666'} />
                  </button>

                  <button className="pdp-nav-btn pdp-prev" onClick={prevImage}><ChevronLeft size={20} /></button>
                  <div style={{ width: '100%', height: '100%', transition: 'transform 0.1s ease-out', ...zoomStyle }}>
                    <img src={displayImages[activeImage]} alt="Main Product" className="pdp-main-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {product?.customizable && activeDesign?.icon && !activeDesign?.isBaseImage && (
                      <div style={{ position: 'absolute', top: '65%', left: '56%', transform: 'translate(-50%, -50%)', width: '35%', height: '35%', mixBlendMode: 'multiply', pointerEvents: 'none' }}>
                        <img src={activeDesign.icon} alt={activeDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>
                  <button className="pdp-nav-btn pdp-next" onClick={nextImage}><ChevronRight size={20} /></button>
                </div>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="pdp-service-highlights" style={{ margin: '0' }}>
              <div className="pdp-service-item">
                <Truck size={20} className="pdp-service-icon" />
                <div>
                  <strong>Free Delivery</strong>
                  <p>On orders above ₹499</p>
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

          {/* Right Column: Info */}
          <div className="pdp-info-section">
            <div style={{ overflow: 'hidden', width: '100%', borderRadius: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translateX(-${currentAdIndex * 100}%)`
                }}
              >
                {adsData.map((ad) => (
                  <div key={ad.id} className="pdp-ad-banner" style={{ minWidth: '100%', flex: '0 0 100%', boxSizing: 'border-box', margin: 0 }}>
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

            <div className="pdp-collection-tag-new">
              👑 PREMIUM COLLECTION
            </div>

            <h1 className="pdp-product-title-new">{product?.title || 'Floral A-Line Kurti'}</h1>

            <div className="pdp-rating-summary-new">
              <Star size={14} fill="#C89953" color="#C89953" />
              <span className="pdp-rating-num-new">{product?.rating || 4.8}</span>
              <span className="pdp-rating-text-new">({product?.reviews || '2,547'} Ratings)</span>
              <span className="pdp-rating-divider-new">|</span>
              <Box size={14} className="pdp-sold-icon-new" />
              <span className="pdp-sold-text-new">9.4K Sold</span>
            </div>

            <div className="pdp-price-block-new">
              <span className="pdp-current-price-new">
                {product?.price?.toString().startsWith('₹') ? product.price : `₹${product?.price || '799'}`}
              </span>
              <span className="pdp-original-price-new">
                {product?.originalPrice?.toString().startsWith('₹') ? product.originalPrice : `₹${product?.originalPrice || '999'}`}
              </span>
              <span className="pdp-discount-text-new">{product?.discount || '40% OFF'}</span>
            </div>
            <div className="pdp-tax-inclusive-new">Inclusive of all taxes</div>

            <div className="pdp-status-badges-new">
              <div className="pdp-stock-status-new">
                <span className="pdp-status-dot-new"></span> In Stock
              </div>
              {/* Product Description or Customizer */}
              {product?.customizable && product?.designs ? (
                <div className="pdp-right-col-customizer" style={{ marginTop: '20px' }}>
                  <div className="pdp-customizer-header" style={{ padding: '0', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>CHOOSE YOUR DESIGN</h3>
                  </div>
                  <div className="pdp-customizer-designs" style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button className="pdp-customizer-nav" onClick={() => scrollCustomizer('left')} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><ChevronLeft size={16}/></button>
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
                    <button className="pdp-customizer-nav" onClick={() => scrollCustomizer('right')} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><ChevronRight size={16}/></button>
                  </div>
                </div>
              ) : (
                <div className="pdp-short-description" style={{ marginTop: '12px', marginBottom: '0', color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  <p>{product?.description || (product?.title === 'Floral A-Line Kurti' ? 'Elevate your everyday style with our beautiful Floral A-Line Kurti. Carefully crafted from premium breathable cotton, it offers both unparalleled comfort and effortless elegance for any occasion.' : 'Elevate your everyday style with this beautiful piece. Carefully crafted for comfort and elegance.')}</p>
                </div>
              )}
            </div>

            <div className="pdp-options-horizontal-divider"></div>

            <div className="pdp-options-grid-new">
              <div className="pdp-options-left">
                <div className="pdp-option-section-new">
                  <div className="pdp-option-title-new">COLOR: <span className="font-normal">{activeColor}</span></div>
                  <div className="pdp-color-swatches-new">
                    {colors.map(color => (
                      <div
                        key={color.name}
                        className={`pdp-color-swatch-new ${activeColor === color.name ? 'active' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => {
                          setActiveColor(color.name);
                          setActiveImage(0);
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
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
                    <span className="pdp-qty-left-new"><Box size={12} style={{ marginRight: '4px' }} /> Only 8 Left</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pdp-options-horizontal-divider"></div>

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

            <div className="pdp-options-horizontal-divider" style={{ marginTop: '0' }}></div>

              <div className="pdp-action-buttons" style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                <button 
                  className="pdp-btn-wishlist-large" 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 0', background: '#fff', border: '1px solid #ddd', borderRadius: '4px', color: '#8B4513', fontWeight: '600', cursor: 'pointer' }}
                >
                  <Heart size={16} fill={isWishlisted ? '#8B4513' : 'none'} color="#8B4513" /> Wishlist
                </button>
                {activeColorObj.inStock ? (
                  <>
                    <button 
                      className="pdp-btn-add-cart" 
                      onClick={() => {
                        if (isAdded) {
                          navigate('/cart');
                        } else {
                          setIsAdded(true);
                          message.success(`${product?.title || 'Product'} added to cart!`);
                        }
                      }}
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px 0', background: '#8B4513', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                    >
                      <ShoppingCart size={16} /> {isAdded ? "Go to Cart" : "Add to Cart"}
                    </button>
                    <button 
                      className="pdp-btn-buy-now"
                      style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px 0', background: '#000', border: 'none', borderRadius: '4px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Buy Now
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
                    Customer Reviews (2,547)
                    <span className="pdp-tab-rating-badge"><Star size={10} fill="#E26A2C" color="#E26A2C" /> 4.8</span>
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
                  <p>Crafted from premium rayon, this elegant Floral A-Line Kurti features a beautiful print, round neckline, and 3/4 sleeves. Perfect for casual outings and festive wear.</p>

                  <div className="pdp-overview-divider">
                    <span className="pdp-line"></span>
                    <Star size={12} fill="#E26A2C" color="#E26A2C" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />
                    <span className="pdp-line"></span>
                  </div>

                  <ul className="pdp-overview-list">
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> Premium breathable rayon fabric</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> Elegant all-over floral print</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> Flattering A-line silhouette</li>
                  </ul>
                </div>
                <div className="pdp-desc-right">
                  <h3 className="pdp-highlights-title">Product Highlights</h3>
                  <div className="pdp-highlights-grid">
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><Leaf size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Fabric</strong>
                        <span>Premium Rayon</span>
                      </div>
                    </div>
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><Box size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Fit</strong>
                        <span>Regular Fit</span>
                      </div>
                    </div>
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><Box size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Sleeve Length</strong>
                        <span>Three-Quarter Sleeves</span>
                      </div>
                    </div>
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><Star size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Occasion</strong>
                        <span>Casual, Office, Festive</span>
                      </div>
                    </div>
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><RefreshCcw size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Care</strong>
                        <span>Machine Wash</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'specifications' && (
              <div className="pdp-desc-content pdp-desc-split">
                <div className="pdp-desc-left" style={{ flex: 1 }}>
                  <h3 className="pdp-overview-title"><Star size={18} fill="#E26A2C" color="#E26A2C" className="pdp-star-icon-inline" style={{ transform: 'scale(0.8)' }} /> Product Specifications</h3>
                  <ul className="pdp-overview-list">
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>Fabric:</strong> Premium Rayon</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>Pattern:</strong> Floral Print</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>Neckline:</strong> Round Neck</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>Sleeve Length:</strong> 3/4 Sleeves</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>Fit:</strong> Regular Fit</li>
                    <li><div className="pdp-check-icon"><Check size={12} strokeWidth={4} /></div> <strong>Length:</strong> Calf Length</li>
                  </ul>
                </div>
                <div className="pdp-desc-right" style={{ flex: 1 }}>
                  <h3 className="pdp-highlights-title">Additional Info</h3>
                  <div className="pdp-highlights-grid" style={{ gridTemplateColumns: '1fr', marginTop: '24px' }}>
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><Shield size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Quality Assurance</strong>
                        <span>100% Original Products</span>
                      </div>
                    </div>
                    <div className="pdp-highlight-card">
                      <div className="pdp-hc-icon"><RefreshCcw size={24} color="#E26A2C" strokeWidth={1.5} /></div>
                      <div className="pdp-hc-info">
                        <strong>Easy Returns</strong>
                        <span>7 Days Return Policy</span>
                      </div>
                    </div>
                  </div>
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
                  <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#222', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E26A2C' }}></div> Is the fabric comfortable for summer?</h4>
                    <p style={{ margin: '0', fontSize: '14px', color: '#666', paddingLeft: '14px' }}>Yes, the premium rayon fabric is highly breathable and soft, making it perfect for summer wear.</p>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#222', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E26A2C' }}></div> Does the color fade after washing?</h4>
                    <p style={{ margin: '0', fontSize: '14px', color: '#666', paddingLeft: '14px' }}>Our kurtis use high-quality dyes. However, we recommend a gentle machine wash or hand wash to ensure long-lasting color vibrance.</p>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '12px', padding: '20px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#222', display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E26A2C' }}></div> Can I return the product if the size doesn't fit?</h4>
                    <p style={{ margin: '0', fontSize: '14px', color: '#666', paddingLeft: '14px' }}>Absolutely! We offer a hassle-free 7-day return and exchange policy for all unworn items with tags intact.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Customer Reviews Redesigned Layout */}
        <div className="pdp-reviews-redesigned-section">
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
                <span className="pdp-rns-big-score">4.8</span>
              </div>
              <div className="pdp-rns-stars">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="#C89953" color="#C89953" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} />)}
              </div>
              <div className="pdp-summary-divider" style={{ width: '60%', margin: '16px auto' }}>
                <div className="pdp-diamond" style={{ width: '6px', height: '6px', background: '#C89953', border: 'none' }}></div>
              </div>
              <span className="pdp-rns-based-on">Based on 2,450+ Reviews</span>
            </div>

            <div className="pdp-rns-badge-divider" style={{ margin: '0' }}></div>

            <div className="pdp-rns-bars-col">
              {[
                { star: 5, count: 1856, pct: '75%' },
                { star: 4, count: 412, pct: '15%' },
                { star: 3, count: 129, pct: '5%' },
                { star: 2, count: 32, pct: '2%' },
                { star: 1, count: 21, pct: '1%' },
              ].map(row => (
                <div className="pdp-rns-bar-row" key={row.star}>
                  <span className="pdp-rns-bar-label">{row.star} <Star size={10} fill="#C89953" color="#C89953" style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }} /></span>
                  <div className="pdp-rns-progress-track">
                    <div className="pdp-rns-progress-fill" style={{ width: row.pct }}></div>
                  </div>
                  <span className="pdp-rns-bar-count">{row.count}</span>
                </div>
              ))}
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

          {/* Container 2: Photos */}
          <div className="pdp-reviews-new-photos">
            <div className="pdp-rnp-header-layout">
              <div className="pdp-rnp-header-left">
                <div className="pdp-rnp-icon-wrap">
                  <Camera size={24} color="#C89953" strokeWidth={1.5} />
                </div>
                <div className="pdp-rnp-title-wrap">
                  <h3>Customer Photos</h3>
                  <div className="pdp-rnp-divider">
                    <div className="pdp-rnp-line"></div>
                    <div className="pdp-rnp-diamond"></div>
                  </div>
                  <p>Real looks from our amazing customers</p>
                </div>
              </div>
              <a href="#" className="pdp-rnp-view-more">View More Photos <ArrowRight size={16} /></a>
            </div>

            <div className="pdp-rnp-scroll">
              {customerPhotos.map((img, idx) => (
                <div key={idx} className="pdp-rnp-photo-card">
                  <img src={img} alt="Customer wearing product" className="pdp-rnp-img" />
                  <div className="pdp-rnp-photo-footer">
                    <span className="pdp-rnp-photo-rating"><Star size={12} fill="#C89953" color="#C89953" /> 4.9</span>
                    <span className="pdp-rnp-photo-sep">|</span>
                    <span className="pdp-rnp-photo-buyer">Verified Buyer</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Container 3: Review Cards */}
          <div className="pdp-reviews-new-cards">
            <div className="pdp-rnc-header">
              <div className="pdp-rnc-title-group">
                <MessageCircle size={18} />
                <h3>What Customers Are Saying</h3>
              </div>
              <a href="#" className="pdp-rnc-view-more">View All Reviews <ArrowRight size={14} /></a>
            </div>
            <div className="pdp-rnc-scroll">
              {reviews.map((review) => (
                <div className="pdp-rnc-card" key={review.id}>
                  <div className="pdp-rnc-stars">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star
                        key={i}
                        size={14}
                        fill={i <= review.rating ? "#C89953" : "transparent"}
                        color={i <= review.rating ? "#C89953" : "#ccc"}
                      />
                    ))}
                  </div>
                  <p className="pdp-rnc-text">
                    {review.title && <strong>{review.title} - </strong>}
                    {review.content}
                  </p>
                  <div className="pdp-rnc-footer">
                    <img src={review.avatar} alt="Avatar" className="pdp-rnc-avatar" />
                    <div className="pdp-rnc-user-info">
                      <div className="pdp-rnc-user-name">
                        {review.name} <span className="pdp-rnc-verified-badge">Verified Buyer</span>
                      </div>
                      <div className="pdp-rnc-purchased">Purchased: {review.purchased}</div>
                    </div>
                    <CheckCircle2 size={16} color="#2E7D32" className="pdp-rnc-verified-icon" />
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
