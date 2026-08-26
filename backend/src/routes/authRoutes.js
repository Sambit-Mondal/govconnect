const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { body } = require('express-validator')

// Validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('aadharNumber').isLength({ min: 12, max: 12 }).withMessage('Aadhar number must be 12 digits')
]

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
]

// Routes
router.post('/register', registerValidation, authController.register)
router.post('/login', loginValidation, authController.login)
router.post('/logout', authController.logout)
router.get('/me', authController.getCurrentUser)
router.put('/profile', authController.updateProfile)

module.exports = router
