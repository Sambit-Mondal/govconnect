const { body, validationResult } = require('express-validator')

const validateApplication = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const createApplicationValidation = [
  body('service_id')
    .notEmpty()
    .withMessage('Service ID is required')
    .isInt()
    .withMessage('Service ID must be an integer'),
  
  body('type')
    .notEmpty()
    .withMessage('Application type is required')
    .isIn(['passport', 'aadhar', 'pan', 'driving_license', 'voter_id', 'scheme'])
    .withMessage('Invalid application type'),
  
  body('data')
    .notEmpty()
    .withMessage('Application data is required')
    .isObject()
    .withMessage('Application data must be an object')
]

const updateApplicationValidation = [
  body('data')
    .notEmpty()
    .withMessage('Application data is required')
    .isObject()
    .withMessage('Application data must be an object')
]

module.exports = {
  validateApplication,
  createApplicationValidation,
  updateApplicationValidation
}
