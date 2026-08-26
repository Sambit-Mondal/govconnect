import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isLandingPage = location.pathname === '/'

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🏛️</div>
          <span className="logo-text">GovConnect</span>
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="navbar-menu desktop-menu">
          {isLandingPage && (
            <>
              <li className="navbar-item">
                <Link to="/services" className="navbar-link">Services</Link>
              </li>
              <li className="navbar-item">
                <Link to="#" className="navbar-link">Departments</Link>
              </li>
              <li className="navbar-item">
                <Link to="#" className="navbar-link">How It Works</Link>
              </li>
              <li className="navbar-item">
                <Link to="#" className="navbar-link">Help</Link>
              </li>
            </>
          )}
          
          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
              </li>
              <li className="navbar-item">
                <button onClick={handleLogout} className="navbar-button navbar-button-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="navbar-item">
              <Link to="/login" className="navbar-button navbar-button-primary">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger"></span>
        </button>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <ul className="navbar-menu mobile-menu">
            {isLandingPage && (
              <>
                <li className="navbar-item">
                  <Link to="/services" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Services</Link>
                </li>
                <li className="navbar-item">
                  <Link to="#" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Departments</Link>
                </li>
                <li className="navbar-item">
                  <Link to="#" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
                </li>
                <li className="navbar-item">
                  <Link to="#" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Help</Link>
                </li>
              </>
            )}
            
            {user ? (
              <>
                <li className="navbar-item">
                  <Link to="/dashboard" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                </li>
                <li className="navbar-item">
                  <button onClick={handleLogout} className="navbar-button navbar-button-logout">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="navbar-item">
                <Link to="/login" className="navbar-button navbar-button-primary" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
