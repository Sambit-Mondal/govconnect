import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠', section: 'main' },
    { path: '/services', label: 'Smart Service Finder', icon: '🔍', section: 'main' },
    { path: '/gov-assist', label: 'AI GovAssist', icon: '🤖', section: 'main' },
    { path: '/documents', label: 'Document Vault', icon: '📄', section: 'main' },
    { path: '/payments', label: 'Payments', icon: '💳', section: 'main' },
    { path: '/notifications', label: 'Notifications', icon: '🔔', section: 'main' },
    { path: '/eligibility', label: 'Scheme Checker', icon: '✅', section: 'services' },
    { path: '/grievances', label: 'Grievances', icon: '📝', section: 'services' },
    { path: '/nearby', label: 'Nearby Places', icon: '📍', section: 'services' },
    { path: '/profile', label: 'Profile', icon: '👤', section: 'account' },
    { path: '/security', label: 'Security & Privacy', icon: '🔒', section: 'account' },
  ]

  const sections = {
    main: 'Main',
    services: 'Services',
    account: 'Account'
  }

  const groupedItems = menuItems.reduce((groups, item) => {
    if (!groups[item.section]) {
      groups[item.section] = []
    }
    groups[item.section].push(item)
    return groups
  }, {})

  return (
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-icon">🏛️</span>
          {!collapsed && <span className="sidebar-logo-text">GovConnect</span>}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {Object.entries(groupedItems).map(([section, items]) => (
          <div key={section} className="sidebar-section">
            {!collapsed && <h4 className="sidebar-section-title">{sections[section]}</h4>}
            <ul className="sidebar-menu">
              {items.map((item) => (
                <li key={item.path} className="sidebar-item">
                  <Link
                    to={item.path}
                    className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                    title={collapsed ? item.label : ''}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    {!collapsed && <span className="sidebar-label">{item.label}</span>}
                    {location.pathname === item.path && <span className="sidebar-indicator" />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/login" className="sidebar-logout">
          <span className="sidebar-icon">🚪</span>
          {!collapsed && <span className="sidebar-label">Logout</span>}
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
