import React from 'react';
import { 
  User, Calendar, MapPin, CreditCard, Ticket, Star, Bell, 
  Settings, HelpCircle, LogOut, CheckCircle, Camera, Edit2, 
  ShoppingBag, Heart, Trash2, Plus, ArrowRight, ShieldCheck, 
  RefreshCcw, Truck, Tag, Headphones, ChevronRight
} from 'lucide-react';
import './Profile.css';

// Import images/assets if needed. For now using placeholders that look like the screenshot.
const profileImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80';
const giftImg = 'https://cdn-icons-png.flaticon.com/512/4213/4213606.png'; // placeholder gift box
const kurtiImg = 'https://images.unsplash.com/photo-1583391733958-d15a07cadf70?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';
const bagImg = 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';
const sneakerImg = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80';

const Profile = () => {
  return (
    <div className="profile-page-container">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <nav className="sidebar-nav">
          <button className="sidebar-nav-item active">
            <User /> My Profile
          </button>
          <button className="sidebar-nav-item">
            <ShoppingBag /> My Orders
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
            <HelpCircle />H
          </button>
          <button className="sidebar-nav-item">
            <LogOut /> Logout
          </button>
        </nav>

        {/* Exclusive Offer Card */}
        <div className="exclusive-offer-card">
          <div className="exclusive-offer-title">Exclusive Offer</div>
          <div className="exclusive-offer-discount">Get 10% OFF</div>
          <div className="exclusive-offer-subtitle">On your next purchase</div>
          <button className="exclusive-offer-btn">Claim Now</button>
          <img src={giftImg} alt="Gift Box" className="offer-gift-img" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="profile-main-content">
        
        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-header-bg-decor"></div>
          <div className="profile-info-section">
            <div className="profile-avatar-wrapper">
              <img src={profileImg} alt="Rekha R" className="profile-avatar-img" />
              <button className="avatar-edit-btn">
                <Camera size={16} />
              </button>
            </div>
            
            <div className="profile-details">
              <div className="profile-name-row">
                <h2 className="profile-name">Rekha C</h2>
                <div className="verified-badge">
                  <CheckCircle size={12} fill="#db441d" color="white" /> Verified
                </div>
              </div>
              <div className="profile-contact-info">
                <MailIcon /> rekha.r@email.com
              </div>
              <div className="profile-contact-info">
                <PhoneIcon /> +91 98765 43210
              </div>
              <div className="profile-contact-info">
                <Calendar /> Joined on 24 July 2025
              </div>
            </div>
          </div>
          <button className="edit-profile-btn">
            <Edit2 size={16} /> Edit Profile
          </button>
        </div>

        {/* My Address */}
        <div className="section-card">
          <div className="section-header">
            <h3 className="section-title"><MapPin size={22} /> My Address</h3>
            <button className="add-new-address-btn">
              <Plus size={16} /> Add New Address
            </button>
          </div>
          <div className="address-item-card">
            <div className="address-item-left">
              <div className="address-icon">
                <MapPin size={24} />
              </div>
              <div className="address-info">
                <h4>Rekha R <span className="default-badge">Default</span></h4>
                <p className="address-text">
                  12, Lake View Street,<br />
                  Madhanur, Thirupattur Dist,<br />
                  Tamil Nadu - 635503<br />
                  India
                </p>
                <div className="address-phone">+91 98765 43210</div>
              </div>
            </div>
            <div className="address-actions">
              <button className="address-action-btn edit">
                <Edit2 size={16} />
              </button>
              <button className="address-action-btn delete">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="section-card">
          <h3 className="section-title" style={{marginBottom: '20px'}}>Quick Access</h3>
          <div className="quick-access-container">
            <div className="quick-access-card orders">
              <div className="quick-access-left">
                <div className="qa-icon-wrapper"><ShoppingBag size={20} /></div>
                <div className="qa-details">
                  <span className="qa-title">My Orders</span>
                  <span className="qa-subtitle">Track & manage<br/>your orders</span>
                </div>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </div>

            <div className="quick-access-card payments">
              <div className="quick-access-left">
                <div className="qa-icon-wrapper"><CreditCard size={20} /></div>
                <div className="qa-details">
                  <span className="qa-title">Payments</span>
                  <span className="qa-subtitle">View payment<br/>methods</span>
                </div>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </div>

            <div className="quick-access-card coupons">
              <div className="quick-access-left">
                <div className="qa-icon-wrapper"><Ticket size={20} /></div>
                <div className="qa-details">
                  <span className="qa-title">Coupons</span>
                  <span className="qa-subtitle">View available<br/>offers</span>
                </div>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </div>

            <div className="quick-access-card reviews">
              <div className="quick-access-left">
                <div className="qa-icon-wrapper"><Star size={20} /></div>
                <div className="qa-details">
                  <span className="qa-title">Reviews</span>
                  <span className="qa-subtitle">View your product<br/>reviews</span>
                </div>
              </div>
              <ChevronRight size={18} className="qa-arrow" />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

// SVG Icons not directly available in lucide-react with exactly matching names or just custom SVGs
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const PackageIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m7.5 4.27 9 5.15"></path>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
    <path d="m3.3 7 8.7 5 8.7-5"></path>
    <path d="M12 22V12"></path>
  </svg>
);

export default Profile;
