import React, { useState } from 'react';

interface CommunicationHubProps {
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const CommunicationHub: React.FC<CommunicationHubProps> = ({ darkMode = false, onToggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  const teachers = [
    { id: 1, name: 'Dr. Sarah Johnson', subject: 'Mathematics', email: 'sarah.johnson@school.edu', phone: '+1 (555) 123-4567', avatar: '/images/avatar.jpg' },
    { id: 2, name: 'Mr. Michael Chen', subject: 'Science', email: 'michael.chen@school.edu', phone: '+1 (555) 234-5678', avatar: '/images/avatar.jpg' },
    { id: 3, name: 'Ms. Emily Rodriguez', subject: 'English', email: 'emily.rodriguez@school.edu', phone: '+1 (555) 345-6789', avatar: '/images/avatar.jpg' },
    { id: 4, name: 'Prof. David Wilson', subject: 'History', email: 'david.wilson@school.edu', phone: '+1 (555) 456-7890', avatar: '/images/avatar.jpg' },
  ];

  const messages = [
    { id: 1, from: 'Dr. Sarah Johnson', subject: 'Math Assignment Update', content: 'Maria has shown excellent progress in algebra. Her recent test score was 95%.', date: '2024-05-01', read: false, priority: 'high' },
    { id: 2, from: 'Mr. Michael Chen', subject: 'Science Project Due Date', content: 'Reminder: The science fair project is due next Friday. Maria is doing great work!', date: '2024-04-28', read: true, priority: 'medium' },
    { id: 3, from: 'Ms. Emily Rodriguez', subject: 'Essay Feedback', content: 'Maria\'s essay on Shakespeare was outstanding. She has a natural talent for writing.', date: '2024-04-25', read: true, priority: 'low' },
  ];

  const announcements = [
    { id: 1, title: 'Parent-Teacher Conference', content: 'Annual parent-teacher conferences will be held next week. Please schedule your appointment.', date: '2024-05-02', type: 'event' },
    { id: 2, title: 'School Holiday', content: 'School will be closed on Monday, May 6th for Memorial Day.', date: '2024-05-01', type: 'holiday' },
    { id: 3, title: 'Sports Day', content: 'Annual sports day will be held on Friday, May 10th. All parents are welcome to attend.', date: '2024-04-30', type: 'event' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'event': return '📅';
      case 'holiday': return '🏖️';
      case 'academic': return '📚';
      default: return '📢';
    }
  };

  return (
    <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} animate-fade-in`}>
          Communication Hub
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

      {/* Tab Navigation */}
      <div className="flex border-b mb-6">
        {['messages', 'teachers', 'announcements'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Messages Tab */}
      {activeTab === 'messages' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Messages</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              New Message
            </button>
          </div>
          
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                  message.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(message.priority)}`}>
                      {message.priority.toUpperCase()}
                    </span>
                    {!message.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{message.date}</span>
                </div>
                
                <h4 className="font-semibold mb-1">{message.from}</h4>
                <h5 className="text-sm font-medium text-gray-700 mb-2">{message.subject}</h5>
                <p className="text-sm text-gray-600 mb-3">{message.content}</p>
                
                <div className="flex gap-2">
                  <button className="text-blue-600 text-sm hover:underline">Reply</button>
                  <button className="text-gray-500 text-sm hover:underline">Mark as Read</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Teachers Tab */}
      {activeTab === 'teachers' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Teacher Directory</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{teacher.name}</h4>
                    <p className="text-sm text-gray-600">{teacher.subject}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📧</span>
                    <span className="text-blue-600 hover:underline cursor-pointer">{teacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">📞</span>
                    <span>{teacher.phone}</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Send Message
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                    Schedule Meeting
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === 'announcements' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">School Announcements</h3>
          
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getAnnouncementIcon(announcement.type)}</span>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <span className="text-sm text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{announcement.content}</p>
                    <div className="flex gap-2">
                      <button className="text-blue-600 text-sm hover:underline">Read More</button>
                      <button className="text-gray-500 text-sm hover:underline">Add to Calendar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
            📧 Send Message to All Teachers
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
            📅 Schedule Parent-Teacher Meeting
          </button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
            📊 Request Progress Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default CommunicationHub; 