const jwt = require('jsonwebtoken')
const config = require('../config/env')

const generateToken = (userId, role = 'citizen') => {
  return jwt.sign(
    { userId, role },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  )
}

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret)
  } catch (error) {
    return null
  }
}

module.exports = {
  generateToken,
  verifyToken
}
