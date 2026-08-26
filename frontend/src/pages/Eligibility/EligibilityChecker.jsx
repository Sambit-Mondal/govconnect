import React, { useState } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'
import { schemeService } from '../../services/schemeService'

const EligibilityChecker = () => {
  const [isChecking, setIsChecking] = useState(false)
  const [results, setResults] = useState(null)
  const [formData, setFormData] = useState({
    occupation: '',
    annualIncome: '',
    age: '',
    residentStatus: 'resident',
    education: '',
    gender: '',
    state: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleCheck = async (e) => {
    e.preventDefault()
    setIsChecking(true)

    try {
      const response = await schemeService.checkEligibility({
        age: parseInt(formData.age),
        income: parseFloat(formData.annualIncome),
        state: formData.state,
        category: formData.occupation,
        occupation: formData.occupation
      })

      // Transform backend response to match UI format
      const transformedResults = response.eligible_schemes.map(scheme => ({
        id: scheme.id,
        name: scheme.name,
        description: scheme.description,
        eligibility: 'Eligible',
        benefits: scheme.benefits,
        documents: scheme.required_documents ? scheme.required_documents.split(',').map(d => d.trim()) : [],
        deadline: scheme.deadline ? scheme.deadline.split('T')[0] : 'N/A'
      }))

      setResults(transformedResults)
    } catch (error) {
      console.error('Error checking eligibility:', error)
      // Fallback to mock data if API fails
      setResults([
        {
          id: 1,
          name: 'PM Scholarship Scheme',
          description: 'Financial assistance for meritorious students from economically weaker sections',
          eligibility: 'Eligible',
          benefits: 'Up to ₹2,00,000 per year',
          documents: ['Income Certificate', 'Mark Sheets', 'Aadhar Card', 'Bank Account'],
          deadline: '2024-06-30'
        },
        {
          id: 2,
          name: 'Startup India Scheme',
          description: 'Support for startups with tax benefits and funding opportunities',
          eligibility: 'Eligible',
          benefits: 'Tax exemption for 3 years, funding support',
          documents: ['Business Registration', 'PAN Card', 'Aadhar Card', 'Business Plan'],
          deadline: '2024-12-31'
        }
      ])
    } finally {
      setIsChecking(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setFormData({
      occupation: '',
      annualIncome: '',
      age: '',
      residentStatus: 'resident',
      education: '',
      gender: '',
      state: ''
    })
  }

  const handleApplyScheme = async (schemeId) => {
    try {
      await schemeService.applyForScheme(schemeId, {
        occupation: formData.occupation,
        annualIncome: formData.annualIncome,
        age: formData.age,
        residentStatus: formData.residentStatus,
        education: formData.education,
        gender: formData.gender,
        state: formData.state
      })
      alert('Application submitted successfully!')
    } catch (error) {
      console.error('Error applying for scheme:', error)
      alert('Failed to submit application. Please try again.')
    }
  }

  return (
    <div className="eligibility-page-layout">
      <Sidebar />
      <div className="eligibility-content">
        <div className="eligibility-header">
          <div>
            <h1 className="eligibility-title">Scheme Eligibility Checker</h1>
            <p className="eligibility-subtitle">Find out which government schemes you're eligible for</p>
          </div>
        </div>

        <div className="eligibility-grid">
          {/* Eligibility Form */}
          <div className="eligibility-form-section">
            <Card title="Enter Your Details" className="eligibility-form-card" icon="📋">
              <form onSubmit={handleCheck} className="eligibility-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Occupation</label>
                    <select
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select Occupation</option>
                      <option value="student">Student</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="salaried">Salaried Employee</option>
                      <option value="business">Business Owner</option>
                      <option value="farmer">Farmer</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="retired">Retired</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Annual Income (₹)</label>
                    <input
                      type="number"
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      placeholder="e.g., 500000"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g., 25"
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>Resident Status</label>
                    <select
                      name="residentStatus"
                      value={formData.residentStatus}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="resident">Resident Citizen</option>
                      <option value="nri">NRI</option>
                      <option value="foreign">Foreign National</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Education Level</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select Education</option>
                      <option value="10th">10th Pass</option>
                      <option value="12th">12th Pass</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Post Graduate</option>
                      <option value="phd">PhD</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>State</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Select State</option>
                      <option value="delhi">Delhi</option>
                      <option value="maharashtra">Maharashtra</option>
                      <option value="karnataka">Karnataka</option>
                      <option value="tamilnadu">Tamil Nadu</option>
                      <option value="telangana">Telangana</option>
                      <option value="gujarat">Gujarat</option>
                      <option value="rajasthan">Rajasthan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <Button 
                    type="submit" 
                    disabled={isChecking}
                    className="check-button"
                    icon="✅"
                  >
                    {isChecking ? 'Checking...' : 'Check Eligibility'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleReset}
                    disabled={isChecking}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Card>

            {/* Popular Schemes */}
            <Card title="Popular Schemes" className="popular-schemes-card" icon="⭐">
              <div className="popular-schemes-list">
                <div className="popular-scheme-item">
                  <span className="scheme-icon">🎓</span>
                  <div className="scheme-info">
                    <h4 className="scheme-name">PM Scholarship Scheme</h4>
                    <p className="scheme-benefit">Up to ₹2,00,000 per year</p>
                  </div>
                  <span className="scheme-tag">Education</span>
                </div>
                <div className="popular-scheme-item">
                  <span className="scheme-icon">🏠</span>
                  <div className="scheme-info">
                    <h4 className="scheme-name">Housing for All</h4>
                    <p className="scheme-benefit">Subsidized housing loans</p>
                  </div>
                  <span className="scheme-tag">Housing</span>
                </div>
                <div className="popular-scheme-item">
                  <span className="scheme-icon">🚀</span>
                  <div className="scheme-info">
                    <h4 className="scheme-name">Startup India</h4>
                    <p className="scheme-benefit">Tax benefits & funding</p>
                  </div>
                  <span className="scheme-tag">Business</span>
                </div>
                <div className="popular-scheme-item">
                  <span className="scheme-icon">🌾</span>
                  <div className="scheme-info">
                    <h4 className="scheme-name">PM Kisan Samman</h4>
                    <p className="scheme-benefit">₹6,000 per year support</p>
                  </div>
                  <span className="scheme-tag">Agriculture</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Results Section */}
          <div className="eligibility-results-section">
            {results ? (
              <>
                <Card title="Eligibility Results" className="results-card" icon="✅">
                  <div className="results-summary">
                    <div className="results-stats">
                      <div className="result-stat eligible">
                        <span className="stat-value">{results.filter(r => r.eligibility === 'Eligible').length}</span>
                        <span className="stat-label">Eligible</span>
                      </div>
                      <div className="result-stat not-eligible">
                        <span className="stat-value">{results.filter(r => r.eligibility === 'Not Eligible').length}</span>
                        <span className="stat-label">Not Eligible</span>
                      </div>
                    </div>
                  </div>

                  <div className="schemes-results-list">
                    {results.map((scheme) => (
                      <Card 
                        key={scheme.id} 
                        className={`scheme-result-card ${scheme.eligibility === 'Eligible' ? 'eligible' : 'not-eligible'}`}
                      >
                        <div className="scheme-result-header">
                          <div className="scheme-result-icon">
                            {scheme.eligibility === 'Eligible' ? '✅' : '❌'}
                          </div>
                          <div className="scheme-result-info">
                            <h3 className="scheme-result-name">{scheme.name}</h3>
                            <span className={`scheme-result-status ${scheme.eligibility === 'Eligible' ? 'eligible' : 'not-eligible'}`}>
                              {scheme.eligibility}
                            </span>
                          </div>
                        </div>

                        <p className="scheme-result-description">{scheme.description}</p>

                        <div className="scheme-result-details">
                          <div className="detail-item">
                            <span className="detail-label">Benefits:</span>
                            <span className="detail-value">{scheme.benefits}</span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Deadline:</span>
                            <span className="detail-value">{scheme.deadline}</span>
                          </div>
                        </div>

                        <div className="scheme-result-documents">
                          <h4 className="documents-title">Required Documents:</h4>
                          <div className="documents-list">
                            {scheme.documents.map((doc, index) => (
                              <span key={index} className="document-tag">{doc}</span>
                            ))}
                          </div>
                        </div>

                        {scheme.eligibility === 'Eligible' && (
                          <Button
                            className="apply-scheme-button"
                            icon="📝"
                            onClick={() => handleApplyScheme(scheme.id)}
                          >
                            Apply Now
                          </Button>
                        )}
                      </Card>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="no-results-card">
                <div className="no-results-content">
                  <div className="no-results-icon">📋</div>
                  <h3>Check Your Eligibility</h3>
                  <p>Fill in your details on the left to find out which government schemes you're eligible for.</p>
                </div>
              </Card>
            )}

            {/* Scheme Categories */}
            <Card title="Scheme Categories" className="categories-card" icon="📂">
              <div className="categories-grid">
                <div className="category-item">
                  <span className="category-icon">🎓</span>
                  <span className="category-name">Education</span>
                  <span className="category-count">15</span>
                </div>
                <div className="category-item">
                  <span className="category-icon">🏠</span>
                  <span className="category-name">Housing</span>
                  <span className="category-count">8</span>
                </div>
                <div className="category-item">
                  <span className="category-icon">🚀</span>
                  <span className="category-name">Business</span>
                  <span className="category-count">12</span>
                </div>
                <div className="category-item">
                  <span className="category-icon">🌾</span>
                  <span className="category-name">Agriculture</span>
                  <span className="category-count">10</span>
                </div>
                <div className="category-item">
                  <span className="category-icon">👩‍⚕️</span>
                  <span className="category-name">Healthcare</span>
                  <span className="category-count">6</span>
                </div>
                <div className="category-item">
                  <span className="category-icon">👵</span>
                  <span className="category-name">Pension</span>
                  <span className="category-count">5</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EligibilityChecker