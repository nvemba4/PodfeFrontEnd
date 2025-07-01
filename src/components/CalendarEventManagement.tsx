import React, { useState } from 'react';

const CalendarEventManagement: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      date: '2024-05-15',
      time: '15:00',
      type: 'meeting',
      description: 'Annual parent-teacher conference with all subject teachers.',
      location: 'School Conference Room',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: '2024-05-20',
      time: '14:00',
      type: 'event',
      description: 'Annual science fair where students present their projects.',
      location: 'School Gymnasium',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Math Test',
      date: '2024-05-10',
      time: '09:00',
      type: 'academic',
      description: 'Algebra mid-term examination.',
      location: 'Room 201',
      priority: 'high'
    },
    {
      id: 4,
      title: 'Sports Day',
      date: '2024-05-25',
      time: '10:00',
      type: 'event',
      description: 'Annual sports day with various athletic competitions.',
      location: 'School Ground',
      priority: 'low'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'event': return 'bg-green-500';
      case 'academic': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-500';
    }
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`p-2 border cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
            isToday ? 'bg-blue-100 border-blue-300' : ''
          } ${isSelected ? 'bg-blue-200 border-blue-400' : ''}`}
        >
          <div className="text-sm font-medium mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded text-white ${getEventTypeColor(event.type)}`}
                title={event.title}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
            )}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold animate-fade-in">Calendar & Event Management</h2>
        <button
          onClick={() => setShowEventModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{getMonthName(currentMonth)}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
              >
                ←
              </button>
              <button
                onClick={() => setCurrentMonth(new Date())}
                className="px-3 py-2 border rounded hover:bg-gray-50 transition-colors text-sm"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 border rounded hover:bg-gray-50 transition-colors"
              >
                →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        {/* Event Details */}
        <div className="lg:col-span-1">
          <h3 className="font-semibold mb-4">
            {selectedDate ? `Events for ${selectedDate.toLocaleDateString()}` : 'Upcoming Events'}
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {(selectedDate ? getEventsForDate(selectedDate) : events.slice(0, 5)).map((event) => (
              <div
                key={event.id}
                className={`border-l-4 rounded-r-lg p-3 bg-gray-50 ${getPriorityColor(event.priority)}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-sm">{event.title}</h4>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)} text-white`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>📅 {event.date} at {event.time}</div>
                  <div>📍 {event.location}</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="text-blue-600 text-xs hover:underline">Edit</button>
                  <button className="text-red-600 text-xs hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Add Event */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-3">Quick Add Event</h4>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Event title"
                className="w-full p-2 border rounded text-sm"
              />
              <input
                type="date"
                className="w-full p-2 border rounded text-sm"
              />
              <select className="w-full p-2 border rounded text-sm">
                <option value="">Select event type</option>
                <option value="meeting">Meeting</option>
                <option value="event">Event</option>
                <option value="academic">Academic</option>
              </select>
              <button className="w-full bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Add Event
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Statistics */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold mb-4">Event Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{events.length}</div>
            <div className="text-sm text-gray-600">Total Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{events.filter(e => e.type === 'event').length}</div>
            <div className="text-sm text-gray-600">School Events</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{events.filter(e => e.type === 'academic').length}</div>
            <div className="text-sm text-gray-600">Academic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{events.filter(e => e.type === 'meeting').length}</div>
            <div className="text-sm text-gray-600">Meetings</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarEventManagement; 