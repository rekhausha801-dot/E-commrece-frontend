import React, { useState, useEffect } from 'react';
import { Search, Filter, RotateCcw, MoreVertical, X, Mail, Phone, MapPin, Home, Edit, Ban, MessageSquare, Users, UserCheck, UserMinus, UserPlus, ChevronLeft, ChevronRight, Plus, User, Calendar, Hash, FileText, Lock, EyeOff, Globe, Map, FileSignature, UploadCloud, Save, RefreshCw, ArrowLeft, ChevronDown, Heart, Bell, Image, ShieldCheck, Info, Check, Loader } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { getCustomers, getCustomerStats, createCustomer, updateCustomer, updateCustomerStatus, deleteCustomer } from '../../services/api';
import './CustomerManagement.css';
import './Dashboard.css';

const sparklineTotalCustomers = [{ v: 40 }, { v: 30 }, { v: 60 }, { v: 45 }, { v: 70 }, { v: 90 }, { v: 120 }];
const sparklineActiveCustomers = [{ v: 10 }, { v: 15 }, { v: 12 }, { v: 22 }, { v: 18 }, { v: 28 }, { v: 25 }];
const sparklineInactiveCustomers = [{ v: 20 }, { v: 25 }, { v: 20 }, { v: 35 }, { v: 30 }, { v: 45 }, { v: 40 }];
const sparklineNewCustomers = [{ v: 5 }, { v: 10 }, { v: 15 }, { v: 12 }, { v: 20 }, { v: 18 }, { v: 30 }];

const renderCustomDot = (props) => {
  const { cx, cy, index } = props;
  if (index === 5) {
    return <circle cx={cx} cy={cy} r={4} stroke="#c9a05b" strokeWidth={2} fill="#fff" key={`dot-${index}`} />;
  }
  return null;
};

