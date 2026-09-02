import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';
import relieLogo from '../assets/relie_logo_premium.png';

const WelcomeScreen = ({ redirectUrl }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectUrl);
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate, redirectUrl]);

  return (
    <div className="welcome-screen-overlay">
      <div className="welcome-content">
        <div className="premium-logo-r-container">
          <img src={relieLogo} alt="Relie Premium Logo" className="premium-logo-img" />
          <div className="premium-logo-ring"></div>
        </div>
        <div className="welcome-text-container">
          <h2 className="welcome-text">Welcome to Relie Fashion Store</h2>
          <p className="welcome-subtext">Elevating your style...</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
