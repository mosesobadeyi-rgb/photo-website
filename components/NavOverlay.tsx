"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface NavOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Contact", href: "/contact" },
];

export default function NavOverlay({ isOpen, onClose }: NavOverlayProps) {
  // Close menu on ESC key press & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const overlayVariants: Variants = {
    closed: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const listVariants: Variants = {
    closed: {
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      y: 40,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          className="fixed inset-0 z-50 bg-background flex flex-col justify-between p-6 md:p-12 w-full h-full"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Overlay"
        >
          {/* Header row in Overlay */}
          <div className="flex items-center justify-between w-full">
            <span className="font-display font-extrabold text-xl tracking-tighter text-white">
              N.G
            </span>
            <button
              onClick={onClose}
              className="font-mono text-xs tracking-widest text-white hover:text-accent focus:text-accent transition-colors duration-300 uppercase cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              CLOSE (X)
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col items-start justify-center flex-grow">
            <motion.ul
              variants={listVariants}
              className="flex flex-col space-y-4 md:space-y-6"
            >
              {navItems.map((item) => (
                <motion.li key={item.label} variants={itemVariants} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-display font-extrabold text-5xl md:text-8xl tracking-tight text-white hover:text-accent focus:text-accent transition-colors duration-300 block uppercase"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          {/* Footer of Menu */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-t border-white/10 pt-8 w-full gap-6">
            <div className="flex flex-col space-y-2">
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                Direct Inquiries
              </span>
              <a
                href="mailto:studio@nathangraphics.com"
                className="font-sans text-sm text-white hover:text-accent focus:text-accent transition-colors duration-300"
              >
                studio@nathangraphics.com
              </a>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                  Instagram
                </span>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white hover:text-accent focus:text-accent transition-colors duration-300"
                >
                  @nathangraphics
                </a>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                  Behance
                </span>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-white hover:text-accent focus:text-accent transition-colors duration-300"
                >
                  nathan-graphics
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
