"use client";


import SmoothScroll from "@/components/SmoothScroll";
import WindowZoom from "@/components/WindowZoom";
import BrandStory from "@/components/BrandStory";
import SkyBackground from "@/components/SkyBackground";
import Header from "@/components/Header";
import ScrollAnimatedSection from "@/components/ScrollAnimatedSection";
import OverlayTracker from "@/components/OverlayTracker";
import WelcomeScreen from "@/components/WelcomeScreen";

export default function Home() {
  return (
    <SmoothScroll>
      <OverlayTracker>
        <main className="relative bg-[#B0B5B9] text-foreground">
          <WelcomeScreen />

          {/* Navigation Header */}
          <Header />

          {/* 1. GLOBAL SKY BACKGROUND (Fixed) */}
          {/* Animated clouds and realistic sky gradient */}
          <SkyBackground />

          {/* 2. Window Zoom Overlay */}
          {/* This occupies scroll space (~250vh) and pins itself on top of the sky */}
          {/* It has NO children, it just handles the Frame animation */}
          <WindowZoom />

          {/* 3. Spacer for the "Pure Sky" Moment */}
          {/* Removed spacer - content appears immediately after window zoom */}
          <div className="h-[0vh] relative z-10" />

          {/* 4. Content Section */}
          {/* Uses z-10 to sit above the fixed sky */}
          {/* Negative margin pulls content upward to reduce scrolling */}
          <div className="relative z-10 min-h-screen flex flex-col items-center justify-center pb-32 -mt-[180vh]">

            {/* Animated Brand Story */}
            <BrandStory />


          </div>

          {/* 5. Cream Section - contains eagle and text animation */}
          <ScrollAnimatedSection>
            {/* Content will be added here later */}
          </ScrollAnimatedSection>

          {/* Footer overlay */}
          <div className="absolute bottom-8 left-0 w-full text-center text-xs uppercase tracking-widest text-[#2c3e50]/60 mix-blend-multiply z-20">
            © 2026 Jesko Jets. All rights reserved.
          </div>

        </main>
      </OverlayTracker>
    </SmoothScroll>
  );
}
