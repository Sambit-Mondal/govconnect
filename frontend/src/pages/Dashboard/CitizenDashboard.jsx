import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import Table from '../../components/Table'

const CitizenDashboard = () => {
  const summaryStats = [
    { label: 'Applications In Progress', value: 3, color: '#2563eb', icon: '📋' },
    { label: 'Applications Approved', value: 12, color: '#10b981', icon: '✅' },
    { label: 'Applications Rejected', value: 1, color: '#ef4444', icon: '❌' },
    { label: 'Active Consents', value: 5, color: '#8b5cf6', icon: '🔐' },
    { label: 'Pending Payments', value: 2, color: '#f59e0b', icon: '💳', action: 'Pay Now' }
  ]

  const myApplications = [
    { id: 'APP001', service: 'Passport Application', status: 'In Progress', updatedOn: '2024-01-20' },
    { id: 'APP002', service: 'Aadhar Update', status: 'Approved', updatedOn: '2024-01-18' },
    { id: 'APP003', service: 'Driving License', status: 'Pending', updatedOn: '2024-01-15' },
    { id: 'APP004', service: 'Business Registration', status: 'In Progress', updatedOn: '2024-01-12' }
  ]

  const recentNotifications = [
    { id: 1, type: 'application', title: 'Passport application approved', description: 'Your passport application has been approved', time: '2 hours ago', read: false },
    { id: 2, type: 'payment', title: 'Payment due reminder', description: 'Property tax payment is due in 3 days', time: '1 day ago', read: false },
    { id: 3, type: 'document', title: 'Document verified', description: 'Your Aadhar card has been verified', time: '2 days ago', read: true }
  ]

  const quickActions = [
    { icon: '🔍', label: 'Smart Service Finder', path: '/services', color: '#2563eb' },
    { icon: '🤖', label: 'AI GovAssist', path: '/gov-assist', color: '#8b5cf6' },
    { icon: '📄', label: 'Document Vault', path: '/documents', color: '#10b981' },
    { icon: '✅', label: 'Scheme Checker', path: '/eligibility', color: '#f59e0b' },
    { icon: '📝', label: 'Grievance', path: '/grievances', color: '#ef4444' },
    { icon: '📍', label: 'Nearby Offices', path: '/nearby', color: '#6366f1' }
  ]

  const applicationColumns = [
    { 
      key: 'id', 
      header: 'Application ID',
      render: (value) => <span className="app-id">{value}</span>
    },
    { key: 'service', header: 'Service' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const statusColors = {
          'In Progress': 'table-badge-in-progress',
          'Approved': 'table-badge-approved',
          'Pending': 'table-badge-pending',
          'Rejected': 'table-badge-rejected'
        }
        return <span className={`table-badge ${statusColors[value] || ''}`}>{value}</span>
      }
    },
    { key: 'updatedOn', header: 'Updated On' }
  ]

  const getStatusIcon = (type) => {
    const icons = {
      'application': '📋',
      'payment': '💳',
      'document': '📄',
      'scheme': '✅',
      'alert': '⚠️'
    }
    return icons[type] || '🔔'
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Welcome back, Citizen!</h1>
            <p className="dashboard-subtitle">Here's what's happening with your government services</p>
          </div>
          <div className="dashboard-actions">
            <Button variant="outline" icon="🔔">Notifications</Button>
            <Button icon="👤">Profile</Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="summary-cards">
          {summaryStats.map((stat, index) => (
            <Card key={index} className="summary-card" style={{ borderTop: `4px solid ${stat.color}` }}>
              <div className="summary-card-content">
                <div className="summary-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="summary-info">
                  <div className="summary-value" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="summary-label">{stat.label}</div>
                </div>
                {stat.action && (
                  <Button size="small" variant="primary">{stat.action}</Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="dashboard-grid">
          {/* My Applications Section */}
          <div className="dashboard-section dashboard-section-large">
            <div className="section-header">
              <h2 className="section-title">My Applications</h2>
              <Link to="/services" className="view-all-link">View All →</Link>
            </div>
            
            <Table 
              columns={applicationColumns}
              data={myApplications}
              onRowClick={(row) => console.log('Clicked:', row.id)}
              className="applications-table"
            />

            {/* Application Progress Card */}
            <Card title="Application Progress" className="progress-card" icon="📊">
              <div className="progress-content">
                <div className="progress-item">
                  <div className="progress-info">
                    <span className="progress-label">Passport Application</span>
                    <span className="progress-status">In Progress</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: '60%' }}></div>
                  </div>
                  <div className="progress-steps">
                    <div className="progress-step completed">
                      <span className="step-icon">✓</span>
                      <span className="step-label">Submitted</span>
                    </div>
                    <div className="progress-step completed">
                      <span className="step-icon">✓</span>
                      <span className="step-label">Document Verified</span>
                    </div>
                    <div className="progress-step active">
                      <span className="step-icon">●</span>
                      <span className="step-label">Processing</span>
                    </div>
                    <div className="progress-step">
                      <span className="step-icon">○</span>
                      <span className="step-label">Approved</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="dashboard-section dashboard-section-small">
            {/* Recent Notifications */}
            <Card title="Recent Notifications" className="notifications-card" icon="🔔">
              <div className="notifications-list">
                {recentNotifications.map((notification) => (
                  <div key={notification.id} className={`notification-item ${!notification.read ? 'unread' : ''}`}>
                    <span className="notification-type-icon">{getStatusIcon(notification.type)}</span>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-description">{notification.description}</div>
                      <div className="notification-time">{notification.time}</div>
                    </div>
                    {!notification.read && <span className="unread-indicator" />}
                  </div>
                ))}
              </div>
              <Link to="/notifications" className="view-all-notifications">View All Notifications</Link>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions" className="quick-actions-card" icon="⚡">
              <div className="quick-actions-grid">
                {quickActions.map((action, index) => (
                  <Link key={index} to={action.path} className="quick-action">
                    <div 
                      className="quick-action-icon" 
                      style={{ backgroundColor: `${action.color}20`, color: action.color }}
                    >
                      {action.icon}
                    </div>
                    <span className="quick-action-label">{action.label}</span>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CitizenDashboard
