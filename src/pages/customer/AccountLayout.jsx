import React from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { 
  User, ShoppingBag, MapPin, CreditCard, Ticket, 
  Bell, Settings, Headphones, LogOut, Heart, RotateCcw, LayoutDashboard
} from 'lucide-react';
import './AccountLayout.css';

const defaultAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80';

const navItems = [
  { name: 'Dashboard', path: '/account/dashboard', icon: LayoutDashboard },
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
  const location = useLocation();
  const [userData, setUserData] = React.useState({ fullName: '', email: '', profileImage: '' });
  const { notifications } = useNotification();
  const unreadCount = notifications.filter(n => !n.read).length;

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUserData(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/login');
  };

  return (
    <div className="account-layout">
      
      <aside className="account-sidebar">
       
        <div className="account-sidebar-profile">
          <img src={userData.profileImage || defaultAvatar} alt="User Avatar" className="account-sidebar-avatar" />
          <h3 className="account-sidebar-name">{userData.fullName || 'Guest'}</h3>
          <p className="account-sidebar-email">{userData.email || ''}</p>
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
                  {item.name === 'Notifications' && unreadCount > 0 && (
                    <span className="account-nav-badge">{unreadCount}</span>
                  )}
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
          <button className="account-help-btn" onClick={() => navigate('/account/support')}>Contact Support</button>
        </div>
      </aside>

     
      <main className={`account-content ${location.pathname.includes('/support') ? 'no-bg' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AccountLayout;
