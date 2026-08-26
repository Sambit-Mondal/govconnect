import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'

const Notifications = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'application', title: 'Passport application approved', description: 'Your passport application has been approved and is ready for collection', date: '2 hours ago', read: false },
    { id: 2, type: 'payment', title: 'Payment due reminder', description: 'Property tax payment of ₹5,000 is due in 3 days', date: '1 day ago', read: false },
    { id: 3, type: 'document', title: 'Document verified', description: 'Your Aadhar card has been successfully verified', date: '2 days ago', read: true },
    { id: 4, type: 'scheme', title: 'New scheme available', description: 'You may be eligible for the new PM Scholarship Scheme', date: '3 days ago', read: true },
    { id: 5, type: 'application', title: 'License renewal reminder', description: 'Your driving license expires in 30 days. Renew now to avoid penalties.', date: '5 days ago', read: true },
    { id: 6, type: 'alert', title: 'System maintenance', description: 'Scheduled maintenance on Sunday 2AM-4AM', date: '1 week ago', read: true }
  ])

  const categories = [
    { id: 'all', label: 'All', icon: '🔔' },
    { id: 'application', label: 'Applications', icon: '📋' },
    { id: 'document', label: 'Documents', icon: '📄' },
    { id: 'payment', label: 'Payments', icon: '💳' },
    { id: 'alert', label: 'Alerts', icon: '⚠️' },
    { id: 'scheme', label: 'Schemes', icon: '✅' }
  ]

  const filteredNotifications = activeCategory === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeCategory)

  const getTypeIcon = (type) => {
    const icons = {
      'application': '📋',
      'document': '📄',
      'payment': '💳',
      'alert': '⚠️',
      'scheme': '✅'
    }
    return icons[type] || '�'
  }

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="notifications-page-layout">
      <Sidebar />
      <div className="notifications-content">
        <div className="notifications-header">
          <div>
            <h1 className="notifications-title">Notifications Center</h1>
            <p className="notifications-subtitle">
              {unreadCount > 0 && `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`}
            </p>
          </div>
          <div className="notifications-actions">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead} icon="✓">
                Mark All as Read
              </Button>
            )}
            <Button icon="🗑️">Clear All</Button>
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
              {category.id === 'all' && unreadCount > 0 && (
                <span className="category-badge">{unreadCount}</span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="notifications-list">
          {filteredNotifications.length === 0 ? (
            <Card className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No notifications found</h3>
              <p>You're all caught up! Check back later for updates.</p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`notification-card ${!notification.read ? 'unread' : ''}`}
              >
                <div className="notification-item-content">
                  <div className="notification-icon-wrapper">
                    <span className="notification-type-icon">{getTypeIcon(notification.type)}</span>
                    {!notification.read && <span className="unread-dot" />}
                  </div>
                  <div className="notification-details">
                    <h3 className="notification-title">{notification.title}</h3>
                    <p className="notification-description">{notification.description}</p>
                    <div className="notification-meta">
                      <span className="notification-date">{notification.date}</span>
                      <span className={`notification-type-badge notification-type-${notification.type}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="notification-actions">
                    {!notification.read && (
                      <Button 
                        variant="ghost" 
                        size="small" 
                        onClick={() => markAsRead(notification.id)}
                        icon="✓"
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="small" 
                      onClick={() => deleteNotification(notification.id)}
                      icon="🗑️"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Notification Settings */}
        <Card title="Notification Preferences" className="settings-card" icon="⚙️">
          <div className="notification-settings">
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Email Notifications</label>
                <p className="setting-description">Receive notifications via email</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">SMS Notifications</label>
                <p className="setting-description">Receive SMS alerts for important updates</p>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <div className="setting-info">
                <label className="setting-label">Push Notifications</label>
                <p className="setting-description">Browser push notifications</p>
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
  )
}

export default Notifications
