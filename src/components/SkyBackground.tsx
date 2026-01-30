"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Procedural cloud shapes using CSS shapes + varying opacity/blur
const Cloud = ({
    duration,
    delay,
    top,
    scale,
    opacity
}: {
    duration: number,
    delay: number,
    top: string,
    scale: number,
    opacity: number
}) => {
    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100vw" }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
            }}
            className="absolute left-0 w-[80vw] md:w-[60vw]"
            style={{
                top: top,
                opacity: opacity,
                scale: scale,
                filter: "blur(60px)", // Heavy blur for "volumetric" look
                willChange: "transform"
            }}
        >
            {/* Cloud Shape Composition */}
            <div className="relative w-full h-64 bg-white/40 rounded-full" />
            <div className="absolute top-[-30px] left-[20%] w-[60%] h-48 bg-white/30 rounded-full" />
            <div className="absolute top-[20px] left-[50%] w-[40%] h-56 bg-white/20 rounded-full" />
        </motion.div>
    );
};

export default function SkyBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Stable container immediately rendered to fix hydration "insertBefore" error
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#4FABF4] via-[#89CFF0] to-[#CBE6FA]">
            {/* Base Atmosphere */}
            <div className="absolute inset-0 bg-white/5" />

            {/* Animated Clouds - Only render on client to avoid hydration mismatch, but keep container stable */}
            {mounted && (
                <>
                    {/* Layer 1: Slow, distant clouds */}
                    <Cloud duration={45} delay={0} top="10%" scale={0.8} opacity={0.6} />
                    <Cloud duration={50} delay={25} top="20%" scale={0.7} opacity={0.5} />

                    {/* Layer 2: Mid-range */}
                    <Cloud duration={35} delay={5} top="40%" scale={1} opacity={0.4} />
                    <Cloud duration={38} delay={19} top="30%" scale={0.9} opacity={0.4} />

                    {/* Layer 3: Closer, faster (creates parallax depth) */}
                    <Cloud duration={25} delay={10} top="60%" scale={1.2} opacity={0.3} />
                    <Cloud duration={28} delay={2} top="70%" scale={1.1} opacity={0.2} />
                </>
            )}

            {/* Subtle vignette/gradient overlay to ground the scene */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>
    );
}
