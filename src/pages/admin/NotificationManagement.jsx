import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { 
  CheckCircle2, ShoppingCart, CreditCard, 
  Star, Users, AlertTriangle, 
  Clock, ArrowRight, Bell, Settings, MoreVertical, Trash2,
  Undo2,
  LayoutGrid,
  Mail,
  Box,
  Flame,
  Check,
  ChevronRight
} from 'lucide-react';
import { getAdminNotificationsApi, markNotificationAsReadApi, markAllNotificationsAsReadApi, deleteAdminNotificationApi } from '../../services/api';
import './NotificationManagement.css';

export const initialNotifications = [
  // Keeping this for reference if no API is connected or API fails
];

const filters = [
  { label: 'All', icon: <LayoutGrid size={16} />, id: 'All' },
  { label: 'Unread', icon: <Mail size={16} />, id: 'Unread' },
  { label: 'Orders', icon: <ShoppingCart size={16} />, id: 'Orders' },
  { label: 'Payments', icon: <CreditCard size={16} />, id: 'Payments' },
  { label: 'Reviews', icon: <Star size={16} />, id: 'Reviews' },
  { label: 'Customers', icon: <Users size={16} />, id: 'Customers' },
  { label: 'System', icon: <Settings size={16} />, id: 'System' }
];

const getTypeStyles = (type) => {
  switch (type) {
    case 'Orders': return { 
      icon: <ShoppingCart size={24} />, 
      color: '#A67634', bg: '#FBF5ED', dot: '#F5A623', leftBorder: '#A67634' 
    };
    case 'Payments': return { 
      icon: <CreditCard size={24} />, 
      color: '#A67634', bg: '#FCF9F2', dot: '#F5A623', leftBorder: '#D8C3A5' 
    };
    case 'Reviews': return { 
      icon: <Star size={24} />, 
      color: '#8A63D2', bg: '#F4F2FF', dot: 'transparent', leftBorder: '#8A63D2' 
    };
    case 'System': return { 
      icon: <AlertTriangle size={24} />, 
      color: '#EF4444', bg: '#FEF2F2', dot: '#EF4444', leftBorder: '#EF4444' 
    };
    case 'Customers': return { 
      icon: <Users size={24} />, 
      color: '#8B5CF6', bg: '#F5F3FF', dot: '#8B5CF6', leftBorder: '#8B5CF6' 
    };
    default: return { 
      icon: <ShoppingCart size={24} />, 
      color: '#A67634', bg: '#FBF5ED', dot: '#F5A623', leftBorder: '#A67634' 
    };
  }
};

const getPriorityStyles = (priority) => {
  switch (priority) {
    case 'High': return { bg: '#FEF2F2', text: '#EF4444', icon: <Flame size={12} style={{marginRight: 4}}/>, label: 'High Priority' };
    case 'Medium': return { bg: '#FFFBEB', text: '#F59E0B', icon: null, label: 'Medium' };
    case 'Low': return { bg: '#ECFDF5', text: '#10B981', icon: <Check size={12} style={{marginRight: 4}}/>, label: 'Success' };
    case 'New': return { bg: '#F3E8FF', text: '#9333EA', icon: <Star size={12} style={{marginRight: 4}} fill="#9333EA"/>, label: 'New' };
    default: return null;
  }
};

