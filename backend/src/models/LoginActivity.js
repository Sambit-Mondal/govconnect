// LoginActivity model
/*
CREATE TABLE login_activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ip_address VARCHAR(50),
  user_agent TEXT,
  login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  logout_time TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active'
);
*/

module.exports = {}
