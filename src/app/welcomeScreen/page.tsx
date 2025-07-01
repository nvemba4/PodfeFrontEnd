import React from 'react';
import LoginCard from '../../components/LoginCard';

export default function WelcomeScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-700">SchoolConnect</span>
        </div>
        <nav className="flex gap-8">
          <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
          <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
        </nav>
      </header>

      {/* Centered Login Card */}
      <main className="flex-1 flex items-center justify-center">
        <LoginCard />
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-gray-400 text-sm">
        © 2023 SchoolConnect. All rights reserved.
      </footer>
    </div>
  );
}
