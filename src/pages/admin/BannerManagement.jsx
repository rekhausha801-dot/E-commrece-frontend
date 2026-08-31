import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Filter, Plus, MoreVertical, LayoutTemplate, CheckCircle2, Calendar, UserX, ChevronLeft, ChevronRight, Image as ImageIcon, X, Type, Image as ImageOnlyIcon, UploadCloud, Link as LinkIcon, Calendar as CalendarIcon, CalendarDays, CalendarClock, Eye, Edit2, Copy, RefreshCw, ArrowUpDown, Trash2, ShoppingBag, Users, Package, Video } from 'lucide-react';
import fashionnImg from '../../assets/banners/fashionn.png';
import newArrivalsImg from '../../assets/banners/new_arrivals_bg.png';
import couponImg from '../../assets/banners/coupon.png';
import modelImg from '../../assets/banners/model.png';
import gloImg from '../../assets/banners/glo.png';
import wearImg from '../../assets/banners/wear.png';
import './BannerManagement.css';
import './Dashboard.css';
import { getBanners, createBanner, updateBanner, deleteBanner, toggleBannerStatus } from '../../services/api';
import Swal from 'sweetalert2';
const API_BASE_URL = 'http://localhost:5000';

const sparklineTotalBanners = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 24 }];
const sparklineActiveBanners = [{ v: 5 }, { v: 8 }, { v: 10 }, { v: 12 }, { v: 15 }, { v: 16 }, { v: 18 }];
const sparklineScheduledBanners = [{ v: 1 }, { v: 2 }, { v: 2 }, { v: 3 }, { v: 4 }, { v: 4 }, { v: 4 }];
const sparklineInactiveBanners = [{ v: 4 }, { v: 3 }, { v: 2 }, { v: 2 }, { v: 3 }, { v: 2 }, { v: 2 }];

const renderCustomDot = (props) => {
  const { cx, cy, index } = props;
  if (index === 5) {
    return <circle cx={cx} cy={cy} r={4} stroke="#c9a05b" strokeWidth={2} fill="#fff" key={`dot-${index}`} />;
  }
  return null;
};

