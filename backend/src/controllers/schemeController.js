const pool = require('../config/database')

exports.getSchemes = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM schemes WHERE is_active = true ORDER BY name'
    )

    res.json({ schemes: result.rows })
  } catch (error) {
    console.error('Get schemes error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getScheme = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'SELECT * FROM schemes WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Scheme not found' })
    }

    res.json({ scheme: result.rows[0] })
  } catch (error) {
    console.error('Get scheme error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.checkEligibility = async (req, res) => {
  try {
    const userId = req.userId
    const { age, income, state, category, occupation } = req.body

    // Simple eligibility logic - in production, this would be more sophisticated
    const result = await pool.query(
      'SELECT * FROM schemes WHERE is_active = true AND ($1::int >= min_age OR min_age IS NULL) AND ($2::numeric <= max_income OR max_income IS NULL)',
      [age, income]
    )

    res.json({ eligible_schemes: result.rows })
  } catch (error) {
    console.error('Check eligibility error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.applyForScheme = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { application_data } = req.body

    // Create an application for the scheme
    const result = await pool.query(
      'INSERT INTO applications (user_id, service_id, type, data, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, id, 'scheme', JSON.stringify(application_data), 'pending']
    )

    res.status(201).json({ message: 'Scheme application submitted successfully', application: result.rows[0] })
  } catch (error) {
    console.error('Apply for scheme error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
