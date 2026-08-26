import api from './api'

export const grievanceService = {
  getGrievances: async () => {
    const response = await api.get('/grievances')
    return response.data
  },

  getGrievance: async (id) => {
    const response = await api.get(`/grievances/${id}`)
    return response.data
  },

  createGrievance: async (grievanceData) => {
    const response = await api.post('/grievances', grievanceData)
    return response.data
  },

  updateGrievance: async (id, grievanceData) => {
    const response = await api.put(`/grievances/${id}`, grievanceData)
    return response.data
  }
}
