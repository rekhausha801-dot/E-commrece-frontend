import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon, User, Store, ShoppingBag, CreditCard,
  Truck, FileText, Bell, Star, Zap, Shield, Search,
  Palette, Scale, Server, Upload, Save, Lock, Smartphone, Globe, Clock, CheckCircle2,
  Sliders, ChevronDown, Calendar, BarChart2, Lightbulb
} from 'lucide-react';
import { Form, Input, Switch, Select, Button, DatePicker, message, Divider, Upload as AntUpload } from 'antd';
import './Settings.css';

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

const WebsiteSetting = ({ initialTab = 'General' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleSave = () => {
    message.success(`${activeTab} settings saved successfully!`);
  };

  const tabs = [
    { id: 'General', label: 'General', icon: SettingsIcon },
    { id: 'Admin Profile', label: 'Admin Profile', icon: User },
    { id: 'Store', label: 'Store', icon: Store },
    { id: 'Orders', label: 'Orders', icon: ShoppingBag },
    { id: 'Payments', label: 'Payments', icon: CreditCard },
    { id: 'Shipping', label: 'Shipping', icon: Truck },
    { id: 'Taxes', label: 'Taxes', icon: FileText },
    { id: 'Notifications', label: 'Notifications', icon: Bell },
    { id: 'Reviews', label: 'Reviews', icon: Star },
    { id: 'Coupons', label: 'Coupons', icon: Zap },
    { id: 'Security', label: 'Security', icon: Shield },
    { id: 'SEO', label: 'SEO', icon: Search },
    { id: 'Appearance', label: 'Appearance', icon: Palette },
    { id: 'Legal & Policies', label: 'Legal & Policies', icon: Scale },
    { id: 'System', label: 'System', icon: Server },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'General':
        return (
          <div style={{ fontFamily: '"Inter", sans-serif', maxWidth: '900px', padding: '10px' }}>
            {/* Main Wrapper */}
            <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #f3f4f6' }}>

              {/* Header Section with Wave Background */}
              <div style={{
                background: 'linear-gradient(120deg, #fffaf0 0%, #fef3e2 50%, #f6e8d2 100%)',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%23e8dcca\' fill-opacity=\'0.3\' d=\'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,192C960,203,1056,181,1152,149.3C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z\'%3E%3C/path%3E%3C/svg%3E")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '24px 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '700', color: '#111827', letterSpacing: '-0.3px' }}>Account Settings & General</h2>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Manage your preferences, language, and session settings.</p>
                </div>
                <button onClick={form.submit} style={{
                  background: '#c08933', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(192, 137, 51, 0.2)', whiteSpace: 'nowrap', flexShrink: 0
                }}>
                  <Save size={16} /> Save Changes
                </button>
              </div>

              {/* Form Content Wrapper */}
              <div style={{ padding: '16px 32px 32px 32px' }}>
                <div style={{ border: '1px solid #f3f4f6', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.01)' }}>

                  <Form layout="vertical" onFinish={handleSave} form={form} initialValues={{ currency: 'INR', timezone: 'IST', dateFormat: 'DD/MM/YYYY', language: 'English', dashboardView: 'Analytics' }} style={{ padding: '0' }}>

                    {/* Preferences Section Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Sliders size={24} color="#b45309" />
                      </div>
                      <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '17px', fontWeight: '700', color: '#111827' }}>Preferences</h3>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>Customize your store experience</p>
                      </div>
                    </div>

                    {/* Grid Inputs */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                      <Form.Item name="language" label={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#111827' }}><Globe size={15} color="#4b5563" /> Language</span>} style={{ marginBottom: 0 }}>
                        <Select suffixIcon={<ChevronDown size={16} color="#6b7280" />} style={{ height: '44px' }} className="custom-setting-select">
                          <Option value="English">English</Option>
                          <Option value="Tamil">Tamil</Option>
                          <Option value="Hindi">Hindi</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item name="timezone" label={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#111827' }}><Clock size={15} color="#4b5563" /> Time Zone</span>} style={{ marginBottom: 0 }}>
                        <Select suffixIcon={<ChevronDown size={16} color="#6b7280" />} style={{ height: '44px' }} className="custom-setting-select">
                          <Option value="IST">(UTC+05:30) Chennai, Kolkata, Mumbai</Option>
                          <Option value="UTC">(UTC+00:00) Universal Time Coordinated</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item name="dateFormat" label={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#111827' }}><Calendar size={15} color="#4b5563" /> Date Format</span>} style={{ marginBottom: 0 }}>
                        <Select suffixIcon={<ChevronDown size={16} color="#6b7280" />} style={{ height: '44px' }} className="custom-setting-select">
                          <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                          <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                          <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item name="currency" label={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#111827' }}><span style={{ color: '#4b5563', fontSize: '14px', fontWeight: '500' }}>₹</span> Currency</span>} style={{ marginBottom: 0 }}>
                        <Select suffixIcon={<ChevronDown size={16} color="#6b7280" />} style={{ height: '44px' }} className="custom-setting-select">
                          <Option value="INR">₹ INR - Indian Rupee</Option>
                          <Option value="USD">$ USD - US Dollar</Option>
                        </Select>
                      </Form.Item>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                      <Form.Item name="dashboardView" label={<span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', color: '#111827' }}><BarChart2 size={15} color="#4b5563" /> Default Dashboard View</span>} style={{ marginBottom: 0 }}>
                        <Select suffixIcon={<ChevronDown size={16} color="#6b7280" />} style={{ height: '44px' }} className="custom-setting-select">
                          <Option value="Analytics">Analytics Dashboard</Option>
                          <Option value="Orders">Orders Overview</Option>
                          <Option value="Products">Products Management</Option>
                        </Select>
                      </Form.Item>
                    </div>

                    {/* Tip Box */}
                    <div style={{ marginTop: '40px', background: '#fffaf0', borderRadius: '12px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #ffedd5' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Lightbulb size={20} color="#b45309" />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: '700', color: '#b45309' }}>Tip</h4>
                        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>These preferences will be applied across your admin account and store.</p>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Admin Profile':
        return (
          <>
            <div className="settings-header">
              <h2>My Profile</h2>
              <p>Update your personal information and contact details.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave} initialValues={{ firstName: 'Admin', lastName: 'User', email: 'admin@relietech.com', phone: '+91 98765 43210', role: 'Super Admin', adminId: 'ADM-2025-01X', gender: 'Female', country: 'India' }}>

              <h3 className="settings-section-title" style={{ marginTop: 0 }}>Personal Information</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px' }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Admin" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #e5e7eb' }} />
                <div>
                  <AntUpload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      message.success(`${file.name} uploaded successfully!`);
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
                <Form.Item label="Phone Number" name="phone" className="settings-form-group">
                  <Input size="large" />
                </Form.Item>
              </div>

              <div className="settings-form-row">
                <Form.Item label="Role" name="role" className="settings-form-group">
                  <Input size="large" disabled style={{ background: '#f9fafb', color: '#6b7280', fontWeight: 'bold' }} />
                </Form.Item>
                <Form.Item label="Admin ID" name="adminId" className="settings-form-group">
                  <Input size="large" disabled style={{ background: '#f9fafb', color: '#6b7280' }} />
                </Form.Item>
              </div>

              <Divider style={{ borderColor: '#e5e7eb' }} />

              <h3 className="settings-section-title">Additional Information</h3>
              <div className="settings-form-row">
                <Form.Item label="Date of Birth" name="dob" className="settings-form-group">
                  <DatePicker size="large" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Gender" name="gender" className="settings-form-group">
                  <Select size="large" style={{ width: '100%' }}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                    <Option value="Other">Other</Option>
                    <Option value="Prefer not to say">Prefer not to say</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item label="Country" name="country" className="settings-form-group">
                <Select size="large" style={{ width: '100%' }}>
                  <Option value="India">India</Option>
                  <Option value="USA">United States</Option>
                  <Option value="UK">United Kingdom</Option>
                </Select>
              </Form.Item>

              <div className="settings-form-actions">
                <button type="button" className="settings-btn-cancel">Cancel</button>
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Store':
        return (
          <>
            <div className="settings-header">
              <h2>Store Settings</h2>
              <p>Configure store visibility and global shopping features.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave} initialValues={{ storeStatus: 'open' }}>
              <Form.Item label="Store Status" name="storeStatus" className="settings-form-group">
                <Select className="settings-form-input" style={{ padding: 0, border: 'none' }}>
                  <Option value="open">Open (Live)</Option>
                  <Option value="maintenance">Maintenance Mode</Option>
                  <Option value="closed">Closed</Option>
                </Select>
              </Form.Item>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Allow New Orders</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Enable or disable checkout completely.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Guest Checkout</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Allow users to buy without creating an account.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Out-of-stock Visibility</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Show out of stock products in catalog.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Orders':
        return (
          <>
            <div className="settings-header">
              <h2>Order Settings</h2>
              <p>Manage rules for cart, checkout, and order fulfillment.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div className="settings-form-row">
                <Form.Item label="Minimum Order Amount (₹)" name="minOrder" className="settings-form-group">
                  <Input className="settings-form-input" type="number" placeholder="e.g. 500" />
                </Form.Item>
                <Form.Item label="Auto-Cancellation Time (Hours)" name="autoCancel" className="settings-form-group">
                  <Input className="settings-form-input" type="number" placeholder="48" />
                </Form.Item>
              </div>
              <Form.Item label="Return Window (Days)" name="returnWindow" className="settings-form-group">
                <Select className="settings-form-input" style={{ padding: 0, border: 'none' }} defaultValue="7">
                  <Option value="0">No Returns Allowed</Option>
                  <Option value="7">7 Days</Option>
                  <Option value="10">10 Days</Option>
                  <Option value="15">15 Days</Option>
                  <Option value="30">30 Days</Option>
                </Select>
              </Form.Item>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Payments':
        return (
          <>
            <div className="settings-header">
              <h2>Payment Settings</h2>
              <p>Configure payment gateways and transaction methods.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Cash on Delivery (COD)</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Allow customers to pay upon delivery.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <h3 className="settings-section-title">Razorpay Gateway</h3>
              <Form.Item label="Razorpay Key ID" name="razorpayKey" className="settings-form-group">
                <Input.Password className="settings-form-input" placeholder="rzp_live_xxxxxxxxxxx" />
              </Form.Item>
              <Form.Item label="Razorpay Key Secret" name="razorpaySecret" className="settings-form-group">
                <Input.Password className="settings-form-input" placeholder="••••••••••••••••••••" />
              </Form.Item>

              <h3 className="settings-section-title">Stripe Gateway</h3>
              <Form.Item label="Stripe Publishable Key" name="stripePub" className="settings-form-group">
                <Input.Password className="settings-form-input" placeholder="pk_live_xxxxxxxxxxx" />
              </Form.Item>
              <Form.Item label="Stripe Secret Key" name="stripeSec" className="settings-form-group">
                <Input.Password className="settings-form-input" placeholder="sk_live_xxxxxxxxxxx" />
              </Form.Item>

              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save API Keys</button>
              </div>
            </Form>
          </>
        );

      case 'Legal & Policies':
        return (
          <>
            <div className="settings-header">
              <h2>Legal & Policies</h2>
              <p>Set up terms, privacy policies, and refund rules for your store.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave} initialValues={{ privacyPolicy: defaultPrivacyPolicy, terms: defaultTerms, refund: defaultRefund }}>
              <Form.Item label="Privacy Policy" name="privacyPolicy" className="settings-form-group">
                <TextArea className="settings-form-input settings-form-textarea" style={{ minHeight: '150px' }} placeholder="Enter your privacy policy text here..." />
              </Form.Item>
              <Form.Item label="Terms & Conditions" name="terms" className="settings-form-group">
                <TextArea className="settings-form-input settings-form-textarea" style={{ minHeight: '150px' }} placeholder="Enter terms and conditions..." />
              </Form.Item>
              <Form.Item label="Return & Refund Policy" name="refund" className="settings-form-group">
                <TextArea className="settings-form-input settings-form-textarea" style={{ minHeight: '150px' }} placeholder="Enter return rules..." />
              </Form.Item>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Policies</button>
              </div>
            </Form>
          </>
        );

      case 'Shipping':
        return (
          <>
            <div className="settings-header">
              <h2>Shipping Settings</h2>
              <p>Configure shipping methods and rates.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave} initialValues={{ freeShippingThreshold: 1000, flatRate: 50 }}>
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
          </>
        );

      case 'Taxes':
        return (
          <>
            <div className="settings-header">
              <h2>Tax Settings</h2>
              <p>Manage GST and tax inclusion rules.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave} initialValues={{ gstRate: 18 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Enable GST</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Calculate GST during checkout.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Tax Included in Price</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Prices shown to customers already include tax.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Form.Item label="Default GST Rate (%)" name="gstRate" className="settings-form-group">
                <Input className="settings-form-input" type="number" style={{ width: '200px' }} />
              </Form.Item>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Notifications':
        return (
          <>
            <div className="settings-header">
              <h2>Notification Settings</h2>
              <p>Configure which automated alerts and updates you receive.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>

                {/* Admin Alerts */}
                <div>
                  <h3 className="settings-section-title" style={{ marginBottom: '24px' }}>Admin Panel Alerts</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Order Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Alerts for new orders and cancellations.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Payment Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Alerts for successful payments and refunds.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Review Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Alerts for new product reviews.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Customer Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Alerts for new customer registrations.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                {/* System & Delivery Methods */}
                <div>
                  <h3 className="settings-section-title" style={{ marginBottom: '24px' }}>System & Delivery</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Inventory Alerts</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Alerts for low stock and out of stock items.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>System Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Important system and security alerts.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ width: '100%', height: '1px', background: '#e5e7eb', margin: '4px 0' }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Email Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Receive alerts directly to admin email.</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Push Notifications</h4>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Receive desktop push notifications.</p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </div>

              </div>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Reviews':
        return (
          <>
            <div className="settings-header">
              <h2>Review Settings</h2>
              <p>Configure product review moderation and rules.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Enable Product Reviews</h4>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Admin Approval Required</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Reviews must be manually approved.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Allow Review Photos</h4>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Coupons':
        return (
          <>
            <div className="settings-header">
              <h2>Coupon & Promotion Settings</h2>
              <p>Manage global coupon configurations.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Enable Coupons System</h4>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
              <Form.Item label="Maximum Discount Amount (₹)" name="maxDiscount" className="settings-form-group">
                <Input className="settings-form-input" type="number" style={{ width: '200px' }} placeholder="e.g. 2000" />
              </Form.Item>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Changes</button>
              </div>
            </Form>
          </>
        );

      case 'Security':
        return (
          <>
            <div className="settings-header">
              <h2>Security & Activity</h2>
              <p>Update your password and monitor login activity to keep your account secure.</p>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
              <h3 className="settings-section-title" style={{ marginTop: 0 }}>Change Password</h3>
              <Form layout="vertical" onFinish={handleSave}>
                <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true }]} className="settings-form-group">
                  <Input.Password className="settings-form-input" prefix={<Lock size={16} color="#9ca3af" />} />
                </Form.Item>

                <div className="settings-form-row">
                  <Form.Item label="New Password" name="newPassword" rules={[{ required: true }]} className="settings-form-group">
                    <Input.Password className="settings-form-input" prefix={<Lock size={16} color="#9ca3af" />} />
                  </Form.Item>
                  <Form.Item label="Confirm New Password" name="confirmPassword" rules={[{ required: true }]} className="settings-form-group">
                    <Input.Password className="settings-form-input" prefix={<Lock size={16} color="#9ca3af" />} />
                  </Form.Item>
                </div>

                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 600, color: '#374151' }}>Password Requirements:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6b7280', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li>Minimum 8 characters long</li>
                    <li>At least one uppercase and one lowercase letter</li>
                    <li>At least one number (0-9)</li>
                    <li>At least one special character (!@#$%^&*)</li>
                  </ul>
                </div>

                <div className="settings-form-actions" style={{ padding: 0, border: 'none', background: 'transparent' }}>
                  <button type="button" className="settings-btn-cancel">Cancel</button>
                  <button type="submit" className="settings-btn-save">Update Password</button>
                </div>
              </Form>
            </div>

            <div style={{ background: '#fff', border: '1px solid #f3f4f6', borderRadius: '16px', padding: '24px' }}>
              <h3 className="settings-section-title" style={{ marginTop: 0 }}>Security Overview</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Two-Factor Authentication</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Add an extra layer of security to your account.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>Email Verification</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>admin@relietech.com is verified.</p>
                  </div>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '13px', fontWeight: 600, background: '#ecfdf5', padding: '4px 10px', borderRadius: '12px' }}>
                    <CheckCircle2 size={14} /> Verified
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111827' }}>New Device Login Alert</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Get notified if anyone logs into your account from a new device.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Divider style={{ borderColor: '#e5e7eb' }} />

              <h3 className="settings-section-title">Active Sessions</h3>
              <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>These devices are currently logged into your account.</p>

              <div style={{ border: '1px solid #f3f4f6', borderRadius: '12px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f9fafb', borderBottom: '1px solid #f3f4f6' }}>
                      <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Device</th>
                      <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Location</th>
                      <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Last Active</th>
                      <th style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#6b7280' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}>
                          <Globe size={16} color="#3b82f6" /> Chrome / Windows
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#4b5563' }}>Chennai, India</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#10b981', fontWeight: 500 }}>Current Session</td>
                      <td style={{ padding: '12px 16px' }}></td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 500 }}>
                          <Smartphone size={16} color="#6b7280" /> Safari / iPhone
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#4b5563' }}>Bangalore, India</td>
                      <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>2 hours ago</td>
                      <td style={{ padding: '12px 16px' }}>
                        <button style={{ color: '#ef4444', background: 'none', border: 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Revoke</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <button style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  Logout All Other Devices
                </button>
              </div>

            </div>
          </>
        );

      case 'SEO':
        return (
          <>
            <div className="settings-header">
              <h2>SEO Settings</h2>
              <p>Configure search engine optimization and tracking.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <Form.Item label="Global Meta Title" name="metaTitle" className="settings-form-group">
                <Input className="settings-form-input" placeholder="e.g. RelieTech | Premium Fashion" />
              </Form.Item>
              <Form.Item label="Global Meta Description" name="metaDesc" className="settings-form-group">
                <TextArea className="settings-form-input settings-form-textarea" style={{ minHeight: '80px' }} placeholder="Default description for search engines..." />
              </Form.Item>
              <Form.Item label="Global Keywords" name="keywords" className="settings-form-group">
                <Input className="settings-form-input" placeholder="fashion, premium, dresses, online shopping" />
              </Form.Item>
              <div className="settings-form-row">
                <Form.Item label="Google Analytics ID" name="gaId" className="settings-form-group">
                  <Input className="settings-form-input" placeholder="G-XXXXXXXXXX" />
                </Form.Item>
                <Form.Item label="Search Console Verification" name="searchConsole" className="settings-form-group">
                  <Input className="settings-form-input" placeholder="Verification string" />
                </Form.Item>
              </div>
              <div className="settings-form-actions">
                <button type="button" className="settings-btn-cancel">Generate Sitemap</button>
                <button type="submit" className="settings-btn-save">Save SEO Settings</button>
              </div>
            </Form>
          </>
        );

      case 'Appearance':
        return (
          <>
            <div className="settings-header">
              <h2>Appearance</h2>
              <p>Customize the look and feel of your Admin Panel and Emails.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave} initialValues={{ theme: 'light', brandColor: '#c9a05b' }}>
              <div className="settings-form-row">
                <Form.Item label="Admin Panel Theme" name="theme" className="settings-form-group">
                  <Select className="settings-form-input" style={{ padding: 0, border: 'none' }}>
                    <Option value="light">Light Theme</Option>
                    <Option value="dark">Dark Theme (Premium)</Option>
                    <Option value="system">System Default</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Primary Brand Color" name="brandColor" className="settings-form-group">
                  <Input type="color" className="settings-form-input" style={{ padding: '2px 8px', cursor: 'pointer', height: '44px', width: '100%' }} />
                </Form.Item>
              </div>
              <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#374151' }}>Store Logo</h4>
                  <div style={{ border: '1px dashed #d1d5db', padding: '24px', borderRadius: '12px', textAlign: 'center', background: '#f9fafb' }}>
                    <Button icon={<Upload size={14} />}>Upload Logo</Button>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#374151' }}>Favicon</h4>
                  <div style={{ border: '1px dashed #d1d5db', padding: '24px', borderRadius: '12px', textAlign: 'center', background: '#f9fafb' }}>
                    <Button icon={<Upload size={14} />}>Upload Favicon</Button>
                  </div>
                </div>
              </div>
              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save Appearance</button>
              </div>
            </Form>
          </>
        );

      case 'System':
        return (
          <>
            <div className="settings-header">
              <h2>System & Maintenance</h2>
              <p>Manage core system operations and health.</p>
            </div>
            <Form layout="vertical" onFinish={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fffbeb', padding: '16px', borderLeft: '4px solid #d97706', borderRadius: '8px' }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#92400e' }}>Maintenance Mode</h4>
                    <p style={{ margin: 0, fontSize: '12px', color: '#b45309' }}>Disable storefront access for customers.</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Cache Management</h4>
                  <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#6b7280' }}>Clear application and view cache.</p>
                  <Button>Clear Cache</Button>
                </div>
                <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '12px' }}>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>Database Backup</h4>
                  <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#6b7280' }}>Download a complete database backup.</p>
                  <Button icon={<Save size={14} />}>Generate Backup</Button>
                </div>
              </div>

              <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', fontSize: '12px', color: '#6b7280' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Current Version:</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>v2.4.1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>API Status:</span>
                  <span style={{ fontWeight: 600, color: '#059669' }}>Operational</span>
                </div>
              </div>

              <div className="settings-form-actions">
                <button type="submit" className="settings-btn-save">Save System Config</button>
              </div>
            </Form>
          </>
        );

      // Rendering a generic form for the remaining tabs for brevity in this initial setup.
      // We can expand these specific tabs if the user wants detailed inputs for all 15 right away.
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
    <div className="settings-container">
      <div className="settings-sidebar">
        <h3>SETTINGS</h3>
        <nav className="settings-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="settings-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default WebsiteSetting;
