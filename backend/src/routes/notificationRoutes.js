const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')
const authMiddleware = require('../middleware/authMiddleware')

// All notification routes require authentication
router.use(authMiddleware)

router.get('/', notificationController.getNotifications)
router.put('/:id/read', notificationController.markAsRead)
router.put('/read-all', notificationController.markAllAsRead)
router.delete('/:id', notificationController.deleteNotification)

module.exports = router
