const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

// All admin routes require authentication and admin role
router.use(authMiddleware)
router.use(adminMiddleware)

router.get('/dashboard', adminController.getDashboardStats)
router.get('/users', adminController.getUsers)
router.put('/users/:id/status', adminController.updateUserStatus)
router.get('/applications', adminController.getApplications)
router.put('/applications/:id/approve', adminController.approveApplication)
router.put('/applications/:id/reject', adminController.rejectApplication)
router.get('/grievances', adminController.getGrievances)
router.put('/grievances/:id/resolve', adminController.resolveGrievance)

module.exports = router
