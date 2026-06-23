"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

const fieldsOfPractice = [
  "High-End Fashion Editorials",
  "Documentary Photojournalism",
  "Monochromatic Studio Portraiture",
  "Commercial Campaigns & Lookbooks",
  "Brutalist Architectural Studies",
  "Medium Format Archival Film Printing"
];

const awards = [
  {
    year: "2025",
    title: "Dazed Portraiture Excellence Award",
    project: "Chroma Studies",
    slug: "chroma-studies"
  },
  {
    year: "2024",
    title: "Architectural Photographer of the Year",
    project: "Brutal Forms",
    slug: "brutal-forms"
  },
  {
    year: "2024",
    title: "World Press Photo — Portugal Field Story",
    project: "Silent Tides",
    slug: "silent-tides"
  },
  {
    year: "2023",
    title: "Vogue New Talent Commission",
    project: "Inertia",
    slug: "inertia"
  }
];

const expertiseTags = [
  "Phase One IQ4 150MP",
  "Hasselblad H6D Systems",
  "Leica Rangefinder",
  "Large Format 8x10 Film",
  "Silver Gelatin Darkroom Processing",
  "Natural Light Sculpting",
  "Color Theory & Color Calibration"
];

const collageImages = [
  { src: "/images/inertia-1.webp", alt: "Behind the scenes concrete setup" },
  { src: "/images/tides-1.webp", alt: "Darkroom print drying details" },
  { src: "/images/chroma-1.webp", alt: "Red light studio test" },
  { src: "/images/brutal-1.webp", alt: "Camera setup in London brutalist tower" }
];

export default function StudioPage() {
  return (
    <div 
      className="w-full min-h-screen py-16 px-6 md:px-12 flex flex-col"
      style={{
        background: "linear-gradient(to bottom, var(--background) 0%, var(--background) calc(100% - 300px), #0d0d0d 100%)"
      }}
    >
      {/* Intro Header */}
      <header className="max-w-7xl mx-auto w-full pt-12 pb-24 flex flex-col space-y-6">
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
          The Studio / Philosophy
        </span>
        <h1 className="font-display font-extrabold text-4xl md:text-7xl lg:text-8xl leading-[1.05] uppercase tracking-tighter text-white max-w-5xl">
          WE SHAPE LIGHT TO CAPTURE SILENCE AND GEOMETRY.
        </h1>
      </header>

      {/* Narrative Bio & Services */}
      <section className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-16 border-t border-white/5 pt-16 pb-28">
        {/* Left column: Bio Narrative (2 cols) */}
        <div className="lg:col-span-2 flex flex-col space-y-6 text-zinc-300 font-sans text-lg md:text-xl font-light leading-relaxed">
          <p>
            Nathan Graphics is an independent photographic studio specializing in medium and large-format editorial photography. Established in Paris and operating internationally, the studio works at the intersection of haute couture, industrial architecture, and raw human photojournalism.
          </p>
          <p>
            Operating like a traditional workshop, we prioritize physical textures, natural light, and the slow, deliberate methodology of film. Our projects reject standard digital over-saturation in favor of monochromatic weight, stark geometric contrasts, and clinical color studies.
          </p>
          <p>
            Whether capturing the rough textures of a Portuguese fisherman's net or the fluid silk drapery of a designer jacket against brutalist concrete walls, our lens documents the quiet tension where geometry meets the human form.
          </p>
        </div>

        {/* Right column: Fields of Practice (1 col) */}
        <div className="flex flex-col space-y-6 font-mono">
          <h2 className="text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
            Fields of Practice
          </h2>
          <ul className="space-y-4 text-white text-sm font-sans">
            {fieldsOfPractice.map((field, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <span className="text-accent font-mono text-xs mt-1">/</span>
                <span>{field}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BTS Collage Strip (Horizontal Scroll) */}
      <section className="w-full bg-black/30 border-y border-white/5 py-12 mb-28">
        <div className="max-w-7xl mx-auto w-full px-6 flex flex-col space-y-6">
          <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
            Visual Journal / BTS
          </span>
          <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4 cursor-grab active:cursor-grabbing">
            {collageImages.map((img, idx) => (
              <div key={idx} className="relative h-[35vh] min-h-[250px] aspect-[4/5] flex-shrink-0 overflow-hidden bg-zinc-900">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="30vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition Timeline */}
      <section className="max-w-7xl mx-auto w-full pb-28">
        <ScrollReveal>
          <div className="flex flex-col space-y-12">
            <h2 className="font-mono text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
              Awards & Recognitions
            </h2>
            <div className="flex flex-col divide-y divide-white/5">
              {awards.map((award, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 py-6 gap-4 font-mono text-xs items-center">
                  <span className="text-muted">{award.year}</span>
                  <span className="text-white font-sans text-sm md:col-span-2">{award.title}</span>
                  <div className="md:text-right">
                    <Link
                      href={`/work/${award.slug}`}
                      className="text-accent hover:text-white transition-colors duration-300 border-b border-accent pb-0.5"
                    >
                      Case Study →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Expertise & Final Brand Statement */}
      <section className="max-w-7xl mx-auto w-full border-t border-white/5 pt-16 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="flex flex-col space-y-4 font-mono">
          <span className="text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
            Studio Tools & Tech
          </span>
          <div className="flex flex-wrap gap-2 pt-2">
            {expertiseTags.map((tag, idx) => (
              <span key={idx} className="bg-white/5 border border-white/10 text-white font-sans text-xs px-3 py-1.5">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col space-y-6 lg:pl-12 justify-center">
          <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
            Brand Statement
          </span>
          <p className="font-display font-extrabold text-2xl md:text-4xl uppercase text-white tracking-tight leading-snug">
            WE DO NOT MASS PRODUCE IMAGES. WE PRESERVE MEMORIES OF FORMS IN THEIR TRUEST EXPRESSION.
          </p>
        </div>
      </section>
    </div>
  );
}
