// app/components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 font-sans ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-200/70"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="flex-shrink-0">
              <Image
                src="/gdg-logo.jpeg"
                alt="GDG on Campus Logo"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 transition-transform duration-300 ease-in-out group-hover:rotate-12"
              />
            </div>
            
            <div className="flex flex-col text-left">
              <h1 className="text-xl sm:text-2xl font-medium text-gray-700">
                <span className="font-bold text-[#4285F4]">G</span>
                <span className="font-bold text-[#EA4335]">D</span>
                <span className="font-bold text-[#FBBC05]">G</span>
                <span className="text-gray-600"> on Campus</span>
              </h1>
              <p className="text-sm text-gray-500">
                Vignan's Institute of Information Technology
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}