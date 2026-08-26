import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'

const ServiceFinder = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showResults, setShowResults] = useState(false)

  const categories = [
    { id: 'all', name: 'All Services', icon: '🔍' },
    { id: 'identity', name: 'Identity', icon: '🪪' },
    { id: 'business', name: 'Business', icon: '🏢' },
    { id: 'tax', name: 'Tax & Finance', icon: '💰' },
    { id: 'health', name: 'Healthcare', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'legal', name: 'Legal', icon: '⚖️' },
    { id: 'property', name: 'Property', icon: '🏠' }
  ]

  const services = [
    { 
      id: 1, 
      name: 'Passport Application', 
      category: 'identity',
      description: 'Apply for new passport or renew existing one',
      processingTime: '14 days',
      fee: '₹1,500',
      relevance: 95
    },
    { 
      id: 2, 
      name: 'Aadhar Card Services', 
      category: 'identity',
      description: 'Get new Aadhar card or update existing details',
      processingTime: '7 days',
      fee: 'Free',
      relevance: 90
    },
    { 
      id: 3, 
      name: 'Business Registration', 
      category: 'business',
      description: 'Register your business with government authorities',
      processingTime: '10 days',
      fee: '₹5,000',
      relevance: 88
    },
    { 
      id: 4, 
      name: 'GST Registration', 
      category: 'tax',
      description: 'Register for Goods and Services Tax',
      processingTime: '7 days',
      fee: 'Free',
      relevance: 85
    },
    { 
      id: 5, 
      name: 'Income Tax Filing', 
      category: 'tax',
      description: 'File your income tax returns online',
      processingTime: '1 day',
      fee: 'Variable',
      relevance: 82
    },
    { 
      id: 6, 
      name: 'Health Insurance Scheme', 
      category: 'health',
      description: 'Apply for government health insurance',
      processingTime: '15 days',
      fee: 'Based on income',
      relevance: 78
    },
    { 
      id: 7, 
      name: 'Scholarship Application', 
      category: 'education',
      description: 'Apply for educational scholarships',
      processingTime: '30 days',
      fee: 'Free',
      relevance: 75
    },
    { 
      id: 8, 
      name: 'Property Registration', 
      category: 'property',
      description: 'Register your property documents',
      processingTime: '15 days',
      fee: '₹1,000',
      relevance: 70
    }
  ]

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowResults(true)
    }
  }

  const recommendedServices = [
    {
      name: 'Food License',
      description: 'FSSAI license for food business operators',
      relevance: 98,
      steps: 5,
      estimatedTime: '25 days',
      documents: ['Aadhar Card', 'PAN Card', 'Business Address Proof', 'Photographs']
    },
    {
      name: 'Shop & Establishment Registration',
      description: 'Mandatory registration for all businesses',
      relevance: 95,
      steps: 3,
      estimatedTime: '10 days',
      documents: ['Aadhar Card', 'PAN Card', 'Business Address Proof']
    },
    {
      name: 'GST Registration',
      description: 'GST registration for businesses with turnover > ₹40 lakhs',
      relevance: 92,
      steps: 4,
      estimatedTime: '7 days',
      documents: ['PAN Card', 'Aadhar Card', 'Business Address Proof', 'Bank Details', 'Photographs']
    },
    {
      name: 'Fire NOC',
      description: 'No Objection Certificate from fire department',
      relevance: 88,
      steps: 6,
      estimatedTime: '30 days',
      documents: ['Building Plan', 'Ownership Proof', 'Identity Proof', 'Fire Safety Plan']
    }
  ]

  return (
    <div className="service-finder-page-layout">
      <Sidebar />
      <div className="service-finder-content">
        <div className="service-finder-header">
          <div>
            <h1 className="service-finder-title">Smart Service Finder</h1>
            <p className="service-finder-subtitle">Find the right government services for your needs</p>
          </div>
        </div>

        {/* Search Section */}
        <Card className="search-card" icon="🔍">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="I want to start a restaurant business..."
                className="search-input"
              />
              <Button type="submit" className="search-button" icon="🔍">
                Search
              </Button>
            </div>
          </form>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </Card>

        {/* Recommended Services (shown when search is performed) */}
        {showResults && searchQuery.includes('restaurant') && (
          <div className="recommended-section">
            <h2 className="section-title">Recommended Services</h2>
            <p className="section-subtitle">Based on your search for restaurant business</p>
            
            <div className="recommended-services">
              {recommendedServices.map((service, index) => (
                <Card key={index} className="recommended-service-card">
                  <div className="recommended-service-header">
                    <div className="service-info">
                      <h3 className="service-name">{service.name}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                    <div className="relevance-badge">
                      <span className="relevance-score">{service.relevance}%</span>
                      <span className="relevance-label">Match</span>
                    </div>
                  </div>
                  
                  <div className="service-details">
                    <div className="detail-item">
                      <span className="detail-icon">📋</span>
                      <div>
                        <span className="detail-label">Required Steps</span>
                        <span className="detail-value">{service.steps} steps</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">⏱️</span>
                      <div>
                        <span className="detail-label">Estimated Time</span>
                        <span className="detail-value">{service.estimatedTime}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📄</span>
                      <div>
                        <span className="detail-label">Required Documents</span>
                        <div className="detail-documents">
                          {service.documents.map((doc, i) => (
                            <span key={i} className="document-tag">{doc}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="service-actions">
                    <Button className="apply-button">Apply Now</Button>
                    <Button variant="outline" className="details-button">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Services Grid */}
        <div className="services-section">
          <h2 className="section-title">All Services</h2>
          <div className="services-grid">
            {filteredServices.map(service => (
              <Card 
                key={service.id} 
                className="service-card"
                hoverable={true}
                icon={categories.find(c => c.id === service.category)?.icon}
                title={service.name}
                subtitle={categories.find(c => c.id === service.category)?.name}
              >
                <p className="service-card-description">{service.description}</p>
                <div className="service-meta">
                  <span className="meta-item">
                    <span className="meta-icon">⏱️</span>
                    {service.processingTime}
                  </span>
                  <span className="meta-item">
                    <span className="meta-icon">💰</span>
                    {service.fee}
                  </span>
                </div>
                <div className="service-card-actions">
                  <Button size="small" className="apply-card-button">Apply</Button>
                  <Button variant="outline" size="small">Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Services */}
        <Card title="Popular Services" className="popular-services-card" icon="⭐">
          <div className="popular-services-list">
            {services.slice(0, 4).map((service, index) => (
              <Link key={index} to="#" className="popular-service-item">
                <span className="popular-service-icon">{categories.find(c => c.id === service.category)?.icon}</span>
                <div className="popular-service-info">
                  <span className="popular-service-name">{service.name}</span>
                  <span className="popular-service-meta">{service.processingTime} • {service.fee}</span>
                </div>
                <span className="popular-arrow">→</span>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ServiceFinder
