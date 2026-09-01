import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronDown, Camera } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../../services/api';
import { message } from 'antd';
import './AccountSettings.css';

const COUNTRIES = [
  { code: 'IN', name: 'India', flag: 'https://flagcdn.com/w20/in.png', dial: '+91' },
  { code: 'US', name: 'United States', flag: 'https://flagcdn.com/w20/us.png', dial: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: 'https://flagcdn.com/w20/gb.png', dial: '+44' },
  { code: 'CA', name: 'Canada', flag: 'https://flagcdn.com/w20/ca.png', dial: '+1' },
  { code: 'AU', name: 'Australia', flag: 'https://flagcdn.com/w20/au.png', dial: '+61' },
];

const AccountSettings = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    gender: 'Female',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const response = await getUserProfile();
        const data = response.data.user;
        setFormData(prev => ({
          ...prev,
          fullName: data.fullName || '',
          email: data.email || '',
          phone: data.phoneNumber || '',
          dob: data.dateOfBirth || '',
          gender: data.gender || 'Female',
          profileImage: data.profileImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80'
        }));
      } catch (err) {
        message.error("Failed to load profile data");
      }
    };
    fetchProfile();
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await updateUserProfile({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        profileImage: formData.profileImage
      });
      const data = response.data.user;
      localStorage.setItem('user', JSON.stringify(data));
      message.success('Profile updated successfully!');
      navigate('/account/profile');
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="my-profile-container">
      
      <div className="my-profile-header">
        <div className="mp-header-text">
          <h1 className="mp-title">Account Settings</h1>
          <p className="mp-subtitle">Manage your personal information and account details.</p>
        </div>
        <div className="mp-header-avatar">
          <div className="mp-avatar-wrapper-small">
            <img src={formData.profileImage} alt="Profile" className="mp-avatar-img" />
            <button className="mp-avatar-camera-btn" onClick={triggerFileUpload}>
              <Camera size={14} />
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageUpload} 
            />
          </div>
        </div>
      </div>

      <div className="mp-content-grid">
        
      
        <div className="mp-top-card">
          
          <div className="mp-info-section">
            <h2 className="mp-section-title">Profile Information</h2>
            
            <div className="mp-form-group">
              <label>Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="mp-input" />
            </div>

            <div className="mp-form-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="mp-input" />
            </div>

            <div className="mp-form-group">
              <label>Phone Number</label>
              <div className="mp-phone-input-wrapper">
                <div className="mp-country-code" ref={dropdownRef} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                  <img src={selectedCountry.flag} alt={selectedCountry.code} />
                  <ChevronDown size={14} />
                  
                  {showCountryDropdown && (
                    <div className="mp-country-dropdown">
                      {COUNTRIES.map((country) => (
                        <div 
                          key={country.code} 
                          className="mp-country-option"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                        >
                          <img src={country.flag} alt={country.code} />
                          <span className="mp-country-name">{country.code}</span>
                          <span className="mp-country-dial">{country.dial}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mp-input" />
              </div>
            </div>

            <div className="mp-form-group">
              <label>Date of Birth</label>
              <div className="mp-input-with-icon">
                <Calendar size={18} className="mp-input-icon" />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mp-input has-icon" />
              </div>
            </div>

            <div className="mp-form-group">
              <label>Gender</label>
              <div className="mp-radio-group">
                <label className="mp-radio-label">
                  <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
                  <span className="mp-radio-custom"></span> Female
                </label>
                <label className="mp-radio-label">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
                  <span className="mp-radio-custom"></span> Male
                </label>
              </div>
            </div>


          </div>


          
          <div className="mp-form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="mp-save-btn" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AccountSettings;
