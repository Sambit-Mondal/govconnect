# GovConnect Database Design

## Overview
GovConnect uses PostgreSQL as its primary database. The database schema is designed to support a comprehensive government services platform.

## Tables

### 1. Users
Stores user account information and authentication data.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `email` (VARCHAR(255) UNIQUE)
- `password` (VARCHAR(255))
- `phone` (VARCHAR(20))
- `aadhar_number` (VARCHAR(12) UNIQUE)
- `address` (TEXT)
- `date_of_birth` (DATE)
- `role` (VARCHAR(50)) - 'citizen', 'admin', 'officer'
- `two_factor_enabled` (BOOLEAN)
- `status` (VARCHAR(50)) - 'active', 'inactive', 'suspended'
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 2. Departments
Stores information about government departments.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `code` (VARCHAR(50) UNIQUE)
- `description` (TEXT)
- `head_office_address` (TEXT)
- `contact_email` (VARCHAR(255))
- `contact_phone` (VARCHAR(20))
- `website` (VARCHAR(255))
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)

### 3. Services
Stores available government services.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `code` (VARCHAR(50) UNIQUE)
- `category` (VARCHAR(100))
- `description` (TEXT)
- `department_id` (INTEGER REFERENCES departments)
- `processing_time` (INTEGER) - in days
- `fee_amount` (DECIMAL(10,2))
- `required_documents` (TEXT[])
- `eligibility_criteria` (TEXT)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)

### 4. Applications
Stores user applications for services.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `service_id` (INTEGER REFERENCES services)
- `type` (VARCHAR(100))
- `data` (JSONB)
- `status` (VARCHAR(50)) - 'pending', 'approved', 'rejected', 'in_progress'
- `submission_date` (TIMESTAMP)
- `approved_at` (TIMESTAMP)
- `rejected_at` (TIMESTAMP)
- `rejection_reason` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 5. Documents
Stores user-uploaded documents.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `name` (VARCHAR(255))
- `type` (VARCHAR(100))
- `file_path` (VARCHAR(500))
- `file_size` (BIGINT)
- `mime_type` (VARCHAR(100))
- `description` (TEXT)
- `verification_status` (VARCHAR(50)) - 'pending', 'verified', 'rejected'
- `uploaded_at` (TIMESTAMP)

### 6. Payments
Stores payment information.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `application_id` (INTEGER REFERENCES applications)
- `amount` (DECIMAL(10,2))
- `description` (TEXT)
- `due_date` (DATE)
- `status` (VARCHAR(50)) - 'pending', 'paid', 'failed'
- `payment_method` (VARCHAR(100))
- `transaction_id` (VARCHAR(255))
- `paid_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)

### 7. Notifications
Stores user notifications.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `type` (VARCHAR(50))
- `title` (VARCHAR(255))
- `message` (TEXT)
- `is_read` (BOOLEAN)
- `created_at` (TIMESTAMP)

### 8. Schemes
Stores government welfare schemes.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `code` (VARCHAR(50) UNIQUE)
- `category` (VARCHAR(100))
- `description` (TEXT)
- `department_id` (INTEGER REFERENCES departments)
- `min_age` (INTEGER)
- `max_income` (DECIMAL(15,2))
- `eligibility_criteria` (TEXT)
- `benefits` (TEXT)
- `application_process` (TEXT)
- `start_date` (DATE)
- `end_date` (DATE)
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)

### 9. Grievances
Stores user grievances and complaints.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `title` (VARCHAR(255))
- `category` (VARCHAR(100))
- `description` (TEXT)
- `location` (TEXT)
- `status` (VARCHAR(50)) - 'pending', 'in_progress', 'resolved', 'closed'
- `priority` (VARCHAR(50)) - 'low', 'normal', 'high', 'urgent'
- `assigned_to` (INTEGER REFERENCES users)
- `resolution` (TEXT)
- `resolved_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### 10. Government Offices
Stores information about government offices.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255))
- `type` (VARCHAR(100))
- `department_id` (INTEGER REFERENCES departments)
- `address` (TEXT)
- `city` (VARCHAR(100))
- `state` (VARCHAR(100))
- `pincode` (VARCHAR(10))
- `latitude` (DECIMAL(10,8))
- `longitude` (DECIMAL(11,8))
- `contact_phone` (VARCHAR(20))
- `contact_email` (VARCHAR(255))
- `working_hours` (TEXT)
- `services_offered` (TEXT[])
- `is_active` (BOOLEAN)
- `created_at` (TIMESTAMP)

### 11. Login Activities
Stores user login session information.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `ip_address` (VARCHAR(50))
- `user_agent` (TEXT)
- `login_time` (TIMESTAMP)
- `logout_time` (TIMESTAMP)
- `status` (VARCHAR(50)) - 'active', 'expired', 'logged_out'

### 12. Audit Logs
Stores audit trail for security and compliance.

**Columns:**
- `id` (SERIAL PRIMARY KEY)
- `user_id` (INTEGER REFERENCES users)
- `action` (VARCHAR(100))
- `entity_type` (VARCHAR(100))
- `entity_id` (INTEGER)
- `old_values` (JSONB)
- `new_values` (JSONB)
- `ip_address` (VARCHAR(50))
- `user_agent` (TEXT)
- `created_at` (TIMESTAMP)

## Indexes
Indexes are created on frequently queried columns to improve performance:
- `users.email`, `users.aadhar_number`
- `applications.user_id`, `applications.status`
- `documents.user_id`
- `payments.user_id`
- `notifications.user_id`
- `grievances.user_id`, `grievances.status`
- `login_activities.user_id`
- `audit_logs.user_id`

## Relationships
- Users → Applications (One-to-Many)
- Users → Documents (One-to-Many)
- Users → Payments (One-to-Many)
- Users → Notifications (One-to-Many)
- Users → Grievances (One-to-Many)
- Departments → Services (One-to-Many)
- Services → Applications (One-to-Many)
- Applications → Payments (One-to-Many, Optional)
