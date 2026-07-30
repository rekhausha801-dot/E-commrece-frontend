import React, { useState } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';
import './MyOrders.css';
import sareeImage from '../../assets/Maroon.png';
import tshirtImage from '../../assets/Tshirt.png';

const MyOrders = () => {
  const [activeStatus, setActiveStatus] = useState('All Orders');
  const [activeTime, setActiveTime] = useState('Today');

  const statuses = ['All Orders', 'Delivered', 'On The Way', 'Return', 'Cancelled'];
  const times = ['Today', 'Last 7 Days', 'Last 30 Days', 'Custom Date'];

  const dummyOrders = [
    {
      id: 'ORD102458',
      date: '29 July 2026',
      product: 'Georgette Embroidery Work Saree',
      size: 'Free Size',
      color: 'Maroon',
      amount: '₹468',
      payment: 'Paid',
      status: 'Delivered',
      statusColor: '#2a7e4f',
      image: sareeImage
    },
    {
      id: 'ORD102459',
      date: '25 July 2026',
      product: '4 PCS Crochet Threads',
      size: 'Standard',
      color: 'Multi',
      amount: '₹124',
      payment: 'Pending',
      status: 'On The Way',
      statusColor: '#2962ff',
      image: tshirtImage,
      expected: '31 July 2026'
    }
  ];

  return (
    <div className="my-orders-container">
      <div className="my-orders-header">
        <h1 className="mo-title">My Orders</h1>
        <div className="mo-search-bar">
          <Search size={18} className="mo-search-icon" />
          <input
            type="text"
            placeholder="Search orders by product name / Order ID"
            className="mo-search-input"
          />
        </div>
      </div>

      <div className="mo-content-layout">
        {/* Sidebar Filters */}
        <div className="mo-sidebar">
          <div className="mo-filter-section">
            <h3 className="mo-filter-title">Order Status</h3>
            <ul className="mo-filter-list">
              {statuses.map((status, idx) => (
                <li key={idx} className={`mo-filter-item ${activeStatus === status ? 'active' : ''}`} onClick={() => setActiveStatus(status)}>
                  <div className={`mo-radio ${activeStatus === status ? 'checked' : ''}`}></div>
                  <span>{status}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mo-divider"></div>

          <div className="mo-filter-section">
            <h3 className="mo-filter-title">Order History</h3>
            <ul className="mo-filter-list">
              {times.map((time, idx) => (
                <li key={idx} className={`mo-filter-item ${activeTime === time ? 'active' : ''}`} onClick={() => setActiveTime(time)}>
                  <CalendarIcon isActive={activeTime === time} />
                  <span>{time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order List */}
        <div className="mo-list">
          <div className="mo-list-header">
            <h2>Showing Orders</h2>
          </div>

          <div className="mo-orders-wrapper">
            {dummyOrders.map((order, index) => (
              <div key={index} className="mo-card">
                <div className="mo-card-header">
                  <div className="mo-card-id">Order #{order.id}</div>
                  <div className="mo-card-date">Placed: {order.date}</div>
                </div>

                <div className="mo-card-body">
                  <div className="mo-product-info">
                    <img src={order.image} alt="Product" className="mo-product-img" />
                    <div className="mo-product-details">
                      <h4>{order.product}</h4>
                      <div className="mo-meta">Size: {order.size}</div>
                      <div className="mo-meta">Color: {order.color}</div>
                      <div className="mo-price-row">
                        <div className="mo-price">Amount: {order.amount}</div>
                        <div className="mo-payment">Payment: {order.payment}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mo-status-info">
                    <div className="mo-status-badge" style={{ color: order.statusColor, backgroundColor: `${order.statusColor}15` }}>
                      <span className="mo-status-dot" style={{ backgroundColor: order.statusColor }}></span>
                      {order.status}
                    </div>
                    {order.expected && <div className="mo-expected">Expected: {order.expected}</div>}
                  </div>
                </div>

                <div className="mo-card-actions">
                  <button className="mo-btn mo-btn-outline">View Details</button>
                  <button className="mo-btn mo-btn-solid">Track Package</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarIcon = ({ isActive }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#c99a53" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default MyOrders;
