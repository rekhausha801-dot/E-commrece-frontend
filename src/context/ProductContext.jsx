import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProducts } from '../services/productService';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      if (res.success && res.data && res.data.products) {
        setProducts(res.data.products);
      } else if (res.success && Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        setError(res.message || 'Failed to load products');
      }
    } catch (err) {
      console.error("Failed to fetch products for context:", err);
      setError("An error occurred while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const refreshProducts = () => {
    fetchAllProducts();
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
};
