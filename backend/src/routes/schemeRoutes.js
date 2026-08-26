const express = require('express')
const router = express.Router()
const schemeController = require('../controllers/schemeController')
const authMiddleware = require('../middleware/authMiddleware')

// Public routes
router.get('/', schemeController.getSchemes)
router.get('/:id', schemeController.getScheme)

// Protected routes
router.post('/check-eligibility', authMiddleware, schemeController.checkEligibility)
router.post('/:id/apply', authMiddleware, schemeController.applyForScheme)

module.exports = router
