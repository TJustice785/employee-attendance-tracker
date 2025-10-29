const { promisePool } = require('../config/database');

class AttendanceModel {
  // Create new attendance record
  static async create(attendanceData) {
    const { employeeName, employeeID, date, status } = attendanceData;
    const query = `
      INSERT INTO attendance (employeeName, employeeID, date, status)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await promisePool.query(query, [
      employeeName,
      employeeID,
      date,
      status
    ]);
    return result;
  }

  // Get all attendance records
  static async getAll() {
    const query = `
      SELECT * FROM attendance
      ORDER BY date DESC, timestamp DESC
    `;
    const [rows] = await promisePool.query(query);
    return rows;
  }

  // Get attendance by ID
  static async getById(id) {
    const query = 'SELECT * FROM attendance WHERE id = ?';
    const [rows] = await promisePool.query(query, [id]);
    return rows[0];
  }

  // Get attendance by employee ID
  static async getByEmployeeId(employeeID) {
    const query = `
      SELECT * FROM attendance
      WHERE employeeID = ?
      ORDER BY date DESC
    `;
    const [rows] = await promisePool.query(query, [employeeID]);
    return rows;
  }

  // Get attendance by date
  static async getByDate(date) {
    const query = 'SELECT * FROM attendance WHERE date = ? ORDER BY employeeName';
    const [rows] = await promisePool.query(query, [date]);
    return rows;
  }

  // Search by name or ID
  static async search(searchTerm) {
    const query = `
      SELECT * FROM attendance
      WHERE employeeName LIKE ? OR employeeID LIKE ?
      ORDER BY date DESC
    `;
    const searchPattern = `%${searchTerm}%`;
    const [rows] = await promisePool.query(query, [searchPattern, searchPattern]);
    return rows;
  }

  // Update attendance record
  static async update(id, attendanceData) {
    const { employeeName, employeeID, date, status } = attendanceData;
    const query = `
      UPDATE attendance
      SET employeeName = ?, employeeID = ?, date = ?, status = ?
      WHERE id = ?
    `;
    const [result] = await promisePool.query(query, [
      employeeName,
      employeeID,
      date,
      status,
      id
    ]);
    return result;
  }

  // Delete attendance record
  static async delete(id) {
    const query = 'DELETE FROM attendance WHERE id = ?';
    const [result] = await promisePool.query(query, [id]);
    return result;
  }

  // Get statistics
  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN status = 'Absent' THEN 1 ELSE 0 END) as absent
      FROM attendance
    `;
    const [rows] = await promisePool.query(query);
    return rows[0];
  }
}

module.exports = AttendanceModel;
