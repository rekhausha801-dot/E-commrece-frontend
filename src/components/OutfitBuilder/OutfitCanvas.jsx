import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OutfitCanvas = ({ items, onRemove, canvasRef }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastItemCount, setLastItemCount] = useState(items.length);

  // Trigger "AI Loading" whenever a new item is added
  useEffect(() => {
    if (items.length > lastItemCount) {
      setIsGenerating(true);
      setTimeout(() => setIsGenerating(false), 1500);
    }
    setLastItemCount(items.length);
  }, [items.length, lastItemCount]);

  const determineSlot = (category) => {
    if (!category) return 'top';
    const cat = category.toLowerCase();
    if (cat.includes('jacket') || cat.includes('hoodie')) return 'jacket';
    if (cat.includes('top') || cat.includes('shirt') || cat.includes('dress')) return 'top';
    if (cat.includes('jean') || cat.includes('pant') || cat.includes('short') || cat.includes('bottom')) return 'bottom';
    if (cat.includes('shoe') || cat.includes('heel') || cat.includes('sneaker')) return 'shoe';
    if (cat.includes('bag')) return 'bag';
    if (cat.includes('watch')) return 'watch';
    if (cat.includes('sunglass')) return 'sunglasses';
    return 'top';
  };

  const itemStyle = (slot) => {
    let top = 0, left = 0, width = '100%', height = '100%', zIndex = 20;
    switch (slot) {
      case 'top': top = '22%'; left = '25%'; width = '50%'; height = '25%'; zIndex = 21; break;
      case 'bottom': top = '43%'; left = '25%'; width = '50%'; height = '45%'; zIndex = 20; break;
      case 'jacket': top = '22%'; left = '20%'; width = '60%'; height = '35%'; zIndex = 22; break;
      case 'shoe': top = '88%'; left = '25%'; width = '50%'; height = '12%'; zIndex = 23; break;
      case 'bag': top = '40%'; left = '5%'; width = '30%'; height = '30%'; zIndex = 25; break;
      case 'watch': top = '48%'; left = '22%'; width = '10%'; height = '5%'; zIndex = 24; break;
      case 'sunglasses': top = '12%'; left = '38%'; width = '24%'; height = '8%'; zIndex = 26; break;
      default: break;
    }

    // Create SVG masks to crop the square photos into clothing shapes!
    let maskImage = 'none';
    if (slot === 'top') {
      const topSvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20,0 L80,0 L100,30 L80,40 L80,100 L20,100 L20,40 L0,30 Z" fill="black"/></svg>';
      maskImage = `url("data:image/svg+xml,${encodeURIComponent(topSvg)}")`;
    } else if (slot === 'bottom') {
      const bottomSvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10,0 L90,0 L90,100 L60,100 L50,30 L40,100 L10,100 Z" fill="black"/></svg>';
      maskImage = `url("data:image/svg+xml,${encodeURIComponent(bottomSvg)}")`;
    } else if (slot === 'jacket') {
      const jacketSvg = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15,0 L85,0 L100,50 L80,60 L80,100 L20,100 L20,60 L0,50 Z" fill="black"/></svg>';
      maskImage = `url("data:image/svg+xml,${encodeURIComponent(jacketSvg)}")`;
    }

    return {
      position: 'absolute', top, left, width, height,
      objectFit: 'cover', zIndex,
      WebkitMaskImage: maskImage,
      WebkitMaskSize: '100% 100%',
      WebkitMaskRepeat: 'no-repeat',
      filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
      borderRadius: '20px'
    };
  };

  // Realistic 3D Avatar Image
  const renderAvatar = () => (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
      <img src="/assets/realistic_avatar_base.png" alt="Realistic Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );

  return (
    <div className="ob-canvas-area" ref={canvasRef} id="outfit-canvas" style={{ position: 'relative', background: '#faf8f5', overflow: 'hidden' }}>
      {renderAvatar()}

      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '20px' }}
          >
            <motion.div animate={{ rotate: 360, scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Sparkles size={40} color="#d4af37" />
            </motion.div>
            <h3 style={{ marginTop: '20px', fontWeight: 700, color: '#333' }}>AI Processing...</h3>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>Fitting garment to avatar</p>
          </motion.div>
        )}

        {items.filter(item => item.category !== 'Avatars').map((item) => {
          const slot = determineSlot(item.category);
          return (
            <div key={item.canvasId} style={{ ...itemStyle(slot), position: 'absolute' }}>
              <motion.img
                src={item.image} alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); onRemove(item.canvasId); }}
                style={{ position: 'absolute', top: -10, right: -10, background: 'red', color: 'white', borderRadius: '50%', padding: '4px', border: 'none', cursor: 'pointer', zIndex: 30 }}
                title="Remove"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
export default OutfitCanvas;
