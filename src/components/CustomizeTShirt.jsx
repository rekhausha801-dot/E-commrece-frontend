import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Check, Shield, Truck, RotateCcw, Award, Camera, Home, PenTool, Image as ImageIcon, Smile, Sun, Wind, Navigation, Headphones, Palmtree, Maximize } from 'lucide-react';
import './CustomizeTShirt.css';


import defaultMainImage from '../assets/images/t-shirt8.png';

const DESIGNS = [
  { id: 1, name: 'Design 1', icon: <ImageIcon size={48} strokeWidth={1} /> },
  { id: 2, name: 'Design 2', icon: <Camera size={48} strokeWidth={1} /> },
  { id: 3, name: 'Design 3', icon: <PenTool size={48} strokeWidth={1} /> },
  { id: 4, name: 'Design 4', icon: <Smile size={48} strokeWidth={1} /> },
  { id: 5, name: 'Design 5', icon: <Sun size={48} strokeWidth={1} /> },
  { id: 6, name: 'Design 6', icon: <Wind size={48} strokeWidth={1} /> },
  { id: 7, name: 'Design 7', icon: <Navigation size={48} strokeWidth={1} /> },
  { id: 8, name: 'Design 8', icon: <Home size={48} strokeWidth={1} /> },
  { id: 9, name: 'Design 9', icon: <Headphones size={48} strokeWidth={1} /> },
  { id: 10, name: 'Design 10', icon: <Palmtree size={48} strokeWidth={1} /> },
];

export default function CustomizeTShirt() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product || { image: defaultMainImage, title: "Women's T-Shirt" };
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  const mainImage = product.image || defaultMainImage;
  
  return (
    <div className="customize-page">
      <div className="customize-container">
       
        <div className="customize-left">
          <div className="customize-main-img-wrap">
            <span className="customize-badge">20% OFF</span>
            <button className="customize-wishlist-btn">
              <Heart size={20} />
            </button>
            <img src={mainImage} alt="Main Product" className="customize-main-img" />
          </div>
          <div className="customize-thumbnails">
            {[1, 2, 3, 4].map((idx) => (
              <div 
                key={idx} 
                className={`customize-thumb ${activeThumb === idx - 1 ? 'active' : ''}`}
                onClick={() => setActiveThumb(idx - 1)}
              >
                <img src={mainImage} alt={`Thumb ${idx}`} />
              </div>
            ))}
          </div>
        </div>

       
        <div className="customize-right">
          <h1 className="customize-page-title">Customise Your T-Shirt</h1>
          
          <div className="customize-progress">
            <div className="step-item">
              <div className="step-icon"><PenTool size={16} /></div>
              <span className="step-label">Style</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item active">
              <div className="step-icon active">2</div>
              <span className="step-label active">Design</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item">
              <div className="step-icon"><Maximize size={16} /></div>
              <span className="step-label">Size</span>
            </div>
          </div>

          <div className="customize-step-content">
            <h2 className="step-title">2. Choose Your Design</h2>
            <p className="step-subtitle">Pick a design that you want to print on your t-shirt.</p>

            <div className="designs-grid">
              {DESIGNS.map((design) => (
                <div 
                  key={design.id} 
                  className={`design-card ${selectedDesign === design.id ? 'selected' : ''}`}
                  onClick={() => setSelectedDesign(design.id)}
                >
                  {selectedDesign === design.id && (
                    <div className="design-selected-check">
                      <Check size={14} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                  <div className="design-icon-wrap">
                    {design.icon}
                  </div>
                  <span className="design-name">{design.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="customize-bottom-bar">
        <div className="bottom-bar-content">
          <div className="bottom-bar-left">
            <div className="bottom-thumb-wrap">
              <img src={mainImage} alt="Thumbnail" />
            </div>
            <div className="bottom-product-info">
              <h4>Round Neck T-Shirt</h4>
              <p>Color: White &nbsp;|&nbsp; Fabric: 180 GSM Cotton</p>
            </div>
          </div>
          
          <div className="bottom-bar-right">
            <div className="bottom-price-info">
              <span className="price-current">₹699</span>
              <span className="price-old">₹999</span>
              <span className="price-discount">30% OFF</span>
            </div>
            <button className="proceed-btn" onClick={() => alert("Proceeding to Size selection!")}>
              <ShoppingCart size={18} /> PROCEED TO SIZE
            </button>
          </div>
        </div>
      </div>

      {/* Features Bar */}
      <div className="customize-features">
        <div className="feature-item">
          <Award className="feature-icon" size={24} />
          <div>
            <h5>Premium Fabric</h5>
            <p>180 GSM Cotton</p>
          </div>
        </div>
        <div className="feature-item">
          <RotateCcw className="feature-icon" size={24} />
          <div>
            <h5>7 Days Return</h5>
            <p>Easy Returns</p>
          </div>
        </div>
        <div className="feature-item">
          <Truck className="feature-icon" size={24} />
          <div>
            <h5>Fast Delivery</h5>
            <p>2-4 Working Days</p>
          </div>
        </div>
        <div className="feature-item">
          <Shield className="feature-icon" size={24} />
          <div>
            <h5>Secure Payment</h5>
            <p>100% Secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
