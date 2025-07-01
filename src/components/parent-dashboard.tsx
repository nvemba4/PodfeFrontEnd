'use client'

import React, { useState } from 'react';
import { Line, Pie, Radar, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
  BarElement,
} from 'chart.js';
import AcademicPerformance from './AcademicPerformance';
import AttendanceMonitoring from './AttendanceMonitoring';
import CommunicationHub from './CommunicationHub';
import NotificationAlertSystem from './NotificationAlertSystem';
import CalendarEventManagement from './CalendarEventManagement';
import AssignmentHomeworkTracker from './AssignmentHomeworkTracker';
import AIPoweredAnalytics from './AIPoweredAnalytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
  BarElement
);

// Custom CSS animations
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }
  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }
  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }
  .animate-pulse-slow {
    animation: pulse 2s infinite;
  }
  .stagger-animation {
    animation: fadeIn 0.6s ease-out;
  }
  .stagger-animation:nth-child(1) { animation-delay: 0.1s; }
  .stagger-animation:nth-child(2) { animation-delay: 0.2s; }
  .stagger-animation:nth-child(3) { animation-delay: 0.3s; }
  .stagger-animation:nth-child(4) { animation-delay: 0.4s; }
  .stagger-animation:nth-child(5) { animation-delay: 0.5s; }
`;

// Mock data for students
const students = [
  {
    id: 1,
    name: 'Maria Silva',
    grade: '10th Grade',
    gpa: 3.8,
    status: 'Excellent',
    photo: '/public/images/avatar.jpg',
    year: '2023-2024',
    attendance: 97,
  },
  {
    id: 2,
    name: 'João Pereira',
    grade: '8th Grade',
    gpa: 3.2,
    status: 'Good',
    photo: '/public/images/student.jpeg',
    year: '2023-2024',
    attendance: 92,
  },
];

// Sidebar navigation items (stub)
const navItems = [
  'Overview',
  'Academic Performance',
  'Attendance',
  'Communication',
  'Notifications',
  'Calendar',
  'Assignments',
  'AI Insights',
  'Export & Reports',
  'Quick Actions',
];

// Section Placeholder Components
const SectionPlaceholder = ({ title }: { title: string }) => (
  <section className="bg-white rounded-lg shadow p-6 mb-6 min-h-[120px] flex flex-col justify-center items-center">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="text-gray-400">[Placeholder for {title}]</div>
  </section>
);

// Student Overview & Selection
const StudentOverview = ({ selectedStudent, onSelectStudent, darkMode }: any) => (
  <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Student Selector */}
      <div className="animate-fade-in">
        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Select Student</label>
        <select
          className={`border rounded px-3 py-2 transition-all duration-200 hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          value={selectedStudent.id}
          onChange={e => onSelectStudent(Number(e.target.value))}
        >
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </div>
      {/* Student Profile Card */}
      <div className="flex items-center gap-4 animate-slide-in-right">
        <img
          src={selectedStudent.photo}
          alt={selectedStudent.name}
          className="w-16 h-16 rounded-full object-cover border transition-all duration-300 hover:scale-110 hover:shadow-lg"
        />
        <div>
          <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>{selectedStudent.name}</div>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-200`}>{selectedStudent.grade} | {selectedStudent.year}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'} transition-colors duration-200`}>GPA: {selectedStudent.gpa}</span>
            {/* Performance Indicator */}
            <span className={`inline-block w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
              selectedStudent.status === 'Excellent' ? 'bg-green-500' :
              selectedStudent.status === 'Good' ? 'bg-yellow-400' :
              'bg-red-500'
            }`} title={selectedStudent.status}></span>
            <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-400'} transition-colors duration-200`}>{selectedStudent.status}</span>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="flex flex-col gap-1 text-right animate-slide-in-left">
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'} transition-colors duration-200 hover:scale-105 transform`}>Attendance: <span className="font-semibold">{selectedStudent.attendance}%</span></span>
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'} transition-colors duration-200 hover:scale-105 transform`}>Academic Year: <span className="font-semibold">{selectedStudent.year}</span></span>
      </div>
    </div>
  </section>
);

