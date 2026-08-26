const express = require('express')
const router = express.Router()
const applicationController = require('../controllers/applicationController')
const authMiddleware = require('../middleware/authMiddleware')

// All application routes require authentication
router.use(authMiddleware)

router.get('/', applicationController.getApplications)
router.get('/:id', applicationController.getApplication)
router.post('/', applicationController.createApplication)
router.put('/:id', applicationController.updateApplication)
router.delete('/:id', applicationController.deleteApplication)

module.exports = router
