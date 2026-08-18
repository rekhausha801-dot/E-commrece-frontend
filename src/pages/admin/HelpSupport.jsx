import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, FileText, Mail, Phone, Clock, Send, Paperclip, ArrowRight, Ticket, Users, User, MessageSquare, AlertCircle, CheckCircle2, MoreVertical, Edit, Trash2, Eye, FileDigit, Settings as SettingsIcon, BookOpen, ExternalLink, Video, Truck, RotateCcw, Package } from 'lucide-react';
import { Dropdown, Modal, message } from 'antd';

const mockTickets = [
  { id: 'TKT-1042', customer: 'Sarah Jenkins', subject: 'Order not received', category: 'Shipping', priority: 'High', status: 'Open', date: 'Aug 17, 2026', admin: 'Unassigned' },
  { id: 'TKT-1041', customer: 'Michael Chen', subject: 'Refund request for defective item', category: 'Returns', priority: 'Medium', status: 'Pending', date: 'Aug 16, 2026', admin: 'Admin User' },
  { id: 'TKT-1040', customer: 'Emma Watson', subject: 'Cannot apply coupon code', category: 'Payment', priority: 'Low', status: 'Resolved', date: 'Aug 15, 2026', admin: 'Super Admin' },
  { id: 'TKT-1039', customer: 'David Smith', subject: 'Account locked out', category: 'Account', priority: 'Critical', status: 'Escalated', date: 'Aug 14, 2026', admin: 'Super Admin' },
];

