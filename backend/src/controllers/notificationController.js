const pool = require('../config/database')

exports.getNotifications = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    res.json({ notifications: result.rows })
  } catch (error) {
    console.error('Get notifications error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'UPDATE notifications SET is_read = true WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' })
    }

    res.json({ message: 'Notification marked as read', notification: result.rows[0] })
  } catch (error) {
    console.error('Mark as read error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.markAllAsRead = async (req, res) => {
  try {
    const userId = req.userId

    await pool.query(
      'UPDATE notifications SET is_read = true WHERE user_id = $1',
      [userId]
    )

    res.json({ message: 'All notifications marked as read' })
  } catch (error) {
    console.error('Mark all as read error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'DELETE FROM notifications WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Notification not found' })
    }

    res.json({ message: 'Notification deleted successfully' })
  } catch (error) {
    console.error('Delete notification error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
