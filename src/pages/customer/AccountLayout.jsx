import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, User, Package, MapPin, CreditCard, Gift, 
  Bell, RotateCcw, Star, Clock, Phone, HelpCircle, Settings, LogOut 
} from 'lucide-react';
import './AccountLayout.css';

const navItems = [
  { name: 'Dashboard', path: '/account/dashboard', icon: LayoutDashboard },
  { name: 'My Profile', path: '/account/profile', icon: User },
  { name: 'My Orders', path: '/account/orders', icon: Package },
  { name: 'Saved Addresses', path: '/account/addresses', icon: MapPin },
  { name: 'Payment Methods', path: '/account/payment-methods', icon: CreditCard },
  { name: 'Coupons & Rewards', path: '/account/coupons', icon: Gift },
  { name: 'Notifications', path: '/account/notifications', icon: Bell },
  { name: 'Returns & Refunds', path: '/account/returns', icon: RotateCcw },
  { name: 'My Reviews & Ratings', path: '/account/reviews', icon: Star },
  { name: 'Recently Viewed', path: '/account/recently-viewed', icon: Clock },
  { name: 'Help & Support', path: '/account/support', icon: Phone },
  { name: 'FAQs', path: '/account/faqs', icon: HelpCircle },
  { name: 'Account Settings', path: '/account/settings', icon: Settings },
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
        <div className="account-sidebar-header">
          <h3 className="account-user-name">John Doe</h3>
          <p className="account-user-email">johndoe@example.com</p>
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
        </ul>
        
        <div className="account-nav-logout">
          <a href="/" onClick={handleLogout} className="account-nav-item">
            <LogOut size={18} />
            <span>Logout</span>
          </a>
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
