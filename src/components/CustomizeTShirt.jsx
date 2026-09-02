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
  const DESIGN_COLORS = ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#008000', '#FFFF00', '#FFC0CB', '#808080'];
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedDesignColor, setSelectedDesignColor] = useState('#000000');
  const [showRgbPicker, setShowRgbPicker] = useState(false);
  const [rgbColor, setRgbColor] = useState({ r: 0, g: 0, b: 0 });

  const [activeThumb, setActiveThumb] = useState(0);

  const availableDesigns = (product?.designs && product.designs.length > 0)
    ? product.designs
    : DESIGNS;

  const selectedDesignObj = availableDesigns.find(d => d.id === selectedDesign || d._id === selectedDesign);
  const mainImage = product.image || defaultMainImage;

  return (
    <div className="customize-page">
      <div className="customize-container">

        <div className="customize-left">
          <div className="customize-main-img-wrap" style={{ position: 'relative' }}>
            <span className="customize-badge">20% OFF</span>
            <button className="customize-wishlist-btn">
              <Heart size={20} />
            </button>
            <img src={mainImage} alt="Main Product" className="customize-main-img" style={{ width: '100%', display: 'block' }} />

            {/* Design Overlay */}
            {selectedDesignObj && (
              <div style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '140px',
                height: '140px',
                mixBlendMode: 'multiply'
              }}>
                {typeof selectedDesignObj.icon === 'string' || selectedDesignObj.iconName ? (
                  selectedDesignObj.icon ? (
                    <img src={selectedDesignObj.icon} alt={selectedDesignObj.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : (
                    <ImageIcon size={140} color={selectedDesignColor} strokeWidth={1} />
                  )
                ) : (
                  React.isValidElement(selectedDesignObj.icon)
                    ? React.cloneElement(selectedDesignObj.icon, { size: 140, color: selectedDesignColor })
                    : <ImageIcon size={140} color={selectedDesignColor} strokeWidth={1} />
                )}
              </div>
            )}
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
              {availableDesigns.map((design) => {
                const desId = design.id || design._id;
                const isSelected = selectedDesign === desId;
                return (
                  <div
                    key={desId}
                    className={`design-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDesign(desId)}
                  >
                    {isSelected && (
                      <div className="design-selected-check">
                        <Check size={14} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                    <div className="design-icon-wrap" style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {typeof design.icon === 'string' ? (
                        <img src={design.icon} alt={design.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                      ) : React.isValidElement(design.icon) ? (
                        design.icon
                      ) : (
                        <ImageIcon size={48} strokeWidth={1} />
                      )}
                    </div>
                    <span className="design-name">{design.name}</span>
                  </div>
                );
              })}
            </div>
            {/* Design Color Picker */}
            {selectedDesign && (
              <div className="design-color-picker" style={{ marginTop: '24px', animation: 'fadeIn 0.3s ease-in-out' }}>
                <h3 className="step-subtitle" style={{ marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase' }}>DESIGN COLOR :</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {DESIGN_COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => { setSelectedDesignColor(color); setShowRgbPicker(false); }}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%',
                        backgroundColor: color,
                        cursor: 'pointer',
                        border: color === '#FFFFFF' ? '1px solid #e5e7eb' : 'none',
                        outline: selectedDesignColor === color && !showRgbPicker ? '2px solid var(--primary-color)' : 'none',
                        outlineOffset: '2px',
                        padding: 0
                      }}
                      title={`Color: ${color}`}
                    />
                  ))}
                  {/* Custom RGB Color Picker Toggle */}
                  <button
                    onClick={() => setShowRgbPicker(!showRgbPicker)}
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(to right, #ff0000, #00ff00, #0000ff)',
                      cursor: 'pointer',
                      border: showRgbPicker ? '2px solid var(--primary-color)' : '1px solid #ccc',
                      padding: 0
                    }}
                    title="Custom RGB Color"
                  />

                  {/* Reset Button */}
                  <button
                    onClick={() => { setSelectedDesignColor('#000000'); setShowRgbPicker(false); setRgbColor({ r: 0, g: 0, b: 0 }); }}
                    style={{ fontSize: '13px', fontWeight: '600', padding: '8px 12px', borderRadius: '4px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#333' }}
                  >
                    Reset
                  </button>
                </div>

                {/* RGB Sliders */}
                {showRgbPicker && (
                  <div style={{ marginTop: '16px', padding: '16px', background: '#faf5eb', borderRadius: '10px', border: '1px solid #f0e6d2' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {['r', 'g', 'b'].map((channel) => (
                        <div key={channel} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ width: '16px', fontWeight: '800', fontSize: '12px', color: channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6', textTransform: 'uppercase' }}>{channel}</span>
                          <input
                            type="range"
                            min="0" max="255"
                            value={rgbColor[channel]}
                            onChange={(e) => {
                              const newRgb = { ...rgbColor, [channel]: parseInt(e.target.value) };
                              setRgbColor(newRgb);
                              setSelectedDesignColor(`#${(1 << 24 | newRgb.r << 16 | newRgb.g << 8 | newRgb.b).toString(16).slice(1)}`);
                            }}
                            style={{ flex: 1, accentColor: channel === 'r' ? '#ef4444' : channel === 'g' ? '#22c55e' : '#3b82f6' }}
                          />
                          <span style={{ width: '30px', fontSize: '12px', fontWeight: '600', color: '#444', textAlign: 'right' }}>{rgbColor[channel]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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
