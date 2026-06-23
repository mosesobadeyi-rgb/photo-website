"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    genre: "fashion",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a production app, you would send this to an API route
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="w-full min-h-screen py-16 px-6 md:px-12 flex flex-col"
      style={{
        background: "linear-gradient(to bottom, var(--background) 0%, var(--background) calc(100% - 300px), #0d0d0d 100%)"
      }}
    >
      {/* Intro Header */}
      <header className="max-w-7xl mx-auto w-full pt-12 pb-20 flex flex-col space-y-6">
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
          Initiate Connection
        </span>
        <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl leading-none uppercase tracking-tighter text-white">
          Contact / Bookings
        </h1>
      </header>

      {/* Main Content Split Grid */}
      <section className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/5 pt-16 pb-28">
        
        {/* Left Column: Direct info & Location */}
        <div className="flex flex-col space-y-12 font-mono text-xs">
          
          <div className="flex flex-col space-y-4">
            <h2 className="text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
              Studio Details
            </h2>
            <div className="flex flex-col space-y-2">
              <span className="text-muted text-[10px] uppercase">Direct Email</span>
              <a
                href="mailto:studio@nathangraphics.com"
                className="text-white hover:text-accent font-sans text-base transition-colors duration-300"
              >
                studio@nathangraphics.com
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <span className="text-muted text-[10px] uppercase">Booking Telephone</span>
              <a
                href="tel:+33100000000"
                className="text-white hover:text-accent font-sans text-base transition-colors duration-300"
              >
                +33 (0) 1 00 00 00 00
              </a>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
              Hours & Availability
            </h2>
            <p className="text-white font-sans text-sm leading-relaxed">
              Monday — Friday<br />
              09:00 — 18:00 (GMT+1)<br />
              Visits by appointment only.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
              Lagos Rep Office
            </h2>
            <p className="text-white font-sans text-sm leading-relaxed">
              12 Kingsway Road, Ikoyi<br />
              Lagos, Nigeria
            </p>
          </div>

        </div>

        {/* Right Column: Typographic Inquiry Form */}
        <div className="flex flex-col space-y-8">
          <h2 className="font-mono text-[10px] text-muted uppercase tracking-widest border-b border-white/10 pb-2">
            Send Inquiry
          </h2>

          {submitted ? (
            <div className="bg-white/5 border border-accent/20 p-8 font-mono text-xs flex flex-col space-y-4">
              <span className="text-accent uppercase tracking-widest font-bold">Transmission Successful</span>
              <p className="text-white font-sans text-sm leading-relaxed">
                Thank you for reaching out. We will review your project parameters and respond within 48 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-white hover:text-accent border-b border-white hover:border-accent w-max pb-1 uppercase cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-8 font-sans">
              
              {/* Name */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  Your Name / Agency
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Kinfolk Magazine"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:border-accent focus:outline-none transition-colors duration-300 rounded-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. editor@kinfolk.com"
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:border-accent focus:outline-none transition-colors duration-300 rounded-none"
                />
              </div>

              {/* Genre Selector */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="genre" className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  Project Taxonomy / Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="w-full bg-background border-b border-white/20 py-3 text-white text-base focus:border-accent focus:outline-none transition-colors duration-300 rounded-none cursor-pointer"
                >
                  <option value="fashion">Fashion Editorial</option>
                  <option value="portrait">Studio Portraiture</option>
                  <option value="documentary">Documentary Narrative</option>
                  <option value="editorial">Editorial / Architectural</option>
                  <option value="travel">Travel Journal</option>
                  <option value="commercial">Commercial Campaign</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="message" className="font-mono text-[10px] text-muted uppercase tracking-wider">
                  Project Description & Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Outline dates, locations, mediums, and creative briefs..."
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white text-base focus:border-accent focus:outline-none transition-colors duration-300 rounded-none resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="bg-white text-background hover:bg-accent hover:text-white focus:bg-accent focus:text-white font-mono text-xs uppercase tracking-widest px-8 py-4 cursor-pointer transition-colors duration-300 rounded-none font-bold"
                >
                  Submit Brief
                </button>
              </div>

            </form>
          )}
        </div>
      </section>
    </div>
  );
}
