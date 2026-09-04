import React, { useState, useEffect } from 'react';
import './SummerBanner.css';
import seaImg from '../assets/banners/glo.png';
const bannerVideo = '/banners/8387356-uhd_4096_2160_25fps.mp4';
import { FaArrowRight } from 'react-icons/fa';
import { getActiveBanners } from '../services/api';

const defaultSlides = [
  { type: 'image', src: seaImg },
  { type: 'video', src: bannerVideo }
];

const API_BASE_URL = 'http://localhost:5000';
const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
};

const SummerBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [dynamicBanners, setDynamicBanners] = useState([]);
  
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await getActiveBanners();
        if (data && data.success) {
          const middleBanners = data.data.filter(b => b.placement === 'Home - Middle');
          if (middleBanners.length > 0) {
            setDynamicBanners(middleBanners);
          }
        }
      } catch (error) {
        console.error("Error fetching middle banners", error);
      }
    };
    fetchBanners();
  }, []);

  const slides = dynamicBanners.length > 0 ? dynamicBanners.map(b => ({
    type: b.type === 'video' ? 'video' : 'image',
    src: b.image ? getImageUrl(b.image) : '',
    title: b.title,
    description: b.description,
    link: b.link
  })) : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="summer-banner-wrapper">
      <div className="summer-banner">

        <div className="summer-banner-image" style={{ position: 'absolute', top: 0, right: 0, width: 'calc(70% + 70px)', height: '100%', zIndex: 1, overflow: 'hidden' }}>
          {slides.map((slide, index) => (
            <div 
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 0.8s ease-in-out',
                zIndex: index === currentSlide ? 1 : 0
              }}
            >
              {slide.type === 'image' ? (
                <img src={slide.src} alt={`Summer Collection ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              ) : (
                <video src={slide.src + '?v=1'} crossOrigin="anonymous" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
              )}
            </div>
          ))}
          
          <div className="summer-carousel-dots" style={{
            position: 'absolute',
            bottom: '20px',
            right: '40px',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: idx === currentSlide ? '#C89953' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'background-color 0.3s'
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="summer-banner-curve-container">
          <svg className="summer-curve-svg" viewBox="0 0 100 400" preserveAspectRatio="none">

            <path d="M0,0 L50,0 C100,120 0,280 50,400 L0,400 Z" fill="#FAF8F5" />

            <path d="M50,0 C100,120 0,280 50,400" fill="none" stroke="#d4b78f" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Left side content */}
        <div className="summer-banner-content">
          <div className="summer-banner-inner">
            <div className="summer-icon-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22V12M12 12C9.5 10.5 7 11.5 6 13M12 12C14.5 10.5 17 11.5 18 13M12 12C10.5 8.5 7.5 7 5 8M12 12C13.5 8.5 16.5 7 19 8M12 12C11 6 8.5 4 6 4M12 12C13 6 15.5 4 18 4" stroke="#a67c52" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="summer-eyebrow">
              <span className="summer-line" />
              <span className="summer-season">NEW SEASON</span>
              <span className="summer-line" />
            </div>

            <h2 className="summer-title" style={{ fontSize: slides[currentSlide]?.title ? '42px' : '48px', lineHeight: '1.2' }}>
              {slides[currentSlide]?.title ? (slides[currentSlide].title.includes(' ') ? slides[currentSlide].title.split(' ')[0] : slides[currentSlide].title) : 'SUMMER'}
            </h2>
            {(!slides[currentSlide]?.title || slides[currentSlide].title.includes(' ')) && (
              <h3 className="summer-subtitle" style={{ fontSize: slides[currentSlide]?.title ? '32px' : '36px' }}>
                {slides[currentSlide]?.title ? slides[currentSlide].title.substring(slides[currentSlide].title.indexOf(' ') + 1) : 'COLLECTIONS'}
              </h3>
            )}

            <p className="summer-desc">
              {slides[currentSlide]?.description || (
                <>
                  Breezy fabrics. Sun-kissed colors.<br />
                  Effortless styles for every moment.
                </>
              )}
            </p>

            <a href={slides[currentSlide]?.link || '/shop'} style={{ textDecoration: 'none' }}>
              <button className="summer-shop-btn">
                SHOP NOW <FaArrowRight className="summer-btn-icon" />
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SummerBanner;
