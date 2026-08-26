import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'

const NearbyServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchLocation, setSearchLocation] = useState('')

  const categories = [
    { id: 'all', label: 'All Services', icon: '📍' },
    { id: 'rto', label: 'RTO Offices', icon: '🚗' },
    { id: 'hospital', label: 'Hospitals', icon: '🏥' },
    { id: 'police', label: 'Police Stations', icon: '👮' },
    { id: 'passport', label: 'Passport Seva', icon: '🪪' },
    { id: 'service', label: 'Service Centers', icon: '🏢' }
  ]

  const offices = [
    { id: 1, name: 'Regional Transport Office', type: 'rto', distance: '0.8 km', address: '123 Transport Nagar, New Delhi', phone: '1800-XXX-XXXX', hours: '9:00 AM - 5:00 PM', rating: 4.2 },
    { id: 2, name: 'Government Hospital', type: 'hospital', distance: '1.2 km', address: '456 Health Street, New Delhi', phone: '1800-XXX-XXXX', hours: '24/7 Emergency', rating: 4.5 },
    { id: 3, name: 'Police Station', type: 'police', distance: '0.5 km', address: '789 Safety Avenue, New Delhi', phone: '100', hours: '24/7', rating: 4.0 },
    { id: 4, name: 'Passport Seva Kendra', type: 'passport', distance: '2.0 km', address: '321 Passport Road, New Delhi', phone: '1800-XXX-XXXX', hours: '9:30 AM - 5:30 PM', rating: 4.3 },
    { id: 5, name: 'Citizen Service Center', type: 'service', distance: '1.5 km', address: '654 Service Lane, New Delhi', phone: '1800-XXX-XXXX', hours: '9:00 AM - 6:00 PM', rating: 4.1 },
    { id: 6, name: 'Electricity Office', type: 'service', distance: '1.8 km', address: '987 Power Street, New Delhi', phone: '1800-XXX-XXXX', hours: '10:00 AM - 5:00 PM', rating: 3.9 }
  ]

  const filteredOffices = selectedCategory === 'all' 
    ? offices 
    : offices.filter(office => office.type === selectedCategory)

  const handleLocationSearch = () => {
    console.log('Searching for location:', searchLocation)
    // In real implementation, this would use geolocation API
  }

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSearchLocation(`${position.coords.latitude}, ${position.coords.longitude}`)
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    }
  }

  const getCategoryIcon = (type) => {
    const icons = {
      'rto': '🚗',
      'hospital': '🏥',
      'police': '👮',
      'passport': '🪪',
      'service': '🏢'
    }
    return icons[type] || '📍'
  }

  return (
    <div className="nearby-services-page-layout">
      <Sidebar />
      <div className="nearby-services-content">
        <div className="nearby-services-header">
          <div>
            <h1 className="nearby-services-title">Nearby Government Services</h1>
            <p className="nearby-services-subtitle">Find government offices and services near you</p>
          </div>
        </div>

        {/* Location Search */}
        <Card className="location-search-card" icon="📍">
          <div className="location-search-content">
            <div className="search-input-wrapper">
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Enter your location or use current location"
                className="location-input"
              />
              <Button 
                onClick={handleLocationSearch}
                disabled={!searchLocation.trim()}
                className="search-location-button"
                icon="🔍"
              >
                Search
              </Button>
              <Button 
                variant="outline"
                onClick={handleGetCurrentLocation}
                className="current-location-button"
                icon="📍"
              >
                Use My Location
              </Button>
            </div>
          </div>
        </Card>

        <div className="nearby-services-grid">
          {/* Map Section */}
          <div className="map-section">
            <Card className="map-card" icon="🗺️">
              <div className="map-placeholder">
                <div className="map-illustration">
                  <div className="map-center">📍</div>
                  <div className="map-markers">
                    {filteredOffices.slice(0, 4).map((office, index) => (
                      <div 
                        key={index} 
                        className="map-marker"
                        style={{ 
                          top: `${20 + index * 15}%`,
                          left: `${20 + index * 20}%`
                        }}
                      >
                        {getCategoryIcon(office.type)}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="map-text">Interactive map showing nearby government offices</p>
                <p className="map-subtext">Showing {filteredOffices.length} services near: {searchLocation || 'Current Location'}</p>
              </div>
            </Card>

            {/* Quick Filters */}
            <Card title="Quick Filters" className="filters-card" icon="⚡">
              <div className="quick-filters">
                <button className="filter-button active">Within 5 km</button>
                <button className="filter-button">Within 10 km</button>
                <button className="filter-button">Open Now</button>
                <button className="filter-button">High Rated</button>
              </div>
            </Card>
          </div>

          {/* Services List */}
          <div className="services-list-section">
            <div className="section-header">
              <h2 className="section-title">Nearby Services</h2>
              <div className="section-actions">
                <select className="sort-select" defaultValue="distance">
                  <option value="distance">Sort by Distance</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="name">Sort by Name</option>
                </select>
              </div>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-pill ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-label">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Office Cards */}
            <div className="offices-list">
              {filteredOffices.map((office) => (
                <Card key={office.id} className="office-card" hoverable={true}>
                  <div className="office-card-header">
                    <div className="office-icon-wrapper">
                      <span className="office-icon">{getCategoryIcon(office.type)}</span>
                    </div>
                    <div className="office-info">
                      <h3 className="office-name">{office.name}</h3>
                      <span className="office-type">{categories.find(c => c.id === office.type)?.label}</span>
                    </div>
                    <div className="office-rating">
                      <span className="rating-stars">⭐</span>
                      <span className="rating-score">{office.rating}</span>
                    </div>
                  </div>
                  
                  <div className="office-details">
                    <div className="office-detail">
                      <span className="detail-icon">📍</span>
                      <span className="detail-text">{office.address}</span>
                    </div>
                    <div className="office-detail">
                      <span className="detail-icon">�</span>
                      <span className="detail-text">{office.distance} away</span>
                    </div>
                    <div className="office-detail">
                      <span className="detail-icon">🕐</span>
                      <span className="detail-text">{office.hours}</span>
                    </div>
                    <div className="office-detail">
                      <span className="detail-icon">📞</span>
                      <span className="detail-text">{office.phone}</span>
                    </div>
                  </div>

                  <div className="office-actions">
                    <Button className="directions-button" icon="🧭">
                      Get Directions
                    </Button>
                    <Button variant="outline" className="call-button" icon="📞">
                      Call
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearbyServices
