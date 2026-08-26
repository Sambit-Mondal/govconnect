-- GovConnect Database Initialization Script
-- Run this script to create the database schema

-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  aadhar_number VARCHAR(20) UNIQUE,
  address TEXT,
  role VARCHAR(50) DEFAULT 'citizen',
  status VARCHAR(50) DEFAULT 'active',
  two_factor_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  department_id INTEGER REFERENCES departments(id),
  processing_time VARCHAR(100),
  fee VARCHAR(50),
  requirements TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  service_id INTEGER REFERENCES services(id),
  type VARCHAR(100),
  data JSONB,
  status VARCHAR(50) DEFAULT 'pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  approved_at TIMESTAMP,
  rejected_at TIMESTAMP,
  rejection_reason TEXT
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  file_path VARCHAR(500),
  file_size BIGINT,
  mime_type VARCHAR(100),
  description TEXT,
  verification_status VARCHAR(50) DEFAULT 'pending',
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  description TEXT,
  due_date DATE,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  transaction_id VARCHAR(255),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  type VARCHAR(50),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS schemes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  benefits TEXT,
  eligibility_criteria TEXT,
  required_documents TEXT,
  min_age INTEGER,
  max_income DECIMAL(15, 2),
  deadline DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS grievances (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  location TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  resolution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS government_offices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  address TEXT,
  phone VARCHAR(20),
  email VARCHAR(255),
  hours VARCHAR(100),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  rating DECIMAL(3, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS login_activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ip_address VARCHAR(50),
  user_agent TEXT,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(255),
  entity_type VARCHAR(100),
  entity_id INTEGER,
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_consents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  department_id INTEGER REFERENCES departments(id),
  purpose TEXT,
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS user_devices (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  device_name VARCHAR(255),
  device_type VARCHAR(100),
  user_agent TEXT,
  last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_primary BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_grievances_user_id ON grievances(user_id);
CREATE INDEX IF NOT EXISTS idx_login_activities_user_id ON login_activities(user_id);

-- Insert sample data
INSERT INTO departments (name, description, contact_email, contact_phone) VALUES
('Revenue Department', 'Handles tax collection and revenue management', 'revenue@govconnect.gov', '1800-XXX-XXXX'),
('Transport Department', 'Manages vehicle registration and driving licenses', 'transport@govconnect.gov', '1800-XXX-XXXX'),
('Municipal Corporation', 'Urban development and civic services', 'municipal@govconnect.gov', '1800-XXX-XXXX'),
('Health Department', 'Public health and medical services', 'health@govconnect.gov', '1800-XXX-XXXX'),
('Education Department', 'Educational services and scholarships', 'education@govconnect.gov', '1800-XXX-XXXX'),
('Agriculture Department', 'Agricultural services and farmer support', 'agriculture@govconnect.gov', '1800-XXX-XXXX');

INSERT INTO services (name, description, department_id, processing_time, fee, requirements) VALUES
('Passport Application', 'Apply for new passport or renew existing one', 1, '14 days', '₹1,500', 'Aadhar card, Address proof, Photographs'),
('Driving License', 'Apply for driving license or renewal', 2, '7 days', '₹500', 'Aadhar card, Address proof, Medical certificate'),
('Property Tax', 'Pay property tax online', 3, '1 day', 'Variable', 'Property ID, Ownership proof'),
('Birth Certificate', 'Get birth certificate', 4, '5 days', '₹50', 'Birth proof, Parent ID proof'),
('Death Certificate', 'Get death certificate', 4, '5 days', '₹50', 'Death proof, Applicant ID proof'),
('Business Registration', 'Register new business', 1, '10 days', '₹5,000', 'PAN card, Address proof, Business plan'),
('Land Records', 'View and manage land records', 3, '2 days', '₹100', 'Property details, Ownership documents'),
('Scholarship Application', 'Apply for educational scholarships', 5, '30 days', 'Free', 'Mark sheets, Income certificate, Aadhar card'),
('Crop Insurance', 'Apply for crop insurance scheme', 6, '7 days', 'Variable', 'Land documents, Crop details, Aadhar card'),
('GST Registration', 'Register for GST', 1, '7 days', 'Free', 'PAN card, Business address, Bank details');

INSERT INTO schemes (name, description, benefits, eligibility_criteria, required_documents, min_age, max_income, deadline) VALUES
('PM Scholarship Scheme', 'Financial assistance for meritorious students', 'Up to ₹2,00,000 per year', 'Students from economically weaker sections with minimum 60% marks', 'Income Certificate, Mark Sheets, Aadhar Card, Bank Account, School Certificate', 18, 300000, '2024-06-30'),
('Startup India Scheme', 'Support for startups with tax benefits', 'Tax exemption for 3 years, funding support', 'Registered startups with innovative ideas', 'Business Registration, PAN Card, Aadhar Card, Business Plan, Pitch Deck', 18, 1000000, '2024-12-31'),
('Housing for All Scheme', 'Affordable housing for economically weaker sections', 'Subsidized housing loans up to ₹2.5 lakh', 'Income below ₹8 lakh, no own house', 'Income Certificate, Aadhar Card, Address Proof, Bank Statement', 18, 800000, '2024-09-30'),
('PM Kisan Samman', 'Financial support for farmers', '₹6,000 per year in three installments', 'Small and marginal farmers', 'Aadhar Card, Land Records, Bank Account, Mobile Number', 18, 200000, '2024-12-31'),
('Health Insurance Scheme', 'Health coverage for economically weaker sections', 'Up to ₹5 lakh health coverage', 'Annual income below ₹5 lakh', 'Income Certificate, Aadhar Card, Bank Account, Photographs', 0, 500000, '2024-10-31'),
('Skill Development Scheme', 'Free skill training for unemployed youth', 'Free training + stipend', 'Unemployed youth aged 18-35', 'Aadhar Card, Educational Certificates, Photographs', 18, 300000, '2024-11-30');

INSERT INTO government_offices (name, type, address, phone, email, hours, latitude, longitude, rating) VALUES
('Regional Transport Office', 'rto', '123 Transport Nagar, New Delhi', '1800-XXX-XXXX', 'rto.delhi@govconnect.gov', '9:00 AM - 5:00 PM', 28.6139, 77.2090, 4.2),
('Government Hospital', 'hospital', '456 Health Street, New Delhi', '1800-XXX-XXXX', 'hospital.delhi@govconnect.gov', '24/7 Emergency', 28.6128, 77.2300, 4.5),
('Police Station', 'police', '789 Safety Avenue, New Delhi', '100', 'police.delhi@govconnect.gov', '24/7', 28.6140, 77.2100, 4.0),
('Passport Seva Kendra', 'passport', '321 Passport Road, New Delhi', '1800-XXX-XXXX', 'passport.delhi@govconnect.gov', '9:30 AM - 5:30 PM', 28.6150, 77.2200, 4.3),
('Municipal Office', 'service', '654 Civic Center, New Delhi', '1800-XXX-XXXX', 'municipal.delhi@govconnect.gov', '9:00 AM - 6:00 PM', 28.6160, 77.2150, 3.9),
('Revenue Office', 'service', '987 Tax Street, New Delhi', '1800-XXX-XXXX', 'revenue.delhi@govconnect.gov', '10:00 AM - 5:00 PM', 28.6170, 77.2250, 4.1),
('Education Department Office', 'service', '147 Education Lane, New Delhi', '1800-XXX-XXXX', 'education.delhi@govconnect.gov', '9:00 AM - 5:00 PM', 28.6180, 77.2350, 4.0),
('Agriculture Office', 'service', '258 Farm Road, New Delhi', '1800-XXX-XXXX', 'agriculture.delhi@govconnect.gov', '10:00 AM - 4:00 PM', 28.6190, 77.2400, 3.8);

-- Insert sample users (password is 'password123' - use: bcrypt.hash('password123', 10) to generate)
INSERT INTO users (name, email, password, phone, aadhar_number, address, role) VALUES
('John Doe', 'john.doe@example.com', '$2a$10$YourActualBcryptHashHere', '+91 98765 43210', '1234-5678-9012', '123 Main Street, New Delhi', 'citizen'),
('Jane Smith', 'jane.smith@example.com', '$2a$10$YourActualBcryptHashHere', '+91 98765 43211', '2345-6789-0123', '456 Oak Avenue, New Delhi', 'citizen'),
('Admin User', 'admin@govconnect.gov', '$2a$10$YourActualBcryptHashHere', '+91 98765 43212', '3456-7890-1234', '789 Admin Road, New Delhi', 'admin');

-- Insert sample applications
INSERT INTO applications (user_id, service_id, type, data, status) VALUES
(1, 1, 'passport', '{"purpose": "Tourism", "destination": "USA"}', 'in_progress'),
(1, 2, 'driving_license', '{"vehicle_type": "LMV", "purpose": "Personal"}', 'approved'),
(2, 3, 'property_tax', '{"property_id": "DEL-12345", "amount": 5000}', 'pending'),
(2, 8, 'scholarship', '{"course": "B.Tech", "college": "IIT Delhi"}', 'in_progress');

-- Insert sample documents
INSERT INTO documents (user_id, name, type, file_path, file_size, mime_type, verification_status) VALUES
(1, 'Aadhar Card', 'Identity', 'aadhar_john.pdf', 2500000, 'application/pdf', 'verified'),
(1, 'PAN Card', 'Identity', 'pan_john.pdf', 1200000, 'application/pdf', 'verified'),
(1, 'Passport', 'Identity', 'passport_john.pdf', 3800000, 'application/pdf', 'pending'),
(2, 'Aadhar Card', 'Identity', 'aadhar_jane.pdf', 2500000, 'application/pdf', 'verified'),
(2, 'Address Proof', 'Address', 'address_jane.pdf', 800000, 'application/pdf', 'verified');

-- Insert sample payments
INSERT INTO payments (user_id, amount, description, due_date, status) VALUES
(1, 1500, 'Passport Application Fee', '2024-03-31', 'paid'),
(1, 500, 'Driving License Fee', '2024-02-15', 'paid'),
(2, 5000, 'Property Tax 2024', '2024-03-31', 'pending'),
(2, 1200, 'Water Bill', '2024-02-10', 'paid');

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, description, is_read) VALUES
(1, 'application', 'Passport application approved', 'Your passport application has been approved and is ready for collection', false),
(1, 'payment', 'Payment due reminder', 'Property tax payment of ₹5,000 is due in 3 days', false),
(1, 'document', 'Document verified', 'Your Aadhar card has been successfully verified', true),
(2, 'scheme', 'New scheme available', 'You may be eligible for the new PM Scholarship Scheme', true),
(2, 'alert', 'System maintenance', 'Scheduled maintenance on Sunday 2AM-4AM', true);

-- Insert sample grievances
INSERT INTO grievances (user_id, title, category, description, location, status) VALUES
(1, 'Road maintenance issue', 'Infrastructure', 'Potholes on Main Street need immediate repair', 'Main Street, New Delhi', 'in_progress'),
(2, 'Water supply problem', 'Utilities', 'Irregular water supply in the area', 'Oak Avenue, New Delhi', 'resolved');

-- Insert sample user consents
INSERT INTO user_consents (user_id, department_id, purpose, expires_at) VALUES
(1, 1, 'Tax Filing', '2024-12-31'),
(1, 2, 'License Verification', '2024-06-30'),
(2, 3, 'Property Tax Assessment', '2024-03-31');

-- Insert sample user devices
INSERT INTO user_devices (user_id, device_name, device_type, user_agent, is_primary) VALUES
(1, 'Windows PC', 'desktop', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0', true),
(1, 'iPhone 13', 'mobile', 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) Safari/605.1.15', false),
(2, 'MacBook Pro', 'desktop', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15', true);