const pool = require('../config/database')

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

exports.getApplication = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM applications WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' })
    }

    res.json({ application: result.rows[0] })
  } catch (error) {
    console.error('Get application error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.createApplication = async (req, res) => {
  try {
    const userId = req.userId
    const { service_id, type, data } = req.body

    const result = await pool.query(
      'INSERT INTO applications (user_id, service_id, type, data, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, service_id, type, JSON.stringify(data), 'pending']
    )

    res.status(201).json({ message: 'Application created successfully', application: result.rows[0] })
  } catch (error) {
    console.error('Create application error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.updateApplication = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { data } = req.body

    const result = await pool.query(
      'UPDATE applications SET data = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [JSON.stringify(data), id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' })
    }

    res.json({ message: 'Application updated successfully', application: result.rows[0] })
  } catch (error) {
    console.error('Update application error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'DELETE FROM applications WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Application not found' })
    }

    res.json({ message: 'Application deleted successfully' })
  } catch (error) {
    console.error('Delete application error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
