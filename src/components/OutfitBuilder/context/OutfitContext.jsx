import React, { createContext, useState } from 'react';

export const OutfitContext = createContext();

export const OutfitProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  
  // Add item to outfit
  const addItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  // Remove item from outfit
  const removeItem = (itemId) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const value = {
    selectedItems,
    addItem,
    removeItem,
  };

  return (
    <OutfitContext.Provider value={value}>
      {children}
    </OutfitContext.Provider>
  );
};
