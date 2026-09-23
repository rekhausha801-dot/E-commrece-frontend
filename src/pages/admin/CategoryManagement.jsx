import React, { useState, useMemo, useEffect } from 'react';
import { Table, Dropdown, Select, Button, Input, Space } from 'antd';
import {
  Search, Plus, Grid, ShieldCheck, MinusCircle, Tags,
  MoreVertical, Copy, GripVertical, X, Edit2, Trash2, ChevronLeft, ChevronRight,
  ArrowUpDown, ArrowUp, ArrowDown, Eye, CopyPlus, Package, Box, Database, FilterX,
  Layers, Play, Pause
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import AddCategoryModal from './AddCategoryModal';
import { getCategories, deleteCategory, updateCategoryStatus } from '../../services/api';
import { message } from 'antd';
import { useCategories } from '../../context/CategoryContext';

import kurthiImg from '../../assets/images/kurthi3.png';
import topImg from '../../assets/images/top2.jpeg';
import manImg from '../../assets/images/man.png';
import shoeImg from '../../assets/images/shoe.png';
import watchImg from '../../assets/images/watch.png';
import homeImg from '../../assets/images/home.png';
import beautyImg from '../../assets/images/beauty.png';
import kidsImg from '../../assets/images/kids.jpeg';

const sparklineData = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineData2 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];

const initialData = [
  {
    id: 1, name: 'Women', desc: 'Women fashion collection', parent: '',
    slug: 'women', products: 120, status: 'Active', productCreation: 'Enabled',
    order: 1, created: '12 Aug 2026', updated: '12 Aug 2026',
    img: topImg
  },
  {
    id: 2, name: 'Kurtis', desc: 'Elegant & stylish kurtis collection', parent: 'Women',
    slug: 'kurtis', products: 48, status: 'Active', productCreation: 'Enabled',
    order: 2, created: '12 Aug 2026', updated: '12 Aug 2026',
    img: kurthiImg
  },
  {
    id: 3, name: 'Sarees', desc: 'Traditional sarees and ethnic wear', parent: 'Women',
    slug: 'sarees', products: 86, status: 'Active', productCreation: 'Enabled',
    order: 3, created: '11 Aug 2026', updated: '11 Aug 2026',
    img: beautyImg
  },
  {
    id: 4, name: 'Men', desc: 'Men fashion and accessories', parent: '',
    slug: 'men', products: 94, status: 'Active', productCreation: 'Enabled',
    order: 4, created: '10 Aug 2026', updated: '10 Aug 2026',
    img: manImg
  },
  {
    id: 5, name: 'Shirts', desc: 'Casual and formal shirts for men', parent: 'Men',
    slug: 'shirts', products: 55, status: 'Inactive', productCreation: 'Paused',
    order: 5, created: '10 Aug 2026', updated: '10 Aug 2026',
    img: manImg
  },
  {
    id: 6, name: 'Footwear', desc: 'Shoes, sandals and boots', parent: '',
    slug: 'footwear', products: 112, status: 'Active', productCreation: 'Enabled',
    order: 6, created: '09 Aug 2026', updated: '09 Aug 2026',
    img: shoeImg
  },
  {
    id: 7, name: 'Kids', desc: 'Clothing for kids and infants', parent: '',
    slug: 'kids', products: 67, status: 'Active', productCreation: 'Enabled',
    order: 7, created: '08 Aug 2026', updated: '08 Aug 2026',
    img: kidsImg
  },
  {
    id: 8, name: 'Winter Wear', desc: 'Jackets, sweaters and coats', parent: '',
    slug: 'winter-wear', products: 43, status: 'Active', productCreation: 'Enabled',
    order: 8, created: '05 Aug 2026', updated: '05 Aug 2026',
    img: topImg
  },
];

