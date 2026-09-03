import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImage1 from '../assets/banners/musu.png';

import bannerImageOriginal from '../assets/banners/legha.png';
import imgNew from '../assets/banners/image.png';
import girlsImg from '../assets/banners/girls.png';
import heroVideo from '../assets/banners/8387356-uhd_4096_2160_25fps.mp4';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import '../pages/customer/Home.css';
import { getActiveBanners } from '../services/api';

const OfferCarousel = () => {
  const [showCarousel, setShowCarousel] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const [dynamicBanners, setDynamicBanners] = useState([]);
  const [dynamicOffers, setDynamicOffers] = useState([
    "20% off on your first order - code FIRST20",
    "Free Shipping on all orders over ₹10",
    "Buy 1 Get 2 Free on selected accessories"
  ]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await getActiveBanners();
        if (data && data.success) {
          const heroBanners = data.data.filter(b => b.placement === 'Home - Hero' || !b.placement);
          if (heroBanners.length > 0) {
            setDynamicBanners(heroBanners);
          }
          
          const stripBanners = data.data.filter(b => b.placement === 'Top Strip');
          if (stripBanners.length > 0) {
            const dynamicText = stripBanners.map(b => b.title || b.description || 'Special Offer!').filter(Boolean);
            if (dynamicText.length > 0) {
              setDynamicOffers(dynamicText);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching banners", error);
      }
    };
    fetchBanners();
  }, []);

  const API_BASE_URL = 'http://localhost:5000';
  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `http://localhost:5000${path}`;
  };

  const finalCarouselData = dynamicBanners.length > 0 ? dynamicBanners : [
    {
      img: bannerImageOriginal,
      type: 'with_text',
      title: 'Premium Collection',
      description: 'Discover our exclusive range of luxury wear.',
      showText: true,
      textPosition: 'Left',
      link: '/category/kurti'
    },
    {
      // Using the local fashion video
      img: heroVideo,
      type: 'video',
      title: 'Summer Trends 2026',
      description: 'Explore the latest arrivals.',
      showText: true,
      textPosition: 'Center',
      link: '/category/kurti'
    }
  ];

  useEffect(() => {
    let interval;
    if (showCarousel && !isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % finalCarouselData.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showCarousel, isPaused, finalCarouselData.length]);
  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % dynamicOffers.length);
    }, 4000);
    return () => clearInterval(offerInterval);
  }, [dynamicOffers.length]);

  return (
    <div className="offer-carousel-container">
      <div className="offer-bar-container">
        <p className="offer-bar-text" key={currentOfferIndex}>
          {dynamicOffers[currentOfferIndex]}
        </p>
      </div>

      {showCarousel && (
        <section
          className="hero-banner-section"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="carousel-close-btn" onClick={() => setShowCarousel(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="#C89953" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="carousel-images">
            {finalCarouselData.map((banner, idx) => (
              <div
                key={idx}
                className={idx === currentSlide ? 'slide active' : 'slide'}
              >
                <div className="mega-sale-banner-wrapper" style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}>
                  {banner.type === 'video' ? (
                    <video
                      src={banner.image ? getImageUrl(banner.image) : banner.img}
                      autoPlay
                      loop
                      muted
                      className="slide-image"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : banner.type === 'text' ? (
                    <div className="slide-image" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                      <h2 style={{ fontSize: '48px', color: '#333' }}>{banner.title}</h2>
                    </div>
                  ) : (
                    <img
                      src={banner.image ? getImageUrl(banner.image) : (banner.img || bannerImageOriginal)}
                      alt={banner.title || `Special Offer Banner ${idx + 1}`}
                      className="slide-image"
                      style={{ objectPosition: 'center top' }}
                    />
                  )}
                  {(banner.showText || banner.type === 'with_text' || banner.type === 'image-text') && banner.title && (
                    <>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        zIndex: 1
                      }}></div>
                      <div className="mega-banner-content" style={{
                        position: 'absolute',
                        top: '50%',
                        left: banner.textPosition === 'Center' ? '50%' : banner.textPosition === 'Right' ? '80%' : '8%',
                        transform: banner.textPosition === 'Center' ? 'translate(-50%, -50%)' : 'translateY(-50%)',
                        textAlign: banner.textPosition === 'Center' ? 'center' : 'left',
                        padding: '20px',
                        maxWidth: '500px',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: banner.textPosition === 'Center' ? 'center' : 'flex-start',
                        color: '#ffffff'
                      }}>
                        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '64px', margin: '0 0 15px 0', fontWeight: 'normal', lineHeight: '1.1' }}>{banner.title}</h2>
                        {banner.description && (
                          <p style={{ fontSize: '20px', lineHeight: '1.4', marginBottom: '20px', fontWeight: '400' }}>
                            {banner.description}
                          </p>
                        )}

                      </div>
                    </>
                  )}
                  {banner.showText && !banner.title && (
                    <>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        zIndex: 1
                      }}></div>
                      <div className="mega-banner-content" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '8%',
                        transform: 'translateY(-50%)',
                        textAlign: 'left',
                        padding: '20px',
                        maxWidth: '500px',
                        zIndex: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        color: '#ffffff'
                      }}>
                        <h4 style={{ fontSize: '16px', letterSpacing: '4px', marginBottom: '10px', fontWeight: '500', textTransform: 'uppercase' }}>LIMITED TIME OFFER</h4>
                        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '72px', margin: '0 0 15px 0', fontWeight: 'normal', lineHeight: '1.1' }}>MEGA SALE</h2>
                        <p style={{ fontSize: '20px', lineHeight: '1.4', marginBottom: '20px', fontWeight: '400' }}>
                          Big Offers on Your<br />Favourite Styles
                        </p>
                        <h3 style={{ fontSize: '24px', fontWeight: '500', marginBottom: '30px', letterSpacing: '1px' }}>UP TO <span style={{ fontSize: '32px', fontWeight: '600' }}>50%</span> OFF</h3>

                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {finalCarouselData.map((_, idx) => (
              <span
                key={idx}
                className={idx === currentSlide ? 'dot active' : 'dot'}
                onClick={() => setCurrentSlide(idx)}
              ></span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default OfferCarousel;
