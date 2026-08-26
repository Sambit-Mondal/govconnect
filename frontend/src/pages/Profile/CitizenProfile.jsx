import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'

const CitizenProfile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    aadhar: 'XXXX-XXXX-1234',
    dateOfBirth: '1990-01-15',
    address: '123 Main Street, New Delhi, Delhi - 110001',
    gender: 'Male',
    occupation: 'Software Engineer',
    income: '15,00,000'
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'personal', label: 'Personal Information', icon: '📋' },
    { id: 'documents', label: 'Linked Documents', icon: '📄' },
    { id: 'applications', label: 'Active Applications', icon: '📋' },
    { id: 'consents', label: 'Active Consents', icon: '🔐' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ]

  const summaryStats = [
    { label: 'Active Applications', value: 3, icon: '📋', color: '#2563eb' },
    { label: 'Active Consents', value: 5, icon: '🔐', color: '#8b5cf6' },
    { label: 'Documents', value: 8, icon: '📄', color: '#10b981' },
    { label: 'Schemes Applied', value: 2, icon: '✅', color: '#f59e0b' }
  ]

  const linkedDocuments = [
    { id: 1, name: 'Aadhar Card', type: 'Identity', status: 'verified', linkedDate: '2024-01-15' },
    { id: 2, name: 'PAN Card', type: 'Identity', status: 'verified', linkedDate: '2024-01-10' },
    { id: 3, name: 'Address Proof', type: 'Address', status: 'verified', linkedDate: '2024-01-18' },
    { id: 4, name: 'Bank Statement', type: 'Financial', status: 'pending', linkedDate: '2024-01-20' }
  ]

  const activeApplications = [
    { id: 'APP001', service: 'Passport Application', status: 'In Progress', submittedDate: '2024-01-20' },
    { id: 'APP002', service: 'Business Registration', status: 'Pending', submittedDate: '2024-01-18' },
    { id: 'APP003', service: 'Driving License Renewal', status: 'In Progress', submittedDate: '2024-01-15' }
  ]

  const activeConsents = [
    { id: 1, department: 'Revenue Department', purpose: 'Tax Filing', grantedDate: '2024-01-10', expiryDate: '2024-12-31' },
    { id: 2, department: 'Transport Department', purpose: 'License Verification', grantedDate: '2024-01-15', expiryDate: '2024-06-30' },
    { id: 3, department: 'Municipal Corporation', purpose: 'Property Tax', grantedDate: '2024-01-18', expiryDate: '2024-03-31' }
  ]

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setIsEditing(false)
    // API call to save profile
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="profile-page-layout">
      <Sidebar />
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <span className="avatar-initials">JD</span>
              </div>
              <Button variant="outline" size="small" className="change-avatar-button">
                Change Photo
              </Button>
            </div>
            <div>
              <h1 className="profile-title">{profile.name}</h1>
              <p className="profile-subtitle">{profile.email}</p>
            </div>
          </div>
          <div className="profile-header-actions">
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} icon="✏️">Edit Profile</Button>
            ) : (
              <div className="edit-actions">
                <Button onClick={handleSave} icon="💾">Save Changes</Button>
                <Button variant="outline" onClick={handleCancel} icon="✕">Cancel</Button>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="profile-summary-stats">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="summary-stat-card">
              <div className="stat-content">
                <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="profile-content-grid">
          {/* Profile Content */}
          <div className="profile-main-content">
            {/* Profile Tabs */}
            <div className="profile-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="profile-tab-content">
              {activeTab === 'overview' && (
                <div className="overview-content">
                  <Card title="Profile Information" className="profile-info-card" icon="👤">
                    <div className="profile-info-grid">
                      <div className="info-group">
                        <label className="info-label">Full Name</label>
                        <div className="info-value">{profile.name}</div>
                      </div>
                      <div className="info-group">
                        <label className="info-label">Email</label>
                        <div className="info-value">{profile.email}</div>
                      </div>
                      <div className="info-group">
                        <label className="info-label">Phone</label>
                        <div className="info-value">{profile.phone}</div>
                      </div>
                      <div className="info-group">
                        <label className="info-label">Aadhar Number</label>
                        <div className="info-value">{profile.aadhar}</div>
                      </div>
                      <div className="info-group">
                        <label className="info-label">Date of Birth</label>
                        <div className="info-value">{profile.dateOfBirth}</div>
                      </div>
                      <div className="info-group">
                        <label className="info-label">Address</label>
                        <div className="info-value">{profile.address}</div>
                      </div>
                    </div>
                  </Card>

                  <Card title="Account Security" className="security-card" icon="🔒">
                    <div className="security-options">
                      <div className="security-option">
                        <span className="security-icon">🔑</span>
                        <div className="security-info">
                          <span className="security-label">Password</span>
                          <span className="security-value">Last changed 30 days ago</span>
                        </div>
                        <Button variant="outline" size="small">Change Password</Button>
                      </div>
                      <div className="security-option">
                        <span className="security-icon">📱</span>
                        <div className="security-info">
                          <span className="security-label">Two-Factor Authentication</span>
                          <span className="security-value status-disabled">Disabled</span>
                        </div>
                        <Button variant="outline" size="small">Enable 2FA</Button>
                      </div>
                      <div className="security-option">
                        <span className="security-icon">🔐</span>
                        <div className="security-info">
                          <span className="security-label">Login Alerts</span>
                          <span className="security-value status-enabled">Enabled for new devices</span>
                        </div>
                        <Button variant="outline" size="small">Configure</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 'personal' && (
                <Card title="Personal Information" className="personal-info-card" icon="📋">
                  <div className="personal-info-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={isEditing ? profile.name : profile.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Email</label>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={profile.dateOfBirth}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Occupation</label>
                        <input
                          type="text"
                          name="occupation"
                          value={profile.occupation}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Annual Income</label>
                        <input
                          type="text"
                          name="income"
                          value={profile.income}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Address</label>
                        <textarea
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                          disabled={!isEditing}
                          rows={3}
                          className="form-textarea"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {activeTab === 'documents' && (
                <Card title="Linked Documents" className="documents-card" icon="📄">
                  <div className="linked-documents-list">
                    {linkedDocuments.map((doc) => (
                      <div key={doc.id} className="linked-document-item">
                        <div className="document-icon">📄</div>
                        <div className="document-info">
                          <h4 className="document-name">{doc.name}</h4>
                          <div className="document-meta">
                            <span className="document-type">{doc.type}</span>
                            <span className="document-linked">Linked: {doc.linkedDate}</span>
                          </div>
                        </div>
                        <span className={`document-status ${doc.status}`}>{doc.status}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="add-document-button" icon="➕">
                    Link New Document
                  </Button>
                </Card>
              )}

              {activeTab === 'applications' && (
                <Card title="Active Applications" className="applications-card" icon="📋">
                  <div className="active-applications-list">
                    {activeApplications.map((app) => (
                      <div key={app.id} className="application-item">
                        <div className="application-icon">📋</div>
                        <div className="application-info">
                          <h4 className="application-service">{app.service}</h4>
                          <div className="application-meta">
                            <span className="application-id">{app.id}</span>
                            <span className="application-status">{app.status}</span>
                            <span className="application-date">Submitted: {app.submittedDate}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="small">View Details</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'consents' && (
                <Card title="Active Consents" className="consents-card" icon="🔐">
                  <div className="active-consents-list">
                    {activeConsents.map((consent) => (
                      <div key={consent.id} className="consent-item">
                        <div className="consent-icon">🔐</div>
                        <div className="consent-info">
                          <h4 className="consent-department">{consent.department}</h4>
                          <p className="consent-purpose">{consent.purpose}</p>
                          <div className="consent-dates">
                            <span className="consent-granted">Granted: {consent.grantedDate}</span>
                            <span className="consent-expiry">Expires: {consent.expiryDate}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="small">Revoke</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {activeTab === 'preferences' && (
                <Card title="Preferences" className="preferences-card" icon="⚙️">
                  <div className="preferences-form">
                    <div className="preference-item">
                      <div className="preference-info">
                        <label className="preference-label">Email Notifications</label>
                        <p className="preference-description">Receive updates via email</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" defaultChecked />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="preference-item">
                      <div className="preference-info">
                        <label className="preference-label">SMS Notifications</label>
                        <p className="preference-description">Receive SMS alerts for important updates</p>
                      </div>
                      <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                      </label>
                    </div>
                    <div className="preference-item">
                      <div className="preference-info">
                        <label className="preference-label">Language</label>
                        <p className="preference-description">Preferred language for the interface</p>
                      </div>
                      <select className="preference-select">
                        <option value="en">English</option>
                        <option value="hi">हिंदी</option>
                        <option value="ta">தமிழ்</option>
                      </select>
                    </div>
                    <div className="preference-item">
                      <div className="preference-info">
                        <label className="preference-label">Timezone</label>
                        <p className="preference-description">Your local timezone</p>
                      </div>
                      <select className="preference-select">
                        <option value="IST">Indian Standard Time (IST)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                      </select>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="profile-sidebar">
            <Card title="Profile Completion" className="completion-card" icon="📊">
              <div className="completion-content">
                <div className="completion-circle">
                  <svg viewBox="0 0 36 36" className="progress-ring">
                    <path
                      className="progress-ring-circle"
                      stroke="var(--primary-blue)"
                      strokeWidth="3"
                      fill="transparent"
                      r="16"
                      cx="18"
                      cy="18"
                      strokeDasharray="100"
                      strokeDashoffset="25"
                    />
                  </svg>
                  <span className="completion-percentage">75%</span>
                </div>
                <p className="completion-text">Profile 75% complete</p>
                <div className="completion-items">
                  <div className="completion-item completed">
                    <span className="item-icon">✓</span>
                    <span>Basic Info</span>
                  </div>
                  <div className="completion-item completed">
                    <span className="item-icon">✓</span>
                    <span>Contact Details</span>
                  </div>
                  <div className="completion-item completed">
                    <span className="item-icon">✓</span>
                    <span>Documents</span>
                  </div>
                  <div className="completion-item pending">
                    <span className="item-icon">○</span>
                    <span>Verification</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Quick Actions" className="quick-actions-card" icon="⚡">
              <div className="quick-actions-list">
                <Button variant="outline" className="quick-action-item" icon="📄">
                  Upload Document
                </Button>
                <Button variant="outline" className="quick-action-item" icon="📋">
                  View Applications
                </Button>
                <Button variant="outline" className="quick-action-item" icon="✅">
                  Check Eligibility
                </Button>
                <Button variant="outline" className="quick-action-item" icon="📍">
                  Nearby Services
                </Button>
              </div>
            </Card>

            <Card title="Help & Support" className="help-card" icon="❓">
              <div className="help-options">
                <div className="help-option">
                  <span className="help-icon">📧</span>
                  <div className="help-info">
                    <span className="help-label">Email Support</span>
                    <span className="help-value">support@govconnect.gov</span>
                  </div>
                </div>
                <div className="help-option">
                  <span className="help-icon">📞</span>
                  <div className="help-info">
                    <span className="help-label">Helpline</span>
                    <span className="help-value">1800-XXX-XXXX</span>
                  </div>
                </div>
                <div className="help-option">
                  <span className="help-icon">📖</span>
                  <div className="help-info">
                    <span className="help-label">FAQ</span>
                    <span className="help-value">View FAQs</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitizenProfile