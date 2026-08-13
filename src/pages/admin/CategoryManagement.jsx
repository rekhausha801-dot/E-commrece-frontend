import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Plus, Grid, ShieldCheck, MinusCircle, Tags, 
  MoreVertical, Copy, GripVertical, Download, Settings2, 
  RotateCcw, X, Edit2, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import AddCategoryModal from './AddCategoryModal';

const sparklineData = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineData2 = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];


const initialData = [
  { 
    id: 1, name: 'Kurtis', desc: 'Elegant & stylish kurtis collection', parent: 'Women', 
    slug: '/kurtis', products: 48, subcategories: 8, status: 'Active', 
    order: '01', visibility: 'Visible', created: '12 Aug 2026', updated: '12 Aug 2026',
    img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100' 
  },
  { 
    id: 2, name: 'Sarees', desc: 'Traditional and designer sarees', parent: 'Women', 
    slug: '/sarees', products: 72, subcategories: 12, status: 'Active', 
    order: '02', visibility: 'Visible', created: '10 Aug 2026', updated: '12 Aug 2026',
    img: 'https://images.unsplash.com/photo-1583391733959-f1830687f8aa?w=100' 
  },
  { 
    id: 3, name: 'Shirts', desc: 'Formal and casual shirts for men', parent: 'Men', 
    slug: '/shirts', products: 120, subcategories: 5, status: 'Active', 
    order: '03', visibility: 'Visible', created: '08 Aug 2026', updated: '11 Aug 2026',
    img: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=100' 
  },
  { 
    id: 4, name: 'Winter Wear', desc: 'Seasonal winter collection', parent: 'Kids', 
    slug: '/winter-wear', products: 15, subcategories: 2, status: 'Inactive', 
    order: '04', visibility: 'Hidden', created: '01 Aug 2026', updated: '10 Aug 2026',
    img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=100' 
  },
  { 
    id: 5, name: 'Footwear', desc: 'Casual and sports shoes', parent: 'Men', 
    slug: '/footwear', products: 85, subcategories: 4, status: 'Active', 
    order: '05', visibility: 'Visible', created: '25 Jul 2026', updated: '05 Aug 2026',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100' 
  }
];

