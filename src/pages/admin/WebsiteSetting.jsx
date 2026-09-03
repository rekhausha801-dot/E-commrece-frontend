import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon, User, Store, ShoppingBag, CreditCard,
  Truck, FileText, Bell, Star, Zap, Shield, Search,
  Palette, Scale, Server, Upload, Save, Lock, Smartphone, Globe, Clock, CheckCircle2,
  Sliders, ChevronDown, Calendar, BarChart2, Lightbulb
} from 'lucide-react';
import { Form, Input, Switch, Select, Button, DatePicker, message, Divider, Upload as AntUpload } from 'antd';
import './Settings.css';

import { getUserProfile, updateUserProfile, updatePassword, updateSecuritySettings, getActiveSessions, revokeSession, revokeAllSessions } from '../../services/api';

const { Option } = Select;
const { TextArea } = Input;

const defaultPrivacyPolicy = `At RelieTech Premium Fashion, we respect your privacy and are committed to protecting your personal data. 
This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights.

1. The data we collect about you
We may collect, use, store and transfer different kinds of personal data about you, including Identity Data, Contact Data, Financial Data, and Transaction Data.

2. How we use your personal data
We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to process your order, manage your account, and deliver our premium products to you.`;

const defaultTerms = `Welcome to RelieTech Premium Fashion. These terms and conditions outline the rules and regulations for the use of our Website.

1. Terms of Sale
By placing an order you are offering to purchase a product on and subject to the following terms and conditions. All orders are subject to availability and confirmation of the order price.

2. Pricing and Availability
Whilst we try and ensure that all details, descriptions and prices which appear on this Website are accurate, errors may occur. If we discover an error in the price of any goods which you have ordered we will inform you of this as soon as possible.`;

const defaultRefund = `Return & Refund Policy

1. Returns
You have 7 calendar days to return an item from the date you received it. To be eligible for a return, your item must be unused and in the same condition that you received it. Your item must be in the original packaging with all tags attached.

2. Refunds
Once we receive your item, we will inspect it and notify you that we have received your returned item. If your return is approved, we will initiate a refund to your credit card (or original method of payment) within 5-7 business days.`;

const AutofillResistantInput = (props) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  return (
    <Input
      {...props}
      readOnly={isReadOnly}
      onFocus={(e) => {
        setIsReadOnly(false);
        if (props.onFocus) props.onFocus(e);
      }}
      onBlur={(e) => {
        setIsReadOnly(true);
        if (props.onBlur) props.onBlur(e);
      }}
    />
  );
};

