const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const pool = require('../config/database')
const config = require('../config/env')

const generateToken = (userId) => {
  return jwt.sign({ userId }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  })
}

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, aadharNumber } = req.body

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT id FROM users WHERE email = $1 OR aadhar_number = $2',
      [email, aadharNumber]
    )

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user
    const result = await pool.query(
      'INSERT INTO users (name, email, password, aadhar_number, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role',
      [name, email, hashedPassword, aadharNumber, 'citizen']
    )

    const user = result.rows[0]
    const token = generateToken(user.id)

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Server error during registration' })
  }
}

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user
    const result = await pool.query(
      'SELECT id, name, email, password, role FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = result.rows[0]

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Log login activity
    await pool.query(
      'INSERT INTO login_activities (user_id, ip_address, user_agent) VALUES ($1, $2, $3)',
      [user.id, req.ip, req.get('user-agent')]
    )

    const token = generateToken(user.id)

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Server error during login' })
  }
}

exports.logout = async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    res.json({ message: 'Logout successful' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ error: 'Server error during logout' })
  }
}

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId // Set by auth middleware

    const result = await pool.query(
      'SELECT id, name, email, aadhar_number, role, created_at FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user: result.rows[0] })
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { name, phone, address } = req.body

    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING id, name, email, phone, address',
      [name, phone, address, userId]
    )

    res.json({ message: 'Profile updated successfully', user: result.rows[0] })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
