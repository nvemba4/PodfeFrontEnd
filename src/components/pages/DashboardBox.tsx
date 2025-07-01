import React, { useState } from 'react';
import Inbox from '../Inbox';
import { Mail, Home, Users, Settings } from 'lucide-react';

const menuItems = [
  { label: 'Home', icon: <Home className="w-5 h-5" /> },
  { label: 'Inbox', icon: <Mail className="w-5 h-5" /> },
  { label: 'Users', icon: <Users className="w-5 h-5" /> },
  { label: 'Settings', icon: <Settings className="w-5 h-5" /> },
];

const DashboardBox = ({ children }: { children?: React.ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState('Home');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col py-6 px-4 min-h-screen">
        <div className="mb-8">
          <div className="text-2xl font-bold text-gray-900 leading-tight">SchoolConnect</div>
          <div className="text-sm text-gray-500">Parent Portal</div>
        </div>
        <nav className="flex flex-col gap-1">
          {menuItems.map(item => (
            <button
              key={item.label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeMenu === item.label ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              onClick={() => setActiveMenu(item.label)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeMenu === 'Inbox' ? <Inbox /> : children}
      </main>
    </div>
  );
};

export default DashboardBox; 