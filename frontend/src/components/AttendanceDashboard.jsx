import React, { useState, useEffect } from 'react';
import { attendanceAPI } from '../services/api';
import StatsCard from './StatsCard';
import AttendanceForm from './AttendanceForm';
import { Users, CheckCircle, XCircle, Clock, Edit2, Trash2, Search, Download, FileText, BarChart3 } from 'lucide-react';
import { exportToCSV, exportToExcel, exportStatisticsReport } from '../utils/exportUtils';

const AttendanceDashboard = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0, late: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [showExportMenu, setShowExportMenu] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-apply filter when date changes
  useEffect(() => {
    const applyFilters = async () => {
      if (!dateFilter && !searchTerm) {
        fetchData();
      } else if (dateFilter) {
        handleSearch();
      }
    };
    applyFilters();
    // eslint-disable-next-line
  }, [dateFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [recordsData, statsData] = await Promise.all([
        attendanceAPI.getAll(),
        attendanceAPI.getStats(),
      ]);
      setAttendanceRecords(recordsData.data);
      setStats(statsData.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await attendanceAPI.delete(id);
        fetchData();
      } catch (err) {
        alert('Failed to delete record');
      }
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    fetchData();
    setShowForm(false);
    setEditingRecord(null);
  };

  const handleSearch = async () => {
    if (!searchTerm && !dateFilter) {
      fetchData();
      return;
    }
    
    try {
      let results = [];
      
      // If search term is provided, search by employee
      if (searchTerm) {
        const result = await attendanceAPI.searchByEmployee(searchTerm);
        results = result.data;
      } else {
        // Otherwise get all records
        const result = await attendanceAPI.getAll();
        results = result.data;
      }
      
      // Apply date filter if provided
      if (dateFilter) {
        results = results.filter(record => {
          const recordDate = new Date(record.date).toISOString().split('T')[0];
          return recordDate === dateFilter;
        });
      }
      
      setAttendanceRecords(results);
    } catch (err) {
      setError('Search/Filter failed');
    }
  };

  const handleExportCSV = () => {
    exportToCSV(attendanceRecords, 'attendance-records');
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    exportToExcel(attendanceRecords, 'attendance-records');
    setShowExportMenu(false);
  };

  const handleExportReport = () => {
    const dateRangeText = dateFilter ? new Date(dateFilter).toLocaleDateString() : 'All Dates';
    exportStatisticsReport(stats, attendanceRecords, dateRangeText);
    setShowExportMenu(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'text-green-600 bg-green-100';
      case 'Absent':
        return 'text-red-600 bg-red-100';
      case 'Late':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Employee Attendance Tracker
          </h1>
          <p className="text-gray-600">Manage and track employee attendance records</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Records"
            value={stats.total}
            color="blue"
          />
          <StatsCard
            title="Present"
            value={stats.present}
            color="green"
          />
          <StatsCard
            title="Absent"
            value={stats.absent}
            color="red"
          />
          <StatsCard
            title="Late"
            value={stats.late}
            color="yellow"
          />
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <AttendanceForm
            onSuccess={handleFormSuccess}
            onClose={() => {
              setShowForm(false);
              setEditingRecord(null);
            }}
            editData={editingRecord}
          />
        )}

        {/* Search, Filter and Add Button */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search and Date Filter Row */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Search by employee name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSearch}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 flex items-center"
                >
                  <Search size={20} className="mr-2" />
                  Search
                </button>
              </div>
              
              {/* Date Filter */}
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Filter by date"
                />
                {dateFilter && (
                  <button
                    onClick={() => setDateFilter('')}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    title="Clear filter"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Add Button Row */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  {dateFilter && `Showing records for ${new Date(dateFilter).toLocaleDateString()}`}
                  {searchTerm && !dateFilter && `Searching for "${searchTerm}"`}
                  {!searchTerm && !dateFilter && `Showing all records`}
                </div>
                {(searchTerm || dateFilter) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setDateFilter('');
                      fetchData();
                    }}
                    className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {/* Export Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export
                  </button>
                  
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                      <div className="py-1">
                        <button
                          onClick={handleExportCSV}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Export to CSV
                        </button>
                        <button
                          onClick={handleExportExcel}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Export to Excel
                        </button>
                        <button
                          onClick={handleExportReport}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <BarChart3 size={16} />
                          Generate Report
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    setShowForm(!showForm);
                    setEditingRecord(null);
                  }}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 whitespace-nowrap"
                >
                  {showForm ? 'Close Form' : '+ Add Attendance'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recorded At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                ) : (
                  attendanceRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {record.employeeName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {record.employeeID}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            record.status
                          )}`}
                        >
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(record.timestamp).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(record)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(record.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
