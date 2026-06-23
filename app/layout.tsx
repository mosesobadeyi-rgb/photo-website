import type { Metadata } from "next";
import { Bungee, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const bungee = Bungee({
  subsets: ["latin"],
  variable: "--font-bungee",
  weight: "400",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Nathan Graphics — Cinematic Editorial Photography Portfolio",
  description: "A premium, typography-led photography portfolio focusing on narrative editorial, fashion, and documentary case studies. Designed like a physical layout magazine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bungee.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground font-sans selection:bg-accent selection:text-background flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}


