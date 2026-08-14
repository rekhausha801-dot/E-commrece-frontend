import React, { useState } from 'react';
import { Search, Download, PenTool, Edit, Eye, MoreVertical, Star, CheckCircle, Shield, Heart, Award, RefreshCcw, Camera, ChevronRight, ChevronLeft, MessageSquare, Filter } from 'lucide-react';
import { Table, Dropdown, Menu, Select, DatePicker, Button } from 'antd';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const sparklineData = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineData2 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];

const { RangePicker } = DatePicker;

const initialReviews = [
  {
    id: 1,
    customerName: 'Priya Sharma',
    productTitle: 'Floral Anarkali Kurta Set',
    sku: 'SKU: FAK0001',
    customerImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    rating: 5.0,
    reviewText: 'Very beautiful kurta! The fabric is so soft and comfortable. Perfect fit and exactly as shown in the pictures.',
    reviewImages: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=50',
      'https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=50',
      'https://images.unsplash.com/photo-1605763240000-7e93b172d754?w=50'
    ],
    moreImagesCount: 2,
    status: 'Approved',
    verified: true,
    date: '17 Aug 2026',
    time: '10:32 AM'
  },
  {
    id: 2,
    customerName: 'Neha Verma',
    productTitle: 'Embroidered Straight Kurta',
    sku: 'SKU: ESK0002',
    customerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5.0,
    reviewText: 'Amazing quality and elegant stitching. Very happy with my purchase. Will shop again!',
    reviewImages: [],
    status: 'Approved',
    verified: true,
    date: '13 Aug 2026',
    time: '09:15 AM'
  },
  {
    id: 3,
    customerName: 'Anjali Mehta',
    productTitle: 'Beige Partywear Gown',
    sku: 'SKU: BPG0003',
    customerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5.0,
    reviewText: 'Loved the color and design. Got so many compliments! Totally worth it.',
    reviewImages: [],
    status: 'Approved',
    verified: true,
    date: '12 Aug 2026',
    time: '07:45 PM'
  },
  {
    id: 4,
    customerName: 'Kavya Reddy',
    productTitle: 'Cotton A-Line Kurta',
    sku: 'SKU: CAK0004',
    customerImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    rating: 4.0,
    reviewText: 'Nice collection and good quality. Delivery was on time.',
    reviewImages: [],
    status: 'Pending',
    verified: true,
    date: '12 Aug 2026',
    time: '05:20 PM'
  },
  {
    id: 5,
    customerName: 'Meera Patel',
    productTitle: 'Floral Printed Co-ord Set',
    sku: 'SKU: FPC005',
    customerImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    rating: 4.0,
    reviewText: 'The print is beautiful and fabric is breathable. Overall good experience.',
    reviewImages: [],
    status: 'Rejected',
    verified: true,
    date: '12 Aug 2026',
    time: '03:10 PM'
  }
];

const customerPhotos = [
  'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=200',
  'https://images.unsplash.com/photo-1583391733958-d25e07fac044?w=200',
  'https://images.unsplash.com/photo-1605763240000-7e93b172d754?w=200',
  'https://images.unsplash.com/photo-1564584217132-2271fea73ca4?w=200',
  'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=200',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200'
];

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "Amazing product! Exactly what I was looking for. Highly recommended.",
    user: "Priya Sharma",
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50'
  },
  {
    id: 2,
    rating: 5,
    text: "Great quality and fast delivery. Will definitely buy again!",
    user: "Neha Verma",
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50'
  },
  {
    id: 3,
    rating: 4,
    text: "Beautiful design and comfortable to wear. Loved it!",
    user: "Anjali Mehta",
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50'
  }
];

