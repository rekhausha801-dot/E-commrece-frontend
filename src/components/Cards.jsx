import React, { useRef } from 'react';
import './Cards.css';
import { FiArrowRight, FiStar, FiUser, FiShoppingBag, FiHome, FiSmile, FiWatch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import kurthiImg from '../assets/images/kurthi3.png';
import topImg from '../assets/images/top2.jpeg';
import manImg from '../assets/images/man.png';
import shoeImg from '../assets/images/shoe.png';
import watchImg from '../assets/images/watch.png';
import homeImg from '../assets/images/home.png';
import beautyImg from '../assets/images/beauty.png';

const categories = [
  { name: 'Ethnic Wear', image: topImg, icon: <FiStar /> },
  { name: 'Western Dresses', image: kurthiImg, icon: <FiStar /> },
  { name: 'Menswear', image: manImg, icon: <FiUser /> },
  { name: 'Footwear', image: shoeImg, icon: <FiShoppingBag /> },
  { name: 'Home Decor', image: homeImg, icon: <FiHome /> },
  { name: 'Beauty', image: beautyImg, icon: <FiSmile /> },
  { name: 'Accessories', image: watchImg, icon: <FiWatch /> }
];

export default function Cards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="collection-section">
      <div className="collection-header">
        <h1 className="subtitle">SHOP BY CATEGORY</h1>
       
      </div>

      <div className="category-carousel-wrapper">
        <button className="scroll-button left" onClick={() => scroll('left')} aria-label="Scroll left">
          <FiChevronLeft size={24} />
        </button>

        <div className="category-cards-container" ref={scrollRef}>
        {categories.map((cat, index) => (
          <div key={`${cat.name}-${index}`} className="category-new-card">
            <div className="category-new-card-image">
              <img src={cat.image} alt={cat.name} />
            </div>
            <div className="category-new-card-content">
              <div className="category-icon-wrapper">
                {cat.icon}
              </div>
              <div className="category-text-wrapper">
                <h3>{cat.name}</h3>
                <a href={`/category/${cat.name.toLowerCase().replace(' ', '-')}`} className="shop-now-link">
                  Shop Now <FiArrowRight />
                </a>
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
