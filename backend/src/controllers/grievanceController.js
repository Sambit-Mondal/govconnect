const pool = require('../config/database')

exports.getGrievances = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM grievances WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    res.json({ grievances: result.rows })
  } catch (error) {
    console.error('Get grievances error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getGrievance = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM grievances WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Grievance not found' })
    }

    res.json({ grievance: result.rows[0] })
  } catch (error) {
    console.error('Get grievance error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.createGrievance = async (req, res) => {
  try {
    const userId = req.userId
    const { title, category, description, location } = req.body

    const result = await pool.query(
      'INSERT INTO grievances (user_id, title, category, description, location, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, category, description, location, 'pending']
    )

    res.status(201).json({ message: 'Grievance created successfully', grievance: result.rows[0] })
  } catch (error) {
    console.error('Create grievance error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.updateGrievance = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { description, location } = req.body

    const result = await pool.query(
      'UPDATE grievances SET description = $1, location = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
      [description, location, id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Grievance not found' })
    }

    res.json({ message: 'Grievance updated successfully', grievance: result.rows[0] })
  } catch (error) {
    console.error('Update grievance error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
