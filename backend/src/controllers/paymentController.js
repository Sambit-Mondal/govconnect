const pool = require('../config/database')

exports.getPayments = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    )

    res.json({ payments: result.rows })
  } catch (error) {
    console.error('Get payments error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.createPayment = async (req, res) => {
  try {
    const userId = req.userId
    const { amount, description, due_date } = req.body

    const result = await pool.query(
      'INSERT INTO payments (user_id, amount, description, due_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, amount, description, due_date, 'pending']
    )

    res.status(201).json({ message: 'Payment created successfully', payment: result.rows[0] })
  } catch (error) {
    console.error('Create payment error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getPayment = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM payments WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    res.json({ payment: result.rows[0] })
  } catch (error) {
    console.error('Get payment error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.processPayment = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { payment_method, transaction_id } = req.body

    // In a real application, integrate with payment gateway here
    const result = await pool.query(
      'UPDATE payments SET status = $1, payment_method = $2, transaction_id = $3, paid_at = NOW() WHERE id = $4 AND user_id = $5 RETURNING *',
      ['paid', payment_method, transaction_id, id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Payment not found' })
    }

    res.json({ message: 'Payment processed successfully', payment: result.rows[0] })
  } catch (error) {
    console.error('Process payment error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
