const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack)

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    })
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid token'
    })
  }

  if (err.code === '23505') { // Unique violation in PostgreSQL
    return res.status(409).json({
      error: 'Duplicate Entry',
      message: 'A record with this information already exists'
    })
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
}

module.exports = errorMiddleware
