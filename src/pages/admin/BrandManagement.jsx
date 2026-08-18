import React, { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, ChevronDown, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Tag, Package, Eye, Edit, PauseCircle, Trash2, MinusCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import './BrandManagement.css';
import './Dashboard.css';
import AddNewBrand from './AddNewBrand';

const sparklineTotalBrands = [{ v: 20 }, { v: 22 }, { v: 25 }, { v: 24 }, { v: 26 }, { v: 27 }, { v: 28 }];
const sparklineActiveBrands = [{ v: 15 }, { v: 18 }, { v: 20 }, { v: 22 }, { v: 23 }, { v: 23 }, { v: 24 }];
const sparklineInactiveBrands = [{ v: 5 }, { v: 4 }, { v: 5 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 4 }];
const sparklineTotalProducts = [{ v: 300 }, { v: 310 }, { v: 330 }, { v: 340 }, { v: 345 }, { v: 350 }, { v: 356 }];

const renderCustomDot = (props) => {
  const { cx, cy, index } = props;
  if (index === 5) {
    return <circle cx={cx} cy={cy} r={4} stroke="#c9a05b" strokeWidth={2} fill="#fff" key={`dot-${index}`} />;
  }
  return null;
};

const initialBrands = [
  { id: 1, name: 'Nike', category: 'Sports Wear', products: 45, discount: '10%', status: 'Active', createdAt: '12 May 2024', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { id: 2, name: 'Adidas', category: 'Sports Wear', products: 38, discount: '15%', status: 'Active', createdAt: '10 May 2024', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { id: 3, name: 'Puma', category: 'Footwear', products: 32, discount: '12%', status: 'Inactive', createdAt: '08 May 2024', logo: 'https://upload.wikimedia.org/wikipedia/en/4/45/Puma_Logo.svg' },
  { id: 4, name: 'Levi\'s', category: 'Denim', products: 28, discount: '8%', status: 'Active', createdAt: '05 May 2024', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Levi%27s_logo.svg' },
  { id: 5, name: 'Raymond', category: 'Fashion', products: 22, discount: '10%', status: 'Active', createdAt: '02 May 2024', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Raymond_logo.svg' },
];

const BrandManagement = ({ setActiveTab }) => {
  const [brands, setBrands] = useState(initialBrands);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [isAdding, setIsAdding] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);
  const [viewingBrand, setViewingBrand] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.bm-dropdown-menu') && !event.target.closest('.bm-action-btn')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  if (isAdding || editingBrand || viewingBrand) {
    return (
      <AddNewBrand 
        initialData={editingBrand || viewingBrand}
        readOnly={!!viewingBrand}
        onCancel={() => { setIsAdding(false); setEditingBrand(null); setViewingBrand(null); }} 
        onSave={(savedBrand) => {
          if (editingBrand) {
            setBrands(brands.map(b => b.id === savedBrand.id ? savedBrand : b));
          } else if (isAdding) {
            setBrands([savedBrand, ...brands]);
          }
          setIsAdding(false);
          setEditingBrand(null);
          setViewingBrand(null);
        }} 
      />
    );
  }

  return (
    <div className="brand-management-page">
      {/* Header Section */}
      <div className="bm-header-section">
        <div className="bm-breadcrumbs">
          <span className="bm-breadcrumb-item">Dashboard</span>
          <span className="bm-breadcrumb-separator">&gt;</span>
          <span className="bm-breadcrumb-item active">Brands</span>
        </div>
        
        <div className="bm-header-title-row">
          <div>
            <h1 className="bm-page-title">Brand Management</h1>
            <div className="bm-ornate-divider">
               <span className="bm-divider-line"></span>
               <span className="bm-divider-icon">⚜</span>
               <span className="bm-divider-line"></span>
            </div>
            <p className="bm-page-subtitle">Manage and organize your product brands.</p>
          </div>
          <button className="bm-btn-add" onClick={() => setIsAdding(true)}>
            <Plus size={16} /> Add Brand
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><Tag size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">Total Brands</span>
              <h2 className="stat-value gold-text">28</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 2</span> <span className="stat-change-text">new today</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineTotalBrands}>
                <defs>
                  <linearGradient id="glowDarkBr1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkBr1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold"><CheckCircle2 size={18} color="#554422" /></div>
            <div className="stat-info">
              <span className="stat-title">Active Brands</span>
              <h2 className="stat-value">24</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 1</span> <span className="stat-change-text">new today</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineActiveBrands}>
                <defs>
                  <linearGradient id="glowLightBr1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightBr1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold"><XCircle size={18} color="#554422" /></div>
            <div className="stat-info">
              <span className="stat-title">Inactive Brands</span>
              <h2 className="stat-value">4</h2>
              <div className="stat-bottom">
                <span className="stat-change negative">1</span> <span className="stat-change-text">require attention</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineInactiveBrands}>
                <defs>
                  <linearGradient id="glowLightBr2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightBr2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><Package size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">Total Products</span>
              <h2 className="stat-value gold-text">356</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 12</span> <span className="stat-change-text">across all brands</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineTotalProducts}>
                <defs>
                  <linearGradient id="glowDarkBr2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkBr2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Brand List Table Card */}
      <div className="bm-list-card">
        <div className="bm-card-header">
          <div className="bm-card-title">
            <div className="bm-card-icon">
              <Tag size={16} />
            </div>
            <h2>Brand List</h2>
          </div>
          <div className="bm-card-actions">
            <div className="bm-filter-dropdown">
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All Categories">All Categories</option>
                <option value="Sports Wear">Sports Wear</option>
                <option value="Footwear">Footwear</option>
                <option value="Denim">Denim</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
            <div className="bm-search-bar">
              <Search size={16} className="bm-search-icon" />
              <input 
                type="text" 
                placeholder="Search brands..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bm-table-container">
          <table className="bm-table">
            <thead>
              <tr>
                <th style={{ width: '5%' }}>#</th>
                <th style={{ width: '25%' }}>Brand</th>
                <th style={{ width: '15%' }}>Category</th>
                <th style={{ width: '10%' }}>Products</th>
                <th style={{ width: '10%' }}>Discount</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '15%' }}>Created At</th>
                <th style={{ width: '5%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, index) => (
                <tr key={brand.id}>
                  <td className="bm-text-muted">{index + 1}</td>
                  <td>
                    <div className="bm-brand-cell">
                      <div className="bm-brand-logo">
                        <img src={brand.logo} alt={brand.name} />
                      </div>
                      <span className="bm-brand-name">{brand.name}</span>
                    </div>
                  </td>
                  <td className="bm-text-muted">{brand.category}</td>
                  <td className="bm-text-muted">{brand.products}</td>
                  <td className="bm-text-muted">{brand.discount}</td>
                  <td>
                    <span className={`bm-status-pill ${brand.status.toLowerCase()}`}>
                      <span className="bm-status-dot"></span> {brand.status}
                    </span>
                  </td>
                  <td className="bm-text-muted">{brand.createdAt}</td>
                  <td style={{ textAlign: 'center', position: 'relative', zIndex: activeDropdown === brand.id ? 99 : 1 }}>
                    <button 
                      className="bm-action-btn"
                      onClick={() => setActiveDropdown(activeDropdown === brand.id ? null : brand.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === brand.id && (
                      <div className="bm-dropdown-menu">
                        <button className="bm-dropdown-item" onClick={() => { alert('No Brand selected'); setActiveDropdown(null); }}><MinusCircle size={14} /> No Brand</button>
                        <button className="bm-dropdown-item" onClick={() => { setEditingBrand(brand); setActiveDropdown(null); }}><Edit size={14} /> Edit Brand</button>
                        <button className="bm-dropdown-item" onClick={() => {
                          setBrands(brands.map(b => b.id === brand.id ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' } : b));
                          setActiveDropdown(null);
                        }}>
                          <PauseCircle size={14} /> {brand.status === 'Active' ? 'Deactivate Brand' : 'Activate Brand'}
                        </button>
                        <button className="bm-dropdown-item text-danger" onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${brand.name}?`)) {
                            setBrands(brands.filter(b => b.id !== brand.id));
                          }
                          setActiveDropdown(null);
                        }}>
                          <Trash2 size={14} /> Delete Brand
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bm-pagination-container">
          <span className="bm-pagination-info">Showing 1 to 5 of 28 results</span>
          <div className="bm-pagination-controls">
            <button className="bm-page-btn"><ChevronLeft size={16} /></button>
            <button className="bm-page-btn active">1</button>
            <button className="bm-page-btn">2</button>
            <button className="bm-page-btn">3</button>
            <span className="bm-page-ellipsis">...</span>
            <button className="bm-page-btn">6</button>
            <button className="bm-page-btn"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandManagement;
