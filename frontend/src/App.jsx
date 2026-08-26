import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages
import LandingPage from './pages/Landing/LandingPage'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import CitizenDashboard from './pages/Dashboard/CitizenDashboard'
import Notifications from './pages/Notifications/Notifications'
import GovAssist from './pages/GovAssist/GovAssist'
import ServiceFinder from './pages/ServiceFinder/ServiceFinder'
import DocumentVault from './pages/Documents/DocumentVault'
import PaymentsDashboard from './pages/Payments/PaymentsDashboard'
import NearbyServices from './pages/NearbyServices/NearbyServices'
import CitizenProfile from './pages/Profile/CitizenProfile'
import EligibilityChecker from './pages/Eligibility/EligibilityChecker'
import GrievanceFeedback from './pages/Grievances/GrievanceFeedback'
import SecurityPrivacy from './pages/Security/SecurityPrivacy'
import AdminDashboard from './pages/Admin/AdminDashboard'

// Component to conditionally render footer
const AppContent = () => {
  const location = useLocation()
  const noFooterRoutes = ['/dashboard', '/notifications', '/gov-assist', '/services', '/documents', '/payments', '/nearby', '/profile', '/eligibility', '/grievances', '/security', '/admin']
  const showFooter = !noFooterRoutes.includes(location.pathname)

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<CitizenDashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/gov-assist" element={<GovAssist />} />
            <Route path="/services" element={<ServiceFinder />} />
            <Route path="/documents" element={<DocumentVault />} />
            <Route path="/payments" element={<PaymentsDashboard />} />
            <Route path="/nearby" element={<NearbyServices />} />
            <Route path="/profile" element={<CitizenProfile />} />
            <Route path="/eligibility" element={<EligibilityChecker />} />
            <Route path="/grievances" element={<GrievanceFeedback />} />
            <Route path="/security" element={<SecurityPrivacy />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
