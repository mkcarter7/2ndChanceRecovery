import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import './Footer.css';

const Footer = () => {
  const { settings } = useSettings();

  return (
    <footer className="footer" style={{ backgroundColor: settings.primary_color }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>{settings.site_name}</h3>
            <p>{settings.hero_subtitle}</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/programs">Programs & Housing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>{settings.contact_phone}</p>
            <p>{settings.contact_email}</p>
            <p>{settings.address}</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {settings.site_name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
