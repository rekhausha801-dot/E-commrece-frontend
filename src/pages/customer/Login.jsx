import React, { useState } from 'react';
import './Login.css';

// Using a fallback gradient if the image isn't available, but keeping the class for when they want to add one.
const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isValidNumber = mobileNumber.length === 10;

  return (
    <div className="login-page-wrapper">
      <div className="login-container">

        {/* Banner Section */}
        <div className="login-banner">
          <div className="login-banner-fallback">
            <h3>GET 25% OFF, <br />UP TO ₹200</h3>
            <p>ON YOUR 1ST ORDER <br /> + EXCITING OFFERS*</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="login-content">
          <h2 className="login-title">
            Login <span>or</span> Signup
          </h2>

          <div className="login-input-group">
            <span className="input-prefix">+91 |</span>
            <input
              type="tel"
              className="login-input"
              placeholder="Mobile Number*"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
            />
          </div>

          <div className="terms-container">
            <input
              type="checkbox"
              className="terms-checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label htmlFor="terms" className="terms-text">
              By continuing, I agree to the <a href="#" className="terms-link">Terms of Use</a> & <a href="#" className="terms-link">Privacy Policy</a> and I am above 18 years old.
            </label>
          </div>

          <button
            className={`login-btn ${(isValidNumber && agreed) ? 'active' : ''}`}
            disabled={!(isValidNumber && agreed)}
          >
            CONTINUE
          </button>

          <div className="login-help">
            Have trouble logging in? <a href="#">Get help</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
