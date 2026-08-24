import React, { useState } from 'react';
import './Support.css';
import { 
  ChevronLeft, ChevronRight, FileText, Store, CheckCircle2,
  Package, ClipboardList, MessageSquare, PhoneCall, HelpCircle, ThumbsUp, ThumbsDown, Headset, X, Edit3, Heart, Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('main'); // 'main' or 'return-request'
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackType, setFeedbackType] = useState(null); // 'yes' or 'no'
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [callRequested, setCallRequested] = useState(false);
  
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedChatLanguage, setSelectedChatLanguage] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  
  const languages = ['हिंदी', 'English', 'తెలుగు', 'বাংলা', 'தமிழ்', 'ಕನ್ನಡ', 'മലയാളം'];
  
  // Sample bag image for the UI mockup
  const bagImgUrl = "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80";

  return (
    <div className="support-wrapper-container">
        
        {/* Background Gradient inside the card */}
        <div className="help-centre-bg">
          <div className="help-centre-bg-image"></div>
        </div>
        
        {/* Header */}
        <div className="help-centre-header">
          <button className="back-btn" onClick={() => activeTab === 'main' ? navigate(-1) : setActiveTab('main')}>
            <ChevronLeft size={24} color="#c89f66" strokeWidth={2.5} />
          </button>
          <h1>HELP CENTRE</h1>
        </div>

        <div className="help-centre-content">
          {activeTab === 'main' ? (
            <>
              {/* Order Details Card */}
              <div className="order-details-card">
                <div className="order-row">
                  <div className="order-left">
                    <div className="icon-circle">
                      <FileText size={16} color="#c89f66" strokeWidth={2} />
                    </div>
                    <span className="order-text">Order ID 83181012050914176</span>
                  </div>
                  <span className="sold-to">Sold to <span className="highlight">Rekha</span></span>
                </div>
                
                <div className="divider-line"></div>
                
                <div className="order-row">
                  <div className="icon-circle">
                    <Store size={16} color="#c89f66" strokeWidth={2} />
                  </div>
                  <span className="supplier-text">Supplier : <strong>THE MARKA ENTERPRISE</strong></span>
                </div>
              </div>

              {/* Product Details Card */}
              <div className="product-details-card">
                <div className="product-info">
                  <div className="product-image-container">
                    <img src={bagImgUrl} alt="College Bag" className="product-image" />
                  </div>
                  <div className="product-text-details">
                    <h3>The Marka Unisex College Bag</h3>
                    <div className="delivery-status">
                      <CheckCircle2 size={16} color="#279e43" strokeWidth={2.5} />
                      <span>Delivered on</span>
                    </div>
                  </div>
                </div>
                <button className="next-btn">
                  <ChevronRight size={20} color="#333" />
                </button>
              </div>

              {/* Issues Section */}
              <div className="issues-section">
                <div className="issues-title-container">
                  <h2>What issue are you facing?</h2>
                  <div className="title-underline"></div>
                </div>
                
                <div className="issue-card" onClick={() => setActiveTab('return-request')}>
                  <div className="issue-left">
                    <div className="issue-icon-wrapper">
                      <Package size={24} color="#333" />
                      <div className="loop-icon-badge">
                        <RotateCcwIcon size={12} color="#c89f66" strokeWidth={3} />
                      </div>
                    </div>
                    <span className="issue-text">Can I raise a return/exchange request?</span>
                  </div>
                  <button className="next-btn">
                    <ChevronRight size={20} color="#333" />
                  </button>
                </div>
                
                <div className="issue-card" onClick={() => setActiveTab('where-order')}>
                  <div className="issue-left">
                    <div className="issue-icon-wrapper">
                      <ClipboardList size={24} color="#333" />
                    </div>
                    <span className="issue-text">Where is my order?</span>
                  </div>
                  <button className="next-btn">
                    <ChevronRight size={20} color="#333" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Tab: Issue Details (For Return/Exchange OR Where is my order) */
            <div className="return-request-tab">
              {/* Question Details Card */}
              <div className="question-details-card">
                <div className="question-header">
                  <div className="icon-circle question-icon">
                    {activeTab === 'return-request' ? (
                      <div className="issue-icon-wrapper" style={{width: '100%', height: '100%', backgroundColor: 'transparent'}}>
                        <Package size={20} color="#c89f66" />
                        <div className="loop-icon-badge" style={{padding: '1px', right: '-4px', bottom: '-2px'}}>
                          <RotateCcwIcon size={10} color="#c89f66" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <ClipboardList size={20} color="#c89f66" />
                    )}
                  </div>
                  <h2>
                    {activeTab === 'return-request' 
                      ? 'Can I raise a return/exchange request?' 
                      : 'Where is my order?'}
                  </h2>
                </div>
                
                <div className="question-body">
                  <p>Hi Rekha ,</p>
                  <p>Your order was delivered on 10 Nov 24. As per Relietech policy, you can raise any Return/Exchange request within 7 days of delivery. As return window has passed on 17 Nov 24, you will not be able to Return/Exchange this order.</p>
                </div>
                
                <div className="divider-line full-width"></div>
                
                <div className="helpful-section">
                  <span className="helpful-text">Was this helpful?</span>
                  <div className="helpful-buttons">
                    <button 
                      className={`helpful-btn btn-no ${feedbackType === 'no' ? 'selected' : ''}`} 
                      onClick={() => {
                        setFeedbackSubmitted(false);
                        setShowFeedbackModal(true);
                      }}
                    >
                      <ThumbsDown size={18} strokeWidth={2.5} /> NO
                    </button>
                    <button 
                      className={`helpful-btn btn-yes ${feedbackType === 'yes' ? 'selected' : ''}`}
                      onClick={() => {
                        setFeedbackSubmitted(true);
                        setFeedbackType('yes');
                      }}
                    >
                      <ThumbsUp size={18} strokeWidth={2.5} /> YES
                    </button>
                  </div>
                </div>
              </div>

              {/* Still need help section */}
              <div className="still-need-help-section">
                <div className="still-help-header">
                  <h2>Still need help?</h2>
                </div>
                
                <div className="contact-options-list">
                  <div className="contact-card" onClick={() => setShowChatModal(true)}>
                    <div className="contact-left">
                      <div className="contact-icon-wrapper">
                        <MessageSquare size={20} color="#c89f66" strokeWidth={2} />
                      </div>
                      <div className="contact-text">
                        <h4>Chat with us</h4>
                        <p>Wait time: Less than 1 minute</p>
                      </div>
                    </div>
                    <div className="contact-chevron-circle">
                      <ChevronRight size={18} color="#c89f66" />
                    </div>
                  </div>
                  
                  <div className="contact-card" onClick={() => setShowCallModal(true)}>
                    <div className="contact-left">
                      <div className="contact-icon-wrapper">
                        <PhoneCall size={20} color="#c89f66" strokeWidth={2} />
                      </div>
                      <div className="contact-text">
                        <h4>Call me back</h4>
                        <p>Wait time: Less than 5 minutes</p>
                      </div>
                    </div>
                    <div className="contact-chevron-circle">
                      <ChevronRight size={18} color="#c89f66" />
                    </div>
                  </div>
                </div>
              </div>

              {/* No feedback banner removed based on user request */}

              {/* Dark Feedback Success Banner (For YES) */}
              {feedbackSubmitted && feedbackType === 'yes' && (
                <div className="feedback-dark-banner fade-in">
                  <div className="dark-banner-icon">
                    <div className="info-icon-small">
                      <span className="info-text">i</span>
                    </div>
                  </div>
                  <span className="dark-success-text">Thanks for the feedback!</span>
                </div>
              )}

              {/* Call Confirmation Banner */}
              {callRequested && (
                <div className="feedback-success-banner fade-in" style={{ marginTop: '16px' }}>
                  <div className="feedback-success-left">
                    <div className="icon-circle purple-icon" style={{ backgroundColor: '#2e7d32', boxShadow: 'none' }}>
                      <PhoneCall size={20} color="white" strokeWidth={2.5} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="success-text" style={{ color: '#2e7d32' }}>Call request confirmed!</span>
                      <span style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>Our agent will call you in 5 minutes.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat Confirmation Banner */}
              {chatStarted && (
                <div className="feedback-success-banner fade-in" style={{ marginTop: '16px' }}>
                  <div className="feedback-success-left">
                    <div className="icon-circle purple-icon" style={{ backgroundColor: '#c89f66', boxShadow: 'none' }}>
                      <MessageSquare size={20} color="white" strokeWidth={2.5} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="success-text" style={{ color: '#c89f66' }}>Chat session started!</span>
                      <span style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>Connecting you to an agent...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Feedback Centered Card Modal */}
        {showFeedbackModal && (
          <div className="feedback-modal-overlay center-card-overlay">
            <div className="feedback-modal center-card-modal">
              <div className="modal-header" style={{ justifyContent: 'space-between', alignItems: 'flex-start', margin: 0, padding: 0 }}>
                <h2 style={{ fontSize: '15px', fontWeight: '800', color: '#111', lineHeight: '1.4', margin: 0 }}>
                  Do you want to tell us why this wasn't helpful?
                </h2>
                <button 
                  onClick={() => setShowFeedbackModal(false)}
                  style={{ background: 'transparent', border: 'none', padding: '0', cursor: 'pointer', marginLeft: '16px' }}
                >
                  <X size={20} color="#333" />
                </button>
              </div>
              
              <div className="modal-body" style={{ marginTop: '32px', marginBottom: '32px' }}>
                <label className="comment-label">Comment</label>
                <textarea 
                  className="comment-textarea" 
                  placeholder="Type your comment here..."
                  rows={3}
                ></textarea>
              </div>
              
              <div className="modal-footer" style={{ gap: '16px' }}>
                <button className="btn-no-thanks" onClick={() => setShowFeedbackModal(false)}>
                  No, Thanks
                </button>
                <button className="btn-submit" onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackSubmitted(true);
                  setFeedbackType('no');
                }}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Call Me Back Bottom Sheet Modal */}
        {showCallModal && (
          <div className="feedback-modal-overlay center-card-overlay">
            <div className="call-modal center-card-modal">
              <div className="call-modal-header">
                <h3>CALL ME BACK</h3>
                <button className="modal-close-btn" onClick={() => setShowCallModal(false)}>
                  <X size={20} color="#333" />
                </button>
              </div>
              
              <div className="call-modal-body">
                <div className="contact-details-section">
                  <h3>Your Contact Details</h3>
                  <p className="contact-subtitle">We will call you back on the below number</p>
                  
                  <div className="phone-number-field">
                    <span className="phone-label">Phone Number</span>
                    <div className="phone-value">+91 9344954743</div>
                  </div>
                </div>

                <div className="language-section">
                  <p className="language-title">Let us know your preferred communication language</p>
                  <div className="language-grid">
                    {languages.map((lang) => (
                      <button 
                        key={lang} 
                        className={`lang-btn ${selectedLanguage === lang ? 'selected' : ''}`}
                        onClick={() => setSelectedLanguage(lang)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="call-modal-footer">
                <button 
                  className={`btn-continue ${selectedLanguage ? 'active' : ''}`}
                  disabled={!selectedLanguage}
                  onClick={() => {
                    setShowCallModal(false);
                    setCallRequested(true);
                  }}
                >
                  Select to Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Modal */}
        {showChatModal && (
          <div className="feedback-modal-overlay center-card-overlay">
            <div className="call-modal center-card-modal">
              <div className="call-modal-header">
                <h3>CHAT WITH US</h3>
                <button className="modal-close-btn" onClick={() => setShowChatModal(false)}>
                  <X size={20} color="#333" />
                </button>
              </div>
              
              <div className="call-modal-body">
                <div className="contact-details-section">
                  <h3>Your Contact Details</h3>
                  <p className="contact-subtitle">We will connect you via chat on the below number</p>
                  
                  <div className="phone-number-field">
                    <span className="phone-label">Phone Number</span>
                    <div className="phone-value">+91 9344954743</div>
                  </div>
                </div>

                <div className="language-section">
                  <p className="language-title">Let us know your preferred communication language</p>
                  <div className="language-grid">
                    {languages.map((lang) => (
                      <button 
                        key={lang} 
                        className={`lang-btn ${selectedChatLanguage === lang ? 'selected' : ''}`}
                        onClick={() => setSelectedChatLanguage(lang)}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="call-modal-footer">
                <button 
                  className={`btn-continue ${selectedChatLanguage ? 'active' : ''}`}
                  disabled={!selectedChatLanguage}
                  onClick={() => {
                    setShowChatModal(false);
                    setChatStarted(true);
                  }}
                >
                  Select to Continue
                </button>
              </div>
            </div>
          </div>
        )}
        
    </div>
  );
};

// Helper component for the small loop badge
const RotateCcwIcon = ({ size, color, strokeWidth }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="3 9 9 9 9 3"></polyline>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L3 9"></path>
    <path d="M3.51 15A9 9 0 0 0 18.36 18.36L21 15"></path>
    <polyline points="21 15 15 15 15 21"></polyline>
  </svg>
);

export default Support;
