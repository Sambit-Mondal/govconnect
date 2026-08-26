-- Migration: Create login_activities table
-- Created: 2024-01-01

CREATE TABLE IF NOT EXISTS login_activities (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    ip_address VARCHAR(50),
    user_agent TEXT,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    logout_time TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE INDEX IF NOT EXISTS idx_login_activities_user_id ON login_activities(user_id);
