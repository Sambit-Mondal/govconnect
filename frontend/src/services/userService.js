import api from './api'

export const userService = {
  getProfile: async () => {
    const response = await api.get('/users/profile')
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData)
    return response.data
  },

  deleteAccount: async () => {
    const response = await api.delete('/users/account')
    return response.data
  },

  getApplications: async () => {
    const response = await api.get('/users/applications')
    return response.data
  }
}
