import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd';
import { getCustomerNotificationsApi, markCustomerNotificationAsReadApi, markAllCustomerNotificationsAsReadApi } from '../services/api';

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

  const fetchServerNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const res = await getCustomerNotificationsApi();
      if (res.data && res.data.success) {
        // Map backend notifications to frontend format
        const serverNotifs = res.data.data.map(n => ({
          id: n._id,
          title: n.title,
          message: n.message,
          type: n.type ? n.type.toLowerCase() : 'system',
          time: new Date(n.createdAt).toLocaleDateString(),
          read: n.isRead,
          link: n.link
        }));
        
        setNotifications(serverNotifs);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchServerNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(() => {
      fetchServerNotifications();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      read: false,
    };
    
    setNotifications((prev) => [newNotification, ...prev]);
    message.success(notification.title || 'New Notification received!');
  };

  const markAsRead = async (id) => {
    setNotifications((prev) => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    try {
      await markCustomerNotificationAsReadApi(id);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter(n => n.id !== id));
    // Optional: add delete API call here if supported
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
    try {
      await markAllCustomerNotificationsAsReadApi();
    } catch (e) {
      console.error(e);
    }
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
