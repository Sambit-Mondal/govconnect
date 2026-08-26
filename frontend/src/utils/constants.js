export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me'
  },
  USERS: {
    PROFILE: '/users/profile',
    APPLICATIONS: '/users/applications'
  },
  APPLICATIONS: {
    LIST: '/applications',
    DETAIL: '/applications/:id'
  },
  DOCUMENTS: {
    LIST: '/documents',
    UPLOAD: '/documents/upload',
    DETAIL: '/documents/:id'
  },
  PAYMENTS: {
    LIST: '/payments',
    DETAIL: '/payments/:id',
    PROCESS: '/payments/:id/process'
  },
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: '/notifications/:id/read',
    MARK_ALL_READ: '/notifications/read-all'
  },
  SCHEMES: {
    LIST: '/schemes',
    DETAIL: '/schemes/:id',
    CHECK_ELIGIBILITY: '/schemes/check-eligibility',
    APPLY: '/schemes/:id/apply'
  },
  GRIEVANCES: {
    LIST: '/grievances',
    DETAIL: '/grievances/:id'
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    APPLICATIONS: '/admin/applications',
    GRIEVANCES: '/admin/grievances'
  }
}

export const USER_ROLES = {
  CITIZEN: 'citizen',
  ADMIN: 'admin',
  OFFICER: 'officer'
}

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress'
}

export const DOCUMENT_TYPES = {
  AADHAR: 'aadhar',
  PAN: 'pan',
  PASSPORT: 'passport',
  DRIVING_LICENSE: 'driving_license',
  VOTER_ID: 'voter_id'
}
