import React, { useState } from 'react';
import { Search, Calendar, Truck, RefreshCcw, XCircle, MoreVertical, ChevronRight, ChevronDown, Check, Package, Clock } from 'lucide-react';
import './MyOrders.css';
import { useOrders } from '../../context/OrderContext';

const MyOrders = () => {
  const [activeStatus, setActiveStatus] = useState('All Orders');
  const [activeTime, setActiveTime] = useState('Today');
  const { orders } = useOrders();

  const statuses = [
    { name: 'All Orders', count: orders.length, icon: <div className="status-radio"></div> },
    { name: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length, icon: <Calendar size={18} /> },
    { name: 'On The Way', count: orders.filter(o => o.status === 'On The Way' || o.status === 'Pending').length, icon: <Truck size={18} /> },
    { name: 'Return', count: orders.filter(o => o.status === 'Return').length, icon: <RefreshCcw size={18} /> },
    { name: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length, icon: <XCircle size={18} /> }
  ];

  const times = [
    { name: 'Today', count: orders.length, icon: <Calendar size={18} /> },
    { name: 'Last 7 Days', count: orders.length, icon: <Calendar size={18} /> },
    { name: 'Last 30 Days', count: orders.length, icon: <Calendar size={18} /> },
    { name: 'Custom Date', count: null, icon: <Calendar size={18} /> }
  ];

  const filteredOrders = activeStatus === 'All Orders'
    ? orders
    : orders.filter(o => o.status === activeStatus || (activeStatus === 'On The Way' && o.status === 'Pending'));

  return (
    <div className="my-orders-page-wrapper">
      <div className="my-orders-container">

        <div className="mo-title-wrapper">
          <h1 className="mo-title">My Orders</h1>
          <div className="mo-title-ornament">
            <div className="mo-title-line"></div>
            <div className="mo-title-diamond"></div>
            <div className="mo-title-line"></div>
          </div>
        </div>

        <div className="mo-content-layout">
          {/* Sidebar Filters */}
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

            <div className="mo-divider"></div>

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
              <h4>Exclusive Offers</h4>
              <p>Download our app and get extra discounts!</p>
              <button className="mo-download-btn">
                Download App <ChevronRight size={14} />
              </button>
              <div className="mo-gift-box">🎁</div>
            </div>
          </div>

          {/* Order List */}
          <div className="mo-list">
            <div className="mo-list-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Showing Orders</h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div className="mo-search-bar" style={{ margin: 0, padding: '8px 16px', maxWidth: '300px', boxShadow: 'none', border: '1px solid #ddd' }}>
                <Search size={16} className="mo-search-icon" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="mo-search-input"
                />
              </div>

              <div className="mo-sort" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Sort by:
                <div className="mo-sort-dropdown" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                  Most Recent <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>

            <div className="mo-orders-wrapper">
              {filteredOrders.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#888' }}>
                  No orders found for this status.
                </div>
              ) : (
                filteredOrders.map((order, index) => (
                  <div key={order.id || index} className="mo-card">

                    <div className="mo-card-header">
                      <div className="mo-card-icon-box">
                        <Calendar size={18} />
                      </div>
                      <div className="mo-card-id">Order #{order.id}</div>
                      <div className="mo-card-date">Placed: {order.date}</div>
                      <MoreVertical size={20} className="mo-card-menu" />
                    </div>

                    <div className="mo-card-body">
                      <img src={order.image} alt="Product" className="mo-product-img" />

                      <div className="mo-product-details">
                        <h4>{order.product}</h4>
                        <div className="mo-meta">Size: {order.size}</div>
                        <div className="mo-meta">Color: {order.color}</div>

                        <div className="mo-price-payment">
                          <div className="mo-price">Amount: {order.amount}</div>
                          <div className="mo-payment">
                            Payment: <span style={{ color: order.paymentColor }}>{order.payment}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mo-status-container">
                        <div className="mo-status-badge" style={{ color: order.statusColor, backgroundColor: order.statusBg }}>
                          {order.status === 'Delivered' ? <Check size={14} /> : order.status === 'Pending' ? <Clock size={14} /> : <Truck size={14} />} {order.status}
                        </div>
                        {order.expected && <div className="mo-expected">Expected: {order.expected}</div>}
                      </div>

                      <div className="mo-card-actions">
                        <button className="mo-btn mo-btn-outline">
                          View Details <ChevronRight size={16} />
                        </button>
                        <button className="mo-btn mo-btn-solid">
                          <Package size={16} /> Track Package
                        </button>
                      </div>

                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
