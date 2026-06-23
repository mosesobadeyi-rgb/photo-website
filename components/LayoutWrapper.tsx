"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./Header";
import NavOverlay from "./NavOverlay";
import Footer from "./Footer";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(1);

  // Removed pathname progress jump to allow natural smooth count to 100%

  // Loading progress interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Larger incremental steps for a jumpy, fast loading progress
          const diff = Math.floor(Math.random() * 20) + 10;
          return Math.min(prev + diff, 100);
        });
      }, 40);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Trigger close transition when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // Global click interceptor for page transition animation
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }
      
      if (target && target.tagName === "A") {
        const href = target.getAttribute("href");
        const isExternal = 
          target.getAttribute("target") === "_blank" || 
          href?.startsWith("http") || 
          href?.startsWith("mailto:") || 
          href?.startsWith("tel:");
        
        if (href && !isExternal && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
          const currentPath = window.location.pathname;

          // Check if a path is one of the work archive genre filters
          const isGenrePath = (pathStr: string) => {
            let pathname = pathStr;
            try {
              const url = new URL(pathStr, window.location.origin);
              pathname = url.pathname;
            } catch (err) {
              // ignore
            }
            pathname = pathname.replace(/\/$/, "");
            const genrePaths = [
              "/work",
              "/work/portrait",
              "/work/editorial",
              "/work/fashion",
              "/work/documentary",
              "/work/travel",
              "/work/commercial"
            ];
            return genrePaths.includes(pathname);
          };

          const isTransitionBetweenGenres = isGenrePath(currentPath) && isGenrePath(href);

          if (href !== currentPath) {
            if (isTransitionBetweenGenres) {
              // Let Next.js handle navigation instantly without loading animation
              return;
            }

            e.preventDefault();
            
            // Close menu overlay if open
            setIsMenuOpen(false);
            
            // Show loader and trigger navigation
            setIsLoading(true);
            setProgress(1);
            
            setTimeout(() => {
              router.push(href);
            }, 300); // Short delay to let the preloader animation start
          }
        }
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, [router]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-accent text-white"
          >
            {/* Logo Wordmark in Center */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-extrabold text-[3.37rem] md:text-[5.06rem] tracking-tighter uppercase text-center"
            >
              Nathan Graphics
            </motion.h1>
            
            {/* Loading counter */}
            <div className="font-mono text-6xl md:text-8xl font-bold mt-12 tracking-tight">
              {progress}%
            </div>
            
            {/* Subtle bottom text */}
            <div className="absolute bottom-12 font-mono text-xs uppercase tracking-widest text-white/50">
              Loading Narrative
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Header onMenuOpen={() => setIsMenuOpen(true)} />
      <NavOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main className="flex-grow pt-16 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
