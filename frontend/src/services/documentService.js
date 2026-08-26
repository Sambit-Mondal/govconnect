import api from './api'

export const documentService = {
  getDocuments: async () => {
    const response = await api.get('/documents')
    return response.data
  },

  uploadDocument: async (formData) => {
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  },

  deleteDocument: async (id) => {
    const response = await api.delete(`/documents/${id}`)
    return response.data
  },

  downloadDocument: async (id) => {
    const response = await api.get(`/documents/${id}/download`, {
      responseType: 'blob'
    })
    return response.data
  }
}
