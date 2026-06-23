"use client";

import React, { use, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects, Project } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";

interface PageProps {
  params: Promise<{
    genre?: string[];
  }>;
}

const genresList = [
  { slug: "all", label: "All Works" },
  { slug: "portrait", label: "Portrait" },
  { slug: "editorial", label: "Editorial" },
  { slug: "fashion", label: "Fashion" },
  { slug: "documentary", label: "Documentary" },
  { slug: "travel", label: "Travel" },
  { slug: "commercial", label: "Commercial" }
];

export default function WorksPage({ params }: PageProps) {
  // Unwrap parameters promise using React.use()
  const resolvedParams = use(params);
  const activeGenre = resolvedParams.genre?.[0] || "all";

  // Filter projects by active genre
  const filteredProjects = activeGenre === "all"
    ? projects
    : projects.filter((p) => p.genre === activeGenre);

  // Compute counter for each category
  const getGenreCount = (genreSlug: string) => {
    if (genreSlug === "all") return projects.length;
    return projects.filter((p) => p.genre === genreSlug).length;
  };

  return (
    <div 
      className="w-full min-h-screen py-16 px-6 md:px-12 flex flex-col"
      style={{
        background: "linear-gradient(to bottom, var(--background) 0%, var(--background) calc(100% - 300px), #0d0d0d 100%)"
      }}
    >
      {/* Page Title Header */}
      <div className="max-w-7xl mx-auto w-full pt-12 pb-8 flex flex-col space-y-4">
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
          Portfolio Archive
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl uppercase tracking-tighter text-white">
          Selected Works
        </h1>
      </div>

      {/* Sticky Taxonomy Filter Strip */}
      <div className="sticky top-14 z-30 bg-background/90 backdrop-blur-md w-full border-y border-white/5 py-4 mb-16">
        <div className="max-w-7xl mx-auto flex items-center justify-start overflow-x-auto no-scrollbar space-x-8 font-mono text-xs uppercase px-2">
          {genresList.map((genre) => {
            const isActive = activeGenre === genre.slug;
            const count = getGenreCount(genre.slug);
            const path = genre.slug === "all" ? "/work" : `/work/${genre.slug}`;

            return (
              <Link
                key={genre.slug}
                href={path}
                className={`flex items-baseline space-x-1 whitespace-nowrap cursor-pointer transition-colors duration-300 pb-1 ${
                  isActive
                    ? "text-accent border-b-2 border-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                <span>{genre.label}</span>
                <span className="text-[9px] opacity-60">({count})</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Projects Grid Container */}
      <div className="max-w-7xl mx-auto w-full flex-grow">
        {filteredProjects.length === 0 ? (
          <div className="w-full py-32 flex flex-col items-center justify-center text-center font-mono">
            <span className="text-muted text-sm uppercase tracking-widest">No Projects Found In This Genre</span>
            <Link href="/work" className="text-white hover:text-accent mt-4 border-b border-white pb-1">
              Back To All Works
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal key={project.slug} delay={idx * 0.05}>
                <ProjectCard project={project} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Internal Project Card Component */
function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col space-y-4 group cursor-pointer"
    >
      <Link href={`/work/${project.slug}`} className="block relative w-full overflow-hidden bg-zinc-900 border border-transparent focus:outline-none rounded-2xl">
        {/* Grey Loading Skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-zinc-900 animate-pulse z-10" />
        )}
        
        {/* Image/Video Aspect Container */}
        <div className={`${project.images[0].aspect} w-full relative`}>
          {project.motionAsset ? (
            <>
              {/* Image fallback poster */}
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-opacity duration-500 z-0 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoaded(true)}
              />
              
              {/* Desktop auto loop video on hover */}
              <video
                ref={videoRef}
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
                poster={project.motionAsset.poster}
              >
                <source src={project.motionAsset.src} type="video/mp4" />
              </video>
            </>
          ) : (
            <Image
              src={project.images[0].src}
              alt={project.images[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              onLoad={() => setIsLoaded(true)}
            />
          )}

          {/* Desktop Overlay detail display */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-end p-6 z-20">
            <span className="font-mono text-[9px] text-accent tracking-widest uppercase mb-1">
              {project.genre}
            </span>
            <h3 className="font-display font-extrabold text-2xl text-white uppercase tracking-tight leading-none">
              {project.title}
            </h3>
            <p className="font-mono text-[10px] text-muted mt-1 uppercase">
              Client: {project.client}
            </p>
          </div>
        </div>
      </Link>

      {/* Mobile Title & Client Info (Statically visible underneath image) */}
      <div className="flex flex-col space-y-1 md:hidden">
        <div className="flex justify-between items-baseline">
          <h3 className="font-display font-bold text-base text-white uppercase tracking-tight">
            <Link href={`/work/${project.slug}`} className="hover:text-accent focus:text-accent transition-colors">
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
      
      {/* Desktop static captions (visible when NOT hovered, fades out on hover to reveal overlay text) */}
      <div className="hidden md:flex flex-col space-y-1 mt-1 group-hover:opacity-0 transition-opacity duration-300">
        <div className="flex justify-between items-baseline">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-tight">
            {project.title}
          </h4>
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
  );
}
