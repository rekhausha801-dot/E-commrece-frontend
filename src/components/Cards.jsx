import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import { FiArrowRight, FiWatch, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi';
import { FaTshirt, FaFemale, FaUserTie, FaShoePrints, FaHome, FaMagic, FaChild, FaGem } from 'react-icons/fa';
import kurthiImg from '../assets/images/kurthi3.png';
import topImg from '../assets/images/top2.jpeg';
import manImg from '../assets/images/man.png';
import shoeImg from '../assets/images/shoe.png';
import watchImg from '../assets/images/watch.png';
import homeImg from '../assets/images/home.png';
import beautyImg from '../assets/images/beauty.png';
import kidsImg from '../assets/images/kids.jpeg';

const categories = [
  { name: 'Ethnic Wear', image: topImg, icon: <FaTshirt />, overlayTop: {text: 'Tradition', type: 'script'}, overlayBottom: {text: 'Meets Style', type: 'serif'}, subtitle: 'Timeless Beauty' },
  { name: 'Western Dresses', image: kurthiImg, icon: <FaFemale />, overlayTop: {text: 'Style', type: 'script'}, overlayBottom: {text: 'Your Way', type: 'serif'}, subtitle: 'Effortless Elegance' },
  { name: 'Menswear', image: manImg, icon: <FaUserTie />, overlayTop: {text: 'Dress', type: 'script'}, overlayBottom: {text: 'Like a Man', type: 'serif'}, subtitle: 'Sharp. Modern. You.' },
  { name: 'Footwear', image: shoeImg, icon: <FaShoePrints />, overlayTop: {text: 'Step into', type: 'serif'}, overlayBottom: {text: 'Comfort', type: 'script'}, subtitle: 'For Every Move' },
  { name: 'Home Decor', image: homeImg, icon: <FaHome />, overlayTop: {text: 'Make Home', type: 'serif'}, overlayBottom: {text: 'More Beautiful', type: 'script'}, subtitle: 'Live in Style' },
  { name: 'Beauty', image: beautyImg, icon: <FaMagic />, overlayTop: {text: 'Discover', type: 'serif'}, overlayBottom: {text: 'Your Glow', type: 'script'}, subtitle: 'Radiant Beauty' },
  { name: 'Accessories', image: watchImg, icon: <FaGem />, overlayTop: {text: 'The Perfect', type: 'serif'}, overlayBottom: {text: 'Details', type: 'script'}, subtitle: 'Elevate Your Look' },
  { name: 'Kids Fashion', image: kidsImg, icon: <FaChild />, overlayTop: {text: 'Cute &', type: 'serif'}, overlayBottom: {text: 'Comfortable', type: 'script'}, subtitle: 'For Little Ones' }
];

export default function Cards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Scroll by exactly one full view (4 cards)
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="collection-section">
      <div className="trendy-header">
        <div className="trendy-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-icon"><FiGrid /></span>
          <span>EXPLORE NOW</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="trendy-title">
          Shop by <span className="trendy-title-accent">Category</span>
        </h2>
      </div>

      <div className="category-carousel-wrapper">
        <button className="scroll-button left" onClick={() => scroll('left')} aria-label="Scroll left">
          <FiChevronLeft size={24} />
        </button>

        <div className="category-cards-container" ref={scrollRef}>
        {categories.map((cat, index) => {
          const targetLink = cat.name === 'Ethnic Wear' ? '/collection' : cat.name === 'Western Dresses' ? '/western' : `/category/${cat.name.toLowerCase().replace(' ', '-')}`;
          return (
          <div key={`${cat.name}-${index}`} className="category-new-card">
            <Link to={targetLink} className="category-new-card-image" style={{ display: 'block' }}>
              <img src={cat.image} alt={cat.name} />
            </Link>
            <div className="category-new-card-content">
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <div className="category-text-wrapper">
                <Link to={targetLink} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{cat.name}</h3>
                  <span className="category-subtitle">{cat.subtitle}</span>
                </Link>
              </div>
              <Link to={targetLink} className="category-arrow-btn">
                <FiArrowRight />
              </Link>
            </div>
          </div>
        )})}
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')} aria-label="Scroll right">
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