const mockFaqs = [
  { id: 1, question: 'How long does shipping take?', category: 'Shipping', status: 'Active', order: 1 },
  { id: 2, question: 'What is your return policy?', category: 'Returns', status: 'Active', order: 2 },
  { id: 3, question: 'Do you offer international shipping?', category: 'Shipping', status: 'Draft', order: 3 },
  { id: 4, question: 'How can I track my order?', category: 'Orders', status: 'Active', order: 4 },
];

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('Help Center');
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketSearchTerm, setTicketSearchTerm] = useState('');
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
  const [faqFormMode, setFaqFormMode] = useState('add');

  const [isArticleFormVisible, setIsArticleFormVisible] = useState(false);
  const [articleFormMode, setArticleFormMode] = useState('add');

  const [isTicketReplyVisible, setIsTicketReplyVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  const handleExport = () => {
    message.loading({ content: 'Exporting data...', key: 'export' });
    setTimeout(() => message.success({ content: 'Export completed successfully!', key: 'export' }), 1000);
  };

  const handleTicketAction = (action, ticketId) => {
    if (action === 'view') {
      setSelectedTicket(ticketId);
      setIsTicketReplyVisible(true);
    } else {
      message.info(`Action '${action}' triggered for ticket ${ticketId}`);
    }
  };

  const handleAddFAQ = () => {
    setFaqFormMode('add');
    setIsFaqModalVisible(true);
  };

  const handleEdit = (itemType, id) => {
    if (itemType === 'FAQ') {
      setFaqFormMode('edit');
      setIsFaqModalVisible(true);
    } else if (itemType === 'Article') {
      setArticleFormMode('edit');
      setIsArticleFormVisible(true);
    }
  };

  const handleDelete = (itemType, id) => {
    Modal.confirm({
      title: `Delete ${itemType}?`,
      content: 'Are you sure you want to delete this? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: () => message.success(`${itemType} deleted successfully!`)
    });
  };

  const handleViewGuide = (title) => {
    Modal.info({
      title: `Viewing Guide: ${title}`,
      content: 'This would open the interactive guide viewer or PDF display.',
      width: 600,
      okText: 'Close'
    });
  };

  const handleCreateArticle = () => {
    setArticleFormMode('add');
    setIsArticleFormVisible(true);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    message.loading({ content: 'Submitting request...', key: 'contact' });
    setTimeout(() => {
      message.success({ content: 'Support request sent successfully!', key: 'contact' });
    }, 1200);
  };
  
  const tabs = ['Help Center', 'Support Tickets', 'FAQs', 'Knowledge Base', 'Guides', 'Contact Support'];

  const renderStatusBadge = (status) => {
    let bg = '#f3f4f6', color = '#6b7280';
    if (status === 'Open' || status === 'Active') { bg = '#eff6ff'; color = '#3b82f6'; }
    if (status === 'Resolved' || status === 'Published') { bg = '#ecfdf5'; color = '#10b981'; }
    if (status === 'Pending' || status === 'Draft') { bg = '#fffbeb'; color = '#f59e0b'; }
    if (status === 'Escalated') { bg = '#fef2f2'; color = '#ef4444'; }
    
    return <span style={{ background: bg, color, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{status}</span>;
  };

  const renderPriorityBadge = (priority) => {
    let color = '#6b7280';
    if (priority === 'High') color = '#ef4444';
    if (priority === 'Critical') color = '#991b1b';
    if (priority === 'Medium') color = '#f59e0b';
    if (priority === 'Low') color = '#10b981';
    
    return <span style={{ color, fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={14} /> {priority}</span>;
  };

  return (
    <>
      <style>
        {`
          .premium-help-container { padding: 0 8px 32px 8px; max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; }
          .help-card { background: #fff; border-radius: 20px; border: 1px solid rgba(229, 231, 235, 0.5); box-shadow: 0 10px 30px rgba(0,0,0,0.02); overflow: hidden; transition: all 0.3s ease; }
          
          .search-input-wrapper:focus-within { box-shadow: 0 0 0 4px rgba(201, 160, 91, 0.1); border-color: #c9a05b; }
          
          .form-input { width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid #e5e7eb; font-size: 14px; outline: none; transition: all 0.2s ease; background: #fafafa; }
          .form-input:focus { border-color: #111827; background: #fff; box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.05); }
          
          .premium-btn { background: #111827; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(17, 24, 39, 0.15); }
          .premium-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(17, 24, 39, 0.2); background: #1f2937; }
          .premium-btn-outline { background: #fff; color: #374151; border: 1px solid #e5e7eb; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s ease; }
          .premium-btn-outline:hover { background: #f9fafb; border-color: #d1d5db; }

          .tab-nav { display: flex; gap: 8px; padding: 6px; background: #f3f4f6; border-radius: 14px; overflow-x: auto; margin-bottom: 8px; }
          .tab-btn { padding: 10px 16px; border-radius: 10px; font-size: 14px; font-weight: 600; color: #6b7280; border: none; background: transparent; cursor: pointer; transition: all 0.2s ease; white-space: nowrap; }
          .tab-btn:hover { color: #111827; }
          .tab-btn.active { background: #fff; color: #111827; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

          .stat-card { padding: 24px; border-radius: 16px; border: 1px solid #f3f4f6; display: flex; flex-direction: column; gap: 12px; transition: all 0.3s; }
          .stat-card:hover { border-color: #e5e7eb; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.03); }

          .grid-card { border: 1px solid #f3f4f6; border-radius: 16px; padding: 24px; transition: all 0.3s; cursor: pointer; background: #fff; }
          .grid-card:hover { border-color: rgba(201, 160, 91, 0.3); box-shadow: 0 8px 24px rgba(201,160,91,0.08); transform: translateY(-2px); }

          .support-info-card { background: linear-gradient(145deg, #fffcf8 0%, #fff 100%); border: 1px solid #eaddce; position: relative; overflow: hidden; }
          .support-info-card::before { content: ''; position: absolute; top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(201,160,91,0.1) 0%, rgba(255,255,255,0) 70%); border-radius: 50%; }

          .table-container { width: 100%; border-collapse: collapse; text-align: left; }
          .table-container th { padding: 16px 24px; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; background: #f9fafb; border-bottom: 1px solid #f3f4f6; }
          .table-container td { padding: 16px 24px; border-bottom: 1px solid #f3f4f6; font-size: 14px; color: #374151; }
          .table-row { transition: background 0.2s; }
          .table-row:hover { background: #f9fafb; }
        `}
      </style>
      
      <div className="premium-help-container">
        
        {/* Header & Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Help & Support</h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '15px', color: '#6b7280' }}>Manage customer support tickets, FAQs, and platform knowledge base.</p>
          </div>
          
          <div className="tab-nav">
            {tabs.map(tab => (
              <button 
                key={tab} 
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="help-card" style={{ padding: '32px' }}>
          
          {/* TAB: HELP CENTER (OVERVIEW) */}
          {activeTab === 'Help Center' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Premium Search Hero */}
              <div style={{ padding: '48px 32px', background: 'linear-gradient(135deg, #fffcf8 0%, #fff 100%)', borderRadius: '24px', border: '1px solid #eaddce', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(201,160,91,0.05)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(201,160,91,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(201,160,91,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}></div>
                
                <h3 style={{ margin: '0 0 16px 0', fontSize: '26px', fontWeight: '800', color: '#111827', letterSpacing: '-0.5px' }}>Find Support Resources</h3>
                <p style={{ margin: '0 0 28px 0', fontSize: '15px', color: '#6b7280' }}>Search across all customer tickets, FAQs, and system guides</p>
                
                <div className="search-input-wrapper" style={{ position: 'relative', maxWidth: '600px', margin: '0 auto', borderRadius: '30px', transition: 'all 0.3s' }}>
                  <Search size={20} color="#c9a05b" style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                  <input 
                    type="text" 
                    placeholder="Search for anything..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ 
                      width: '100%', padding: '18px 24px 18px 60px', borderRadius: '30px', 
                      border: '1px solid #eaddce', fontSize: '15px', color: '#111827',
                      outline: 'none', background: '#fff', boxShadow: '0 8px 24px rgba(201,160,91,0.08)',
                      transition: 'all 0.3s'
                    }} 
                  />
                </div>
              </div>

              {/* Premium Stat Cards OR Search Results */}
              {searchTerm.trim() === '' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#3b82f6' }}>
                        <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '14px' }}><Ticket size={22} /></div>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#475569' }}>Open Tickets</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>24</div>
                      <div style={{ color: '#10b981', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center' }}>+3 today</div>
                    </div>
                  </div>

                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fffbeb 100%)', border: '1px solid #fde68a' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#f59e0b' }}>
                        <div style={{ padding: '12px', background: '#fef3c7', borderRadius: '14px' }}><Clock size={22} /></div>
                        <span style={{ fontSize: '15px', fontWeight: '700', color: '#92400e' }}>Pending</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#78350f', lineHeight: '1' }}>12</div>
                      <div style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700' }}>In Review</div>
                    </div>
                  </div>

                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)', border: '1px solid #a7f3d0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981' }}>
                      <div style={{ padding: '12px', background: '#d1fae5', borderRadius: '14px' }}><CheckCircle2 size={22} /></div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#065f46' }}>Resolved</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#064e3b', lineHeight: '1' }}>148</div>
                      <div style={{ color: '#10b981', fontSize: '13px', fontWeight: '700' }}>92% rate</div>
                    </div>
                  </div>

                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)', border: '1px solid #fecaca' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
                      <div style={{ padding: '12px', background: '#fee2e2', borderRadius: '14px' }}><AlertCircle size={22} /></div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#991b1b' }}>Escalated</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#7f1d1d', lineHeight: '1' }}>3</div>
                      <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: '700' }}>Action req.</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>Search Results</h4>
                  
                  {mockTickets.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase())).map(ticket => (
                    <div key={ticket.id} className="help-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}><Ticket size={18} /></div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#111827', marginBottom: '2px' }}>{ticket.subject} <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 'normal', marginLeft: '8px' }}>{ticket.id}</span></div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>Ticket raised by {ticket.customer}</div>
                        </div>
                      </div>
                      <ChevronRight size={18} color="#9ca3af" />
                    </div>
                  ))}

                  {mockFaqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase())).map(faq => (
                    <div key={faq.id} className="help-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}><HelpCircle size={18} /></div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#111827', marginBottom: '2px' }}>{faq.question}</div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>FAQ in {faq.category}</div>
                        </div>
                      </div>
                      <ChevronRight size={18} color="#9ca3af" />
                    </div>
                  ))}

                  {mockTickets.filter(t => t.subject.toLowerCase().includes(searchTerm.toLowerCase()) || t.id.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && 
                   mockFaqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', background: '#f9fafb', borderRadius: '16px', border: '1px dashed #d1d5db' }}>
                      <Search size={32} color="#d1d5db" style={{ margin: '0 auto 12px auto' }} />
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#374151' }}>No results found</div>
                      <div style={{ fontSize: '14px' }}>Try adjusting your search term.</div>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB: SUPPORT TICKETS */}
          {activeTab === 'Support Tickets' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>Customer Support Tickets</h2>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      placeholder="Search tickets..." 
                      className="form-input" 
                      value={ticketSearchTerm}
                      onChange={(e) => setTicketSearchTerm(e.target.value)}
                      style={{ padding: '8px 16px 8px 36px', width: '250px' }} 
                    />
                  </div>
                  <button className="premium-btn-outline" onClick={handleExport}><FileText size={16} /> Export</button>
                </div>
              </div>
              
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', overflow: 'hidden' }}>
                <table className="table-container">
                  <thead>
                    <tr>
                      <th>Ticket ID</th>
                      <th>Customer</th>
                      <th>Subject & Category</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Admin</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTickets.filter(t => 
                      t.id.toLowerCase().includes(ticketSearchTerm.toLowerCase()) || 
                      t.subject.toLowerCase().includes(ticketSearchTerm.toLowerCase()) || 
                      t.customer.toLowerCase().includes(ticketSearchTerm.toLowerCase())
                    ).map(ticket => (
                      <tr key={ticket.id} className="table-row">
                        <td style={{ fontWeight: '600', color: '#111827' }}>{ticket.id}</td>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={14} color="#6b7280" /></div>
                          {ticket.customer}
                        </td>
                        <td>
                          <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{ticket.subject}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{ticket.category}</div>
                        </td>
                        <td>{renderPriorityBadge(ticket.priority)}</td>
                        <td>{renderStatusBadge(ticket.status)}</td>
                        <td style={{ color: '#6b7280' }}>{ticket.date}</td>
                        <td style={{ color: ticket.admin === 'Unassigned' ? '#9ca3af' : '#374151', fontStyle: ticket.admin === 'Unassigned' ? 'italic' : 'normal' }}>{ticket.admin}</td>
                        <td>
                          <Dropdown trigger={['click']} menu={{ items: [{ key: 'view', label: 'View / Reply', icon: <MessageSquare size={14} /> }, { key: 'assign', label: 'Assign Admin', icon: <Users size={14} /> }, { key: 'close', label: 'Close Ticket', icon: <CheckCircle2 size={14} /> }], onClick: ({ key }) => handleTicketAction(key, ticket.id) }}>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '4px' }}><MoreVertical size={16} /></button>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: FAQS */}
          {activeTab === 'FAQs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#111827' }}>FAQ Management</h2>
                <button className="premium-btn" onClick={handleAddFAQ}><FileText size={16} /> Add New FAQ</button>
              </div>
              
              <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', overflow: 'hidden' }}>
                <table className="table-container">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Question</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockFaqs.map(faq => (
                      <tr key={faq.id} className="table-row">
                        <td style={{ color: '#6b7280', fontWeight: '500' }}>#{faq.order}</td>
                        <td style={{ fontWeight: '500', color: '#111827', maxWidth: '300px' }}>{faq.question}</td>
                        <td style={{ color: '#4b5563' }}>{faq.category}</td>
                        <td>{renderStatusBadge(faq.status)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEdit('FAQ', faq.id)} style={{ background: '#f3f4f6', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}><Edit size={14} /></button>
                            <button onClick={() => handleDelete('FAQ', faq.id)} style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: KNOWLEDGE BASE */}
          {activeTab === 'Knowledge Base' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>Knowledge Base Articles</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { title: 'Getting Started', desc: 'Basics of using the platform.', icon: <BookOpen color="#c9a05b" /> },
                  { title: 'Orders & Shipping', desc: 'Managing fulfillment and delivery.', icon: <Truck color="#c9a05b" /> },
                  { title: 'Payments', desc: 'Payment gateways and transactions.', icon: <FileText color="#c9a05b" /> },
                  { title: 'Returns & Refunds', desc: 'Processing customer returns.', icon: <RotateCcw color="#c9a05b" /> },
                  { title: 'Coupons & Promos', desc: 'Creating discount campaigns.', icon: <Ticket color="#c9a05b" /> },
                  { title: 'Product Catalog', desc: 'Adding and editing inventory.', icon: <Package color="#c9a05b" /> },
                ].map((kb, i) => (
                  <div key={i} className="grid-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ width: '48px', height: '48px', background: '#fffdf7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {kb.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>{kb.title}</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>{kb.desc}</p>
                    </div>
                    <button 
                      onClick={() => { setSelectedCategory(kb.title); setIsManageModalVisible(true); }}
                      style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', alignSelf: 'flex-start', padding: 0, marginTop: 'auto' }}
                    >
                      Manage Articles <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GUIDES */}
          {activeTab === 'Guides' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#111827' }}>System Guides & Tutorials</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                  { title: 'Admin Panel Walkthrough', type: 'Video Tutorial', time: '10 mins' },
                  { title: 'Order Management Guide', type: 'Step-by-step PDF', time: '5 mins' },
                  { title: 'Reports & Analytics', type: 'Interactive Guide', time: '15 mins' },
                ].map((guide, i) => (
                  <div key={i} className="grid-card" onClick={() => handleViewGuide(guide.title)} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '64px', height: '64px', background: '#f9fafb', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e5e7eb' }}>
                      {guide.type.includes('Video') ? <Video size={24} color="#9ca3af" /> : <FileText size={24} color="#9ca3af" />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#111827' }}>{guide.title}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#6b7280' }}>
                        <span>{guide.type}</span> • <span>{guide.time}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} color="#9ca3af" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT SUPPORT */}
          {activeTab === 'Contact Support' && (
            <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ flex: '2', minWidth: '400px' }}>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={20} color="#c9a05b" /> Send a Request
                </h2>
                <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#6b7280' }}>Submit a ticket to the RelieTech platform developers for technical assistance.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Subject</label>
                    <input type="text" className="form-input" placeholder="Brief summary of your issue" />
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Category</label>
                      <select className="form-input" style={{ cursor: 'pointer' }}>
                        <option>Technical Issue</option>
                        <option>Account Issue</option>
                        <option>Feature Request</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Priority</label>
                      <select className="form-input" style={{ cursor: 'pointer' }}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                        <option>Critical</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Description</label>
                    <textarea className="form-input" placeholder="Describe your issue in detail..." rows="5" style={{ resize: 'vertical' }}></textarea>
                  </div>
                  <button onClick={handleContactSubmit} className="premium-btn" style={{ width: '100%', padding: '14px', fontSize: '14px' }}>
                    <Send size={16} /> Submit Request
                  </button>
                </div>
              </div>

              <div style={{ flex: '1', minWidth: '300px' }}>
                <div className="support-info-card" style={{ padding: '32px', borderRadius: '16px' }}>
                  <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '700', color: '#111827' }}>Dedicated Support</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(201,160,91,0.15)' }}>
                        <Mail size={20} color="#c9a05b" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Us</div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>support@relietech.com</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(201,160,91,0.15)' }}>
                        <Phone size={20} color="#c9a05b" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Call Us (Toll-Free)</div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>+1 (800) 123-4567</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(201,160,91,0.15)' }}>
                        <Clock size={20} color="#c9a05b" />
                      </div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Working Hours</div>
                        <div style={{ fontSize: '15px', fontWeight: '600', color: '#111827', marginTop: '2px' }}>24/7 Premium Support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Manage Articles Modal */}
      <Modal
        title={<div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>Manage Articles: {selectedCategory}</div>}
        open={isManageModalVisible}
        onCancel={() => setIsManageModalVisible(false)}
        footer={null}
        width={800}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', marginTop: '16px' }}>
          <div className="search-input-wrapper" style={{ position: 'relative', width: '300px' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Search articles..." className="form-input" style={{ padding: '8px 16px 8px 36px', borderRadius: '8px' }} />
          </div>
          <button className="premium-btn" onClick={handleCreateArticle}><FileText size={16} /> Create New Article</button>
        </div>
        
        <div style={{ border: '1px solid #f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
          <table className="table-container">
            <thead>
              <tr>
                <th>Article Title</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-row">
                <td style={{ fontWeight: '500', color: '#111827' }}>Introduction to {selectedCategory}</td>
                <td>{renderStatusBadge('Published')}</td>
                <td style={{ color: '#6b7280' }}>Aug 17, 2026</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit('Article', 'Intro')} style={{ background: '#f3f4f6', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}><Edit size={14} /></button>
                    <button onClick={() => handleDelete('Article', 'Intro')} style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
              <tr className="table-row">
                <td style={{ fontWeight: '500', color: '#111827' }}>Advanced settings for {selectedCategory}</td>
                <td>{renderStatusBadge('Draft')}</td>
                <td style={{ color: '#6b7280' }}>Aug 15, 2026</td>
                <td>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleEdit('Article', 'Advanced')} style={{ background: '#f3f4f6', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}><Edit size={14} /></button>
                    <button onClick={() => handleDelete('Article', 'Advanced')} style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* FAQ Form Modal */}
      <Modal
        title={<div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>{faqFormMode === 'add' ? 'Add New FAQ' : 'Edit FAQ'}</div>}
        open={isFaqModalVisible}
        onCancel={() => setIsFaqModalVisible(false)}
        footer={null}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Question</label>
            <input type="text" className="form-input" placeholder="e.g. How long does shipping take?" defaultValue={faqFormMode === 'edit' ? 'Sample Question?' : ''} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Answer</label>
            <textarea className="form-input" rows="4" placeholder="Provide the detailed answer here..."></textarea>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Category</label>
              <select className="form-input">
                <option>Shipping</option>
                <option>Returns</option>
                <option>Orders</option>
                <option>Payment</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Status</label>
              <select className="form-input">
                <option>Active</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
          <button className="premium-btn" style={{ width: '100%', marginTop: '8px' }} onClick={() => { message.success(`FAQ ${faqFormMode === 'add' ? 'created' : 'updated'} successfully!`); setIsFaqModalVisible(false); }}>
            <CheckCircle2 size={16} /> Save FAQ
          </button>
        </div>
      </Modal>

      {/* Article Form Modal */}
      <Modal
        title={<div style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>{articleFormMode === 'add' ? 'Create New Article' : 'Edit Article'}</div>}
        open={isArticleFormVisible}
        onCancel={() => setIsArticleFormVisible(false)}
        footer={null}
        width={700}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Article Title</label>
            <input type="text" className="form-input" placeholder="e.g. How to manage your orders" defaultValue={articleFormMode === 'edit' ? 'Introduction to Category' : ''} />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Category</label>
              <input type="text" className="form-input" value={selectedCategory || ''} disabled style={{ background: '#f3f4f6' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Status</label>
              <select className="form-input">
                <option>Published</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Content</label>
            <textarea className="form-input" rows="8" placeholder="Write your article content here... HTML is supported."></textarea>
          </div>
          <button className="premium-btn" style={{ width: '100%', marginTop: '8px' }} onClick={() => { message.success(`Article ${articleFormMode === 'add' ? 'published' : 'updated'} successfully!`); setIsArticleFormVisible(false); }}>
            <CheckCircle2 size={16} /> Publish Article
          </button>
        </div>
      </Modal>

      {/* Ticket Reply Modal */}
      <Modal
        title={<div style={{ fontSize: '18px', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}><Ticket size={20} color="#3b82f6" /> Reply to Ticket {selectedTicket}</div>}
        open={isTicketReplyVisible}
        onCancel={() => setIsTicketReplyVisible(false)}
        footer={null}
        width={650}
      >
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ fontWeight: '600', color: '#111827' }}>Customer</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Aug 17, 2026 - 10:30 AM</div>
            </div>
            <div style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
              Hello, I haven't received my order yet. Could you please check the tracking status for me?
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Your Reply</label>
            <textarea className="form-input" rows="5" placeholder="Type your response here..."></textarea>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '500' }}>
                <Paperclip size={16} /> Attach File
              </button>
            </div>
            <button className="premium-btn" onClick={() => { message.success('Reply sent successfully!'); setIsTicketReplyVisible(false); }}>
              <Send size={16} /> Send Reply
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default HelpSupport;
