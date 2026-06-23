"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const carouselProjects = featuredProjects.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotionRaw = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [tvSrc, setTvSrc] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const img = document.createElement("img");
    img.src = "/images/retro_tv.png";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const pixelIndex = i / 4;
          const x = pixelIndex % canvas.width;
          const y = Math.floor(pixelIndex / canvas.width);
          
          // Remove the TV handle (top 21% of the canvas height)
          if (y < canvas.height * 0.21) {
            data[i + 3] = 0;
            continue;
          }

          // Screen cutout area coordinates (as percentages of TV frame size)
          const isScreenX = x >= canvas.width * 0.1426 && x <= canvas.width * (0.1426 + 0.5498);
          const isScreenY = y >= canvas.height * 0.2813 && y <= canvas.height * (0.2813 + 0.4502);

          if (isScreenX && isScreenY) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const maxVal = Math.max(r, g, b);
            
            // Clear dark screen pixels, preserve screen glare/reflections as semi-transparent
            if (maxVal < 80) {
              data[i + 3] = 0;
            } else {
              const ratio = (maxVal - 80) / (255 - 80);
              data[i + 3] = Math.round(ratio * 80); // soft reflection overlay
            }
            continue;
          }
          
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const maxVal = Math.max(r, g, b);
          if (maxVal < 24) {
            if (maxVal < 12) {
              data[i + 3] = 0;
            } else {
              const ratio = (maxVal - 12) / 12;
              data[i + 3] = Math.round(ratio * 255);
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setTvSrc(canvas.toDataURL("image/png"));
      }
    };
  }, []);

  const shouldReduceMotion = mounted ? shouldReduceMotionRaw : false;

  // Autoplay carousel
  useEffect(() => {
    if (!mounted || shouldReduceMotion) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselProjects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [carouselProjects.length, shouldReduceMotion, mounted]);

  return (
    <div className="w-full flex flex-col bg-background">
      {/* 1. Hero Section */}
      <section 
        className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-20 -mt-16 pt-24 pb-20 cursor-default"
        style={{
          background: "radial-gradient(circle at top, rgba(255, 94, 0, 0.32) 0%, rgba(22, 22, 22, 0) 50%), #161616"
        }}
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center space-y-8 md:space-y-10">
          
          {/* Hero Text */}
          <div className="flex flex-col justify-center items-center text-center z-25">
            <span className="font-mono text-accent text-xs md:text-sm uppercase tracking-widest block mb-3 md:mb-4">
              Visual Storytelling
            </span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="font-display font-extrabold text-[3.28rem] md:text-[5.23rem] lg:text-[6.56rem] leading-[1.05] text-white uppercase tracking-tight"
            >
              Nathan<br />Graphics<br />Studio
            </motion.h1>
            <span className="font-mono text-zinc-400 text-xs md:text-sm uppercase tracking-widest block mt-4">
              Based in Lagos
            </span>
          </div>

          {/* Retro CRT TV */}
          <div className="flex items-center justify-center w-full pb-12">
            <motion.div 
              animate={{
                scale: isHeroHovered && !shouldReduceMotion ? 1.03 : 1,
                y: isHeroHovered && !shouldReduceMotion ? -6 : 0,
                rotate: isHeroHovered && !shouldReduceMotion ? 0.6 : 0
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-[652px] md:max-w-[733px] lg:max-w-[733px] aspect-square z-10 flex items-center justify-center"
            >
              {/* Sleek Premium Console Shelf (Walnut Wood) */}
              <div 
                className="absolute w-[94%] h-[14px] bg-gradient-to-r from-[#2c201a] via-[#4a362c] to-[#2c201a] rounded border-t border-white/20 shadow-[0_12px_24px_rgba(0,0,0,0.8),_0_2px_4px_rgba(255,255,255,0.05)] z-5"
                style={{ bottom: "14.8%" }}
              >
                {/* Visual support wall brackets */}
                <div className="absolute left-[18%] top-[13px] w-[8px] h-[16px] bg-neutral-900 border-r border-b border-white/10 rounded-b shadow-md" />
                <div className="absolute right-[18%] top-[13px] w-[8px] h-[16px] bg-neutral-900 border-l border-b border-white/10 rounded-b shadow-md" />
              </div>
              {/* TV Frame and Screen Content */}
              <div className="relative w-full h-full flex items-center justify-center z-10">
                {/* Main TV Frame Asset */}
                <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
                  <Image
                    src={tvSrc || "/images/retro_tv.png"}
                    alt="Retro TV Frame"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Screen Content Wrapper: Absolutely positioned to fit precisely in the TV's screen cutout */}
                {/* The screen cutout in the retro_tv.png is scanned at left: 14.26%, top: 28.13%, width: 54.98%, height: 45.02% */}
                <div className="absolute left-[14.26%] top-[28.13%] w-[54.98%] h-[45.02%] overflow-hidden bg-black rounded-[8%] z-10">
                  {/* Curved CRT shadow overlay to give 3D depth to the screen */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none z-30 mix-blend-multiply" />
                  
                  {/* Subtle CRT scanline animation overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-30 opacity-[0.08]"
                    style={{
                      backgroundImage: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                      backgroundSize: "100% 4px, 6px 100%"
                    }}
                  />

                  <AnimatePresence mode="wait">
                    {carouselProjects.map((project, idx) => {
                      if (idx !== currentSlide) return null;
                      return (
                        <motion.div
                          key={project.slug}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }}
                          className="absolute inset-0 w-full h-full group"
                        >
                          <Link href={`/work/${project.slug}`} className="block w-full h-full relative cursor-pointer focus:outline-none">
                            {/* Media Display inside Screen (Photos Only) */}
                            {(() => {
                              const displayImage = project.images.find(img => img.aspect.includes('16/9') || img.aspect.includes('3/2') || img.aspect.includes('4/3')) || project.images[0];
                              return (
                                <div className="w-full h-full overflow-hidden bg-zinc-950 relative">
                                  <Image
                                    src={displayImage.src}
                                    alt={displayImage.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.04] scale-[1.02]"
                                    priority
                                  />
                                  {/* Dynamic CRT phosphorus screen reflection/glow */}
                                  <div className="absolute inset-0 bg-accent/5 mix-blend-color z-20 pointer-events-none" />
                                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500 z-10" />
                                </div>
                              );
                            })()}

                            {/* Hover Overlay Meta */}
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-25">
                              <div className="flex justify-between items-end border-b border-white/20 pb-2">
                                <div>
                                  <span className="font-mono text-[8px] text-accent uppercase tracking-widest block mb-0.5">
                                    {project.genre}
                                  </span>
                                  <h2 className="font-display font-extrabold text-lg md:text-xl tracking-tight text-white uppercase leading-none">
                                    {project.title}
                                  </h2>
                                </div>
                                <div className="text-right">
                                  <span className="font-mono text-[9px] text-muted block">
                                    {project.client}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Static Title for Mobile Touchscreens */}
                            <div className="absolute bottom-2 left-2 bg-black/75 px-2 py-1 pointer-events-none md:hidden z-25">
                              <p className="font-mono text-[8px] text-accent tracking-widest uppercase">{project.genre}</p>
                              <p className="font-display font-extrabold text-[10px] text-white uppercase">{project.title}</p>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Carousel Indicators on the Bottom */}
              <div className="absolute bottom-[-25px] left-0 w-full flex justify-between items-center z-30 px-6 font-mono text-[10px] md:text-xs">
                <span className="text-muted">
                  CHANNEL {String(currentSlide + 1).padStart(2, "0")} / {String(carouselProjects.length).padStart(2, "0")}
                </span>
                <div className="flex space-x-3">
                  {carouselProjects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-6 h-[2px] transition-colors duration-300 ${
                        idx === currentSlide ? "bg-accent" : "bg-white/20"
                      } cursor-pointer`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. Manifesto Line */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col items-end text-right space-y-8">
            <p className="font-display font-extrabold text-3xl md:text-6xl lg:text-7xl leading-tight md:leading-[1.1] uppercase tracking-tight text-white max-w-5xl text-right">
              We capture the space between noise and stillness—crafting cinematic imagery that tells stories beyond words.
            </p>
            <div>
              <Link
                href="/studio"
                className="font-mono text-sm tracking-widest uppercase text-white hover:text-accent focus:text-accent transition-colors duration-300 inline-block border-b-2 border-accent pb-1"
              >
                Read Manifesto & Practice
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. Recent Projects Grid */}
      <section className="w-full py-16 md:py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 border-b border-white/10 pb-6">
            <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter text-white">
              Featured Case Studies
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs tracking-widest text-muted hover:text-accent transition-colors uppercase"
            >
              View All Works ({projects.length}) →
            </Link>
          </div>

          {/* Grid: 3 col desktop, 2 col tablet, 1 col mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 items-start">
            {featuredProjects.slice(0, 6).map((project, idx) => {
              const aspectClass = idx === 0 || idx === 4 ? "aspect-[3/4]" : "aspect-[3/2]";
              return (
                <ScrollReveal key={project.slug} delay={idx * 0.1}>
                  <div className="flex flex-col space-y-4 group">
                    <Link href={`/work/${project.slug}`} className={`block overflow-hidden bg-white/5 relative ${aspectClass} focus:outline-none rounded-2xl`}>
                      <Image
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                      
                      {/* Hover detail overlay for desktop */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="font-mono text-xs tracking-widest text-white uppercase border border-white/20 px-4 py-2">
                          View Narrative
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-col space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-display font-bold text-lg text-white uppercase tracking-tight">
                          <Link href={`/work/${project.slug}`} className="hover:text-accent focus:text-accent transition-colors duration-300">
                            {project.title}
                          </Link>
                        </h3>
                        <span className="font-mono text-[9px] text-muted tracking-widest uppercase">
                          {project.year}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline font-mono text-[10px] text-muted uppercase">
                        <span>{project.client}</span>
                        <span className="text-accent">{project.genre}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Closing CTA Banner */}
      <section 
        className="w-full py-16 md:py-24 px-6 md:px-12"
        style={{
          background: "linear-gradient(to bottom, var(--background) 0%, #0d0d0d 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
              <div className="flex flex-col items-center space-y-6">
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase">
                  Collaborations & Commissions
                </span>
                <p className="font-display font-bold text-3xl md:text-5xl uppercase leading-tight text-white tracking-tight max-w-4xl">
                  HAVE A NARRATIVE TO DOCUMENT? LET'S DISCUSS THE FRAME.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <a
                  href="mailto:studio@nathangraphics.com?subject=Project Inquiry"
                  className="font-mono font-medium text-xl md:text-2xl text-white hover:text-accent focus:text-accent transition-colors duration-300 border-b-2 border-accent pb-1 inline-block break-all"
                >
                  studio@nathangraphics.com
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
