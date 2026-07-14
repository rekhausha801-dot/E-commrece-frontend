import React, { useState } from 'react';
import './Cards.css';
import kurtiImg from '../assets/images/kurti.png';
import topImg from '../assets/images/top.png';
import kurthi2Img from '../assets/images/kurthi2.png';
import legImg from '../assets/images/leg.jpeg';
import tshirtImg from '../assets/images/t-shirt.png';
import shirtImg from '../assets/images/shirt.jpeg';
import ethnicWaerImg from '../assets/images/EthnicWaer.png';
import seaImg from '../assets/banners/sea.png';
import driImg from '../assets/banners/dri.png';

const categories = [
  { name: 'Accessories', count: '20 Products', image: 'https://images.unsplash.com/photo-1509941943102-10c232535736?q=80&w=200&auto=format&fit=crop' },
  { name: 'Eyewear', count: '11 Products', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=200&auto=format&fit=crop' },
  { name: 'Fragrance & Body', count: '5 Products', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200&auto=format&fit=crop' },
  { name: 'Leather Goods', count: '5 Products', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=200&auto=format&fit=crop' },
  { name: 'Ready -to-wear', count: '2 Products', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop' },
  { name: 'Shoes', count: '1 Products', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop' }
];


export default function Cards() {
  const [activeTab, setActiveTab] = useState('Accessories');

  return (
    <div className="collection-section">
      <div className="collection-header">
        {/* <p className="subtitle">Shop by Category</p> */}
        <h2 className="title">Shop by Category</h2>
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
            <span className="category-name">{cat.name}</span>
            <span className="product-count">{cat.count}</span>
          </button>
        ))}
      </div>

      <div className="promo-banners-section">
        <div className="promo-banner-card">
          <img src={seaImg} alt="Seasonal Style" className="promo-bg" />
          <div className="promo-content">
            <span className="promo-subtitle">Seasonal Style</span>
            <h3 className="promo-title">Discover Latest<br/>In Fashion</h3>
            <a href="/shop" className="promo-link">Shop now</a>
          </div>
        </div>
        <div className="promo-banner-card">
          <img src={driImg} alt="New Collection" className="promo-bg" />
          <div className="promo-content">
            <span className="promo-subtitle">New Collection</span>
            <h3 className="promo-title">Discover Style<br/>In Tshirt</h3>
            <a href="/shop" className="promo-link">Shop now</a>
          </div>
        </div>
      </div>

    </div>
  );
}
