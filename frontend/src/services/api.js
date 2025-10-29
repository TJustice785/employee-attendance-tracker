import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attendance API calls
export const attendanceAPI = {
  // Get all attendance records
  getAll: async () => {
    const response = await api.get('/attendance');
    return response.data;
  },

  // Get attendance by ID
  getById: async (id) => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
  },

  // Create new attendance record
  create: async (data) => {
    const response = await api.post('/attendance', data);
    return response.data;
  },

  // Update attendance record
  update: async (id, data) => {
    const response = await api.put(`/attendance/${id}`, data);
    return response.data;
  },

  // Delete attendance record
  delete: async (id) => {
    const response = await api.delete(`/attendance/${id}`);
    return response.data;
  },

  // Get statistics
  getStats: async () => {
    const response = await api.get('/attendance/stats');
    return response.data;
  },

  // Search by employee name
  searchByEmployee: async (name) => {
    const response = await api.get(`/attendance/search?q=${name}`);
    return response.data;
  },

  // Filter by date range
  filterByDateRange: async (startDate, endDate) => {
    const response = await api.get(`/attendance/filter?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },
};

export default api;
