const express = require('express')
const router = express.Router()
const locationController = require('../controllers/locationController')

// Public routes
router.get('/offices', locationController.getNearbyOffices)
router.get('/offices/:id', locationController.getOffice)

module.exports = router