// Academic Performance Tracking
const subjectData = [
  {
    name: 'Mathematics',
    icon: '📐',
    grade: 'A',
    trend: 'up',
    lastUpdated: '2024-05-01',
  },
  {
    name: 'Science',
    icon: '🔬',
    grade: 'B',
    trend: 'down',
    lastUpdated: '2024-05-02',
  },
  {
    name: 'History',
    icon: '📜',
    grade: 'C',
    trend: 'stable',
    lastUpdated: '2024-05-01',
  },
  {
    name: 'English',
    icon: '📚',
    grade: 'A',
    trend: 'up',
    lastUpdated: '2024-05-03',
  },
  {
    name: 'Art',
    icon: '🎨',
    grade: 'B',
    trend: 'up',
    lastUpdated: '2024-05-02',
  },
];

const gradeColor = (grade: string) => {
  switch (grade) {
    case 'A': return 'bg-green-500 text-white';
    case 'B': return 'bg-green-300 text-gray-900';
    case 'C': return 'bg-yellow-300 text-gray-900';
    case 'D':
    case 'F': return 'bg-red-500 text-white';
    default: return 'bg-gray-200 text-gray-900';
  }
};

const trendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return <span className="text-green-500">▲</span>;
    case 'down': return <span className="text-red-500">▼</span>;
    case 'stable': return <span className="text-gray-400">■</span>;
    default: return null;
  }
};

const gradeToGPA = (grade: string) => {
  switch (grade) {
    case 'A': return 4.0;
    case 'B': return 3.0;
    case 'C': return 2.0;
    case 'D': return 1.0;
    case 'F': return 0.0;
    default: return 0.0;
  }
};

const calculateGPA = (subjects: typeof subjectData) => {
  if (!subjects.length) return 0;
  const total = subjects.reduce((sum, s) => sum + gradeToGPA(s.grade), 0);
  return (total / subjects.length).toFixed(2);
};

// Mock grade history data for chart
const gradeHistoryLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
const gradeHistoryData = {
  Mathematics: [3.5, 3.7, 3.8, 3.9, 4.0],
  Science: [3.2, 3.1, 3.0, 3.0, 3.0],
  History: [2.5, 2.7, 2.8, 2.0, 2.0],
  English: [3.8, 3.9, 4.0, 4.0, 4.0],
  Art: [3.0, 3.2, 3.3, 3.4, 3.0],
};

const lineChartData = {
  labels: gradeHistoryLabels,
  datasets: Object.keys(gradeHistoryData).map((subject, idx) => ({
    label: subject,
    data: gradeHistoryData[subject as keyof typeof gradeHistoryData],
    borderColor: [
      '#22c55e', // green
      '#3b82f6', // blue
      '#f59e42', // orange
      '#a855f7', // purple
      '#f43f5e', // red
    ][idx % 5],
    backgroundColor: 'rgba(0,0,0,0)',
    tension: 0.3,
    pointRadius: 3,
    fill: false,
  })),
};

const lineChartOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    title: {
      display: true,
      text: 'Grade History (GPA Scale)',
      font: {
        size: 16,
        weight: 700,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: (context: any) => `Month: ${context[0]?.label || 'Unknown'}`,
        label: (context: any) => `${context.dataset?.label || 'Unknown'}: ${context.parsed?.y?.toFixed(1) || '0'} GPA`,
        afterLabel: (context: any) => {
          const value = context.parsed?.y || 0;
          if (value >= 3.5) return 'Excellent Performance!';
          if (value >= 3.0) return 'Good Performance';
          if (value >= 2.0) return 'Needs Improvement';
          return 'Requires Attention';
        },
      },
    },
  },
  scales: {
    y: {
      min: 0,
      max: 4,
      ticks: {
        stepSize: 1,
        callback: function(this: any, tickValue: string | number) {
          return Number(tickValue).toFixed(1);
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  elements: {
    point: {
      radius: 6,
      hoverRadius: 8,
      backgroundColor: 'white',
      borderWidth: 2,
      hoverBorderWidth: 3,
    },
    line: {
      tension: 0.4,
    },
  },
  onClick: (event: any, elements: any) => {
    if (elements.length > 0) {
      const element = elements[0];
      console.log('Clicked on:', element.dataset.label, 'at', element.index);
    }
  },
};

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: (context: any) => {
          const label = context.label || 'Unknown';
          const value = context.parsed || 0;
          const total = context.dataset?.data?.reduce((a: number, b: number) => a + b, 0) || 0;
          const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
          return `${label}: ${value} days (${percentage}%)`;
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: 'white',
    },
  },
  onClick: (event: any, elements: any) => {
    if (elements.length > 0) {
      const element = elements[0];
      console.log('Clicked on attendance type:', element.label);
    }
  },
};

const radarChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: (context: any) => `${context.dataset?.label || 'Unknown'}: ${context.parsed?.r || 0}%`,
        afterLabel: (context: any) => {
          const value = context.parsed?.r || 0;
          if (value >= 90) return 'Outstanding!';
          if (value >= 80) return 'Good Performance';
          if (value >= 70) return 'Satisfactory';
          return 'Needs Improvement';
        },
      },
    },
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      ticks: {
        stepSize: 20,
        callback: function(this: any, value: string | number) {
          return `${value}%`;
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      pointLabels: {
        font: {
          weight: 700,
        },
      },
    },
  },
  elements: {
    point: {
      radius: 4,
      hoverRadius: 6,
      backgroundColor: 'white',
      borderWidth: 2,
      hoverBorderWidth: 3,
    },
    line: {
      borderWidth: 2,
    },
  },
  onClick: (event: any, elements: any) => {
    if (elements.length > 0) {
      const element = elements[0];
      console.log('Clicked on subject:', element.label);
    }
  },
};

