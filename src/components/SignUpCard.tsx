import React from 'react';
import Image from 'next/image';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { signIn } from 'next-auth/react';

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <g clipPath="url(#clip0_993_156)">
      <path d="M19.805 10.2305C19.805 9.55078 19.7492 8.86719 19.6292 8.19922H10.2V12.0508H15.6012C15.3775 13.2734 14.6375 14.332 13.6012 15.0258V17.2758H16.6012C18.4012 15.6258 19.805 13.2305 19.805 10.2305Z" fill="#4285F4"/>
      <path d="M10.2 20C12.7 20 14.8012 19.1914 16.6012 17.2758L13.6012 15.0258C12.6012 15.7258 11.4012 16.1258 10.2 16.1258C7.80125 16.1258 5.80125 14.457 5.10125 12.3008H2V14.6258C3.80125 17.9258 6.80125 20 10.2 20Z" fill="#34A853"/>
      <path d="M5.10125 12.3008C4.80125 11.5781 4.60125 10.7891 4.60125 10C4.60125 9.21094 4.80125 8.42188 5.10125 7.69922V5.375H2C1.40125 6.57812 1.00125 8.21094 1.00125 10C1.00125 11.7891 1.40125 13.4219 2 14.6258L5.10125 12.3008Z" fill="#FBBC05"/>
      <path d="M10.2 3.875C11.5012 3.875 12.7012 4.33203 13.6012 5.17578L16.7012 2.07422C14.8012 0.332031 12.7 0 10.2 0C6.80125 0 3.80125 2.07422 2 5.375L5.10125 7.69922C5.80125 5.54297 7.80125 3.875 10.2 3.875Z" fill="#EA4335"/>
    </g>
    <defs>
      <clipPath id="clip0_993_156">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
    <path d="M16.365 10.625c-.02-2.125 1.74-3.137 1.82-3.187-1-1.438-2.555-1.637-3.105-1.662-1.32-.137-2.58.77-3.25.77-.67 0-1.7-.75-2.8-.729-1.44.021-2.77.84-3.51 2.137-1.5 2.604-.38 6.458 1.08 8.57.72 1.021 1.58 2.166 2.71 2.125 1.09-.042 1.5-.687 2.81-.687 1.31 0 1.67.687 2.81.666 1.16-.021 1.89-1.042 2.6-2.062.82-1.188 1.16-2.344 1.18-2.406-.03-.021-2.26-.875-2.28-3.479zm-2.14-6.646c.59-.729.99-1.75.88-2.779-.85.035-1.88.563-2.49 1.271-.55.625-1.03 1.646-.85 2.604.9.073 1.83-.458 2.46-1.096z" fill="#111"/>
  </svg>
);

const SignUpCard = ({ onBackToLogin }: { onBackToLogin?: () => void }) => (
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-gray-100">
    {/* Logo */}
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
    {/* Title & Subtitle */}
    <h2 className="text-2xl font-bold mb-1 text-center">Create Account</h2>
    <p className="text-gray-500 mb-6 text-center">Sign up to get started with SchoolConnect.</p>
    {/* Social Sign Up Buttons */}
    <div className="w-full flex flex-col gap-3 mb-6">
      <Button variant="outline" className="w-full flex items-center justify-center font-semibold" onClick={() => signIn('google')}>
        <GoogleIcon /> Sign up with Google
      </Button>
      <Button variant="outline" className="w-full flex items-center justify-center font-semibold" onClick={() => signIn('apple')}>
        <AppleIcon /> Sign up with Apple
      </Button>
    </div>
    {/* Divider */}
    <div className="flex items-center w-full mb-6">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="mx-3 text-gray-400 text-sm">or</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
    {/* Form Fields */}
    <form className="w-full flex flex-col gap-4 mb-2">
      <div>
        <Label htmlFor="signup-name">Full Name</Label>
        <Input id="signup-name" type="text" placeholder="Your Name" autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="signup-email">Email Address</Label>
        <Input id="signup-email" type="email" placeholder="you@example.com" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="signup-password">Password</Label>
        <Input id="signup-password" type="password" placeholder="Create a password" autoComplete="new-password" />
      </div>
      <div>
        <Label htmlFor="signup-confirm">Confirm Password</Label>
        <Input id="signup-confirm" type="password" placeholder="Confirm your password" autoComplete="new-password" />
      </div>
      <Button type="submit" className="w-full transition-transform duration-200 hover:scale-105 animate-pulse-once mt-2">Sign Up</Button>
    </form>
    {/* Back to Login Link */}
    <div className="mt-2 w-full text-center">
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

export default SignUpCard; 