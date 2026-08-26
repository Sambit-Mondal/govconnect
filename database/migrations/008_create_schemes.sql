-- Migration: Create schemes table
-- Created: 2024-01-01

CREATE TABLE IF NOT EXISTS schemes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    category VARCHAR(100),
    description TEXT,
    department_id INTEGER REFERENCES departments(id),
    min_age INTEGER,
    max_income DECIMAL(15,2),
    eligibility_criteria TEXT,
    benefits TEXT,
    application_process TEXT,
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
