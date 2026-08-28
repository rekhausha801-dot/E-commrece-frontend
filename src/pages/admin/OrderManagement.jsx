import React, { useState, useEffect } from 'react';
import { getOrders, getOrderStats, updateOrderStatus as updateStatusApi, cancelOrder as cancelOrderApi, reviewReturn as reviewReturnApi, processRefund as processRefundApi, getExportOrdersUrl } from '../../services/api';
import { Search, Download, RefreshCw, ShoppingBag, CheckCircle, XCircle, RotateCcw, Calendar, MoreVertical, Eye, ChevronLeft, ChevronRight, RefreshCcw, Clock, Copy, FilterX, X, MapPin, CreditCard, Box, Hash, User, Phone, Mail, AlertTriangle, Truck } from 'lucide-react';
import { Table, Dropdown, Menu, DatePicker, Select, Button, Input, Space, Drawer, Divider, Steps, Modal, Radio, message } from 'antd';
import { ShippingTab } from './WebsiteSetting';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const sparklineData = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineData2 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];

// initialOrders mock data removed in favor of API

const getProductImage = (product) => {
  if (!product || !product.image) return '/placeholder-product.png';
  if (product.image.startsWith('http')) return product.image;
  const baseUrl = process.env.REACT_APP_API_URL || '';
  const cleanPath = product.image.startsWith('/') ? product.image : `/${product.image}`;
  return `${baseUrl}${cleanPath}`;
};

