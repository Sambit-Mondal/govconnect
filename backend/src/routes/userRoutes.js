const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

// All user routes require authentication
router.use(authMiddleware)

router.get('/profile', userController.getProfile)
router.put('/profile', userController.updateProfile)
router.delete('/account', userController.deleteAccount)
router.get('/applications', userController.getApplications)

module.exports = router
