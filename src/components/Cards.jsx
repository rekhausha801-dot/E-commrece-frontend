import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Cards.css';
import { FiArrowRight, FiWatch, FiChevronLeft, FiChevronRight, FiGrid } from 'react-icons/fi';
import { FaTshirt, FaFemale, FaUserTie, FaShoePrints, FaHome, FaMagic, FaChild, FaGem, FaVest } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';
import kurthiImg from '../assets/images/kurthi3.png';
import topImg from '../assets/images/top2.jpeg';
import manImg from '../assets/images/man.png';
import shoeImg from '../assets/images/shoe.png';
import watchImg from '../assets/images/watch.png';
import homeImg from '../assets/images/home.png';
import beautyImg from '../assets/images/beauty.png';
import kidsImg from '../assets/images/kids.jpeg';
import { useCategories } from '../context/CategoryContext';

// Fallback hardcoded categories (used while loading or on error)
const defaultCategories = [
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
  const { categories: sharedCategories, loadingCategories } = useCategories();

  const getCategoryIcon = (categoryName) => {
    const name = (categoryName || '').toLowerCase();
    if (name.includes('shoe') || name.includes('footwear')) return <GiRunningShoe />;
    if (name.includes('kurti') || name.includes('dress') || name.includes('women') || name.includes('female')) return <FaFemale />;
    if (name.includes('suit') || name.includes('men') || name.includes('boy')) return <FaUserTie />;
    if (name.includes('kid') || name.includes('child')) return <FaChild />;
    if (name.includes('home')) return <FaHome />;
    if (name.includes('beauty')) return <FaMagic />;
    if (name.includes('watch') || name.includes('access')) return <FaGem />;
    if (name.includes('tshirt') || name.includes('shirt') || name.includes('wear') || name.includes('cloth')) return <FaTshirt />;
    return <FaVest />;
  };

  // Map backend categories from context to card format
  const activeCats = sharedCategories.filter(c => c.status === 'active');
  const categories = activeCats.length > 0
    ? activeCats.map((cat, index) => ({
        name: cat.name,
        subtitle: cat.description || 'Explore collection',
        image: cat.image || defaultCategories[index % defaultCategories.length].image,
        icon: cat.icon || null,
        fallbackIcon: getCategoryIcon(cat.name),
        iconColor: '#b38e69',
        iconBg: '#f2ebe1'
      }))
    : (loadingCategories ? [] : defaultCategories);

  const loading = loadingCategories;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      
      const step = scrollRef.current.clientWidth;
      const scrollTo = direction === 'left' ? scrollLeft - step : scrollLeft + step;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div id="categories" className="collection-section">
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
          {loading ? (
            <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>Loading Categories...</div>
          ) : (
            categories.map((cat, index) => {
              const targetLink = `/category/${(cat.name || '').toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <div key={`${cat.name}-${index}`} className="category-new-card">
                  <Link to={targetLink} className="category-new-card-image" style={{ display: 'block', position: 'relative' }}>
                    <img src={cat.image || 'https://placehold.co/600x400/eaeaea/8f7a5b?text=Category'} alt={cat.name} onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/eaeaea/8f7a5b?text=Category"; }} />
                  </Link>
                  <div className="category-new-card-content">
                    <div className="category-icon-wrapper" style={{ color: cat.iconColor, backgroundColor: cat.iconBg, overflow: 'hidden' }}>
                      {typeof cat.icon === 'string' && cat.icon !== '' ? (
                        <img src={cat.icon} alt={`${cat.name} icon`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        cat.fallbackIcon || cat.icon // fallbackIcon is for mapped, cat.icon is for defaultCategories
                      )}
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
              )
            })
          )}
        </div>

        <button className="scroll-button right" onClick={() => scroll('right')} aria-label="Scroll right">
          <FiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
