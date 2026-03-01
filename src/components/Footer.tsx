"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Mail, Phone, Instagram, MessageCircle, Facebook, Youtube, Copy, Check } from "lucide-react";

export default function Footer() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-16 px-4 border-t border-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Ruhani Online Education
            </h3>
            <p className="text-blue-400 font-medium">Road to Success</p>
            <p className="text-sm leading-relaxed text-slate-400">
              Making Mathematics simple, logical, and engaging for American students in Grades 6-10. Overcome the fear of math with personalized online tutoring.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400 transition-colors text-sm">
                  Plans & Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Support & Contact</h4>
            <ul className="space-y-5">

              {/* Phone Section */}
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                <div className="text-sm w-full max-w-[200px]">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium">Phone / WhatsApp</p>
                    <button
                      onClick={() => handleCopy('+919220517057', 'phone')}
                      className="text-slate-500 hover:text-blue-400 transition-colors"
                      title="Copy Phone Number"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <a href="https://wa.me/919220517057" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors block">
                    +91 92205 17057
                  </a>
                </div>
              </li>

              {/* Email Section */}
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-blue-500 mr-3 shrink-0 mt-0.5" />
                <div className="text-sm w-full max-w-[200px]">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-white font-medium">Email Address</p>
                    <button
                      onClick={() => handleCopy('roedinfo@gmail.com', 'email')}
                      className="text-slate-500 hover:text-blue-400 transition-colors"
                      title="Copy Email Address"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <a href="mailto:roedinfo@gmail.com" className="hover:text-blue-400 transition-colors block">
                    roedinfo@gmail.com
                  </a>
                </div>
              </li>

              {/* Support Hours */}
              <li className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 inline-block mt-2">
                <p className="text-xs text-slate-400">Support Hours:</p>
                <p className="text-sm text-white font-medium">5:00 PM – 10:00 PM IST</p>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect & QR Code */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Connect With Us</h4>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://www.instagram.com/roedofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 hover:text-white transition-all text-slate-400"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919220517057"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-green-500 hover:text-white transition-all text-slate-400"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#" // TODO: Add Facebook Link here
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-400"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#" // TODO: Add YouTube Link here
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all text-slate-400"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* WhatsApp QR Code */}
            <div className="bg-white p-2 rounded-xl inline-block text-center border-4 border-slate-700 shadow-lg">
              <div className="relative w-28 h-28 bg-white rounded-lg overflow-hidden flex items-center justify-center">
                <Image
                  src="/Rohani Online Education Center.png"
                  alt="WhatsApp QR Code"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-500 block mt-1 tracking-wider">SCAN TO CHAT</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Ruhani Online Education. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/policy/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="/policy/refund-policy" className="hover:text-blue-400 transition-colors">Refund Policy</Link>
            <Link href="/policy/user-policy" className="hover:text-blue-400 transition-colors">User Policy</Link>
            <Link href="/policy/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
            <Link href="/policy/disclaimer" className="hover:text-blue-400 transition-colors">Disclaimer</Link>
            <Link href="/policy/limitation-of-liability" className="hover:text-blue-400 transition-colors">Liability</Link>
            <Link href="/policy/cancellation-rescheduling" className="hover:text-blue-400 transition-colors">Cancellation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}