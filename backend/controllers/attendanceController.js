const AttendanceModel = require('../models/attendanceModel');

class AttendanceController {
  // Create new attendance record
  static async createAttendance(req, res, next) {
    try {
      const { employeeName, employeeID, date, status } = req.body;

      // Validation
      if (!employeeName || !employeeID || !date || !status) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      if (!['Present', 'Absent'].includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Status must be either Present or Absent'
        });
      }

      const result = await AttendanceModel.create(req.body);

      res.status(201).json({
        success: true,
        message: 'Attendance recorded successfully',
        data: {
          id: result.insertId,
          ...req.body
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // Get all attendance records
  static async getAllAttendance(req, res, next) {
    try {
      const records = await AttendanceModel.getAll();

      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  // Get attendance by ID
  static async getAttendanceById(req, res, next) {
    try {
      const { id } = req.params;
      const record = await AttendanceModel.getById(id);

      if (!record) {
        return res.status(404).json({
          success: false,
          message: 'Attendance record not found'
        });
      }

      res.status(200).json({
        success: true,
        data: record
      });
    } catch (error) {
      next(error);
    }
  }

  // Get attendance by employee ID
  static async getAttendanceByEmployeeId(req, res, next) {
    try {
      const { employeeId } = req.params;
      const records = await AttendanceModel.getByEmployeeId(employeeId);

      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  // Get attendance by date
  static async getAttendanceByDate(req, res, next) {
    try {
      const { date } = req.params;
      const records = await AttendanceModel.getByDate(date);

      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  // Search attendance
  static async searchAttendance(req, res, next) {
    try {
      const { q } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }

      const records = await AttendanceModel.search(q);

      res.status(200).json({
        success: true,
        count: records.length,
        data: records
      });
    } catch (error) {
      next(error);
    }
  }

  // Update attendance record
  static async updateAttendance(req, res, next) {
    try {
      const { id } = req.params;
      const { employeeName, employeeID, date, status } = req.body;

      // Validation
      if (!employeeName || !employeeID || !date || !status) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required'
        });
      }

      const result = await AttendanceModel.update(id, req.body);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Attendance record not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Attendance updated successfully',
        data: { id, ...req.body }
      });
    } catch (error) {
      next(error);
    }
  }

  // Delete attendance record
  static async deleteAttendance(req, res, next) {
    try {
      const { id } = req.params;
      const result = await AttendanceModel.delete(id);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: 'Attendance record not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Attendance record deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  // Get statistics
  static async getStats(req, res, next) {
    try {
      const stats = await AttendanceModel.getStats();

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AttendanceController;
