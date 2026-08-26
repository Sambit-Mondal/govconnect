// GovernmentOffice model
/*
CREATE TABLE government_offices (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  department_id INTEGER REFERENCES departments(id),
  address TEXT NOT NULL,
  city VARCHAR(100),
  state VARCHAR(100),
  pincode VARCHAR(10),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  working_hours TEXT,
  services_offered TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

module.exports = {}
