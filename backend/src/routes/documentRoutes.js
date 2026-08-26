const express = require('express')
const router = express.Router()
const documentController = require('../controllers/documentController')
const authMiddleware = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')

// All document routes require authentication
router.use(authMiddleware)

router.get('/', documentController.getDocuments)
router.post('/upload', uploadMiddleware.single('document'), documentController.uploadDocument)
router.get('/:id', documentController.getDocument)
router.delete('/:id', documentController.deleteDocument)
router.get('/:id/download', documentController.downloadDocument)

module.exports = router
