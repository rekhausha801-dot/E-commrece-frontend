import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImage1 from '../assets/banners/legha.png';
import imgNew from '../assets/banners/image.png';
import girlsImg from '../assets/banners/girls.png';
import wearImg from '../assets/banners/wear.png';
import musuImg from '../assets/banners/musu.png';
import { X } from 'lucide-react';
import '../pages/customer/Home.css';

const OfferCarousel = () => {
  const [showCarousel, setShowCarousel] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  const offers = [
    "20% off on your first order - code FIRST20",
    "Free Shipping on all orders over ₹10",
    "Buy 1 Get 2 Free on selected accessories"
  ];

  const carouselData = [
    {
      img: bannerImage1,
      title1: "MEGA",
      title2: "SALE",
      subtitle: "Limited Time Offer",
      text: "Big offers on your favorite styles",
      percent: "50%",
      link: "/shop",
      position: "right"
    },
    {
      type: "collection"
    }
  ];

  useEffect(() => {
    let interval;
    if (showCarousel && !isPaused) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselData.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showCarousel, isPaused, carouselData.length]);

  useEffect(() => {
    const offerInterval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(offerInterval);
  }, [offers.length]);

  return (
    <div className="offer-carousel-container">
      <div className="offer-bar-container">
        <p className="offer-bar-text" key={currentOfferIndex}>
          {offers[currentOfferIndex]}
        </p>
      </div>

      {showCarousel && (
        <section
          className="hero-banner-section"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="carousel-close-btn" onClick={() => setShowCarousel(false)} style={{ zIndex: 100 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="premium-close-icon">
              {/* Fill background strictly matching the tag shape */}
              <path d="M 24 4 L 10 4 L 3 12 L 10 20 L 24 20 Z" fill="#FDFBF7" />
              {/* Stroke outline */}
              <path d="M 24 4 L 10 4 L 3 12 L 10 20 L 24 20" stroke="#C89953" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="icon-stroke" />
              {/* Inner X mark */}
              <path d="M 14 9 L 20 15 M 20 9 L 14 15" stroke="#C89953" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="icon-stroke" />
            </svg>
          </button>

          <div className="carousel-images">
            {carouselData.map((banner, idx) => (
              <div
                key={idx}
                className={idx === currentSlide ? 'slide active' : 'slide'}
              >
                {idx === 0 ? (
                  <Link to="/shop" className="full-image-slide-wrapper" style={{ display: 'block' }}>
                    <img
                      src={musuImg}
                      alt="Festive Banner"
                      className="slide-image"
                      style={{ objectPosition: 'center top' }}
                    />
                  </Link>
                ) : (
                  <div className="mega-sale-banner-wrapper" style={{ position: 'relative', width: '100%', height: '100%', display: 'block' }}>
                    <img
                      src={bannerImage1}
                      alt={`Special Offer Banner ${idx + 1}`}
                      className="slide-image"
                      style={{ objectPosition: 'center top' }}
                    />
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
                      <Link to="/shop" className="shop-now-btn" style={{ backgroundColor: '#5c101c', color: '#fff', border: 'none' }}>
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="carousel-indicators">
            {carouselData.map((_, idx) => (
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
