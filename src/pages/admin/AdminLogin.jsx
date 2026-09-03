import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { message } from 'antd';
import { adminLoginApi } from '../../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (email && password) {
      try {
        setLoading(true);
        const response = await adminLoginApi({ email, password });
        const data = response.data;
        
        if (data.success || data.token) {
          localStorage.setItem('adminToken', data.token);
          if (data.user) {
            localStorage.setItem('adminUser', JSON.stringify(data.user));
          }
          message.success('Admin Login successful!');
          window.scrollTo(0, 0);
          navigate('/dashboard');
        } else {
          setErrorMsg(data.message || 'Login failed');
        }
      } catch (err) {
        setErrorMsg(err.response?.data?.message || 'Login failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="admin-temple-wrapper">
      <div className="temple-glass-box">
        
        {/* Blue Circle User Icon inside the box */}
        <div className="user-icon-circle">
          <User size={28} color="#fff" />
        </div>
        
        <h2>Account Login</h2>
        
        {errorMsg && <p className="error-text">{errorMsg}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-field-group">
            <label>Email</label>
            <div className="underline-input">
              <Mail size={16} className="left-icon" />
              <input 
                type="email" 
                placeholder="admin@relietech.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-field-group">
            <label>Password</label>
            <div className="underline-input">
              <Lock size={16} className="left-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="temple-login-options">
            <label className="temple-remember-me">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <Link to="#" className="temple-forgot-pwd">Forgot Password</Link>
          </div>

          <button 
            type="submit" 
            className="temple-login-btn"
            disabled={loading || !email || !password}
          >
            {loading ? 'Processing...' : 'Login Now'}
          </button>
        </form>

        <div className="temple-register">
          New to our website? <Link to="/register">Create an Account</Link>
        </div>
        
      </div>
    </div>
  );
};

export default AdminLogin;
