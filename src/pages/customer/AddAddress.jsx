import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, Phone, Home, Briefcase, Tag, MapPin, Building, Flag, Mail, Map, Globe, Check, ArrowLeft
} from 'lucide-react';
import './AddAddress.css';

const AddAddress = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = location.state?.isEdit || false;
  const addressData = location.state?.addressData;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    country: 'India',
    pincode: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    landmark: '',
    addressType: 'Home',
    isDefault: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  useEffect(() => {
    if (isEdit && addressData) {
      setFormData(addressData);
    }
  }, [isEdit, addressData]);

  const handleSave = () => {
    if (!formData.fullName || !formData.phone || !formData.pincode || !formData.address1 || !formData.city || !formData.state) {
      alert("Please fill all required fields");
      return;
    }

    const stored = localStorage.getItem('userAddresses');
    let addresses = stored ? JSON.parse(stored) : [];

    if (isEdit && addressData) {
      addresses = addresses.map(addr => addr.id === addressData.id ? { ...formData, id: addressData.id } : addr);
    } else {
      const newAddress = { ...formData, id: Date.now() };
      addresses.push(newAddress);
    }

    if (formData.isDefault) {
      addresses = addresses.map(addr => ({
        ...addr,
        isDefault: (isEdit && addressData ? addr.id === addressData.id : addr.id === addresses[addresses.length-1].id)
      }));
    }

    localStorage.setItem('userAddresses', JSON.stringify(addresses));
    navigate('/account/addresses');
  };

  return (
    <div className="add-address-container-flat">
      
      <div className="aa-flat-card">
        <div className="aa-flat-header">
          <button className="aa-back-btn" onClick={() => navigate('/account/addresses')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="aa-title">{isEdit ? 'Edit Address' : 'Add New Address'}</h1>
            <p className="aa-subtitle">{isEdit ? 'Update your address details' : 'Add a new address for faster checkout'}</p>
          </div>
        </div>

        {/* Row 1 */}
        <div className="aa-form-row">
          <div className="aa-form-group">
            <label>Full Name</label>
            <div className="aa-input-with-icon">
              <User size={18} className="aa-input-icon" />
              <input type="text" name="fullName" placeholder="Rekha" value={formData.fullName} onChange={handleChange} className="aa-input has-icon" />
            </div>
          </div>
          <div className="aa-form-group">
            <label>Phone Number</label>
            <div className="aa-input-with-icon">
              <Phone size={18} className="aa-input-icon" />
              <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} className="aa-input has-icon" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="aa-form-row">
          <div className="aa-form-group">
            <label>Address Line 1</label>
            <div className="aa-input-with-icon">
              <MapPin size={18} className="aa-input-icon" />
              <input type="text" name="address1" placeholder="12, Green Park Street" value={formData.address1} onChange={handleChange} className="aa-input has-icon" />
            </div>
          </div>
          <div className="aa-form-group">
            <label>Address Line 2 (Optional)</label>
            <div className="aa-input-with-icon">
              <Building size={18} className="aa-input-icon" />
              <input type="text" name="address2" placeholder="Apartment, suite, unit, building, floor, etc." value={formData.address2} onChange={handleChange} className="aa-input has-icon" />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="aa-form-row">
          <div className="aa-form-group">
            <label>Landmark (Optional)</label>
            <div className="aa-input-with-icon">
              <Flag size={18} className="aa-input-icon" />
              <input type="text" name="landmark" placeholder="Near Vellore Bus Stand" value={formData.landmark} onChange={handleChange} className="aa-input has-icon" />
            </div>
          </div>
          <div className="aa-form-group">
            <label>Pincode</label>
            <div className="aa-input-with-icon">
              <Mail size={18} className="aa-input-icon" />
              <input type="text" name="pincode" placeholder="632001" value={formData.pincode} onChange={handleChange} className="aa-input has-icon" />
            </div>
          </div>
        </div>

        {/* Row 4 */}
        <div className="aa-form-row three-col">
          <div className="aa-form-group">
            <label>City</label>
            <div className="aa-input-with-icon">
              <Building size={18} className="aa-input-icon" />
              <select name="city" value={formData.city} onChange={handleChange} className="aa-select has-icon">
                <option value="">Select city</option>
                <option value="Vellore">Vellore</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>
          <div className="aa-form-group">
            <label>State</label>
            <div className="aa-input-with-icon">
              <Map size={18} className="aa-input-icon" />
              <select name="state" value={formData.state} onChange={handleChange} className="aa-select has-icon">
                <option value="">Select state</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Kerala">Kerala</option>
              </select>
            </div>
          </div>
          <div className="aa-form-group">
            <label>Country</label>
            <div className="aa-input-with-icon">
              <Globe size={18} className="aa-input-icon" />
              <select name="country" value={formData.country} onChange={handleChange} className="aa-select has-icon">
                <option value="India">India</option>
                <option value="USA">USA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 5: Address Type */}
        <div className="aa-form-group aa-type-section" style={{ marginBottom: '32px' }}>
          <label className="aa-type-header"><Home size={18} className="aa-type-header-icon" /> Address Type</label>
          <div className="aa-flat-type-group">
            <label className={`aa-flat-type-card ${formData.addressType === 'Home' ? 'selected' : ''}`}>
              <input type="radio" name="addressType" value="Home" checked={formData.addressType === 'Home'} onChange={handleChange} className="aa-hidden-radio" />
              {formData.addressType === 'Home' && (
                <div className="aa-type-badge"><Check size={12} color="white" strokeWidth={3} /></div>
              )}
              <Home size={24} className="aa-type-icon" />
              <span className="aa-type-title">Home</span>
              <span className="aa-type-subtitle">Deliver to home address</span>
            </label>
            <label className={`aa-flat-type-card ${formData.addressType === 'Work' ? 'selected' : ''}`}>
              <input type="radio" name="addressType" value="Work" checked={formData.addressType === 'Work'} onChange={handleChange} className="aa-hidden-radio" />
              {formData.addressType === 'Work' && (
                <div className="aa-type-badge"><Check size={12} color="white" strokeWidth={3} /></div>
              )}
              <Briefcase size={24} className="aa-type-icon" />
              <span className="aa-type-title">Work</span>
              <span className="aa-type-subtitle">Deliver to office address</span>
            </label>
            <label className={`aa-flat-type-card ${formData.addressType === 'Other' ? 'selected' : ''}`}>
              <input type="radio" name="addressType" value="Other" checked={formData.addressType === 'Other'} onChange={handleChange} className="aa-hidden-radio" />
              {formData.addressType === 'Other' && (
                <div className="aa-type-badge"><Check size={12} color="white" strokeWidth={3} /></div>
              )}
              <MapPin size={24} className="aa-type-icon" />
              <span className="aa-type-title">Other</span>
              <span className="aa-type-subtitle">Other address type</span>
            </label>
          </div>
        </div>

        {/* Save As */}
        <div className="aa-form-group aa-save-as-section">
          <label className="aa-save-as-header">Save As</label>
          <label className="aa-flat-checkbox">
            <input type="checkbox" name="isDefault" checked={formData.isDefault} onChange={handleChange} className="aa-hidden-checkbox" />
            <span className="aa-checkbox-box">
              {formData.isDefault && <Check size={14} color="white" />}
            </span>
            <div className="aa-checkbox-text">
              <span className="aa-checkbox-title">Set as default address</span>
              <span className="aa-checkbox-subtitle">This address will be used by default at checkout</span>
            </div>
          </label>
        </div>

        {/* Bottom Actions */}
        <div className="aa-flat-actions-row">
          <button className="aa-flat-btn-cancel" onClick={() => navigate('/account/addresses')}>Cancel</button>
          <button className="aa-flat-btn-save" onClick={handleSave}>
            Save Address
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddAddress;
