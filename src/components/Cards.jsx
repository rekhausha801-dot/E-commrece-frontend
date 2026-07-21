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
  { name: 'Ethnic Wear', subtitle: 'Traditional elegance', image: topImg, icon: <FaTshirt />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Western Dresses', subtitle: 'Modern & stylish', image: kurthiImg, icon: <FaFemale />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Menswear', subtitle: 'Sharp & casual', image: manImg, icon: <FaUserTie />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Footwear', subtitle: 'Step out in style', image: shoeImg, icon: <GiRunningShoe />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Home Decor', subtitle: 'Style your space', image: homeImg, icon: <FaHome />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Beauty', subtitle: 'Natural beauty', image: beautyImg, icon: <FaMagic />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Accessories', subtitle: 'Details that define you', image: watchImg, icon: <FaGem />, iconColor: '#b38e69', iconBg: '#f2ebe1' },
  { name: 'Kids Fashion', subtitle: 'Trendy looks for little ones', image: kidsImg, icon: <FaChild />, iconColor: '#b38e69', iconBg: '#f2ebe1' }
];

export default function Cards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      // Scroll by roughly the container width; CSS scroll snapping will ensure perfect alignment
      const step = scrollRef.current.clientWidth;
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
        {categories.map((cat, index) => {
          const targetLink = cat.name === 'Ethnic Wear' ? '/collection' : cat.name === 'Western Dresses' ? '/western' : `/category/${cat.name.toLowerCase().replace(' ', '-')}`;
          return (
          <div key={`${cat.name}-${index}`} className="category-new-card">
            <Link to={targetLink} className="category-new-card-image" style={{ display: 'block' }}>
              <img src={cat.image} alt={cat.name} />
            </Link>
            <div className="category-new-card-content">
              <div className="category-icon-wrapper" style={{ color: cat.iconColor, backgroundColor: cat.iconBg }}>
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
