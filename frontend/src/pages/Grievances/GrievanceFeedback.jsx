import React, { useState, useEffect } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import { grievanceService } from '../../services/grievanceService'
import './GrievanceFeedback.css'

const GrievanceFeedback = () => {
  const [grievances, setGrievances] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGrievances()
  }, [])

  const loadGrievances = async () => {
    try {
      const response = await grievanceService.getGrievances()
      setGrievances(response.grievances || [])
    } catch (error) {
      console.error('Error loading grievances:', error)
      // Fallback to mock data
      setGrievances([
        { id: 1, title: 'Road maintenance issue', category: 'Infrastructure', status: 'In Progress', date: '2024-01-20' },
        { id: 2, title: 'Water supply problem', category: 'Utilities', status: 'Resolved', date: '2024-01-15' },
        { id: 3, title: 'Garbage collection', category: 'Sanitation', status: 'Pending', date: '2024-01-10' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: ''
  })

  const [showForm, setShowForm] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await grievanceService.createGrievance(formData)
      const newGrievance = {
        id: response.grievance.id,
        title: formData.title,
        category: formData.category,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0]
      }
      setGrievances([newGrievance, ...grievances])
      setShowForm(false)
      setFormData({ title: '', category: '', description: '', location: '' })
      alert('Grievance submitted successfully!')
    } catch (error) {
      console.error('Error submitting grievance:', error)
      alert('Failed to submit grievance. Please try again.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return '#43e97b'
      case 'In Progress': return '#4facfe'
      case 'Pending': return '#f093fb'
      default: return '#ccc'
    }
  }

  return (
    <div className="grievances-page-layout">
      <Sidebar />
      <div className="grievances-content">
        <div className="grievances-header">
          <div>
            <h1 className="grievances-title">Grievance & Feedback Portal</h1>
            <p className="grievances-subtitle">Report issues and provide feedback on government services</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} icon="📝">
            {showForm ? 'Cancel' : 'File Grievance'}
          </Button>
        </div>

      {showForm && (
        <Card title="File New Grievance" className="grievance-form-card">
          <form onSubmit={handleSubmit} className="grievance-form">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Utilities">Utilities</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <Button type="submit">Submit Grievance</Button>
          </form>
        </Card>
      )}

      <Card title="My Grievances" className="grievances-list-card" icon="📋">
        {loading ? (
          <div className="loading-state">Loading grievances...</div>
        ) : (
          <div className="grievances-list">
            {grievances.length === 0 ? (
              <div className="empty-state">No grievances found</div>
            ) : (
              grievances.map(grievance => (
            <div key={grievance.id} className="grievance-item">
              <div className="grievance-info">
                <h3 className="grievance-title">{grievance.title}</h3>
                <div className="grievance-meta">
                  <span className="grievance-category">{grievance.category}</span>
                  <span className="grievance-date">{grievance.date}</span>
                </div>
              </div>
              <div className="grievance-status">
                <span
                  className={`status-badge status-${grievance.status.toLowerCase().replace(' ', '-')}`}
                >
                  {grievance.status}
                </span>
              </div>
              <Button variant="outline" size="small">View Details</Button>
            </div>
              ))
            )}
          </div>
        )}
      </Card>

      {/* Feedback Section */}
      <Card title="Feedback" className="feedback-card" icon="⭐">
        <div className="feedback-content">
          <p className="feedback-description">Rate your experience with government services</p>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="star-button"
                onClick={() => console.log('Rated:', star)}
              >
                ⭐
              </button>
            ))}
          </div>
          <div className="feedback-form">
            <textarea
              placeholder="Share your feedback..."
              className="feedback-textarea"
              rows={3}
            />
            <Button className="submit-feedback-button">Submit Feedback</Button>
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}

export default GrievanceFeedback
