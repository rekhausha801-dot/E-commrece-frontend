import React, { useState, useEffect } from 'react';
import { Bell, Package, Tag, CreditCard, Check, CheckCircle2, Trash2, MailOpen, Gift } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './Notifications.css';

const Notifications = () => {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotification();
  const [activeTab, setActiveTab] = useState('All');

  // Mark all notifications as read when viewing the notifications page
  useEffect(() => {
    if (notifications.some(n => !n.read)) {
      markAllAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = ['All', 'collection', 'ticket', 'order', 'offer', 'payment', 'reward'];
  
  // Format tab names for display
  const getTabDisplayName = (tabName) => {
    if (tabName === 'All') return 'All';
    return tabName.charAt(0).toUpperCase() + tabName.slice(1) + 's';
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter notifications by active tab
  const filteredNotifications = notifications.filter(n => 
    activeTab === 'All' ? true : n.type === activeTab
  );


  const formatTimeAgo = (createdAt, fallbackTime) => {
    let date;
    if (createdAt) {
      date = new Date(createdAt);
    } else if (fallbackTime && fallbackTime !== 'Just now' && !isNaN(new Date(fallbackTime).getTime())) {
      date = new Date(fallbackTime);
    } else {
      // For older notifications that don't have a createdAt timestamp in local storage,
      // fallback to yesterday so the time isn't empty. New ones will have createdAt.
      date = new Date();
      date.setDate(date.getDate() - 1);
    }

    const now = new Date();
    
    // Check if less than 60 seconds ago (Just now)
    const diffInSeconds = Math.floor((now - date) / 1000);
    // Use Math.abs to handle minor client/server clock skew
    if (Math.abs(diffInSeconds) < 60) {
      return 'Just now';
    }
    
    const isToday = date.getDate() === now.getDate() && 
                    date.getMonth() === now.getMonth() && 
                    date.getFullYear() === now.getFullYear();
    
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.getDate() === yesterday.getDate() && 
                        date.getMonth() === yesterday.getMonth() && 
                        date.getFullYear() === yesterday.getFullYear();

    const timeString = date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });

    if (isToday) {
      return timeString;
    } else if (isYesterday) {
      return `Yesterday ${timeString}`;
    } else {
      const isCurrentYear = date.getFullYear() === now.getFullYear();
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        ...(isCurrentYear ? {} : { year: 'numeric' }) 
      });
    }
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'collection': return <Tag size={20} />;
      case 'ticket': return <Bell size={20} />;
      case 'order': return <Package size={20} />;
      case 'offer': return <Tag size={20} />;
      case 'payment': return <CreditCard size={20} />;
      case 'reward': return <Gift size={20} />;
      default: return <Bell size={20} />;
    }
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div className="notifications-title-area">
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <div className="unread-badge">{unreadCount} New</div>
          )}
        </div>
        
        {unreadCount > 0 && (
          <button className="mark-all-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="notifications-tabs">
        {tabs.map(tab => (
          <button 
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {getTabDisplayName(tab)}
          </button>
        ))}
      </div>

      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-card ${!notification.read ? 'unread' : ''}`}
            >
              <div className={`notification-icon-wrapper icon-${notification.type.toLowerCase()}`}>
                {getIconForType(notification.type)}
              </div>
              
              <div className="notification-content">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-message">{notification.message}</p>
                {notification.link && (
                  <a href={notification.link} className="notification-link" style={{ color: '#c99a53', fontSize: '14px', marginTop: '4px', display: 'inline-block', textDecoration: 'none', fontWeight: 'bold' }}>
                    View Details
                  </a>
                )}
                <span className="notification-time">{formatTimeAgo(notification.createdAt, notification.time)}</span>
              </div>
              
              <div className="notification-actions">
                {!notification.read ? (
                  <button 
                    className="action-btn mark-read-btn" 
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as Read"
                  >
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                  </button>
                ) : (
                  <div style={{ height: '32px' }}></div>
                )}
                
                <button 
                  className="action-btn delete-btn" 
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete Notification"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <MailOpen size={48} strokeWidth={1} />
            <h3>No Notifications Here</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;

