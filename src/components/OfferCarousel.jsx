import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerImage1 from '../assets/banners/M.png';
import imgNew from '../assets/banners/image.png';
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
          <button className="carousel-close-btn" onClick={() => setShowCarousel(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13M1 13L13 1" stroke="#f47f20" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="carousel-images">
            {carouselData.map((banner, idx) => (
              <div
                key={idx}
                className={idx === currentSlide ? 'slide active' : 'slide'}
              >
                {idx === 0 ? (
                  <>
                    <img
                      src={banner.img}
                      alt={`Special Offer Banner ${idx + 1}`}
                      className="slide-image"
                    />
                    <div className="banner-content">
                      <p className="banner-subtitle">{banner.subtitle}</p>
                      <h2 className="banner-title">
                        <span className="mega">{banner.title1}</span>
                        <span className="sale">{banner.title2}</span>
                      </h2>
                      <p className="banner-text">{banner.text}</p>
                      <Link to={banner.link} className="shop-now-btn">SHOP NOW</Link>
                    </div>
                    
                    <div className="banner-tag-wrapper">
                      <div className="banner-tag-swing">
                        <div className="tag-string"></div>
                        <div className="banner-tag-body">
                          <div className="tag-hole"></div>
                          <span className="tag-upto">UP TO</span>
                          <span className="tag-percent">{banner.percent}</span>
                          <span className="tag-off">OFF</span>
                          <span className="tag-limited">LIMITED TIME ONLY</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to="/shop" className="full-image-slide-wrapper" style={{ display: 'block' }}>
                    <img
                      src={imgNew}
                      alt="New Arrivals Banner"
                      className="full-image-slide"
                    />
                  </Link>
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
