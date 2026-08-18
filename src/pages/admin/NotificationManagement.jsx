import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { 
  CheckCircle2, ShoppingCart, CreditCard, 
  Star, Users, AlertTriangle, 
  Clock, ArrowRight, Bell, Settings, MoreVertical, Trash2,
  Undo2
} from 'lucide-react';

export const initialNotifications = [
  {
    id: 1,
    type: 'Orders',
    title: 'New Order Received',
    desc: 'Order #ORD12540 has been placed by Arun Kumar',
    meta: ['₹2,499', '2 Items'],
    time: '2 mins ago',
    dateGroup: 'Today',
    priority: 'Medium',
    unread: true,
    actionText: 'View Order',
  },
  {
    id: 5,
    type: 'Returns',
    title: 'Return Request',
    desc: 'Suresh requested a return for Order #ORD12490',
    meta: ['Reason: Defective'],
    time: '4 hours ago',
    dateGroup: 'Today',
    priority: 'High',
    unread: true,
    actionText: 'View Details',
  },
  {
    id: 2,
    type: 'Payments',
    title: 'Payment Successful',
    desc: 'Payment received for Order #ORD12538',
    meta: ['₹4,999 via Razorpay'],
    time: '15 mins ago',
    dateGroup: 'Today',
    priority: 'Low',
    unread: true,
  },
  {
    id: 3,
    type: 'Reviews',
    title: 'New Review Submitted',
    desc: 'Priya submitted a 4★ review for Premium Kurti',
    meta: ['Premium Kurti', '★★★★☆'],
    time: '1 hour ago',
    dateGroup: 'Today',
    priority: 'Low',
    unread: true,
    actionText: 'View Review',
  },
  {
    id: 4,
    type: 'System',
    title: 'Low Stock Alert',
    desc: 'Silk Saree – Maroon has only 3 units remaining',
    meta: ['Action Required'],
    time: '2 hours ago',
    dateGroup: 'Today',
    priority: 'High',
    unread: true,
    actionText: 'View Product',
  },
  {
    id: 6,
    type: 'System',
    title: 'System Alert',
    desc: 'Payment Gateway sync delayed by 5 minutes.',
    meta: ['API Issue'],
    time: '5 hours ago',
    dateGroup: 'Today',
    priority: 'Medium',
    unread: false,
  },
  {
    id: 7,
    type: 'Customers',
    title: 'New Customer Registered',
    desc: 'Rahul Kumar created a new account',
    meta: ['New User'],
    time: '10:24 AM',
    dateGroup: 'Yesterday',
    priority: 'Low',
    unread: false,
  },
  {
    id: 8,
    type: 'Orders',
    title: 'Order Cancelled',
    desc: 'Order #ORD12501 was cancelled by the customer',
    meta: ['Reason: Change of mind'],
    time: '4:15 PM',
    dateGroup: 'Yesterday',
    priority: 'Medium',
    unread: false,
    actionText: 'View Details',
  },
  {
    id: 9,
    type: 'System',
    title: 'Product Out of Stock',
    desc: 'Adidas Running Shoes completely sold out.',
    meta: ['Inventory Empty'],
    time: '2:00 PM',
    dateGroup: 'Yesterday',
    priority: 'High',
    unread: false,
    actionText: 'View Product',
  },
  {
    id: 10,
    type: 'Payments',
    title: 'Refund Requested',
    desc: 'Refund of ₹1,299 requested for Order #ORD12400',
    meta: ['Action Required'],
    time: '1:10 PM',
    dateGroup: 'Yesterday',
    priority: 'High',
    unread: false,
  },
  {
    id: 11,
    type: 'System',
    title: 'Coupon Expiring',
    desc: 'Coupon FESTIVAL50 expires in 24 hours.',
    meta: ['Marketing'],
    time: '10:00 AM',
    dateGroup: 'Older',
    priority: 'Medium',
    unread: false,
  },
  {
    id: 12,
    type: 'Orders',
    title: 'Delivery Failed',
    desc: 'Delivery attempt failed for Order #ORD12399',
    meta: ['Customer unavailable'],
    time: '09:00 AM',
    dateGroup: 'Older',
    priority: 'High',
    unread: false,
    actionText: 'View Order',
  }
];

