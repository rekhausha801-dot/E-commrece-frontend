import React, { useState } from 'react';
import { MapPin, Phone, Crosshair, X, Check, ShoppingBag, CreditCard, Receipt, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Address.css';
import './Cart.css'; // Reusing some base styles like stepper
import CheckoutStepper from '../../components/CheckoutStepper';
import { useCart } from '../../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Address = () => {
  const navigate = useNavigate();
  const { cartItems, buyNowData, selectedAddress, setSelectedAddress, dynamicShippingFee, cartPricing } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(selectedAddress?._id || null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [addressForm, setAddressForm] = useState({
    id: null,
    name: '',
    phone: '',
    house: '',
    road: '',
    pincode: '',
    city: '',
    state: '',
    landmark: '',
    isDefault: false
  });

  React.useEffect(() => {
    window.scrollTo(0, 0);
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
        
        // Check if the currently selected address actually belongs to the fetched list
        const isSelectedAddressValid = selectedAddressId && data.addresses.some(a => String(a._id) === String(selectedAddressId));

        if (data.addresses.length > 0 && (!selectedAddressId || !isSelectedAddressValid)) {
          const defaultAddr = data.addresses.find(a => a.isDefault) || data.addresses[0];
          setSelectedAddressId(defaultAddr._id);
          setSelectedAddress(defaultAddr);
        } else if (data.addresses.length === 0) {
          setSelectedAddressId(null);
          setSelectedAddress(null);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    setAddressForm({
      id: addr._id,
      name: addr.fullName,
      phone: addr.mobileNumber,
      house: addr.addressLine1,
      road: addr.addressLine2 || '',
      pincode: addr.pincode,
      city: addr.city,
      state: addr.state,
      landmark: addr.landmark || '',
      isDefault: addr.isDefault
    });
    setIsDrawerOpen(true);
  };

  const saveAddress = async () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.house || !addressForm.city || !addressForm.state || !addressForm.pincode) {
      alert("Please fill all required fields (Name, Phone, House/Building, City, State, Pincode)");
      return;
    }

    const token = localStorage.getItem('token');
    const payload = {
      fullName: addressForm.name,
      mobileNumber: addressForm.phone,
      addressLine1: addressForm.house,
      addressLine2: addressForm.road,
      landmark: addressForm.landmark,
      city: addressForm.city,
      state: addressForm.state,
      country: 'India',
      pincode: addressForm.pincode
    };

    try {
      let res;
      if (isEditing) {
        res = await fetch(`${API_URL}/addresses/${addressForm.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/addresses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.message || 'Error saving address');
        return;
      }

      fetchAddresses();
      setIsDrawerOpen(false);
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Network error. Unable to save address.');
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/addresses/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (selectedAddressId === id) {
        setSelectedAddressId(null);
        setSelectedAddress(null);
      }
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSetDefault = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${API_URL}/addresses/${id}/default`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchAddresses();
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleFieldChange = (field) => (e) => {
    setAddressForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const activeItems = buyNowData ? buyNowData.items : cartItems;
  const cartItemCount = activeItems.reduce((acc, item) => acc + (item.qty || item.quantity || 1), 0);

  const subtotal = cartPricing.subtotal || 0;
  const productDiscount = cartPricing.productDiscount || 0;
  const couponDiscount = cartPricing.couponDiscount || 0;
  const tax = cartPricing.tax || 0;
  const deliveryCharges = cartPricing.shippingFee || 0;
  const grandTotal = cartPricing.grandTotal || 0;

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr._id);
    setSelectedAddress(addr);
  };

  const handleContinue = () => {
    if (!selectedAddressId) {
      alert("Please select a delivery address before continuing.");
      return;
    }

    if (buyNowData) {
      if (!buyNowData.items || buyNowData.items.length === 0) {
        alert("Invalid Buy Now data.");
        return;
      }
    } else {
      if (!cartItems || cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }
    }

    navigate('/payment');
  };

  return (
    <div className="lux-address-page">
      <div className="lux-cart-container">
        <CheckoutStepper currentStep={2} />

        <div className="lux-address-header-container">
          <div className="lux-address-header-row">
            <h2>Select Delivery Address</h2>
            <button className="add-new-btn" onClick={openAddDrawer}>+ ADD NEW ADDRESS</button>
          </div>
          <div></div> {/* Empty space for right column */}
        </div>

        <div className="lux-address-cards-container">
          <div className="lux-address-list">
            {isLoading ? (
              <p>Loading addresses...</p>
            ) : addresses.length === 0 ? (
              <p>No saved addresses found. Please add a new address.</p>
            ) : (
              addresses.map(addr => (
                <div
                  key={addr._id}
                  className={`lux-address-card ${selectedAddressId === addr._id ? 'selected' : ''}`}
                  onClick={() => handleSelectAddress(addr)}
                >
                  <div className="card-top-row">
                    <div className={`radio-circle ${selectedAddressId === addr._id ? 'selected' : ''}`}>
                      <div className="inner-dot"></div>
                    </div>
                    <span className="address-name">{addr.fullName}</span>
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <button className="edit-text-btn" onClick={(e) => { e.stopPropagation(); openEditDrawer(addr); }}>EDIT</button>
                      <button className="delete-text-btn" onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr._id); }}>DELETE</button>
                    </div>
                  </div>
                  <div className="address-details">
                    {addr.addressLine1}, {addr.addressLine2},<br />
                    {addr.city}, {addr.state}, {addr.pincode}
                  </div>
                  <div className="address-phone">
                    {addr.mobileNumber}
                  </div>
                  {selectedAddressId === addr._id && (
                    <button className="deliver-btn" onClick={(e) => { e.stopPropagation(); handleContinue(); }}>Deliver to this Address</button>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="addr-price-details-card">
            <h3>Price Details ({cartItemCount} Items)</h3>
            <div className="addr-price-row">
              <span>Product Price</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="addr-price-row">
              <span>Discounts</span>
              <span className="green-text">-₹{(productDiscount + couponDiscount).toFixed(2)}</span>
            </div>
            <div className="addr-price-row">
              <span>GST</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="addr-price-row">
              <span>Delivery Charges</span>
              <span className="green-text">{deliveryCharges === 0 ? 'FREE' : `₹${deliveryCharges.toFixed(2)}`}</span>
            </div>
            <div className="addr-price-divider"></div>
            <div className="addr-price-total-row">
              <span>Order Total</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
            <button
              className="deliver-btn"
              style={{ marginTop: '24px', width: '100%', marginLeft: '0' }}
              onClick={handleContinue}
            >
              Continue to Payment &rarr;
            </button>
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
                <select
                  className="underline-input"
                  value={addressForm.city}
                  onChange={handleFieldChange('city')}
                  style={{ color: addressForm.city ? '#1a1a1a' : '#757575', padding: '12px 0', border: 'none', borderBottom: '1px solid #e0e0e0', outline: 'none', width: '100%', fontSize: '15px', background: 'transparent', cursor: 'pointer' }}
                >
                  <option value="" disabled hidden>Select City</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Madurai">Madurai</option>
                  <option value="Salem">Salem</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Vellore">Vellore</option>
                  <option value="Tirunelveli">Tirunelveli</option>
                  <option value="Tiruppur">Tiruppur</option>
                  <option value="Erode">Erode</option>
                  <option value="Krishnagiri">Krishnagiri</option>
                  <option value="Dharmapuri">Dharmapuri</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Other">Other</option>
                </select>
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
