'use client';

import * as React from 'react';
import Link from 'next/link';
import { Home, Building2, FileText, Briefcase, Info, HelpCircle, PhoneCall } from 'lucide-react';
import { Button } from '@/components/common/Button';

export function Navbar() {
  const navItems = [
    { name: 'Home', href: '/', icon: Home, color: 'text-orange-400' },
    { name: 'Properties', href: '/public-properties', icon: Building2, color: 'text-emerald-400' },
    { name: 'Blog', href: '/public-blogs', icon: FileText, color: 'text-blue-400' },
    { name: 'Career', href: '#', icon: Briefcase, color: 'text-amber-700' },
    { name: 'About Us', href: '#', icon: Info, color: 'text-blue-300' },
    { name: 'Get Help', href: '#', icon: HelpCircle, color: 'text-yellow-400' },
  ];

  return (
    <nav className="bg-[#131127] text-white border-b border-white/10 relative z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Rising<span className="text-purple-300">Roof</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="flex items-center gap-2 hover:text-purple-300 transition-colors">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <Button className="bg-[#c285d6] hover:bg-[#b070c7] text-[#3b1c4e] font-semibold rounded-full px-6 transition-transform hover:scale-105 active:scale-95">
              <PhoneCall className="w-4 h-4 mr-2" />
              Book Consultation
            </Button>
            <div className="flex items-center gap-2 font-medium text-purple-200">
              <PhoneCall className="w-4 h-4 text-pink-500" />
              +91 84593 21228
            </div>
          </div>
          
          {/* Mobile menu button (placeholder) */}
          <div className="lg:hidden flex items-center">
            <button className="text-white hover:text-purple-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
