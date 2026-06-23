"use client";

import React from "react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="w-full bg-background min-h-screen py-24 px-6 md:px-12 flex flex-col font-mono text-xs">
      <div className="max-w-3xl mx-auto w-full flex flex-col space-y-8 pt-12">
        <Link href="/" className="text-muted hover:text-white transition-colors pb-1 uppercase w-max">
          ← Back Home
        </Link>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tighter text-white">
          Terms & Conditions
        </h1>
        <div className="font-sans text-sm text-zinc-300 leading-relaxed space-y-6">
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Intellectual Property</p>
          <p>
            All imagery, videos, wordmarks, layout arrangements, and content displayed on this website are the exclusive intellectual property of Nathan Graphics unless credited otherwise.
          </p>
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Usage & Reproduction Restrictions</p>
          <p>
            You may not download, reproduce, republish, print, or distribute any image or content from this portfolio site without express written consent from Nathan Graphics. Any unauthorized use represents a breach of global copyright laws.
          </p>
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Commissions & Bookings</p>
          <p>
            All photoshoot bookings, editorial commissions, and production contracts are governed by our standard freelance agreements, which are issued directly upon booking confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}
