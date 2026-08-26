import React from 'react'
import Card from '../../components/Card'
import Sidebar from '../../components/Sidebar'

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: 15420, color: '#667eea' },
    { label: 'Active Applications', value: 892, color: '#f093fb' },
    { label: 'Pending Approvals', value: 156, color: '#4facfe' },
    { label: 'Open Grievances', value: 234, color: '#43e97b' }
  ]

  const recentActivities = [
    { type: 'User Registration', description: 'New user registered', time: '5 mins ago' },
    { type: 'Application', description: 'Passport application submitted', time: '15 mins ago' },
    { type: 'Grievance', description: 'New grievance filed', time: '30 mins ago' },
    { type: 'Payment', description: 'Tax payment received', time: '1 hour ago' }
  ]

  return (
    <div className="admin-dashboard-layout">
      <Sidebar />
      <div className="admin-dashboard-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <div className="admin-actions">
            <button className="admin-button">System Status</button>
            <button className="admin-button">Reports</button>
          </div>
        </div>
        
        <div className="admin-stats-grid">
          {stats.map((stat, index) => (
            <Card key={index} className="admin-stat-card">
              <div className="stat-content">
                <div className="stat-value" style={{ color: stat.color }}>
                  {stat.value.toLocaleString()}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>

        <div className="admin-dashboard-sections">
          <Card title="Recent Activities" className="admin-activities-card">
            <ul className="activities-list">
              {recentActivities.map((activity, index) => (
                <li key={index} className="activity-item">
                  <span className="activity-type">{activity.type}</span>
                  <span className="activity-description">{activity.description}</span>
                  <span className="activity-time">{activity.time}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Quick Actions" className="admin-quick-actions-card">
            <div className="quick-actions-grid">
              <button className="quick-action">Manage Users</button>
              <button className="quick-action">Review Applications</button>
              <button className="quick-action">Handle Grievances</button>
              <button className="quick-action">System Logs</button>
              <button className="quick-action">Department Settings</button>
              <button className="quick-action">Generate Reports</button>
            </div>
          </Card>
        </div>

        <div className="admin-tables-section">
          <Card title="Pending Approvals" className="admin-table-card">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Applicant</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1234</td>
                  <td>Passport</td>
                  <td>John Doe</td>
                  <td>2024-01-20</td>
                  <td><span className="status-badge pending">Pending</span></td>
                  <td>
                    <button className="action-button approve">Approve</button>
                    <button className="action-button reject">Reject</button>
                  </td>
                </tr>
                <tr>
                  <td>#1235</td>
                  <td>Aadhar</td>
                  <td>Jane Smith</td>
                  <td>2024-01-19</td>
                  <td><span className="status-badge pending">Pending</span></td>
                  <td>
                    <button className="action-button approve">Approve</button>
                    <button className="action-button reject">Reject</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
