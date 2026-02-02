"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ScrollAnimatedSection({ children }: { children?: React.ReactNode }) {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Full-screen overlay opacity - transitions over 4.5 scrolls
    const overlayOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.8, 1],
        [0, 0.4, 0.8, 1]
    );

    // Text animation: move from bottom to center (0-45%), then stay pinned
    const textY = useTransform(
        scrollYProgress,
        [0, 0.45, 1],
        ["100vh", "0vh", "0vh"] // Move up until 45%, then stay
    );

    const textOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.45, 1],
        [0, 1, 1, 1] // Fade in by 20%, stay visible
    );

    // Eagle animation: rise from bottom to center during 45-100%
    const eagleY = useTransform(
        scrollYProgress,
        [0, 0.45, 1],
        ["150vh", "150vh", "-50vh"] // Stay below until 45%, then rise to center
    );

    const eagleOpacity = useTransform(
        scrollYProgress,
        [0.45, 0.55, 1],
        [0, 1, 1] // Fade in as it rises
    );

    const eagleScale = useTransform(
        scrollYProgress,
        [0.45, 1],
        [0.8, 1] // Slight scale up for dramatic effect
    );

    return (
        <div ref={sectionRef} className="relative min-h-[450vh]" id="transition-zone">
            {/* Full-screen fixed overlay that fades in over scrolls */}
            <motion.div
                style={{ opacity: overlayOpacity }}
                className="fixed inset-0 z-[5] pointer-events-none bg-[#FDF5E6]"
            />

            {/* Pinned Text Container */}
            <div className="sticky top-0 h-screen flex items-start justify-center pointer-events-none z-20 pt-[40vh]">
                <motion.div
                    style={{ y: textY, opacity: textOpacity }}
                    className="w-full max-w-[1600px] mx-auto px-12 md:px-16 lg:px-20 flex items-start justify-between"
                >
                    {/* Left Text: "Fly in" - Far left */}
                    <div className="flex flex-col">
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-none" style={{ fontFamily: 'var(--font-syncopate)' }}>
                            Fly in
                        </h2>
                        <p className="text-xs md:text-sm mt-4 text-black/70 leading-relaxed max-w-[120px]" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Luxury<br />that moves<br />with you
                        </p>
                    </div>

                    {/* Center: Eagle Image - Rises from bottom during 45-100% */}
                    <motion.div
                        style={{
                            y: eagleY,
                            opacity: eagleOpacity,
                            scale: eagleScale,
                            filter: "drop-shadow(0px 25px 25px rgba(0,0,0,0.5))" // Shadow below for 3D effect
                        }}
                        className="absolute left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] lg:w-[900px]"
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
                </motion.div>
            </div>

            {/* Actual content section */}
            <section className="relative z-10 min-h-screen py-32 px-24">
                <div className="max-w-7xl mx-auto">
                    {children || <div>{/* Placeholder for future content */}</div>}
                </div>
            </section>
        </div>
    );
}
