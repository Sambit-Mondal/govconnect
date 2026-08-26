const pool = require('../config/database')

exports.getServices = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM services WHERE is_active = true ORDER BY name'
    )

    res.json({ services: result.rows })
  } catch (error) {
    console.error('Get services error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getService = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'SELECT * FROM services WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' })
    }

    res.json({ service: result.rows[0] })
  } catch (error) {
    console.error('Get service error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getServicesByCategory = async (req, res) => {
  try {
    const { category } = req.params

    const result = await pool.query(
      'SELECT * FROM services WHERE category = $1 AND is_active = true ORDER BY name',
      [category]
    )

    res.json({ services: result.rows })
  } catch (error) {
    console.error('Get services by category error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
