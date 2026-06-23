"use client";

import React from "react";
import Link from "next/link";

export default function ImprintPage() {
  return (
    <div className="w-full bg-background min-h-screen py-24 px-6 md:px-12 flex flex-col font-mono text-xs">
      <div className="max-w-3xl mx-auto w-full flex flex-col space-y-8 pt-12">
        <Link href="/" className="text-muted hover:text-white transition-colors pb-1 uppercase w-max">
          ← Back Home
        </Link>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tighter text-white">
          Imprint / Legal
        </h1>
        <div className="font-sans text-sm text-zinc-300 leading-relaxed space-y-6">
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Studio Ownership</p>
          <p>
            Nathan Graphics Studio SRL<br />
            8 Rue de Prague<br />
            75012 Paris, France
          </p>
          <p>
            Represented by: Nathan Graphics<br />
            Contact Email: studio@nathangraphics.com<br />
            Telephone: +33 (0) 1 00 00 00 00
          </p>
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Business Registry</p>
          <p>
            Paris Commercial Court Registry: RCS Paris B 123 456 789<br />
            VAT Identification Number: FR 99 123 456 789<br />
            Regulatory Agency: French National Council of Photography
          </p>
        </div>
      </div>
    </div>
  );
}
