import React, { useState } from 'react';
import {
  Search, ChevronDown, CheckCircle, Package, Truck,
  MapPin, Check, XCircle, RotateCcw, Calendar,
  ShoppingBag, ChevronRight, Map, RotateCcw as ReturnIcon,
  CreditCard, HelpCircle, Headphones, MoreVertical
} from 'lucide-react';
import './MyOrders.css';

import img1 from '../../assets/Maroon.png';
import img2 from '../../assets/Baggy.png';
import img3 from '../../assets/Shoes.png';

const MyOrders = () => {
  const [activeStatus, setActiveStatus] = useState('All Orders');
  const [activeTime, setActiveTime] = useState('Today');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const initialOrders = [
    {
      id: 'ORD102455',
      date: '10 Aug, 2026',
      total: '1,468',
      status: 'Delivered',
      statusColor: 'green',
      image: img1,
      title: 'Georgette Embroidery Work Saree',
      size: 'Free Size',
      color: 'Maroon',
      qty: 1,
      deliveryText: 'Delivered on 11 Aug, 2026'
    },
    {
      id: 'ORD10221',
      date: '08 Aug, 2026',
      total: '2,349',
      status: 'Shipped',
      statusColor: 'blue',
      image: img2,
      title: 'PU Leather Tote Bag',
      color: 'Tan Brown',
      qty: 1,
      deliveryText: 'Expected delivery: 12 Aug, 2026'
    },
    {
      id: 'ORD101987',
      date: '05 Aug, 2026',
      total: '999',
      status: 'Processing',
      statusColor: 'purple',
      image: img3,
      title: 'Gold Plated Jhumka Earrings',
      color: 'Gold',
      qty: 1,
      deliveryText: 'Preparing your order'
    },
    {
      id: 'ORD101986',
      date: '02 Aug, 2026',
      total: '1,299',
      status: 'Shipped',
      statusColor: 'blue',
      image: img1,
      title: 'Cotton Silk Blend Kurta',
      size: 'M',
      color: 'Blue',
      qty: 2,
      deliveryText: 'Expected delivery: 10 Aug, 2026'
    },
    {
      id: 'ORD101985',
      date: '18 Jul, 2025',
      total: '3,499',
      status: 'Confirmed',
      statusColor: 'blue',
      image: img2,
      title: 'Designer Evening Gown',
      size: 'L',
      color: 'Black',
      qty: 1,
      deliveryText: 'Order Confirmed'
    },
    {
      id: 'ORD101984',
      date: '15 Jul, 2025',
      total: '899',
      status: 'Processing',
      statusColor: 'purple',
      image: img3,
      title: 'Silver Oxidized Necklace',
      color: 'Silver',
      qty: 1,
      deliveryText: 'Preparing your order'
    },
    {
      id: 'ORD101983',
      date: '10 Jul, 2025',
      total: '2,100',
      status: 'Shipped',
      statusColor: 'blue',
      image: img1,
      title: 'Men Casual Sneakers',
      size: '9',
      color: 'White',
      qty: 1,
      deliveryText: 'Expected delivery: 01 Aug, 2025'
    },
    {
      id: 'ORD101982',
      date: '08 Jul, 2025',
      total: '450',
      status: 'Confirmed',
      statusColor: 'blue',
      image: img2,
      title: 'Printed Ceramic Coffee Mug',
      color: 'Multicolor',
      qty: 2,
      deliveryText: 'Order Confirmed'
    },
    {
      id: 'ORD101981',
      date: '05 Jul, 2025',
      total: '1,750',
      status: 'Out for Delivery',
      statusColor: 'purple',
      image: img3,
      title: 'Wireless Bluetooth Earbuds',
      color: 'Black',
      qty: 1,
      deliveryText: 'Arriving today by 9 PM'
    },
    {
      id: 'ORD101980',
      date: '02 Jul, 2025',
      total: '3,200',
      status: 'Out for Delivery',
      statusColor: 'purple',
      image: img1,
      title: 'Smart Fitness Watch',
      color: 'Rose Gold',
      qty: 1,
      deliveryText: 'Arriving today by 7 PM'
    },
    {
      id: 'ORD101979',
      date: '28 Jun, 2025',
      total: '6,400',
      status: 'Shipped',
      statusColor: 'blue',
      image: img2,
      title: 'Luxury Leather Jacket',
      size: 'XL',
      color: 'Brown',
      qty: 1,
      deliveryText: 'Expected delivery: 10 Jul, 2025'
    },
    {
      id: 'ORD101978',
      date: '25 Jun, 2025',
      total: '1,100',
      status: 'Confirmed',
      statusColor: 'blue',
      image: img3,
      title: 'Yoga Mat with Alignment Lines',
      color: 'Purple',
      qty: 1,
      deliveryText: 'Order Confirmed'
    }
  ];

  const statuses = [
    { name: 'All Orders', count: 12, icon: <ShoppingBag size={18} /> },
    { name: 'Confirmed', count: 3, icon: <CheckCircle size={18} /> },
    { name: 'Processing', count: 2, icon: <Package size={18} /> },
    { name: 'Shipped', count: 4, icon: <Truck size={18} /> },
    { name: 'Out for Delivery', count: 2, icon: <MapPin size={18} /> },
    { name: 'Delivered', count: 1, icon: <Check size={18} /> },
    { name: 'Cancelled', count: 0, icon: <XCircle size={18} /> },
    { name: 'Returned', count: 0, icon: <RotateCcw size={18} /> }
  ];

  const times = [
    { name: 'Today', count: 2, icon: <Calendar size={18} /> },
    { name: 'Last 7 Days', count: 5, icon: <Calendar size={18} /> },
    { name: 'Last 30 Days', count: 10, icon: <Calendar size={18} /> },
    { name: 'Custom Range', count: null, icon: <Calendar size={18} /> }
  ];

  let filteredOrders = initialOrders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = order.title.toLowerCase().includes(searchLower) ||
      order.id.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus = activeStatus === 'All Orders' || order.status === activeStatus;

    // Time filter
    let matchesTime = true;
    if (activeTime !== 'All Time') {
      const orderDate = new Date(order.date);
      const today = new Date();
      // Reset times to start of day for accurate day differences
      today.setHours(0, 0, 0, 0);
      const oDate = new Date(orderDate);
      oDate.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - oDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);

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
                          <div className={`mo-status-pill ${order.statusColor}`}>
                            {order.status === 'Delivered' && <Check size={14} />}
                            {order.status === 'Shipped' && <Truck size={14} />}
                            {order.status === 'Processing' && <RotateCcw size={14} />}
                            {order.status}
                          </div>
                          <MoreVertical size={20} className="mo-menu-dots-icon" />
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="mo-card-body">
                        <img src={order.image} alt={order.title} className="mo-product-img" />

                        <div className="mo-product-details">
                          <h4>{order.title}</h4>
                          <div className="mo-meta">
                            {order.size && <span>Size: {order.size} &bull; </span>}
                            <span>Color: {order.color}</span>
                          </div>
                          <div className="mo-qty-price">
                            <span>Qty: {order.qty}</span> <span className="mo-divider-pipe">|</span> <span>Price: ₹{order.total}</span>
                          </div>

                          <div className={`mo-delivery-status ${order.statusColor}`}>
                            {order.status === 'Delivered' && <Truck size={14} />}
                            {order.status === 'Shipped' && <Truck size={14} />}
                            {order.status === 'Processing' && <RotateCcw size={14} />}
                            <span>{order.deliveryText}</span>
                          </div>
                        </div>

                        <div className="mo-card-actions-row">
                          <button
                            className="mo-btn-action track"
                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          >
                            {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                            <ChevronRight size={14} style={{ transform: expandedOrder === order.id ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s' }} />
                          </button>
                        </div>

                        {/* Expandable Order Details */}
                        {expandedOrder === order.id && (
                          <div className="mo-expanded-details">
                            <div className="mo-ed-grid">
                              <div className="mo-ed-column">
                                <h4 className="mo-ed-title">Order Tracking</h4>
                                <div className="mo-tracking-timeline">
                                  <div className="mo-timeline-step completed">
                                    <div className="mo-ts-icon"><Check size={12} /></div>
                                    <div className="mo-ts-text">
                                      <strong>Order Confirmed</strong>
                                      <span>{order.date}</span>
                                    </div>
                                  </div>
                                  <div className={`mo-timeline-step ${order.status === 'Processing' ? 'pending' : 'completed'}`}>
                                    <div className="mo-ts-icon">{order.status !== 'Processing' && <Check size={12} />}</div>
                                    <div className="mo-ts-text">
                                      <strong>Shipped</strong>
                                      <span>Courier: BlueDart</span>
                                    </div>
                                  </div>
                                  <div className={`mo-timeline-step ${order.status === 'Delivered' ? 'completed' : (order.status === 'Processing' ? 'pending' : 'active')}`}>
                                    <div className="mo-ts-icon">{order.status === 'Delivered' && <Check size={12} />}</div>
                                    <div className="mo-ts-text">
                                      <strong>{order.status === 'Delivered' ? 'Delivered' : 'Delivery'}</strong>
                                      <span>{order.deliveryText}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="mo-ed-column">
                                <h4 className="mo-ed-title">Shipping Address</h4>
                                <div className="mo-shipping-address">
                                  <p className="mo-sa-name">John Doe</p>
                                  <p>123 Premium Avenue, Tech Park</p>
                                  <p>Bangalore, Karnataka 560001</p>
                                  <p>Phone: +91 98765 43210</p>
                                </div>

                                <button className="mo-btn-invoice">Download Invoice</button>
                              </div>
                            </div>
                          </div>
                        )}
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
    </div>
  );
};

export default MyOrders;
