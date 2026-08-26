import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/Button'
import Card from '../../components/Card'

const Login = () => {
  const [activeTab, setActiveTab] = useState('citizen')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider) => {
    // Placeholder for social login
    console.log(`${provider} login clicked`)
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo">
            <span className="auth-logo-icon">🏛️</span>
            <span className="auth-logo-text">GovConnect</span>
          </div>
          <p className="auth-subtitle">Secure login to access government services</p>
        </div>

        <Card className="auth-card">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${activeTab === 'citizen' ? 'active' : ''}`}
              onClick={() => setActiveTab('citizen')}
            >
              Citizen / Business
            </button>
            <button 
              className={`auth-tab ${activeTab === 'official' ? 'active' : ''}`}
              onClick={() => setActiveTab('official')}
            >
              Department Official
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email / Mobile / Username</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email, mobile, or username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="auth-button"
              fullWidth
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            <div className="social-login">
              <button 
                type="button" 
                className="social-button"
                onClick={() => handleSocialLogin('aadhaar')}
              >
                <span className="social-icon">🪪</span>
                <span>Aadhaar</span>
              </button>
              <button 
                type="button" 
                className="social-button"
                onClick={() => handleSocialLogin('google')}
              >
                <span className="social-icon">🔵</span>
                <span>Google</span>
              </button>
              <button 
                type="button" 
                className="social-button"
                onClick={() => handleSocialLogin('mobile')}
              >
                <span className="social-icon">📱</span>
                <span>Mobile OTP</span>
              </button>
            </div>

            <p className="auth-link">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </Card>

        <div className="auth-footer">
          <div className="security-badges">
            <div className="security-badge">
              <span className="badge-icon">🔒</span>
              <span>Secure Login</span>
            </div>
            <div className="security-badge">
              <span className="badge-icon">🛡️</span>
              <span>Data Privacy</span>
            </div>
            <div className="security-badge">
              <span className="badge-icon">🔐</span>
              <span>Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
