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
