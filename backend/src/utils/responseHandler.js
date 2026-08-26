const responseHandler = {
  success: (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    })
  },

  error: (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
      success: false,
      message: error.message || 'An error occurred',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    })
  },

  created: (res, data, message = 'Resource created successfully') => {
    return responseHandler.success(res, data, message, 201)
  },

  notFound: (res, message = 'Resource not found') => {
    return res.status(404).json({
      success: false,
      message
    })
  },

  badRequest: (res, message = 'Bad request') => {
    return res.status(400).json({
      success: false,
      message
    })
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return res.status(401).json({
      success: false,
      message
    })
  },

  forbidden: (res, message = 'Forbidden') => {
    return res.status(403).json({
      success: false,
      message
    })
  },

  conflict: (res, message = 'Resource already exists') => {
    return res.status(409).json({
      success: false,
      message
    })
  }
}

module.exports = responseHandler
