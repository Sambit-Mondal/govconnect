# GovConnect - Setup Instructions

## Project Overview

GovConnect is a unified digital government services platform that provides citizens with a single interface to access various government services, schemes, and departments.

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.14.0
- Vite 4.4.5
- Axios 1.4.0
- Recharts 2.7.0
- Lucide React 0.263.0

### Backend
- Node.js
- Express 4.18.2
- PostgreSQL
- JWT Authentication
- Multer for file uploads
- Winston for logging

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SIH_2026-master
```

### 2. Install Dependencies

```bash
npm run install:all
```

This will install dependencies for both frontend and backend.

### 3. Database Setup

#### Create PostgreSQL Database

```sql
CREATE DATABASE govconnect;
```

#### Run Initialization Script

```bash
psql -U postgres -d govconnect -f database/init.sql
```

Or run the script manually in your PostgreSQL client.

### 4. Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=govconnect
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key_change_this
JWT_EXPIRES_IN=7d
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Application

#### Development Mode (Both Frontend and Backend)

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

#### Individual Services

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd frontend
npm run dev
```

#### Production Build

```bash
# Build Frontend
npm run build

# Start Backend in Production
npm start
```

## Features

### Citizen Features
1. **Landing Page** - Government services overview and navigation
2. **Login/SSO** - Secure authentication with multiple options
3. **Citizen Dashboard** - Overview of applications, notifications, and quick actions
4. **Notifications Center** - Categorized notifications and alerts
5. **AI GovAssist** - AI-powered chatbot for government service assistance
6. **Smart Service Finder** - Intelligent service recommendation system
7. **Document Vault** - Secure document storage and management
8. **Payments Dashboard** - Track and manage government service payments
9. **Nearby Government Services** - Find nearby government offices with map integration
10. **Citizen Profile** - Manage personal information and preferences
11. **Scheme Eligibility Checker** - Check eligibility for government schemes
12. **Grievance & Feedback** - File grievances and provide feedback
13. **Security & Privacy Center** - Manage account security and privacy settings

### Admin Features
1. **Admin Dashboard** - Monitor system health and user activities
2. **User Management** - Manage citizen accounts
3. **Application Management** - Review and process applications
4. **Grievance Handling** - Address citizen grievances
5. **System Analytics** - View usage statistics and reports

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Applications
- `GET /api/applications` - Get user applications
- `GET /api/applications/:id` - Get specific application
- `POST /api/applications` - Create application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Documents
- `GET /api/documents` - Get user documents
- `POST /api/documents` - Upload document
- `GET /api/documents/:id` - Get specific document
- `DELETE /api/documents/:id` - Delete document
- `GET /api/documents/:id/download` - Download document

### Payments
- `GET /api/payments` - Get user payments
- `POST /api/payments` - Create payment
- `GET /api/payments/:id` - Get specific payment
- `POST /api/payments/:id/process` - Process payment

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Schemes
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/:id` - Get specific scheme
- `POST /api/schemes/check-eligibility` - Check scheme eligibility
- `POST /api/schemes/:id/apply` - Apply for scheme

### Grievances
- `GET /api/grievances` - Get user grievances
- `GET /api/grievances/:id` - Get specific grievance
- `POST /api/grievances` - Create grievance
- `PUT /api/grievances/:id` - Update grievance

### Location Services
- `GET /api/location/offices` - Get nearby government offices
- `GET /api/location/offices/:id` - Get specific office

### Security
- `GET /api/security/login-activity` - Get login activity
- `GET /api/security/devices` - Get active devices
- `DELETE /api/security/devices/:id` - Revoke device
- `GET /api/security/consents` - Get data consents
- `DELETE /api/security/consents/:id` - Revoke consent

### Admin
- `GET /api/admin/stats` - Get admin statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/applications` - Get all applications
- `GET /api/admin/grievances` - Get all grievances
- `PUT /api/admin/applications/:id/approve` - Approve application
- `PUT /api/admin/applications/:id/reject` - Reject application

## Database Schema

The database includes the following tables:
- `users` - User accounts
- `departments` - Government departments
- `services` - Available government services
- `applications` - User applications for services
- `documents` - User uploaded documents
- `payments` - Payment records
- `notifications` - User notifications
- `schemes` - Government schemes
- `grievances` - User grievances
- `government_offices` - Government office locations
- `login_activities` - Login activity logs
- `audit_logs` - System audit logs

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers
- Input validation with express-validator
- Secure file upload handling

## Development Notes

### Frontend Structure
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── context/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API service calls
│   └── utils/         # Utility functions
```

### Backend Structure
```
backend/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Express middleware
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Check database credentials in `.env` file
- Verify database exists and is accessible

### CORS Errors
- Check backend CORS configuration
- Ensure frontend API URL is correct

### Authentication Issues
- Clear browser localStorage
- Check JWT secret in backend `.env`
- Verify token expiration settings

## License

MIT License

## Support

For support and queries, contact:
- Email: support@govconnect.gov
- Helpline: 1800-XXX-XXXX