import React, { createContext, useState, useContext, useEffect } from 'react';
import kurtiImg from '../assets/images/kurti.png';
import mens1Img from '../assets/images/mens1.png';

const CartContext = createContext();

const initialCart = [];

export const CartProvider = ({ children }) => {
  const [buyNowData, setBuyNowData] = useState(() => {
    const saved = localStorage.getItem('buyNowData');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const saved = localStorage.getItem('selectedAddress');
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(() => {
    const saved = localStorage.getItem('selectedPaymentMethod');
    return saved ? JSON.parse(saved) : null;
  });

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

  useEffect(() => {
    if (buyNowData) {
      localStorage.setItem('buyNowData', JSON.stringify(buyNowData));
    } else {
      localStorage.removeItem('buyNowData');
    }
  }, [buyNowData]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    } else {
      localStorage.removeItem('selectedAddress');
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (selectedPaymentMethod) {
      localStorage.setItem('selectedPaymentMethod', JSON.stringify(selectedPaymentMethod));
    } else {
      localStorage.removeItem('selectedPaymentMethod');
    }
  }, [selectedPaymentMethod]);

  
  const activeItems = buyNowData ? buyNowData.items || [buyNowData] : cartItems;
  let subtotal = 0;
  let productDiscount = 0;
  let couponDiscount = 0; 
  let calculatedTax = 0;
  let sumItemsFinal = 0;

  if (buyNowData && buyNowData.pricing) {
    subtotal = buyNowData.pricing.subtotal || 0;
    productDiscount = buyNowData.pricing.productDiscount || 0;
  } else {
    activeItems.forEach(item => {
      const qty = item.qty || item.quantity || 1;
      let original = 0;
      let finalP = 0;
      
      if (typeof item.originalPrice === 'number') original = item.originalPrice;
      else if (typeof item.oldPrice === 'number') original = item.oldPrice;
      else if (item.originalPrice) original = parseFloat(String(item.originalPrice).replace(/[^0-9.-]+/g, "")) || 0;
      else if (item.oldPrice) original = parseFloat(String(item.oldPrice).replace(/[^0-9.-]+/g, "")) || 0;
      
      if (typeof item.finalUnitPrice === 'number') finalP = item.finalUnitPrice;
      else if (typeof item.price === 'number') finalP = item.price; 
      else if (item.price) finalP = parseFloat(String(item.price).replace(/[^0-9.-]+/g, "")) || 0;

      // If original price is not present, calculate it backwards from final price and discount
      if (!original && finalP) {
        if (item.discountAmount) {
          original = finalP + item.discountAmount;
        } else if (item.discount > 0) {
          if (item.discountType === 'Percentage') {
            original = finalP / (1 - item.discount / 100);
          } else {
            original = finalP + item.discount;
          }
        } else {
          original = finalP;
        }
      }

      
      if (original && !finalP) {
        finalP = original;
      }

      
      if (original === finalP) {
        if (item.discountAmount) {
          finalP = original - item.discountAmount;
        } else if (item.discount > 0) {
          if (item.discountType === 'Percentage') {
            finalP = original - ((original * item.discount) / 100);
          } else {
            finalP = original - item.discount;
          }
        }
      }

      const itemTotalDiscount = (original - finalP) * qty;
      const itemTotal = finalP * qty;

      const gstRate = item.gstRate || 0;
      const priceIncludesGST = item.gstIncludedInPrice || item.priceIncludesGST || false;
      let itemGstAmount = 0;

      if (priceIncludesGST) {
        itemGstAmount = (itemTotal * gstRate) / (100 + gstRate);
      } else {
        itemGstAmount = (itemTotal * gstRate) / 100;
      }

      subtotal += original * qty;
      if (original > finalP) {
        productDiscount += itemTotalDiscount;
      }
      calculatedTax += itemGstAmount;
      sumItemsFinal += priceIncludesGST ? itemTotal : itemTotal + itemGstAmount;
    });
  }

  const [dynamicShippingFee, setDynamicShippingFee] = useState(0);

  useEffect(() => {
    const fetchShippingFee = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token && subtotal > 0) {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
          const cityQuery = selectedAddress?.city ? `&city=${encodeURIComponent(selectedAddress.city)}` : '';
          const res = await fetch(`${API_URL}/checkout/shipping-fee?subtotal=${subtotal}${cityQuery}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await res.json();
          if (data && data.success) {
            setDynamicShippingFee(data.shippingFee);
          } else {
            setDynamicShippingFee(99);
          }
        } else {
          setDynamicShippingFee(subtotal > 0 ? 99 : 0);
        }
      } catch (err) {
        console.error('Error fetching shipping fee:', err);
        setDynamicShippingFee(subtotal > 0 ? 99 : 0);
      }
    };
    fetchShippingFee();
  }, [subtotal, selectedAddress]);

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
      const existing = prev.find(item => 
        (item.productId === product.id || item.id === product.id) &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize &&
        item.selectedDesign?.id === product.selectedDesign?.id
      );

      if (existing) {
        return prev.map(item => item === existing ? { ...item, qty: item.qty + (product.quantity || 1) } : item);
      }
     
      const newProduct = {
        ...product,
        productId: product.id,
        id: `${product.id}-${Date.now()}`,
        price: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.-]+/g, "")) || 499 : product.price || 499,
        qty: product.quantity || 1
      };
      return [newProduct, ...prev];
    });
  };

  const updateItemDetails = (id, newDetails) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id || item._id === id || item.productId === id) {
        return { ...item, ...newDetails };
      }
      return item;
    }));

    setBuyNowData(prev => {
      if (!prev) return prev;
      const updatedItems = prev.items.map(item => {
        if (item.id === id || item.productId === id || item._id === id) {
          return { ...item, ...newDetails };
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  const clearBuyNowData = () => {
    setBuyNowData(null);
  };

  const clearSelectedAddress = () => {
    setSelectedAddress(null);
  };

  const clearSelectedPaymentMethod = () => {
    setSelectedPaymentMethod(null);
  };



  const appliedShippingFee = subtotal > 0 ? dynamicShippingFee : 0;
  
  let finalSubtotal = subtotal;
  let finalProductDiscount = productDiscount;
  let finalTax = calculatedTax;
  let finalSumItems = sumItemsFinal;

  if (buyNowData && buyNowData.pricing) {
    finalSubtotal = buyNowData.pricing.subtotal || 0;
    finalProductDiscount = buyNowData.pricing.productDiscount || 0;
    finalTax = buyNowData.pricing.gstAmount || buyNowData.pricing.tax || 0;
  
    finalSumItems = finalSubtotal - finalProductDiscount + finalTax; 
  }

  const finalShippingFee = finalSubtotal > 0 ? dynamicShippingFee : 0;
  const finalGrandTotal = finalSubtotal > 0 ? Math.max(0, finalSumItems - couponDiscount + finalShippingFee) : 0;

  const cartPricing = {
    subtotal: finalSubtotal,
    productDiscount: finalProductDiscount,
    couponDiscount,
    shippingFee: finalShippingFee,
    tax: finalTax,
    grandTotal: finalGrandTotal
  };
 

  return (
    <CartContext.Provider value={{ 
      cartItems, updateQty, removeItem, clearCart, addToCart, updateItemDetails,
      buyNowData, setBuyNowData, clearBuyNowData,
      selectedAddress, setSelectedAddress, clearSelectedAddress,
      selectedPaymentMethod, setSelectedPaymentMethod, clearSelectedPaymentMethod,
      dynamicShippingFee, setDynamicShippingFee,
      cartPricing
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
