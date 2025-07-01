import React, { useState } from 'react';

// Define the type for a message contact
interface MessageContact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials: string;
  online: boolean;
  lastMessage: string;
  unread: boolean;
  archived: boolean;
  chat: { from: string; text: string; time: string }[];
}

interface MessagesPageProps {
  child?: any;
}

const MessagesPage = ({ child }: MessagesPageProps) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<MessageContact | null>(null);

  // Generate messages based on child's teachers and performance
  const generateMessages = (): MessageContact[] => {
    if (!child) {
      return [
        {
          id: 1,
          name: 'Ms. Johnson',
          role: 'Math Teacher',
          avatar: '',
          initials: 'MJ',
          online: true,
          lastMessage: '2d ago',
          unread: true,
          archived: false,
          chat: [
            { from: 'Ms. Johnson', text: 'Hello, do you have any questions about the homework?', time: '2d ago' },
            { from: 'You', text: 'No, thank you!', time: '2d ago' },
          ],
        },
        {
          id: 2,
          name: 'Mr. Davis',
          role: 'Science Teacher',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
          initials: '',
          online: false,
          lastMessage: '1w ago',
          unread: false,
          archived: false,
          chat: [
            { from: 'Mr. Davis', text: 'Lab results are available.', time: '1w ago' },
          ],
        }
      ];
    }

    const { performance } = child;
    const teachers = [
      { name: 'Dr. Sarah Johnson', role: 'Mathematics Teacher', subject: 'Mathematics' },
      { name: 'Prof. Michael Chen', role: 'Science Teacher', subject: 'Science' },
      { name: 'Ms. Emily Rodriguez', role: 'English Teacher', subject: 'English' },
      { name: 'Dr. Robert Williams', role: 'History Teacher', subject: 'History' },
      { name: 'Ms. Lisa Thompson', role: 'Art Teacher', subject: 'Art' }
    ];

    return teachers.map((teacher, index) => {
      const subject = performance.subjects.find((s: any) => s.subject === teacher.subject);
      const performanceLevel = subject ? subject.percentage : 85;
      
      let message = '';
      if (performanceLevel >= 90) {
        message = `${child.name} is doing excellent in ${teacher.subject}! Keep up the great work.`;
      } else if (performanceLevel >= 80) {
        message = `${child.name} is performing well in ${teacher.subject}. Some areas for improvement.`;
      } else {
        message = `${child.name} needs additional support in ${teacher.subject}. Let's discuss strategies.`;
      }

      return {
        id: index + 1,
        name: teacher.name,
        role: teacher.role,
        avatar: '',
        initials: teacher.name.split(' ').map(n => n[0]).join(''),
        online: Math.random() > 0.5,
        lastMessage: `${Math.floor(Math.random() * 7) + 1}d ago`,
        unread: Math.random() > 0.7,
        archived: Math.random() > 0.8,
        chat: [
          { from: teacher.name, text: message, time: `${Math.floor(Math.random() * 7) + 1}d ago` },
          { from: 'You', text: 'Thank you for the update!', time: `${Math.floor(Math.random() * 7) + 1}d ago` },
        ],
      };
    });
  };

  const mockMessages = generateMessages();

  const filterMessages = () => {
    let filtered = mockMessages;
    if (selectedTab === 'Unread') filtered = filtered.filter(m => m.unread);
    if (selectedTab === 'Archived') filtered = filtered.filter(m => m.archived);
    if (search) filtered = filtered.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
    return filtered;
  };

  const messages = filterMessages();

  // If a message is selected, show the chat screen only
  if (selectedMessage) {
    return (
      <main className="flex-1 pt-8 pb-8 min-h-screen bg-gray-50 w-full">
        <div className="flex mb-8">
          <button className="mr-4" onClick={() => setSelectedMessage(null)}>&larr;</button>
          {selectedMessage.avatar ? (
            <img src={selectedMessage.avatar} alt={selectedMessage.name} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-base font-bold text-gray-700">
              {selectedMessage.initials}
            </div>
          )}
          <div className="ml-3">
            <div className="font-semibold text-lg">{selectedMessage.name}</div>
            <div className="text-xs text-gray-500">{selectedMessage.role}</div>
          </div>
        </div>
        <div className="mb-6 w-full">
          <div className="space-y-4">
            {selectedMessage.chat.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-xl ${msg.from === 'You' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs text-gray-400 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 w-full">
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm bg-gray-100 focus:outline-none"
            placeholder="Type a message..."
          />
          <button className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800">Send</button>
        </div>
      </main>
    );
  }

  // Otherwise, show the message list
  return (
    <main className="flex-6 pt-8 pb-8 min-h-screen bg-gray-50 w-full ">
      <div className="flex items-center justify-between mb-2 w-full">
        <div>
          <h1 className="text-3xl font-bold">Inbox</h1>
          <p className="text-gray-500 text-base mt-1">Manage your messages with teachers and staff</p>
        </div>
      </div>
      <input
        className="w-full rounded-md border px-4 py-2 text-sm bg-white mb-4"
        placeholder="Search messages"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex border-b mb-4 w-full">
        {['All', 'Unread', 'Archived'].map(tab => (
          <button
            key={tab}
            className={`flex-1 py-2 text-center font-medium text-base ${selectedTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="w-full">
        {messages.map(msg => (
          <div
            key={msg.id}
            className="flex items-center gap-4 py-4 border-b hover:bg-gray-100 cursor-pointer w-full"
            onClick={() => setSelectedMessage(msg)}
          >
            {msg.avatar ? (
              <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                {msg.initials}
              </div>
            )}
            <div className="flex-1">
              <div className="font-semibold text-base flex items-center gap-2">
                {msg.name}
                {msg.online && <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />}
              </div>
              <div className="text-xs text-gray-500">{msg.role}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">{msg.lastMessage}</span>
              {msg.unread && <span className="w-2 h-2 bg-black rounded-full mt-1" />}
            </div>
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-10">No messages found.</div>
        )}
      </div>
    </main>
  );
};

export default MessagesPage; 
