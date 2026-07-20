import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import { FiArrowRight, FiWatch, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi';
import { FaTshirt, FaFemale, FaUserTie, FaShoePrints, FaHome, FaMagic, FaChild, FaGem } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';
import kurthiImg from '../assets/images/kurthi3.png';
import topImg from '../assets/images/top2.jpeg';
import manImg from '../assets/images/man.png';
import shoeImg from '../assets/images/shoe.png';
import watchImg from '../assets/images/watch.png';
import homeImg from '../assets/images/home.png';
import beautyImg from '../assets/images/beauty.png';
import kidsImg from '../assets/images/kids.jpeg';

const categories = [
  { name: 'Ethnic Wear', image: topImg, icon: <FaTshirt /> },
  { name: 'Western Dresses', image: kurthiImg, icon: <FaFemale /> },
  { name: 'Menswear', image: manImg, icon: <FaUserTie /> },
  { name: 'Footwear', image: shoeImg, icon: <GiRunningShoe /> },
  { name: 'Home Decor', image: homeImg, icon: <FaHome /> },
  { name: 'Beauty', image: beautyImg, icon: <FaMagic /> },
  { name: 'Accessories', image: watchImg, icon: <FaGem /> },
  { name: 'Kids Fashion', image: kidsImg, icon: <FaChild /> }
];

export default function Cards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Scroll by one card step (approx 300px) instead of the full page width
      const step = 300; 
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
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
        {categories.map((cat, index) => (
          <div key={`${cat.name}-${index}`} className="category-new-card">
            <Link to={cat.name === 'Ethnic Wear' ? '/collection' : cat.name === 'Western Dresses' ? '/western' : `/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="category-new-card-image" style={{ display: 'block' }}>
              <img src={cat.image} alt={cat.name} />
            </Link>
            <div className="category-new-card-content">
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <div className="category-text-wrapper">
                <Link to={cat.name === 'Ethnic Wear' ? '/collection' : cat.name === 'Western Dresses' ? '/western' : `/category/${cat.name.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{cat.name}</h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')} aria-label="Scroll right">
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
