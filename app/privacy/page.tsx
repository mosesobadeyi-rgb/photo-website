"use client";

import React from "react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="w-full bg-background min-h-screen py-24 px-6 md:px-12 flex flex-col font-mono text-xs">
      <div className="max-w-3xl mx-auto w-full flex flex-col space-y-8 pt-12">
        <Link href="/" className="text-muted hover:text-white transition-colors pb-1 uppercase w-max">
          ← Back Home
        </Link>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tighter text-white">
          Privacy Policy
        </h1>
        <div className="font-sans text-sm text-zinc-300 leading-relaxed space-y-6">
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Data Protection Overview</p>
          <p>
            We take your privacy seriously. This website is a static showcase of editorial photography. We do not track you using analytics scripts, nor do we load third-party ad networks.
          </p>
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Inquiry Form Submissions</p>
          <p>
            When you send an inquiry via our contact form, the details you submit (name, email address, message) are transmitted securely to our email server and used strictly to discuss potential bookings and commissions. We do not sell or share this information.
          </p>
          <p className="font-bold text-white font-mono text-xs uppercase tracking-wider">Cookies</p>
          <p>
            This site uses only essential cookies required for basic navigation, layout functions, and session persistence. No tracking cookies are set.
          </p>
        </div>
      </div>
    </div>
  );
}