const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
      callbacks: {
        label: (context: any) => `${context.dataset?.label || 'Unknown'}: ${context.parsed?.y || 0}%`,
        afterLabel: (context: any) => {
          const value = context.parsed?.y || 0;
          const isStudent = context.dataset?.label === 'Student';
          const isClass = context.dataset?.label === 'Class Avg';
          
          if (isStudent && value > 85) return 'Above Class Average!';
          if (isStudent && value > 75) return 'At Class Average';
          if (isStudent && value <= 75) return 'Below Class Average';
          return '';
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: function(this: any, value: string | number) {
          return `${value}%`;
        },
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  elements: {
    bar: {
      borderRadius: 4,
      borderSkipped: false,
    },
  },
  onClick: (event: any, elements: any) => {
    if (elements.length > 0) {
      const element = elements[0];
      console.log('Clicked on:', element.dataset.label, 'in', element.label);
    }
  },
};

// Heat map mockup: just a grid of colored squares
const heatMapData = [
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 1],
  [3, 4, 5, 1, 2],
  [4, 5, 1, 2, 3],
  [5, 1, 2, 3, 4],
];
const heatMapColors = ['bg-gray-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-red-200'];

// Ensure attendancePieData, radarData, and barData are defined and in scope
const attendancePieData = {
  labels: ['Present', 'Absent', 'Late', 'Excused'],
  datasets: [
    {
      data: [20, 2, 1, 2],
      backgroundColor: ['#22c55e', '#ef4444', '#facc15', '#3b82f6'],
    },
  ],
};
const radarData = {
  labels: ['Math', 'Science', 'History', 'English', 'Art'],
  datasets: [
    {
      label: 'Student',
      data: [90, 80, 70, 85, 75],
      backgroundColor: 'rgba(59,130,246,0.2)',
      borderColor: '#3b82f6',
      pointBackgroundColor: '#3b82f6',
    },
    {
      label: 'Class Avg',
      data: [80, 75, 65, 80, 70],
      backgroundColor: 'rgba(16,185,129,0.2)',
      borderColor: '#10b981',
      pointBackgroundColor: '#10b981',
    },
  ],
};
const barData = {
  labels: ['Math', 'Science', 'History', 'English', 'Art'],
  datasets: [
    {
      label: 'Student',
      data: [90, 80, 70, 85, 75],
      backgroundColor: '#3b82f6',
    },
    {
      label: 'Class Avg',
      data: [80, 75, 65, 80, 70],
      backgroundColor: '#a3e635',
    },
  ],
};

