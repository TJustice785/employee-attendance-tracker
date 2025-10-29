-- ====================================
-- Employee Attendance Tracker Database
-- ====================================

-- Create database
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Drop existing table (optional - for fresh start)
-- DROP TABLE IF EXISTS attendance;

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employeeName VARCHAR(255) NOT NULL,
  employeeID VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  status ENUM('Present', 'Absent') NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Indexes for better query performance
  INDEX idx_employeeID (employeeID),
  INDEX idx_date (date),
  INDEX idx_status (status),
  INDEX idx_employee_date (employeeID, date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data (optional)
INSERT INTO attendance (employeeName, employeeID, date, status) VALUES
('John Doe', 'EMP001', '2025-10-29', 'Present'),
('Jane Smith', 'EMP002', '2025-10-29', 'Present'),
('Mike Johnson', 'EMP003', '2025-10-29', 'Absent'),
('Sarah Williams', 'EMP004', '2025-10-28', 'Present'),
('David Brown', 'EMP005', '2025-10-28', 'Present'),
('Emily Davis', 'EMP006', '2025-10-28', 'Absent'),
('Chris Wilson', 'EMP007', '2025-10-27', 'Present'),
('Lisa Anderson', 'EMP008', '2025-10-27', 'Present');

-- Useful queries for testing

-- 1. View all records
SELECT * FROM attendance ORDER BY date DESC, timestamp DESC;

-- 2. Get statistics
SELECT 
  COUNT(*) as total_records,
  SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_count,
  SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
  ROUND(SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as attendance_percentage
FROM attendance;

-- 3. Get attendance by date
SELECT * FROM attendance WHERE date = '2025-10-29' ORDER BY employeeName;

-- 4. Get attendance by employee
SELECT * FROM attendance WHERE employeeID = 'EMP001' ORDER BY date DESC;

-- 5. Search by name or ID
SELECT * FROM attendance 
WHERE employeeName LIKE '%John%' OR employeeID LIKE '%001%'
ORDER BY date DESC;

-- 6. Daily attendance summary
SELECT 
  date,
  COUNT(*) as total,
  SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present,
  SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent
FROM attendance
GROUP BY date
ORDER BY date DESC;

-- 7. Employee attendance summary
SELECT 
  employeeID,
  employeeName,
  COUNT(*) as total_days,
  SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_days,
  SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent_days,
  ROUND(SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as attendance_rate
FROM attendance
GROUP BY employeeID, employeeName
ORDER BY attendance_rate DESC;

-- Grant permissions (if needed)
-- GRANT ALL PRIVILEGES ON attendance_db.* TO 'your_user'@'localhost';
-- FLUSH PRIVILEGES;