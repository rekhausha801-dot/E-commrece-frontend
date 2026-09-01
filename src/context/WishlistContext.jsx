import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
 
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up the dummy items that were temporarily injected into local storage
        const dummyIds = ['r1', 'r2', 'r4', 'r5'];
        const validItems = parsed.filter(item => !dummyIds.includes(String(item.id)));
        
        if (validItems.length !== parsed.length) {
          localStorage.setItem('wishlist', JSON.stringify(validItems));
        }
        
        return validItems;
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    const exists = wishlistItems.find((item) => String(item.id) === String(product.id));
    if (exists) {
      message.info('Removed from Wishlist');
      setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(product.id)));
    } else {
      message.success('Added to Wishlist!');
      setWishlistItems((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => String(item.id) !== String(productId)));
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => String(item.id) === String(productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, toggleWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
