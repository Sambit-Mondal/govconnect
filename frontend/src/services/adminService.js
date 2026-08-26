import api from './api'

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  getUsers: async () => {
    const response = await api.get('/admin/users')
    return response.data
  },

  updateUserStatus: async (id, status) => {
    const response = await api.put(`/admin/users/${id}/status`, { status })
    return response.data
  },

  getApplications: async () => {
    const response = await api.get('/admin/applications')
    return response.data
  },

  approveApplication: async (id) => {
    const response = await api.put(`/admin/applications/${id}/approve`)
    return response.data
  },

  rejectApplication: async (id, reason) => {
    const response = await api.put(`/admin/applications/${id}/reject`, { reason })
    return response.data
  },

  getGrievances: async () => {
    const response = await api.get('/admin/grievances')
    return response.data
  },

  resolveGrievance: async (id, resolution) => {
    const response = await api.put(`/admin/grievances/${id}/resolve`, { resolution })
    return response.data
  }
}
