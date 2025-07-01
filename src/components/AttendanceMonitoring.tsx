import React, { useState } from 'react';

interface AttendanceMonitoringProps {
  darkMode: boolean;
  onToggleDarkMode?: () => void;
}

const AttendanceMonitoring: React.FC<AttendanceMonitoringProps> = ({ darkMode, onToggleDarkMode }) => {
  const [selectedMonth, setSelectedMonth] = useState('May 2024');

  const attendanceData = {
    totalDays: 25,
    present: 22,
    absent: 2,
    late: 1,
    excused: 0,
    percentage: 88,
  };

  const monthlyData = [
    { month: 'January', present: 20, absent: 1, late: 0, excused: 0 },
    { month: 'February', present: 18, absent: 2, late: 1, excused: 0 },
    { month: 'March', present: 22, absent: 0, late: 0, excused: 1 },
    { month: 'April', present: 19, absent: 1, late: 1, excused: 0 },
    { month: 'May', present: 22, absent: 2, late: 1, excused: 0 },
  ];

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceStatus = (percentage: number) => {
    if (percentage >= 95) return 'Excellent';
    if (percentage >= 90) return 'Good';
    if (percentage >= 85) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in`}>
          Attendance Monitoring
        </h2>
        {onToggleDarkMode && (
          <button
            onClick={onToggleDarkMode}
            className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <span className="text-xl">
              {darkMode ? '☀️' : '🌙'}
            </span>
          </button>
        )}
      </div>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            {attendanceData.percentage}%
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Attendance Rate
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {attendanceData.present}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Present Days
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-red-50'} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            {attendanceData.absent}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Absent Days
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-yellow-50'} rounded-lg p-4 text-center`}>
          <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            {attendanceData.late}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Late Days
          </div>
        </div>
      </div>

      {/* Monthly Selector */}
      <div className="mb-6">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
          Select Month
        </label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className={`border rounded px-3 py-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        >
          {monthlyData.map((data) => (
            <option key={data.month} value={data.month}>
              {data.month} 2024
            </option>
          ))}
        </select>
      </div>

      {/* Attendance Calendar */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 mb-6`}>
        <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Attendance Calendar - {selectedMonth}
        </h3>
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className={`text-center p-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const isPresent = day <= 22;
            const isAbsent = day > 22 && day <= 24;
            const isLate = day === 25;
            const isEmpty = day > 25;

            if (isEmpty) {
              return <div key={day} className="p-2"></div>;
            }

            let bgColor = 'bg-gray-200';
            let textColor = 'text-gray-600';
            let status = '';

            if (isPresent) {
              bgColor = 'bg-green-500';
              textColor = 'text-white';
              status = 'Present';
            } else if (isAbsent) {
              bgColor = 'bg-red-500';
              textColor = 'text-white';
              status = 'Absent';
            } else if (isLate) {
              bgColor = 'bg-yellow-500';
              textColor = 'text-white';
              status = 'Late';
            }

            return (
              <div
                key={day}
                className={`${bgColor} ${textColor} rounded text-center p-2 text-sm cursor-pointer hover:opacity-80 transition-opacity`}
                title={`${day} ${selectedMonth}: ${status}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Attendance Trend
          </h3>
          <div className="space-y-3">
            {monthlyData.map((data) => {
              const percentage = Math.round(((data.present) / (data.present + data.absent + data.late)) * 100);
              return (
                <div key={data.month} className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {data.month}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${percentage >= 95 ? 'bg-green-500' : percentage >= 90 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-medium ${getAttendanceColor(percentage)}`}>
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg p-4`}>
          <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Attendance Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Current Status:
              </span>
              <span className={`text-sm font-medium ${getAttendanceColor(attendanceData.percentage)}`}>
                {getAttendanceStatus(attendanceData.percentage)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Total School Days:
              </span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {attendanceData.totalDays}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Days Remaining:
              </span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                5 days
              </span>
            </div>
            <div className="flex justify-between">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Perfect Attendance Goal:
              </span>
              <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                95%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceMonitoring; 