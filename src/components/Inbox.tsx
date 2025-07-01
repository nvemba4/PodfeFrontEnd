'use client';
import React, { useState } from 'react';

const mockMessages = [
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
  },
  {
    id: 3,
    name: 'Dr. Smith',
    role: 'Principal',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    initials: '',
    online: true,
    lastMessage: '2w ago',
    unread: false,
    archived: false,
  },
  {
    id: 4,
    name: 'Ms. Williams',
    role: 'History Teacher',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    initials: '',
    online: false,
    lastMessage: '3w ago',
    unread: true,
    archived: false,
  },
  {
    id: 5,
    name: 'Mr. Brown',
    role: 'English Teacher',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    initials: '',
    online: false,
    lastMessage: '1m ago',
    unread: false,
    archived: true,
  },
];

const TABS = ['All', 'Unread', 'Archived'];

const Inbox = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [search, setSearch] = useState('');

  const filterMessages = () => {
    let filtered = mockMessages;
    if (selectedTab === 'Unread') filtered = filtered.filter(m => m.unread);
    if (selectedTab === 'Archived') filtered = filtered.filter(m => m.archived);
    if (search) filtered = filtered.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
    return filtered;
  };

  const messages = filterMessages();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2 w-full gap-x-8 pl-8 pr-8">
        <div>
          <h1 className="text-3xl font-bold">Inbox</h1>
          <p className="text-gray-500 text-base mt-1">Manage your messages with teachers and staff</p>
        </div>
        <button className="bg-black text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800">+ New Message</button>
      </div>
      <input
        className="w-full rounded-md border px-4 py-2 text-sm bg-white mb-4 pl-8 pr-8"
        placeholder="Search messages"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="flex border-b mb-4 w-full pl-8 pr-8">
        {TABS.map(tab => (
          <button
            key={tab}
            className={`flex-1 py-2 text-center font-medium text-base ${selectedTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="w-full pl-8 pr-8">
        {messages.map(msg => (
          <div
            key={msg.id}
            className="flex items-center gap-4 py-4 border-b hover:bg-gray-100 cursor-pointer w-full"
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
    </div>
  );
};

export default Inbox; 