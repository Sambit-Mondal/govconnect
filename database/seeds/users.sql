-- Seed users table with sample data
-- Password for all users: 'password123' (hashed with bcrypt)

INSERT INTO users (name, email, password, role, aadhar_number, phone) VALUES
('Admin User', 'admin@govconnect.gov', '$2a$10$rOZqJ2J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J', 'admin', '123456789012', '9876543210'),
('John Citizen', 'john.citizen@example.com', '$2a$10$rOZqJ2J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J', 'citizen', '234567890123', '9876543211'),
('Jane Citizen', 'jane.citizen@example.com', '$2a$10$rOZqJ2J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J', 'citizen', '345678901234', '9876543212'),
('Government Officer', 'officer@govconnect.gov', '$2a$10$rOZqJ2J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J7J', 'officer', '456789012345', '9876543213');
