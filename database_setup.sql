-- Create database
CREATE DATABASE IF NOT EXISTS attendance_db;
USE attendance_db;

-- Create attendance table
CREATE TABLE IF NOT EXISTS attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    check_in_time TIME NOT NULL,
    check_out_time TIME,
    status ENUM('Present', 'Absent', 'Late', 'Half Day') DEFAULT 'Present',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_employee_name (employee_name),
    INDEX idx_date (date),
    INDEX idx_status (status)
);

-- Insert sample data
INSERT INTO attendance (employee_name, date, check_in_time, check_out_time, status) VALUES
('John Doe', '2024-10-01', '09:00:00', '17:00:00', 'Present'),
('Jane Smith', '2024-10-01', '09:15:00', '17:00:00', 'Late'),
('Mike Johnson', '2024-10-01', '09:00:00', '17:00:00', 'Present'),
('Sarah Williams', '2024-10-01', NULL, NULL, 'Absent'),
('Tom Brown', '2024-10-01', '09:00:00', '13:00:00', 'Half Day'),
('John Doe', '2024-10-02', '09:00:00', '17:00:00', 'Present'),
('Jane Smith', '2024-10-02', '09:00:00', '17:00:00', 'Present'),
('Mike Johnson', '2024-10-02', '09:30:00', '17:00:00', 'Late'),
('Sarah Williams', '2024-10-02', '09:00:00', '17:00:00', 'Present'),
('Tom Brown', '2024-10-02', NULL, NULL, 'Absent');

-- Display the data
SELECT * FROM attendance;

-- Display statistics
SELECT 
    COUNT(*) as total_records,
    SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present_count,
    SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
    SUM(CASE WHEN status = 'Late' THEN 1 ELSE 0 END) as late_count,
    SUM(CASE WHEN status = 'Half Day' THEN 1 ELSE 0 END) as half_day_count
FROM attendance;
