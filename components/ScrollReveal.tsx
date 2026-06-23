"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && shouldReduceMotion) {
    return <>{children}</>;
  }

  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom premium easeOutExpo curve
      }}
    >
      {children}
    </motion.div>
  );
}