const WebsiteSetting = ({ initialTab = 'Security', onProfileUpdate }) => {
  const [activeTab, setActiveTab] = useState(initialTab || 'Security');
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();

  const [profileData, setProfileData] = useState(null);
  const [sessions, setSessions] = useState([
    { id: '1', device: 'Chrome / Windows', location: 'Chennai, India', time: 'Current Session', isCurrent: true, icon: <Globe size={16} color="#3b82f6" /> },
    { id: '2', device: 'Safari / iPhone', location: 'Bangalore, India', time: '2 hours ago', isCurrent: false, icon: <Smartphone size={16} color="#6b7280" /> }
  ]); // Fallback initial state for UI layout before load
  const [securitySettings, setSecuritySettings] = useState({ twoFactor: true, newDeviceAlert: true });
  const [loading, setLoading] = useState(true);
  const [showOptional, setShowOptional] = useState({ phone: false, role: false, adminId: false, gender: false, country: false });

  const renderOptionalField = (fieldName, label, Component) => {
    const hasValue = profileData?.[fieldName] || profileForm.getFieldValue(fieldName);
    const isShowing = showOptional[fieldName];

    if (hasValue || isShowing) {
      return (
        <Form.Item label={label} name={fieldName} className="settings-form-group">
          {Component}
        </Form.Item>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', flex: 1, minWidth: 'calc(50% - 12px)' }}>
        <span style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{label}</span>
        <button
          type="button"
          onClick={() => setShowOptional({ ...showOptional, [fieldName]: true })}
          style={{ background: '#f9fafb', border: '1px dashed #d1d5db', borderRadius: '8px', padding: '8px 16px', color: '#6b7280', fontSize: '13px', fontWeight: 500, cursor: 'pointer', textAlign: 'left', width: '100%', height: '40px' }}
        >
          + Add {label}
        </button>
      </div>
    );
  };

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [profileRes, sessionsRes] = await Promise.all([
        getUserProfile().catch(() => ({ data: null })),
        getActiveSessions().catch(() => ({ data: null }))
      ]);

      if (profileRes?.data && profileRes.data.user) {
        const user = profileRes.data.user;
        // Load cached profile image (stored separately to avoid quota issues)
        const cachedImage = localStorage.getItem('adminProfileImage');
        setProfileData({ ...user, profileImage: cachedImage || user.profileImage || '' });

        const nameParts = (user.fullName || '').split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';


      } else {
        // Fallback for visual mock if API is disconnected
        const cachedImage = localStorage.getItem('adminProfileImage');
        const defaultData = { firstName: 'Admin', lastName: 'User', email: 'admin@relietech.com', profileImage: cachedImage || '' };
        setProfileData(defaultData);

      }

      if (sessionsRes?.data && Array.isArray(sessionsRes.data) && sessionsRes.data.length > 0) {
        setSessions(sessionsRes.data);
      }
    } catch (err) {
      console.error(err);
      message.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Security' && profileData) {
      const nameParts = (profileData.fullName || profileData.firstName || '').split(' ');
      const firstName = nameParts[0] || profileData.firstName || '';
      const lastName = nameParts.slice(1).join(' ') || profileData.lastName || '';
      
      setTimeout(() => {
        profileForm.setFieldsValue({
          firstName,
          lastName,
          email: profileData.email,
          phone: profileData.phoneNumber || profileData.phone,
          role: profileData.role,
          gender: profileData.gender
        });
      }, 0);
    }
  }, [activeTab, profileData, profileForm]);

  const handleSave = () => {
    message.success('Settings saved successfully!');
  };

  const handleUpdateProfile = async (values) => {
    try {
      // Send profile data WITHOUT base64 image (too large for API/DB)
      const payload = {
        fullName: `${values.firstName || ''} ${values.lastName || ''}`.trim(),
        email: values.email,
        phone: values.phone,
        gender: values.gender,
      };
      const response = await updateUserProfile(payload);

      if (response.data && response.data.user) {
        // Save user WITHOUT base64 image (avoids localStorage QuotaExceededError)
        const updatedUser = { ...response.data.user };
        delete updatedUser.profileImage;
        localStorage.setItem('adminUser', JSON.stringify(updatedUser));
        // Direct callback → most reliable way to update Dashboard navbar
        if (onProfileUpdate) onProfileUpdate();
        // Also fire event as fallback
        window.dispatchEvent(new Event('localStorageUpdated'));
      }

      message.success("Profile details updated successfully!");
    } catch (err) {
      message.error("Failed to update profile.");
    }
  };

  const handleUpdatePassword = async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      return message.error("Passwords do not match!");
    }
    try {
      await updatePassword(values);
      message.success("Password updated successfully!");
      passwordForm.resetFields();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update password.");
    }
  };

  const handleSecurityToggle = async (key, checked) => {
    const updated = { ...securitySettings, [key]: checked };
    setSecuritySettings(updated);
    try {
      await updateSecuritySettings(updated);
      message.success("Security settings updated!");
    } catch (err) {
      message.error("Failed to update security settings.");
      setSecuritySettings({ ...securitySettings, [key]: !checked }); // Revert on failure
    }
  };

  const handleRevokeSession = async (sessionId) => {
    try {
      await revokeSession(sessionId);
      setSessions(sessions.filter(s => s.id !== sessionId));
      message.success("Session revoked.");
    } catch (err) {
      message.error("Failed to revoke session.");
    }
  };

  const handleRevokeAll = async () => {
    try {
      await revokeAllSessions();
      setSessions(sessions.filter(s => s.isCurrent)); // Keep only current session
      message.success("All other sessions revoked.");
    } catch (err) {
      message.error("Failed to revoke sessions.");
    }
  };

  const tabs = [
    { id: 'Shipping', label: 'Shipping', icon: Truck },
    { id: 'Security', label: 'Admin & Security', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {



      case 'Shipping':
        return <ShippingTab />;



      case 'Security':
        return (
          <>
            <div className="settings-header">
              <h2>Admin Profile & Security</h2>
              <p>Update your personal information, contact details, and account security.</p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
              <h3 className="settings-section-title" style={{ marginTop: 0 }}>Personal Information</h3>
              <Form layout="vertical" form={profileForm} onFinish={handleUpdateProfile} autoComplete="off">
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                  <img src={profileData?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.fullName || 'Admin')}&background=random`} alt="Admin" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }} />
                  <div>
                    <AntUpload
                      showUploadList={false}
                      beforeUpload={(file) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const base64 = e.target.result;
                          setProfileData(prev => ({ ...(prev || {}), profileImage: base64 }));
                          // Save image in separate key (avoids user-object quota overflow)
                          try {
                            localStorage.setItem('adminProfileImage', base64);
                          } catch (quotaErr) {
                            console.warn('localStorage quota exceeded, image only in session', quotaErr);
                          }
                          // Direct callback updates Dashboard navbar immediately
                          if (onProfileUpdate) onProfileUpdate();
                          // Fallback event
                          window.dispatchEvent(new Event('localStorageUpdated'));
                          message.success(`Photo selected! Click "Save Changes" to apply.`);
                        };
                        reader.readAsDataURL(file);
                        return false;
                      }}
                    >
                      <Button icon={<Upload size={14} />} style={{ marginBottom: '8px', fontWeight: 500 }}>Upload New Photo</Button>
                    </AntUpload>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Recommended size: 400x400px (JPG or PNG)</div>
                  </div>
                </div>

                <div className="settings-form-row">
                  <Form.Item label="First Name" name="firstName" className="settings-form-group">
                    <Input size="large" />
                  </Form.Item>
                  <Form.Item label="Last Name" name="lastName" className="settings-form-group">
                    <Input size="large" />
                  </Form.Item>
                </div>

                <div className="settings-form-row">
                  <Form.Item label="Email Address" name="email" className="settings-form-group" tooltip="Email cannot be changed directly for security reasons.">
                    <Input size="large" disabled style={{ background: '#f9fafb', color: '#6b7280' }} />
                  </Form.Item>

                  {renderOptionalField('phone', 'Phone Number', <AutofillResistantInput size="large" />)}
                </div>

                <div className="settings-form-row">
                  {renderOptionalField('role', 'Role',
                    <Select size="large">
                      <Option value="Super Admin">Super Admin</Option>
                      <Option value="Manager">Manager</Option>
                      <Option value="Editor">Editor</Option>
                    </Select>
                  )}
                  {renderOptionalField('adminId', 'Admin ID', <Input size="large" />)}
                </div>

                <div className="settings-form-row">
                  {renderOptionalField('gender', 'Gender',
                    <Select size="large">
                      <Option value="Female">Female</Option>
                      <Option value="Male">Male</Option>
                      <Option value="Other">Other</Option>
                      <Option value="Prefer not to say">Prefer not to say</Option>
                    </Select>
                  )}
                  {renderOptionalField('country', 'Country', <Input size="large" />)}
                </div>

                <div className="settings-form-actions" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                  <button type="submit" className="settings-btn-save">Save Profile Details</button>
                </div>
              </Form>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
              <h3 className="settings-section-title" style={{ marginTop: 0 }}>Change Password</h3>
              <Form layout="vertical" form={passwordForm} onFinish={handleUpdatePassword}>


                <div className="settings-form-row">
                  <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]} className="settings-form-group">
                    <Input.Password className="settings-form-input" prefix={<Lock size={16} color="#9ca3af" />} />
                  </Form.Item>
                  <Form.Item label="Confirm New Password" name="confirmPassword" rules={[{ required: true }]} className="settings-form-group">
                    <Input.Password className="settings-form-input" prefix={<Lock size={16} color="#9ca3af" />} />
                  </Form.Item>
                </div>



                <div className="settings-form-actions" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                  <button type="button" className="settings-btn-cancel">Cancel</button>
                  <button type="submit" className="settings-btn-save">Update Password</button>
                </div>
              </Form>
            </div>


          </>
        );

      default:
        return (
          <>
            <div className="settings-header">
              <h2>{activeTab} Settings</h2>
              <p>Configure options and preferences for {activeTab.toLowerCase()}.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div style={{ padding: '40px 0', textAlign: 'center', color: '#9ca3af' }}>
                <SettingsIcon size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                <p>Specific configuration options for {activeTab} will appear here.</p>
                <p style={{ fontSize: '12px' }}>This section is ready to be populated with dedicated inputs.</p>
              </div>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Main Content */}
      <div className="settings-content" style={{
        width: '100%',
        maxWidth: '1000px',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
        border: '1px solid #f3f4f6',
        padding: '32px'
      }}>
        {/* Top Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: '"Inter", sans-serif',
                  cursor: 'pointer',
                  border: isActive ? 'none' : '1px solid #F0F0F0',
                  background: isActive ? '#A67634' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 4px 12px rgba(166, 118, 52, 0.2)' : 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export const ShippingTab = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success(`Shipping settings saved successfully!`);
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '24px' }}>
      <div className="settings-header">
        <h2>Shipping Settings</h2>
        <p>Configure shipping methods and rates.</p>
      </div>
      <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ freeShippingThreshold: 1000, flatRate: 50 }}>
        <div className="settings-form-row">
          <Form.Item label="Free Shipping Threshold (₹)" name="freeShippingThreshold" className="settings-form-group">
            <Input className="settings-form-input" type="number" />
          </Form.Item>
          <Form.Item label="Flat Shipping Rate (₹)" name="flatRate" className="settings-form-group">
            <Input className="settings-form-input" type="number" />
          </Form.Item>
        </div>
        <Form.Item label="Estimated Delivery Time" name="deliveryTime" className="settings-form-group">
          <Input className="settings-form-input" placeholder="e.g. 3-5 Business Days" />
        </Form.Item>
        <div className="settings-form-actions">
          <button type="submit" className="settings-btn-save">Save Changes</button>
        </div>
      </Form>
    </div>
  );
};

export default WebsiteSetting;
