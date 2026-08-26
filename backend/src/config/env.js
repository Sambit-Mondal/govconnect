require('dotenv').config()

const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    name: process.env.DB_NAME || 'govconnect',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD
  },
  
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: process.env.JWT_EXPIRE || '7d'
  },
  
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD
  },
  
  payment: {
    gatewayKey: process.env.PAYMENT_GATEWAY_KEY,
    gatewaySecret: process.env.PAYMENT_GATEWAY_SECRET
  },
  
  ai: {
    apiKey: process.env.AI_SERVICE_API_KEY
  },
  
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173'
  }
}

module.exports = config
