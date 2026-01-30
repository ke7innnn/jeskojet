"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function WindowZoom() {
    const containerRef = useRef<HTMLDivElement>(null);
    const holeRef = useRef<HTMLDivElement>(null);
    const textLeftRef = useRef<HTMLDivElement>(null);
    const textRightRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const shutterRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !holeRef.current || !wrapperRef.current || !shutterRef.current || !logoRef.current) return;

        // Performance: Set GSAP defaults for GPU acceleration
        gsap.defaults({
            force3D: true,
            ease: "power2.inOut"
        });

        // 0. SHUTTER OPEN (Automatic)
        gsap.to(shutterRef.current, {
            y: "-85%",
            ease: "power2.inOut",
            duration: 1.5,
            delay: 0.5
        });

        // 0.5. LOGO FADE IN (After shutter opens)
        gsap.fromTo(logoRef.current,
            { autoAlpha: 0, scale: 0.8 }, // autoAlpha is better for performance than opacity
            {
                autoAlpha: 1,
                scale: 1,
                ease: "power2.out",
                duration: 1,
                delay: 1.5 // After shutter animation
            }
        );

        // Timeline for the zoom effect (Scroll Driven - Optimized)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5, // Reduced for more responsive feel
                pin: true,
                anticipatePin: 1, // Smoother pinning
                onUpdate: (self) => {
                    const headerLogo = document.getElementById('header-logo');
                    if (headerLogo) {
                        // Instant handoff at 99% - no fade, just swap
                        if (self.progress >= 0.99) {
                            headerLogo.style.opacity = '1';
                        } else {
                            headerLogo.style.opacity = '0';
                        }
                    }
                }
            },
        });


        // 1. LOGO TRANSITION (Center → Header - Perfectly Smooth)
        // Moves from window center to header position during zoom
        tl.to(logoRef.current, {
            y: -window.innerHeight * 0.45, // Move to top
            scale: 0.4, // Shrink to 40% for header size
            ease: "power2.inOut",
            duration: 0.8
        }, 0);

        // 2. Text Interaction (SYNCHRONIZED 3D PARALLAX)
        // Perfectly synced with window zoom for cohesive 3D effect
        tl.to([textLeftRef.current, textRightRef.current], {
            x: (index) => index === 0 ? -3000 : 3000, // Aggressive lateral movement
            scale: 3, // Moderate scale to maintain readability while creating depth
            rotationY: (index) => index === 0 ? -25 : 25, // Perspective rotation
            z: -500, // Pull back in Z-space
            filter: "blur(4px)", // Motion blur for speed
            ease: "power2.inOut", // SAME easing as window for perfect sync
            duration: 0.8 // SAME duration as window for perfect sync
        }, 0);

        // 3. The Porthole Zoom (Expansion)
        tl.to(holeRef.current, {
            scale: 15,
            ease: "power2.inOut",
            duration: 0.8,
        }, 0);

        // 4. Fade Out The Entire Wrapper at the end (logo stays visible)
        tl.to(wrapperRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power1.inOut"
        }, 0.8);

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative h-[300vh] z-50 pointer-events-none">
            <div
                ref={wrapperRef}
                className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center bg-transparent"
                style={{ willChange: "opacity", perspective: "1000px" }}
            >

                {/* Level 2: The WALL / MASK (Z-20) */}
                <div
                    ref={holeRef}
                    className="absolute z-20 w-[350px] h-[500px] md:w-[450px] md:h-[650px] rounded-[150px] bg-transparent overflow-hidden"
                    style={{
                        boxShadow: "0 0 0 500vmax #B0B5B9",
                        willChange: "transform"
                    }}
                >
                    {/* THE SHUTTER */}
                    <div
                        ref={shutterRef}
                        className="absolute inset-0 z-10 bg-gradient-to-b from-[#E0E4E8] to-[#CDD1D5] border-b-4 border-[#B0B5B9]"
                        style={{
                            boxShadow: "inset 0 10px 20px rgba(0,0,0,0.1)"
                        }}
                    >
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-16 h-2 bg-[#B0B5B9]/50 rounded-full" />
                    </div>

                    {/* The Decorative Frame/Bevel */}
                    <div
                        ref={frameRef}
                        className="absolute inset-0 rounded-[150px] border-[8px] border-[#E0E4E8] pointer-events-none z-20"
                        style={{
                            boxShadow: `
                        inset 10px 10px 20px rgba(0,0,0,0.2),
                        inset -10px -10px 20px rgba(255,255,255,0.5),
                        10px 10px 30px rgba(0,0,0,0.3)
                    `
                        }}
                    />
                </div>

                {/* Layer 3: The Overlay Text - Enhanced for 3D */}
                <div
                    ref={textLeftRef}
                    className="absolute left-[2%] md:left-[5%] top-1/2 -translate-y-1/2 z-30 w-[300px]"
                    style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, filter"
                    }}
                >
                    <h2 className="text-6xl md:text-8xl font-heading font-medium tracking-tighter text-white mix-blend-overlay leading-[0.9]">
                        We are<br />movement
                    </h2>
                    <div className="mt-8 border-t border-white/40 pt-4 w-32">
                        <p className="text-sm uppercase tracking-widest text-[#2c3e50] font-sans font-bold">Your freedom to<br />enjoy life</p>
                    </div>
                </div>

                {/* Floating Text Right */}
                <div
                    ref={textRightRef}
                    className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-30 w-[300px] text-right"
                    style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, filter"
                    }}
                >
                    <h2 className="text-6xl md:text-8xl font-heading font-medium tracking-tighter text-white mix-blend-overlay leading-[0.9]">
                        We are<br />distinction
                    </h2>
                </div>

                {/* Layer 4: Animated Logo (Center → Header) */}
                <div
                    ref={logoRef}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] opacity-0"
                    style={{
                        willChange: "transform, opacity"
                    }}
                >
                    <div className="text-3xl md:text-5xl font-sans font-medium tracking-wide uppercase text-white">
                        ke7innn
                    </div>
                </div>

            </div>
        </div>
    );
}
