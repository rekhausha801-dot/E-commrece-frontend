import React from 'react';
import { 
  User, Calendar, MapPin, CreditCard, Ticket, Star, Bell, 
  Settings, HelpCircle, LogOut, Camera, ChevronRight, CheckCircle,
  Mail, Phone, ShieldCheck, RefreshCcw, Truck, Headphones, Upload
} from 'lucide-react';
import './EditProfile.css';

const profileImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80';
const giftImg = 'https://cdn-icons-png.flaticon.com/512/4213/4213606.png'; // placeholder gift box
const indiaFlagImg = 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg';

const EditProfile = () => {
  return (
    <div className="edit-profile-page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumb-nav">
        <a href="/" className="breadcrumb-link">Home</a>
        <ChevronRight size={14} />
        <a href="/profile" className="breadcrumb-link">My Profile</a>
        <ChevronRight size={14} />
        <span className="breadcrumb-current">Edit Profile</span>
      </div>

      <div className="edit-profile-layout">
        
        {/* Left Sidebar */}
        <aside className="profile-sidebar">
          <nav className="sidebar-nav">
            <button className="sidebar-nav-item active">
              <User /> My Profile
            </button>
            <button className="sidebar-nav-item">
              <ShoppingBagIcon /> Orders
            </button>

            <button className="sidebar-nav-item">
              <MapPin /> Addresses
            </button>
            <button className="sidebar-nav-item">
              <CreditCard /> Payments
            </button>
            <button className="sidebar-nav-item">
              <Ticket /> Coupons
            </button>
            <button className="sidebar-nav-item">
              <Star /> Reviews
            </button>
            <button className="sidebar-nav-item">
              <Bell /> Notifications
            </button>
            <button className="sidebar-nav-item">
              <Settings /> Account Settings
            </button>
            <button className="sidebar-nav-item">
              <HelpCircle /> Help & Support
            </button>
            <button className="sidebar-nav-item">
              <LogOut /> Logout
            </button>
          </nav>

          <div className="exclusive-offer-card">
            <div className="exclusive-offer-title">Special Offer</div>
            <div className="exclusive-offer-discount">Get 10% OFF</div>
            <div className="exclusive-offer-subtitle">On your next purchase</div>
            <button className="exclusive-offer-btn">Shop Now</button>
            <img src={giftImg} alt="Gift Box" className="offer-gift-img" />
          </div>
        </aside>

        {/* Main Form Content */}
        <main className="edit-form-content">
          <div className="edit-form-header">
            <h1>Edit Profile</h1>
            <p>Update your personal information and keep your account secure.</p>
          </div>

          {/* Personal Information */}
          <div className="form-section-card">
            <h3 className="form-section-title">Personal Information</h3>
            
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" defaultValue="Rekha R" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" defaultValue="rekha.r@email.com" />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="phone-input-group">
                <div className="phone-country-select">
                  <img src={indiaFlagImg} alt="India Flag" />
                  <span>▼</span>
                </div>
                <input type="text" className="form-input phone-input" defaultValue="+91 98765 43210" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-input" defaultValue="2000-03-12" />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="gender" value="female" defaultChecked /> Female
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="male" /> Male
                </label>
              </div>
            </div>

            <div className="form-group" style={{marginBottom: 0}}>
              <label className="form-label">About You (Optional)</label>
              <textarea className="form-textarea" rows="4" defaultValue="Fashion lover & online shopping enthusiast."></textarea>
              <div className="textarea-footer">
                <span className="char-count">44/150</span>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="form-section-card">
            <h3 className="form-section-title">Address Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Country</label>
                <select className="form-select" defaultValue="India">
                  <option value="India">India</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <select className="form-select" defaultValue="Tamil Nadu">
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input type="text" className="form-input" defaultValue="Vellore" />
              </div>
              <div className="form-group">
                <label className="form-label">Pincode</label>
                <input type="text" className="form-input" defaultValue="632001" />
              </div>
            </div>
          </div>

          {/* Save Changes */}
          <div className="form-section-card">
            <h3 className="form-section-title">Save Changes</h3>
            
            <div className="form-row">
              <div className="form-group" style={{marginBottom: '8px'}}>
                <label className="form-label">New Password (Optional)</label>
                <input type="password" className="form-input" placeholder="Enter new password" />
              </div>
              <div className="form-group" style={{marginBottom: '8px'}}>
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-input" placeholder="Confirm new password" />
              </div>
            </div>
            
            <p className="password-note">Leave password fields blank if you don't want to change it.</p>
            
            <div className="action-buttons-row">
              <button className="btn-primary">Save Changes</button>
              <button className="btn-secondary">Cancel</button>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          
          {/* Profile Picture */}
          <div className="form-section-card profile-pic-card">
            <h3 className="form-section-title" style={{alignSelf: 'flex-start', margin: 0}}>Profile Picture</h3>
            
            <div className="profile-pic-wrapper">
              <img src={profileImg} alt="Rekha R" className="profile-pic-img" />
              <button className="pic-camera-btn">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="upload-box">
              <div className="upload-box-title"><Upload size={16} /> Upload New Photo</div>
              <div className="upload-box-subtitle">JPG, PNG or WebP (Max. 2MB)</div>
            </div>
          </div>

          {/* Account Information */}
          <div className="form-section-card">
            <h3 className="form-section-title" style={{margin: 0}}>Account Information</h3>
            
            <div className="account-info-list">
              <div className="acc-info-item">
                <Mail size={18} className="acc-info-icon" />
                <div className="acc-info-content">
                  <span className="acc-info-label">Email</span>
                  <span className="acc-info-value">rekha.r@email.com</span>
                </div>
                <a href="#verify" className="acc-verify-link">Verify</a>
              </div>
              
              <div className="acc-info-item">
                <Phone size={18} className="acc-info-icon" />
                <div className="acc-info-content">
                  <span className="acc-info-label">Phone</span>
                  <span className="acc-info-value">+91 98765 43210</span>
                </div>
                <a href="#verify" className="acc-verify-link">Verify</a>
              </div>

              <div className="acc-info-item">
                <Calendar size={18} className="acc-info-icon" />
                <div className="acc-info-content">
                  <span className="acc-info-label">Member Since</span>
                  <span className="acc-info-value">24 July 2025</span>
                </div>
              </div>

              <div className="acc-info-item">
                <ShieldCheck size={18} className="acc-info-icon" />
                <div className="acc-info-content">
                  <span className="acc-info-label">Account Status</span>
                  <div className="status-badge">Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="tips-card">
            <div className="tips-header">
              <LightbulbIcon /> Tips
            </div>
            <div className="tips-list">
              <div className="tip-item">
                <CheckCircle size={16} className="tip-icon" />
                <p className="tip-text">Use a strong password to keep your account secure.</p>
              </div>
              <div className="tip-item">
                <CheckCircle size={16} className="tip-icon" />
                <p className="tip-text">Keep your contact information updated for order updates.</p>
              </div>
            </div>
          </div>

        </aside>

      </div>

      {/* Footer Props */}
      <div className="footer-props-container">
        <div className="prop-item">
          <div className="prop-icon"><ShieldCheck size={24} /></div>
          <div className="prop-text">
            <h5>Secure Payments</h5>
            <p>100% secure payments</p>
          </div>
        </div>
        <div className="prop-item">
          <div className="prop-icon"><RefreshCcw size={24} /></div>
          <div className="prop-text">
            <h5>Easy Returns</h5>
            <p>30 days return policy</p>
          </div>
        </div>
        <div className="prop-item">
          <div className="prop-icon"><Truck size={24} /></div>
          <div className="prop-text">
            <h5>Fast Delivery</h5>
            <p>On time delivery</p>
          </div>
        </div>
        <div className="prop-item">
          <div className="prop-icon"><Headphones size={24} /></div>
          <div className="prop-text">
            <h5>24/7 Support</h5>
            <p>We are here to help</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

// Missing Lucide Icons that need custom SVG/wrapper
const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
    <path d="M3 6h18"></path>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const LightbulbIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#db441d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"></path>
    <path d="M9 18h6"></path>
    <path d="M10 22h4"></path>
  </svg>
);

export default EditProfile;
