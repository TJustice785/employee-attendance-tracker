import React, { useState, useEffect } from 'react';
import { attendanceAPI } from '../services/api';
import { TrendingUp, Users, Calendar, Award, AlertCircle } from 'lucide-react';
import { getAttendanceTrends, groupByEmployee, calculateAttendanceRate } from '../utils/exportUtils';

const AnalyticsDashboard = () => {
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({ total: 0, present: 0, absent: 0 });
  const [trends, setTrends] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [recordsData, statsData] = await Promise.all([
        attendanceAPI.getAll(),
        attendanceAPI.getStats(),
      ]);
      
      const allRecords = recordsData.data;
      setRecords(allRecords);
      setStats(statsData.data);
      
      // Calculate trends
      const trendData = getAttendanceTrends(allRecords, 7);
      setTrends(trendData);
      
      // Calculate employee stats
      const empStats = groupByEmployee(allRecords);
      setEmployeeStats(empStats);
      
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAttendanceRate = () => {
    if (stats.total === 0) return 0;
    return Math.round((stats.present / stats.total) * 100);
  };

  const getMostPresentEmployee = () => {
    if (employeeStats.length === 0) return null;
    return employeeStats.reduce((prev, current) => 
      (prev.present > current.present) ? prev : current
    );
  };

  const getLeastPresentEmployee = () => {
    if (employeeStats.length === 0) return null;
    return employeeStats.reduce((prev, current) => 
      (prev.present < current.present) ? prev : current
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const attendanceRate = getAttendanceRate();
  const topEmployee = getMostPresentEmployee();
  const bottomEmployee = getLeastPresentEmployee();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Analytics Dashboard
          </h1>
          <p className="text-gray-600">Attendance insights and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Attendance Rate</p>
                <p className="text-3xl font-bold text-blue-600">{attendanceRate}%</p>
              </div>
              <TrendingUp className="text-blue-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Records</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
              </div>
              <Calendar className="text-gray-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Employees</p>
                <p className="text-3xl font-bold text-purple-600">{employeeStats.length}</p>
              </div>
              <Users className="text-purple-500" size={40} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Present Today</p>
                <p className="text-3xl font-bold text-green-600">{stats.present}</p>
              </div>
              <Award className="text-green-500" size={40} />
            </div>
          </div>
        </div>

        {/* Attendance Trends Chart */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Last 7 Days Attendance Trend</h2>
          <div className="space-y-2">
            {trends.map((day, index) => {
              const maxValue = Math.max(...trends.map(d => d.total)) || 1;
              const presentWidth = (day.present / maxValue) * 100;
              const absentWidth = (day.absent / maxValue) * 100;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    <span>Total: {day.total}</span>
                  </div>
                  <div className="flex h-8 rounded overflow-hidden">
                    <div 
                      className="bg-green-500 flex items-center justify-center text-white text-xs font-semibold"
                      style={{ width: `${presentWidth}%` }}
                    >
                      {day.present > 0 && `${day.present} Present`}
                    </div>
                    <div 
                      className="bg-red-500 flex items-center justify-center text-white text-xs font-semibold"
                      style={{ width: `${absentWidth}%` }}
                    >
                      {day.absent > 0 && `${day.absent} Absent`}
                    </div>
                    {day.total === 0 && (
                      <div className="bg-gray-200 flex-1 flex items-center justify-center text-gray-500 text-xs">
                        No records
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Best Attendance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-green-500" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Best Attendance</h2>
            </div>
            {topEmployee ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">{topEmployee.name}</p>
                <p className="text-sm text-gray-600">ID: {topEmployee.id}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div>
                    <p className="text-2xl font-bold text-green-600">{topEmployee.present}</p>
                    <p className="text-xs text-gray-500">Days Present</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-600">{topEmployee.records.length}</p>
                    <p className="text-xs text-gray-500">Total Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">
                      {Math.round((topEmployee.present / topEmployee.records.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500">Attendance Rate</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>

          {/* Needs Attention */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-orange-500" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Needs Attention</h2>
            </div>
            {bottomEmployee ? (
              <div className="space-y-2">
                <p className="text-lg font-semibold text-gray-800">{bottomEmployee.name}</p>
                <p className="text-sm text-gray-600">ID: {bottomEmployee.id}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div>
                    <p className="text-2xl font-bold text-red-600">{bottomEmployee.absent}</p>
                    <p className="text-xs text-gray-500">Days Absent</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-600">{bottomEmployee.records.length}</p>
                    <p className="text-xs text-gray-500">Total Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-orange-600">
                      {Math.round((bottomEmployee.present / bottomEmployee.records.length) * 100)}%
                    </p>
                    <p className="text-xs text-gray-500">Attendance Rate</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>

        {/* Employee Leaderboard */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Employee Attendance Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Rank</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Employee</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Present</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Absent</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Total</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Rate</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {employeeStats
                  .sort((a, b) => {
                    const rateA = a.present / a.records.length;
                    const rateB = b.present / b.records.length;
                    return rateB - rateA;
                  })
                  .map((emp, index) => {
                    const rate = Math.round((emp.present / emp.records.length) * 100);
                    return (
                      <tr key={emp.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-center">
                          <span className={`font-bold ${index === 0 ? 'text-yellow-500' : 'text-gray-600'}`}>
                            {index + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{emp.name}</p>
                            <p className="text-xs text-gray-500">{emp.id}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center text-green-600 font-semibold">{emp.present}</td>
                        <td className="py-3 px-4 text-center text-red-600 font-semibold">{emp.absent}</td>
                        <td className="py-3 px-4 text-center text-gray-600 font-semibold">{emp.records.length}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`font-bold ${rate >= 80 ? 'text-green-600' : rate >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {rate}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {rate >= 80 ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Excellent</span>
                          ) : rate >= 60 ? (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Good</span>
                          ) : (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Poor</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