const OrderManagement = ({ globalSearch = '' }) => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0
  });
  const [activeTab, setActiveTab] = useState('All');
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await getOrders({ search: searchText });
      if (response.data && response.data.success) {
        // Map backend order format to frontend UI format
        const formattedOrders = response.data.data.map(order => ({
          id: order.orderNumber || order.orderId,
          _id: order._id, // Keep the Mongo ID for updates
          customer: order.customer?.name || 'Unknown',
          email: order.customer?.email || 'N/A',
          phone: order.customer?.phone || order.shippingAddress?.mobileNumber || 'N/A',
          address: order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.state}` : 'N/A',
          items: order.totalItemsCount || (order.items ? order.items.length : 0),
          amount: `₹${order.grandTotal || 0}`,
          paymentMethod: order.paymentMethod?.label || order.paymentMethod?.type || 'N/A',
          paymentStatus: order.paymentStatus,
          status: order.orderStatus,
          date: dayjs(order.createdAt).format('DD MMM YYYY'),
          time: dayjs(order.createdAt).format('hh:mm A'),
          cancelledBy: order.cancelledBy,
          cancelledAt: order.cancelledAt ? dayjs(order.cancelledAt).format('DD MMM YYYY, hh:mm A') : null,
          cancellationReason: order.cancellationReason,
          products: (order.items || []).map(p => ({
            id: p.product,
            image: p.productImage,
            name: p.productName,
            quantity: p.quantity,
            unitPrice: `₹${p.finalUnitPrice || p.originalPrice || 0}`,
            total: `₹${p.totalPrice || 0}`
          }))
        }));
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      message.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await getOrderStats();
      if (response.data && response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching order stats:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [searchText]); // refetch when search changes


  const handleUpdateStatus = async (recordId, id, newStatus) => {
    try {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
      await updateStatusApi(recordId, newStatus);
      fetchStats();
      message.success('Order status updated');
    } catch (e) {
      fetchOrders();
      message.error('Failed to update status');
    }
  };

  const handleCancelOrder = async (recordId, id) => {
    try {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
      await cancelOrderApi(recordId);
      fetchStats();
      message.success('Order cancelled');
    } catch (e) {
      fetchOrders();
      message.error('Failed to cancel order');
    }
  };

  const handleRefundOrder = async (recordId, id) => {
    try {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, paymentStatus: 'Refunded' } : o));
      await processRefundApi(recordId, 'Processed');
      fetchStats();
      message.success('Refund processed');
    } catch (e) {
      fetchOrders();
      message.error('Failed to process refund');
    }
  };

  const handleReturnOrder = async (recordId, id, status, reason = '') => {
    try {
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: status === 'Approved' ? 'Returned' : o.status } : o));
      await reviewReturnApi(recordId, status, reason);
      fetchStats();
      message.success(`Return ${status.toLowerCase()}`);
      setIsReturnModalOpen(false);
    } catch (e) {
      fetchOrders();
      message.error(`Failed to process return request`);
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnSelectedOrder, setReturnSelectedOrder] = useState(null);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportRange, setExportRange] = useState('all');
  const [exportFormat, setExportFormat] = useState('excel');
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);

  const handleExportSubmit = () => {
    let ordersToExport = [];
    if (exportRange === 'all') {
      ordersToExport = orders;
    } else if (exportRange === 'filtered') {
      ordersToExport = orders.filter(o =>
        o.id.toLowerCase().includes(searchText.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchText.toLowerCase()) ||
        o.products.some(p => p.name.toLowerCase().includes(searchText.toLowerCase()))
      );
    } else if (exportRange === 'selected') {
      if (selectedRowKeys.length === 0) {
        message.warning("No orders selected for export!");
        return;
      }
      ordersToExport = orders.filter(o => selectedRowKeys.includes(o.id));
    }

    if (ordersToExport.length === 0) {
      message.warning("No orders found to export.");
      return;
    }

    window.open(getExportOrdersUrl(), '_blank');
    setIsExportModalOpen(false);
    message.success(`Orders exported successfully`);
  };

  const columns = [
    {
      title: 'ORDER ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            placeholder="Search ID"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<Search size={14} />}
              size="small"
              style={{ width: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#d97706', borderColor: '#d97706' }}
            >
              Search
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <Search size={14} style={{ color: filtered ? '#d97706' : undefined }} />,
      onFilter: (value, record) => record.id.toLowerCase().includes(value.toLowerCase()),
      render: (text) => <span style={{ fontWeight: '600', color: '#d97706', fontSize: '13px' }}>{text}</span>,
    },
    {
      title: 'CUSTOMER',
      key: 'customer',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            placeholder="Search customer"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<Search size={14} />}
              size="small"
              style={{ width: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#d97706', borderColor: '#d97706' }}
            >
              Search
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <Search size={14} style={{ color: filtered ? '#d97706' : undefined }} />,
      onFilter: (value, record) => record.customer.toLowerCase().includes(value.toLowerCase()),
      render: (_, record) => (
        <span style={{ fontWeight: '500', color: '#111827', fontSize: '13px' }}>{record.customer}</span>
      )
    },
    {
      title: 'PRODUCTS',
      key: 'products',
      render: (_, record) => {
        if (!record.products || record.products.length === 0) return <span style={{ color: '#6b7280', fontSize: '12px' }}>No products</span>;
        const firstProduct = record.products[0];
        const extraCount = record.products.length - 1;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={getProductImage(firstProduct)}
              alt={firstProduct.name}
              onError={(e) => {
                e.currentTarget.src = "/placeholder-product.png";
              }}
              style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e5e7eb', backgroundColor: '#f3f4f6', flexShrink: 0 }}
            />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827', maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{firstProduct.name}</span>
          </div>
        );
      }
    },
    {
      title: 'ITEMS',
      dataIndex: 'items',
      key: 'items',
      sorter: (a, b) => a.items - b.items,
      align: 'center',
      filters: [
        { text: '1-5', value: '1-5' },
        { text: '6-10', value: '6-10' },
        { text: '10+', value: '10+' },
      ],
      onFilter: (value, record) => {
        if (value === '1-5') return record.items >= 1 && record.items <= 5;
        if (value === '6-10') return record.items >= 6 && record.items <= 10;
        if (value === '10+') return record.items > 10;
        return true;
      },
      render: (text) => <span style={{ color: '#4b5563', fontSize: '13px' }}>{text}</span>,
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      sorter: (a, b) => parseInt(a.amount.replace(/[^0-9]/g, ''), 10) - parseInt(b.amount.replace(/[^0-9]/g, ''), 10),
      filters: [
        { text: '< ₹1,000', value: '<1000' },
        { text: '₹1,000 - ₹5,000', value: '1000-5000' },
        { text: '> ₹5,000', value: '>5000' },
      ],
      onFilter: (value, record) => {
        const amt = parseInt(record.amount.replace(/[^0-9]/g, ''), 10);
        if (value === '<1000') return amt < 1000;
        if (value === '1000-5000') return amt >= 1000 && amt <= 5000;
        if (value === '>5000') return amt > 5000;
        return true;
      },
      render: (text) => <span style={{ fontWeight: '600', color: '#111827', fontSize: '13px' }}>{text}</span>,
    },
    {
      title: 'PAYMENT',
      key: 'payment',
      align: 'center',
      filters: [
        { text: 'All Payment Methods', value: 'All Payment Methods' },
        { text: 'COD', value: 'COD' },
        { text: 'UPI', value: 'UPI' },
        { text: 'Card', value: 'Card' },
        { text: 'Net Banking', value: 'Net Banking' },
        { text: 'Wallet', value: 'Wallet' },
        { text: 'Paid', value: 'Paid' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Failed', value: 'Failed' },
        { text: 'Refunded', value: 'Refunded' },
      ],
      onFilter: (value, record) => {
        if (value === 'All Payment Methods') return true;
        return record.paymentMethod === value || record.paymentStatus === value;
      },
      render: (_, record) => {
        const getPaymentColor = (method) => {
          if (method === 'COD') return { bg: '#fef3c7', text: '#d97706' };
          if (method === 'UPI') return { bg: '#e0f2fe', text: '#0284c7' };
          if (method === 'Card') return { bg: '#f3e8ff', text: '#9333ea' };
          return { bg: '#e0e7ff', text: '#4f46e5' };
        };
        const pColor = getPaymentColor(record.paymentMethod);
        return (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
            <span style={{ background: pColor.bg, color: pColor.text, padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600', whiteSpace: 'nowrap' }}>{record.paymentMethod}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: record.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b', fontWeight: '500', whiteSpace: 'nowrap' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: record.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b' }} />
              {record.paymentStatus}
            </div>
          </div>
        )
      }
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        { text: 'All Status', value: 'All Status' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Shipped', value: 'Shipped' },
        { text: 'Out for Delivery', value: 'Out for Delivery' },
        { text: 'Delivered', value: 'Delivered' },
        { text: 'Return Requested', value: 'Return Requested' },
        { text: 'Returned', value: 'Returned' },
        { text: 'Cancelled', value: 'Cancelled' },
      ],
      onFilter: (value, record) => {
        if (value === 'All Status') return true;
        return record.status === value;
      },
      render: (status) => {
        const getStatusStyles = (s) => {
          switch (s) {
            case 'Delivered': return { bg: '#ecfdf5', color: '#10b981' };
            case 'Processing': return { bg: '#eff6ff', color: '#3b82f6' };
            case 'Shipped': return { bg: '#f5f3ff', color: '#8b5cf6' };
            case 'Pending': return { bg: '#fffbeb', color: '#f59e0b' };
            case 'Out for Delivery': return { bg: '#f3e8ff', color: '#a855f7' };
            case 'Return Requested': return { bg: '#fff1f2', color: '#e11d48' };
            case 'Returned': return { bg: '#fef2f2', color: '#ef4444' };
            case 'Cancelled': return { bg: '#f3f4f6', color: '#6b7280' };
            default: return { bg: '#f3f4f6', color: '#6b7280' };
          }
        };
        const styles = getStatusStyles(status);
        return (
          <span style={{ background: styles.bg, color: styles.color, padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
            {status}
          </span>
        );
      }
    },
    {
      title: 'DATE',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 12, width: 280 }} onKeyDown={(e) => e.stopPropagation()}>
          <RangePicker
            style={{ marginBottom: 12, display: 'flex', width: '100%', borderRadius: '8px' }}
            onChange={(dates, dateStrings) => setSelectedKeys(dateStrings ? [dateStrings] : [])}
            onOpenChange={(open) => { if (!open) confirm() }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#d97706', borderColor: '#d97706' }}
            >
              Filter
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <Calendar size={14} style={{ color: filtered ? '#d97706' : undefined }} />,
      onFilter: (value, record) => record.date.includes(value),
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: '500', color: '#111827', fontSize: '13px', whiteSpace: 'nowrap' }}>{record.date}</span>
          <span style={{ color: '#6b7280', fontSize: '11px', whiteSpace: 'nowrap' }}>{record.time}</span>
        </div>
      )
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      align: 'center',
      render: (_, record) => {
        const items = [
          {
            key: '1',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>View Details</span>,
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              setSelectedOrder(record);
              setIsDrawerOpen(true);
            }
          },
          {
            key: '2',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Update Status</span>,
            children: [
              {
                key: 'status-processing',
                label: <span style={{ fontSize: '12px', fontWeight: '500' }}>Processing</span>,
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  handleUpdateStatus(record._id, record.id, 'Processing');
                }
              },
              {
                key: 'status-shipped',
                label: <span style={{ fontSize: '12px', fontWeight: '500' }}>Shipped</span>,
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  handleUpdateStatus(record._id, record.id, 'Shipped');
                }
              },
              {
                key: 'status-out-for-delivery',
                label: <span style={{ fontSize: '12px', fontWeight: '500' }}>Out for Delivery</span>,
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  handleUpdateStatus(record._id, record.id, 'Out for Delivery');
                }
              },
              {
                key: 'status-delivered',
                label: <span style={{ fontSize: '12px', fontWeight: '500' }}>Delivered</span>,
                onClick: ({ domEvent }) => {
                  domEvent.stopPropagation();
                  handleUpdateStatus(record._id, record.id, 'Delivered');
                }
              }
            ]
          },
          ...(record.status === 'Return Requested' ? [
            {
              key: 'return-order',
              label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Review Return</span>,
              onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
                setReturnSelectedOrder(record);
                setIsReturnModalOpen(true);
              }
            }
          ] : []),
          ...((record.status === 'Delivered' || record.status === 'Returned' || record.status === 'Return Requested') ? [
            {
              key: 'refund',
              label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Refund</span>,
              onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
                setOrders(prev => prev.map(o => o.id === record.id ? { ...o, paymentStatus: 'Refunded' } : o));
              }
            }
          ] : []),
          ...(record.status === 'Cancelled' ? [
            {
              key: 'refund-cancelled',
              label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Refund</span>,
              onClick: ({ domEvent }) => {
                domEvent.stopPropagation();
                setOrders(prev => prev.map(o => o.id === record.id ? { ...o, paymentStatus: 'Refunded' } : o));
              }
            }
          ] : []),
          {
            key: '3',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Cancel Order</span>,
            danger: true,
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              handleCancelOrder(record._id, record.id);
            }
          }
        ];

        return (
          <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
              <button style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MoreVertical size={16} color="#6b7280" />
              </button>
            </Dropdown>
          </div>
        );
      }
    }
  ];

  return (
    <div style={{ padding: '0 8px 32px 8px' }}>
      {/* Header Actions */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '20px', padding: '12px 20px', background: '#fff',
        borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', background: '#fff',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08), 0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #fef3c7'
          }}>
            <ShoppingBag size={22} color="#d97706" />
          </div>
          <div style={{ width: '3px', height: '20px', background: '#d97706', borderRadius: '4px' }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937', letterSpacing: '-0.3px' }}>Order Management</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => setIsShippingModalOpen(true)} style={{ background: '#1f2937', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)' }}>
            <Truck size={15} color="#c99a53" /> Shipping Config
          </button>
          <button onClick={() => setIsExportModalOpen(true)} style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.2)' }}>
            <Download size={15} /> Export Orders
          </button>
        </div>
      </div>


      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card dark" style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }}><ShoppingBag size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Total Orders</span>
              <h2 className="stat-value gold-text">{stats.totalOrders || 0}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="glowDarkOrd1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkOrd1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light" style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#3b82f6', background: '#eff6ff', border: 'none' }}><Clock size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Processing</span>
              <h2 className="stat-value">{stats.processing || 0}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData2}>
                <defs>
                  <linearGradient id="glowLightOrd1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightOrd1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light" style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#10b981', background: '#ecfdf5', border: 'none' }}><CheckCircle size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Delivered</span>
              <h2 className="stat-value">{stats.delivered || 0}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="glowLightOrd2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightOrd2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light" style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#ef4444', background: '#fef2f2', border: 'none' }}><XCircle size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Cancelled</span>
              <h2 className="stat-value">{stats.cancelled || 0}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData2}>
                <defs>
                  <linearGradient id="glowLightOrd3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightOrd3)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>


      <div className="premium-glass-card" style={{ padding: '0px', borderRadius: '16px', background: '#fff', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <style>
          {`
            .premium-table .ant-table { background: transparent !important; }
            .premium-table .ant-table-thead > tr > th { background: #fdfbf7 !important; border-bottom: 1px solid #f3f4f6 !important; color: #4b5563; font-weight: 700; padding: 16px 24px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap !important; word-break: keep-all !important; }
            .premium-table .ant-table-tbody > tr > td { padding: 12px 24px !important; border-bottom: 1px solid #f3f4f6 !important; background: #fff !important; transition: all 0.2s ease; white-space: nowrap !important; }
            .premium-table .ant-table-tbody > tr:hover > td { background: #fafafa !important; }
            .premium-table .ant-table-thead > tr > th::before { display: none !important; }
            .premium-table .ant-pagination { margin: 16px 24px !important; display: flex; align-items: center; justify-content: flex-end; }
            .premium-table .ant-pagination-total-text { margin-right: auto !important; font-size: 13px; color: #6b7280; font-weight: 500; }
            .premium-table .ant-pagination-item { border: 1px solid #e5e7eb !important; border-radius: 8px !important; background: #fff; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,0.02); transition: all 0.2s ease; }
            .premium-table .ant-pagination-item:hover { border-color: #d97706 !important; color: #d97706; box-shadow: 0 2px 4px rgba(217,119,6,0.1); }
            .premium-table .ant-pagination-item a { color: #4b5563 !important; }
            .premium-table .ant-pagination-item-active { border-color: #d97706 !important; background: #d97706 !important; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.25) !important; }
            .premium-table .ant-pagination-item-active a { color: #fff !important; }
            .premium-table .ant-pagination-prev .ant-pagination-item-link, .premium-table .ant-pagination-next .ant-pagination-item-link { border: 1px solid #e5e7eb !important; border-radius: 8px !important; background: #fff !important; color: #6b7280 !important; box-shadow: 0 1px 2px rgba(0,0,0,0.02); display: flex; align-items: center; justify-content: center; }
            .premium-table .ant-pagination-prev:hover .ant-pagination-item-link, .premium-table .ant-pagination-next:hover .ant-pagination-item-link { border-color: #d97706 !important; color: #d97706 !important; }
            .premium-table .ant-pagination-options-size-changer.ant-select { border-radius: 8px !important; }
            .premium-table .ant-pagination-options-size-changer .ant-select-selector { border-radius: 8px !important; border: 1px solid #e5e7eb !important; box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important; font-weight: 500; color: #4b5563; }
            .premium-table .ant-checkbox-checked .ant-checkbox-inner { background-color: #10b981; border-color: #10b981; }
            .premium-table .ant-table-body::-webkit-scrollbar, .premium-table .ant-table-content::-webkit-scrollbar { display: none; }
            .premium-table .ant-table-body, .premium-table .ant-table-content { -ms-overflow-style: none; scrollbar-width: none; }
            .search-input-wrapper { display: flex; align-items: center; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 24px; padding: 0 16px; height: 42px; width: 320px; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
            .search-input-wrapper:focus-within { background: #fff; border-color: #d97706; box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1), 0 4px 6px -1px rgba(0,0,0,0.05); transform: translateY(-1px); }
            .search-input-wrapper input { border: none; outline: none; background: transparent; width: 100%; font-size: 14px; color: #111827; }
            .search-input-wrapper input::placeholder { color: #9ca3af; font-weight: 400; }
          `}
        </style>

        <div style={{ padding: '16px 24px', marginBottom: '0', background: '#fdfbf7', borderBottom: '1px solid #f3f4f6' }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827', whiteSpace: 'nowrap' }}>
              Orders <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500', marginLeft: '8px' }}>({orders.length} total)</span>
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>

              <div className="search-input-wrapper">
                <Search size={18} color="#9ca3af" style={{ marginRight: '10px' }} />
                <input
                  placeholder="Search orders or customers..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <Button
                type="text"
                onClick={() => setSearchText('')}
                style={{
                  color: '#d97706', fontSize: '13px', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  borderRadius: '8px', padding: '8px 16px', transition: 'all 0.2s',
                  border: '1px solid #fde68a', background: '#fff'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#fef3c7'}
                onMouseOut={e => e.currentTarget.style.background = '#fff'}
              >
                <FilterX size={15} />
                Clear Filters
              </Button>
            </div>
          </div>
        </div>

        <Table
          className="premium-table"
          dataSource={orders.filter(o => {
            const finalSearchText = globalSearch || searchText;
            const matchesSearch =
              o.id.toLowerCase().includes(finalSearchText.toLowerCase()) ||
              o.customer.toLowerCase().includes(finalSearchText.toLowerCase()) ||
              o.products.some(p => p.name.toLowerCase().includes(finalSearchText.toLowerCase()));

            return matchesSearch;
          })}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys)
          }}
          locale={{
            emptyText: (
              <div style={{ padding: '48px 0', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: '#f3f4f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Search size={32} color="#9ca3af" />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 8px' }}>No Orders Found</h3>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 24px' }}>Try adjusting your filters or search criteria.</p>
                <Button onClick={() => setSearchText('')} type="primary" style={{ background: '#d97706', borderColor: '#d97706', borderRadius: '8px', fontWeight: '500' }}>
                  Clear Filters
                </Button>
              </div>
            )
          }}
          pagination={{
            pageSize: 10,
            pageSizeOptions: ['10', '25', '50', '100'],
            showSizeChanger: true,
            showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} orders`,
            itemRender: (current, type, originalElement) => {
              if (type === 'prev') {
                return <a style={{ display: 'flex', alignItems: 'center' }}><ChevronLeft size={16} /></a>;
              }
              if (type === 'next') {
                return <a style={{ display: 'flex', alignItems: 'center' }}><ChevronRight size={16} /></a>;
              }
              return originalElement;
            }
          }}
          scroll={{ x: 1000 }}
        />
      </div>

      <Drawer
        title={null}
        placement="right"
        closable={false}
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        size="large"
        styles={{ body: { padding: 0 } }}
      >
        {selectedOrder && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fafafa' }}>

            <div style={{ padding: '24px', background: '#fff', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#fdfbf7', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={24} color="#d97706" />
                </div>
                <div>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827' }}>Order Details</h2>
                  <span style={{ fontSize: '13px', color: '#6b7280', fontWeight: '500' }}>{selectedOrder.id} • {selectedOrder.date}</span>
                </div>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f3f4f6', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                <X size={18} color="#4b5563" />
              </button>
            </div>

            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>


              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#d97706" /> Order Status
                </h3>
                <Steps
                  size="small"
                  current={['Pending', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(selectedOrder.status)}
                  items={[
                    { title: 'Order Placed' },
                    { title: 'Processing' },
                    { title: 'Shipped' },
                    { title: 'Out for Delivery' },
                    { title: 'Delivered' }
                  ]}
                />
              </div>

              {selectedOrder.status === 'Cancelled' && (
                <div style={{ background: '#fef2f2', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #fecaca' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#991b1b', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <XCircle size={16} color="#dc2626" /> Cancellation Details
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: '#7f1d1d' }}>Cancelled By</span>
                      <span style={{ fontWeight: '600', color: '#991b1b', textTransform: 'capitalize' }}>{selectedOrder.cancelledBy || 'Unknown'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: '#7f1d1d' }}>Date</span>
                      <span style={{ fontWeight: '500', color: '#991b1b' }}>{selectedOrder.cancelledAt || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
                      <span style={{ color: '#7f1d1d' }}>Reason</span>
                      <span style={{ fontWeight: '500', color: '#991b1b', fontStyle: 'italic' }}>"{selectedOrder.cancellationReason || 'No reason provided.'}"</span>
                    </div>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={16} color="#d97706" /> Customer
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <img src={selectedOrder.avatar} alt={selectedOrder.customer} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedOrder.customer}</h4>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Mail size={14} color="#6b7280" style={{ marginTop: '2px' }} />
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>{selectedOrder.email || 'customer@example.com'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <Phone size={14} color="#6b7280" style={{ marginTop: '2px' }} />
                      <span style={{ fontSize: '13px', color: '#4b5563' }}>{selectedOrder.phone || '+91 9876543210'}</span>
                    </div>
                  </div>
                </div>


                <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CreditCard size={16} color="#d97706" /> Payment & Shipping
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Payment Method</div>
                      <div style={{ fontSize: '13px', color: '#111827', fontWeight: '500' }}>{selectedOrder.paymentMethod} • {selectedOrder.paymentStatus}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Transaction ID</div>
                      <div style={{ fontSize: '13px', color: '#111827', fontWeight: '500', fontFamily: 'monospace' }}>{selectedOrder.transactionId}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> Delivery Address</div>
                      <div style={{ fontSize: '13px', color: '#111827', lineHeight: '1.5' }}>{selectedOrder.address || '123, Anna Nagar, Chennai, Tamil Nadu 600040'}</div>
                    </div>
                  </div>
                </div>
              </div>


              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', marginBottom: '24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box size={16} color="#d97706" /> Products
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {selectedOrder.products?.map((item, idx) => (
                    <React.Fragment key={item.id}>
                      {idx > 0 && <Divider style={{ margin: '0' }} />}
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#111827' }}>{item.name}</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#6b7280' }}>
                            <span>SKU: {item.sku}</span>
                            <span>Size: {item.size}</span>
                            <span>Color: {item.color}</span>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{item.total}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.quantity} × {item.unitPrice}</div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #f3f4f6', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#111827', margin: '0 0 16px' }}>Order Summary</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4b5563' }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: '500', color: '#111827' }}>{selectedOrder.amount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#10b981' }}>
                    <span>Discount</span>
                    <span style={{ fontWeight: '500' }}>-{selectedOrder.discount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#d97706' }}>
                    <span>Coupon Applied</span>
                    <span style={{ fontWeight: '500' }}>{selectedOrder.coupon}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4b5563' }}>
                    <span>Shipping</span>
                    <span style={{ fontWeight: '500', color: '#111827' }}>Free</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#4b5563' }}>
                    <span>GST</span>
                    <span style={{ fontWeight: '500', color: '#111827' }}>
                      {selectedOrder.dbOrder && selectedOrder.dbOrder.gstAmount != null 
                        ? `₹${selectedOrder.dbOrder.gstAmount.toFixed(2)}` 
                        : (selectedOrder.dbOrder && selectedOrder.dbOrder.tax != null 
                            ? `₹${selectedOrder.dbOrder.tax.toFixed(2)}` 
                            : 'Included')}
                    </span>
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#111827' }}>
                    <span>Total</span>
                    <span style={{ color: '#d97706' }}>{selectedOrder.amount}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </Drawer>


      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '600' }}>
            <AlertTriangle size={18} color="#d97706" /> Review Return Request
          </div>
        }
        open={isReturnModalOpen}
        onCancel={() => setIsReturnModalOpen(false)}
        footer={null}
        width={500}
      >
        {returnSelectedOrder && (
          <div style={{ paddingTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Order ID</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{returnSelectedOrder.id}</div>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>Customer Name</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{returnSelectedOrder.customer}</div>
              </div>

              <div style={{ background: '#fffbeb', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a' }}>
                <div style={{ fontSize: '13px', color: '#d97706', marginBottom: '4px', fontWeight: '500' }}>Return Reason</div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#92400e' }}>Customer Request</div>
                <div style={{ fontSize: '13px', color: '#92400e', marginTop: '8px', fontStyle: 'italic' }}>
                  "{returnSelectedOrder.returnRequest?.reason || 'Please process the return.'}"
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
                <Button
                  type="primary"
                  style={{ background: '#10b981', borderColor: '#10b981', flex: 1, height: '40px', fontWeight: '500' }}
                  onClick={() => handleReturnOrder(returnSelectedOrder._id, returnSelectedOrder.id, 'Approved')}
                >
                  Approve Return
                </Button>
                <Button
                  danger
                  style={{ flex: 1, height: '40px', fontWeight: '500' }}
                  onClick={() => handleReturnOrder(returnSelectedOrder._id, returnSelectedOrder.id, 'Rejected')}
                >
                  Reject Return
                </Button>
              </div>

            </div>
          </div>
        )}
      </Modal>


      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: '600' }}>
            <Download size={18} color="#d97706" /> Export Orders
          </div>
        }
        open={isExportModalOpen}
        onCancel={() => setIsExportModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsExportModalOpen(false)} style={{ borderRadius: '8px', fontWeight: '500' }}>
            Cancel
          </Button>,
          <Button key="export" type="primary" onClick={handleExportSubmit} style={{ background: '#d97706', borderColor: '#d97706', borderRadius: '8px', fontWeight: '500' }}>
            Export
          </Button>,
        ]}
      >
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>Select Orders</div>
            <Radio.Group value={exportRange} onChange={(e) => setExportRange(e.target.value)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Radio value="all">All Orders</Radio>
              <Radio value="filtered">Filtered Orders (based on search)</Radio>
              <Radio value="selected">Selected Orders ({selectedRowKeys.length})</Radio>
            </Radio.Group>
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>File Format</div>
            <Radio.Group value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Radio value="excel">Excel (.xlsx)</Radio>
              <Radio value="csv">CSV (.csv)</Radio>
              <Radio value="pdf">PDF (.pdf)</Radio>
            </Radio.Group>
          </div>
        </div>
      </Modal>

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '700', color: '#1a1a1a', paddingBottom: '8px', borderBottom: '1px solid #f0f0f0', marginBottom: '8px' }}>
            <div style={{ background: '#fdfbf7', padding: '6px', borderRadius: '6px', border: '1px solid #f3e8d6', display: 'flex' }}>
              <Truck size={18} color="#c99a53" />
            </div>
            Shipping Configuration
          </div>
        }
        open={isShippingModalOpen}
        onCancel={() => setIsShippingModalOpen(false)}
        footer={null}
        width={550}
        centered
        className="premium-shipping-modal"
        styles={{ 
          mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
          content: { borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '16px' } 
        }}
        closeIcon={<div style={{ background: '#f3f4f6', borderRadius: '50%', padding: '4px', display: 'flex', marginTop: '2px' }}><X size={14} color="#666" /></div>}
      >
        <div style={{ padding: '0' }}>
          <ShippingTab />
        </div>
      </Modal>

    </div>
  );
};

export default OrderManagement;
