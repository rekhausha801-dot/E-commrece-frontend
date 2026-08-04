import React from 'react';
import { ShoppingCart, Share2 } from 'lucide-react';

const OutfitSummary = ({ items, totalPrice }) => {
  return (
    <div className="ob-summary">
      <div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>Outfit Total ({items.length} items)</div>
        <div className="ob-summary-price">₹{totalPrice.toLocaleString()}</div>
      </div>
      <div className="ob-action-btns">
        <button className="ob-btn outline" onClick={() => alert("Share feature coming soon!")}><Share2 size={18} /> Share</button>
        <button className="ob-btn primary" onClick={() => alert(`Added ${items.length} items to cart!`)}><ShoppingCart size={18} /> Add All to Cart</button>
      </div>
    </div>
  );
};
export default OutfitSummary;