const DataVisualizationComponents = ({ darkMode }: any) => (
  <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
    <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in`}>Data Visualization Components</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="animate-slide-in-left">
        <div className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Grade Trend Line</div>
        <div className="transition-transform duration-300 hover:scale-105">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
      <div className="animate-slide-in-right">
        <div className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Attendance Pie Chart</div>
        <div className="transition-transform duration-300 hover:scale-105">
          <Pie data={attendancePieData} options={pieChartOptions} />
        </div>
      </div>
      <div className="animate-slide-in-left">
        <div className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Subject Performance Radar</div>
        <div className="transition-transform duration-300 hover:scale-105">
          <Radar data={radarData} options={radarChartOptions} />
        </div>
      </div>
      <div className="animate-slide-in-right">
        <div className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Comparative Bar Chart</div>
        <div className="transition-transform duration-300 hover:scale-105">
          <Bar data={barData} options={barChartOptions} />
        </div>
      </div>
    </div>
    <div className="animate-fade-in">
      <div className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-200`}>Heat Map (Study Patterns)</div>
      <div className="grid grid-cols-5 gap-1 w-40 transition-transform duration-300 hover:scale-110">
        {heatMapData.flat().map((val, idx) => (
          <div 
            key={idx} 
            className={`w-6 h-6 rounded transition-all duration-300 hover:scale-125 cursor-pointer ${heatMapColors[val - 1]}`}
            title={`Study intensity: ${val}/5`}
          ></div>
        ))}
      </div>
      <div className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-200`}>
        Click on squares to see study patterns. Darker colors = higher study intensity.
      </div>
    </div>
  </section>
);

// Mobile-Responsive Features
const MobileResponsiveFeatures = () => (
  <section className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Mobile-Responsive Features</h2>
    <div className="mb-4">
      <div className="font-semibold mb-2">Touch-Friendly UI</div>
      <div className="flex flex-wrap gap-4">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg active:scale-95 transition-transform">Large Tap Target</button>
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg active:scale-95 transition-transform">Swipeable Card</button>
      </div>
      <div className="text-xs text-gray-500 mt-2">Buttons and cards are large and easy to tap on mobile devices.</div>
    </div>
    <div className="mb-4">
      <div className="font-semibold mb-2">Collapsible Sections</div>
      <div className="w-full md:w-1/2">
        <details className="mb-2 border rounded-lg">
          <summary className="cursor-pointer px-4 py-2 font-medium bg-gray-100 rounded-t-lg">Academic Performance</summary>
          <div className="px-4 py-2 text-sm text-gray-700">Grades, GPA, and subject trends are shown here.</div>
        </details>
        <details className="mb-2 border rounded-lg">
          <summary className="cursor-pointer px-4 py-2 font-medium bg-gray-100 rounded-t-lg">Attendance</summary>
          <div className="px-4 py-2 text-sm text-gray-700">Attendance rate, calendar, and analytics.</div>
        </details>
      </div>
      <div className="text-xs text-gray-500 mt-2">Sections can be expanded or collapsed to save screen space.</div>
    </div>
    <div className="mb-4">
      <div className="font-semibold mb-2">Mobile-First Layout</div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 bg-gray-100 rounded-lg p-4 text-center md:text-left">Most important data is shown first on mobile.</div>
        <div className="flex-1 bg-gray-200 rounded-lg p-4 text-center md:text-left hidden md:block">Sidebar and extra features appear on larger screens.</div>
      </div>
      <div className="text-xs text-gray-500 mt-2">Layout adapts to screen size for optimal usability.</div>
    </div>
    <div>
      <div className="font-semibold mb-2">Simplified Navigation</div>
      <div className="flex gap-2 md:hidden">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">☰</button>
        <span className="text-sm text-gray-600">Hamburger menu for mobile navigation</span>
      </div>
      <div className="text-xs text-gray-500 mt-2">Essential features are always accessible on mobile.</div>
    </div>
  </section>
);

// Personalization Options
const PersonalizationOptions = () => (
  <section className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Personalization Options</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Customizable Dashboard */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="font-semibold mb-2">Customizable Dashboard</div>
        <div className="text-xs text-gray-600 mb-3">Drag and drop widgets to personalize your layout</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-blue-100 p-2 rounded text-xs text-center cursor-move">Academic Performance</div>
          <div className="bg-green-100 p-2 rounded text-xs text-center cursor-move">Attendance</div>
          <div className="bg-purple-100 p-2 rounded text-xs text-center cursor-move">Communication</div>
          <div className="bg-yellow-100 p-2 rounded text-xs text-center cursor-move">Calendar</div>
        </div>
        <div className="text-xs text-gray-500 mt-2">[Drag & Drop Placeholder]</div>
      </div>
      {/* Theme Selection */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="font-semibold mb-2">Theme Selection</div>
        <div className="text-xs text-gray-600 mb-3">Choose your preferred theme</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="theme" value="light" defaultChecked className="text-blue-600" />
            <span className="text-sm">Light Mode</span>
            <div className="w-4 h-4 bg-white border border-gray-300 rounded ml-auto"></div>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="theme" value="dark" className="text-blue-600" />
            <span className="text-sm">Dark Mode</span>
            <div className="w-4 h-4 bg-gray-800 border border-gray-600 rounded ml-auto"></div>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="theme" value="auto" className="text-blue-600" />
            <span className="text-sm">Auto (System)</span>
            <div className="w-4 h-4 bg-gradient-to-r from-white to-gray-800 border border-gray-300 rounded ml-auto"></div>
          </label>
        </div>
      </div>
      {/* Language Support */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="font-semibold mb-2">Language Support</div>
        <div className="text-xs text-gray-600 mb-3">Select your preferred language</div>
        <select className="w-full p-2 border rounded text-sm">
          <option value="en">English</option>
          <option value="pt">Português</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
        <div className="text-xs text-gray-500 mt-2">Interface language and content localization</div>
      </div>
    </div>
    {/* Widget Preferences */}
    <div className="mt-6">
      <div className="font-semibold mb-2">Widget Preferences</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="text-blue-600" />
          <span className="text-sm">Show GPA Calculator</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="text-blue-600" />
          <span className="text-sm">Show Attendance</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="text-blue-600" />
          <span className="text-sm">Show AI Insights</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" defaultChecked className="text-blue-600" />
          <span className="text-sm">Show Calendar</span>
        </label>
      </div>
    </div>
  </section>
);

// Security & Privacy Features
const SecurityPrivacyFeatures = () => (
  <section className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Security & Privacy Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Secure Login */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-green-600">security</span>
          Secure Login
        </div>
        <div className="text-sm text-gray-700 mb-3">Multi-factor authentication options available</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="text-green-600" />
            <span className="text-sm">Two-Factor Authentication (2FA)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="text-green-600" />
            <span className="text-sm">Biometric Login</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="text-green-600" />
            <span className="text-sm">Strong Password Policy</span>
          </label>
        </div>
      </div>
      {/* Role-Based Access */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-blue-600">admin_panel_settings</span>
          Role-Based Access
        </div>
        <div className="text-sm text-gray-700 mb-3">Parents only see their child's information</div>
        <div className="text-xs text-gray-600">
          <div>• Access Level: Parent</div>
          <div>• Student: Maria Silva</div>
          <div>• Permissions: View grades, attendance, communicate with teachers</div>
        </div>
      </div>
      {/* Data Encryption */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-purple-600">lock</span>
          Data Encryption
        </div>
        <div className="text-sm text-gray-700 mb-3">All data is encrypted in transit and at rest</div>
        <div className="text-xs text-gray-600">
          <div>• TLS 1.3 encryption for data in transit</div>
          <div>• AES-256 encryption for data at rest</div>
          <div>• Regular security audits and updates</div>
        </div>
      </div>
      {/* Privacy Controls */}
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-yellow-600">privacy_tip</span>
          Privacy Controls
        </div>
        <div className="text-sm text-gray-700 mb-3">Control your data sharing and visibility</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="text-yellow-600" />
            <span className="text-sm">Allow teacher communications</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="text-yellow-600" />
            <span className="text-sm">Share progress with family members</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="text-yellow-600" />
            <span className="text-sm">Receive email notifications</span>
          </label>
        </div>
      </div>
    </div>
    {/* Activity Logging */}
    <div className="mt-6 bg-gray-50 rounded-lg p-4">
      <div className="font-semibold mb-2 flex items-center gap-2">
        <span className="material-icons text-gray-600">history</span>
        Activity Logging
      </div>
      <div className="text-sm text-gray-700 mb-2">Audit trail of dashboard access and actions</div>
      <div className="text-xs text-gray-600">
        <div>• Last login: Today at 2:30 PM</div>
        <div>• Recent actions: Viewed grades, checked attendance</div>
        <div>• Session duration: 45 minutes</div>
      </div>
    </div>
  </section>
);

// Export & Reporting Features
const ExportReportingFeatures = () => (
  <section className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Export & Reporting Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Progress Reports */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-blue-600">assessment</span>
          Progress Reports
        </div>
        <div className="text-sm text-gray-700 mb-3">Download comprehensive academic summaries</div>
        <div className="flex flex-col gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-2">
            <span className="material-icons text-sm">download</span>
            Download PDF Report
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 flex items-center gap-2">
            <span className="material-icons text-sm">print</span>
            Print Report
          </button>
        </div>
      </div>
      {/* Data Export */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-green-600">file_download</span>
          Data Export
        </div>
        <div className="text-sm text-gray-700 mb-3">Export data in various formats</div>
        <div className="flex flex-col gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 flex items-center gap-2">
            <span className="material-icons text-sm">table_chart</span>
            Export to Excel
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 flex items-center gap-2">
            <span className="material-icons text-sm">code</span>
            Export to CSV
          </button>
        </div>
      </div>
      {/* Print Options */}
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-yellow-600">print</span>
          Print Options
        </div>
        <div className="text-sm text-gray-700 mb-3">Printer-friendly versions of reports and charts</div>
        <div className="flex flex-col gap-2">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700 flex items-center gap-2">
            <span className="material-icons text-sm">print</span>
            Print Grades
          </button>
          <button className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 flex items-center gap-2">
            <span className="material-icons text-sm">print</span>
            Print Calendar
          </button>
        </div>
      </div>
      {/* Email Reports */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-purple-600">email</span>
          Email Reports
        </div>
        <div className="text-sm text-gray-700 mb-3">Automated weekly/monthly progress reports</div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="text-purple-600" />
            <span className="text-sm">Weekly Progress Report</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="text-purple-600" />
            <span className="text-sm">Monthly Summary</span>
          </label>
          <button className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 flex items-center gap-2">
            <span className="material-icons text-sm">send</span>
            Send Now
          </button>
        </div>
      </div>
    </div>
    {/* Historical Data */}
    <div className="mt-6 bg-gray-50 rounded-lg p-4">
      <div className="font-semibold mb-2 flex items-center gap-2">
        <span className="material-icons text-gray-600">history</span>
        Historical Data
      </div>
      <div className="text-sm text-gray-700 mb-2">Access to previous semesters and academic years</div>
      <div className="flex gap-2">
        <select className="p-2 border rounded text-sm">
          <option>2023-2024</option>
          <option>2022-2023</option>
          <option>2021-2022</option>
        </select>
        <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">View Historical Data</button>
      </div>
    </div>
  </section>
);

// Quick Action Features
const QuickActionFeatures = () => (
  <section className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Quick Action Features</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Floating Action Buttons */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-blue-600">add</span>
          Floating Action Buttons
        </div>
        <div className="text-sm text-gray-700 mb-3">Quick access to frequently used functions</div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 shadow-lg">
            <span className="material-icons">message</span>
          </button>
          <button className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 shadow-lg">
            <span className="material-icons">event</span>
          </button>
          <button className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 shadow-lg">
            <span className="material-icons">download</span>
          </button>
        </div>
      </div>
      {/* One-Click Operations */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-green-600">flash_on</span>
          One-Click Operations
        </div>
        <div className="text-sm text-gray-700 mb-3">Instant messaging, meeting scheduling, report generation</div>
        <div className="flex flex-col gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 flex items-center gap-2">
            <span className="material-icons text-sm">schedule</span>
            Schedule Meeting
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 flex items-center gap-2">
            <span className="material-icons text-sm">assessment</span>
            Generate Report
          </button>
        </div>
      </div>
      {/* Shortcut Menu */}
      <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-purple-600">keyboard</span>
          Shortcut Menu
        </div>
        <div className="text-sm text-gray-700 mb-3">Customizable quick access to preferred features</div>
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-purple-100 p-2 rounded text-xs text-center hover:bg-purple-200">View Grades</button>
          <button className="bg-purple-100 p-2 rounded text-xs text-center hover:bg-purple-200">Check Attendance</button>
          <button className="bg-purple-100 p-2 rounded text-xs text-center hover:bg-purple-200">Message Teacher</button>
          <button className="bg-purple-100 p-2 rounded text-xs text-center hover:bg-purple-200">View Calendar</button>
        </div>
      </div>
      {/* Search Functionality */}
      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span className="material-icons text-yellow-600">search</span>
          Search Functionality
        </div>
        <div className="text-sm text-gray-700 mb-3">Global search across all dashboard content</div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search grades, assignments, teachers..."
            className="flex-1 p-2 border rounded text-sm"
          />
          <button className="bg-yellow-600 text-white px-4 py-2 rounded text-sm hover:bg-yellow-700">
            <span className="material-icons text-sm">search</span>
          </button>
        </div>
      </div>
    </div>
    {/* Bookmark System */}
    <div className="mt-6 bg-gray-50 rounded-lg p-4">
      <div className="font-semibold mb-2 flex items-center gap-2">
        <span className="material-icons text-gray-600">bookmark</span>
        Bookmark System
      </div>
      <div className="text-sm text-gray-700 mb-3">Save frequently accessed information for quick retrieval</div>
      <div className="flex flex-wrap gap-2">
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 flex items-center gap-1">
          <span className="material-icons text-sm">bookmark</span>
          Math Grades
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 flex items-center gap-1">
          <span className="material-icons text-sm">bookmark</span>
          Attendance Report
        </button>
        <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-300 flex items-center gap-1">
          <span className="material-icons text-sm">bookmark</span>
          Teacher Contacts
        </button>
        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center gap-1">
          <span className="material-icons text-sm">add</span>
          Add Bookmark
        </button>
      </div>
    </div>
  </section>
);

// Main Dashboard Component
const ParentDashboard: React.FC = () => {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Overview');
  const selectedStudent = students.find(s => s.id === selectedStudentId)!;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'Overview':
        return (
          <>
            <StudentOverview selectedStudent={selectedStudent} onSelectStudent={setSelectedStudentId} darkMode={darkMode} />
            <DataVisualizationComponents darkMode={darkMode} />
            <MobileResponsiveFeatures />
          </>
        );
      case 'Academic Performance':
        return <AcademicPerformance darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
      case 'Attendance':
        return <AttendanceMonitoring darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
      case 'Communication':
        return <CommunicationHub darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />;
      case 'Notifications':
        return <NotificationAlertSystem />;
      case 'Calendar':
        return <CalendarEventManagement />;
      case 'Assignments':
        return <AssignmentHomeworkTracker />;
      case 'AI Insights':
        return <AIPoweredAnalytics />;
      case 'Export & Reports':
        return (
          <>
            <ExportReportingFeatures />
            <SecurityPrivacyFeatures />
          </>
        );
      case 'Quick Actions':
        return (
          <>
            <QuickActionFeatures />
            <PersonalizationOptions />
          </>
        );
      default:
        return (
          <>
            <StudentOverview selectedStudent={selectedStudent} onSelectStudent={setSelectedStudentId} darkMode={darkMode} />
            <DataVisualizationComponents darkMode={darkMode} />
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'} flex transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`w-64 ${darkMode ? 'bg-gray-800 shadow-gray-900' : 'bg-white shadow-lg'} shadow-lg hidden md:flex flex-col p-6 transition-colors duration-300`}>
        <div className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Parent Dashboard</div>
        <nav className="flex-1">
          <ul className="space-y-4">
            {navItems.map(item => (
              <li key={item}>
                <button
                  onClick={() => setSelectedMenu(item)}
                  className={`w-full text-left p-2 rounded-lg transition-all duration-200 ${
                    selectedMenu === item
                      ? `${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'} font-semibold`
                      : `${darkMode ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'}`
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8">
          <button className={`w-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded transition-colors duration-200`}>Quick Action</button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <header className={`flex items-center justify-between mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <div className="text-2xl font-bold">{selectedMenu}</div>
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors duration-200`}
            >
              <span className="material-icons text-xl">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            {/* Notification Bell */}
            <div className="relative">
              <button className="relative focus:outline-none">
                <span className={`material-icons text-3xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>notifications</span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">3</span>
              </button>
            </div>
          </div>
        </header>
        {/* Content based on selected menu */}
        {renderContent()}
      </main>
    </div>
  );
};

export default ParentDashboard;
