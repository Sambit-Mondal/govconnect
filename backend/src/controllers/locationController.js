const pool = require('../config/database')

exports.getNearbyOffices = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10, type } = req.query

    let query = 'SELECT * FROM government_offices'
    const params = []
    const conditions = []

    if (type) {
      conditions.push('type = $' + (params.length + 1))
      params.push(type)
    }

    if (latitude && longitude) {
      // Simple distance calculation (in production, use PostGIS)
      conditions.push(`ABS(latitude - $${params.length + 1}) < 0.1 AND ABS(longitude - $${params.length + 2}) < 0.1`)
      params.push(parseFloat(latitude), parseFloat(longitude))
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ')
    }

    query += ' ORDER BY rating DESC'

    const result = await pool.query(query, params)

    res.json({ offices: result.rows })
  } catch (error) {
    console.error('Get nearby offices error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getOffice = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'SELECT * FROM government_offices WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Office not found' })
    }

    res.json({ office: result.rows[0] })
  } catch (error) {
    console.error('Get office error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}