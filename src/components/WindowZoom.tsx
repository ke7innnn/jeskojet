"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function WindowZoom() {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textLeftRef = useRef<HTMLDivElement>(null);
    const textRightRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current || !overlayRef.current || !wrapperRef.current || !logoRef.current) return;

        // Performance: Set GSAP defaults for GPU acceleration
        gsap.defaults({
            force3D: true,
            ease: "power2.inOut"
        });

        // SMOOTH CINEMATIC FADE IN - All text together
        const cinematicTimeline = gsap.timeline({
            delay: 0.5
        });

        // Fade in left text
        cinematicTimeline.fromTo(textLeftRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            },
            0 // Start at 0
        );

        // Fade in right text (same time as left)
        cinematicTimeline.fromTo(textRightRef.current,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: "power2.out"
            },
            0 // Start at 0 - same time
        );

        // LOGO SMOOTH FADE IN
        gsap.fromTo(logoRef.current,
            {
                opacity: 0,
                scale: 0.9
            },
            {
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                duration: 1.5,
                delay: 1
            }
        );

        // Timeline for the zoom effect (Scroll Driven - Optimized)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,
                onUpdate: (self) => {
                    const headerLogo = document.getElementById('header-logo');
                    if (headerLogo) {
                        // Smooth crossfade between 90% and 100%
                        if (self.progress >= 0.9) {
                            const fadeProgress = (self.progress - 0.9) / 0.1;
                            headerLogo.style.opacity = String(fadeProgress);
                        } else {
                            headerLogo.style.opacity = '0';
                        }
                    }
                }
            },
        });

        // 1. LOGO TRANSITION (Center → Header - Perfectly Smooth)
        tl.to(logoRef.current, {
            y: -window.innerHeight * 0.45,
            scale: 0.4,
            ease: "power1.inOut", // Gentler easing for smoother motion
            duration: 1 // Full duration through entire scroll
        }, 0);

        // 2. Text Interaction (SYNCHRONIZED 3D PARALLAX)
        tl.to([textLeftRef.current, textRightRef.current], {
            x: (index) => index === 0 ? -3000 : 3000,
            scale: 3,
            rotationY: (index) => index === 0 ? -25 : 25,
            z: -500,
            filter: "blur(4px)",
            ease: "power2.inOut",
            duration: 0.8
        }, 0);

        // 3. The OVERLAY ZOOM (Scale up the entire overlay image)
        tl.to(overlayRef.current, {
            scale: 15,
            ease: "power2.inOut",
            duration: 0.8,
        }, 0);

        // 4. Fade Out The Entire Wrapper at the end
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


                {/* Airplane Wall Overlay with Transparent Window - THIS ZOOMS */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                    style={{ willChange: "transform" }}
                >
                    {/* High-resolution window overlay - clean, no effects */}
                    <Image
                        src="/window-overlay-hd.png"
                        alt="Airplane Window Frame"
                        fill
                        priority
                        quality={100}
                        className="object-cover"
                    />
                </div>

                {/* Layer 3: The Overlay Text - Enhanced for 3D */}
                <div
                    ref={textLeftRef}
                    className="absolute left-[2%] md:left-[5%] top-1/2 -translate-y-1/2 z-30 w-[300px] opacity-0"
                    style={{
                        transformStyle: "preserve-3d",
                        willChange: "transform, filter"
                    }}
                >
                    <h2 className="text-6xl md:text-8xl font-heading font-medium tracking-tighter text-white mix-blend-overlay leading-[0.9]">
                        We are<br />movement
                    </h2>
                    <div className="mt-8 border-t border-white/40 pt-4 w-32">
                        <p className="text-sm uppercase tracking-widest text-white/80 font-sans font-bold">Your freedom to<br />enjoy life</p>
                    </div>
                </div>

                {/* Floating Text Right */}
                <div
                    ref={textRightRef}
                    className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-30 w-[300px] text-right opacity-0"
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
                    className="absolute left-1/2 z-[60] opacity-0"
                    style={{
                        top: "calc(50% - 10px)",
                        transform: "translate(-50%, -50%)",
                        willChange: "transform, opacity"
                    }}
                >
                    <div
                        className="text-2xl md:text-4xl text-white uppercase"
                        style={{
                            fontFamily: "var(--font-michroma)",
                            fontWeight: 400,
                            letterSpacing: "0.1em"
                        }}
                    >
                        ke7innn
                    </div>
                </div>

            </div>
        </div>
    );
}
