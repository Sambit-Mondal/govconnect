-- Seed services table with sample data

INSERT INTO services (name, code, category, description, department_id, processing_time, fee_amount) VALUES
('Passport Application', 'PASSPORT', 'Identity', 'Apply for new passport or renew existing one', 2, 14, 1500.00),
('Aadhar Card', 'AADHAR', 'Identity', 'Get or update your Aadhar card', 1, 7, 0.00),
('PAN Card', 'PAN', 'Identity', 'Apply for Permanent Account Number', 3, 15, 110.00),
('Income Tax Filing', 'ITR', 'Tax', 'File your income tax returns', 3, 1, 0.00),
('GST Registration', 'GST', 'Tax', 'Register for Goods and Services Tax', 3, 7, 0.00),
('Driving License', 'DL', 'Identity', 'Apply for driving license', 1, 21, 500.00),
('Voter ID', 'VOTER', 'Identity', 'Register for voter identification', 1, 30, 0.00),
('Birth Certificate', 'BIRTH', 'Identity', 'Get birth certificate', 1, 7, 20.00),
('Death Certificate', 'DEATH', 'Identity', 'Get death certificate', 1, 7, 20.00),
('Property Registration', 'PROPERTY', 'Legal', 'Register property documents', 1, 15, 1000.00);
