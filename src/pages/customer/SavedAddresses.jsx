import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import './SavedAddresses.css';

const defaultAddress = {
  id: 1,
  fullName: 'Rekha R',
  phone: '98765 43210',
  country: 'India',
  pincode: '635503',
  address1: '12, Lake View Street, Madhanur, Thirupattur Dist',
  city: 'Thirupattur',
  state: 'Tamil Nadu',
  landmark: '',
  addressType: 'Home',
  isDefault: true
};

const SavedAddresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('userAddresses');
    if (stored) {
      setAddresses(JSON.parse(stored));
    } else {
      setAddresses([defaultAddress]);
      localStorage.setItem('userAddresses', JSON.stringify([defaultAddress]));
    }
  }, []);

  const handleEdit = (address) => {
    navigate('/account/add-address', {
      state: {
        isEdit: true,
        addressData: address
      }
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updated = addresses.filter(addr => addr.id !== id);
      setAddresses(updated);
      localStorage.setItem('userAddresses', JSON.stringify(updated));
    }
  };

  return (
    <div className="saved-addresses-container">

      {/* Header */}
      <div className="sa-header">
        <h1 className="sa-title">My Address</h1>
        <button
          className="sa-add-btn"
          onClick={() => navigate('/account/add-address')}
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      {/* Address List */}
      <div className="sa-list">

        {addresses.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            No saved addresses found. Please add a new address.
          </div>
        ) : (
          addresses.map((addr) => (
            <div className="sa-card" key={addr.id}>

              <div className="sa-card-left">
                <div className="sa-icon-wrapper">
                  <MapPin size={24} className="sa-icon" />
                </div>
              </div>

              <div className="sa-card-middle">
                <div className="sa-name-row">
                  <h2 className="sa-name">{addr.fullName}</h2>
                  {addr.isDefault && <span className="sa-badge">Default</span>}
                </div>

                <div className="sa-address-text">
                  {addr.address1},<br />
                  {addr.city}, {addr.state} - {addr.pincode}<br />
                  {addr.country}
                </div>

                <div className="sa-phone">
                  {addr.phone}
                </div>
              </div>

              <div className="sa-card-right">
                <button className="sa-action-btn edit" title="Edit Address" onClick={() => handleEdit(addr)}>
                  <Edit2 size={16} />
                </button>
                <button className="sa-action-btn delete" title="Delete Address" onClick={() => handleDelete(addr.id)}>
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default SavedAddresses;
