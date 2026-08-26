const express = require('express')
const router = express.Router()
const grievanceController = require('../controllers/grievanceController')
const authMiddleware = require('../middleware/authMiddleware')

// All grievance routes require authentication
router.use(authMiddleware)

router.get('/', grievanceController.getGrievances)
router.get('/:id', grievanceController.getGrievance)
router.post('/', grievanceController.createGrievance)
router.put('/:id', grievanceController.updateGrievance)

module.exports = router
