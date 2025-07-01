import React, { useState } from 'react';

const AssignmentHomeworkTracker: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const assignments = [
    {
      id: 1,
      title: 'Algebra Problem Set',
      subject: 'Mathematics',
      dueDate: '2024-05-08',
      status: 'pending',
      priority: 'high',
      description: 'Complete problems 1-20 in Chapter 5. Show all work.',
      progress: 0,
      totalPoints: 100,
      submitted: false,
      teacher: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      title: 'Science Fair Project',
      subject: 'Science',
      dueDate: '2024-05-15',
      status: 'in-progress',
      priority: 'high',
      description: 'Research paper and presentation on renewable energy sources.',
      progress: 65,
      totalPoints: 150,
      submitted: false,
      teacher: 'Mr. Michael Chen'
    },
    {
      id: 3,
      title: 'Shakespeare Essay',
      subject: 'English',
      dueDate: '2024-05-10',
      status: 'completed',
      priority: 'medium',
      description: 'Write a 1000-word essay analyzing themes in Macbeth.',
      progress: 100,
      totalPoints: 80,
      submitted: true,
      teacher: 'Ms. Emily Rodriguez',
      grade: 85
    },
    {
      id: 4,
      title: 'History Timeline',
      subject: 'History',
      dueDate: '2024-05-12',
      status: 'pending',
      priority: 'low',
      description: 'Create a timeline of major events during the Civil War.',
      progress: 0,
      totalPoints: 50,
      submitted: false,
      teacher: 'Prof. David Wilson'
    },
    {
      id: 5,
      title: 'Art Portfolio',
      subject: 'Art',
      dueDate: '2024-05-20',
      status: 'in-progress',
      priority: 'medium',
      description: 'Compile 10 original artworks with artist statements.',
      progress: 40,
      totalPoints: 120,
      submitted: false,
      teacher: 'Ms. Lisa Thompson'
    }
  ];

  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDueDateStatus = (dueDate: string) => {
    const daysUntilDue = getDaysUntilDue(dueDate);
    if (daysUntilDue < 0) return 'overdue';
    if (daysUntilDue <= 3) return 'urgent';
    if (daysUntilDue <= 7) return 'soon';
    return 'normal';
  };

  const filteredAssignments = assignments.filter(assignment => {
    const statusMatch = selectedFilter === 'all' || assignment.status === selectedFilter;
    const subjectMatch = selectedSubject === 'all' || assignment.subject === selectedSubject;
    return statusMatch && subjectMatch;
  });

  const pendingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'in-progress');
  const completedAssignments = assignments.filter(a => a.status === 'completed');
  const overdueAssignments = assignments.filter(a => getDaysUntilDue(a.dueDate) < 0);

  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-4 animate-fade-in">Assignment & Homework Tracker</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{assignments.length}</div>
          <div className="text-sm text-gray-600">Total Assignments</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{pendingAssignments.length}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{completedAssignments.length}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{overdueAssignments.length}</div>
          <div className="text-sm text-gray-600">Overdue</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          const dueDateStatus = getDueDateStatus(assignment.dueDate);
          
          return (
            <div
              key={assignment.id}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
                dueDateStatus === 'overdue' ? 'border-red-300 bg-red-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{assignment.title}</h3>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                      {assignment.status.replace('-', ' ')}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(assignment.priority)}`}></div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>📚 {assignment.subject}</span>
                    <span>👨‍🏫 {assignment.teacher}</span>
                    <span>📅 Due: {assignment.dueDate}</span>
                    <span>🎯 {assignment.totalPoints} points</span>
                  </div>
                </div>
                <div className="text-right">
                  {assignment.submitted && assignment.grade && (
                    <div className="text-lg font-bold text-green-600 mb-1">
                      {assignment.grade}/{assignment.totalPoints}
                    </div>
                  )}
                  <div className={`text-sm font-medium ${
                    dueDateStatus === 'overdue' ? 'text-red-600' :
                    dueDateStatus === 'urgent' ? 'text-orange-600' :
                    dueDateStatus === 'soon' ? 'text-yellow-600' : 'text-gray-600'
                  }`}>
                    {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} days overdue` :
                     daysUntilDue === 0 ? 'Due today' :
                     daysUntilDue === 1 ? 'Due tomorrow' :
                     `${daysUntilDue} days left`}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              {assignment.status !== 'completed' && (
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${assignment.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!assignment.submitted && (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Mark as Complete
                  </button>
                )}
                <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors">
                  View Details
                </button>
                <button className="text-blue-600 text-sm hover:underline">
                  Contact Teacher
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Assignment */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-3">Quick Add Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Assignment title"
            className="p-2 border rounded text-sm"
          />
          <select className="p-2 border rounded text-sm">
            <option value="">Select subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          <input
            type="date"
            className="p-2 border rounded text-sm"
          />
        </div>
        <div className="mt-3">
          <textarea
            placeholder="Assignment description"
            className="w-full p-2 border rounded text-sm"
            rows={2}
          ></textarea>
        </div>
        <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
          Add Assignment
        </button>
      </div>
    </section>
  );
};

export default AssignmentHomeworkTracker; 