import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  // Load from local storage initially to persist data across refreshes
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Save to local storage whenever wishlist changes
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
