import React, { useState, useEffect } from 'react';
import './Support.css';
import { 
  ChevronRight, ChevronDown, Headset, Grid, Package, 
  CreditCard, RotateCcw, Truck, User, Sparkles, MoreHorizontal,
  MessageCircleQuestion, ArrowLeft
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { contactSupport, getFAQs, getCustomerTickets } from '../../services/api';
import { message } from 'antd';
import { X } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = useState(null); 
  const [activeTab, setActiveTab] = useState('faqs');
  const [myTickets, setMyTickets] = useState([]);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);

  const fetchMyTickets = async () => {
    try {
      setIsLoadingTickets(true);
      const response = await getCustomerTickets();
      setMyTickets(response.data.data || []);
    } catch (error) {
      console.error("Failed to fetch tickets:", error);
    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'tickets') {
      fetchMyTickets();
    }
  }, [activeTab]);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({ subject: '', category: 'Technical', priority: 'low', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    if (!ticketData.subject || !ticketData.description) return message.warning('Please fill in all required fields.');
    try {
      setIsSubmitting(true);
      await contactSupport(ticketData);
      message.success('Support ticket created successfully! Our team will contact you soon.');
      setIsContactModalOpen(false);
      setTicketData({ subject: '', category: 'Technical', priority: 'low', description: '' });
    } catch (error) {
      if (error.response?.status === 401) {
        message.error('Please log in to submit a support ticket.');
      } else {
        message.error(error.response?.data?.message || 'Failed to submit ticket.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const [faqs, setFaqs] = useState([]);
  const [isLoadingFaqs, setIsLoadingFaqs] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getFAQs();
        if (response.data && response.data.data) {
          setFaqs(response.data.data);
          if (response.data.data.length > 0) {
            setExpandedQuestion(response.data.data[0]._id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      } finally {
        setIsLoadingFaqs(false);
      }
    };
    fetchFAQs();
  }, []);

  const toggleQuestion = (id) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };

  return (
    <div className="faq-page-wrapper">
      
      {/* Header Section */}
      <div className="faq-hero-section">
        <div className="faq-breadcrumb">
          <Link to="/">Home</Link> <ChevronRight size={14} /> 
          <span>Help Center</span> <ChevronRight size={14} /> 
          <span className="current">FAQs</span>
        </div>
        
        <div className="faq-hero-content">
          <div className="faq-hero-text">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions<br/>related to our services</p>
          </div>
          
          <div className="faq-hero-graphics">
            {/* The blue question mark bubble and other shapes */}
            <div className="graphic-bubble blue-bubble">
              <span className="question-mark">?</span>
            </div>
            <div className="graphic-bubble small-dot"></div>
            <div className="graphic-bubble dots-bubble">
              <span>...</span>
            </div>
            <div className="graphic-bubble yellow-bubble"></div>
            <div className="graphic-bubble rectangle rect-1"></div>
            <div className="graphic-bubble rectangle rect-2"></div>
          </div>
        </div>
      </div>

      <div className="faq-main-container" style={{ flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto 24px', display: 'flex', gap: '24px', borderBottom: '1px solid #e5e7eb' }}>
          <button 
            onClick={() => setActiveTab('faqs')}
            style={{ background: 'none', border: 'none', padding: '12px 16px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', color: activeTab === 'faqs' ? '#C89953' : '#6b7280', borderBottom: activeTab === 'faqs' ? '2px solid #C89953' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.2s' }}
          >
            FAQs
          </button>
          <button 
            onClick={() => setActiveTab('tickets')}
            style={{ background: 'none', border: 'none', padding: '12px 16px', cursor: 'pointer', fontSize: '16px', fontWeight: '600', color: activeTab === 'tickets' ? '#C89953' : '#6b7280', borderBottom: activeTab === 'tickets' ? '2px solid #C89953' : '2px solid transparent', marginBottom: '-1px', transition: 'all 0.2s' }}
          >
            My Support Tickets
          </button>
        </div>

        {/* Content Area */}
        <div className="faq-content-area">
          {activeTab === 'faqs' ? (
          <div className="faq-list-card">
            <div className="faq-list-header">
              <span className="faq-count">{faqs.length} Questions</span>
            </div>
            
            <div className="faq-list">
              {isLoadingFaqs ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Loading FAQs...</div>
              ) : faqs.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>No FAQs available.</div>
              ) : (
                faqs.map((faq, index) => (
                  <div 
                    key={faq._id} 
                    className={`faq-item ${expandedQuestion === faq._id ? 'expanded' : ''}`}
                  >
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleQuestion(faq._id)}
                    >
                      <span className="faq-question-text">{index + 1}. {faq.question}</span>
                      {expandedQuestion === faq._id ? (
                        <ChevronDown size={20} className="faq-toggle-icon" />
                      ) : (
                        <ChevronDown size={20} className="faq-toggle-icon closed" style={{ transform: 'rotate(-90deg)' }} />
                      )}
                    </button>
                    
                    {expandedQuestion === faq._id && (
                      <div className="faq-answer">
                        {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="faq-list-card" style={{ padding: '24px' }}>
              <h3 style={{ marginTop: 0, marginBottom: '24px', fontSize: '18px', color: '#111827' }}>My Support Tickets</h3>
              {isLoadingTickets ? (
                <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Loading tickets...</div>
              ) : myTickets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
                  <Package size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
                  <div>You haven't submitted any tickets yet.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {myTickets.map(ticket => (
                    <div key={ticket._id} style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', background: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '600', fontSize: '16px', color: '#111827' }}>{ticket.subject}</span>
                        <span style={{ background: ticket.status === 'resolved' ? '#dcfce7' : ticket.status === 'pending' ? '#fef9c3' : ticket.status === 'escalated' ? '#fee2e2' : '#dbeafe', color: ticket.status === 'resolved' ? '#166534' : ticket.status === 'pending' ? '#854d0e' : ticket.status === 'escalated' ? '#991b1b' : '#1e40af', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', textTransform: 'capitalize' }}>
                          {ticket.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                        Ticket ID: {ticket.ticketNumber || ticket._id.substring(0, 8)} | Date: {new Date(ticket.createdAt).toLocaleDateString()} | Category: {ticket.category}
                      </div>
                      
                      <div style={{ fontSize: '14px', color: '#4a5568', marginBottom: '16px', lineHeight: '1.5' }}>
                        {ticket.description}
                      </div>
                      
                      {(ticket.resolution || ticket.adminReply) && (
                        <div style={{ background: '#F8F3EB', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #C89953', marginTop: '12px' }}>
                          <strong style={{ display: 'block', fontSize: '13px', color: '#B68645', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Admin Reply / Resolution:</strong>
                          <span style={{ fontSize: '15px', color: '#5c4629', lineHeight: '1.5' }}>{ticket.resolution || ticket.adminReply}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Still Need Help Banner */}
          <div className="faq-contact-banner">
            <div className="contact-banner-left">
              <div className="contact-avatar">
                <Headset size={32} color="#C89953" strokeWidth={1.5} />
              </div>
              <div className="contact-banner-text">
                <h3>Still need help?</h3>
                <p>Our support team is here to assist you.</p>
              </div>
            </div>
            <button className="faq-contact-btn" onClick={() => setIsContactModalOpen(true)}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
      
      {/* Contact Support Ticket Modal */}
      {isContactModalOpen && (
        <div className="feedback-modal-overlay center-card-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="feedback-modal center-card-modal" style={{ background: 'white', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '500px' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111', margin: 0 }}>Create a Support Ticket</h2>
              <button onClick={() => setIsContactModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#333" />
              </button>
            </div>
            
            <form onSubmit={handleTicketSubmit} className="modal-body">
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Subject</label>
                <input type="text" required placeholder="Brief summary of your issue" value={ticketData.subject} onChange={(e) => setTicketData({...ticketData, subject: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Category</label>
                  <select value={ticketData.category} onChange={(e) => setTicketData({...ticketData, category: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', background: '#fff' }}>
                    <option value="Technical">Technical Issue</option>
                    <option value="Account">Account Issue</option>
                    <option value="Order">Order Issue</option>
                    <option value="Payment">Payment Issue</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Priority</label>
                  <select value={ticketData.priority} onChange={(e) => setTicketData({...ticketData, priority: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', background: '#fff' }}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>Description</label>
                <textarea required placeholder="Describe your issue in detail..." rows="4" value={ticketData.description} onChange={(e) => setTicketData({...ticketData, description: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e5e7eb', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              
              <button type="submit" disabled={isSubmitting} className="btn-submit" style={{ width: '100%', padding: '12px', background: '#C89953', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
