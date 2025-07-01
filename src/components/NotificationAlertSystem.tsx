import React, { useState } from 'react';

const NotificationAlertSystem: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'grade',
      title: 'New Grade Posted',
      message: 'Mathematics test grade has been posted. Maria scored 95%.',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: '📊'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Maria was marked absent in Science class today.',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      icon: '⚠️'
    },
    {
      id: 3,
      type: 'assignment',
      title: 'Assignment Due Soon',
      message: 'English essay is due tomorrow. Please remind Maria to submit.',
      time: '1 day ago',
      read: true,
      priority: 'medium',
      icon: '📝'
    },
    {
      id: 4,
      type: 'event',
      title: 'Parent-Teacher Meeting',
      message: 'Reminder: Parent-teacher meeting scheduled for tomorrow at 3 PM.',
      time: '2 days ago',
      read: true,
      priority: 'low',
      icon: '📅'
    },
    {
      id: 5,
      type: 'achievement',
      title: 'Academic Achievement',
      message: 'Congratulations! Maria has been selected for the honor roll.',
      time: '3 days ago',
      read: true,
      priority: 'high',
      icon: '🏆'
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    gradeAlerts: true,
    attendanceAlerts: true,
    assignmentReminders: true,
    eventReminders: true,
    achievementAlerts: true
  });

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold animate-fade-in">Notification & Alert System</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Unread: {unreadCount}</span>
          <button 
            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
            className="text-blue-600 text-sm hover:underline"
          >
            Mark All as Read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent Notifications</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-l-4 rounded-r-lg p-4 transition-all duration-200 hover:shadow-md ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                } ${getPriorityColor(notification.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="text-2xl">{notification.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityBadge(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold mb-4">Notification Settings</h3>
          
          <div className="space-y-4">
            {/* Delivery Methods */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Delivery Methods</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Email Notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) => setSettings({...settings, pushNotifications: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Push Notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">SMS Notifications</span>
                </label>
              </div>
            </div>

            {/* Alert Types */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Alert Types</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.gradeAlerts}
                    onChange={(e) => setSettings({...settings, gradeAlerts: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Grade Updates</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.attendanceAlerts}
                    onChange={(e) => setSettings({...settings, attendanceAlerts: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Attendance Alerts</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.assignmentReminders}
                    onChange={(e) => setSettings({...settings, assignmentReminders: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Assignment Reminders</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.eventReminders}
                    onChange={(e) => setSettings({...settings, eventReminders: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Event Reminders</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.achievementAlerts}
                    onChange={(e) => setSettings({...settings, achievementAlerts: e.target.checked})}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Achievement Alerts</span>
                </label>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                  Test Notification
                </button>
                <button className="w-full bg-gray-600 text-white px-3 py-2 rounded text-sm hover:bg-gray-700 transition-colors">
                  Clear All Notifications
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Statistics */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold mb-4">Notification Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{notifications.length}</div>
            <div className="text-sm text-gray-600">Total Notifications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{notifications.filter(n => n.priority === 'high').length}</div>
            <div className="text-sm text-gray-600">High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{notifications.filter(n => n.priority === 'medium').length}</div>
            <div className="text-sm text-gray-600">Medium Priority</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{notifications.filter(n => n.priority === 'low').length}</div>
            <div className="text-sm text-gray-600">Low Priority</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificationAlertSystem; 