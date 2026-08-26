const { body, validationResult } = require('express-validator')

const validatePayment = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const createPaymentValidation = [
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be greater than 0'),
  
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('due_date')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
]

const processPaymentValidation = [
  body('payment_method')
    .notEmpty()
    .withMessage('Payment method is required')
    .isIn(['upi', 'card', 'net_banking', 'wallet'])
    .withMessage('Invalid payment method'),
  
  body('transaction_id')
    .notEmpty()
    .withMessage('Transaction ID is required')
]

module.exports = {
  validatePayment,
  createPaymentValidation,
  processPaymentValidation
}
