import api from './api'

export const paymentService = {
  getPayments: async () => {
    const response = await api.get('/payments')
    return response.data
  },

  createPayment: async (paymentData) => {
    const response = await api.post('/payments', paymentData)
    return response.data
  },

  getPayment: async (id) => {
    const response = await api.get(`/payments/${id}`)
    return response.data
  },

  processPayment: async (id, paymentDetails) => {
    const response = await api.post(`/payments/${id}/process`, paymentDetails)
    return response.data
  }
}
