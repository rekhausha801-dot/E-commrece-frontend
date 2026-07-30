import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CheckCircle, Mail, Phone, Calendar, Edit2 } from 'lucide-react';
import './Profile.css';

const profileImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({
    fullName: 'Rekha R',
    email: 'rekha.r@email.com',
    phone: '+91 98765 43210',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
  });

  React.useEffect(() => {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      const data = JSON.parse(stored);
      setProfile({
        fullName: data.fullName || 'Rekha R',
        email: data.email || 'rekha.r@email.com',
        phone: data.phone || '+91 98765 43210',
        profileImage: data.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
      });
    }
  }, []);

  return (
    <div className="profile-summary-container">
      
      <div className="profile-summary-header">
        <h1 className="ps-title">My Profile</h1>
        <p className="ps-subtitle">Manage your personal information and account details.</p>
      </div>

      <div className="ps-card">
        {/* Decorative Background */}
        <div className="ps-decor">
          <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,300 C150,300 200,150 400,200 L400,300 Z" fill="#fff4ec" opacity="0.6"/>
            <path d="M100,300 C250,250 300,50 400,100 L400,300 Z" fill="#fff1e6" opacity="0.4"/>
            <g stroke="#ffd9b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7">
              <path d="M300,300 C310,240 330,170 380,100" />
              <path d="M335,210 C310,180 290,140 270,110 C290,115 315,130 335,210 Z" />
              <path d="M350,160 C325,130 305,90 290,60 C310,65 330,80 350,160 Z" />
              <path d="M365,115 C345,85 330,50 320,20 C340,30 355,50 365,115 Z" />
              <path d="M335,210 C355,185 385,160 410,140 C400,170 375,190 335,210 Z" />
              <path d="M350,160 C370,135 395,110 420,95 C410,125 385,145 350,160 Z" />
            </g>
          </svg>
        </div>

        <div className="ps-content">
          <div className="ps-avatar-section">
            <div className="ps-avatar-wrapper">
              <img src={profile.profileImage} alt="Profile" className="ps-avatar-img" />
              <button className="ps-avatar-camera-btn">
                <Camera size={16} />
              </button>
            </div>
          </div>

          <div className="ps-info-section">
            <div className="ps-name-row">
              <h2 className="ps-name">{profile.fullName}</h2>
              <div className="ps-verified-badge">
                <CheckCircle size={12} fill="#10b981" color="white" /> Verified
              </div>
            </div>

            <div className="ps-contact-details">
              <div className="ps-contact-item">
                <Mail size={16} className="ps-contact-icon" />
                <span>{profile.email}</span>
              </div>
              <div className="ps-contact-item">
                <Phone size={16} className="ps-contact-icon" />
                <span>{profile.phone}</span>
              </div>
              <div className="ps-contact-item">
                <Calendar size={16} className="ps-contact-icon" />
                <span>Joined on 24 July 2025</span>
              </div>
            </div>
          </div>
        </div>

        <button className="ps-edit-btn" onClick={() => navigate('/account/settings')}>
          <Edit2 size={16} /> Edit Profile
        </button>

      </div>
    </div>
  );
};

export default Profile;
