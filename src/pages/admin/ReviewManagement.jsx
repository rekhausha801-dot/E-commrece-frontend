import React, { useState, useEffect } from 'react';
import { Search, Download, PenTool, Edit, Eye, MoreVertical, Star, CheckCircle, Shield, Heart, Award, RefreshCcw, Camera, ChevronRight, ChevronLeft, MessageSquare, Filter, Box, X, Clock } from 'lucide-react';
import { Table, Dropdown, Menu, Select, DatePicker, Button, message } from 'antd';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { getAdminReviewsApi, updateReviewStatusApi, deleteReviewApi } from '../../services/api';
import dayjs from 'dayjs';

const sparklineData = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineData2 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];

const { RangePicker } = DatePicker;

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getAdminReviewsApi();
      if (res.data && res.data.success) {
        // Map backend data to frontend structure
        const formatted = res.data.data.map(r => ({
          id: r._id,
          customerName: r.user?.name || 'Anonymous',
          productTitle: r.product ? r.product.name : 'Unknown Product',
          sku: r.product ? (r.product.sku || `ID: ${r.product._id.substring(0, 8)}`) : 'N/A',
          customerImage: r.user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user?.name || 'A')}&background=fef3c7&color=d97706&size=100`,
          rating: r.rating,
          reviewText: r.comment || '',
          reviewImages: r.images || [],
          moreImagesCount: Math.max(0, (r.images?.length || 0) - 3),
          status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
          verified: r.isVerifiedPurchase || false,
          date: dayjs(r.createdAt).format('DD MMM YYYY'),
          time: dayjs(r.createdAt).format('hh:mm A')
        }));
        setReviews(formatted);
      }
    } catch (err) {
      message.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateReviewStatusApi(id, status);
      message.success(`Review ${status} successfully`);
      fetchReviews();
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReviewApi(id);
      message.success('Review deleted successfully');
      fetchReviews();
    } catch (err) {
      message.error('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter(r => {
    return searchText === '' || 
      r.customerName.toLowerCase().includes(searchText.toLowerCase()) || 
      r.productTitle.toLowerCase().includes(searchText.toLowerCase()) || 
      r.reviewText.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleExport = () => {
    const tableHtml = `
      <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          <table border="1">
            <thead>
              <tr>
                <th style="background-color: #f3f4f6;">ID</th>
                <th style="background-color: #f3f4f6;">Customer Name</th>
                <th style="background-color: #f3f4f6;">Product</th>
                <th style="background-color: #f3f4f6;">Rating</th>
                <th style="background-color: #f3f4f6;">Review Text</th>
                <th style="background-color: #f3f4f6;">Status</th>
                <th style="background-color: #f3f4f6;">Date</th>
              </tr>
            </thead>
            <tbody>
              ${filteredReviews.map(r => `
                <tr>
                  <td>${r.id}</td>
                  <td>${r.customerName}</td>
                  <td>${r.productTitle}</td>
                  <td>${r.rating}</td>
                  <td>${r.reviewText}</td>
                  <td>${r.status}</td>
                  <td>${r.date}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reviews_export_${new Date().toLocaleDateString()}.xls`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAction = (id, actionKey) => {
    if (actionKey === '3') {
      handleDeleteReview(id);
    } else if (actionKey === '1') {
      handleUpdateStatus(id, 'approved');
    } else if (actionKey === '2') {
      handleUpdateStatus(id, 'rejected');
    }
  };

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={14} fill={star <= Math.floor(rating) ? '#d97706' : 'none'} color={star <= rating ? '#d97706' : '#d1d5db'} />
        ))}
      </div>
    );
  };

  const columns = [
    {
      title: 'Customer Review',
      dataIndex: 'customerReview',
      key: 'customerReview',
      width: 500,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '8px 0' }}>
          {/* Customer Avatar */}
          <img src={record.customerImage} alt={record.customerName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0 }} />

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Name & Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', color: '#111827', letterSpacing: '-0.3px' }}>{record.customerName}</h4>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>•</span>
              <span style={{ fontSize: '13px', color: '#6b7280' }}>{record.date}</span>
              {record.verified && (
                <>
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '12px', fontWeight: '500' }}>
                    <CheckCircle size={14} /> Verified Buyer
                  </span>
                </>
              )}
            </div>

            {/* Review Text */}
            <p style={{ margin: 0, fontSize: '14px', color: '#4b5563', lineHeight: '1.6' }}>
              {record.reviewText}
            </p>

            {/* Review Images */}
            {record.reviewImages && record.reviewImages.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                {record.reviewImages.map((img, idx) => (
                  <div key={idx} style={{ width: '54px', height: '72px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 4px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.3s ease', position: 'relative' }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = '#d1d5db'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#e5e7eb'; }}>
                    <img src={img} alt="review" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                {record.moreImagesCount > 0 && (
                  <div style={{ width: '54px', height: '72px', borderRadius: '6px', background: '#f9fafb', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#4b5563', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}
                    onMouseOver={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = '#111827'; }}
                    onMouseOut={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.color = '#4b5563'; }}>
                    +{record.moreImagesCount}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Product',
      key: 'product',
      width: 250,
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{record.productTitle}</span>
          <span style={{ fontSize: '12px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Box size={12} /> {record.sku}
          </span>
        </div>
      )
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      align: 'center',
      width: 150,
      render: (rating) => (
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#fffbeb', padding: '6px 14px', borderRadius: '24px', border: '1px solid #fef3c7' }}>
          <Star size={14} fill="#d97706" color="#d97706" />
          <span style={{ fontSize: '13px', color: '#b45309', fontWeight: '700' }}>{rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
      render: (status) => {
        let styles = { bg: '#ecfdf5', color: '#059669', border: '#d1fae5', icon: <CheckCircle size={14} /> };
        if (status === 'Rejected') styles = { bg: '#fef2f2', color: '#e11d48', border: '#ffe4e6', icon: <X size={14} /> };
        if (status === 'Pending') styles = { bg: '#fefce8', color: '#ca8a04', border: '#fef08a', icon: <Clock size={14} /> };
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: styles.bg, color: styles.color, border: `1px solid ${styles.border}`, padding: '6px 14px', borderRadius: '24px', fontSize: '12px', fontWeight: '600' }}>
            {styles.icon} {status}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      width: 100,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Dropdown menu={{
            items: [{ key: '1', label: 'Approve' }, { key: '2', label: 'Reject' }, { type: 'divider' }, { key: '3', label: 'Delete', danger: true }],
            onClick: ({ key }) => handleAction(record.id, key)
          }} trigger={['click']}>
            <button style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}
              onMouseOver={e => e.currentTarget.style.background = '#f9fafb'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
              <MoreVertical size={16} color="#4b5563" />
            </button>
          </Dropdown>
        </div>
      )
    }
  ];

  return (
    <div style={{ padding: '0 8px 32px 8px' }}>
      {/* Header Actions */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '12px', padding: '12px 20px', background: '#fff',
        borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
        border: '1px solid #f3f4f6'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', background: '#fff',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.08), 0 2px 4px rgba(0,0,0,0.02)', border: '1px solid #fef3c7'
          }}>
            <MessageSquare size={22} color="#d97706" />
          </div>
          <div style={{ width: '3px', height: '20px', background: '#d97706', borderRadius: '4px' }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937', letterSpacing: '-0.3px' }}>Customer Reviews</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleExport} style={{ background: '#fff', color: '#4b5563', border: '1px solid #e5e7eb', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <Download size={15} /> Export
          </button>
        </div>
      </div>

      <div style={{ padding: '0' }}>
        {/* Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '16px' }}>
          <div className="stat-card dark" style={{ cursor: 'pointer' }}>
            <div className="stat-top">
              <div className="stat-icon gold" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }}><Star size={18} /></div>
              <div className="stat-info">
                <span className="stat-title">Average Rating</span>
                <h2 className="stat-value gold-text">4.8</h2>
                <div className="stat-bottom" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill="#c9a05b" color="#c9a05b" />)}
                  <span style={{ fontSize: '11px', color: '#9ca3af', marginLeft: '4px' }}>(2.4k Reviews)</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id="glowDarkReview" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkReview)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light" style={{ cursor: 'pointer' }}>
            <div className="stat-top">
              <div className="stat-icon gold" style={{ color: '#10b981', background: '#ecfdf5', border: 'none' }}><Award size={18} /></div>
              <div className="stat-info">
                <span className="stat-title">Verified Reviews</span>
                <h2 className="stat-value">2,102</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 145</span> <span className="stat-change-text">new today</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData2}>
                  <defs>
                    <linearGradient id="glowLightReview1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightReview1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light" style={{ cursor: 'pointer' }}>
            <div className="stat-top">
              <div className="stat-icon gold" style={{ color: '#db2777', background: '#fce7f3', border: 'none' }}><Heart size={18} /></div>
              <div className="stat-info">
                <span className="stat-title">Positive Reviews</span>
                <h2 className="stat-value">98%</h2>
                <div className="stat-bottom">
                  <span className="stat-change positive">↑ 2%</span> <span className="stat-change-text">this month</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id="glowLightReview2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightReview2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="stat-card light" style={{ cursor: 'pointer' }}>
            <div className="stat-top">
              <div className="stat-icon gold" style={{ color: '#ea580c', background: '#ffedd5', border: 'none' }}><Shield size={18} /></div>
              <div className="stat-info">
                <span className="stat-title">Pending Approvals</span>
                <h2 className="stat-value">145</h2>
                <div className="stat-bottom">
                  <span className="stat-change negative">↓ 12</span> <span className="stat-change-text">needs action</span>
                </div>
              </div>
            </div>
            <div className="stat-chart-sparkline">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData2}>
                  <defs>
                    <linearGradient id="glowLightReview3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightReview3)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Main Table Area */}
        <div className="premium-glass-card" style={{ padding: '0px', borderRadius: '16px', background: '#fff', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden', marginBottom: '24px' }}>

          {/* Premium Filter Bar */}
          <div style={{ padding: '20px 24px', background: '#fff', borderBottom: '1px solid #f3f4f6', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div className="search-input-wrapper" style={{ width: '320px', background: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb', height: '44px', display: 'flex', alignItems: 'center' }}>
              <Search size={18} color="#9ca3af" style={{ margin: '0 12px' }} />
              <input placeholder="Search by customer, product, review..." style={{ background: 'transparent', border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#111827' }} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </div>
            
          
            <div style={{ marginLeft: 'auto' }}>
              <Button type="text" onClick={() => setSearchText('')} style={{ color: '#d97706', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 16px' }}>
                <RefreshCcw size={16} /> Clear Filters
              </Button>
            </div>
          </div>

          <style>
            {`
              .premium-table .ant-table { background: transparent !important; }
              .premium-table .ant-table-thead > tr > th { background: #fcfbfa !important; border-bottom: 1px solid #f3f4f6 !important; color: #6b7280; font-weight: 600; padding: 4px 24px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; white-space: nowrap !important; word-break: keep-all !important; }
              .premium-table .ant-table-tbody > tr > td { padding: 4px 24px !important; border-bottom: 1px solid #f3f4f6 !important; background: #fff !important; transition: all 0.2s ease; vertical-align: top; }
              .premium-table .ant-table-tbody > tr:hover > td { background: #faf9f8 !important; }
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
              .premium-table .ant-checkbox-checked .ant-checkbox-inner { background-color: #10b981; border-color: #10b981; }
              .search-input-wrapper { display: flex; align-items: center; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 24px; padding: 0 16px; height: 42px; width: 320px; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
              .search-input-wrapper:focus-within { background: #fff; border-color: #d97706; box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1), 0 4px 6px -1px rgba(0,0,0,0.05); transform: translateY(-1px); }
              .search-input-wrapper input { border: none; outline: none; background: transparent; width: 100%; font-size: 14px; color: #111827; }
              .search-input-wrapper input::placeholder { color: #9ca3af; font-weight: 400; }
              .ant-select-selector { border-radius: 12px !important; border-color: #e5e7eb !important; box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important; font-size: 14px !important; color: #4b5563 !important; }
              .ant-select-selection-item { font-weight: 500 !important; }
            `}
          </style>

          <Table
            className="premium-table"
            columns={columns}
            dataSource={filteredReviews}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            rowSelection={{ type: 'checkbox' }}
            pagination={{
              pageSize: 5,
              showSizeChanger: false,
              showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of 2,450 reviews`,
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
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement;
