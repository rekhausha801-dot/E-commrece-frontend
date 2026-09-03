import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import './auth.css'; // Optional if you have a specific CSS file, or you can use inline styles/Tailwind depending on setup

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Basic validation schema logic
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5005/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // Keep userInfo for backward compatibility if other parts of the app use it
        localStorage.setItem('userInfo', JSON.stringify(data));
        setSuccessMsg(data.message);
        setShowSuccessModal(true);
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showSuccessModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.successIcon}>✓</div>
            <h3 style={styles.modalTitle}>Success!</h3>
            <p style={styles.modalText}>{successMsg || 'Login successfully'}</p>
            <button 
              style={styles.continueButton} 
              onClick={() => navigate('/')}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      <div className="auth-container" style={styles.container}>
        <div className="auth-card" style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>
        
        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.options}>
            <label style={styles.remember}>
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/auth/forgotpassword" style={styles.link}>Forgot Password?</Link>
          </div>

          <button 
            type="submit" 
            style={{...styles.button, ...(isLoading ? styles.buttonDisabled : {})}}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/auth/register" style={styles.link}>Sign Up</Link>
        </p>

        <div style={styles.dividerContainer}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>Or follow us</span>
          <div style={styles.dividerLine}></div>
        </div>
        
        <div style={styles.socialLinksContainer}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
            <FiFacebook />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
            <FiInstagram />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>
            <FiYoutube />
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

// Inline premium styles for a quick, elegant UI without needing an external CSS file immediately
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: '"Inter", "Roboto", sans-serif',
  },
  card: {
    background: '#ffffff',
    padding: '2.5rem',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '0.5rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.875rem',
    color: '#718096',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  errorAlert: {
    background: '#fff5f5',
    color: '#c53030',
    padding: '0.75rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
    textAlign: 'center',
    border: '1px solid #fed7d7',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#4a5568',
  },
  input: {
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem',
  },
  remember: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#4a5568',
    cursor: 'pointer',
  },
  link: {
    color: '#3182ce',
    textDecoration: 'none',
    fontWeight: '500',
  },
  button: {
    background: '#3182ce',
    color: '#ffffff',
    padding: '0.875rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s, transform 0.1s',
    marginTop: '0.5rem',
  },
  buttonDisabled: {
    background: '#90cdf4',
    cursor: 'not-allowed',
  },
  footerText: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.875rem',
    color: '#718096',
  },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    margin: '0 1rem',
    color: '#a0aec0',
    fontSize: '0.875rem',
  },
  socialLinksContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    marginTop: '0.5rem',
  },
  socialIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#f7fafc',
    color: '#4a5568',
    fontSize: '1.2rem',
    textDecoration: 'none',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalBox: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '350px',
    width: '90%',
  },
  successIcon: {
    backgroundColor: '#48bb78',
    color: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    margin: '0 auto 1rem',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '0.5rem',
  },
  modalText: {
    color: '#718096',
    marginBottom: '1.5rem',
  },
  continueButton: {
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'background 0.2s',
  }
};

export default Login;
