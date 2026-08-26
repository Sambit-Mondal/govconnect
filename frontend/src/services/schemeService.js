import api from './api'

export const schemeService = {
  getSchemes: async () => {
    const response = await api.get('/schemes')
    return response.data
  },

  getScheme: async (id) => {
    const response = await api.get(`/schemes/${id}`)
    return response.data
  },

  checkEligibility: async (criteria) => {
    const response = await api.post('/schemes/check-eligibility', criteria)
    return response.data
  },

  applyForScheme: async (id, applicationData) => {
    const response = await api.post(`/schemes/${id}/apply`, applicationData)
    return response.data
  }
}
