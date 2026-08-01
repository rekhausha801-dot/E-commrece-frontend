import React from 'react';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onAdd }) => {
  return (
    <motion.div className="ob-product-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} whileHover={{ y: -4 }}>
      <img src={product.image} alt={product.name} className="ob-product-img" loading="lazy" />
      <div className="ob-product-info">
        <div className="ob-product-brand">{product.brand}</div>
        <div className="ob-product-name">{product.name}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
          <div className="ob-product-price">₹{product.price}</div>
          <div style={{ fontSize: '0.8rem', color: '#ffb400' }}>★ {product.rating}</div>
        </div>
        <button className="ob-add-btn" onClick={() => onAdd(product)}>
          <Plus size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Add to Outfit
        </button>
      </div>
    </motion.div>
  );
};
export default ProductCard;
