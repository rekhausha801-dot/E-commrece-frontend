import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { registerUser } from '../../services/api';
import './Register.css';

// We will keep the previous image, but the user can update the asset.
import bgImage from '../../assets/banners/register_bg.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (!formData.termsAccepted) {
      return setError('Please accept Terms and Conditions');
    }

    try {
      setLoading(true);
      const response = await registerUser(formData);
      
      setSuccess(response.data.message || 'Account created successfully!');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-wrapper">
      <div className="register-card">
        <div className="register-left-img" style={{ backgroundImage: `url(${bgImage})` }}>
        </div>

        <div className="register-right-form">
          <div className="register-form-container">
            <div className="register-header">
              <h2 className="register-heading">Create Account</h2>
            </div>

            {/* Added error and success messages */}
            {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px', textAlign: 'center', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '5px' }}>{success}</div>}

            <form className="register-form" onSubmit={handleSubmit}>
              
              <div className="register-input-group">
                <label className="register-label">Full Name</label>
                <div className="input-with-icon">
                  <span className="input-left-icon"><User size={16} /></span>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="register-input" 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>
              </div>

              <div className="register-input-group">
                <label className="register-label">Email</label>
                <div className="input-with-icon">
                  <span className="input-left-icon"><Mail size={16} /></span>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="register-input" 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
              </div>

              <div className="register-input-group">
                <label className="register-label">Mobile</label>
                <div className="input-with-icon">
                  <span className="input-left-icon"><Phone size={16} /></span>
                  <input 
                    type="tel" 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="register-input" 
                    placeholder="Enter your mobile number" 
                    required 
                  />
                </div>
              </div>

              <div className="register-input-group">
                <label className="register-label">Password</label>
                <div className="input-with-icon">
                  <span className="input-left-icon"><Lock size={16} /></span>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="register-input" 
                    placeholder="Enter your password" 
                    required 
                    minLength="6"
                  />
                  <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </span>
                </div>
              </div>

              <div className="register-input-group">
                <label className="register-label">Confirm Password</label>
                <div className="input-with-icon">
                  <span className="input-left-icon"><Lock size={16} /></span>
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="register-input" 
                    placeholder="Confirm your password" 
                    required 
                    minLength="6"
                  />
                  <span className="eye-icon" onClick={() => setShowNewPassword(!showNewPassword)}>
                    {showNewPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </span>
                </div>
              </div>

              <div className="register-checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    required 
                  />
                  <span>I agree to the Terms and Conditions</span>
                </label>
              </div>

              <div className="register-btn-wrapper">
                <button type="submit" className="register-submit-btn" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
              
              <div className="register-divider">
                <span>OR</span>
              </div>
              
              <button type="button" className="register-google-btn">
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google Sign Up
              </button>
              
              <div className="register-footer">
                Already have an account? <Link to="/login" className="login-link">Login</Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
