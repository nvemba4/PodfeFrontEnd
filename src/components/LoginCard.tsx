'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './ui/select';
import ForgotPasswordCard from './ForgotPasswordCard';
import SignUpCard from './SignUpCard';

interface LoginCardProps {
  onLogin?: () => void;
}

const LoginCard = ({ onLogin }: LoginCardProps) => {
  const [showForgot, setShowForgot] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  if (showForgot) {
    return <ForgotPasswordCard onBackToLogin={() => setShowForgot(false)} />;
  }

  if (showSignUp) {
    return <SignUpCard onBackToLogin={() => setShowSignUp(false)} />;
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-100">
      {/* School Logo */}
      <div className="mb-4 flex flex-col items-center">
        <Image
          src="/trademarks/wordmark-dark.svg"
          alt="School Logo"
          width={120}
          height={40}
          priority
          className="animate-bounce-slow"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-center">Welcome Back!</h2>
      <p className="text-gray-500 mb-6 text-center">Sign in to continue to SchoolConnect.</p>
      <form className="w-full flex flex-col gap-4" onSubmit={e => { e.preventDefault(); if (onLogin) onLogin(); }}>
        <div>
          <Label htmlFor="login-identifier">Username or Email</Label>
          <Input id="login-identifier" type="text" placeholder="Enter your username or email" autoComplete="username" className="focus-visible:ring-neutral-400 focus-visible:border-neutral-400" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" autoComplete="current-password" className="focus-visible:ring-neutral-400 focus-visible:border-neutral-400" />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="form-checkbox accent-blue-600" /> Remember Me
          </label>
          <button
            type="button"
            onClick={() => setShowForgot(true)}
            className="text-sm text-blue-600 hover:underline bg-transparent border-none p-0 m-0"
          >
            Forgot your password?
          </button>
        </div>
        <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105 animate-pulse-once">Login</Button>
      </form>
      <div className="mt-6 w-full">
        <Label htmlFor="language">Language</Label>
        <Select>
          <SelectTrigger id="language" className="mt-1 focus-visible:ring-neutral-400 focus-visible:border-neutral-400">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt">Português</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LoginCard;

// Add animation classes to globals.css:
// .animate-bounce-slow { animation: bounce 2.5s infinite; }
// .animate-pulse-once { animation: pulse 0.7s 1; } 