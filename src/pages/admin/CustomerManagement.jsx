import React, { useState } from 'react';
import { Search, Filter, RotateCcw, MoreVertical, X, Mail, Phone, MapPin, Home, Edit, Ban, MessageSquare, Users, UserCheck, UserMinus, UserPlus, ChevronLeft, ChevronRight, Plus, User, Calendar, Hash, FileText, Lock, EyeOff, Globe, Map, FileSignature, UploadCloud, Save, RefreshCw, ArrowLeft, ChevronDown, Heart } from 'lucide-react';
import './CustomerManagement.css';

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
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  return (
    <div className="customer-management-page">
      {/* Header Section */}
      <div className="cm-header-section">
        <div className="bm-breadcrumbs" style={{ marginBottom: '8px' }}>
          <span className="bm-breadcrumb-item">Dashboard</span>
          <span className="bm-breadcrumb-separator">&gt;</span>
          <span className="bm-breadcrumb-item">Customers</span>
          {isAddingCustomer && (
            <>
              <span className="bm-breadcrumb-separator">&gt;</span>
              <span className="bm-breadcrumb-item active">Add Customer</span>
            </>
          )}
        </div>
        
        <div className="bm-header-title-row">
          <div>
            <h1 className="bm-page-title">{isAddingCustomer ? 'Add New Customer' : 'Customer Management'}</h1>
            {!isAddingCustomer && (
              <>
                <div className="bm-ornate-divider">
                   <span className="bm-divider-line"></span>
                   <span className="bm-divider-icon">⚜</span>
                   <span className="bm-divider-line"></span>
                </div>
                <p className="bm-page-subtitle">Manage and organize your customers.</p>
              </>
            )}
            {isAddingCustomer && <p style={{ fontSize: '13px', color: '#4b5563', margin: '4px 0 0 0' }}>Create a new customer account and add customer details.</p>}
          </div>
          {isAddingCustomer ? (
            <button className="cm-btn-outline-action" onClick={() => setIsAddingCustomer(false)}>
              <ArrowLeft size={16} /> Back to Customers
            </button>
          ) : (
            <button className="bm-btn-add" onClick={() => setIsAddingCustomer(true)}>
              <Plus size={16} /> Add Customer
            </button>
          )}
        </div>
      </div>

      {!isAddingCustomer ? (
        <>
      {/* Stat Cards */}
      <div className="cm-stats-grid">
        <div className="cm-stat-card">
          <div className="cm-stat-icon users"><Users size={24} /></div>
          <div className="cm-stat-info">
            <span className="cm-stat-title">Total Customers</span>
            <h2 className="cm-stat-value">12,450</h2>
            <div className="cm-stat-trend up">
              <span>↗ 12.5%</span> <span className="cm-stat-trend-text">from last month</span>
            </div>
          </div>
        </div>
        <div className="cm-stat-card">
          <div className="cm-stat-icon active"><UserCheck size={24} /></div>
          <div className="cm-stat-info">
            <span className="cm-stat-title">Active Customers</span>
            <h2 className="cm-stat-value">10,820</h2>
            <div className="cm-stat-trend up">
              <span>↗ 8.3%</span> <span className="cm-stat-trend-text">from last month</span>
            </div>
          </div>
        </div>
        <div className="cm-stat-card">
          <div className="cm-stat-icon inactive"><UserMinus size={24} /></div>
          <div className="cm-stat-info">
            <span className="cm-stat-title">Inactive Customers</span>
            <h2 className="cm-stat-value">1,230</h2>
            <div className="cm-stat-trend down">
              <span>↘ 4.1%</span> <span className="cm-stat-trend-text">from last month</span>
            </div>
          </div>
        </div>
        <div className="cm-stat-card">
          <div className="cm-stat-icon new"><UserPlus size={24} /></div>
          <div className="cm-stat-info">
            <span className="cm-stat-title">New Customers</span>
            <h2 className="cm-stat-value">400</h2>
            <div className="cm-stat-trend up">
              <span>↗ 15.2%</span> <span className="cm-stat-trend-text">from last month</span>
            </div>
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
                <select><option>All Status</option></select>
              </div>
              <div className="cm-filter-dropdown">
                <span>Sort By</span>
                <select><option>Newest</option></select>
              </div>
              <button className="cm-btn-outline"><Filter size={16} /> Filters</button>
              <button className="cm-btn-clear"><RotateCcw size={16} /> Clear Filters</button>
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
                {mockCustomers.map(customer => (
                  <tr key={customer.id} onClick={() => setSelectedCustomer(customer)} style={{ cursor: 'pointer', background: selectedCustomer?.id === customer.id ? '#fdfaf6' : 'transparent' }}>
                    <td><input type="checkbox" onClick={(e) => e.stopPropagation()} /></td>
                    <td className="customer-cell">
                      <img src={customer.avatar} alt="" className="cm-avatar" />
                      <div>
                        <div className="cm-customer-name">{customer.name}</div>
                        <div className="cm-customer-id">{customer.id}</div>
                      </div>
                    </td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.orders}</td>
                    <td>{customer.totalSpent}</td>
                    <td>{customer.joined}</td>
                    <td><span className={`cm-tag ${customer.status.toLowerCase()}`}>{customer.status}</span></td>
                    <td><button className="cm-action-btn" onClick={(e) => e.stopPropagation()}><MoreVertical size={16} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cm-pagination">
            <div className="cm-page-info">Showing 1 to 7 of 12450 customers</div>
            <div className="cm-page-controls">
              <button className="cm-page-btn"><ChevronLeft size={16} /></button>
              <button className="cm-page-btn active">1</button>
              <button className="cm-page-btn">2</button>
              <button className="cm-page-btn">3</button>
              <button className="cm-page-btn ellipsis">...</button>
              <button className="cm-page-btn">1245</button>
              <button className="cm-page-btn"><ChevronRight size={16} /></button>
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
                  {selectedCustomer.id} &bull; Joined {selectedCustomer.joined}
                </div>
              </div>
              <button className="cm-close-btn" onClick={() => setSelectedCustomer(null)}><X size={20} /></button>
            </div>

            <div className="cm-profile-contact">
              <img src={selectedCustomer.avatar} alt="" className="cm-profile-avatar" />
              <div className="cm-contact-list">
                <div className="cm-contact-item"><Mail size={14} /> {selectedCustomer.email}</div>
                <div className="cm-contact-item"><Phone size={14} /> {selectedCustomer.phone}</div>
                <div className="cm-contact-item"><MapPin size={14} /> Chennai, Tamil Nadu</div>
              </div>
            </div>

            <div className="cm-profile-stats">
              <div className="cm-p-stat">
                <div className="cm-p-stat-value">{selectedCustomer.orders}</div>
                <div className="cm-p-stat-label">Total Orders</div>
              </div>
              <div className="cm-p-stat">
                <div className="cm-p-stat-value">10</div>
                <div className="cm-p-stat-label">Completed</div>
              </div>
              <div className="cm-p-stat">
                <div className="cm-p-stat-value">1</div>
                <div className="cm-p-stat-label">Pending</div>
              </div>
              <div className="cm-p-stat">
                <div className="cm-p-stat-value">{selectedCustomer.totalSpent}</div>
                <div className="cm-p-stat-label">Total Spent</div>
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
                No. 45, 2nd Street,<br />
                Anna Nagar West,<br />
                Chennai - 600040,<br />
                Tamil Nadu, India
              </div>
              <button className="cm-btn-block">View All Addresses</button>
            </div>

            <div className="cm-section-title">Actions</div>
            <div className="cm-actions-group">
              <button className="cm-btn-action"><Edit size={16} /> Edit Customer</button>
              <button className="cm-btn-action danger"><Ban size={16} /> Block Customer</button>
              <button className="cm-btn-action"><MessageSquare size={16} /> Send Message</button>
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
                      <input type="text" className="cm-input" placeholder="Enter full name" />
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">Email Address <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Mail size={16} className="cm-input-icon" />
                      <input type="email" className="cm-input" placeholder="Enter email address" />
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">Phone Number <span className="req">*</span></label>
                    <div className="cm-phone-input">
                      <div className="cm-phone-prefix">
                        <span>🇮🇳</span> <ChevronDown size={14} /> +91
                      </div>
                      <input type="text" placeholder="Enter phone number" />
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
                      <input type="text" className="cm-input" placeholder="Enter address line 1" />
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
                      <select className="cm-select"><option>Select country</option></select>
                    </div>
                  </div>
                  <div className="cm-form-group">
                    <label className="cm-label">State <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Map size={16} className="cm-input-icon" />
                      <select className="cm-select"><option>Select state</option></select>
                    </div>
                  </div>

                  <div className="cm-form-group">
                    <label className="cm-label">City <span className="req">*</span></label>
                    <div className="cm-input-wrapper with-icon">
                      <Home size={16} className="cm-input-icon" />
                      <select className="cm-select"><option>Select city</option></select>
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
                      <input type="text" className="cm-input" placeholder="Enter pincode" />
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
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a' }}></div>
                    </div>
                    <select className="cm-select"><option>Active</option></select>
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
          <div className="cm-card">
            <div className="cm-card-title">
              <div className="cm-card-title-icon"><UserCheck size={18} /></div>
              Profile & Verification
            </div>
            
            <div className="cm-form-row-3" style={{ alignItems: 'flex-start' }}>
              <div className="cm-form-group">
                <label className="cm-label">Profile Picture (Optional)</label>
                <div className="cm-upload-section">
                  <div className="cm-upload-box">
                    <div className="cm-upload-icon-wrapper"><UploadCloud size={20} /></div>
                    <div className="cm-upload-text">
                      <b>Drag & drop image</b> here<br/>or click to browse<br/><p>PNG, JPG or WEBP (Max 2MB)</p>
                    </div>
                  </div>
                  <div className="cm-avatar-preview"><User size={32} /></div>
                </div>
              </div>

              <div className="cm-form-group">
                <label className="cm-label">Email Verified</label>
                <div className="cm-radio-group">
                  <label className="cm-radio-label"><input type="radio" name="email-ver" defaultChecked /> Verified</label>
                  <label className="cm-radio-label"><input type="radio" name="email-ver" /> Not Verified</label>
                </div>
                <label className="cm-label" style={{ marginTop: '16px' }}>Phone Verified</label>
                <div className="cm-radio-group">
                  <label className="cm-radio-label"><input type="radio" name="phone-ver" defaultChecked /> Verified</label>
                  <label className="cm-radio-label"><input type="radio" name="phone-ver" /> Not Verified</label>
                </div>
              </div>

              <div className="cm-form-group" style={{ alignSelf: 'flex-start' }}>
                <label className="cm-label">SMS/Email Notifications</label>
                <div style={{ marginTop: '16px' }}>
                  <label className="cm-toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="cm-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="cm-action-footer">
            <button className="cm-btn-outline-action" style={{ color: '#b88645', borderColor: '#e0d5c1', background: '#fdfaf6' }}>
              <RefreshCw size={16} /> Reset
            </button>
            <div className="cm-footer-right">
              <button className="cm-btn-outline-action" style={{ color: '#b88645', borderColor: '#e0d5c1', background: '#fff' }}>
                <Plus size={16} /> Save & Add Another
              </button>
              <button className="cm-btn-primary-action">
                <Save size={16} /> Save Customer
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
