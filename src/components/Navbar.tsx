import Link from 'next/link';
import { Button } from "@/components/ui/button"; // We will install this next

export default function Navbar() {
  // TODO: Later, we will replace this with real Supabase Auth check
  const isLoggedIn = false; 

  return (
    <nav className="border-b bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-900">
          EduInstitute
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About Us</Link>
          <Link href="/pricing" className="hover:text-blue-600">Plans</Link>
        </div>

        {/* Dynamic Buttons (The Bridge) */}
        <div className="flex gap-3">
          {isLoggedIn ? (
            // If Logged In: Show Dashboard Button
            <Link href="/student/dashboard">
               <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            // If Visitor: Show Login/Signup
            <>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/pricing">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}