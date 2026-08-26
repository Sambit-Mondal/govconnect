const express = require('express')
const router = express.Router()
const serviceController = require('../controllers/serviceController')

// Public routes
router.get('/', serviceController.getServices)
router.get('/:id', serviceController.getService)
router.get('/category/:category', serviceController.getServicesByCategory)

module.exports = router
