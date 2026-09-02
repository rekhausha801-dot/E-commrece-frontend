import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import WelcomeScreen from '../../components/WelcomeScreen';
import { GoogleLogin } from '@react-oauth/google';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { registerUser, googleLoginApi } from '../../services/api';
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
    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeRedirect, setWelcomeRedirect] = useState('/');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await googleLoginApi({ credential: credentialResponse.credential });
      const data = response.data;
      if (data.success || data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        window.scrollTo(0, 0);
        if (data.user?.role === 'admin') {
          setWelcomeRedirect('/dashboard'); setShowWelcome(true);
        } else {
          setWelcomeRedirect('/'); setShowWelcome(true);
        }
      } else {
        setError(data.message || 'Google Login failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Google Login failed.');
    } finally {
      setLoading(false);
    }
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
    <>
      {showWelcome && <WelcomeScreen redirectUrl={welcomeRedirect} />}
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
              
              
              
              
              
              
              <div className="login-divider" style={{ textAlign: 'center', margin: '20px 0', position: 'relative' }}>
                <span style={{ background: '#fff', padding: '0 10px', color: '#666', fontSize: '14px', position: 'relative', zIndex: 1 }}>or</span>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#eaeaea', zIndex: 0 }}></div>
              </div>

              <div className="premium-google-btn-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google Login Failed')}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="pill"
                  width="360"
                />
              </div>

              <div className="register-footer">
                Already have an account? <Link to="/login" className="login-link">Login</Link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </>
  );

};

export default Register;