const filters = ['All', 'Unread', 'Orders', 'Payments', 'Reviews', 'Customers', 'System'];

const getTypeStyles = (type) => {
  switch (type) {
    case 'Orders': return { icon: <ShoppingCart size={20} />, color: '#c9a05b', bg: '#fffbf2', dot: '#c9a05b' };
    case 'Returns': return { icon: <Undo2 size={20} />, color: '#f472b6', bg: '#fdf2f8', dot: '#f472b6' };
    case 'Payments': return { icon: <CreditCard size={20} />, color: '#10b981', bg: '#ecfdf5', dot: '#10b981' };
    case 'Reviews': return { icon: <Star size={20} />, color: '#f59e0b', bg: '#fffbeb', dot: '#f59e0b' };
    case 'System': return { icon: <AlertTriangle size={20} />, color: '#ef4444', bg: '#fef2f2', dot: '#ef4444' };
    case 'Customers': return { icon: <Users size={20} />, color: '#8b5cf6', bg: '#f5f3ff', dot: '#8b5cf6' };
    default: return { icon: <Bell size={20} />, color: '#c9a05b', bg: '#fffbf2', dot: '#c9a05b' };
  }
};

const getPriorityStyles = (priority) => {
  switch (priority) {
    case 'High': return { bg: '#fce8eb', text: '#e75b75' };
    case 'Medium': return { bg: '#fef3dd', text: '#c9a05b' };
    case 'Low': return { bg: '#f3f4f6', text: '#6b7280' };
    default: return { bg: 'transparent', text: 'transparent' };
  }
};