const mockCustomers = [
  { id: '#CUST1001', name: 'Priya Kumar', email: 'priya.kumar@gmail.com', phone: '+91 98765 43210', orders: 12, totalSpent: '₹24,500', joined: '12 Aug 2026', status: 'Active', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '#CUST1002', name: 'Rahul S', email: 'rahul.singh@gmail.com', phone: '+91 91234 56789', orders: 5, totalSpent: '₹8,200', joined: '08 Aug 2026', status: 'Active', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '#CUST1003', name: 'Anitha R', email: 'anitha.r@gmail.com', phone: '+91 99887 76655', orders: 0, totalSpent: '₹0', joined: '02 Aug 2026', status: 'Inactive', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { id: '#CUST1004', name: 'Vikram J', email: 'vikram.j@gmail.com', phone: '+91 97865 11122', orders: 8, totalSpent: '₹15,300', joined: '28 Jul 2026', status: 'Active', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { id: '#CUST1005', name: 'Sneha M', email: 'sneha.m@gmail.com', phone: '+91 96789 43210', orders: 3, totalSpent: '₹4,750', joined: '24 Jul 2026', status: 'Blocked', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { id: '#CUST1006', name: 'Arun Kumar', email: 'arun.kumar@gmail.com', phone: '+91 90011 22334', orders: 15, totalSpent: '₹31,600', joined: '20 Jul 2026', status: 'Active', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
  { id: '#CUST1007', name: 'Meena Patel', email: 'meena.patel@gmail.com', phone: '+91 98980 66554', orders: 2, totalSpent: '₹3,250', joined: '18 Jul 2026', status: 'Inactive', avatar: 'https://randomuser.me/api/portraits/women/29.jpg' },
];

const mockRecentOrders = [
  { id: '#ORD12540', date: '12 Aug 2026', amount: '₹2,450', status: 'Delivered' },
  { id: '#ORD12510', date: '05 Aug 2026', amount: '₹1,299', status: 'Delivered' },
  { id: '#ORD12450', date: '28 Jul 2026', amount: '₹3,650', status: 'Shipped' },
  { id: '#ORD12390', date: '20 Jul 2026', amount: '₹2,199', status: 'Delivered' },
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({ totalCustomers: 0, activeCustomers: 0, blockedCustomers: 0, newCustomers: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const defaultFormData = {
    name: '', email: '', phone: '', address: '', city: '', state: '', country: '', pincode: '', status: 'Active'
  };
  const [formData, setFormData] = useState(defaultFormData);

  const fetchStats = async () => {
    try {
      const { data } = await getCustomerStats();
      if (data.success) setStats(data.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCustomers({ limit: 1000, t: new Date().getTime() });
      if (data.success) {
        const mapped = data.data.map(c => ({
          ...c,
          id: c._id,
          displayId: `#CUST${c._id.substring(c._id.length - 4).toUpperCase()}`,
          name: c.name,
          email: c.email,
          phone: c.phone,
          status: c.status,
          joined: new Date(c.createdAt).toLocaleDateString('en-GB', {day: '2-digit', month: 'short', year: 'numeric'}),
          avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
          orders: 0,
          totalSpent: '₹0'
        }));
        setCustomers(mapped);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCustomers();
  }, []);

  const handleSaveCustomer = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Name, email and phone are required.");
      return;
    }
    setIsLoading(true);
    try {
      if (selectedCustomer) {
        await updateCustomer(selectedCustomer.id, formData);
      } else {
        await createCustomer(formData);
      }
      fetchCustomers();
      fetchStats();
      setIsAddingCustomer(false);
      setSelectedCustomer(null);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (customer) => {
    try {
      const newStatus = customer.status === 'Blocked' ? 'Active' : 'Blocked';
      await updateCustomerStatus(customer.id, newStatus);
      fetchCustomers();
      fetchStats();
    } catch (error) {
      alert("Error updating status");
    }
    setActiveDropdown(null);
  };

  const handleDeleteCustomer = async (id, name) => {
    if(window.confirm(`Delete customer ${name}?`)) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
        fetchStats();
        if (selectedCustomer?.id === id) setSelectedCustomer(null);
      } catch (error) {
         alert("Error deleting customer");
      }
    }
    setActiveDropdown(null);
  };

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.displayId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="customer-management-page">
      {/* Header Section */}
      <div style={{ background: '#fff', padding: '16px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.03)', marginBottom: '24px', border: '1px solid #f9f9f9' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', border: '1.5px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} color="#d97706" />
          </div>
          <div style={{ width: '2.5px', height: '22px', background: '#d97706', borderRadius: '2px' }}></div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
              {isAddingCustomer ? (selectedCustomer ? 'Edit Customer Details' : 'Add New Customer') : 'Customer Management'}
            </h1>
            {isAddingCustomer && <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>{selectedCustomer ? 'Update the details for this customer account.' : 'Create a new customer account and add customer details.'}</p>}
          </div>
        </div>
        
        {isAddingCustomer ? (
          <button 
            onClick={() => { setIsAddingCustomer(false); setSelectedCustomer(null); }}
            style={{ background: '#fff', color: '#374151', border: '1px solid #e5e7eb', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
          >
            <ArrowLeft size={16} strokeWidth={2.5} /> Back
          </button>
        ) : (
          <button 
            onClick={() => { setIsAddingCustomer(true); setFormData(defaultFormData); setSelectedCustomer(null); }}
            style={{ background: 'linear-gradient(90deg, #d97706 0%, #b45309 100%)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.2)' }}
          >
            <Plus size={16} strokeWidth={2.5} /> Add Customer
          </button>
        )}
      </div>

      {!isAddingCustomer ? (
        <>
      {/* Stat Cards */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><Users size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">Total Customers</span>
              <h2 className="stat-value gold-text">{stats.totalCustomers}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 12.5%</span> <span className="stat-change-text">from last month</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineTotalCustomers}>
                <defs>
                  <linearGradient id="glowDarkCu1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkCu1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold"><UserCheck size={18} color="#554422" /></div>
            <div className="stat-info">
              <span className="stat-title">Active Customers</span>
              <h2 className="stat-value">{stats.activeCustomers}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 8.3%</span> <span className="stat-change-text">from last month</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineActiveCustomers}>
                <defs>
                  <linearGradient id="glowLightCu1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightCu1)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card light">
          <div className="stat-top">
            <div className="stat-icon gold"><UserMinus size={18} color="#554422" /></div>
            <div className="stat-info">
              <span className="stat-title">Blocked Customers</span>
              <h2 className="stat-value">{stats.blockedCustomers}</h2>
              <div className="stat-bottom">
                <span className="stat-change negative">4.1%</span> <span className="stat-change-text">from last month</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineInactiveCustomers}>
                <defs>
                  <linearGradient id="glowLightCu2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowLightCu2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="stat-card dark">
          <div className="stat-top">
            <div className="stat-icon gold"><UserPlus size={18} color="#c9a05b" /></div>
            <div className="stat-info">
              <span className="stat-title">New Customers</span>
              <h2 className="stat-value gold-text">{stats.newCustomers}</h2>
              <div className="stat-bottom">
                <span className="stat-change positive">↑ 15.2%</span> <span className="stat-change-text">from last month</span>
              </div>
            </div>
          </div>
          <div className="stat-chart-sparkline">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineNewCustomers}>
                <defs>
                  <linearGradient id="glowDarkCu2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c9a05b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#c9a05b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#c9a05b" strokeWidth={2} fill="url(#glowDarkCu2)" dot={{ r: 2.5, fill: '#c9a05b', strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="cm-main-layout">
        
        {/* Left Column: List */}
        <div className="cm-list-section">
          <div className="cm-filters-bar">
            <div className="cm-search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search customers by name, email, phone or ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="cm-filter-actions">
              <div className="cm-filter-dropdown">
                <span>Status</span>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All Status">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <button className="cm-btn-clear" onClick={() => {setSearchQuery(''); setStatusFilter('All Status');}}><RotateCcw size={16} /> Clear Filters</button>
            </div>
          </div>

          <div className="cm-table-container">
            <table className="cm-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" /></th>
                  <th>CUSTOMER</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>ORDERS</th>
                  <th>TOTAL SPENT</th>
                  <th>JOINED DATE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentCustomers.length === 0 && (
                  <tr><td colSpan="9" style={{textAlign: 'center', padding: '24px'}}>No customers found.</td></tr>
                )}
                {currentCustomers.map((customer, index) => (
                  <tr key={customer.id} onClick={() => setSelectedCustomer(customer)} style={{ cursor: 'pointer', background: selectedCustomer?.id === customer.id ? '#fdfaf6' : 'transparent' }}>
                    <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                    <td className="customer-cell">
                      <img src={customer.avatar} alt="" className="cm-avatar" />
                      <div>
                        <div className="cm-customer-name">{customer.name}</div>
                        <div className="cm-customer-id">{customer.displayId}</div>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.orders}</td>
                    <td>{customer.totalSpent}</td>
                    <td>{customer.joined}</td>
                    <td><span className={`cm-tag ${customer.status.toLowerCase()}`}>{customer.status}</span></td>
                    <td style={{ position: 'relative' }}>
                      <button className="cm-action-btn" onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === customer.id ? null : customer.id); }}>
                        <MoreVertical size={16} />
                      </button>
                      {activeDropdown === customer.id && (
                        <div className="bm-dropdown-menu" style={{ top: '100%', right: '0', zIndex: 99 }}>
                          <button className="bm-dropdown-item" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(customer);
                            setFormData({...customer});
                            setIsAddingCustomer(true);
                            setActiveDropdown(null);
                          }}>
                            <Edit size={14} /> Edit
                          </button>
                          <button className="bm-dropdown-item" onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(customer);
                          }}>
                            <Ban size={14} /> {customer.status === 'Blocked' ? 'Unblock' : 'Block'}
                          </button>
                          <button className="bm-dropdown-item text-danger" onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCustomer(customer.id, customer.name);
                          }}>
                            <X size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cm-pagination">
            <div className="cm-page-info">Showing {filteredCustomers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} customers</div>
            <div className="cm-page-controls">
              <button className="cm-page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}><ChevronLeft size={16} /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} className={`cm-page-btn ${currentPage === i + 1 ? 'active' : ''}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="cm-page-btn" disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}><ChevronRight size={16} /></button>
            </div>
            <div className="cm-per-page">
              <select><option>10 / page</option></select>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details */}
        {selectedCustomer && (
          <div className="cm-details-sidebar">
            <div className="cm-profile-header">
              <div className="cm-profile-header-left">
                <h2>{selectedCustomer.name}</h2>
                <span className={`cm-tag ${selectedCustomer.status.toLowerCase()}`}>{selectedCustomer.status}</span>
                <div className="cm-profile-meta">
                  {selectedCustomer.displayId} &bull; Joined {selectedCustomer.joined}
                </div>
              </div>
              <button className="cm-close-btn" onClick={() => setSelectedCustomer(null)}><X size={20} /></button>
            </div>

            <div className="cm-profile-contact">
              <img src={selectedCustomer.avatar} alt="" className="cm-profile-avatar" />
              <div className="cm-contact-list">
                <div className="cm-contact-item"><Mail size={14} /> {selectedCustomer.email}</div>
                <div className="cm-contact-item"><Phone size={14} /> {selectedCustomer.phone}</div>
                <div className="cm-contact-item"><MapPin size={14} /> {selectedCustomer.city ? `${selectedCustomer.city}, ${selectedCustomer.state || ''}` : 'Location not provided'}</div>
              </div>
            </div>



            <div className="cm-section-title">
              Recent Orders <span>View All</span>
            </div>
            <div className="cm-recent-orders">
              {mockRecentOrders.map(order => (
                <div key={order.id} className="cm-ro-item">
                  <div className="cm-ro-id">{order.id}</div>
                  <div className="cm-ro-date">{order.date}</div>
                  <div className="cm-ro-amount">{order.amount}</div>
                  <span className={`cm-tag ${order.status.toLowerCase()}`}>{order.status}</span>
                </div>
              ))}
            </div>

            <div className="cm-section-title">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={16} /> Default Address
              </div>
            </div>
            <div className="cm-address-card">
              <div className="cm-address-text">
                {selectedCustomer.address ? (
                  <>
                    {selectedCustomer.address},<br />
                    {selectedCustomer.city}, {selectedCustomer.state} - {selectedCustomer.pincode},<br />
                    {selectedCustomer.country}
                  </>
                ) : "No address provided."}
              </div>
              <button className="cm-btn-block">View All Addresses</button>
            </div>

            <div className="cm-section-title">Actions</div>
            <div className="cm-actions-group">
              <button className="cm-btn-action" onClick={() => { setFormData({...selectedCustomer}); setIsAddingCustomer(true); }}><Edit size={16} /> Edit</button>
              <button className="cm-btn-action" onClick={() => alert('Messaging feature coming soon!')}><MessageSquare size={16} /> Message</button>
            </div>

          </div>
        )}

      </div>
      </>
      ) : (
        <div className="cm-add-view">
          <div className="cm-form-grid">
            
            {/* Left Column */}
            <div className="cm-form-grid-col">
              
              {/* Personal Information */}
              <div className="cm-card">
                <div className="cm-card-title">
                  <div className="cm-card-title-icon"><User size={18} /></div>
                  Personal Information
                </div>
                
                <div className="cm-form-row-2" style={{ marginBottom: 0 }}>
                  <div className="cm-form-group">
                    <label className="cm-label">Full Name <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <User size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Enter full name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">Email Address <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Mail size={16} className="cm-input-icon" />
                      <input type="email" className="cm-input" placeholder="Enter email address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">Phone Number <span className="req">*</span></label>
                    <div className="cm-phone-input">
                      <div className="cm-phone-prefix">
                        <span>🇮🇳</span> <ChevronDown size={14} /> +91
                      </div>
                      <input type="text" placeholder="Enter phone number" value={formData.phone?.replace('+91 ', '') || ''} onChange={(e) => setFormData({...formData, phone: '+91 ' + e.target.value})} />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">Marital Status</label>
                    <div className="cm-input-wrapper with-icon">
                      <Heart size={16} className="cm-input-icon" />
                      <select className="cm-select"><option>Select marital status</option></select>
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">Date of Birth</label>
                    <div className="cm-input-wrapper with-icon">
                      <Calendar size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Select date of birth" />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">Gender</label>
                    <div className="cm-input-wrapper with-icon">
                      <Users size={16} className="cm-input-icon" />
                      <select className="cm-select"><option>Select gender</option></select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="cm-card">
                <div className="cm-card-title">
                  <div className="cm-card-title-icon"><MapPin size={18} /></div>
                  Address Information
                </div>

                <div className="cm-form-row-2" style={{ marginBottom: 0 }}>
                  <div className="cm-form-group">
                    <label className="cm-label">Address Line 1 <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Home size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Enter address line 1" value={formData.address || ''} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">Address Line 2 (Optional)</label>
                    <div className="cm-input-wrapper with-icon">
                      <FileText size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Enter address line 2" />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">Landmark (Optional)</label>
                    <div className="cm-input-wrapper with-icon">
                      <MapPin size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Enter landmark" />
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">Country <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Globe size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Select country" value={formData.country || ''} onChange={(e) => setFormData({...formData, country: e.target.value})} />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">State <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Map size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Select state" value={formData.state || ''} onChange={(e) => setFormData({...formData, state: e.target.value})} />
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">City <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Home size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Select city" value={formData.city || ''} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">District <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Map size={16} className="cm-input-icon" />
                      <select className="cm-select"><option>Select district</option></select>
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">Pincode <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Mail size={16} className="cm-input-icon" />
                      <input type="text" className="cm-input" placeholder="Enter pincode" value={formData.pincode || ''} onChange={(e) => setFormData({...formData, pincode: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="cm-form-grid-col">
              
              {/* Account Information */}
              <div className="cm-card">
                <div className="cm-card-title">
                  <div className="cm-card-title-icon"><Lock size={18} /></div>
                  Account Information
                </div>

                <div className="cm-form-group">
                  <label className="cm-label">Status <span className="req">*</span></label>
                  <div className="cm-input-wrapper with-icon">
                    <div className="cm-input-icon" style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: formData.status === 'Active' ? '#16a34a' : '#ef4444' }}></div>
                    </div>
                    <select className="cm-select" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                      <option value="Active">Active</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>

                <div className="cm-form-group">
                  <label className="cm-label">Password <span className="req">*</span></label>
                  <div className="cm-input-wrapper with-icon">
                    <Lock size={16} className="cm-input-icon" />
                    <input type="password" className="cm-input" placeholder="Enter password" />
                    <EyeOff size={16} className="cm-input-icon right" />
                  </div>
                </div>

                <div className="cm-form-group">
                  <label className="cm-label">Confirm Password <span className="req">*</span></label>
                  <div className="cm-input-wrapper with-icon">
                    <Lock size={16} className="cm-input-icon" />
                    <input type="password" className="cm-input" placeholder="Confirm password" />
                    <EyeOff size={16} className="cm-input-icon right" />
                  </div>
                </div>

                <div className="cm-form-group" style={{ marginBottom: 0 }}>
                  <label className="cm-label">Account Type</label>
                  <div className="cm-radio-group">
                    <label className="cm-radio-label"><input type="radio" name="acc-type" defaultChecked /> Individual</label>
                    <label className="cm-radio-label"><input type="radio" name="acc-type" /> Business</label>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="cm-card">
                <div className="cm-card-title">
                  <div className="cm-card-title-icon"><FileSignature size={18} /></div>
                  Additional Information
                </div>

                <div className="cm-form-group">
                  <label className="cm-label">Joined Date</label>
                  <div className="cm-input-wrapper with-icon">
                    <Calendar size={16} className="cm-input-icon" />
                    <input type="text" className="cm-input" placeholder="Select joined date" />
                  </div>
                </div>
                
                <div className="cm-form-group">
                  <label className="cm-label">Referral Code (Optional)</label>
                  <div className="cm-input-wrapper with-icon">
                    <FileText size={16} className="cm-input-icon" />
                    <input type="text" className="cm-input" placeholder="Enter referral code" />
                  </div>
                </div>

                <div className="cm-form-group">
                  <label className="cm-label">Source</label>
                  <div className="cm-input-wrapper with-icon">
                    <Users size={16} className="cm-input-icon" />
                    <select className="cm-select"><option>Select source</option></select>
                  </div>
                </div>

                <div className="cm-form-group" style={{ marginBottom: 0 }}>
                  <label className="cm-label">Notes (Optional)</label>
                  <div className="cm-input-wrapper with-icon" style={{ position: 'relative' }}>
                    <Edit size={16} className="cm-input-icon" style={{ top: '16px' }} />
                    <textarea className="cm-textarea" placeholder="Enter notes about customer..." rows="5" style={{ paddingLeft: '40px', minHeight: '120px' }}></textarea>
                    <div className="cm-textarea-hint" style={{ position: 'absolute', bottom: '10px', right: '12px', fontSize: '12px', color: '#888', pointerEvents: 'none', background: 'transparent' }}>0 / 250</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Profile & Verification (Full Width) */}
          <div className="cm-pv-container">
            
            <div className="cm-pv-header">
              <div className="cm-pv-icon-container">
                <User size={32} strokeWidth={2.5} className="cm-pv-header-icon" />
              </div>
              <div className="cm-pv-header-text">
                <h3>Profile & Verification</h3>
                <p>Manage your profile information and verification status</p>
              </div>
            </div>

            <div className="cm-pv-line-divider"></div>

            <div className="cm-pv-grid">
              
              {/* Column 1: Profile Picture */}
              <div className="cm-pv-col">
                <div className="cm-pv-col-header">
                  <div className="cm-pv-col-icon"><Image size={24} strokeWidth={2.5} /></div>
                  <div className="cm-pv-col-title">Profile Picture (Optional)</div>
                </div>

                <div className="cm-pv-upload-box">
                  <div className="cm-pv-upload-circle">
                    <UploadCloud size={36} strokeWidth={2.5} />
                  </div>
                  <div className="cm-pv-upload-text">
                    <b>Drag & drop image here</b>
                    <br />or <span className="cm-pv-highlight">click to browse</span>
                  </div>
                  <div className="cm-pv-upload-subtext">
                    PNG, JPG or WEBP<br />(Max 2MB)
                  </div>
                </div>

                <div className="cm-pv-info-box">
                  <div className="cm-pv-info-icon"><Info size={20} strokeWidth={2.5} /></div>
                  <div className="cm-pv-info-text">For best results, use a square image with clear visibility.</div>
                </div>
              </div>

              {/* Column 2: Verification */}
              <div className="cm-pv-col">
                <div className="cm-pv-verify-section">
                  <div className="cm-pv-verify-top">
                    <div className="cm-pv-col-icon"><Mail size={24} strokeWidth={2.5} /></div>
                    <div className="cm-pv-verify-text">
                      <div className="cm-pv-col-title">Email Verified</div>
                      <div className="cm-pv-verify-subtitle">Your email verification status</div>
                    </div>
                  </div>
                  <div className="cm-pv-radio-group">
                    <label className="cm-pv-radio-label">
                      <input type="radio" name="pv-email" defaultChecked /> <span className="cm-pv-radio-custom"></span> Verified
                    </label>
                    <label className="cm-pv-radio-label">
                      <input type="radio" name="pv-email" /> <span className="cm-pv-radio-custom"></span> Not Verified
                    </label>
                  </div>
                </div>

                <div className="cm-pv-verify-divider"></div>

                <div className="cm-pv-verify-section">
                  <div className="cm-pv-verify-top">
                    <div className="cm-pv-col-icon"><Phone size={24} strokeWidth={2.5} /></div>
                    <div className="cm-pv-verify-text">
                      <div className="cm-pv-col-title">Phone Verified</div>
                      <div className="cm-pv-verify-subtitle">Your phone verification status</div>
                    </div>
                  </div>
                  <div className="cm-pv-radio-group">
                    <label className="cm-pv-radio-label">
                      <input type="radio" name="pv-phone" defaultChecked /> <span className="cm-pv-radio-custom"></span> Verified
                    </label>
                    <label className="cm-pv-radio-label">
                      <input type="radio" name="pv-phone" /> <span className="cm-pv-radio-custom"></span> Not Verified
                    </label>
                  </div>
                </div>

                <div className="cm-pv-info-box alert">
                  <div className="cm-pv-info-icon alert-icon">
                    <ShieldCheck size={24} strokeWidth={2.5} />
                  </div>
                  <div className="cm-pv-info-text">Verified contact information helps us keep your account secure.</div>
                </div>
              </div>

              {/* Column 3: Notifications */}
              <div className="cm-pv-col">
                <div className="cm-pv-verify-top">
                  <div className="cm-pv-col-icon"><Bell size={24} strokeWidth={2.5} /></div>
                  <div className="cm-pv-verify-text">
                    <div className="cm-pv-col-title">SMS/Email Notifications</div>
                    <div className="cm-pv-verify-subtitle">Receive important updates via SMS or Email</div>
                  </div>
                </div>
                
                <div className="cm-pv-toggle-container">
                  <label className="cm-pv-toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="cm-pv-slider"></span>
                  </label>
                </div>

                <div className="cm-pv-success-box">
                  <div className="cm-pv-success-icon">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div className="cm-pv-success-content">
                    <div className="cm-pv-success-title">Notifications are enabled</div>
                    <div className="cm-pv-success-text">You will receive important updates and alerts.</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <div className="cm-action-footer">
            <button className="cm-btn-outline-action" style={{ color: '#b88645', borderColor: '#e0d5c1', background: '#fdfaf6' }} onClick={() => setFormData(defaultFormData)}>
              <RefreshCw size={16} /> Reset
            </button>
            <div className="cm-footer-right">
              <button className="cm-btn-primary-action" onClick={handleSaveCustomer} disabled={isLoading}>
                {isLoading ? <Loader size={16} className="spin" /> : <Save size={16} />} 
                {isLoading ? 'Saving...' : 'Save Customer'}
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
