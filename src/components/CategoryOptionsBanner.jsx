import React from 'react';
import { Shirt, Scissors } from 'lucide-react';
import './CategoryOptionsBanner.css';

const CategoryOptionsBanner = ({ selectedCategories, setSelectedCategories }) => {
  const options = [
    { id: 'Kurti', label: 'Kurtis', icon: <Scissors size={24} />, color: '#ff7eb3', gradient: 'linear-gradient(135deg, #ff7eb3 0%, #ff758c 100%)' },
    { id: 'T-Shirt', label: 'T-Shirts', icon: <Shirt size={24} />, color: '#84fab0', gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)' },
    { id: 'Shirt', label: 'Shirts', icon: <Shirt size={24} />, color: '#fccb90', gradient: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)' },
    { id: 'Suit', label: 'Suits', icon: <Scissors size={24} />, color: '#a18cd1', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }
  ];

  const handleSelect = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(c => c !== categoryId));
    } else {
      setSelectedCategories([categoryId]); 
    }
  };

  return (
    <div className="category-options-banner">
      <div className="category-options-container">
        {options.map(option => (
          <div 
            key={option.id} 
            className={`category-option-card ${selectedCategories.includes(option.id) ? 'active' : ''}`}
            onClick={() => handleSelect(option.id)}
            style={{ '--hover-gradient': option.gradient }}
          >
            <div className="category-icon-wrapper" style={{ background: option.gradient }}>
              {option.icon}
            </div>
            <h3 className="category-option-title">{option.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryOptionsBanner;
