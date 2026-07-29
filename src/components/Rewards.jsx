import React from 'react';
import './RewardsCoupons.css'; // Reuse some basic styles or create custom ones
import RewardsCoupons from './RewardsCoupons';

const Rewards = () => {
  return (
    <div style={{ paddingTop: '90px', minHeight: '80vh', backgroundColor: '#fcfaf8' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '10px', color: '#111' }}>My Rewards & Coupons</h1>
        <p style={{ color: '#666', marginBottom: '40px' }}>Manage all your unlocked rewards, coupons, and upcoming tasks here.</p>
        
        {/* We can just reuse the RewardsCoupons component here to show the cards for now */}
        <RewardsCoupons hideHeader={true} />
        
        <div style={{ marginTop: '40px', padding: '40px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #eee', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', color: '#333', marginBottom: '10px' }}>More Rewards Coming Soon!</h3>
          <p style={{ color: '#777' }}>Keep shopping to unlock exclusive tiers and new exciting coupons.</p>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
