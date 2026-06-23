"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer 
      className="w-full pt-12 pb-12 px-6 md:px-12 mt-auto relative overflow-hidden"
      style={{
        backgroundImage: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E"),
          radial-gradient(circle at 50% 100%, #E03E1D 0%, rgba(224, 62, 29, 0.45) 25%, rgba(224, 62, 29, 0.15) 50%, #0D0D0D 85%)
        `,
      }}
    >
      {/* Dynamic Hanging ID Card / Lanyard Badge (Right Side) */}
      <motion.div 
        className="absolute top-0 right-6 md:right-16 lg:right-24 z-20 flex flex-col items-center pointer-events-auto origin-top"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ 
          y: 10,
          rotate: -2.5,
          transition: { type: "spring", stiffness: 100, damping: 10 }
        }}
      >
        {/* Lanyard Strap */}
        <div className="w-3 h-16 md:w-3.5 md:h-24 bg-neutral-950 border-x border-white/10 relative shadow-md">
          {/* Logo / detail at the top of the strap */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-white/10 rounded-sm" />
        </div>
        
        {/* Metal ring/clip */}
        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-white/20 bg-neutral-900 shadow-md -mt-1 z-10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
        </div>
        
        {/* Metal hook connecting ring to card */}
        <div className="w-0.5 h-2 md:w-1 md:h-3.5 bg-neutral-500 shadow-sm z-10 -mt-0.5" />
        
        {/* Vertical Card */}
        <div className="w-[140px] h-[190px] md:w-[220px] md:h-[300px] bg-neutral-950 border border-white/10 rounded-xl md:rounded-2xl p-1.5 md:p-2.5 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] -mt-1 relative bg-gradient-to-b from-neutral-900 to-neutral-950">
          {/* Card Top Brand Name */}
          <div className="text-center font-sans font-black text-[8px] md:text-[10px] tracking-[0.2em] text-white/95 uppercase pb-1 md:pb-1.5">
            nathan
          </div>
          
          {/* Main Photo area */}
          <div className="relative flex-grow rounded-lg md:rounded-xl overflow-hidden bg-neutral-900 border border-white/5">
            <Image 
              src="/images/chroma-1.webp" 
              alt="Nathan Graphics Portfolio Work"
              fill 
              sizes="(max-width: 768px) 140px, 220px"
              className="object-cover"
              priority
            />
            {/* Subtle holographic sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 mix-blend-overlay pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* 3-Column Navigation Grid matching reference layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 text-sm font-sans font-normal text-white/60 lowercase pt-0 pb-36">
        
        {/* Column 1 */}
        <div className="flex flex-col space-y-2.5">
          <Link href="/studio" className="hover:text-white transition-colors duration-250">manifesto</Link>
          <Link href="/work" className="hover:text-white transition-colors duration-250">showcase</Link>
          <a href="mailto:studio@nathangraphics.com" className="hover:text-white transition-colors duration-250">contact</a>
          <div className="h-6" />
          <Link href="/studio" className="hover:text-white transition-colors duration-250">about</Link>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col space-y-2.5">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-250">youtube</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-250">instagram</a>
          <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-250">behance</a>
          <div className="h-6" />
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-250">linkedin</a>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col space-y-2.5 col-span-2 md:col-span-1">
          <Link href="/imprint" className="hover:text-white transition-colors duration-250">imprint</Link>
          <Link href="/privacy" className="hover:text-white transition-colors duration-250">privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors duration-250">terms</Link>
          <div className="h-6" />
          <span className="text-white/30 hover:text-white/40 transition-colors cursor-default">© {new Date().getFullYear()} nathan graphics</span>
        </div>

      </div>

      {/* Massive Typography Wordmark sitting at the bottom of the container */}
      <div className="w-full select-none pt-16 pb-0 overflow-hidden">
        <div className="text-[9vw] font-display font-bold text-white text-center tracking-tighter leading-none uppercase whitespace-nowrap">
          nathan graphics
        </div>
      </div>
    </footer>
  );
}
