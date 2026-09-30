import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPreferencesApi } from '../services/api';

const defaultContext = {
  settings: {},
  setSettings: () => {},
  loading: false,
  formatCurrency: (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`,
  formatDate: (date) => date ? new Date(date).toLocaleDateString() : '-'
};

const SettingsContext = createContext(defaultContext);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context || Object.keys(context).length === 0) {
    console.warn("useSettings context not found. Using default context fallback.");
    return defaultContext;
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    language: 'English',
    timeZone: 'IST',
    dateFormat: 'DD/MM/YYYY',
    currency: {
      code: 'INR',
      symbol: '₹',
      name: 'Indian Rupee'
    },
    defaultDashboardView: 'Analytics Dashboard'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await getPreferencesApi();
      if (res.data) {
        setSettings({
          ...settings,
          ...res.data
        });
      }
    } catch (error) {
      console.error('Error loading global settings:', error);
    } finally {
      setLoading(false);
    }
  };

 
  const formatCurrency = (amount) => {
    let num = amount;
    if (typeof amount === 'string') {
      num = Number(amount.replace(/[^\d.]/g, ''));
    } else {
      num = Number(amount) || 0;
    }
    const { code, symbol } = settings.currency;
    
    
    return `${symbol}${num.toLocaleString(code === 'INR' ? 'en-IN' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  
 
  const formatDate = (date) => {
    if (!date) return '-';
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return '-';
      
      const format = settings.dateFormat;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      
      if (format === 'MM/DD/YYYY') return `${month}/${day}/${year}`;
      if (format === 'YYYY-MM-DD') return `${year}-${month}-${day}`;
      return `${day}/${month}/${year}`; 
    } catch (e) {
      return '-';
    }
  };

  const value = {
    settings,
    setSettings, 
    loading,
    formatCurrency,
    formatDate
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
