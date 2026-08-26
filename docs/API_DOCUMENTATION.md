# GovConnect API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "aadharNumber": "123456789012"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Users

#### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "address": "123 Main Street"
}
```

### Applications

#### Get Applications
```http
GET /applications
Authorization: Bearer <token>
```

#### Create Application
```http
POST /applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "service_id": 1,
  "type": "passport",
  "data": {
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

### Documents

#### Get Documents
```http
GET /documents
Authorization: Bearer <token>
```

#### Upload Document
```http
POST /documents/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

document: <file>
type: "aadhar"
description: "My Aadhar card"
```

### Payments

#### Get Payments
```http
GET /payments
Authorization: Bearer <token>
```

#### Create Payment
```http
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 1500.00,
  "description": "Passport fee",
  "due_date": "2024-03-31"
}
```

### Schemes

#### Get Schemes
```http
GET /schemes
```

#### Check Eligibility
```http
POST /schemes/check-eligibility
Authorization: Bearer <token>
Content-Type: application/json

{
  "age": 25,
  "income": 500000,
  "state": "delhi",
  "category": "general"
}
```

### Grievances

#### Get Grievances
```http
GET /grievances
Authorization: Bearer <token>
```

#### Create Grievance
```http
POST /grievances
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Road maintenance issue",
  "category": "Infrastructure",
  "description": "The road in my area needs repair",
  "location": "Main Street, Delhi"
}
```

### Admin Endpoints

#### Get Dashboard Stats
```http
GET /admin/dashboard
Authorization: Bearer <admin_token>
```

#### Get Users
```http
GET /admin/users
Authorization: Bearer <admin_token>
```

#### Approve Application
```http
PUT /admin/applications/:id/approve
Authorization: Bearer <admin_token>
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation Error",
  "details": "Email is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Authentication required"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Something went wrong"
}
```
