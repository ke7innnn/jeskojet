import type { Metadata } from "next";
import { Inter, Michroma, Outfit, Syncopate } from "next/font/google";
import "./globals.css";
import CinematicGrade from "@/components/CinematicGrade";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const michroma = Michroma({
  weight: "400",
  variable: "--font-michroma",
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: ["600", "700"],
  variable: "--font-outfit",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  weight: ["400", "700"],
  variable: "--font-syncopate",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LXRY | New Season",
  description: "High-end fashion editorial experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${michroma.variable} ${outfit.variable} ${syncopate.variable} antialiased bg-background text-foreground`}>
        {/* Using high-res overlay - no additional effects needed */}
        {children}
      </body>
    </html>
  );
}
