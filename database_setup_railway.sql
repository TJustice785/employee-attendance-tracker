-- Use Railway database
USE railway;

-- Drop table if exists to recreate with correct schema
DROP TABLE IF EXISTS attendance;

-- Create attendance table with correct column names matching backend
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeName VARCHAR(255) NOT NULL,
    employeeID VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    status ENUM('Present', 'Absent') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_employeeID (employeeID),
    INDEX idx_date (date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (Lesotho names with realistic mixed attendance)
INSERT INTO attendance (employeeName, employeeID, date, status) VALUES
-- 27 Oct
('Liteboho Mokhachane', 'EMP001', '2024-10-27', 'Present'),
('Mpho Nthabiseng', 'EMP002', '2024-10-27', 'Absent'),
('Teboho Lebesa', 'EMP003', '2024-10-27', 'Present'),
('Masechaba Ramainoane', 'EMP004', '2024-10-27', 'Absent'),
('Khotso Mofokeng', 'EMP005', '2024-10-27', 'Present'),

-- 28 Oct
('Liteboho Mokhachane', 'EMP001', '2024-10-28', 'Absent'),
('Mpho Nthabiseng', 'EMP002', '2024-10-28', 'Present'),
('Teboho Lebesa', 'EMP003', '2024-10-28', 'Present'),
('Masechaba Ramainoane', 'EMP004', '2024-10-28', 'Present'),
('Khotso Mofokeng', 'EMP005', '2024-10-28', 'Absent'),

-- 29 Oct
('Liteboho Mokhachane', 'EMP001', '2024-10-29', 'Present'),
('Mpho Nthabiseng', 'EMP002', '2024-10-29', 'Present'),
('Teboho Lebesa', 'EMP003', '2024-10-29', 'Absent'),
('Masechaba Ramainoane', 'EMP004', '2024-10-29', 'Present'),
('Khotso Mofokeng', 'EMP005', '2024-10-29', 'Absent');
