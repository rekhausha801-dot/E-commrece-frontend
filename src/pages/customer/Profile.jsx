import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, CheckCircle, Mail, Phone, Calendar, Edit2, User } from 'lucide-react';
import { getUserProfile } from '../../services/api';
import { message } from 'antd';
import './Profile.css';

const defaultImg = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    profileImage: defaultImg,
    dateOfBirth: '',
    gender: '',
    createdAt: null
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await getUserProfile();
        const data = response.data.user;
        setProfile({
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phoneNumber || '',
          profileImage: data.profileImage || defaultImg,
          dateOfBirth: data.dateOfBirth || '',
          gender: data.gender || '',
          createdAt: data.createdAt || null
        });
      } catch (error) {
        console.error('Failed to fetch profile', error);
        message.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Loading Profile...</div>;
  }

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
                {profile.dateOfBirth ? (
                  <span>DOB: {new Date(profile.dateOfBirth).toLocaleDateString()}</span>
                ) : (
                  <span style={{color: '#ef4444', cursor: 'pointer', fontWeight: 600}} onClick={() => navigate('/account/settings')}>+ Add Date of Birth</span>
                )}
              </div>
              <div className="ps-contact-item">
                <User size={16} className="ps-contact-icon" />
                {profile.gender ? (
                  <span>Gender: {profile.gender}</span>
                ) : (
                  <span style={{color: '#ef4444', cursor: 'pointer', fontWeight: 600}} onClick={() => navigate('/account/settings')}>+ Add Gender</span>
                )}
              </div>
              <div className="ps-contact-item">
                <Calendar size={16} className="ps-contact-icon" />
                <span>{profile.createdAt ? `Joined on ${new Date(profile.createdAt).toLocaleDateString()}` : 'Member'}</span>
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
