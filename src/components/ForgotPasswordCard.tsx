import React from 'react';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

const ForgotPasswordCard = ({ onBackToLogin }: { onBackToLogin?: () => void }) => (
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
    <h2 className="text-2xl font-bold mb-2 text-center">Forgot Password?</h2>
    <p className="text-gray-500 mb-6 text-center">Enter your email address and we'll send you a link to reset your password.</p>
    <form className="w-full flex flex-col gap-4">
      <div>
        <Label htmlFor="forgot-email">Email Address</Label>
        <Input id="forgot-email" type="email" placeholder="you@example.com" autoComplete="email" className="focus-visible:ring-neutral-400 focus-visible:border-neutral-400" />
      </div>
      <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105 animate-pulse-once">Send Reset Link</Button>
    </form>
    <div className="mt-6 w-full text-center">
      <button
        type="button"
        onClick={onBackToLogin}
        className="text-blue-600 hover:underline text-sm"
      >
        &larr; Back to Login
      </button>
    </div>
  </div>
);

export default ForgotPasswordCard; 