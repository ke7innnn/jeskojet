"use client";

import { MotionValue, useTransform, motion } from "framer-motion";

interface OverlayProps {
    scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
    // Section 1: Center
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // Section 2: Left
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.55], [50, -50]);

    // Section 3: Right
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.85], [50, -50]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center">
            {/* Section 1 - Center */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
            >
                <h1 className="text-6xl md:text-8xl font-heading font-bold tracking-tighter uppercase mb-4 text-white mix-blend-difference">
                    New Season<br />Collection
                </h1>
                <p className="text-xl md:text-2xl font-light tracking-[0.2em] uppercase text-white/80">
                    Designed for the bold.
                </p>
            </motion.div>

            {/* Section 2 - Left */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex flex-col items-start justify-center pl-10 md:pl-32 pointer-events-none"
            >
                <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-wide uppercase text-white mb-2">
                    Sculpted<br />Silhouettes
                </h2>
                <p className="text-lg md:text-xl font-light tracking-[0.15em] text-white/80">
                    Premium Fabrics.
                </p>
            </motion.div>

            {/* Section 3 - Right */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex flex-col items-end justify-center pr-10 md:pr-32 pointer-events-none"
            >
                <h2 className="text-5xl md:text-7xl font-heading font-medium tracking-wide uppercase text-right text-white mb-2">
                    Street Meets<br />Luxury
                </h2>
                <p className="text-lg md:text-xl font-light tracking-[0.15em] text-right text-white/80">
                    Limited Edition.
                </p>
            </motion.div>
        </div>
    );
}
