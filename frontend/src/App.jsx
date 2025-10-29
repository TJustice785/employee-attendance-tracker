import React, { useState, useEffect } from 'react';
import { Users, BarChart3, Calendar, FileText } from 'lucide-react';
import AttendanceForm from './components/AttendanceForm';
import AttendanceDashboard from './components/AttendanceDashboard';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { attendanceAPI } from './services/api';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [notification, setNotification] = useState({ 
    show: false, 
    message: '', 
    type: '' 
  });
  const [loading, setLoading] = useState(false);

  // Fetch attendance records on component mount
  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Fetch all attendance records
  const fetchAttendanceRecords = async () => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getAll();
      setAttendanceRecords(response.data.data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
      showNotification('Failed to fetch attendance records', 'error');
      setAttendanceRecords([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await attendanceAPI.create(formData);
      showNotification('Attendance recorded successfully!', 'success');
      await fetchAttendanceRecords();
      setActiveTab('dashboard');
    } catch (error) {
      console.error('Error creating record:', error);
      const errorMessage = error.response?.data?.message || 'Failed to record attendance';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle delete record
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await attendanceAPI.delete(id);
      showNotification('Record deleted successfully', 'success');
      await fetchAttendanceRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete record';
      showNotification(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Filter records based on search and date
  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = 
      record.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeID?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || record.date === dateFilter;
    
    return matchesSearch && matchesDate;
  });

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative"
      style={{
        backgroundImage: 'url(/Background.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background Overlay for Readability */}
      <div 
        className="absolute inset-0 bg-white bg-opacity-20"
        style={{ zIndex: 0 }}
      ></div>

      {/* Content Wrapper */}
      <div className="relative" style={{ zIndex: 1 }}>
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500' 
            : 'bg-red-500'
        } text-white animate-slide-in`}>
          <div className="flex items-center space-x-2">
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-700 font-medium">Processing...</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Employee Attendance
                  </h1>
                  <p className="text-sm text-gray-500">
                    Track and manage daily attendance
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'dashboard'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FileText size={18} />
                  Records
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <BarChart3 size={18} />
                  Analytics
                </button>
                <button
                  onClick={() => setActiveTab('form')}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'form'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Users size={18} />
                  Mark Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'form' ? (
          <AttendanceForm 
            onSubmit={handleSubmit} 
            showNotification={showNotification} 
          />
        ) : activeTab === 'analytics' ? (
          <AnalyticsDashboard />
        ) : (
          <AttendanceDashboard 
            records={filteredRecords}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
}

export default App;
