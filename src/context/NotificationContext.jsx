import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
    };
    
    setNotifications((prev) => [newNotification, ...prev]);
    message.success(notification.title || 'New Notification received!');
  };

  const markAsRead = (id) => {
    setNotifications((prev) => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notifications, 
        setNotifications,
        addNotification, 
        markAsRead, 
        deleteNotification, 
        markAllAsRead 
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
