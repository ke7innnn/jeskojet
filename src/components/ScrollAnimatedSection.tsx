"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ScrollAnimatedSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Full-screen overlay opacity - transitions over scrolls
    // Matches eagle arrival: Starts at 0.26 (nav change), enters fully by 0.6 (eagle centers), stays full.
    const overlayOpacity = useTransform(
        scrollYProgress,
        [0, 0.26, 0.6, 1],
        [0, 0, 1, 1]
    );

    // --- TEXT ANIMATION ---
    // Phase 1 (0-30%): Enters from bottom
    // Phase 2 (30-60%): Stays readable
    // Phase 3 (60-100%): Exits DOWNWARDS as we move to next section
    const textY = useTransform(
        scrollYProgress,
        [0, 0.3, 0.6, 1],
        ["100vh", "0vh", "0vh", "150vh"]
    );

    const textOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3, 0.6, 0.8],
        [0, 1, 1, 1, 0] // Fade out only in final phase
    );

    // --- EAGLE ANIMATION ---
    // Phase 1 (0-30%): Below screen
    // Phase 2 (30-60%): Rises to Center & Shrinks
    // Phase 3 (60-80%): LOCKED at Center (Specs appear)
    // Phase 4 (80-100%): Fades out to reveal Drawing
    const eagleY = useTransform(
        scrollYProgress,
        [0, 0.3, 0.6, 1],
        ["180vh", "180vh", "0vh", "0vh"] // Arrives at 0 at 0.6, stays there
    );

    const eagleOpacity = useTransform(
        scrollYProgress,
        [0.3, 0.4, 0.8, 1], // Stays visible until 0.8
        [0, 1, 1, 0] // Fades out at the very end to reveal drawing
    );

    // Scale shrinks to target by 0.6 and STAYS there so drawing matches
    const eagleScale = useTransform(
        scrollYProgress,
        [0.3, 0.6, 1],
        [1, 0.5, 0.5] // Shrinks to 50% by 0.6, then LOCKS size
    );

    // --- DRAWING ANIMATION ---
    // Appears exactly as Eagle fades out (Cross-fade)
    const drawingOpacity = useTransform(
        scrollYProgress,
        [0.8, 1],
        [0, 1]
    );

    // --- SPECS & RIGHT SIDE ANIMATION ---
    // Enters during the LOCK phase (0.6 - 0.8)
    const specsOpacity = useTransform(
        scrollYProgress,
        [0.6, 0.7, 1],
        [0, 1, 1]
    );

    const specsX = useTransform(
        scrollYProgress,
        [0.6, 0.8],
        [-50, 0]
    );

    // Mirrors the left side (specs)
    const rightX = useTransform(
        scrollYProgress,
        [0.6, 0.8],
        [50, 0]
    );

    return (
        <div ref={sectionRef} className="relative min-h-[500vh]" id="transition-zone">
            {/* Full-screen fixed overlay that fades in over scrolls */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="fixed inset-0 z-[5] pointer-events-none bg-[#FDF5E6]"
            />

            {/* Pinned Container */}
            <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none z-20">

                {/* 1. TEXT LAYER (Moves independently) */}
                {/* Centered vertically via flex for initial alignment, then animated by textY */}
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="absolute inset-0 flex items-start justify-center pt-[40vh]"
                >
                    <div className="w-full max-w-[1600px] mx-auto px-12 md:px-16 lg:px-20 flex items-start justify-between">
                        {/* Left Text: "Fly in" - Far left */}
                        <div className="flex flex-col">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-none" style={{ fontFamily: 'var(--font-syncopate)' }}>
                                Fly in
                            </h2>
                            <p className="text-xs md:text-sm mt-4 text-black/70 leading-relaxed max-w-[120px]" style={{ fontFamily: 'var(--font-outfit)' }}>
                                Luxury<br />that moves<br />with you
                            </p>
                        </div>

                        {/* Right Text: "Luxury" - Far right */}
                        <div className="flex flex-col items-end">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-none text-right" style={{ fontFamily: 'var(--font-syncopate)' }}>
                                Luxury
                            </h2>

                            {/* Content section with border */}
                            <div className="mt-32 pt-8 border-t border-black/20 max-w-[500px]">
                                <div className="flex items-start justify-between gap-12 mb-6">
                                    <p className="text-sm font-bold uppercase tracking-wider text-black" style={{ fontFamily: 'var(--font-outfit)' }}>
                                        GULFSTREAM
                                    </p>
                                    <p className="text-sm font-bold uppercase tracking-wider text-black" style={{ fontFamily: 'var(--font-outfit)' }}>
                                        650ER
                                    </p>
                                </div>
                                <p className="text-sm text-black/80 leading-relaxed" style={{ fontFamily: 'var(--font-outfit)' }}>
                                    Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 AI-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. SPECS LAYER (Enters in Phase 3) */}
                <motion.div
                    style={{ opacity: specsOpacity, x: specsX }}
                    className="absolute top-1/2 -translate-y-1/2 left-[5%] w-[400px] text-black z-30 flex flex-col gap-8"
                >
                    {/* Header */}
                    <div>
                        <h3 className="text-2xl font-medium mb-0" style={{ fontFamily: 'var(--font-outfit)' }}>Gulfstream</h3>
                        <h2 className="text-8xl font-bold tracking-tighter leading-none" style={{ fontFamily: 'var(--font-syncopate)' }}>650ER</h2>
                    </div>

                    {/* Stats Grid */}
                    <div className="border-t border-black/20 pt-6 grid grid-cols-2 gap-y-8 gap-x-4">
                        <div>
                            <p className="text-xs font-bold text-black/40 uppercase mb-1">RANGE</p>
                            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>5,371 KM</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-black/40 uppercase mb-1">SPEED</p>
                            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>855 KM/H</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-black/40 uppercase mb-1">PASSENGER SEATS</p>
                            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>7-8 SEATS</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-black/40 uppercase mb-1">CATEGORY</p>
                            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>SUPER MIDSIZE JETS</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-xs font-bold text-black/40 uppercase mb-1">LUGGAGE CAPACITY</p>
                            <p className="text-lg font-bold" style={{ fontFamily: 'var(--font-outfit)' }}>4.24 M3</p>
                        </div>
                    </div>

                    {/* Footer Specs */}
                    <div className="border-t border-black/20 pt-6">
                        <p className="text-xs font-bold text-black/40 uppercase mb-4">SPECIFICATION</p>
                        <div className="space-y-2 text-sm font-medium" style={{ fontFamily: 'var(--font-outfit)' }}>
                            <div className="flex justify-between"><span className="text-black/70">CABIN HEIGHT</span> <span>1.82 M</span></div>
                            <div className="flex justify-between"><span className="text-black/70">CABIN WIDTH</span> <span>2.07 M</span></div>
                            <div className="flex justify-between"><span className="text-black/70">CABIN LENGTH</span> <span>6.85 M</span></div>
                            <div className="flex justify-between"><span className="text-black/70">PASSENGER SEATS</span> <span>7-8 SEATS</span></div>
                        </div>
                    </div>

                </motion.div>

                {/* 3. INFO LAYER (Right Side - Enters in Phase 3) */}
                <motion.div
                    style={{ opacity: specsOpacity, x: rightX }}
                    className="absolute top-[20%] right-[3%] w-[280px] text-black z-30 flex flex-col gap-8"
                >
                    {/* Main Headline */}
                    <h2 className="text-3xl font-medium leading-tight tracking-tight" style={{ fontFamily: 'var(--font-outfit)' }}>
                        Engineered for<br />
                        long-range, luxury<br />
                        comfort
                    </h2>

                    {/* Divider and Sub-content */}
                    <div className="border-t border-black/20 pt-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider mb-6 leading-relaxed text-black/90" style={{ fontFamily: 'var(--font-outfit)' }}>
                            DIRECT ACCESS<br />TO PRIVATE TRAVEL
                        </h3>

                        <p className="text-sm text-black/80 leading-relaxed font-normal" style={{ fontFamily: 'var(--font-outfit)' }}>
                            High-level ideological considerations, as well as constant informational and promotional support for our activities, allow us to assess the significance of new proposals.
                        </p>
                    </div>
                </motion.div>

                {/* 4. EAGLE LAYER */}
                {/* Visual Eagle that rises and then fades out */}
                <motion.div
                    style={{
                        y: eagleY,
                        opacity: eagleOpacity,
                        scale: eagleScale,
                        x: "-50%", // Center horizontally
                        filter: "drop-shadow(0px 25px 25px rgba(0,0,0,0.5))"
                    }}
                    className="absolute top-1/2 left-1/2 w-[500px] md:w-[700px] lg:w-[900px] -translate-y-1/2"
                >
                    <Image
                        src="/eagle/eagle.png"
                        alt="Eagle top view"
                        width={1000}
                        height={600}
                        priority
                        className="w-full h-auto object-contain"
                    />
                </motion.div>

                {/* 5. DRAWING LAYER */}
                {/* Appears EXACTLY where Eagle fades out */}
                <motion.div
                    style={{
                        y: eagleY, // Matches Eagle Y
                        opacity: drawingOpacity,
                        scale: eagleScale, // Matches Eagle Scale
                        x: "-50%", // Center horizontally
                    }}
                    className="absolute top-1/2 left-1/2 w-[450px] md:w-[625px] lg:w-[800px] -translate-y-1/2 z-10"
                >
                    <Image
                        src="/drawing/new.png"
                        alt="Eagle Technical Drawing"
                        width={1000}
                        height={600}
                        className="w-full h-auto object-contain opacity-80 mix-blend-multiply"
                    />
                </motion.div>

            </div>
        </div>
    );
}
