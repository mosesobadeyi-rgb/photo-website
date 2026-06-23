"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  onMenuOpen: () => void;
}

export default function Header({ onMenuOpen }: HeaderProps) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos", // LOS (Lagos, UTC+1)
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      
      try {
        const formatter = new Intl.DateTimeFormat("en-GB", options);
        setTime(formatter.format(new Date()));
      } catch (e) {
        // Fallback if timezone not supported
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        setTime(`${hrs}:${mins}`);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check scroll position immediately
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-40 py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
      isScrolled 
        ? "bg-black/40 backdrop-blur-md" 
        : "bg-transparent backdrop-blur-none"
    }`}>
      <Link 
        href="/" 
        className="font-display font-extrabold text-xl tracking-tighter text-white hover:text-accent focus:text-accent transition-colors duration-300 z-10"
        title="Nathan Graphics Home"
      >
        N.G
      </Link>

      <span 
        className="absolute left-1/2 transform -translate-x-1/2 font-mono font-bold text-sm text-white tracking-widest pointer-events-none select-none z-10 whitespace-nowrap"
        aria-live="polite"
        aria-label={`Studio Local Time: LOS ${time || "12:00"}`}
      >
        LOS, {time || "12:00"}
      </span>
      
      <button
        onClick={onMenuOpen}
        className="font-mono text-xs tracking-widest text-white hover:text-accent focus:text-accent transition-colors duration-300 uppercase cursor-pointer z-10"
        aria-label="Open Navigation Menu"
      >
        MENU
      </button>
    </header>
  );
}
