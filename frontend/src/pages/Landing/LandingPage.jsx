import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Card from '../../components/Card'

const LandingPage = () => {
  const popularServices = [
    { icon: '📋', name: 'Land Records', description: 'View and manage land records online' },
    { icon: '🏢', name: 'Business Registration', description: 'Register your business quickly' },
    { icon: '📜', name: 'Certificates', description: 'Get birth, death, and other certificates' },
    { icon: '🪪', name: 'Licenses', description: 'Apply for various licenses' },
    { icon: '💰', name: 'Taxes', description: 'File and manage your taxes' },
    { icon: '➕', name: 'More Services', description: 'Explore all available services' }
  ]

  const departments = [
    { name: 'Dept A', description: 'Citizen Services', color: '#2563eb' },
    { name: 'Dept B', description: 'Revenue Department', color: '#8b5cf6' },
    { name: 'Dept C', description: 'Urban Development', color: '#10b981' },
    { name: 'Dept D', description: 'Public Health', color: '#f59e0b' }
  ]

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-emblem">🏛️</div>
            <h1 className="hero-title">One Platform. Connected Government Services.</h1>
            <p className="hero-subtitle">Access all government services in one place. Simple, secure, and efficient.</p>
            <div className="hero-buttons">
              <Link to="/services">
                <Button size="large" className="hero-button-primary">Explore Services</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="large" className="hero-button-secondary">Track Application</Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <div className="illustration-card illustration-card-1">📄</div>
              <div className="illustration-card illustration-card-2">🏛️</div>
              <div className="illustration-card illustration-card-3">💳</div>
              <div className="illustration-card illustration-card-4">🔒</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="popular-services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Services</h2>
            <p className="section-subtitle">Quick access to most requested government services</p>
          </div>
          <div className="services-grid">
            {popularServices.map((service, index) => (
              <Card 
                key={index} 
                className="service-card"
                hoverable={true}
                icon={service.icon}
                title={service.name}
                subtitle={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Connected Departments Section */}
      <section className="connected-departments">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Connected Departments</h2>
            <p className="section-subtitle">Seamlessly integrated with various government departments</p>
          </div>
          <div className="departments-grid">
            {departments.map((dept, index) => (
              <Card 
                key={index} 
                className="department-card"
                style={{ borderTop: `4px solid ${dept.color}` }}
                title={dept.name}
                subtitle={dept.description}
              />
            ))}
            <Card 
              className="department-card department-card-more"
              title="View All"
              subtitle="Explore all departments"
              icon="👁️"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Simple steps to access government services</p>
          </div>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Account</h3>
                <p>Register with your Aadhaar or mobile number</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Explore Services</h3>
                <p>Browse through available government services</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Apply Online</h3>
                <p>Submit applications and track progress</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Get Results</h3>
                <p>Receive notifications and download documents</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to get started?</h2>
            <p className="cta-subtitle">Join thousands of citizens already using GovConnect for their government service needs</p>
            <div className="cta-buttons">
              <Link to="/register">
                <Button size="large">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="large">Login</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
