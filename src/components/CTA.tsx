"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";

export default function CTA() {
    return (
        <section className="relative py-40 flex flex-col items-center justify-center bg-transparent overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-green/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-9xl font-heading font-black uppercase text-white tracking-tighter mb-12"
                >
                    Wear The<br />Future.
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <MagneticButton>
                        <span className="relative z-10">Shop Collection</span>
                    </MagneticButton>
                    <MagneticButton variant="outline">
                        <span className="relative z-10">View Lookbook</span>
                    </MagneticButton>
                </div>
            </div>
        </section>
    );
}

function MagneticButton({ children, variant = "primary" }: { children: React.ReactNode, variant?: "primary" | "outline" }) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.1, y: y * 0.1 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative px-12 py-4 rounded-full text-sm uppercase tracking-widest font-medium transition-colors duration-300 overflow-hidden group";
    const variants = {
        primary: "bg-white text-black hover:bg-gray-200",
        outline: "border border-white/30 text-white hover:border-white hover:bg-white/5"
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={`${baseStyles} ${variants[variant]}`}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
