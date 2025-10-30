import axios from 'axios';

// API URL - ALWAYS use Railway production backend
// Force correct URL even if REACT_APP_API_URL is not set
const API_URL = process.env.REACT_APP_API_URL || 'https://observant-enthusiasm-production.up.railway.app/api';

// Log API URL for debugging (Build timestamp: 2025-10-30 08:19)
console.log('🔗 API URL:', API_URL);
console.log('🌍 Environment:', process.env.NODE_ENV);
console.log('✅ Using Railway Backend');

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
