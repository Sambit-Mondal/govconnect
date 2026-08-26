const express = require('express')
const router = express.Router()
const securityController = require('../controllers/securityController')
const authMiddleware = require('../middleware/authMiddleware')

// All security routes require authentication
router.use(authMiddleware)

router.post('/change-password', securityController.changePassword)
router.post('/enable-2fa', securityController.enable2FA)
router.post('/disable-2fa', securityController.disable2FA)
router.get('/activity-log', securityController.getActivityLog)
router.get('/sessions', securityController.getSessions)
router.delete('/sessions/:id', securityController.revokeSession)
router.get('/consents', securityController.getConsents)
router.delete('/consents/:id', securityController.revokeConsent)
router.get('/devices', securityController.getDevices)
router.delete('/devices/:id', securityController.revokeDevice)

module.exports = router