const NotificationManagement = ({ setActiveTab, notifications, setNotifications }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);

  // Use either the passed in notifications or initialNotifications (to prevent crash if passing wrong format)
  const safeNotifications = notifications && notifications[0] && Array.isArray(notifications[0].meta) ? notifications : initialNotifications;

  const unreadCount = safeNotifications.filter(n => n.unread).length;

  const filteredNotifications = safeNotifications.filter(n => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return n.unread;
    return n.type === activeFilter;
  });

  const groupedNotifications = filteredNotifications.reduce((acc, notification) => {
    const group = notification.dateGroup || 'Older';
    if (!acc[group]) acc[group] = [];
    acc[group].push(notification);
    return acc;
  }, {});

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map(n => n.id));
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ 
        background: '#fff', 
        borderRadius: '24px', 
        padding: '32px 40px', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative background wave */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, transparent 20%, #fff 70%), repeating-radial-gradient(circle at center, #f5ebd9 0, #f5ebd9 1px, transparent 1px, transparent 20px)',
          opacity: 0.6, pointerEvents: 'none', borderRadius: '50%'
        }}></div>
        <div style={{
          position: 'absolute', top: '5%', right: '5%', width: '400px', height: '400px',
          border: '1px solid #f9f1e1', borderRadius: '40% 60% 70% 30%', transform: 'rotate(45deg)', pointerEvents: 'none'
        }}></div>

        {/* Header Section */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '26px', fontWeight: '700', color: '#111' }}>Notifications</h1>
              <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Stay updated with your store activity.</p>
              
              {unreadCount > 0 && (
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '6px', 
                  background: '#fffcf6', border: '1px solid #f4e8d3', color: '#c9a05b', 
                  padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', marginTop: '16px' 
                }}>
                  <Bell size={14} />
                  {unreadCount} Unread
                </div>
              )}
            </div>
            
            <button style={{ 
              background: '#fff', border: '1px solid #f4e8d3', color: '#c9a05b', 
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', 
              display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' 
            }}>
              <Settings size={16} /> Notification Settings
            </button>
          </div>
        </div>

        {/* Filters Row */}
        <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
          borderBottom: '1px solid #f5f5f5', paddingBottom: '24px', marginBottom: '32px',
          position: 'relative', zIndex: 1
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif',
                  cursor: 'pointer',
                  border: activeFilter === filter ? '1px solid #c59a54' : '1px solid #f0f0f0',
                  background: activeFilter === filter ? '#c59a54' : '#fafafa',
                  color: activeFilter === filter ? '#fff' : '#4b5563',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              >
                {filter}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input 
              type="checkbox" 
              checked={selectedIds.length === filteredNotifications.length && filteredNotifications.length > 0}
              onChange={toggleSelectAll}
              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#c59a54', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#4b5563', fontFamily: '"Inter", sans-serif' }}>Select All</span>
          </div>
        </div>

        {/* Notification List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 1 }}>
          {Object.keys(groupedNotifications).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '20px', border: '1px dashed #f0ead6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: '#fffbf2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <CheckCircle2 size={32} color="#c9a05b" />
              </div>
              <h3 style={{ margin: '0 0 8px 0', color: '#111', fontSize: '18px', fontWeight: '700' }}>You're all caught up!</h3>
              <p style={{ margin: '0 0 24px 0', color: '#888', fontSize: '14px' }}>No notifications found for this category.</p>
              <button onClick={() => setActiveFilter('All')} style={{ background: '#fff', border: '1px solid #eaddce', padding: '10px 24px', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', color: '#c9a05b', fontSize: '14px', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(201, 160, 91, 0.1)' }}>
                View All Notifications
              </button>
            </div>
          ) : (
            Object.keys(groupedNotifications).map(group => (
              <div key={group}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: '700', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {group}
                </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {groupedNotifications[group].map(notif => {
                  const styles = getTypeStyles(notif.type);
                  const prio = getPriorityStyles(notif.priority);
                  const isSelected = selectedIds.includes(notif.id);

                  return (
                    <div key={notif.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                      {/* Floating Checkbox */}
                      <div style={{ paddingTop: '36px' }}>
                        <input 
                          type="checkbox" 
                          checked={isSelected}
                          onChange={() => toggleSelection(notif.id)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#c59a54' }}
                        />
                      </div>

                      {/* Main Card */}
                      <div style={{ 
                        flex: 1, 
                        background: '#fff', 
                        borderRadius: '24px', 
                        padding: '24px', 
                        display: 'flex', 
                        gap: '20px',
                        position: 'relative',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                        overflow: 'hidden'
                      }}>
                        
                        {/* Icon */}
                        <div style={{ 
                          width: '64px', height: '64px', borderRadius: '16px', 
                          background: styles.bg, color: styles.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 
                        }}>
                          {styles.icon}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          
                          {/* Top Row: Title & Meta */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: styles.dot }}></div>
                              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#222' }}>{notif.title}</h3>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                              <span style={{ background: prio.bg, color: prio.text, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                                {notif.priority}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '13px', fontWeight: '500' }}>
                                <Clock size={14} />
                                {notif.time}
                              </div>
                              <Dropdown menu={{
                                items: [
                                  { key: 'read', label: 'Mark as Read', onClick: () => markAsRead(notif.id) },
                                  { key: 'delete', label: <span style={{ color: '#ef4444' }}>Delete</span>, onClick: () => deleteNotification(notif.id) }
                                ]
                              }} trigger={['click']} placement="bottomRight">
                                <MoreVertical size={20} color="#999" style={{ cursor: 'pointer' }} />
                              </Dropdown>
                            </div>
                          </div>

                          {/* Description */}
                          <p style={{ margin: 0, fontSize: '15px', color: '#555', lineHeight: '1.5' }}>
                            {notif.desc}
                          </p>

                          {/* Bottom Row: Tags & Action */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                              {notif.meta.map((tag, idx) => (
                                <span key={idx} style={{ 
                                  background: styles.bg, color: styles.color, 
                                  padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600' 
                                }}>
                                  {idx === 0 && tag.includes('Reason') ? tag : (idx === 0 && notif.type === 'Orders' ? tag : (tag.includes('Items') ? `• ${tag}` : tag))}
                                </span>
                              ))}
                            </div>

                            {notif.actionText && (
                              <button style={{ 
                                background: 'none', border: 'none', padding: 0, 
                                color: '#c59a54', fontSize: '14px', fontWeight: '600', 
                                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' 
                              }}>
                                {notif.actionText} <ArrowRight size={16} />
                              </button>
                            )}
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
};

export default NotificationManagement;
