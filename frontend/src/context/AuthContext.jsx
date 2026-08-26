import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await authService.getCurrentUser()
        setUser(response.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('token')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await authService.login(email, password)
    localStorage.setItem('token', response.token)
    setUser(response.user)
    return response
  }

  const register = async (userData) => {
    const response = await authService.register(userData)
    localStorage.setItem('token', response.token)
    setUser(response.user)
    return response
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      localStorage.removeItem('token')
      setUser(null)
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
