// User model - using PostgreSQL directly with pg
// This file serves as documentation for the User table structure

/*
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  aadhar_number VARCHAR(12) UNIQUE,
  address TEXT,
  date_of_birth DATE,
  role VARCHAR(50) DEFAULT 'citizen',
  two_factor_enabled BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

module.exports = {
  // User-related queries can be added here if needed
}
