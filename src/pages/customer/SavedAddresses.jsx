import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, MapPin, Edit2, Trash2 } from 'lucide-react';
import './SavedAddresses.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SavedAddresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/addresses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setAddresses(data.addresses);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (address) => {
    navigate('/account/add-address', {
      state: {
        isEdit: true,
        addressData: address
      }
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const token = localStorage.getItem('token');
      try {
        await fetch(`${API_URL}/addresses/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchAddresses();
      } catch (error) {
        console.error('Error deleting address:', error);
      }
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

        {isLoading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
            No saved addresses found. Please add a new address.
          </div>
        ) : (
          addresses.map((addr) => (
            <div className="sa-card" key={addr._id}>

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
                  {addr.addressLine1},<br />
                  {addr.addressLine2 && <>{addr.addressLine2},<br /></>}
                  {addr.city}, {addr.state} - {addr.pincode}<br />
                  {addr.country}
                </div>

                <div className="sa-phone">
                  {addr.mobileNumber}
                </div>
              </div>

              <div className="sa-card-right">
                <button className="sa-action-btn edit" title="Edit Address" onClick={() => handleEdit(addr)}>
                  <Edit2 size={16} />
                </button>
                <button className="sa-action-btn delete" title="Delete Address" onClick={() => handleDelete(addr._id)}>
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
