const pool = require('../config/database')

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = result.rows[0]

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' })
    }

    next()
  } catch (error) {
    console.error('Admin middleware error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = adminMiddleware
