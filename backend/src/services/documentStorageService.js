const fs = require('fs')
const path = require('path')

class DocumentStorageService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads/documents')
    this.ensureUploadDir()
  }

  ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true })
    }
  }

  async saveDocument(file, userId) {
    try {
      const userDir = path.join(this.uploadDir, userId.toString())
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true })
      }

      const fileName = `${Date.now()}_${file.originalname}`
      const filePath = path.join(userDir, fileName)

      fs.writeFileSync(filePath, file.buffer)

      return {
        fileName,
        filePath: `documents/${userId}/${fileName}`,
        size: file.size,
        mimeType: file.mimetype
      }
    } catch (error) {
      console.error('Document save error:', error)
      throw new Error('Failed to save document')
    }
  }

  async deleteDocument(filePath) {
    try {
      const fullPath = path.join(__dirname, '../../uploads', filePath)
      
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath)
        return { success: true }
      }

      return { success: false, error: 'File not found' }
    } catch (error) {
      console.error('Document delete error:', error)
      throw new Error('Failed to delete document')
    }
  }

  async getDocument(filePath) {
    try {
      const fullPath = path.join(__dirname, '../../uploads', filePath)
      
      if (fs.existsSync(fullPath)) {
        const fileBuffer = fs.readFileSync(fullPath)
        return fileBuffer
      }

      throw new Error('File not found')
    } catch (error) {
      console.error('Document retrieve error:', error)
      throw new Error('Failed to retrieve document')
    }
  }

  async getUserDocuments(userId) {
    try {
      const userDir = path.join(this.uploadDir, userId.toString())
      
      if (!fs.existsSync(userDir)) {
        return []
      }

      const files = fs.readdirSync(userDir)
      return files.map(file => ({
        fileName: file,
        filePath: `documents/${userId}/${file}`,
        size: fs.statSync(path.join(userDir, file)).size
      }))
    } catch (error) {
      console.error('Get user documents error:', error)
      throw new Error('Failed to get user documents')
    }
  }

  async verifyDocumentIntegrity(filePath) {
    try {
      const fullPath = path.join(__dirname, '../../uploads', filePath)
      
      if (!fs.existsSync(fullPath)) {
        return { valid: false, error: 'File not found' }
      }

      const stats = fs.statSync(fullPath)
      return {
        valid: true,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime
      }
    } catch (error) {
      console.error('Document verification error:', error)
      throw new Error('Failed to verify document')
    }
  }
}

module.exports = new DocumentStorageService()
