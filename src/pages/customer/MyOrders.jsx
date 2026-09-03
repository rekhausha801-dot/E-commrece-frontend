import React, { useState } from 'react';
import {
  Search, ChevronDown, CheckCircle, Package, Truck,
  MapPin, Check, XCircle, RotateCcw, Calendar, X,
  ShoppingBag, ChevronRight, Map, RotateCcw as ReturnIcon,
  CreditCard, HelpCircle, Headphones, MoreVertical
} from 'lucide-react';
import './MyOrders.css';

import img1 from '../../assets/Maroon.png';
import img2 from '../../assets/Baggy.png';
import img3 from '../../assets/Shoes.png';
import { useOrders } from '../../context/OrderContext';
import { Modal, message, Input } from 'antd';
import { cancelOrder } from '../../services/api';

const MyOrders = () => {
  const { orders, fetchOrders } = useOrders();
  const [activeStatus, setActiveStatus] = useState('All Orders');
  const [activeTime, setActiveTime] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Cancellation States
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  const normalizedOrders = orders.map(o => {
    const productList = o.items || o.products || [];
    const firstProduct = productList.length > 0 ? productList[0] : {};
    const moreItems = productList.length > 1 ? productList.length - 1 : 0;

    return {
      ...o,
      id: o.orderId || o.orderNumber || o.id,
      rawDate: o.createdAt || o.date,
      date: new Date(o.createdAt || o.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      title: firstProduct.productName || o.product || o.title || 'Unknown Product',
      image: firstProduct.productImage || firstProduct.image || o.image || img1,
      size: firstProduct.selectedSize || firstProduct.size || o.size,
      color: firstProduct.selectedColor || firstProduct.color || o.color,
      customText: firstProduct.customText || o.customText,
      customTextColor: firstProduct.customTextColor || o.customTextColor,
      customTextFont: firstProduct.customTextFont || o.customTextFont,
      selectedDesign: firstProduct.selectedDesign || o.selectedDesign,
      selectedDesignColor: firstProduct.selectedDesignColor || o.selectedDesignColor,
      colorizeImage: firstProduct.colorizeImage !== undefined ? firstProduct.colorizeImage : (o.colorizeImage !== undefined ? o.colorizeImage : true),
      total: String(o.grandTotal || o.amount || o.total || 0).replace(/[^0-9.-]+/g, ''),
      status: o.orderStatus || o.status || 'Pending',
      statusColorClass: '',
      statusColorHex: (o.orderStatus || o.status) === 'Delivered' ? '#2a7e4f' : (o.orderStatus || o.status) === 'Cancelled' ? '#d93b3b' : '#d97706',
      statusBg: (o.orderStatus || o.status) === 'Delivered' ? '#e6f2eb' : (o.orderStatus || o.status) === 'Cancelled' ? '#fbe5e5' : '#fef3c7',
      qty: firstProduct.quantity || firstProduct.qty || o.qty || 1,
      moreItems,
      deliveryText: (o.orderStatus || o.status) === 'Delivered' ? 'Delivered' : 'Expected soon'
    };
  });

  const getStatusCount = (statusName) => {
    if (statusName === 'All Orders') return normalizedOrders.length;
    return normalizedOrders.filter(o => o.status === statusName).length;
  };

  const statuses = [
    { name: 'All Orders', count: getStatusCount('All Orders'), icon: <ShoppingBag size={18} /> },
    { name: 'Pending', count: getStatusCount('Pending'), icon: <CheckCircle size={18} /> },
    { name: 'Processing', count: getStatusCount('Processing'), icon: <Package size={18} /> },
    { name: 'Shipped', count: getStatusCount('Shipped'), icon: <Truck size={18} /> },
    { name: 'Out for Delivery', count: getStatusCount('Out for Delivery'), icon: <MapPin size={18} /> },
    { name: 'Delivered', count: getStatusCount('Delivered'), icon: <Check size={18} /> },
    { name: 'Cancelled', count: getStatusCount('Cancelled'), icon: <XCircle size={18} /> },
    { name: 'Returned', count: getStatusCount('Returned'), icon: <RotateCcw size={18} /> }
  ];

  const getTimeCount = (timeName) => {
    if (timeName === 'Custom Range' || timeName === 'All Time') return null;
    return normalizedOrders.filter(order => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const oDate = new Date(order.rawDate);
      oDate.setHours(0, 0, 0, 0);
      const diffDays = (today.getTime() - oDate.getTime()) / (1000 * 3600 * 24);
      
      if (timeName === 'Today') return diffDays === 0;
      if (timeName === 'Last 7 Days') return diffDays >= 0 && diffDays <= 7;
      if (timeName === 'Last 30 Days') return diffDays >= 0 && diffDays <= 30;
      return false;
    }).length;
  };

  const times = [
    { name: 'Today', count: getTimeCount('Today'), icon: <Calendar size={18} /> },
    { name: 'Last 7 Days', count: getTimeCount('Last 7 Days'), icon: <Calendar size={18} /> },
    { name: 'Last 30 Days', count: getTimeCount('Last 30 Days'), icon: <Calendar size={18} /> },
    { name: 'Custom Range', count: null, icon: <Calendar size={18} /> }
  ];

  let filteredOrders = normalizedOrders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = order.title.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus = activeStatus === 'All Orders' || order.status === activeStatus;

    // Time filter
    let matchesTime = true;
    if (activeTime !== 'All Time' && activeTime !== 'Custom Range') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const oDate = new Date(order.rawDate);
      oDate.setHours(0, 0, 0, 0);

      const diffDays = (today.getTime() - oDate.getTime()) / (1000 * 3600 * 24);

      if (activeTime === 'Today') {
        matchesTime = diffDays === 0;
      } else if (activeTime === 'Last 7 Days') {
        matchesTime = diffDays >= 0 && diffDays <= 7;
      } else if (activeTime === 'Last 30 Days') {
        matchesTime = diffDays >= 0 && diffDays <= 30;
      }
    }

    return matchesSearch && matchesStatus && matchesTime;
  });

  filteredOrders.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const priceA = parseInt(a.total.replace(/,/g, ''));
    const priceB = parseInt(b.total.replace(/,/g, ''));

    if (sortBy === 'Most Recent') return dateB - dateA;
    if (sortBy === 'Oldest') return dateA - dateB;
    if (sortBy === 'Price: High to Low') return priceB - priceA;
    if (sortBy === 'Price: Low to High') return priceA - priceB;
    return 0;
  });

  const handleCancelClick = (orderId) => {
    setOrderToCancel(orderId);
    setMenuOpenId(null);
    setCancelModalVisible(true);
  };

  const submitCancellation = async () => {
    if (!orderToCancel) return;
    setIsCancelling(true);
    try {
      const res = await cancelOrder(orderToCancel, { cancellationReason });
      if (res.data?.success) {
        message.success('Order cancelled successfully.');
        setCancelModalVisible(false);
        setCancellationReason('');
        setOrderToCancel(null);
        // Instantly refresh local state
        fetchOrders();
      } else {
        message.error(res.data?.message || 'Failed to cancel order');
      }
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || 'Error cancelling order');
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="my-orders-bg-container">
      <div className="my-orders-page-wrapper">
        <div className="my-orders-container">

          <div className="mo-content-layout">
            <div className="mo-sidebar">
              <div className="mo-filter-section">
                <h3 className="mo-filter-title">ORDER STATUS</h3>
                <ul className="mo-filter-list">
                  {statuses.map((status, idx) => (
                    <li key={idx} className={`mo-filter-item ${activeStatus === status.name ? 'active' : ''}`} onClick={() => setActiveStatus(status.name)}>
                      <div className="mo-filter-icon">{status.icon}</div>
                      <span>{status.name}</span>
                      {status.count !== null && <span className="mo-filter-count">{status.count}</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mo-divider-space"></div>

              <div className="mo-filter-section">
                <h3 className="mo-filter-title">ORDER HISTORY</h3>
                <ul className="mo-filter-list">
                  {times.map((time, idx) => (
                    <li key={idx} className={`mo-filter-item ${activeTime === time.name ? 'active' : ''}`} onClick={() => setActiveTime(time.name)}>
                      <div className="mo-filter-icon">{time.icon}</div>
                      <span>{time.name}</span>
                      {time.count !== null && <span className="mo-filter-count">{time.count}</span>}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mo-exclusive-offers">
                <div className="mo-eo-content">
                  <div className="mo-gift-box">🎁</div>
                  <div className="mo-eo-text">
                    <h4>Exclusive Offers</h4>
                    <p>Unlock exclusive deals just for you!</p>
                    <button className="mo-view-offers-btn">
                      View Offers <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mo-list">

              <div className="mo-top-header">
                <div className="mo-titles">
                  <h1 className="mo-title">My Orders</h1>
                </div>
                <div className="mo-header-actions">
                  <div className="mo-search-bar">
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="mo-search-input"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search size={16} className="mo-search-icon" />
                  </div>
                  <div className="mo-sort">
                    <span className="sort-label">Sort By:</span>
                    <div className="mo-sort-dropdown-container">
                      <div className="mo-sort-dropdown" onClick={() => setIsSortOpen(!isSortOpen)}>
                        {sortBy} <ChevronDown size={16} />
                      </div>
                      {isSortOpen && (
                        <div className="mo-sort-options">
                          {['Most Recent', 'Oldest', 'Price: High to Low', 'Price: Low to High'].map(option => (
                            <div
                              key={option}
                              className={`mo-sort-option ${sortBy === option ? 'active' : ''}`}
                              onClick={() => {
                                setSortBy(option);
                                setIsSortOpen(false);
                              }}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mo-orders-wrapper">
                {filteredOrders.length === 0 ? (
                  <div className="mo-no-orders">No orders found.</div>
                ) : (
                  filteredOrders.map((order, index) => (
                    <div key={index} className="mo-card">
                      {/* Card Header */}
                      <div className="mo-card-header">
                        <div className="mo-ch-left">
                          <span className="mo-ch-id">Order #{order.id}</span>
                          <span className="mo-ch-date">Placed on {order.date}</span>
                        </div>
                        <div className="mo-ch-right">
                          <span className="mo-ch-total">Total: ₹{order.total}</span>
                          <div className={`mo-status-pill ${order.statusColorClass}`} style={order.statusColorHex ? { color: order.statusColorHex, backgroundColor: order.statusBg || '#fef3c7' } : {}}>
                            {order.status === 'Delivered' && <Check size={14} />}
                            {order.status === 'Shipped' && <Truck size={14} />}
                            {order.status === 'Processing' && <RotateCcw size={14} />}
                            {order.status}
                          </div>
                          <div style={{ position: 'relative' }}>
                            <MoreVertical
                              size={20}
                              className="mo-menu-dots-icon"
                              onClick={() => setMenuOpenId(menuOpenId === order.id ? null : order.id)}
                            />
                            {menuOpenId === order.id && (
                              <div className="mo-action-dropdown">
                                <button onClick={() => { setExpandedOrder(order.id); setMenuOpenId(null); }}>
                                  {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                                </button>
                                <button onClick={() => setMenuOpenId(null)}>Download Invoice</button>
                                {['Pending', 'Processing'].includes(order.status) && (
                                  <button className="mo-text-danger" onClick={() => handleCancelClick(order.id)}>Cancel Order</button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="mo-card-body">
                        <div className="mo-product-img" style={{ position: 'relative', overflow: 'hidden' }}>
                          <img src={order.image} alt={order.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          {order.selectedDesign && order.selectedDesign.icon && (
                            <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', width: '35%', height: '35%', mixBlendMode: 'multiply', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              {order.colorizeImage && order.selectedDesignColor && order.selectedDesignColor !== '#000000' ? (
                                <div style={{
                                  width: '100%', height: '100%',
                                  backgroundColor: order.selectedDesignColor,
                                  WebkitMaskImage: `url(${order.selectedDesign.icon})`,
                                  WebkitMaskSize: 'contain',
                                  WebkitMaskPosition: 'center',
                                  WebkitMaskRepeat: 'no-repeat',
                                  maskImage: `url(${order.selectedDesign.icon})`,
                                  maskSize: 'contain',
                                  maskPosition: 'center',
                                  maskRepeat: 'no-repeat'
                                }} title={order.selectedDesign.name} />
                              ) : (
                                <>
                                  <img src={order.selectedDesign.icon} alt={order.selectedDesign.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                  {order.selectedDesignColor && order.selectedDesignColor !== '#000000' && (
                                    <div style={{
                                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                      backgroundColor: order.selectedDesignColor,
                                      mixBlendMode: 'screen',
                                      pointerEvents: 'none',
                                      WebkitMaskImage: `url(${order.selectedDesign.icon})`,
                                      WebkitMaskSize: 'contain',
                                      WebkitMaskPosition: 'center',
                                      WebkitMaskRepeat: 'no-repeat',
                                      maskImage: `url(${order.selectedDesign.icon})`,
                                      maskSize: 'contain',
                                      maskPosition: 'center',
                                      maskRepeat: 'no-repeat'
                                    }} />
                                  )}
                                </>
                              )}
                            </div>
                          )}
                          {order.customText && (
                            <div style={{
                              position: 'absolute',
                              top: '40%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              color: order.customTextColor || '#000',
                              fontFamily: order.customTextFont || 'inherit',
                              fontSize: '12px',
                              pointerEvents: 'none',
                              whiteSpace: 'nowrap',
                              zIndex: 10
                            }}>
                              {order.customText}
                            </div>
                          )}
                        </div>

                        <div className="mo-product-details">
                          <h4>{order.title}</h4>
                          <div className="mo-meta">
                            {order.size && <span>Size: {order.size} &bull; </span>}
                            {order.color && <span>Color: {order.color} </span>}
                            {order.customText && (
                              <div style={{ marginTop: '4px', fontSize: '11px', color: '#666' }}>
                                Custom Text: <span style={{ fontFamily: order.customTextFont, color: order.customTextColor }}>"{order.customText}"</span>
                              </div>
                            )}
                            {order.selectedDesign && order.selectedDesign.name && (
                              <div style={{ marginTop: '4px', fontSize: '11px', color: '#666' }}>
                                Design: <span style={{ color: 'var(--primary-color)' }}>{order.selectedDesign.name}</span>
                              </div>
                            )}
                            {order.moreItems > 0 && <span style={{ color: 'var(--primary-color)', fontWeight: '500', marginLeft: '10px' }}>+{order.moreItems} more items</span>}
                          </div>
                          <div className="mo-qty-price">
                            <span>Qty: {order.qty}</span> <span className="mo-divider-pipe">|</span> <span>Price: ₹{order.total}</span>
                          </div>

                          <div className={`mo-delivery-status ${order.statusColorClass}`} style={order.statusColorHex ? { color: order.statusColorHex } : {}}>
                            {order.status === 'Delivered' && <Truck size={14} />}
                            {order.status === 'Shipped' && <Truck size={14} />}
                            {order.status === 'Processing' && <RotateCcw size={14} />}
                            <span>{order.deliveryText}</span>
                          </div>
                        </div>

                        <div className="mo-card-actions-row">
                          <button
                            className="mo-btn-action track"
                            onClick={() => setExpandedOrder(order.id)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mo-bottom-bar">
                <div className="mo-bb-item">
                  <ReturnIcon size={18} className="mo-bb-icon" />
                  <div>
                    <h5>Easy Returns</h5>
                    <p>15 days return policy</p>
                  </div>
                </div>
                <div className="mo-bb-divider"></div>
                <div className="mo-bb-item">
                  <CreditCard size={18} className="mo-bb-icon" />
                  <div>
                    <h5>Secure Payments</h5>
                    <p>100% secure checkout</p>
                  </div>
                </div>
                <div className="mo-bb-divider"></div>
                <div className="mo-bb-item">
                  <HelpCircle size={18} className="mo-bb-icon" />
                  <div>
                    <h5>Help Center</h5>
                    <p>We're here to help</p>
                  </div>
                </div>
                <div className="mo-bb-divider"></div>
                <button className="mo-bb-btn">
                  <Headphones size={16} /> Need Help? Contact Us
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Premium Order Details Modal */}
      {expandedOrder && (
        <div className="mo-modal-overlay" onClick={() => setExpandedOrder(null)}>
          <div className="mo-premium-modal" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const order = normalizedOrders.find(o => o.id === expandedOrder);
              if (!order) return null;
              return (
                <>
                  <div className="mo-pm-header">
                    <div className="mo-pm-title">
                      <h2>Order Details</h2>
                      <span>Order #{order.id} • {order.date}</span>
                    </div>
                    <button className="mo-pm-close" onClick={() => setExpandedOrder(null)}>
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="mo-pm-body">
                    {/* Left Column: Items & Summary */}
                    <div className="mo-pm-main">
                      <h4 className="mo-ed-title">Items in this Order</h4>
                      <div className="mo-pm-items-list">
                        {(order.items || order.products || [{
                           title: order.title,
                           image: order.image,
                           size: order.size,
                           color: order.color,
                           qty: order.qty,
                           total: order.total
                        }]).map((item, idx) => (
                          <div key={idx} className="mo-pm-item">
                            <img src={item.productImage || item.image || order.image} alt="product" />
                            <div className="mo-pm-item-details">
                              <h5>{item.productName || item.name || item.title || order.title}</h5>
                              <p>Qty: {item.quantity || item.qty || order.qty} {(item.selectedSize || item.size) && `| Size: ${item.selectedSize || item.size}`}</p>
                              {item.customText && (
                                <p style={{ fontSize: '11px', marginTop: '2px', color: '#666' }}>
                                  Custom Text: <span style={{ fontFamily: item.customTextFont, color: item.customTextColor }}>"{item.customText}"</span>
                                </p>
                              )}
                              {item.selectedDesign && item.selectedDesign.name && (
                                <p style={{ fontSize: '11px', marginTop: '2px', color: '#666' }}>
                                  Design: {item.selectedDesign.name}
                                </p>
                              )}
                            </div>
                            <span className="mo-pm-item-price">₹{item.finalUnitPrice || item.price || item.total || order.total}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mo-pm-price-summary">
                        <div className="mo-pm-ps-row"><span>Subtotal</span><span>₹{order.total}</span></div>
                        <div className="mo-pm-ps-row"><span>Shipping</span><span className="mo-text-green">Free</span></div>
                        <div className="mo-pm-ps-row mo-pm-ps-total"><span>Grand Total</span><span>₹{order.total}</span></div>
                      </div>
                    </div>

                    {/* Right Column: Tracking & Address */}
                    <div className="mo-pm-sidebar">
                      <h4 className="mo-ed-title">Order Tracking</h4>
                      <div className="mo-tracking-timeline">
                        <div className="mo-timeline-step completed">
                          <div className="mo-ts-icon"><Check size={12} /></div>
                          <div className="mo-ts-text">
                            <strong>Order Confirmed</strong>
                            <span>{order.date}</span>
                          </div>
                        </div>
                        <div className={`mo-timeline-step ${['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? 'completed' : 'pending'}`}>
                          <div className="mo-ts-icon">{['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) && <Check size={12} />}</div>
                          <div className="mo-ts-text">
                            <strong>Shipped</strong>
                            <span>Courier: BlueDart</span>
                          </div>
                        </div>
                        <div className={`mo-timeline-step ${order.status === 'Delivered' ? 'completed' : (['Shipped', 'Out for Delivery'].includes(order.status) ? 'active' : 'pending')}`}>
                          <div className="mo-ts-icon">{order.status === 'Delivered' && <Check size={12} />}</div>
                          <div className="mo-ts-text">
                            <strong>{order.status === 'Delivered' ? 'Delivered' : 'Delivery'}</strong>
                            <span>{order.deliveryText}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="mo-ed-title" style={{ marginTop: '32px' }}>Shipping Address</h4>
                      <div className="mo-shipping-address">
                        <p className="mo-sa-name">{order.shippingAddress?.fullName || 'N/A'}</p>
                        <p>{order.shippingAddress?.address || 'N/A'}</p>
                        <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}</p>
                        <p>Phone: {order.shippingAddress?.phoneNumber || 'N/A'}</p>
                      </div>

                      <button className="mo-btn-invoice" style={{ width: '100%', marginTop: '16px' }}>Download Invoice</button>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
      
      <Modal
        title="Cancel Order"
        open={cancelModalVisible}
        onOk={submitCancellation}
        onCancel={() => {
          setCancelModalVisible(false);
          setOrderToCancel(null);
          setCancellationReason('');
        }}
        confirmLoading={isCancelling}
        okText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        okButtonProps={{ danger: true }}
      >
        <p style={{ marginBottom: '16px' }}>Are you sure you want to cancel this order? This action cannot be undone.</p>
        <Input.TextArea
          placeholder="Optional: Please tell us why you are cancelling this order."
          value={cancellationReason}
          onChange={(e) => setCancellationReason(e.target.value)}
          rows={3}
        />
      </Modal>
    </div>
  );
};

export default MyOrders;
