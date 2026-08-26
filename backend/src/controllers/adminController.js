const pool = require('../config/database')

exports.getDashboardStats = async (req, res) => {
  try {
    // Get various statistics
    const usersCount = await pool.query('SELECT COUNT(*) FROM users')
    const applicationsCount = await pool.query('SELECT COUNT(*) FROM applications WHERE status = $1', ['pending'])
    const grievancesCount = await pool.query('SELECT COUNT(*) FROM grievances WHERE status = $1', ['pending'])

    res.json({
      stats: {
        total_users: parseInt(usersCount.rows[0].count),
        pending_applications: parseInt(applicationsCount.rows[0].count),
        pending_grievances: parseInt(grievancesCount.rows[0].count)
      }
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC'
    )

    res.json({ users: result.rows })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    await pool.query(
      'UPDATE users SET status = $1 WHERE id = $2',
      [status, id]
    )

    res.json({ message: 'User status updated successfully' })
  } catch (error) {
    console.error('Update user status error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getApplications = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT a.*, u.name as user_name FROM applications a JOIN users u ON a.user_id = u.id ORDER BY a.created_at DESC'
    )

    res.json({ applications: result.rows })
  } catch (error) {
    console.error('Get applications error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'UPDATE applications SET status = $1, approved_at = NOW() WHERE id = $2 RETURNING *',
      ['approved', id]
    )

    res.json({ message: 'Application approved successfully', application: result.rows[0] })
  } catch (error) {
    console.error('Approve application error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.rejectApplication = async (req, res) => {
  try {
    const { id } = req.params
    const { reason } = req.body

    const result = await pool.query(
      'UPDATE applications SET status = $1, rejection_reason = $2, rejected_at = NOW() WHERE id = $3 RETURNING *',
      ['rejected', reason, id]
    )

    res.json({ message: 'Application rejected successfully', application: result.rows[0] })
  } catch (error) {
    console.error('Reject application error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getGrievances = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT g.*, u.name as user_name FROM grievances g JOIN users u ON g.user_id = u.id ORDER BY g.created_at DESC'
    )

    res.json({ grievances: result.rows })
  } catch (error) {
    console.error('Get grievances error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.resolveGrievance = async (req, res) => {
  try {
    const { id } = req.params
    const { resolution } = req.body

    const result = await pool.query(
      'UPDATE grievances SET status = $1, resolution = $2, resolved_at = NOW() WHERE id = $3 RETURNING *',
      ['resolved', resolution, id]
    )

    res.json({ message: 'Grievance resolved successfully', grievance: result.rows[0] })
  } catch (error) {
    console.error('Resolve grievance error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
