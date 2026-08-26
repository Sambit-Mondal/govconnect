const express = require('express')
const router = express.Router()
const paymentController = require('../controllers/paymentController')
const authMiddleware = require('../middleware/authMiddleware')

// All payment routes require authentication
router.use(authMiddleware)

router.get('/', paymentController.getPayments)
router.post('/', paymentController.createPayment)
router.get('/:id', paymentController.getPayment)
router.post('/:id/process', paymentController.processPayment)

module.exports = router
