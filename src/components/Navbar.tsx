"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import React from 'react';
import { getSession, logout } from "@/app/actions/auth";
import Image from 'next/image';

export default function Navbar() {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const checkUser = async () => {
      const user = await getSession();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="border-b bg-white p-4">
      {/* Added 'relative' to the container so absolute positioning works inside it */}
      <div className="container mx-auto flex items-center justify-between relative">
        
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image 
            src="/logo 22.png"
            alt="Ruhani Online Education Logo" 
            width={40} 
            height={40} 
            className="h-8 md:h-10 w-auto object-contain" 
            priority
          />
          <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 hidden sm:block">
            Ruhani Online Education
          </span>
        </Link>

        {/* Navigation Links - PERFECTLY CENTERED */}
        {/* Absolute positioning locks it to the exact center of the screen */}
        <div className="hidden md:flex gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors">Plans</Link>
        </div>

        {/* Dynamic Buttons (The Bridge) */}
        <div className="flex gap-3 relative z-10">
          {user ? (
            // If Logged In: Show Dashboard Button and Logout
            <div className="flex gap-2">
              <Link href="/student/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            // If Visitor: Show Login/Signup
            <>
              <Link href="/login">
                <Button variant="outline" className="hidden sm:inline-flex">Login</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}