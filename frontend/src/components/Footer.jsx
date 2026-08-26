import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-icon">🏛️</span>
              <span className="footer-logo-text">GovConnect</span>
            </div>
            <p className="footer-tagline">Your gateway to government services</p>
            <div className="footer-security">
              <div className="security-item">
                <span className="security-icon">🔒</span>
                <span>Secure Login</span>
              </div>
              <div className="security-item">
                <span className="security-icon">🛡️</span>
                <span>Data Privacy</span>
              </div>
              <div className="security-item">
                <span className="security-icon">🔐</span>
                <span>Encryption</span>
              </div>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/eligibility">Eligibility Checker</Link></li>
                <li><Link to="/grievances">Grievances</Link></li>
                <li><Link to="/nearby">Nearby Services</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><Link to="/security">Privacy Policy</Link></li>
                <li><Link to="/security">Terms of Service</Link></li>
                <li><Link to="/gov-assist">Help Center</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact</h4>
              <ul>
                <li>
                  <span className="contact-icon">📧</span>
                  <a href="mailto:support@govconnect.gov">support@govconnect.gov</a>
                </li>
                <li>
                  <span className="contact-icon">📞</span>
                  <a href="tel:1800-XXX-XXXX">1800-XXX-XXXX</a>
                </li>
                <li>
                  <span className="contact-icon">📍</span>
                  <span>New Delhi, India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 GovConnect. All rights reserved.</p>
            <div className="footer-bottom-links">
              <Link to="/security">Privacy</Link>
              <Link to="/security">Terms</Link>
              <Link to="/security">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
