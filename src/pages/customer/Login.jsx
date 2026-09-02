import React, { useState, useEffect } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import WelcomeScreen from '../../components/WelcomeScreen';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { loginUser, googleLoginApi } from '../../services/api';
import bgImage from '../../assets/banners/register_bg.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeRedirect, setWelcomeRedirect] = useState('/');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        setErrorMsg(data.message || 'Google Login failed');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Google Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (email && password) {
      try {
        setLoading(true);
        const response = await loginUser({ email, password });
        const data = response.data;

        if (data.success || data.token) {
          localStorage.setItem('token', data.token);
          if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          window.scrollTo(0, 0);
          // Redirect based on role
          if (data.user?.role === 'admin') {
            setWelcomeRedirect('/dashboard'); setShowWelcome(true);
          } else {
            setWelcomeRedirect('/'); setShowWelcome(true);
          }
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
    <>

      <div className="split-login-wrapper">
        <div className="split-login-container">

          {/* Form */}
          <div className="split-login-right">
            <div className="form-wrapper">
              <h2><strong>Login</strong> <span className="text-normal">or</span> <strong>Signup</strong></h2>
              <p className="welcome-text">Welcome back! Please login to your account</p>
              {errorMsg && <p style={{ color: 'red', textAlign: 'center', marginTop: '-10px', marginBottom: '15px' }}>{errorMsg}</p>}

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
                  disabled={!email || !password || loading}
                >
                  {loading ? 'Logging In...' : 'CONTINUE'}
                </button>
              </form>

              <div className="login-divider">
                <span>or</span>
              </div>

              <div className="premium-google-btn-wrapper">

                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setErrorMsg('Google Login Failed')}
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="pill"
                  width="360"
                />
              
                </div>

              <div className="register-prompt">
                Don't have an account? <Link to="/register" className="register-link">Register</Link>
              </div>

                        </div>
          </div>
          
          {/* Image side - placed on the right */}
          <div className="split-login-left" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
