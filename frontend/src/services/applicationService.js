import api from './api'

export const applicationService = {
  getApplications: async () => {
    const response = await api.get('/applications')
    return response.data
  },

  getApplication: async (id) => {
    const response = await api.get(`/applications/${id}`)
    return response.data
  },

  createApplication: async (applicationData) => {
    const response = await api.post('/applications', applicationData)
    return response.data
  },

  updateApplication: async (id, applicationData) => {
    const response = await api.put(`/applications/${id}`, applicationData)
    return response.data
  },

  deleteApplication: async (id) => {
    const response = await api.delete(`/applications/${id}`)
    return response.data
  }
}
