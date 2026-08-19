import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Filter, Plus, MoreVertical, LayoutTemplate, CheckCircle2, Calendar, UserX, ChevronLeft, ChevronRight, Image as ImageIcon, X, Type, Image as ImageOnlyIcon, UploadCloud, Link as LinkIcon, Calendar as CalendarIcon, CalendarDays, CalendarClock, Eye, Edit2, Copy, RefreshCw, ArrowUpDown, Trash2, ShoppingBag, Users, Package } from 'lucide-react';
import fashionnImg from '../../assets/banners/fashionn.png';
import newArrivalsImg from '../../assets/banners/new_arrivals_bg.png';
import couponImg from '../../assets/banners/coupon.png';
import modelImg from '../../assets/banners/model.png';
import gloImg from '../../assets/banners/glo.png';
import wearImg from '../../assets/banners/wear.png';
import './BannerManagement.css';
import './Dashboard.css';

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
  const [isAddingBanner, setIsAddingBanner] = useState(false);
  const [bannerType, setBannerType] = useState('image-text');
  
  const [activeTab, setActiveTab] = useState('All Banners');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const filteredBanners = mockBanners.filter(banner => {
    if (activeTab === 'Image + Text Banners' && banner.type !== 'Image + Text') return false;
    if (activeTab === 'Image Only Banners' && banner.type !== 'Image Only') return false;
    if (statusFilter !== 'All Status' && banner.status !== statusFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!banner.name.toLowerCase().includes(query) && !banner.placement.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  return (
    <div className="banner-management-page">
      {/* Header */}
      <div className="bam-header-section">
        <div className="bam-header-title-row">
          <div>
            <h1 className="bm-page-title">Banner Management</h1>
          </div>
          <button className="bam-btn-primary" onClick={() => setIsAddingBanner(true)}>
            <Plus size={16} /> Add Banner
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><LayoutTemplate size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">Total Banners</span>
              <h2 className="stat-value gold-text">24</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 4</span> <span className="stat-change-text">new today</span>
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
              <h2 className="stat-value">18</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 3</span> <span className="stat-change-text">new today</span>
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
              <h2 className="stat-value">4</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 2</span> <span className="stat-change-text">new today</span>
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
              <h2 className="stat-value gold-text">2</h2>
              <div className="stat-bottom">
                <span className="stat-change negative">2</span> <span className="stat-change-text">require attention</span>
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
              placeholder="Search banner by name or placement..." 
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
                <th>Placement</th>
                <th>Schedule</th>
                <th>Status</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.map(banner => (
                <tr key={banner.id}>
                  <td>
                    <img src={banner.image} alt={banner.name} className="bam-preview-img" />
                  </td>
                  <td style={{ fontWeight: 600 }}>{banner.name}</td>
                  <td>
                    <span className={`bam-pill ${banner.type === 'Image + Text' ? 'img-text' : 'img-only'}`}>
                      {banner.type}
                    </span>
                  </td>
                  <td>{banner.placement}</td>
                  <td>
                    {banner.schedule.replace('\n', ' ')}
                  </td>
                  <td>
                    <span className={`bam-pill ${banner.status.toLowerCase()}`}>
                      {banner.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>{banner.order}</td>
                  <td style={{ position: 'relative' }}>
                    <button 
                      className="bam-action-btn" 
                      onClick={() => setActiveDropdown(activeDropdown === banner.id ? null : banner.id)}
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {activeDropdown === banner.id && (
                      <>
                        <div 
                          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 90 }} 
                          onClick={() => setActiveDropdown(null)}
                        />
                        <div className="bam-dropdown-menu" style={{ zIndex: 100 }}>
                          <div className="bam-dropdown-item" onClick={() => setActiveDropdown(null)}><Eye size={16} /> View Banner</div>
                          <div className="bam-dropdown-item" onClick={() => setActiveDropdown(null)}><Edit2 size={16} /> Edit Banner</div>
                          <div className="bam-dropdown-item" onClick={() => setActiveDropdown(null)}><Copy size={16} /> Duplicate Banner</div>
                          <div className="bam-dropdown-item" onClick={() => setActiveDropdown(null)}><RefreshCw size={16} /> Set as Inactive</div>
                          <div className="bam-dropdown-item" onClick={() => setActiveDropdown(null)}><Calendar size={16} /> Schedule Banner</div>
                          <div className="bam-dropdown-item" onClick={() => setActiveDropdown(null)}><ArrowUpDown size={16} /> Reorder</div>
                          <div className="bam-dropdown-item text-red" onClick={() => setActiveDropdown(null)}><Trash2 size={16} /> Delete Banner</div>
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

      {/* Add Banner Drawer */}
      {isAddingBanner && (
        <div className="bam-drawer-overlay" onClick={() => setIsAddingBanner(false)}>
          <div className="bam-drawer" onClick={e => e.stopPropagation()}>
            
            <div className="bam-drawer-header">
              <div>
                <h2 className="bam-drawer-title">Add New Banner</h2>
                <p className="bam-drawer-subtitle">Create a new banner for your website.</p>
              </div>
              <button className="bam-drawer-close" onClick={() => setIsAddingBanner(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="bam-drawer-body">
              {/* Section 1: Banner Type */}
              <div className="bam-section">
                <h3 className="bam-section-title">1. Banner Type</h3>
                <p className="bam-section-subtitle">Choose how you want to create your banner.</p>
                
                <div className="bam-type-grid">
                  <div className={`bam-type-card ${bannerType === 'image-text' ? 'active' : ''}`} onClick={() => setBannerType('image-text')}>
                    {bannerType === 'image-text' && <CheckCircle2 size={18} className="bam-type-check" />}
                    <div className="bam-type-icon"><Type size={20} /></div>
                    <h4 className="bam-type-title">Image + Text</h4>
                    <p className="bam-type-desc">Upload image and add text separately from here.</p>
                  </div>
                  <div className={`bam-type-card ${bannerType === 'image-only' ? 'active' : ''}`} onClick={() => setBannerType('image-only')}>
                    {bannerType === 'image-only' && <CheckCircle2 size={18} className="bam-type-check" />}
                    <div className="bam-type-icon"><ImageOnlyIcon size={20} /></div>
                    <h4 className="bam-type-title">Image Only</h4>
                    <p className="bam-type-desc">Upload complete banner image with text in it.</p>
                  </div>
                </div>
              </div>

              {/* Section 2: Banner Information */}
              <div className="bam-section">
                <h3 className="bam-section-title">2. Banner Information</h3>
                
                <div className="bam-form-group">
                  <label className="bam-label">Banner Name <span className="req">*</span></label>
                  <input type="text" className="bam-input" placeholder="Enter banner name" />
                </div>
                
                <div className="bam-row-2">
                  <div className="bam-form-group">
                    <label className="bam-label">Placement <span className="req">*</span></label>
                    <select className="bam-select-input">
                      <option>Select placement</option>
                    </select>
                  </div>
                  <div className="bam-form-group">
                    <label className="bam-label">Status <span className="req">*</span></label>
                    <select className="bam-select-input">
                      <option>Select status</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: Banner Content */}
              <div className="bam-section">
                <h3 className="bam-section-title">3. Banner Content</h3>
                
                <div className="bam-form-group">
                  <label className="bam-label">Banner Image <span className="req">*</span></label>
                  <input type="file" className="bam-input" accept="image/png, image/jpeg, image/webp" style={{ paddingTop: '10px' }} />
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>PNG, JPG or WEBP (Max 2MB)</p>
                </div>

                {bannerType === 'image-text' && (
                  <>
                    <div className="bam-row-2">
                      <div className="bam-form-group">
                        <label className="bam-label">Title <span className="req">*</span></label>
                        <input type="text" className="bam-input" placeholder="Enter banner title" />
                      </div>
                      <div className="bam-form-group">
                        <label className="bam-label">Subtitle</label>
                        <input type="text" className="bam-input" placeholder="Enter banner subtitle" />
                      </div>
                    </div>

                    <div className="bam-row-2">
                      <div className="bam-form-group">
                        <label className="bam-label">Button Text</label>
                        <input type="text" className="bam-input" placeholder="Enter button text" />
                      </div>
                      <div className="bam-form-group">
                        <label className="bam-label">Button Link</label>
                        <div className="bam-input-with-icon">
                          <LinkIcon size={16} className="bam-icon-left" style={{color: '#9ca3af'}} />
                          <select className="bam-select-input" style={{paddingLeft: '36px'}}>
                            <option>Enter link or select page</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bam-row-2">
                      <div className="bam-form-group">
                        <label className="bam-label">Text Position</label>
                        <select className="bam-select-input">
                          <option>Center Center</option>
                        </select>
                      </div>
                      <div className="bam-form-group">
                        <label className="bam-label">Text Color</label>
                        <div className="bam-input bam-color-picker">
                          <input type="color" defaultValue="#000000" />
                          <input type="text" defaultValue="#000000" />
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
                      <input type="text" className="bam-input" placeholder="Select start date" />
                    </div>
                  </div>
                  <div className="bam-form-group">
                    <label className="bam-label">End Date</label>
                    <div className="bam-input-with-icon">
                      <CalendarClock size={16} className="bam-icon-left" />
                      <input type="text" className="bam-input" placeholder="Select end date" />
                    </div>
                  </div>
                </div>

                <div className="bam-row-2">
                  <div className="bam-form-group">
                    <label className="bam-label">Display Order</label>
                    <input type="text" className="bam-input" placeholder="Enter button number" />
                  </div>
                  <div className="bam-helper-text">Lower number shows first</div>
                </div>
              </div>
            </div>

            <div className="bam-drawer-footer">
              <button className="bam-btn-cancel" onClick={() => setIsAddingBanner(false)}>Cancel</button>
              <button className="bam-btn-primary" onClick={() => setIsAddingBanner(false)}>Save Banner</button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  );
};

export default BannerManagement;