const CategoryManagement = () => {
  const [categories, setCategories] = useState(initialData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [parentFilter, setParentFilter] = useState('All Categories');

  const totalCat = categories.length;
  const activeCat = categories.filter(c => c.status === 'Active').length;
  const inactiveCat = categories.filter(c => c.status === 'Inactive').length;
  const totalSub = categories.reduce((acc, curr) => acc + curr.subcategories, 0);

  const filteredCategories = useMemo(() => {
    return categories.filter(cat => {
      const matchSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          cat.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All Status' || cat.status === statusFilter;
      const matchParent = parentFilter === 'All Categories' || cat.parent === parentFilter;
      return matchSearch && matchStatus && matchParent;
    });
  }, [categories, searchQuery, statusFilter, parentFilter]);

  const handleSelectAll = (e) => {
    if(e.target.checked) setSelectedItems(filteredCategories.map(c => c.id));
    else setSelectedItems([]);
  };

  const handleSelectItem = (id) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const openDrawer = (cat) => {
    setActiveCategory(cat);
    setIsDrawerOpen(true);
  };

  const handleDeleteClick = (cat, e) => {
    e.stopPropagation();
    setDeleteCandidate(cat);
  };

  const confirmDelete = () => {
    setCategories(prev => prev.filter(c => c.id !== deleteCandidate.id));
    setDeleteCandidate(null);
    if(activeCategory?.id === deleteCandidate.id) setIsDrawerOpen(false);
  };

  const clearFilters = () => {
    setStatusFilter('All Status');
    setParentFilter('All Categories');
    setSearchQuery('');
  };

  return (
    <div style={{ padding: '0 8px 32px 8px' }}>
      
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '500', color: '#222' }}>Categories</h1>
          {/* <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#666' }}>Manage, organize and optimize your product categories</p> */}
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* <button style={{ background: '#fff', border: '1px solid #e0e0e0', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Download size={14} /> Export
          </button> */}
          <button style={{ background: 'linear-gradient(90deg, #c9a05b 0%, #b08a4c 100%)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setIsAddModalOpen(true)}>
            <Plus size={14} /> Add Category
          </button>
        </div>
      </div>

      {/* KPI Cards using Dashboard CSS */}
      <div className="stats-grid" style={{ marginBottom: '32px' }}>
        <div className="stat-card dark" onClick={() => clearFilters()} style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none' }}><Grid size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Total Categories</span>
              <h2 className="stat-value gold-text">{totalCat}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 3</span> <span className="stat-change-text">this month</span>
              </div>
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

        <div className="stat-card light" onClick={() => {clearFilters(); setStatusFilter('Active');}} style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#4caf50', background: '#e8f5e9', border: 'none' }}><ShieldCheck size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Active Categories</span>
              <h2 className="stat-value">{activeCat}</h2>
              <div className="stat-bottom">
                <span className="stat-change-text">{Math.round((activeCat/totalCat)*100 || 0)}% of total</span>
              </div>
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

        <div className="stat-card light" onClick={() => {clearFilters(); setStatusFilter('Inactive');}} style={{ cursor: 'pointer' }}>
          <div className="stat-top">
            <div className="stat-icon gold" style={{ color: '#f44336', background: '#ffebee', border: 'none' }}><MinusCircle size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Inactive Categories</span>
              <h2 className="stat-value">{inactiveCat}</h2>
              <div className="stat-bottom">
                <span className="stat-change negative">Needs attention</span>
              </div>
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
            <div className="stat-icon gold" style={{ color: '#2196f3', background: '#e3f2fd', border: 'none' }}><Tags size={18} /></div>
            <div className="stat-info">
              <span className="stat-title">Total Subcategories</span>
              <h2 className="stat-value">{totalSub}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 5</span> <span className="stat-change-text">new this month</span>
              </div>
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

      {/* Main Table Area */}
      <div className="premium-glass-card" style={{ padding: '24px', borderRadius: '16px', background: '#fff', border: '1px solid #f0f0f0' }}>
        
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: '600', color: '#222' }}>Category Management</h3>
            {/* <span style={{ fontSize: '12px', color: '#888' }}>{filteredCategories.length} categories found</span> */}
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div className="search-bar" style={{ width: '240px', background: '#fcfaf5', border: '1px solid #eadecb' }}>
              <Search size={14} color="#c9a05b" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ fontSize: '12px' }}
              />
            </div>
            
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #eadecb', background: '#fff', fontSize: '12px', color: '#333', outline: 'none' }}>
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            
            <select value={parentFilter} onChange={e => setParentFilter(e.target.value)} style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #eadecb', background: '#fff', fontSize: '12px', color: '#333', outline: 'none' }}>
              <option value="All Categories">All Parents</option>
              <option value="Women">Women</option>
              <option value="Men">Men</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(statusFilter !== 'All Status' || parentFilter !== 'All Categories') && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
            {statusFilter !== 'All Status' && (
              <span style={{ background: '#fdf7ee', border: '1px solid #f2e3c6', color: '#b08a4c', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Status: {statusFilter} <X size={10} style={{ cursor: 'pointer' }} onClick={() => setStatusFilter('All Status')} />
              </span>
            )}
            {parentFilter !== 'All Categories' && (
              <span style={{ background: '#fdf7ee', border: '1px solid #f2e3c6', color: '#b08a4c', padding: '4px 10px', borderRadius: '16px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Parent: {parentFilter} <X size={10} style={{ cursor: 'pointer' }} onClick={() => setParentFilter('All Categories')} />
              </span>
            )}
            <span onClick={clearFilters} style={{ fontSize: '11px', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>Clear all</span>
          </div>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}><input type="checkbox" onChange={handleSelectAll} checked={selectedItems.length === filteredCategories.length && filteredCategories.length > 0} /></th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '500' }}>CATEGORY</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '500' }}>SLUG</th>
                <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', color: '#888', fontWeight: '500' }}>PRODUCTS</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '500' }}>STATUS</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', color: '#888', fontWeight: '500' }}>ORDER</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', color: '#888', fontWeight: '500' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? filteredCategories.map(cat => (
                <tr key={cat.id} style={{ borderBottom: '1px solid #f9f9f9', cursor: 'pointer', background: selectedItems.includes(cat.id) ? '#fffbf5' : 'transparent' }} onClick={() => openDrawer(cat)}>
                  <td style={{ padding: '16px' }} onClick={e => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedItems.includes(cat.id)} onChange={() => handleSelectItem(cat.id)} />
                  </td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={cat.img} alt={cat.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#222' }}>{cat.name}</div>
                        <div style={{ fontSize: '11px', color: '#888' }}>{cat.parent}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '12px', color: '#555' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {cat.slug}
                      <Copy size={12} color="#c9a05b" style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(cat.slug); }} />
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#222', textAlign: 'center' }}>
                    {cat.products}
                  </td>
                  <td style={{ padding: '16px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '500',
                      background: cat.status === 'Active' ? '#e8f5e9' : '#ffebee',
                      color: cat.status === 'Active' ? '#4caf50' : '#f44336'
                    }}>
                      {cat.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px', color: '#555' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cat.order} <GripVertical size={14} color="#ccc" />
                    </div>
                  </td>
                  <td style={{ padding: '16px', textAlign: 'right' }} onClick={e => e.stopPropagation()}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div 
                        style={{ padding: '4px', cursor: 'pointer', borderRadius: '4px' }}
                        onClick={(e) => { e.stopPropagation(); setOpenDropdownId(openDropdownId === cat.id ? null : cat.id); }}
                      >
                        <MoreVertical size={16} color="#888" />
                      </div>
                      {openDropdownId === cat.id && (
                        <div style={{ 
                          position: 'absolute', right: 0, top: '28px', background: '#fff', 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', padding: '4px',
                          zIndex: 10, minWidth: '120px', border: '1px solid #eee', textAlign: 'left'
                        }}>
                          <div 
                            style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#333' }}
                            onClick={(e) => { e.stopPropagation(); setIsAddModalOpen(true); setOpenDropdownId(null); }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Edit2 size={14} /> Edit
                          </div>
                          <div 
                            style={{ padding: '8px 12px', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: '#f44336' }}
                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(cat, e); setOpenDropdownId(null); }}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#fce8e6'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Trash2 size={14} /> Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{ color: '#888', fontSize: '14px' }}>No categories found matching your criteria.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f0', fontSize: '12px', color: '#666' }}>
          <div>Showing 1–{filteredCategories.length} of {categories.length} categories</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button style={{ background: '#fff', border: '1px solid #eee', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}><ChevronLeft size={14} /></button>
            <span style={{ background: '#c9a05b', color: '#fff', padding: '4px 12px', borderRadius: '4px', fontWeight: '500' }}>1</span>
            <button style={{ background: '#fff', border: '1px solid #eee', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}><ChevronRight size={14} /></button>
          </div>
        </div>

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
            <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Activate</button>
            <button style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Deactivate</button>
            <button style={{ background: 'rgba(244, 67, 54, 0.2)', color: '#ffcdd2', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Delete All</button>
          </div>
        </div>
      )}

      {/* Right Drawer */}
      {isDrawerOpen && activeCategory && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end'
        }} onClick={() => setIsDrawerOpen(false)}>
          <div style={{
            width: '400px', background: '#fff', height: '100%',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#222', fontWeight: '600' }}>{activeCategory.name}</h2>
                <div style={{ fontSize: '12px', color: activeCategory.status === 'Active' ? '#4caf50' : '#f44336', marginTop: '4px' }}>{activeCategory.status}</div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }} onClick={() => setIsDrawerOpen(false)}><X size={20}/></button>
            </div>
            
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#888', marginBottom: '12px', textTransform: 'uppercase' }}>Overview</h3>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <img src={activeCategory.img} style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} alt="cat"/>
                  <div style={{ fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                    <p style={{ margin: '0 0 4px 0', color: '#222' }}>{activeCategory.desc}</p>
                    <p style={{ margin: 0 }}><strong>Slug:</strong> {activeCategory.slug}</p>
                    <p style={{ margin: 0 }}><strong>Parent:</strong> {activeCategory.parent}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#888', marginBottom: '12px', textTransform: 'uppercase' }}>Performance</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#222' }}>{activeCategory.products}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Products</div>
                  </div>
                  <div style={{ background: '#f9f9f9', padding: '16px', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                    <div style={{ fontSize: '20px', fontWeight: '600', color: '#222' }}>{activeCategory.subcategories}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Subcategories</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#888', marginBottom: '12px', textTransform: 'uppercase' }}>SEO Preview</h3>
                <div style={{ border: '1px solid #e0e0e0', padding: '16px', borderRadius: '8px', fontFamily: 'Arial, sans-serif' }}>
                  <div style={{ color: '#006621', fontSize: '12px', marginBottom: '4px' }}>https://relietech.com{activeCategory.slug}</div>
                  <div style={{ color: '#1a0dab', fontSize: '16px', marginBottom: '4px' }}>Buy {activeCategory.name} Online | RELIETECH</div>
                  <div style={{ color: '#545454', fontSize: '12px', lineHeight: '1.4' }}>Shop our premium collection of {activeCategory.name.toLowerCase()}. Find the latest trends in {activeCategory.parent.toLowerCase()} fashion.</div>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '24px', borderTop: '1px solid #f0f0f0' }}>
              <button style={{ width: '100%', background: 'linear-gradient(90deg, #c9a05b 0%, #b08a4c 100%)', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }} onClick={() => setIsAddModalOpen(true)}>
                Edit Category
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
              <Trash2 size={32}/>
            </div>
            <h2 style={{ fontSize: '20px', margin: '0 0 12px 0', color: '#222' }}>Delete Category?</h2>
            <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px' }}>Are you sure you want to delete <strong>{deleteCandidate.name}</strong>?</p>
            
            <div style={{ background: '#fffbf0', border: '1px solid #fef08a', padding: '16px', borderRadius: '8px', textAlign: 'left', marginBottom: '32px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#854d0e', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span>⚠️</span> 
                <span>This category contains <strong>{deleteCandidate.products} products</strong>. Deleting it may affect product organization.</span>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button style={{ flex: 1, background: '#f5f5f5', color: '#333', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }} onClick={() => setDeleteCandidate(null)}>Cancel</button>
              <button style={{ flex: 1, background: '#f44336', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
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
