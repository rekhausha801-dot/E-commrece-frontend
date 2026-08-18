import React, { createContext, useState, useContext, useEffect } from 'react';
import kurtiImg from '../assets/images/kurti.png';
import mens1Img from '../assets/images/mens1.png';

const CartContext = createContext();

const initialCart = [
  {
    id: 1,
    brand: 'APPLE',
    title: 'AirPods Pro (2nd generation)',
    color: 'White',
    size: 'One Size',
    price: 249.00,
    oldPrice: 299.00,
    discount: '15% OFF',
    image: kurtiImg,
    stock: 'In Stock',
    delivery: 'Tomorrow, by 8 PM',
    rating: '4.9',
    reviews: '2,450',
    qty: 1
  },
  {
    id: 2,
    brand: 'ZARA',
    title: 'Structured Wool Blend Coat',
    color: 'Camel',
    size: 'M',
    price: 159.99,
    oldPrice: 199.99,
    discount: '20% OFF',
    image: mens1Img,
    stock: 'In Stock',
    delivery: 'Wednesday, by 9 PM',
    rating: '4.8',
    reviews: '1,230',
    qty: 1
  }
];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse cart items", e);
      }
    }
    return initialCart;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      // Make sure the item has a price and qty when added to cart
      const newProduct = {
        ...product,
        price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 499 : product.price || 499,
        qty: 1
      };
      return [newProduct, ...prev];
    });
  };

  const updateItemDetails = (id, newDetails) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, ...newDetails };
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={{ cartItems, updateQty, removeItem, clearCart, addToCart, updateItemDetails }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
