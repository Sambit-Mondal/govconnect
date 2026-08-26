const bcrypt = require('bcryptjs')
const pool = require('../config/database')

exports.changePassword = async (req, res) => {
  try {
    const userId = req.userId
    const { current_password, new_password } = req.body

    // Get current password
    const result = await pool.query(
      'SELECT password FROM users WHERE id = $1',
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify current password
    const isMatch = await bcrypt.compare(current_password, result.rows[0].password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10)

    // Update password
    await pool.query(
      'UPDATE users SET password = $1 WHERE id = $2',
      [hashedPassword, userId]
    )

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.enable2FA = async (req, res) => {
  try {
    const userId = req.userId

    await pool.query(
      'UPDATE users SET two_factor_enabled = true WHERE id = $1',
      [userId]
    )

    res.json({ message: '2FA enabled successfully' })
  } catch (error) {
    console.error('Enable 2FA error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.disable2FA = async (req, res) => {
  try {
    const userId = req.userId

    await pool.query(
      'UPDATE users SET two_factor_enabled = false WHERE id = $1',
      [userId]
    )

    res.json({ message: '2FA disabled successfully' })
  } catch (error) {
    console.error('Disable 2FA error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getActivityLog = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM audit_logs WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
      [userId]
    )

    res.json({ activities: result.rows })
  } catch (error) {
    console.error('Get activity log error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getConsents = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      `SELECT uc.*, d.name as department_name 
       FROM user_consents uc 
       JOIN departments d ON uc.department_id = d.id 
       WHERE uc.user_id = $1 AND uc.status = 'active' 
       ORDER BY uc.granted_at DESC`,
      [userId]
    )

    res.json({ consents: result.rows })
  } catch (error) {
    console.error('Get consents error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.revokeConsent = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    await pool.query(
      'UPDATE user_consents SET status = $1, expires_at = NOW() WHERE id = $2 AND user_id = $3',
      ['revoked', id, userId]
    )

    res.json({ message: 'Consent revoked successfully' })
  } catch (error) {
    console.error('Revoke consent error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getDevices = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM user_devices WHERE user_id = $1 ORDER BY last_active DESC',
      [userId]
    )

    res.json({ devices: result.rows })
  } catch (error) {
    console.error('Get devices error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.revokeDevice = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    await pool.query(
      'DELETE FROM user_devices WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    res.json({ message: 'Device revoked successfully' })
  } catch (error) {
    console.error('Revoke device error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getSessions = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM login_activities WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    res.json({ sessions: result.rows })
  } catch (error) {
    console.error('Get sessions error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.revokeSession = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    await pool.query(
      'DELETE FROM login_activities WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    res.json({ message: 'Session revoked successfully' })
  } catch (error) {
    console.error('Revoke session error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
