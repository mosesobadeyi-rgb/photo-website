"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ScrollReveal";
import WorksPage from "../[[...genre]]/page";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const genres = ["portrait", "editorial", "fashion", "documentary", "travel", "commercial"];

export default function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  // Handle route collision by delegating to WorksPage if slug is a genre filter
  if (genres.includes(slug)) {
    const simulatedParams = Promise.resolve({ genre: [slug] });
    return <WorksPage params={simulatedParams} />;
  }

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="w-full bg-background min-h-screen flex flex-col items-center justify-center font-mono p-6">
        <p className="text-muted text-sm uppercase tracking-widest">Case Study Not Found</p>
        <Link href="/work" className="text-white hover:text-accent mt-4 border-b border-accent pb-1">
          Return to Archive
        </Link>
      </div>
    );
  }

  // Get 3 related projects (same genre, or featured if not enough in genre)
  let related = projects.filter((p) => p.genre === project.genre && p.slug !== project.slug);
  if (related.length < 3) {
    const additional = projects.filter((p) => p.slug !== project.slug && !related.find((r) => r.slug === p.slug));
    related = [...related, ...additional].slice(0, 3);
  } else {
    related = related.slice(0, 3);
  }

  return (
    <div className="w-full bg-background min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-16">
        <Link
          href="/work"
          className="font-mono text-xs tracking-widest text-muted hover:text-white transition-colors uppercase inline-flex items-center space-x-2"
        >
          <span>←</span> <span>Back to Archive</span>
        </Link>
      </div>

      {/* Hero Metadata Header */}
      <header className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-baseline">
        <div className="flex flex-col space-y-4">
          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
            {project.genre} Study
          </span>
          <h1 className="font-display font-extrabold text-5xl md:text-8xl leading-none uppercase tracking-tighter text-white">
            {project.title}
          </h1>
          <p className="font-sans text-xl text-muted mt-2">
            For {project.client}
          </p>
        </div>

        {/* Metadata Table */}
        <div className="w-full border-t border-white/10 pt-4 font-mono text-xs">
          <div className="grid grid-cols-2 py-3 border-b border-white/5">
            <span className="text-muted uppercase tracking-wider">Year</span>
            <span className="text-white text-right">{project.year}</span>
          </div>
          <div className="grid grid-cols-2 py-3 border-b border-white/5">
            <span className="text-muted uppercase tracking-wider">Medium</span>
            <span className="text-white text-right">{project.medium}</span>
          </div>
          <div className="grid grid-cols-2 py-3 border-b border-white/5">
            <span className="text-muted uppercase tracking-wider">Taxonomy</span>
            <span className="text-accent text-right uppercase">{project.genre}</span>
          </div>
          <div className="grid grid-cols-2 py-3 border-b border-white/5">
            <span className="text-muted uppercase tracking-wider">Client</span>
            <span className="text-white text-right">{project.client}</span>
          </div>
        </div>
      </header>

      {/* Case Study Body */}
      <section className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/5 pt-16">
        {/* Credits Block (Left / 1 Col) */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <h2 className="font-mono text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
            Project Credits
          </h2>
          <div className="flex flex-col space-y-4 font-mono text-xs">
            {project.credits.map((credit, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-muted uppercase tracking-widest text-[9px] mb-1">{credit.key}</span>
                <span className="text-white font-sans text-sm">{credit.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrative Description (Right / 2 Col) */}
        <div className="lg:col-span-2 flex flex-col space-y-6">
          <h2 className="font-mono text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
            The Narrative
          </h2>
          <div className="font-sans text-lg md:text-xl text-zinc-300 leading-relaxed font-light space-y-6">
            <p>{project.description}</p>
          </div>
        </div>
      </section>

      {/* Sequential Gallery (Full-Bleed List) */}
      <section className="w-full bg-black/40 border-t border-white/5 py-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col divide-y divide-white/5">
          {project.images.map((image, idx) => (
            <ScrollReveal key={idx}>
              <div className="py-20 md:py-32 flex justify-center items-center">
                <div className={`${image.aspect} w-full relative overflow-hidden bg-zinc-950`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Related Projects Footer Carousel (3-Item loop) */}
      <section className="w-full bg-background border-t border-white/10 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col space-y-12">
          <div className="flex justify-between items-baseline border-b border-white/5 pb-4">
            <h2 className="font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight text-white">
              Related Studies
            </h2>
            <Link
              href="/work"
              className="font-mono text-xs tracking-widest text-muted hover:text-accent transition-colors uppercase"
            >
              All Case Studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((relProject, idx) => (
              <ScrollReveal key={relProject.slug} delay={idx * 0.1}>
                <div className="flex flex-col space-y-4 group">
                  <Link
                    href={`/work/${relProject.slug}`}
                    className="block aspect-[3/2] relative overflow-hidden bg-white/5 focus:outline-none rounded-2xl"
                  >
                    <Image
                      src={relProject.images[0].src}
                      alt={relProject.images[0].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="font-mono text-[10px] tracking-widest text-white uppercase border border-white/20 px-3 py-1.5">
                        Read Case Study
                      </span>
                    </div>
                  </Link>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="font-mono text-[9px] text-accent tracking-widest uppercase block">
                        {relProject.genre}
                      </span>
                      <h3 className="font-display font-bold text-sm text-white uppercase tracking-tight">
                        <Link href={`/work/${relProject.slug}`} className="hover:text-accent transition-colors">
                          {relProject.title}
                        </Link>
                      </h3>
                    </div>
                    <span className="font-mono text-[9px] text-muted">
                      {relProject.year}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
