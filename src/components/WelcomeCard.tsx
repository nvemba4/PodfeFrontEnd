import React, { useState } from 'react';
import SchoolConnectNavbar from './layout/SchoolConnectNavbar';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

const roles = [
  {
    label: 'Parent',
    description: "Access your child's academic progress, attendance, and communicate with teachers.",
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    icon: '🎓',
  },
  {
    label: 'Teacher',
    description: 'Manage your classes, track student performance, and communicate with parents.',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80',
    icon: '👩‍🏫',
  },
  {
    label: 'Admin',
    description: 'Oversee school operations, manage staff, and access comprehensive analytics.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    icon: '👨‍💼',
  },
];

interface WelcomeCardProps {
  onParentSelect?: () => void;
}

const WelcomeCard = ({ onParentSelect }: WelcomeCardProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (selected === 'Parent' && onParentSelect) onParentSelect();
    // Add logic for Teacher/Admin as needed
  };

  return (
    <>
      <SchoolConnectNavbar />
      <div className="min-h-screen flex flex-col justify-center items-center pt-30 px-2 mb-18">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-black">Welcome, Alex!</h1>
        <p className="text-lg text-gray-700 text-center mb-10">Please select your role to continue.</p>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center mb-8">
          {roles.map((role) => (
            <div
              key={role.label}
              className={`relative rounded-xl overflow-hidden shadow-lg flex-1 min-w-[260px] max-w-xs h-80 cursor-pointer group transition-transform hover:scale-105 bg-white/10 ${selected === role.label ? 'ring-4 ring-blue-400' : ''}`}
              style={{ backgroundImage: `url(${role.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              onClick={() => setSelected(role.label)}
            >
              {/* Check mark icon */}
              {selected === role.label && (
                <span className="absolute top-4 right-4 z-20 bg-white rounded-full p-1 shadow flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#22c55e" className="w-6 h-6">
                    <circle cx="12" cy="12" r="11" fill="white" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4 4 8-8" />
                  </svg>
                </span>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full justify-end p-6">
                <span className="text-3xl mb-2 drop-shadow-lg">{role.icon}</span>
                <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{role.label}</h2>
                <p className="text-gray-200 text-sm mb-2 drop-shadow-lg">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Button
            className="w-40 text-lg font-semibold bg-black text-white hover:bg-neutral-800"
            disabled={!selected}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default WelcomeCard; 