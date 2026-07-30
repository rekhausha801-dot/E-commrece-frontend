import React, { useState } from 'react';
import { 
  Package, FileText, Wallet, CheckCircle2, ChevronRight, 
  UploadCloud, Headset, Clock, Truck, FileCheck, CheckCircle
} from 'lucide-react';
import './ReturnRefund.css';

const ReturnRefund = () => {
  const [activeTab, setActiveTab] = useState('Request Return');
  const [comments, setComments] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  return (
    <div className="return-refund-container">
      {/* Header */}
      <div className="rr-header">
        <h1 className="rr-title">Return & Refund</h1>
        <p className="rr-subtitle">Request a return or track your refund status</p>
        
        {/* Optional decorative box icon in top right corner to match design */}
        <div className="rr-header-decor">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#C89953" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
            <circle cx="17" cy="17" r="4" fill="white"></circle>
            <path d="M17 19v-4m-2 2h4" stroke="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Top Stepper */}
      <div className="rr-top-stepper">
        <div className="rr-step">
          <div className="rr-step-icon-wrapper active">
            <Package size={24} className="rr-step-icon" />
            <div className="rr-step-active-badge">
              <CheckCircle2 size={10} color="#fff" />
            </div>
          </div>
          <div className="rr-step-text">
            <h4><span className="rr-step-num">1.</span> Select Item</h4>
            <p>Choose the item you want to return</p>
          </div>
        </div>
        <ChevronRight size={24} className="rr-step-arrow" />
        <div className="rr-step">
          <div className="rr-step-icon-wrapper">
            <FileText size={24} className="rr-step-icon" />
          </div>
          <div className="rr-step-text">
            <h4><span className="rr-step-num">2.</span> Submit Request</h4>
            <p>Fill the return reason and submit request</p>
          </div>
        </div>
        <ChevronRight size={24} className="rr-step-arrow" />
        <div className="rr-step">
          <div className="rr-step-icon-wrapper">
            <Wallet size={24} className="rr-step-icon" />
          </div>
          <div className="rr-step-text">
            <h4><span className="rr-step-num">3.</span> Get Refund</h4>
            <p>We will inspect and process your refund</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rr-tabs">
        <button 
          className={`rr-tab-btn ${activeTab === 'Request Return' ? 'active' : ''}`}
          onClick={() => setActiveTab('Request Return')}
        >
          Request Return
        </button>
        <button 
          className={`rr-tab-btn ${activeTab === 'Return History' ? 'active' : ''}`}
          onClick={() => setActiveTab('Return History')}
        >
          Return History
        </button>
      </div>

      {/* Main Content Area */}
      {activeTab === 'Request Return' && (
        <div className="rr-content-grid">
          {/* Left Column - Form */}
          <div className="rr-left-col">
            
            <div className="rr-card">
              <h3 className="rr-card-title">Select Order Item</h3>
              
              <div className="rr-item-selection">
                <label className="rr-checkbox-container">
                  <input type="checkbox" defaultChecked />
                  <span className="rr-checkmark"></span>
                </label>
                <div className="rr-item-box">
                  <img 
                    src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=150" 
                    alt="Floral Printed Kurti" 
                    className="rr-item-img" 
                  />
                  <div className="rr-item-details">
                    <h4>Floral Printed Kurti</h4>
                    <p>Size: M <span className="divider">|</span> Color: Pink</p>
                    <p>Qty: 1 <span className="divider">|</span> <span className="price">₹699</span></p>
                    <p>Order ID: #ORD123456</p>
                    <p>Order Date: 24 Jul 2025</p>
                  </div>
                </div>
              </div>

              <div className="rr-form-group">
                <label>Reason for Return <span className="required">*</span></label>
                <select className="rr-select">
                  <option>Select a reason</option>
                  <option>Size issue</option>
                  <option>Defective product</option>
                  <option>Item not as described</option>
                </select>
              </div>

              <div className="rr-form-group">
                <label>Comments <span className="optional">(Optional)</span></label>
                <div className="rr-textarea-wrapper">
                  <textarea 
                    className="rr-textarea" 
                    placeholder="Add any additional comments..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    maxLength={200}
                  ></textarea>
                  <div className="rr-char-count">{comments.length}/200</div>
                </div>
              </div>

              <div className="rr-form-group">
                <label>Upload Photos <span className="optional">(Optional)</span></label>
                <div className="rr-upload-zone">
                  {uploadedImage ? (
                    <div className="rr-image-preview">
                      <img src={uploadedImage} alt="Uploaded" className="rr-preview-img" />
                      <button type="button" className="rr-remove-img-btn" onClick={() => setUploadedImage(null)}>✕</button>
                    </div>
                  ) : (
                    <>
                      <input 
                        type="file" 
                        id="return-image" 
                        accept="image/png, image/jpeg" 
                        style={{ display: 'none' }} 
                        onChange={handleImageUpload} 
                      />
                      <label htmlFor="return-image" className="rr-upload-label">
                        <UploadCloud size={24} className="rr-upload-icon" />
                        <p>Click here to upload</p>
                        <span>JPG, PNG up to 5MB</span>
                      </label>
                    </>
                  )}
                </div>
              </div>

              <button className="rr-submit-btn">Submit Return Request</button>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="rr-right-col">

            <div className="rr-card rr-policy-card">
              <h3 className="rr-card-title">Return Policy</h3>
              <ul className="rr-policy-list">
                <li>
                  <CheckCircle2 size={16} className="rr-check-icon" />
                  <span>You can request a return within 7 days of delivery.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="rr-check-icon" />
                  <span>Items must be unused, unwashed and in original condition.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="rr-check-icon" />
                  <span>Refunds will be issued to the original payment method.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="rr-check-icon" />
                  <span>For more details, please visit our <a href="#">Return Policy</a> page.</span>
                </li>
              </ul>
            </div>

            <div className="rr-card rr-help-card">
              <div className="rr-help-content">
                <div className="rr-help-icon-wrapper">
                  <Headset size={24} className="rr-help-icon" />
                </div>
                <div>
                  <h4>Need Help with Return?</h4>
                  <p>Our support team is here to help you</p>
                </div>
              </div>
              <button className="rr-contact-btn">
                <Headset size={16} /> Contact Support
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Return Process Bottom Stepper (Moved outside grid to span full width) */}
      {activeTab === 'Request Return' && (
        <div className="rr-card rr-process-card">
          <h3 className="rr-card-title">Return Process</h3>
          <div className="rr-bottom-stepper">
            <div className="rr-process-step">
              <div className="rr-process-icon"><FileCheck size={24} /></div>
              <h5>Return Requested</h5>
              <p>We've received your return request</p>
            </div>
            <div className="rr-process-line"></div>
            <div className="rr-process-step">
              <div className="rr-process-icon"><CheckCircle size={24} /></div>
              <h5>Return Approved</h5>
              <p>Your return request is approved</p>
            </div>
            <div className="rr-process-line"></div>
            <div className="rr-process-step">
              <div className="rr-process-icon"><Truck size={24} /></div>
              <h5>Pick-up Scheduled</h5>
              <p>We will pick up the item from you</p>
            </div>
            <div className="rr-process-line"></div>
            <div className="rr-process-step">
              <div className="rr-process-icon"><Package size={24} /></div>
              <h5>Item Received</h5>
              <p>We've received the returned item</p>
            </div>
            <div className="rr-process-line"></div>
            <div className="rr-process-step">
              <div className="rr-process-icon"><Wallet size={24} /></div>
              <h5>Refund Processed</h5>
              <p>Your refund has been processed</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Return History' && (
        <div className="rr-card" style={{ padding: '60px', textAlign: 'center', color: '#666' }}>
          No past returns found.
        </div>
      )}

    </div>
  );
};

export default ReturnRefund;
