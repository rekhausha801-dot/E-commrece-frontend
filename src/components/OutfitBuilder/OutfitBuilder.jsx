import React from 'react';
import { OutfitProvider } from './context/OutfitContext';
import './styles/OutfitBuilder.css';

const OutfitBuilder = () => {
  return (
    <OutfitProvider>
      <div className="outfit-builder-container">
        <h2>Create Your Outfit</h2>
        {/* We will integrate Canvas, Toolbar, and Product components here */}
      </div>
    </OutfitProvider>
  );
};

export default OutfitBuilder;
