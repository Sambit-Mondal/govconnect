const pool = require('../config/database')
const path = require('path')

exports.getDocuments = async (req, res) => {
  try {
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM documents WHERE user_id = $1 ORDER BY uploaded_at DESC',
      [userId]
    )

    res.json({ documents: result.rows })
  } catch (error) {
    console.error('Get documents error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.uploadDocument = async (req, res) => {
  try {
    const userId = req.userId
    const { originalname, mimetype, size, filename } = req.file
    const { type, description } = req.body

    const result = await pool.query(
      'INSERT INTO documents (user_id, name, type, file_path, file_size, mime_type, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, originalname, type, filename, size, mimetype, description]
    )

    res.status(201).json({ message: 'Document uploaded successfully', document: result.rows[0] })
  } catch (error) {
    console.error('Upload document error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.getDocument = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM documents WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json({ document: result.rows[0] })
  } catch (error) {
    console.error('Get document error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'DELETE FROM documents WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' })
    }

    res.json({ message: 'Document deleted successfully' })
  } catch (error) {
    console.error('Delete document error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.downloadDocument = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const result = await pool.query(
      'SELECT * FROM documents WHERE id = $1 AND user_id = $2',
      [id, userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Document not found' })
    }

    const document = result.rows[0]
    const filePath = path.join(__dirname, '../../uploads/documents', document.file_path)

    res.download(filePath, document.name)
  } catch (error) {
    console.error('Download document error:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
