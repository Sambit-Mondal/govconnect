import React, { useState, useRef, useEffect } from 'react'
import Card from '../../components/Card'
import Button from '../../components/Button'
import Sidebar from '../../components/Sidebar'

const GovAssist = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m GovAssist, your AI assistant for government services. I can help you with:',
      isWelcome: true
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    'What is the status of my application?',
    'What documents are required for business registration?',
    'Which schemes am I eligible for?',
    'How do I apply for a driving license?',
    'Where can I find nearby government offices?'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return

    const userMessage = { role: 'user', content: messageText }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I can help you check your application status. Please provide your application ID or go to the Dashboard section.',
        'For business registration, you typically need: Aadhar card, PAN card, business address proof, and photographs. Would you like me to guide you through the process?',
        'Based on your profile, you may be eligible for several schemes including PM Scholarship and Startup India. Would you like me to show you the details?',
        'To apply for a driving license, you need to visit the nearby RTO office with your Aadhar card, address proof, and photographs. I can help you find the nearest RTO office.',
        'I can help you find nearby government offices. Please use the Nearby Services section or tell me your current location.'
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const aiResponse = { 
        role: 'assistant', 
        content: randomResponse
      }
      
      setMessages(prev => [...prev, aiResponse])
      setLoading(false)
    }, 1500)
  }

  const handleSuggestedQuestion = (question) => {
    handleSend(question)
  }

  return (
    <div className="gov-assist-page-layout">
      <Sidebar />
      <div className="gov-assist-content">
        <div className="gov-assist-header">
          <div className="gov-assist-header-content">
            <div className="gov-assist-icon">🤖</div>
            <div>
              <h1 className="gov-assist-title">AI GovAssist</h1>
              <p className="gov-assist-subtitle">Your intelligent assistant for government services</p>
            </div>
          </div>
          <Button variant="outline" icon="🔄">New Chat</Button>
        </div>

        <div className="chat-container">
          <Card className="chat-card" icon="💬">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`chat-message ${message.role === 'user' ? 'user' : 'assistant'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="chat-avatar">🤖</div>
                  )}
                  <div className="message-content-wrapper">
                    {message.isWelcome ? (
                      <div className="welcome-message">
                        <p>{message.content}</p>
                        <ul className="welcome-options">
                          <li>✓ Check application status</li>
                          <li>✓ Find government services</li>
                          <li>✓ Get document requirements</li>
                          <li>✓ Check scheme eligibility</li>
                          <li>✓ Locate nearby offices</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="message-content">
                        {message.content}
                      </div>
                    )}
                    <div className="message-time">
                      {message.role === 'user' ? 'Just now' : 'Just now'}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="chat-avatar user">👤</div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="chat-message assistant">
                  <div className="chat-avatar">🤖</div>
                  <div className="message-content-wrapper">
                    <div className="message-content typing">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {!loading && messages.length <= 2 && (
              <div className="suggested-questions">
                <p className="suggested-title">Suggested questions:</p>
                <div className="suggested-buttons">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      className="suggested-button"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input */}
            <div className="chat-input-container">
              <div className="chat-input-wrapper">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  disabled={loading}
                  className="chat-input"
                />
                <Button 
                  onClick={() => handleSend()} 
                  disabled={loading || !input.trim()}
                  className="send-button"
                  icon="📤"
                >
                  Send
                </Button>
              </div>
              <p className="chat-disclaimer">
                AI responses are for guidance only. Please verify with official sources.
              </p>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="quick-actions-sidebar">
            <Card title="Quick Actions" className="quick-actions-card" icon="⚡">
              <div className="quick-actions-list">
                <button className="quick-action-item" onClick={() => handleSend('Check my application status')}>
                  <span className="quick-action-icon">📋</span>
                  <span>Check Application Status</span>
                </button>
                <button className="quick-action-item" onClick={() => handleSend('Find business registration services')}>
                  <span className="quick-action-icon">🏢</span>
                  <span>Business Registration</span>
                </button>
                <button className="quick-action-item" onClick={() => handleSend('What schemes am I eligible for?')}>
                  <span className="quick-action-icon">✅</span>
                  <span>Check Eligibility</span>
                </button>
                <button className="quick-action-item" onClick={() => handleSend('Find nearby government offices')}>
                  <span className="quick-action-icon">📍</span>
                  <span>Nearby Offices</span>
                </button>
              </div>
            </Card>

            <Card title="Chat Features" className="features-card" icon="✨">
              <ul className="features-list">
                <li>🔒 Secure & Private</li>
                <li>⚡ Instant Responses</li>
                <li>🎯 Accurate Information</li>
                <li>🌐 24/7 Available</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GovAssist
