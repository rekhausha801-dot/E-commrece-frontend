import React from 'react';
import { useLocation } from 'react-router-dom';

const AccountPlaceholder = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/');
  const pageName = pathParts[pathParts.length - 1]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div>
      <h2 className="account-content-header">{pageName}</h2>
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666', backgroundColor: '#faf9f6', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#1a1a1a' }}>Coming Soon</h3>
        <p style={{ margin: 0 }}>The {pageName} section is currently under development.</p>
      </div>
    </div>
  );
};

export default AccountPlaceholder;
