-- Seed schemes table with sample data

INSERT INTO schemes (name, code, category, description, department_id, min_age, max_income, benefits) VALUES
('Pradhan Mantri Awas Yojana', 'PMAY', 'Housing', 'Housing for all scheme', 1, 18, 1800000.00, 'Subsidized housing loans up to 2.67 lakhs'),
('Ayushman Bharat', 'AB', 'Healthcare', 'Health insurance scheme for poor families', 4, 0, 500000.00, 'Health coverage up to 5 lakhs per family'),
('PM Kisan Samman Nidhi', 'PMKISAN', 'Agriculture', 'Income support for farmers', 6, 18, NULL, '6,000 per year in three installments'),
('Scholarship for Higher Education', 'SHE', 'Education', 'Scholarships for meritorious students', 5, 18, 800000.00, 'Up to 2 lakhs per year for professional courses'),
('National Pension Scheme', 'NPS', 'Finance', 'Pension scheme for citizens', 3, 18, NULL, 'Regular pension after retirement'),
('Pradhan Mantri Mudra Yojana', 'PMMY', 'Finance', 'Loans for small businesses', 3, 18, 1500000.00, 'Loans up to 10 lakhs for micro enterprises');
