import React from 'react';

interface AcademicPerformanceProps {
  darkMode: boolean;
  onToggleDarkMode?: () => void;
}

const AcademicPerformance: React.FC<AcademicPerformanceProps> = ({ darkMode, onToggleDarkMode }) => {
  const subjects = [
    { name: 'Mathematics', grade: 'A', gpa: 3.8, trend: 'up', lastUpdated: '2024-05-01' },
    { name: 'Science', grade: 'B', gpa: 3.2, trend: 'down', lastUpdated: '2024-05-02' },
    { name: 'History', grade: 'C', gpa: 2.8, trend: 'stable', lastUpdated: '2024-05-01' },
    { name: 'English', grade: 'A', gpa: 3.9, trend: 'up', lastUpdated: '2024-05-03' },
    { name: 'Art', grade: 'B', gpa: 3.1, trend: 'up', lastUpdated: '2024-05-02' },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-green-500 text-white';
      case 'B': return 'bg-green-300 text-gray-900';
      case 'C': return 'bg-yellow-300 text-gray-900';
      case 'D':
      case 'F': return 'bg-red-500 text-white';
      default: return 'bg-gray-200 text-gray-900';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <span className="text-green-500">▲</span>;
      case 'down': return <span className="text-red-500">▼</span>;
      case 'stable': return <span className="text-gray-400">■</span>;
      default: return null;
    }
  };

  const calculateOverallGPA = () => {
    const total = subjects.reduce((sum, subject) => sum + subject.gpa, 0);
    return (total / subjects.length).toFixed(2);
  };

  return (
    <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in`}>
          Academic Performance
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
      
      {/* Overall GPA Card */}
      <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} rounded-lg p-4 mb-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Overall GPA
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Current semester performance
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              {calculateOverallGPA()}
            </div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              out of 4.0
            </div>
          </div>
        </div>
      </div>

      {/* Subject Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject, index) => (
          <div
            key={subject.name}
            className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} rounded-lg p-4 transition-all duration-300 hover:shadow-md transform hover:-translate-y-1`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {subject.name}
              </h4>
              {getTrendIcon(subject.trend)}
            </div>
            
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${getGradeColor(subject.grade)}`}>
                {subject.grade}
              </span>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                GPA: {subject.gpa}
              </span>
            </div>
            
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Last updated: {subject.lastUpdated}
            </div>
          </div>
        ))}
      </div>

      {/* Performance Insights */}
      <div className={`mt-6 ${darkMode ? 'bg-gray-700' : 'bg-green-50'} rounded-lg p-4`}>
        <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Performance Insights
        </h3>
        <div className="space-y-2">
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            • <strong>Strongest Subject:</strong> English (A, 3.9 GPA)
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            • <strong>Needs Attention:</strong> History (C, 2.8 GPA)
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            • <strong>Improving:</strong> Mathematics and English showing upward trends
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicPerformance; 