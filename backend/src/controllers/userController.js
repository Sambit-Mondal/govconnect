const pool = require('../config/database')

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT id, name, email, phone, aadhar_number, address, date_of_birth, role, created_at FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user: result.rows[0] })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.userId
    const { name, phone, address, date_of_birth } = req.body

    const result = await pool.query(
      'UPDATE users SET name = $1, phone = $2, address = $3, date_of_birth = $4 WHERE id = $5 RETURNING *',
      [name, phone, address, date_of_birth, userId]
    )

    res.json({ message: 'Profile updated successfully', user: result.rows[0] })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.userId

    await pool.query('DELETE FROM users WHERE id = $1', [userId])

    res.json({ message: 'Account deleted successfully' })
  } catch (error) {
    console.error('Delete account error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getApplications = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    res.json({ applications: result.rows })
  } catch (error) {
    console.error('Get applications error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
