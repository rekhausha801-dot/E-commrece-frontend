import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, HelpCircle, FileText, Mail, Phone, Clock, Send, Paperclip, ArrowRight, Ticket, Users, User, MessageSquare, AlertCircle, CheckCircle2, MoreVertical, Edit, Trash2, Eye, FileDigit, Settings as SettingsIcon, BookOpen, ExternalLink, Video, Truck, RotateCcw, Package } from 'lucide-react';
import { Dropdown, Modal, message } from 'antd';
import { getFAQs, deleteFAQ, getAdminTickets, createFAQ, updateFAQ, resolveTicket, updateTicketStatus } from '../../services/api';





const HelpSupport = () => {
  const [faqs, setFaqs] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [activeTab, setActiveTab] = useState('Help Center');
  const [searchTerm, setSearchTerm] = useState('');
  const [ticketSearchTerm, setTicketSearchTerm] = useState('');
  const [isManageModalVisible, setIsManageModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [isFaqModalVisible, setIsFaqModalVisible] = useState(false);
  const [faqFormMode, setFaqFormMode] = useState('add');
  const [currentFaqId, setCurrentFaqId] = useState(null);
  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: '',
    category: 'Shipping',
    status: 'active'
  });

  const [isArticleFormVisible, setIsArticleFormVisible] = useState(false);
  const [articleFormMode, setArticleFormMode] = useState('add');

  const [isTicketReplyVisible, setIsTicketReplyVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');

  const fetchData = async () => {
    try {
      const [faqsRes, ticketsRes] = await Promise.all([
        getFAQs(),
        getAdminTickets()
      ]);
      setFaqs(faqsRes.data.data || faqsRes.data || []);
      setTickets(ticketsRes.data.data || ticketsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Failed to load support data');
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);
  
  const handleExport = () => {
    message.loading({ content: 'Exporting data...', key: 'export' });
    setTimeout(() => message.success({ content: 'Export completed successfully!', key: 'export' }), 1000);
  };

  const handleTicketAction = async (action, ticket) => {
    if (action === 'view') {
      if ((ticket.status || '').toLowerCase() === 'open') {
        try {
          await updateTicketStatus(ticket._id, 'pending');
          ticket.status = 'pending';
        } catch (e) {
          console.error('Failed to update status to pending', e);
        }
      }
      setSelectedTicket(ticket);
      setReplyText('');
      setIsTicketReplyVisible(true);
    } else if (action === 'close') {
      Modal.confirm({
        title: 'Close Ticket',
        content: 'Are you sure you want to resolve this ticket?',
        onOk: async () => {
          try {
            await updateTicketStatus(ticket._id, 'resolved');
            message.success('Ticket marked as resolved');
            fetchData();
          } catch (e) {
            message.error('Failed to update status');
          }
        }
      });
    } else {
      message.info(`Action '${action}' triggered for ticket ${ticket.ticketNumber || ticket._id}`);
    }
  };

  const handleTicketReply = async () => {
    if (!replyText.trim()) return message.warning('Please enter a reply');
    try {
      await resolveTicket(selectedTicket._id, { resolution: replyText });
      message.success('Ticket resolved and reply sent successfully!');
      setIsTicketReplyVisible(false);
      setReplyText('');
      fetchData();
    } catch (error) {
      console.error('Error resolving ticket:', error);
      message.error('Failed to send reply');
    }
  };

  const handleAddFAQ = () => {
    setFaqFormMode('add');
    setCurrentFaqId(null);
    setFaqFormData({ question: '', answer: '', category: 'Shipping', status: 'active' });
    setIsFaqModalVisible(true);
  };

  const handleEdit = (itemType, item) => {
    if (itemType === 'FAQ') {
      setFaqFormMode('edit');
      setCurrentFaqId(item._id);
      setFaqFormData({
        question: item.question || '',
        answer: item.answer || '',
        category: item.category || 'Shipping',
        status: item.status || 'active'
      });
      setIsFaqModalVisible(true);
    } else if (itemType === 'Article') {
      setArticleFormMode('edit');
      setIsArticleFormVisible(true);
    }
  };

  const handleFaqSubmit = async () => {
    if (!faqFormData.question || !faqFormData.answer) {
      return message.warning('Please fill in all required fields.');
    }
    
    try {
      if (faqFormMode === 'add') {
        await createFAQ(faqFormData);
        message.success('FAQ created successfully!');
      } else {
        await updateFAQ(currentFaqId, faqFormData);
        message.success('FAQ updated successfully!');
      }
      setIsFaqModalVisible(false);
      fetchData();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      message.error(`Failed to ${faqFormMode} FAQ.`);
    }
  };

  const handleDelete = (itemType, id) => {
    Modal.confirm({
      title: `Delete ${itemType}?`,
      content: 'Are you sure you want to delete this? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        if (itemType === 'FAQ') {
          try {
            await deleteFAQ(id);
            message.success(`${itemType} deleted successfully!`);
            fetchData();
          } catch (error) {
            console.error('Error deleting FAQ:', error);
            message.error(`Failed to delete ${itemType}.`);
          }
        } else {
          message.success(`${itemType} deleted successfully!`);
        }
      }
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
  
  const tabs = ['Help Center', 'Support Tickets', 'FAQs'];

  const renderStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    let bg = '#f3f4f6', color = '#6b7280';
    let text = status || 'Unknown';
    if (s === 'open' || s === 'active') { bg = '#eff6ff'; color = '#3b82f6'; text = s === 'active' ? 'Active' : 'Open'; }
    if (s === 'resolved' || s === 'published') { bg = '#ecfdf5'; color = '#10b981'; text = s === 'published' ? 'Published' : 'Resolved'; }
    if (s === 'pending' || s === 'draft') { bg = '#fffbeb'; color = '#f59e0b'; text = s === 'draft' ? 'Draft' : 'Pending'; }
    if (s === 'escalated') { bg = '#fef2f2'; color = '#ef4444'; text = 'Escalated'; }
    
    return <span style={{ background: bg, color, padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'capitalize' }}>{text}</span>;
  };

  const renderPriorityBadge = (priority) => {
    const p = (priority || '').toLowerCase();
    let color = '#6b7280';
    if (p === 'high' || p === 'urgent') color = '#ef4444';
    if (p === 'critical') color = '#991b1b';
    if (p === 'medium') color = '#f59e0b';
    if (p === 'low') color = '#10b981';
    
    return <span style={{ color, fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'capitalize' }}><AlertCircle size={14} /> {priority || 'None'}</span>;
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
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>{tickets.filter(t => (t.status || '').toLowerCase() === 'open').length}</div>
                      <div style={{ color: '#10b981', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center' }}>Live</div>
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
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#78350f', lineHeight: '1' }}>{tickets.filter(t => (t.status || '').toLowerCase() === 'pending').length}</div>
                      <div style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700' }}>In Review</div>
                    </div>
                  </div>

                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)', border: '1px solid #a7f3d0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#10b981' }}>
                      <div style={{ padding: '12px', background: '#d1fae5', borderRadius: '14px' }}><CheckCircle2 size={22} /></div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#065f46' }}>Resolved</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#064e3b', lineHeight: '1' }}>{tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length}</div>
                      <div style={{ color: '#10b981', fontSize: '13px', fontWeight: '700' }}>{tickets.length > 0 ? Math.round((tickets.filter(t => (t.status || '').toLowerCase() === 'resolved').length / tickets.length) * 100) : 0}% rate</div>
                    </div>
                  </div>

                  <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)', border: '1px solid #fecaca' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
                      <div style={{ padding: '12px', background: '#fee2e2', borderRadius: '14px' }}><AlertCircle size={22} /></div>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#991b1b' }}>Escalated</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div style={{ fontSize: '40px', fontWeight: '800', color: '#7f1d1d', lineHeight: '1' }}>{tickets.filter(t => (t.status || '').toLowerCase() === 'escalated').length}</div>
                      <div style={{ color: '#ef4444', fontSize: '13px', fontWeight: '700' }}>Action req.</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#374151' }}>Search Results</h4>
                  
                  {tickets.filter(t => (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) || (t.ticketId || t._id || '').toLowerCase().includes(searchTerm.toLowerCase())).map(ticket => (
                    <div key={ticket._id} className="help-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6' }}><Ticket size={18} /></div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#111827', marginBottom: '2px' }}>{ticket.subject} <span style={{ color: '#9ca3af', fontSize: '13px', fontWeight: 'normal', marginLeft: '8px' }}>{ticket.ticketId || ticket._id.substring(0, 8)}</span></div>
                          <div style={{ fontSize: '13px', color: '#6b7280' }}>Ticket raised by {ticket.userId?.name || 'Customer'}</div>
                        </div>
                      </div>
                      <ChevronRight size={18} color="#9ca3af" />
                    </div>
                  ))}

                  {faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase())).map(faq => (
                    <div key={faq._id} className="help-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #e5e7eb' }}>
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

                  {tickets.filter(t => (t.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) || (t.ticketId || t._id || '').toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && 
                   faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
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
                    {tickets.filter(t => 
                      (t.ticketId || t._id || '').toLowerCase().includes(ticketSearchTerm.toLowerCase()) || 
                      (t.subject || '').toLowerCase().includes(ticketSearchTerm.toLowerCase()) || 
                      (t.userId?.name || '').toLowerCase().includes(ticketSearchTerm.toLowerCase())
                    ).map(ticket => (
                      <tr key={ticket._id} className="table-row">
                        <td style={{ fontWeight: '600', color: '#111827' }}>{ticket.ticketId || ticket._id.substring(0, 8)}</td>
                        <td style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={14} color="#6b7280" /></div>
                          {ticket.userId?.name || 'Customer'}
                        </td>
                        <td>
                          <div style={{ fontWeight: '500', color: '#111827', marginBottom: '4px' }}>{ticket.subject}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{ticket.category}</div>
                        </td>
                        <td>{renderPriorityBadge(ticket.priority)}</td>
                        <td>{renderStatusBadge(ticket.status)}</td>
                        <td style={{ color: '#6b7280' }}>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                        <td style={{ color: !ticket.assignedTo ? '#9ca3af' : '#374151', fontStyle: !ticket.assignedTo ? 'italic' : 'normal' }}>{ticket.assignedTo?.name || 'Unassigned'}</td>
                        <td>
                          <Dropdown trigger={['click']} menu={{ items: [{ key: 'view', label: 'View / Reply', icon: <MessageSquare size={14} /> }, { key: 'assign', label: 'Assign Admin', icon: <Users size={14} /> }, { key: 'close', label: 'Close Ticket', icon: <CheckCircle2 size={14} /> }], onClick: ({ key }) => handleTicketAction(key, ticket) }}>
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
                    {faqs.map((faq, idx) => (
                      <tr key={faq._id} className="table-row">
                        <td style={{ color: '#6b7280', fontWeight: '500' }}>#{idx + 1}</td>
                        <td style={{ fontWeight: '500', color: '#111827', maxWidth: '300px' }}>{faq.question}</td>
                        <td style={{ color: '#4b5563' }}>{faq.category}</td>
                        <td>{renderStatusBadge(faq.status || 'Active')}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => handleEdit('FAQ', faq)} style={{ background: '#f3f4f6', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#374151' }}><Edit size={14} /></button>
                            <button onClick={() => handleDelete('FAQ', faq._id)} style={{ background: '#fef2f2', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <input type="text" className="form-input" placeholder="e.g. How long does shipping take?" value={faqFormData.question} onChange={(e) => setFaqFormData({...faqFormData, question: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Answer</label>
            <textarea className="form-input" rows="4" placeholder="Provide the detailed answer here..." value={faqFormData.answer} onChange={(e) => setFaqFormData({...faqFormData, answer: e.target.value})}></textarea>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Category</label>
              <select className="form-input" value={faqFormData.category} onChange={(e) => setFaqFormData({...faqFormData, category: e.target.value})}>
                <option value="Shipping">Shipping</option>
                <option value="Returns">Returns</option>
                <option value="Orders">Orders</option>
                <option value="Payment">Payment</option>
                <option value="Account">Account</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Status</label>
              <select className="form-input" value={faqFormData.status} onChange={(e) => setFaqFormData({...faqFormData, status: e.target.value})}>
                <option value="active">Active</option>
                <option value="inactive">Draft / Inactive</option>
              </select>
            </div>
          </div>
          <button className="premium-btn" style={{ width: '100%', marginTop: '8px' }} onClick={handleFaqSubmit}>
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
        title={<div style={{ fontSize: '18px', fontWeight: '700', color: '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}><Ticket size={20} color="#3b82f6" /> Reply to Ticket {selectedTicket?.ticketNumber || selectedTicket?._id?.substring(0, 8)}</div>}
        open={isTicketReplyVisible}
        onCancel={() => setIsTicketReplyVisible(false)}
        footer={null}
        width={650}
      >
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ fontWeight: '600', color: '#111827' }}>{selectedTicket?.customerName || selectedTicket?.userId?.name || 'Customer'}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{selectedTicket && new Date(selectedTicket.createdAt).toLocaleString()}</div>
            </div>
            <div style={{ color: '#111827', fontSize: '15px', fontWeight: '600', marginBottom: '8px' }}>
              {selectedTicket?.subject}
            </div>
            <div style={{ color: '#374151', fontSize: '14px', lineHeight: '1.5' }}>
              {selectedTicket?.description || "No description provided."}
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginBottom: '8px' }}>Your Reply / Resolution</label>
            <textarea className="form-input" rows="5" placeholder="Type your response here... this will resolve the ticket." value={replyText} onChange={(e) => setReplyText(e.target.value)}></textarea>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '500' }}>
                <Paperclip size={16} /> Attach File
              </button>
            </div>
            <button className="premium-btn" onClick={handleTicketReply}>
              <Send size={16} /> Resolve & Send Reply
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default HelpSupport;
