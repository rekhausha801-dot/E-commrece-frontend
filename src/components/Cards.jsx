import React, { useState } from 'react';
import './Cards.css';
import kurtiImg from '../assets/images/kurti.png';
import topImg from '../assets/images/top.png';
import kurthi2Img from '../assets/images/kurthi2.png';
import legImg from '../assets/images/leg.jpeg';
import tshirtImg from '../assets/images/t-shirt.png';
import shirtImg from '../assets/images/shirt.jpeg';
import ethnicWaerImg from '../assets/images/EthnicWaer.png';

const categories = [
  { name: 'Ethnic Wear', image: ethnicWaerImg },
  { name: 'Western Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop' },
  { name: 'Menswear', image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=200&auto=format&fit=crop' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop' },
  { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=200&auto=format&fit=crop' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=200&auto=format&fit=crop' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1509941943102-10c232535736?q=80&w=200&auto=format&fit=crop' }
];


export default function Cards() {
  const [activeTab, setActiveTab] = useState('Ethnic Wear');

  return (
    <div className="collection-section">
      <div className="collection-header">
        <p className="subtitle">Shop by Category</p>
        <h2 className="title">DISCOVER YOUR . EXPLORE OUR PREMIUM COLLECTIONS</h2>
      </div>

      <div className="collection-tabs">
        {categories.map((cat) => (
          <button 
            key={cat.name} 
            className={`tab-btn ${activeTab === cat.name ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.name)}
          >
            <div className="tab-img-wrapper">
              <img src={cat.image} alt={cat.name} />
            </div>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

    </div>
  );
}
