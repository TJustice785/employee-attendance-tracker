const express = require('express');
const router = express.Router();
const AttendanceController = require('../controllers/attendanceController');

// Statistics route (must be before :id route)
router.get('/stats', AttendanceController.getStats);

// Search route
router.get('/search', AttendanceController.searchAttendance);

// CRUD operations
router.post('/', AttendanceController.createAttendance);
router.get('/', AttendanceController.getAllAttendance);
router.get('/:id', AttendanceController.getAttendanceById);
router.put('/:id', AttendanceController.updateAttendance);
router.delete('/:id', AttendanceController.deleteAttendance);

// Filter routes
router.get('/employee/:employeeId', AttendanceController.getAttendanceByEmployeeId);
router.get('/date/:date', AttendanceController.getAttendanceByDate);

module.exports = router;
