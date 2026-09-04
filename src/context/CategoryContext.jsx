import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCategories } from '../services/api';

const CategoryContext = createContext();

export const useCategories = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchCats = async () => {
      setLoadingCategories(true);
      try {
        const res = await getCategories();
        if (!cancelled) {
          const cats = res?.data?.data || res?.data || [];
          setCategories(Array.isArray(cats) ? cats : []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error('CategoryContext: Failed to fetch categories', err);
          setCategoryError(err.message || 'Failed to load categories');
          setCategories([]);
        }
      } finally {
        if (!cancelled) setLoadingCategories(false);
      }
    };
    fetchCats();
    return () => { cancelled = true; };
  }, []);

  const refreshCategories = async () => {
    setLoadingCategories(true);
    setCategoryError(null);
    try {
      const res = await getCategories();
      const cats = res?.data?.data || res?.data || [];
      setCategories(Array.isArray(cats) ? cats : []);
    } catch (err) {
      console.error('CategoryContext: Failed to refresh categories', err);
      setCategoryError(err.message || 'Failed to load categories');
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <CategoryContext.Provider value={{ categories, loadingCategories, categoryError, refreshCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
