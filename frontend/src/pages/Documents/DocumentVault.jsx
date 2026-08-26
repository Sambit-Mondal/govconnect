import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import Table from '../../components/Table'

const DocumentVault = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Aadhar Card', type: 'Identity', uploadedOn: '2024-01-15', status: 'verified', size: '2.5 MB' },
    { id: 2, name: 'PAN Card', type: 'Identity', uploadedOn: '2024-01-10', status: 'verified', size: '1.2 MB' },
    { id: 3, name: 'Passport', type: 'Identity', uploadedOn: '2024-01-05', status: 'pending', size: '3.8 MB' },
    { id: 4, name: 'Driving License', type: 'Identity', uploadedOn: '2024-01-02', status: 'verified', size: '1.5 MB' },
    { id: 5, name: 'Address Proof', type: 'Address', uploadedOn: '2024-01-18', status: 'verified', size: '0.8 MB' },
    { id: 6, name: 'Business Registration', type: 'Business', uploadedOn: '2024-01-12', status: 'pending', size: '2.1 MB' },
    { id: 7, name: 'Property Deed', type: 'Property', uploadedOn: '2024-01-08', status: 'verified', size: '4.2 MB' },
    { id: 8, name: 'Birth Certificate', type: 'Other', uploadedOn: '2024-01-20', status: 'verified', size: '0.5 MB' }
  ])

  const categories = [
    { id: 'all', label: 'All Documents', icon: '📄' },
    { id: 'identity', label: 'Identity', icon: '🪪' },
    { id: 'address', label: 'Address', icon: '📍' },
    { id: 'business', label: 'Business', icon: '🏢' },
    { id: 'property', label: 'Property', icon: '🏠' },
    { id: 'other', label: 'Other', icon: '📋' }
  ]

  const filteredDocuments = activeCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.type.toLowerCase() === activeCategory.toLowerCase())

  const documentColumns = [
    { 
      key: 'name', 
      header: 'Document',
      render: (value) => (
        <div className="document-name-cell">
          <span className="document-icon">📄</span>
          <span className="document-name">{value}</span>
        </div>
      )
    },
    { key: 'type', header: 'Type' },
    { key: 'uploadedOn', header: 'Uploaded On' },
    { key: 'size', header: 'Size' },
    { 
      key: 'status', 
      header: 'Status',
      render: (value) => {
        const statusColors = {
          'verified': 'table-badge-approved',
          'pending': 'table-badge-pending',
          'rejected': 'table-badge-rejected'
        }
        return <span className={`table-badge ${statusColors[value] || ''}`}>{value}</span>
      }
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="document-actions">
          <button className="action-button" title="View">👁️</button>
          <button className="action-button" title="Download">⬇️</button>
          <button className="action-button delete" title="Delete">🗑️</button>
        </div>
      )
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return '#10b981'
      case 'pending': return '#f59e0b'
      case 'rejected': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const stats = {
    total: documents.length,
    verified: documents.filter(d => d.status === 'verified').length,
    pending: documents.filter(d => d.status === 'pending').length,
    totalSize: '15.6 MB'
  }

  const vaultFeatures = [
    { icon: '🔒', title: 'Secure Storage', description: 'Bank-level encryption for your documents' },
    { icon: '🔗', title: 'Share Securely', description: 'Share documents with authorized parties' },
    { icon: '⏰', title: 'Set Expiry', description: 'Set access expiration for shared documents' },
    { icon: '📊', title: 'Access History', description: 'Track who accessed your documents' }
  ]

  return (
    <div className="document-vault-page-layout">
      <Sidebar />
      <div className="document-vault-content">
        <div className="document-vault-header">
          <div>
            <h1 className="document-vault-title">Document Vault</h1>
            <p className="document-vault-subtitle">Secure storage for all your important documents</p>
          </div>
          <Button icon="📤">Upload Document</Button>
        </div>

        {/* Stats Cards */}
        <div className="document-stats">
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">📄</div>
              <div className="stat-info">
                <div className="stat-value">{stats.total}</div>
                <div className="stat-label">Total Documents</div>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#10b981' }}>✅</div>
              <div className="stat-info">
                <div className="stat-value">{stats.verified}</div>
                <div className="stat-label">Verified</div>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon" style={{ color: '#f59e0b' }}>⏳</div>
              <div className="stat-info">
                <div className="stat-value">{stats.pending}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-icon">💾</div>
              <div className="stat-info">
                <div className="stat-value">{stats.totalSize}</div>
                <div className="stat-label">Total Size</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="document-vault-grid">
          {/* Document List */}
          <div className="document-list-section">
            <div className="section-header">
              <h2 className="section-title">My Documents</h2>
              <div className="section-actions">
                <select 
                  className="sort-select"
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="size">Size</option>
                </select>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="category-tabs">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                  {category.id === 'all' && (
                    <span className="category-badge">{documents.length}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Documents Table */}
            <Table 
              columns={documentColumns}
              data={filteredDocuments}
              className="documents-table"
              emptyMessage="No documents found in this category"
            />
          </div>

          {/* Vault Features */}
          <div className="vault-features-section">
            <Card title="Vault Features" className="features-card" icon="✨">
              <div className="features-list">
                {vaultFeatures.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <span className="feature-icon">{feature.icon}</span>
                    <div className="feature-content">
                      <h4 className="feature-title">{feature.title}</h4>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Storage Info" className="storage-card" icon="💾">
              <div className="storage-info">
                <div className="storage-bar">
                  <div className="storage-progress" style={{ width: '35%' }}></div>
                </div>
                <div className="storage-details">
                  <div className="storage-detail">
                    <span className="storage-label">Used</span>
                    <span className="storage-value">15.6 MB / 50 MB</span>
                  </div>
                  <div className="storage-detail">
                    <span className="storage-label">Available</span>
                    <span className="storage-value">34.4 MB</span>
                  </div>
                </div>
                <Button variant="outline" size="small" className="upgrade-button">
                  Upgrade Storage
                </Button>
              </div>
            </Card>

            <Card title="Recent Activity" className="activity-card" icon="📊">
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-icon">📤</span>
                  <div className="activity-content">
                    <span className="activity-text">Birth Certificate uploaded</span>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">✅</span>
                  <div className="activity-content">
                    <span className="activity-text">Aadhar Card verified</span>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-icon">👁️</span>
                  <div className="activity-content">
                    <span className="activity-text">Passport viewed by official</span>
                    <span className="activity-time">3 days ago</span>
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

export default DocumentVault