const NotificationManagement = ({ setActiveTab }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [liveNotifications, setLiveNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const res = await getAdminNotificationsApi();
      if (res.data?.success) {
        setLiveNotifications(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const unreadCount = liveNotifications.filter(n => n.unread !== false).length;

  const filteredNotifications = liveNotifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return n.unread !== false;
    return n.type === activeFilter;
  });

  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    const date = new Date(notification.createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    let group = 'Older';
    if (date.toDateString() === today.toDateString()) {
      group = 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      group = 'Yesterday';
    }

    if (!acc[group]) acc[group] = [];
    acc[group].push(notification);
    return acc;
  }, {});

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsReadApi();
      setLiveNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleViewClick = (notif) => {
    if (setActiveTab) {
      if (notif.type === 'Orders' || notif.type === 'Returns') setActiveTab('Orders');
      else if (notif.type === 'Reviews') setActiveTab('Reviews');
      else if (notif.type === 'Payments') setActiveTab('Orders');
      else if (notif.type === 'Customers') setActiveTab('Customers');
      else if (notif.type === 'System') setActiveTab('Settings');
      else setActiveTab('Dashboard');
    }
  };

  const getActionButtonStyle = (type) => {
    if (type === 'Reviews') {
      return { bg: '#FCF9F2', text: '#A67634', border: '1px solid #F0EAD6' };
    }
    if (type === 'Payments') {
      return { bg: '#FCF9F2', text: '#A67634', border: '1px solid #F0EAD6' };
    }
    // Default (Orders etc)
    return { bg: '#A67634', text: '#FFF', border: 'none' };
  };

  return (
    <div className="notification-page-wrapper" style={{ padding: '10px 20px', background: 'transparent', fontFamily: '"Inter", sans-serif' }}>
      <div className="notification-page-container" style={{ 
        background: '#FFFFFF', 
        borderRadius: '24px', 
        padding: '32px 40px', 
        boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        
        {/* Header Section */}
        <div className="notif-header-actions" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              position: 'relative', width: '64px', height: '64px', 
              background: '#FDF7EE', borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              <Bell size={32} color="#A67634" />
              {unreadCount > 0 && (
                <div style={{ 
                  position: 'absolute', top: '-4px', right: '-4px', 
                  background: '#EF4444', color: '#FFF', fontSize: '12px', fontWeight: 'bold', 
                  width: '22px', height: '22px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '2px solid #FFF'
                }}>
                  {unreadCount}
                </div>
              )}
            </div>
            <div>
              <h1 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: '700', color: '#111', fontFamily: '"Playfair Display", serif' }}>Notifications</h1>
              <p style={{ margin: 0, fontSize: '15px', color: '#666' }}>Stay updated with your latest activities</p>
            </div>
          </div>
          
          <button 
            onClick={() => setActiveTab && setActiveTab('Settings')}
            style={{ 
              background: '#FDF7EE', border: '1px solid #F0EAD6', color: '#A67634', 
              padding: '10px 20px', borderRadius: '24px', fontSize: '14px', fontWeight: '600', 
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' 
            }}>
            <Settings size={16} /> Notification Settings <ChevronRight size={16} />
          </button>
        </div>

        {/* Filters Row */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
          {filters.map(filter => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif',
                  cursor: 'pointer',
                  border: isActive ? 'none' : '1px solid #F0F0F0',
                  background: isActive ? '#A67634' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(166, 118, 52, 0.2)' : 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {filter.icon}
                {filter.label}
                {(filter.id === 'All' || filter.id === 'Unread') && unreadCount > 0 && (
                  <span style={{ 
                    background: isActive ? '#FFFFFF' : '#FDF7EE', 
                    color: isActive ? '#A67634' : '#A67634', 
                    borderRadius: '50%', padding: '2px 8px', fontSize: '12px', fontWeight: 'bold' 
                  }}>
                    {filter.id === 'Unread' ? unreadCount : liveNotifications.length}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Notification List Grouped */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {Object.keys(groupedNotifications).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
              No notifications found.
            </div>
          ) : (
            Object.keys(groupedNotifications).map(group => (
              <div key={group}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '4px', height: '24px', background: '#A67634', borderRadius: '4px' }}></div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111' }}>{group}</h3>
                  </div>
                  {group === 'Today' && (
                    <button onClick={markAllAsRead} style={{ 
                      background: '#FDF7EE', border: 'none', color: '#A67634', 
                      padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: '600', 
                      display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' 
                    }}>
                      <Check size={14} /> Mark All as Read
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {groupedNotifications[group].map(notif => {
                    const styles = getTypeStyles(notif.type || 'Orders'); // Default to Orders if no type
                    // Mock priority if not present for the UI to match
                    let priorityObj = getPriorityStyles(notif.priority);
                    if (!priorityObj) {
                      if (notif.type === 'Orders') priorityObj = getPriorityStyles('High');
                      else if (notif.type === 'Payments') priorityObj = getPriorityStyles('Low');
                      else if (notif.type === 'Reviews') priorityObj = getPriorityStyles('New');
                      else priorityObj = getPriorityStyles('Medium');
                    }

                    const actionBtn = getActionButtonStyle(notif.type || 'Orders');

                    return (
                      <div key={notif._id} className="notification-card-item" style={{ 
                        background: styles.bg,
                        borderLeft: `4px solid ${styles.leftBorder}`,
                        borderRadius: '16px',
                        padding: '24px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '20px',
                        position: 'relative'
                      }}>
                        {/* Icon */}
                        <div className="notif-icon" style={{ 
                          width: '56px', height: '56px', borderRadius: '50%', 
                          background: '#FFF', color: styles.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                        }}>
                          {styles.icon}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', minWidth: 0 }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {notif.unread !== false && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: styles.dot }}></div>}
                              <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#111' }}>{notif.title || (notif.type === 'Reviews' ? 'New Review Received' : 'New Activity')}</h4>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              {priorityObj && (
                                <span style={{ 
                                  background: priorityObj.bg, color: priorityObj.text, 
                                  padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                                  display: 'flex', alignItems: 'center'
                                }}>
                                  {priorityObj.icon} {priorityObj.label}
                                </span>
                              )}
                              <span style={{ color: '#888', fontSize: '13px' }}>
                                {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          </div>

                          <p style={{ margin: 0, fontSize: '15px', color: '#555' }}>
                            {notif.message || notif.desc}
                          </p>

                          {/* Extra info & Action Button */}
                          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px', gap: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              {(notif.meta || (notif.type === 'Orders' ? ['₹1879', '1 Item'] : [])).map((tag, idx) => (
                                <span key={idx} style={{ 
                                  background: '#FFF', color: '#A67634', border: '1px solid #F0EAD6',
                                  padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600',
                                  display: 'flex', alignItems: 'center', gap: '6px'
                                }}>
                                  <Box size={14} /> {tag}
                                </span>
                              ))}
                            </div>

                            <button 
                              onClick={() => handleViewClick(notif)}
                              style={{ 
                                background: actionBtn.bg, border: actionBtn.border, color: actionBtn.text, 
                                padding: '8px 16px', borderRadius: '24px', fontSize: '13px', fontWeight: '600', 
                                display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' 
                              }}>
                              {notif.type === 'Orders' ? 'View Order' : notif.type === 'Payments' ? 'View Payment' : notif.type === 'Reviews' ? 'View Review' : 'View Details'} <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
