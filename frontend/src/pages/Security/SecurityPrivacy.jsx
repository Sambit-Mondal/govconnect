import React from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import './SecurityPrivacy.css'

const SecurityPrivacy = () => {
  return (
    <div className="security-page-layout">
      <Sidebar />
      <div className="security-content">
        <div className="security-header">
          <div>
            <h1 className="security-title">Security & Privacy Center</h1>
            <p className="security-subtitle">Manage your account security and privacy settings</p>
          </div>
        </div>

        <div className="security-grid">
          {/* Login Activity */}
          <Card title="Login Activity" className="security-card" icon="🔐">
            <div className="login-activity-list">
              <div className="activity-row">
                <div className="activity-info">
                  <span className="activity-device">Chrome on Windows</span>
                  <span className="activity-location">New Delhi, India</span>
                  <span className="activity-time">Current session</span>
                </div>
                <span className="activity-status current">Current</span>
              </div>
              <div className="activity-row">
                <div className="activity-info">
                  <span className="activity-device">Firefox on Mobile</span>
                  <span className="activity-location">Mumbai, India</span>
                  <span className="activity-time">2 days ago</span>
                </div>
                <Button variant="outline" size="small">Revoke</Button>
              </div>
              <div className="activity-row">
                <div className="activity-info">
                  <span className="activity-device">Safari on MacOS</span>
                  <span className="activity-location">Bangalore, India</span>
                  <span className="activity-time">1 week ago</span>
                </div>
                <Button variant="outline" size="small">Revoke</Button>
              </div>
            </div>
          </Card>

          {/* Active Devices */}
          <Card title="Active Devices" className="security-card" icon="📱">
            <div className="devices-list">
              <div className="device-item">
                <span className="device-icon">💻</span>
                <div className="device-info">
                  <span className="device-name">Windows PC</span>
                  <span className="device-details">Chrome • Last active: Now</span>
                </div>
                <span className="device-badge primary">Primary</span>
              </div>
              <div className="device-item">
                <span className="device-icon">📱</span>
                <div className="device-info">
                  <span className="device-name">iPhone 13</span>
                  <span className="device-details">Safari • Last active: 2 days ago</span>
                </div>
                <Button variant="ghost" size="small">Remove</Button>
              </div>
              <div className="device-item">
                <span className="device-icon">📱</span>
                <div className="device-info">
                  <span className="device-name">Android Phone</span>
                  <span className="device-details">Chrome • Last active: 1 week ago</span>
                </div>
                <Button variant="ghost" size="small">Remove</Button>
              </div>
            </div>
          </Card>

          {/* Data Access */}
          <Card title="Data Access" className="security-card" icon="🔓">
            <div className="data-access-list">
              <div className="data-access-item">
                <div className="access-info">
                  <span className="access-service">Revenue Department</span>
                  <span className="access-type">Tax Records</span>
                  <span className="access-date">Granted: Jan 10, 2024</span>
                </div>
                <Button variant="outline" size="small">Revoke</Button>
              </div>
              <div className="data-access-item">
                <div className="access-info">
                  <span className="access-service">Transport Department</span>
                  <span className="access-type">License Information</span>
                  <span className="access-date">Granted: Jan 15, 2024</span>
                </div>
                <Button variant="outline" size="small">Revoke</Button>
              </div>
              <div className="data-access-item">
                <div className="access-info">
                  <span className="access-service">Municipal Corporation</span>
                  <span className="access-type">Property Details</span>
                  <span className="access-date">Granted: Jan 18, 2024</span>
                </div>
                <Button variant="outline" size="small">Revoke</Button>
              </div>
            </div>
          </Card>

          {/* Consent History */}
          <Card title="Consent History" className="security-card" icon="📝">
            <div className="consent-history-list">
              <div className="consent-item">
                <div className="consent-info">
                  <span className="consent-purpose">Data Sharing for Tax Filing</span>
                  <span className="consent-department">Revenue Department</span>
                  <span className="consent-date">Jan 10, 2024</span>
                </div>
                <span className="consent-status active">Active</span>
              </div>
              <div className="consent-item">
                <div className="consent-info">
                  <span className="consent-purpose">Identity Verification</span>
                  <span className="consent-department">Transport Department</span>
                  <span className="consent-date">Jan 15, 2024</span>
                </div>
                <span className="consent-status active">Active</span>
              </div>
              <div className="consent-item">
                <div className="consent-info">
                  <span className="consent-purpose">Property Tax Assessment</span>
                  <span className="consent-department">Municipal Corporation</span>
                  <span className="consent-date">Jan 18, 2024</span>
                </div>
                <span className="consent-status active">Active</span>
              </div>
            </div>
          </Card>

          {/* Connected Departments */}
          <Card title="Connected Departments" className="security-card" icon="🏛️">
            <div className="departments-list">
              <div className="department-item">
                <span className="department-icon">🏛️</span>
                <div className="department-info">
                  <span className="department-name">Revenue Department</span>
                  <span className="department-status">Connected</span>
                </div>
                <Button variant="ghost" size="small">Manage</Button>
              </div>
              <div className="department-item">
                <span className="department-icon">🚗</span>
                <div className="department-info">
                  <span className="department-name">Transport Department</span>
                  <span className="department-status">Connected</span>
                </div>
                <Button variant="ghost" size="small">Manage</Button>
              </div>
              <div className="department-item">
                <span className="department-icon">🏢</span>
                <div className="department-info">
                  <span className="department-name">Municipal Corporation</span>
                  <span className="department-status">Connected</span>
                </div>
                <Button variant="ghost" size="small">Manage</Button>
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card title="Privacy Settings" className="security-card" icon="⚙️">
            <div className="privacy-settings">
              <div className="privacy-setting">
                <div className="setting-info">
                  <label className="setting-label">Profile Visibility</label>
                  <p className="setting-description">Control who can see your profile information</p>
                </div>
                <select className="setting-select">
                  <option value="private">Private</option>
                  <option value="departments">Government Departments Only</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className="privacy-setting">
                <div className="setting-info">
                  <label className="setting-label">Data Sharing</label>
                  <p className="setting-description">Allow departments to access your data</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="privacy-setting">
                <div className="setting-info">
                  <label className="setting-label">Analytics</label>
                  <p className="setting-description">Help improve GovConnect services</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SecurityPrivacy