const ReviewManagement = () => {
  const [reviews, setReviews] = useState(initialReviews);

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
      title: 'CUSTOMER & REVIEW',
      key: 'customerReview',
      width: 450,
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {/* Customer Info */}
          <div style={{ display: 'flex', gap: '12px', minWidth: '180px' }}>
            <img src={record.customerImage} alt={record.customerName} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h4 style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: '700', color: '#111827' }}>{record.customerName}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '2px', background: '#10b981', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '600' }}>
                  {record.rating.toFixed(1)} <Star size={10} fill="#fff" color="#fff" />
                </span>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>• Posted on {record.date}</span>
              </div>
            </div>
          </div>
          
          {/* Review Text & Images */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#111827', lineHeight: '1.5' }}>{record.reviewText}</p>
            {record.reviewImages && record.reviewImages.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {record.reviewImages.map((img, idx) => (
                  <img key={idx} src={img} alt="review" style={{ width: '48px', height: '64px', borderRadius: '8px', objectFit: 'cover' }} />
                ))}
                {record.moreImagesCount > 0 && (
                  <div style={{ width: '48px', height: '64px', borderRadius: '8px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#6b7280', fontWeight: '600' }}>
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
      title: 'RATING',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {renderStars(rating)}
          <span style={{ fontSize: '12px', color: '#4b5563', fontWeight: '500' }}>{rating.toFixed(1)}</span>
        </div>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => {
        let styles = { bg: '#ecfdf5', color: '#10b981' };
        if (status === 'Rejected') styles = { bg: '#fef2f2', color: '#ef4444' };
        if (status === 'Pending') styles = { bg: '#fffbeb', color: '#f59e0b' };
        return (
          <span style={{ background: styles.bg, color: styles.color, padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' }}>
            {status}
          </span>
        );
      }
    },
    {
      title: 'VERIFIED',
      key: 'verified',
      align: 'center',
      render: (_, record) => record.verified ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <CheckCircle size={14} color="#10b981" />
          <span style={{ fontSize: '11px', color: '#111827', fontWeight: '500' }}>Verified Buyer</span>
        </div>
      ) : '-'
    },
    {
      title: 'DATE',
      key: 'date',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '12px', color: '#111827', fontWeight: '600' }}>{record.date}</span>
          <span style={{ fontSize: '11px', color: '#6b7280' }}>{record.time}</span>
        </div>
      )
    },
    {
      title: 'ACTIONS',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <button style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Eye size={16} color="#d97706" />
          </button>
          <Dropdown menu={{ items: [ { key: '1', label: 'Approve' }, { key: '2', label: 'Reject' }, { key: '3', label: 'Delete', danger: true } ] }} trigger={['click']}>
            <button style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoreVertical size={16} color="#6b7280" />
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
            <MessageSquare size={22} color="#d97706" />
          </div>
          <div style={{ width: '3px', height: '20px', background: '#d97706', borderRadius: '4px' }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937', letterSpacing: '-0.3px' }}>Customer Reviews</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: '#fff', color: '#4b5563', border: '1px solid #e5e7eb', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <Download size={15} /> Export
          </button>
          <button style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.2)' }}>
            <PenTool size={15} /> Write a Review
          </button>
        </div>
      </div>

      <div style={{ padding: '0' }}>
        {/* Summary Cards */}
        <div className="stats-grid" style={{ marginBottom: '32px' }}>
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
          
          {/* Header matching OrderManagement (Now just Filters) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', flexWrap: 'wrap', gap: '16px', background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', flex: 1 }}>
              <div className="search-input-wrapper">
                <Search size={18} color="#9ca3af" style={{ marginRight: '10px' }} />
                <input
                  placeholder="Search by customer, product, review..."
                />
              </div>

              <Select defaultValue="All Ratings" style={{ width: '130px', height: '42px' }} 
                options={[{ value: 'All Ratings', label: 'All Ratings' }, { value: '5 Stars', label: '5 Stars' }, { value: '4 Stars', label: '4 Stars' }]} 
              />
              <Select defaultValue="All Status" style={{ width: '130px', height: '42px' }} 
                options={[{ value: 'All Status', label: 'All Status' }, { value: 'Approved', label: 'Approved' }, { value: 'Pending', label: 'Pending' }]} 
              />
              <Select defaultValue="All Verified" style={{ width: '130px', height: '42px' }} 
                options={[{ value: 'All Verified', label: 'All Verified' }, { value: 'Verified Buyer', label: 'Verified Buyer' }, { value: 'Not Verified', label: 'Not Verified' }]} 
              />

              <Button
                type="text"
                style={{
                  color: '#d97706', fontSize: '13px', fontWeight: '600',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  borderRadius: '8px', padding: '8px 16px', height: '42px',
                  border: '1px solid #fde68a', background: '#fff'
                }}
              >
                <Filter size={15} />
                More Filters
              </Button>
            </div>

            <Button
              type="text"
              style={{
                color: '#d97706', fontSize: '13px', fontWeight: '600',
                display: 'flex', alignItems: 'center', gap: '6px',
                borderRadius: '8px', padding: '8px 16px', transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#fef3c7'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              <RefreshCcw size={15} />
              Clear Filters
            </Button>
          </div>

          <style>
            {`
              .premium-table .ant-table { background: transparent !important; }
              .premium-table .ant-table-thead > tr > th { background: #fdfbf7 !important; border-bottom: 1px solid #f3f4f6 !important; color: #4b5563; font-weight: 700; padding: 16px 24px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; white-space: nowrap !important; word-break: keep-all !important; }
              .premium-table .ant-table-tbody > tr > td { padding: 16px 24px !important; border-bottom: 1px solid #f3f4f6 !important; background: #fff !important; transition: all 0.2s ease; }
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
              .premium-table .ant-checkbox-checked .ant-checkbox-inner { background-color: #10b981; border-color: #10b981; }
              .search-input-wrapper { display: flex; align-items: center; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 24px; padding: 0 16px; height: 42px; width: 320px; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
              .search-input-wrapper:focus-within { background: #fff; border-color: #d97706; box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.1), 0 4px 6px -1px rgba(0,0,0,0.05); transform: translateY(-1px); }
              .search-input-wrapper input { border: none; outline: none; background: transparent; width: 100%; font-size: 14px; color: #111827; }
              .search-input-wrapper input::placeholder { color: #9ca3af; font-weight: 400; }
              .ant-select-selector { border-radius: 8px !important; border-color: #e5e7eb !important; box-shadow: 0 1px 2px rgba(0,0,0,0.02) !important; }
            `}
          </style>

          <Table 
            className="premium-table"
            columns={columns} 
            dataSource={reviews} 
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
