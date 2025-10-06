// app/components/Header.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" 
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 sm:h-20">
          <div className="flex items-center space-x-3">
            {/* GDG Logo - replace with your actual logo */}
            <div className="flex-shrink-0">
              <Image
                src="/gdg-logo.jpeg" // Replace with your GDG on Campus logo
                alt="GDG on Campus"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
              />
            </div>
            
            {/* Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                <span className="text-[#4285f4]">GDG</span> on Campus
              </h1>
              <span className="hidden sm:block text-gray-400">•</span>
              <p className="text-sm sm:text-base text-gray-600 font-medium">
                Vignan's Institute of Information Technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
