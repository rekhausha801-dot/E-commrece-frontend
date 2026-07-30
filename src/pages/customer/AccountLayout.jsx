import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  User, ShoppingBag, MapPin, CreditCard, Ticket, 
  Bell, Settings, Headphones, LogOut, Heart, RotateCcw
} from 'lucide-react';
import './AccountLayout.css';

const userAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80';

const navItems = [
  { name: 'My Profile', path: '/account/profile', icon: User },
  { name: 'My Orders', path: '/account/orders', icon: ShoppingBag },
  { name: 'Wishlist', path: '/wishlist', icon: Heart },
  { name: 'My Addresses', path: '/account/addresses', icon: MapPin },
  { name: 'Return & Refund', path: '/account/returns', icon: RotateCcw },
  { name: 'Payment Methods', path: '/account/payment-methods', icon: CreditCard },
  { name: 'Notifications', path: '/account/notifications', icon: Bell },
  { name: 'Help & Support', path: '/account/support', icon: Headphones },
];

const AccountLayout = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    // Simulate logout and redirect to home
    navigate('/');
  };

  return (
    <div className="account-layout">
      {/* Sidebar */}
      <aside className="account-sidebar">
        {/* User Profile Header */}
        <div className="account-sidebar-profile">
          <img src={userAvatar} alt="User Avatar" className="account-sidebar-avatar" />
          <h3 className="account-sidebar-name">Rekha R</h3>
          <p className="account-sidebar-email">rekha@gmail.com</p>
        </div>

        <ul className="account-nav-list">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `account-nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            );
          })}
          
          <li className="account-nav-logout">
            <a href="/" onClick={handleLogout} className="account-nav-item">
              <LogOut size={18} />
              <span>Logout</span>
            </a>
          </li>
        </ul>

        {/* Need Help Card */}
        <div className="account-sidebar-help">
          <div className="account-help-top">
            <div className="account-help-icon">
              <Headphones size={20} />
            </div>
            <div className="account-help-text">
              <h4>Need Help?</h4>
              <p>We're here to assist you</p>
            </div>
          </div>
          <button className="account-help-btn">Contact Support</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="account-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
