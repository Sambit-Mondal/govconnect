-- GovConnect Database Seed Data
-- Sample data for testing and development

-- Insert sample departments
INSERT INTO departments (name, code, description, contact_email, contact_phone) VALUES
('Ministry of Home Affairs', 'MHA', 'Handles internal security, citizenship, and governance', 'contact@mha.gov.in', '1800-XXX-XXXX'),
('Ministry of External Affairs', 'MEA', 'Handles foreign affairs and passport services', 'contact@mea.gov.in', '1800-XXX-XXXX'),
('Ministry of Finance', 'MOF', 'Handles financial matters and taxation', 'contact@mof.gov.in', '1800-XXX-XXXX'),
('Ministry of Health', 'MOH', 'Handles healthcare services and programs', 'contact@moh.gov.in', '1800-XXX-XXXX'),
('Ministry of Education', 'MOE', 'Handles educational policies and programs', 'contact@moe.gov.in', '1800-XXX-XXXX');

-- Insert sample services
INSERT INTO services (name, code, category, description, department_id, processing_time, fee_amount) VALUES
('Passport Application', 'PASSPORT', 'Identity', 'Apply for new passport or renew existing one', 2, 14, 1500.00),
('Aadhar Card', 'AADHAR', 'Identity', 'Get or update your Aadhar card', 1, 7, 0.00),
('PAN Card', 'PAN', 'Identity', 'Apply for Permanent Account Number', 3, 15, 110.00),
('Income Tax Filing', 'ITR', 'Tax', 'File your income tax returns', 3, 1, 0.00),
('GST Registration', 'GST', 'Tax', 'Register for Goods and Services Tax', 3, 7, 0.00),
('Driving License', 'DL', 'Identity', 'Apply for driving license', 1, 21, 500.00),
('Voter ID', 'VOTER', 'Identity', 'Register for voter identification', 1, 30, 0.00);

-- Insert sample schemes
INSERT INTO schemes (name, code, category, description, department_id, min_age, max_income, benefits) VALUES
('Pradhan Mantri Awas Yojana', 'PMAY', 'Housing', 'Housing for all scheme', 1, 18, 1800000.00, 'Subsidized housing loans up to 2.67 lakhs'),
('Ayushman Bharat', 'AB', 'Healthcare', 'Health insurance scheme for poor families', 4, 0, 500000.00, 'Health coverage up to 5 lakhs per family'),
('PM Kisan Samman Nidhi', 'PMKISAN', 'Agriculture', 'Income support for farmers', 3, 18, NULL, '6,000 per year in three installments'),
('Scholarship for Higher Education', 'SHE', 'Education', 'Scholarships for meritorious students', 5, 18, 800000.00, 'Up to 2 lakhs per year for professional courses');

-- Insert sample government offices
INSERT INTO government_offices (name, type, department_id, address, city, state, pincode, contact_phone, working_hours) VALUES
('Passport Seva Kendra', 'passport', 2, '123 Government Complex', 'New Delhi', 'Delhi', '110001', '1800-XXX-XXXX', '9:00 AM - 6:00 PM'),
('Aadhar Enrollment Center', 'aadhar', 1, '456 Municipal Building', 'New Delhi', 'Delhi', '110002', '1800-XXX-XXXX', '9:30 AM - 5:30 PM'),
('Income Tax Office', 'tax', 3, '789 Finance Street', 'New Delhi', 'Delhi', '110003', '1800-XXX-XXXX', '10:00 AM - 5:00 PM'),
('Regional Transport Office', 'transport', 1, '321 Transport Nagar', 'New Delhi', 'Delhi', '110004', '1800-XXX-XXXX', '9:00 AM - 5:00 PM');
