import React, { useState } from 'react';
import { Plus, CreditCard, Trash2, CheckCircle, X } from 'lucide-react';
import './PaymentMethods.css';

const PaymentMethods = () => {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', expiry: '', name: '', type: 'Visa' });
  const [newUpi, setNewUpi] = useState('');
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Visa',
      number: '**** **** **** 4242',
      expiry: '12/26',
      name: 'Rekha R',
      isDefault: true,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png'
    },
    {
      id: 2,
      type: 'Mastercard',
      number: '**** **** **** 5555',
      expiry: '08/25',
      name: 'Rekha R',
      isDefault: false,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
    }
  ]);

  const [upiIds, setUpiIds] = useState([
    { id: 1, upi: 'rekha.r@oksbi', isDefault: true }
  ]);

  const handleDeleteCard = (id) => {
    if (window.confirm("Are you sure you want to remove this card?")) {
      setCards(cards.filter(c => c.id !== id));
    }
  };

  const handleDeleteUpi = (id) => {
    if (window.confirm("Are you sure you want to remove this UPI ID?")) {
      setUpiIds(upiIds.filter(u => u.id !== id));
    }
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    if (!newCard.number || !newCard.expiry || !newCard.name) {
      alert('Please fill in all fields');
      return;
    }
    
    // Auto-detect type simply for demo
    const type = newCard.number.startsWith('5') ? 'Mastercard' : 'Visa';
    const logo = type === 'Mastercard' 
      ? 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
      : 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png';

    // Mask number
    const last4 = newCard.number.slice(-4);
    const maskedNumber = `**** **** **** ${last4 || '0000'}`;

    const cardToAdd = {
      id: Date.now(),
      type: type,
      number: maskedNumber,
      expiry: newCard.expiry,
      name: newCard.name,
      isDefault: cards.length === 0,
      logo: logo
    };

    setCards([...cards, cardToAdd]);
    setIsCardModalOpen(false);
    setNewCard({ number: '', expiry: '', name: '', type: 'Visa' });
  };

  const handleSaveUpi = (e) => {
    e.preventDefault();
    if (!newUpi) {
      alert('Please enter a valid UPI ID');
      return;
    }
    
    const upiToAdd = {
      id: Date.now(),
      upi: newUpi,
      isDefault: upiIds.length === 0
    };

    setUpiIds([...upiIds, upiToAdd]);
    setIsUpiModalOpen(false);
    setNewUpi('');
  };

  return (
    <div className="payment-methods-container">
      <div className="pm-header">
        <h1 className="pm-title">Payment Methods</h1>
        <p className="pm-subtitle">Manage your saved credit/debit cards and UPI IDs for faster checkout.</p>
      </div>

      <div className="pm-section">
        <div className="pm-section-header">
          <h2 className="pm-section-title">Saved Cards</h2>
          <button className="pm-add-btn" onClick={() => setIsCardModalOpen(true)}>
            <Plus size={16} /> Add New Card
          </button>
        </div>

        <div className="pm-card-grid">
          {cards.map(card => (
            <div className={`pm-credit-card ${card.isDefault ? 'default' : ''}`} key={card.id}>
              <div className="pm-cc-top">
                <img src={card.logo} alt={card.type} className="pm-cc-logo" />
                {card.isDefault && (
                  <div className="pm-cc-badge">
                    <CheckCircle size={12} /> Default
                  </div>
                )}
              </div>
              <div className="pm-cc-middle">
                <div className="pm-cc-number">{card.number}</div>
              </div>
              <div className="pm-cc-bottom">
                <div className="pm-cc-info">
                  <div className="pm-cc-label">Card Holder</div>
                  <div className="pm-cc-value">{card.name}</div>
                </div>
                <div className="pm-cc-info">
                  <div className="pm-cc-label">Expires</div>
                  <div className="pm-cc-value">{card.expiry}</div>
                </div>
              </div>
              
              <div className="pm-cc-actions">
                <button className="pm-cc-action-btn delete" onClick={() => handleDeleteCard(card.id)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pm-section" style={{ marginTop: '40px' }}>
        <div className="pm-section-header">
          <h2 className="pm-section-title">Saved UPI IDs</h2>
          <button className="pm-add-btn" onClick={() => setIsUpiModalOpen(true)}>
            <Plus size={16} /> Add UPI ID
          </button>
        </div>

        <div className="pm-upi-list">
          {upiIds.map(upi => (
            <div className="pm-upi-item" key={upi.id}>
              <div className="pm-upi-left">
                <div className="pm-upi-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </div>
                <div className="pm-upi-text">
                  <div className="pm-upi-id">{upi.upi}</div>
                  {upi.isDefault && <div className="pm-upi-badge">Default</div>}
                </div>
              </div>
              <button className="pm-upi-delete" onClick={() => handleDeleteUpi(upi.id)}>
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {isCardModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setIsCardModalOpen(false)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#1a1a1a', fontWeight: '600' }}>Add New Card</h3>
            
            <form onSubmit={handleSaveCard}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#555', fontWeight: '500' }}>Cardholder Name</label>
                <input 
                  type="text" 
                  required
                  value={newCard.name}
                  onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                  placeholder="e.g. Rekha R" 
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#555', fontWeight: '500' }}>Card Number</label>
                <input 
                  type="text" 
                  required
                  maxLength="16"
                  value={newCard.number}
                  onChange={(e) => setNewCard({...newCard, number: e.target.value.replace(/\D/g, '')})}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                  placeholder="xxxx xxxx xxxx xxxx" 
                />
              </div>
              
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#555', fontWeight: '500' }}>Expiry Date</label>
                  <input 
                    type="text" 
                    required
                    maxLength="5"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                    placeholder="MM/YY" 
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#555', fontWeight: '500' }}>CVV</label>
                  <input 
                    type="password" 
                    required
                    maxLength="4"
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                    placeholder="***" 
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                style={{ width: '100%', padding: '12px', backgroundColor: '#C89953', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b68645'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#C89953'}
              >
                Save Card
              </button>
            </form>
          </div>
        </div>
      )}

      {isUpiModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px', maxWidth: '90%', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <button 
              onClick={() => setIsUpiModalOpen(false)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
            >
              <X size={20} />
            </button>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#1a1a1a', fontWeight: '600' }}>Add UPI ID</h3>
            
            <form onSubmit={handleSaveUpi}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', color: '#555', fontWeight: '500' }}>UPI ID / VPA</label>
                <input 
                  type="text" 
                  required
                  value={newUpi}
                  onChange={(e) => setNewUpi(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                  placeholder="e.g. name@okhdfcbank" 
                />
              </div>
              
              <button 
                type="submit" 
                style={{ width: '100%', padding: '12px', backgroundColor: '#C89953', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#b68645'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#C89953'}
              >
                Save UPI ID
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default PaymentMethods;
