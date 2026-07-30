import React, { useState } from 'react';
import { Plus, CreditCard, Trash2, CheckCircle } from 'lucide-react';
import './PaymentMethods.css';

const PaymentMethods = () => {
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

  return (
    <div className="payment-methods-container">
      <div className="pm-header">
        <h1 className="pm-title">Payment Methods</h1>
        <p className="pm-subtitle">Manage your saved credit/debit cards and UPI IDs for faster checkout.</p>
      </div>

      <div className="pm-section">
        <div className="pm-section-header">
          <h2 className="pm-section-title">Saved Cards</h2>
          <button className="pm-add-btn">
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
          <button className="pm-add-btn">
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

    </div>
  );
};

export default PaymentMethods;
