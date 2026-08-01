import React from 'react';
import { outfitCategories } from '../../data/outfitProducts';

const CategoryFilter = ({ activeCategory, setActiveCategory, searchTerm, setSearchTerm }) => {
  return (
    <div className="ob-left-panel">
      <input type="text" placeholder="Search products..." className="ob-search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="ob-category-list">
        {outfitCategories.map((category) => (
          <div key={category} className={`ob-category-item ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryFilter;
