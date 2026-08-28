import React, { useState } from 'react';
import { Bell, Package, Tag, CreditCard, Check, CheckCircle2, Trash2, MailOpen, Gift } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import './Notifications.css';

const Notifications = () => {
  const { notifications, markAsRead, deleteNotification, markAllAsRead } = useNotification();
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'order', 'offer', 'payment', 'reward'];
  
  // Format tab names for display
  const getTabDisplayName = (tabName) => {
    if (tabName === 'All') return 'All';
    return tabName.charAt(0).toUpperCase() + tabName.slice(1) + 's';
  };

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  React.useEffect(() => {
    if (unreadCount > 0 && markAllAsRead) {
      markAllAsRead();
    }
  }, [unreadCount, markAllAsRead]);

  // Filter notifications by active tab
  const filteredNotifications = notifications.filter(n => 
    activeTab === 'All' ? true : n.type === activeTab
  );

  const getIconForType = (type) => {
    switch(type) {
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
                <span className="notification-time">{notification.time}</span>
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

