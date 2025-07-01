'use client';

import '../styles/globals.css'
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { MallConnectNavbar } from '@/components/layout/MallConnectNavbar';
import BannerCarousel from "@/components/BannerCarousel";

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
 const [darkMode, setDarkMode] = useState(false);
   useEffect(() => {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (

     <html>
    <body>
       <MallConnectNavbar />
      
       {pathname !== '/' && <div className="h-12" />}
       <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
    </body>
  </html>
    
  );
}