const CategoryManagement = () => {
  const navigate = useNavigate();
  const { refreshCategories } = useCategories() || {};
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editCandidate, setEditCandidate] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const catRes = await getCategories().catch(() => null);

      const catList = catRes?.data?.data || [];

      if (refreshCategories) refreshCategories();

      const mappedCategories = catList.map((item, index) => ({
        ...item,
        id: item._id,
        desc: item.description,
        status: item.status === 'active' ? 'Active' : 'Inactive',
        slug: item.name.toLowerCase().replace(/\s+/g, '-'),
        parent: '',
        products: 0,
        productCreation: 'Enabled',
        order: index + 1,
        created: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A',
        updated: item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'N/A',
        img: item.image || initialData[index % initialData.length].img,
        icon: item.icon || '',
        isSubcategory: false
      }));

      setCategories(mappedCategories);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [activeCategory, setActiveCategory] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [productCreationFilter, setProductCreationFilter] = useState('All');
  const [sortFilter, setSortFilter] = useState('Newest');
  const [categorySearchFilter, setCategorySearchFilter] = useState(null);

  const totalCat = categories.length;
  const activeCat = categories.filter(c => c.status === 'Active').length;
  const inactiveCat = categories.filter(c => c.status === 'Inactive').length;
  const totalProducts = categories.reduce((acc, curr) => acc + curr.products, 0);

  const filteredCategories = useMemo(() => {
    let result = categories.filter(cat => {
      const q = searchQuery.toLowerCase();
      const matchSearch = cat.name.toLowerCase().includes(q) ||
        cat.slug.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'All Status' || cat.status === statusFilter;
      const matchCreation = productCreationFilter === 'All' || cat.productCreation === productCreationFilter;
      return matchSearch && matchStatus && matchCreation;
    });

    result.sort((a, b) => {
      if (sortFilter === 'Newest') return b.id - a.id;
      if (sortFilter === 'Oldest') return a.id - b.id;
      if (sortFilter === 'A-Z') return a.name.localeCompare(b.name);
      if (sortFilter === 'Product Count') return b.products - a.products;
      return 0;
    });

    return result;
  }, [categories, searchQuery, statusFilter, productCreationFilter, sortFilter]);

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const paginatedCategories = filteredCategories.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedItems(paginatedCategories.map(c => c.id));
    else setSelectedItems([]);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleStatus = async (id, e) => {
    if (e) e.stopPropagation();
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    const newStatus = cat.status === 'Active' ? 'inactive' : 'active';
    try {
      await updateCategoryStatus(id, newStatus);
      message.success('Status updated');
      setCategories(prev => prev.map(c => c.id === id ? { ...c, status: newStatus === 'active' ? 'Active' : 'Inactive' } : c));
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const toggleProductCreation = (id, e) => {
    if (e) e.stopPropagation();
    setCategories(prev => prev.map(c => c.id === id ? { ...c, productCreation: c.productCreation === 'Enabled' ? 'Paused' : 'Enabled' } : c));
    setOpenDropdownId(null);
  };

  const handleBulkAction = (action) => {
    if (action === 'activate') {
      setCategories(prev => prev.map(c => selectedItems.includes(c.id) ? { ...c, status: 'Active' } : c));
    } else if (action === 'deactivate') {
      setCategories(prev => prev.map(c => selectedItems.includes(c.id) ? { ...c, status: 'Inactive' } : c));
    } else if (action === 'delete') {
      setCategories(prev => prev.filter(c => !selectedItems.includes(c.id)));
      setSelectedItems([]);
    }
  };

  const openDrawer = (cat) => {
    setActiveCategory(cat);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (cat, e) => {
    if (e) e.stopPropagation();
    setDeleteCandidate(cat);
    setOpenDropdownId(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteCategory(deleteCandidate.id);
      message.success('Deleted successfully');
      setCategories(prev => prev.filter(c => c.id !== deleteCandidate.id));
      if (activeCategory?.id === deleteCandidate.id) setIsDrawerOpen(false);
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeleteCandidate(null);
    }
  };

  const clearFilters = () => {
    setStatusFilter('All Status');
    setProductCreationFilter('All');
    setSearchQuery('');
    setSortFilter('Newest');
    setCategorySearchFilter(null);
  };

  const rowSelection = {
    selectedRowKeys: selectedItems,
    onChange: (newSelectedRowKeys) => {
      setSelectedItems(newSelectedRowKeys);
    },
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filteredValue: categorySearchFilter ? [categorySearchFilter] : null,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            placeholder="Search category"
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
            <Button
              onClick={() => { clearFilters(); confirm(); }}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <Search size={14} style={{ color: filtered ? '#d97706' : undefined }} />
      ),
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={record.img} alt={text} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
          <div style={{ fontSize: '13px', fontWeight: '500', color: '#222' }}>{text}</div>
        </div>
      ),
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      key: 'slug',
      align: 'center',
      filteredValue: null,
      render: (text) => (
        <span style={{ fontSize: '12px', color: '#6b7280', background: '#f3f4f6', padding: '4px 10px', borderRadius: '12px', fontWeight: '500' }}>
          /{text}
        </span>
      ),
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      align: 'center',
      sorter: (a, b) => a.products - b.products,
      filteredValue: null,
      render: (text) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', color: '#374151', fontWeight: '600' }}>
          <Package size={15} color="#9ca3af" />
          {text}
        </div>
      ),
    },
    {
      title: 'Product Creation',
      dataIndex: 'productCreation',
      key: 'productCreation',
      align: 'center',
      filters: [
        { text: 'Enabled', value: 'Enabled' },
        { text: 'Paused', value: 'Paused' },
      ],
      filterMultiple: false,
      filteredValue: productCreationFilter === 'All' ? null : [productCreationFilter],
      render: (text) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '4px 12px', borderRadius: '20px',
          background: text === 'Enabled' ? '#ecfdf5' : '#fef2f2',
          color: text === 'Enabled' ? '#10b981' : '#ef4444',
          fontSize: '12px', fontWeight: '600'
        }}>
          {text === 'Enabled' ? <Play size={10} fill="none" strokeWidth={3} /> : <span style={{ fontWeight: 900, fontSize: '11px', letterSpacing: '-1px' }}>||</span>}
          {text}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
      ],
      filterMultiple: false,
      filteredValue: statusFilter === 'All Status' ? null : [statusFilter],
      render: (text, record) => (
        <span
          onClick={e => toggleStatus(record.id, e)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 12px', borderRadius: '20px',
            background: text === 'Active' ? '#ecfdf5' : '#fef2f2',
            color: text === 'Active' ? '#10b981' : '#ef4444',
            fontSize: '12px', fontWeight: '600', cursor: 'pointer'
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: text === 'Active' ? '#10b981' : '#ef4444' }} />
          {text}
        </span>
      ),
    },

    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      filteredValue: null,
      render: (_, record) => {
        const items = [
          {
            key: 'view',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>View</span>,
            onClick: ({ domEvent }) => { domEvent.stopPropagation(); openDrawer(record); setOpenDropdownId(null); }
          },
          {
            key: 'edit',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Edit</span>,
            onClick: ({ domEvent }) => { domEvent.stopPropagation(); setEditCandidate(record); setIsAddModalOpen(true); setOpenDropdownId(null); }
          },
          {
            key: 'product-creation',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>{record.productCreation === 'Enabled' ? 'Pause' : 'Enable'}</span>,
            onClick: ({ domEvent }) => { domEvent.stopPropagation(); toggleProductCreation(record.id, domEvent); setOpenDropdownId(null); }
          },
          {
            key: 'status',
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>{record.status === 'Active' ? 'Deactivate' : 'Activate'}</span>,
            onClick: ({ domEvent }) => { domEvent.stopPropagation(); toggleStatus(record.id, domEvent); setOpenDropdownId(null); }
          },
          {
            key: 'delete',
            danger: true,
            label: <span style={{ fontSize: '13px', fontWeight: '500', padding: '4px 8px', display: 'block' }}>Delete</span>,
            onClick: ({ domEvent }) => { domEvent.stopPropagation(); handleDeleteClick(record, domEvent); setOpenDropdownId(null); }
          }
        ];

        return (
          <div onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
            <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
              <div
                style={{ width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}
              >
                <MoreVertical size={16} color="#6b7280" />
              </div>
            </Dropdown>
          </div>
        );
      },
    },
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
            <Copy size={22} color="#d97706" />
          </div>
          <div style={{ width: '3px', height: '20px', background: '#d97706', borderRadius: '4px' }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#1f2937', letterSpacing: '-0.3px' }}>Category Management</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(217, 119, 6, 0.2)' }} onClick={() => { setEditCandidate(null); setIsAddModalOpen(true); }}>
            <Plus size={15} /> Add Category
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card dark" onClick={() => clearFilters()} style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }}><Grid size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Total Categories</span>
              <h2 className="stat-value gold-text">{totalCat}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="glowDarkCat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkCat)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light" onClick={() => { clearFilters(); setStatusFilter('Active'); }} style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#4caf50', background: '#e8f5e9', border: 'none' }}><ShieldCheck size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Active Categories</span>
              <h2 className="stat-value">{activeCat}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData2}>
                <defs>
                  <linearGradient id="glowLightCat1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightCat1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light" onClick={() => { clearFilters(); setStatusFilter('Inactive'); }} style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#f44336', background: '#ffebee', border: 'none' }}><MinusCircle size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Inactive Categories</span>
              <h2 className="stat-value">{inactiveCat}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="glowLightCat2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightCat2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#2196f3', background: '#e3f2fd', border: 'none' }}><Package size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Total Products</span>
              <h2 className="stat-value">{totalProducts}</h2>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData2}>
                <defs>
                  <linearGradient id="glowLightCat3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightCat3)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="premium-glass-card" style={{ padding: '0px', borderRadius: '16px', background: '#fff', border: '1px solid #f3f4f6', boxShadow: '0 10px 30px rgba(0,0,0,0.04), 0 2px 4px rgba(0,0,0,0.02)', overflow: 'hidden', height: 'auto', flex: 'none' }}>
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
          `}
        </style>


        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', marginBottom: '0', background: '#fdfbf7', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>Category</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              type="text"
              onClick={clearFilters}
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

        {/* Ant Design Table */}
        <Table
          className="premium-table"
          dataSource={filteredCategories}
          columns={columns}
          rowKey="id"
          rowSelection={rowSelection}
          onChange={(pagination, filters, sorter) => {
            if (filters.name) setCategorySearchFilter(filters.name[0]);
            else setCategorySearchFilter(null);

            if (filters.productCreation) setProductCreationFilter(filters.productCreation[0] || 'All');
            else setProductCreationFilter('All');

            if (filters.status) setStatusFilter(filters.status[0] || 'All Status');
            else setStatusFilter('All Status');
          }}
          pagination={false}
          onRow={(record) => ({
            onClick: () => openDrawer(record),
            style: { cursor: 'pointer' }
          })}
          scroll={{ x: 1000 }}
        />

      </div>

      {/* Bulk Selection Toolbar */}
      {selectedItems.length > 0 && (
        <div style={{
          position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
          background: '#1a1a1a', color: '#fff', padding: '12px 24px', borderRadius: '12px',
          display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', zIndex: 100
        }}>
          <div style={{ fontSize: '13px', fontWeight: '500' }}>{selectedItems.length} categories selected</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => handleBulkAction('activate')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Activate</button>
            <button onClick={() => handleBulkAction('deactivate')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Deactivate</button>
            <button onClick={() => handleBulkAction('delete')} style={{ background: 'rgba(244, 67, 54, 0.2)', color: '#ffcdd2', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
      )}

      {/* Right Drawer (Category Details) */}
      {isDrawerOpen && activeCategory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end'
        }} onClick={() => setIsDrawerOpen(false)}>
          <div style={{
            width: '450px', background: '#fff', height: '100%',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '18px', color: '#222', fontWeight: '600' }}>Category Details</h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} onClick={() => setIsDrawerOpen(false)}><X size={20} /></button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {/* Banner */}
              <div style={{ height: '180px', width: '100%', position: 'relative' }}>
                <img src={activeCategory.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Category Banner" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', padding: '24px' }}>
                  <h2 style={{ color: '#fff', margin: 0, fontSize: '24px', fontWeight: '600' }}>{activeCategory.name}</h2>
                  <div style={{ color: activeCategory.status === 'Active' ? '#4ade80' : '#f87171', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activeCategory.status === 'Active' ? '#4ade80' : '#f87171' }} />
                    {activeCategory.status}
                  </div>
                </div>
              </div>

              {/* Details List */}
              <div style={{ padding: '24px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Description</div>
                  <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.5' }}>{activeCategory.desc}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Slug</div>
                    <div style={{ fontSize: '14px', color: '#222', fontWeight: '500' }}>{activeCategory.slug}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Products</div>
                    <div style={{ fontSize: '14px', color: '#222', fontWeight: '500' }}>{activeCategory.products}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Product Creation</div>
                    <div style={{ fontSize: '14px', color: activeCategory.productCreation === 'Enabled' ? '#10b981' : '#f59e0b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeCategory.productCreation === 'Enabled' ? '#10b981' : '#f59e0b' }} />
                      {activeCategory.productCreation}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Sort Order</div>
                    <div style={{ fontSize: '14px', color: '#222', fontWeight: '500' }}>{activeCategory.order}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Created</div>
                    <div style={{ fontSize: '14px', color: '#222', fontWeight: '500' }}>{activeCategory.created}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Last Updated</div>
                    <div style={{ fontSize: '14px', color: '#222', fontWeight: '500' }}>{activeCategory.updated}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '24px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '12px' }}>
              <button style={{ flex: 1, background: '#fff', color: '#222', border: '1px solid #e0e0e0', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }} onClick={() => { setEditCandidate(activeCategory); setIsAddModalOpen(true); }}>
                Edit Category
              </button>
              <button style={{ flex: 1, background: 'linear-gradient(90deg, #c9a05b 0%, #b08a4c 100%)', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }} onClick={() => { setIsDrawerOpen(false); navigate(`/dashboard?category=${activeCategory.slug}`); }}>
                View Products
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div style={{ background: '#fff', width: '400px', borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
            <div style={{ background: '#ffebee', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f44336', margin: '0 auto 20px auto' }}>
              <Trash2 size={32} />
            </div>
            <h2 style={{ fontSize: '20px', margin: '0 0 12px 0', color: '#222' }}>Delete "{deleteCandidate.name}"?</h2>

            <div style={{ background: '#fffbf0', border: '1px solid #fef08a', padding: '16px', borderRadius: '8px', textAlign: 'left', marginBottom: '32px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#854d0e', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span>⚠️</span>
                <span>This category contains <strong>{deleteCandidate.products} products</strong>. Deleting it may affect product organization.</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ flex: 1, background: '#f5f5f5', color: '#333', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }} onClick={() => setDeleteCandidate(null)}>Cancel</button>
              <button style={{ flex: 1, background: '#f44336', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }} onClick={confirmDelete}>Delete Category</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddCategoryModal 
        isOpen={isAddModalOpen} 
        onClose={() => { setIsAddModalOpen(false); setEditCandidate(null); }} 
        editData={editCandidate}
        onSuccess={fetchCategories}
      />

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default CategoryManagement;
