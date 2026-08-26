// Service model
/*
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(100),
  description TEXT,
  department_id INTEGER REFERENCES departments(id),
  processing_time INTEGER,
  fee_amount DECIMAL(10,2),
  required_documents TEXT[],
  eligibility_criteria TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/

module.exports = {}
