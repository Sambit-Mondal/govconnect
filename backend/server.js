require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

// Import routes
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const applicationRoutes = require('./src/routes/applicationRoutes')
const serviceRoutes = require('./src/routes/serviceRoutes')
const documentRoutes = require('./src/routes/documentRoutes')
const paymentRoutes = require('./src/routes/paymentRoutes')
const notificationRoutes = require('./src/routes/notificationRoutes')
const schemeRoutes = require('./src/routes/schemeRoutes')
const grievanceRoutes = require('./src/routes/grievanceRoutes')
const locationRoutes = require('./src/routes/locationRoutes')
const securityRoutes = require('./src/routes/securityRoutes')
const adminRoutes = require('./src/routes/adminRoutes')

// Import middleware
const errorMiddleware = require('./src/middleware/errorMiddleware')

// Initialize express app
const app = express()

// Security middleware
app.use(helmet())
app.use(cors())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files for uploads
app.use('/uploads', express.static('uploads'))

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/documents', documentRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/schemes', schemeRoutes)
app.use('/api/grievances', grievanceRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/security', securityRoutes)
app.use('/api/admin', adminRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GovConnect API is running' })
})

// Error handling middleware
app.use(errorMiddleware)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`GovConnect API server running on port ${PORT}`)
})