const mockBanners = [
  {
    id: 1,
    name: 'Summer Collection Banner',
    type: 'Image + Text',
    placement: 'Home - Hero',
    schedule: '10 Aug 2026\nto 20 Aug 2026',
    status: 'Active',
    order: 1,
    image: fashionnImg
  },
  {
    id: 2,
    name: 'New Arrivals Banner',
    type: 'Image + Text',
    placement: 'Home - Section',
    schedule: '15 Aug 2026\nto 30 Aug 2026',
    status: 'Scheduled',
    order: 2,
    image: newArrivalsImg
  },
  {
    id: 3,
    name: 'Free Shipping Banner',
    type: 'Image Only',
    placement: 'Top Strip',
    schedule: '05 Aug 2026\nto 31 Aug 2026',
    status: 'Active',
    order: 3,
    image: couponImg
  },
  {
    id: 4,
    name: 'Flash Sale Banner',
    type: 'Image Only',
    placement: 'Home - Bottom',
    schedule: '01 Aug 2026\nto 10 Aug 2026',
    status: 'Inactive',
    order: 4,
    image: modelImg
  },
  {
    id: 5,
    name: 'Monsoon Offer Banner',
    type: 'Image + Text',
    placement: 'Category Page',
    schedule: '12 Aug 2026\nto 22 Aug 2026',
    status: 'Scheduled',
    order: 5,
    image: gloImg
  },
  {
    id: 6,
    name: 'Prepaid Offer Banner',
    type: 'Image Only',
    placement: 'Checkout Page',
    schedule: '01 Aug 2026\nto 31 Aug 2026',
    status: 'Active',
    order: 6,
    image: wearImg
  }
];

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('add');
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [bannerType, setBannerType] = useState('image-text');
  const [mediaPreview, setMediaPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    startDate: '',
    endDate: '',
    status: true,
    textPosition: 'Center',
    placement: 'Home - Hero',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const { data } = await getBanners();
      setBanners(data.data || []);
    } catch (error) {
      Swal.fire('Error', 'Failed to load banners', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getBannerStatus = (banner) => {
    if (!banner.status) return 'Inactive';
    const now = new Date();
    if (banner.startDate && new Date(banner.startDate) > now) return 'Scheduled';
    if (banner.endDate && new Date(banner.endDate) < now) return 'Inactive';
    return 'Active';
  };

  const getBannerTypeDisplay = (type) => {
    if (type === 'with_text') return 'Image + Text';
    if (type === 'without_text') return 'Image Only';
    if (type === 'video') return 'Video';
    if (type === 'text') return 'Text Only';
    return 'Unknown';
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    return path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const [activeTab, setActiveTab] = useState('All Banners');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredBanners = banners.filter(banner => {
    const typeDisplay = getBannerTypeDisplay(banner.type);
    const currentStatus = getBannerStatus(banner);

    if (activeTab === 'Image + Text Banners' && typeDisplay !== 'Image + Text') return false;
    if (activeTab === 'Image Only Banners' && typeDisplay !== 'Image Only') return false;
    if (statusFilter !== 'All Status' && currentStatus !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!banner.title.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  const totalCount = banners.length;
  const activeCount = banners.filter(b => getBannerStatus(b) === 'Active').length;
  const scheduledCount = banners.filter(b => getBannerStatus(b) === 'Scheduled').length;
  const inactiveCount = banners.filter(b => getBannerStatus(b) === 'Inactive').length;

  const handleSaveBanner = async () => {
    try {
      if (!formData.title) return Swal.fire('Error', 'Title is required', 'error');
      
      const form = new FormData();
      form.append("title", formData.title);
      if (formData.description) form.append("description", formData.description);
      const submitType = bannerType === 'image-text' ? 'with_text' : bannerType === 'image-only' ? 'without_text' : bannerType;
      form.append("type", submitType);
      if (bannerType === 'image-text' || bannerType === 'text') form.append("textPosition", formData.textPosition);
      form.append("placement", formData.placement);
      if (formData.link) form.append("link", formData.link);
      if (formData.startDate) form.append("startDate", formData.startDate);
      if (formData.endDate) form.append("endDate", formData.endDate);
      form.append("status", formData.status);
      
      if (selectedFile) {
        form.append("image", selectedFile);
      } else if (drawerMode === 'add' && bannerType !== 'text') {
        return Swal.fire('Error', 'Media file is required', 'error');
      }

      setLoading(true);
      if (drawerMode === 'edit') {
        await updateBanner(selectedBanner._id, form);
        Swal.fire('Success', 'Banner updated successfully', 'success');
      } else {
        await createBanner(form);
        Swal.fire('Success', 'Banner created successfully', 'success');
      }
      setIsDrawerOpen(false);
      fetchBanners();
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || "Something went wrong", 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleBannerStatus(id);
      Swal.fire('Success', 'Banner status updated', 'success');
      fetchBanners();
    } catch (error) {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });
    if (!result.isConfirmed) return;

    try {
      await deleteBanner(id);
      Swal.fire('Deleted!', 'Banner has been deleted.', 'success');
      fetchBanners();
    } catch (error) {
      Swal.fire('Error', 'Failed to delete banner', 'error');
    }
  };

  const openDrawer = (mode, banner = null) => {
    setDrawerMode(mode);
    setSelectedBanner(banner);
    setIsDrawerOpen(true);
    setSelectedFile(null);
    if (banner && mode !== 'add') {
      let bType = banner.type;
      if (banner.type === 'with_text') bType = 'image-text';
      if (banner.type === 'without_text') bType = 'image-only';
      setBannerType(bType);
      
      setFormData({
        title: banner.title || '',
        description: banner.description || '',
        link: banner.link || '',
        startDate: banner.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : '',
        endDate: banner.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : '',
        status: banner.status !== false,
        textPosition: banner.textPosition || 'Center',
        placement: banner.placement || 'Home - Hero',
      });
      setMediaPreview(banner.type !== 'text' ? getImageUrl(banner.image) : null);
    } else {
      setBannerType('image-text');
      setFormData({ title: '', description: '', link: '', startDate: '', endDate: '', status: true, textPosition: 'Center', placement: 'Home - Hero' });
      setMediaPreview(null);
    }
  };

  return (
    <div className="banner-management-page">
      {/* Header */}
      <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', marginBottom: '24px', border: '1px solid #f9f9f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1.5px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Copy size={22} color="#d97706" />
          </div>
          <div style={{ width: '2.5px', height: '22px', background: '#d97706', borderRadius: '2px' }}></div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Banner Management</h1>
        </div>
        <button 
          onClick={() => openDrawer('add')}
          style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)' }}
        >
          <Plus size={16} strokeWidth={2.5} /> Add Banner
        </button>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><LayoutTemplate size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">Total Banners</span>
              <h2 className="stat-value gold-text">{totalCount}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">All Banners</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineTotalBanners}>
                <defs>
                  <linearGradient id="glowDarkBam1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkBam1)" dot={renderCustomDot} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold"><CheckCircle2 size={18} color="#554422" /></div>
            <div className="stat-info">
              <span className="stat-title">Active Banners</span>
              <h2 className="stat-value">{activeCount}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">Currently Active</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineActiveBanners}>
                <defs>
                  <linearGradient id="glowLightBam1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightBam1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold"><Calendar size={18} color="#554422" /></div>
            <div className="stat-info">
              <span className="stat-title">Scheduled Banners</span>
              <h2 className="stat-value">{scheduledCount}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">Upcoming</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineScheduledBanners}>
                <defs>
                  <linearGradient id="glowLightBam2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightBam2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><UserX size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">Inactive Banners</span>
              <h2 className="stat-value gold-text">{inactiveCount}</h2>
              <div className="stat-bottom">
                <span className="stat-change negative">Disabled</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineInactiveBanners}>
                <defs>
                  <linearGradient id="glowDarkBam2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkBam2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="bam-main-card">
        {/* Tabs */}
        <div className="bam-tabs">
          {['All Banners', 'Image + Text Banners', 'Image Only Banners'].map(tab => (
            <div 
              key={tab}
              className={`bam-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bam-filters">
          <div className="bam-search-wrapper">
            <Search size={16} className="bam-search-icon" />
            <input 
              type="text" 
              className="bam-search-input" 
              placeholder="Search banner by name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select className="bam-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All Status">All Status</option>
            <option value="Active">Active</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select className="bam-select" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
            <option value="All Banners">All Types</option>
            <option value="Image + Text Banners">Image + Text</option>
            <option value="Image Only Banners">Image Only</option>
          </select>
          <button className="bam-btn-outline" onClick={() => { setSearchQuery(''); setStatusFilter('All Status'); setActiveTab('All Banners'); }}>
            <Filter size={16} /> Reset Filters
          </button>
        </div>

        {/* Table */}
        <div className="bam-table-container">
          <table className="bam-table">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Name</th>
                <th>Type</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Loading banners...</td>
                </tr>
              ) : filteredBanners.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>No banners found.</td>
                </tr>
              ) : filteredBanners.map((banner, index) => (
                <tr key={banner._id}>
                  <td>
                    {banner.type === 'video' ? (
                      <video src={getImageUrl(banner.image)} className="bam-preview-img" style={{ objectFit: 'cover' }} muted />
                    ) : banner.type === 'text' ? (
                      <div className="bam-preview-img" style={{ background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Type size={16}/></div>
                    ) : (
                      <img src={getImageUrl(banner.image)} alt={banner.title} className="bam-preview-img" />
                    )}
                  </td>
                  <td style={{ fontWeight: 600 }}>{banner.title}</td>
                  <td>
                    <span className={`bam-pill ${banner.type === 'with_text' ? 'img-text' : 'img-only'}`}>
                      {getBannerTypeDisplay(banner.type)}
                    </span>
                  </td>
                  <td>
                    {banner.startDate ? new Date(banner.startDate).toLocaleDateString() : 'N/A'} - {banner.endDate ? new Date(banner.endDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td>
                    <span className={`bam-pill ${getBannerStatus(banner).toLowerCase()}`}>
                      {getBannerStatus(banner)}
                    </span>
                  </td>
                  <td style={{ position: 'relative' }}>
                    <button 
                      className="bam-action-btn" 
                      onClick={() => setActiveDropdown(activeDropdown === banner._id ? null : banner._id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {activeDropdown === banner._id && (
                      <>
                        <div 
                          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 90 }} 
                          onClick={() => setActiveDropdown(null)}
                        />
                        <div className="bam-dropdown-menu" style={{ zIndex: 100 }}>
                          <div className="bam-dropdown-item" onClick={() => { setActiveDropdown(null); openDrawer('view', banner); }}><Eye size={16} /> View Banner</div>
                          <div className="bam-dropdown-item" onClick={() => { setActiveDropdown(null); openDrawer('edit', banner); }}><Edit2 size={16} /> Edit Banner</div>
                          <div className="bam-dropdown-item text-red" onClick={() => { setActiveDropdown(null); handleDelete(banner._id); }}><Trash2 size={16} /> Delete Banner</div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bam-pagination">
          <div className="bam-page-info">Showing 1 to 6 of 24 banners</div>
          <div className="bam-page-controls">
            <button className="bam-page-btn"><ChevronLeft size={16} /></button>
            <button className="bam-page-btn active">1</button>
            <button className="bam-page-btn">2</button>
            <button className="bam-page-btn">3</button>
            <span className="bam-page-dots">...</span>
            <button className="bam-page-btn">4</button>
            <button className="bam-page-btn"><ChevronRight size={16} /></button>
          </div>
          <select className="bam-select" style={{ minWidth: '100px' }}>
            <option>10 / page</option>
          </select>
        </div>
      </div>

      {/* Add/Edit/View Banner Drawer */}
      {isDrawerOpen && (
        <div className="bam-drawer-overlay" onClick={() => setIsDrawerOpen(false)}>
          <div className="bam-drawer" onClick={e => e.stopPropagation()}>
            
            <div className="bam-drawer-header">
              <div>
                <h2 className="bam-drawer-title">
                  {drawerMode === 'add' ? 'Add New Banner' : drawerMode === 'edit' ? 'Edit Banner' : 'View Banner'}
                </h2>
                <p className="bam-drawer-subtitle">
                  {drawerMode === 'add' ? 'Create a new banner for your website.' : drawerMode === 'edit' ? 'Update the details for this banner.' : 'Viewing details for this banner.'}
                </p>
              </div>
              <button className="bam-drawer-close" onClick={() => setIsDrawerOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="bam-drawer-body">
              {/* Section 1: Banner Type */}
              <div className="bam-section">
                <h3 className="bam-section-title">1. Banner Type</h3>
                <p className="bam-section-subtitle">Choose how you want to create your banner.</p>
                
                <div className="bam-type-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                  <div className={`bam-type-card ${bannerType === 'image-text' ? 'active' : ''}`} onClick={() => setBannerType('image-text')} style={{ padding: '16px 12px', minHeight: 'auto' }}>
                    {bannerType === 'image-text' && <CheckCircle2 size={18} className="bam-type-check" />}
                    <div className="bam-type-icon"><Type size={20} /></div>
                    <h4 className="bam-type-title" style={{ fontSize: '13px' }}>Image + Text</h4>
                  </div>
                  <div className={`bam-type-card ${bannerType === 'image-only' ? 'active' : ''}`} onClick={() => setBannerType('image-only')} style={{ padding: '16px 12px', minHeight: 'auto' }}>
                    {bannerType === 'image-only' && <CheckCircle2 size={18} className="bam-type-check" />}
                    <div className="bam-type-icon"><ImageOnlyIcon size={20} /></div>
                    <h4 className="bam-type-title" style={{ fontSize: '13px' }}>Image Only</h4>
                  </div>
                  <div className={`bam-type-card ${bannerType === 'video' ? 'active' : ''}`} onClick={() => setBannerType('video')} style={{ padding: '16px 12px', minHeight: 'auto' }}>
                    {bannerType === 'video' && <CheckCircle2 size={18} className="bam-type-check" />}
                    <div className="bam-type-icon"><Video size={20} /></div>
                    <h4 className="bam-type-title" style={{ fontSize: '13px' }}>Video</h4>
                  </div>
                  <div className={`bam-type-card ${bannerType === 'text' ? 'active' : ''}`} onClick={() => setBannerType('text')} style={{ padding: '16px 12px', minHeight: 'auto' }}>
                    {bannerType === 'text' && <CheckCircle2 size={18} className="bam-type-check" />}
                    <div className="bam-type-icon"><Type size={20} /></div>
                    <h4 className="bam-type-title" style={{ fontSize: '13px' }}>Text Only</h4>
                  </div>
                </div>
              </div>

              {/* Section 2: Banner Information */}
              <div className="bam-section">
                <h3 className="bam-section-title">2. Banner Information</h3>
                
                <div className="bam-form-group">
                  <label className="bam-label">Banner Name <span className="req">*</span></label>
                  <input type="text" name="title" className="bam-input" placeholder="Enter banner name" value={formData.title} onChange={handleInputChange} disabled={drawerMode === 'view'} />
                </div>
                
                <div className="bam-row-2" style={{ marginTop: '16px' }}>
                  <div className="bam-form-group">
                    <label className="bam-label">Placement</label>
                    <select name="placement" className="bam-select-input" value={formData.placement} onChange={handleInputChange} disabled={drawerMode === 'view'}>
                      <option value="Home - Hero">Home - Hero Section</option>
                      <option value="Home - Middle">Home - Middle Section</option>
                      <option value="Home - Bottom">Home - Bottom Section</option>
                      <option value="Category Page">Category Page</option>
                      <option value="Checkout Page">Checkout Page</option>
                      <option value="Coupon Page">Coupon Page</option>
                    </select>
                  </div>
                  <div className="bam-form-group">
                    <label className="bam-label">Status</label>
                    <select name="status" className="bam-select-input" value={formData.status} onChange={(e) => setFormData(prev => ({...prev, status: e.target.value === 'true'}))} disabled={drawerMode === 'view'}>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Banner Content */}
              <div className="bam-section">
                <h3 className="bam-section-title">3. Banner Content</h3>
                
                {bannerType !== 'text' && (
                  <div className="bam-form-group">
                    <label className="bam-label">Banner Media <span className="req">*</span></label>
                    <div className="bam-upload-box" onClick={() => { if(drawerMode !== 'view') document.getElementById('banner-media-upload').click() }}>
                      <div className="bam-upload-icon">
                        <UploadCloud size={20} />
                      </div>
                      <div className="bam-upload-text">
                        <b>Click to upload</b>
                        <p>Images (Max 5MB) or Videos (Max 50MB)</p>
                      </div>
                      <input id="banner-media-upload" type="file" accept="image/*, video/*" style={{ display: 'none' }} onChange={handleMediaUpload} disabled={drawerMode === 'view'} />
                    </div>
                    {mediaPreview && bannerType === 'video' ? (
                      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#000', padding: '0' }}>
                        <video src={mediaPreview} controls style={{ width: '100%', display: 'block' }} />
                      </div>
                    ) : mediaPreview && (
                      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fafafa', padding: '10px' }}>
                        <img src={mediaPreview} alt="preview" style={{ width: '100%', display: 'block', borderRadius: '4px' }} />
                      </div>
                    )}
                  </div>
                )}

                {(bannerType === 'image-text' || bannerType === 'text') && (
                  <>
                    <div className="bam-row-2">
                      <div className="bam-form-group">
                        <label className="bam-label">Title</label>
                        <input type="text" name="title" className="bam-input" placeholder="Title is handled above, but can be edited here" value={formData.title} onChange={handleInputChange} disabled={drawerMode === 'view'} />
                      </div>
                      <div className="bam-form-group">
                        <label className="bam-label">Description</label>
                        <input type="text" name="description" className="bam-input" placeholder="Enter banner description" value={formData.description} onChange={handleInputChange} disabled={drawerMode === 'view'} />
                      </div>
                    </div>

                    <div className="bam-row-2">
                      <div className="bam-form-group">
                        <label className="bam-label">Text Position</label>
                        <select name="textPosition" className="bam-select-input" value={formData.textPosition} onChange={handleInputChange} disabled={drawerMode === 'view'}>
                          <option value="Center">Center</option>
                          <option value="Left">Left</option>
                          <option value="Right">Right</option>
                        </select>
                      </div>
                      <div className="bam-form-group">
                        <label className="bam-label">Banner Link</label>
                        <div className="bam-input-with-icon">
                          <LinkIcon size={16} className="bam-icon-left" style={{color: '#9ca3af'}} />
                          <input type="text" name="link" className="bam-input" style={{paddingLeft: '36px'}} placeholder="Enter URL" value={formData.link} onChange={handleInputChange} disabled={drawerMode === 'view'} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Section 4: Schedule */}
              <div className="bam-section">
                <h3 className="bam-section-title">4. Schedule</h3>
                
                <div className="bam-row-2">
                  <div className="bam-form-group">
                    <label className="bam-label">Start Date</label>
                    <div className="bam-input-with-icon">
                      <CalendarIcon size={16} className="bam-icon-left" />
                      <input type="date" name="startDate" className="bam-input" style={{paddingLeft: '36px'}} value={formData.startDate} onChange={handleInputChange} disabled={drawerMode === 'view'} />
                    </div>
                  </div>
                  <div className="bam-form-group">
                    <label className="bam-label">End Date</label>
                    <div className="bam-input-with-icon">
                      <CalendarClock size={16} className="bam-icon-left" />
                      <input type="date" name="endDate" className="bam-input" style={{paddingLeft: '36px'}} value={formData.endDate} onChange={handleInputChange} disabled={drawerMode === 'view'} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {drawerMode !== 'view' ? (
              <div className="bam-drawer-footer">
                <button className="bam-btn-cancel" onClick={() => setIsDrawerOpen(false)} disabled={loading}>Cancel</button>
                <button className="bam-btn-primary" onClick={handleSaveBanner} disabled={loading}>{loading ? 'Saving...' : 'Save Banner'}</button>
              </div>
            ) : (
              <div className="bam-drawer-footer">
                <button className="bam-btn-cancel" onClick={() => setIsDrawerOpen(false)}>Close</button>
                <button className="bam-btn-primary" onClick={() => setDrawerMode('edit')}>Edit</button>
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
};

export default BannerManagement;
