const { body, validationResult } = require('express-validator')

const validateGrievance = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const createGrievanceValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['Infrastructure', 'Utilities', 'Sanitation', 'Healthcare', 'Education', 'Other'])
    .withMessage('Invalid category'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  
  body('location')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Location must not exceed 500 characters')
]

const updateGrievanceValidation = [
  body('description')
    .optional()
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('Description must be between 20 and 2000 characters'),
  
  body('location')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Location must not exceed 500 characters')
]

module.exports = {
  validateGrievance,
  createGrievanceValidation,
  updateGrievanceValidation
}
