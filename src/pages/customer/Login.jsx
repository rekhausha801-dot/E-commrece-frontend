import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5005/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate('/');
        } else {
          setErrorMsg(data.message || 'Login failed');
        }
      } catch (err) {
        setErrorMsg('Network error. Please check your backend server.');
      }
    }
  };

  return (
    <>

      <div className="split-login-wrapper">
        <div className="split-login-container">
          
          {/* Form */}
          <div className="split-login-right">
            <div className="form-wrapper">
              <h2><strong>Login</strong></h2>
              <p className="welcome-text">Welcome back! Please login to your account</p>
              {errorMsg && <p style={{color: 'red', textAlign: 'center', marginTop: '-10px', marginBottom: '15px'}}>{errorMsg}</p>}
            
            <form onSubmit={handleLogin}>
              <div className="split-input-group">
                <Mail size={18} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Email Address*" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="split-input-group">
                <Lock size={18} className="input-icon" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password*" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              
              <button 
                type="submit" 
                className="split-submit-btn"
                disabled={!email || !password}
              >
                CONTINUE
              </button>
            </form>


            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
