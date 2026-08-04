import React, { createContext, useState, useContext } from 'react';
import sareeImage from '../assets/Maroon.png';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD102458',
      date: '29 July 2026',
      product: 'Georgette Embroidery Work Saree',
      size: 'Free Size',
      color: 'Maroon',
      amount: '₹468',
      payment: 'Paid',
      paymentColor: '#2a7e4f',
      status: 'Delivered',
      statusColor: '#2a7e4f',
      statusBg: '#e6f2eb',
      image: sareeImage
    }
  ]);

  const addOrder = (newOrders) => {
    // Prepend new orders so they appear at the top
    setOrders((prevOrders) => [...newOrders, ...prevOrders]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
