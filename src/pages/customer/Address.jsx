import React, { useState } from 'react';
import { MapPin, Phone, Crosshair, X, Check, ShoppingBag, CreditCard, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Address.css';
import './Cart.css'; // Reusing some base styles like stepper
import CheckoutStepper from '../../components/CheckoutStepper';

const Address = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [addressForm, setAddressForm] = useState({
    name: '',
    phone: '',
    house: '',
    road: '',
    pincode: '',
    city: '',
    state: '',
    landmark: '',
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Elumalai',
      phone: '6379380743',
      house: 'No 294 murungan nagar kilmurungai',
      road: 'Mc road, Murungan nagar',
      pincode: '635812',
      city: 'Vellore',
      state: 'Tamil Nadu',
      landmark: '',
    }
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState(1);

  const openAddDrawer = () => {
    setIsEditing(false);
    setAddressForm({
      name: '',
      phone: '',
      house: '',
      road: '',
      pincode: '',
      city: '',
      state: '',
      landmark: '',
    });
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (addr) => {
    setIsEditing(true);
    setAddressForm(addr);
    setIsDrawerOpen(true);
  };

  const saveAddress = () => {
    if (isEditing) {
      setAddresses(prev => prev.map(a => a.id === addressForm.id ? { ...addressForm } : a));
    } else {
      const newAddress = { ...addressForm, id: Date.now() };
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddressId(newAddress.id);
    }
    setIsDrawerOpen(false);
  };

  const handleFieldChange = (field) => (e) => {
    setAddressForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="lux-address-page">
      <div className="lux-cart-container">
        <CheckoutStepper currentStep={2} />

        <div className="lux-address-layout">

        <div className="lux-address-header-container">
          <div className="lux-address-header-row">
            <h2>Select Delivery Address</h2>
            <button className="add-new-btn" onClick={openAddDrawer}>+ ADD NEW ADDRESS</button>
          </div>
          <div></div> {/* Empty space for right column */}
        </div>

        <div className="lux-address-cards-container">
          <div className="lux-address-list">
            {addresses.map(addr => (
              <div 
                key={addr.id} 
                className={`lux-address-card ${selectedAddressId === addr.id ? 'selected' : ''}`}
                onClick={() => setSelectedAddressId(addr.id)}
              >
                <div className="card-top-row">
                  <div className={`radio-circle ${selectedAddressId === addr.id ? 'selected' : ''}`}>
                    <div className="inner-dot"></div>
                  </div>
                  <span className="address-name">{addr.name}</span>
                  <button className="edit-text-btn" onClick={(e) => { e.stopPropagation(); openEditDrawer(addr); }}>EDIT</button>
                </div>
                <div className="address-details">
                  {addr.house}, {addr.road},<br />
                  {addr.city}, {addr.state}, {addr.pincode}
                </div>
                <div className="address-phone">
                  {addr.phone}
                </div>
                {selectedAddressId === addr.id && (
                  <button className="deliver-btn" onClick={(e) => { e.stopPropagation(); navigate('/payment'); }}>Deliver to this Address</button>
                )}
              </div>
            ))}
          </div>

          <div className="addr-price-details-card">
            <h3>Price Details (10 Items)</h3>
            <div className="addr-price-row">
              <span>Product Price</span>
              <span>+ ₹2138</span>
            </div>
            <div className="addr-price-row">
              <span>Additional Fees</span>
              <span>+ ₹60</span>
            </div>
            <div className="addr-price-divider"></div>
            <div className="addr-price-total-row">
              <span>Order Total</span>
              <span>₹2198</span>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Side Drawer */}
      {isDrawerOpen && (
        <>
          <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
          <div className="address-drawer">
            <div className="drawer-header">
              <h3>{isEditing ? 'EDIT ADDRESS' : 'ADD DELIVERY ADDRESS'}</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="close-btn"><X size={24} color="#1A1A1A" /></button>
            </div>

            <div className="drawer-content">
              <div className="drawer-section">
                <div className="section-title-row">
                  <div className="section-title"><Phone size={18} color="#B58D4E" /> Contact Details</div>
                  <button className="location-btn"><Crosshair size={14} /> Use My Location</button>
                </div>
                <input
                  type="text"
                  className="underline-input"
                  placeholder="Name"
                  value={addressForm.name}
                  onChange={handleFieldChange('name')}
                />
                <input
                  type="text"
                  className="underline-input"
                  placeholder="Contact Number"
                  value={addressForm.phone}
                  onChange={handleFieldChange('phone')}
                />
              </div>

              <div className="drawer-section">
                <div className="section-title-row">
                  <div className="section-title"><MapPin size={18} color="#B58D4E" /> Address</div>
                </div>
                <input
                  type="text"
                  className="underline-input"
                  placeholder="House no./ Building name"
                  value={addressForm.house}
                  onChange={handleFieldChange('house')}
                />
                <input
                  type="text"
                  className="underline-input"
                  placeholder="Road name / Area / Colony"
                  value={addressForm.road}
                  onChange={handleFieldChange('road')}
                />
                <input
                  type="text"
                  className="underline-input"
                  placeholder="Pincode"
                  value={addressForm.pincode}
                  onChange={handleFieldChange('pincode')}
                />
                <input
                  type="text"
                  className="underline-input"
                  placeholder="City"
                  value={addressForm.city}
                  onChange={handleFieldChange('city')}
                />
                <input
                  type="text"
                  className="underline-input"
                  placeholder="State"
                  value={addressForm.state}
                  onChange={handleFieldChange('state')}
                />
                <input
                  type="text"
                  className="underline-input"
                  placeholder="Nearby Famous Shop/Mall/Landmark"
                  value={addressForm.landmark}
                  onChange={handleFieldChange('landmark')}
                />
              </div>
            </div>

            <div className="drawer-footer">
              <button className="save-address-btn" onClick={saveAddress}>
                {isEditing ? 'Save Changes' : 'Save Address and Continue'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Address;
