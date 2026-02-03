"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const BusinessCard = ({
    title,
    link,
    imageSrc,
    delay = 0,
    rotate = 0,
    className = "",
    dragConstraints
}: {
    title: string;
    link: string;
    imageSrc: string;
    delay?: number;
    rotate?: number;
    className?: string;
    dragConstraints?: React.RefObject<HTMLElement | null>;
}) => {
    return (
        <motion.div
            drag
            dragConstraints={dragConstraints}
            whileDrag={{ scale: 1.05, cursor: "grabbing" }}
            whileHover={{ scale: 1.02, rotate: 0 }}
            animate={{
                y: [0, -20, 0],
                rotate: [rotate - 2, rotate + 2, rotate - 2]
            }}
            transition={{
                y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                },
                rotate: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay
                }
            }}
            className={`
                relative w-[260px] md:w-[300px] aspect-[3/4] bg-white text-black rounded-3xl overflow-hidden shadow-2xl 
                cursor-grab active:cursor-grabbing border border-black/5 group ${className}
            `}
        >
            {/* Image Section */}
            <div className="relative h-[75%] w-full overflow-hidden">
                <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
            </div>

            {/* Content Section */}
            <div className="h-[30%] px-6 flex items-center justify-between bg-white relative z-10">
                <h3 className="text-2xl font-bold tracking-tight text-black" style={{ fontFamily: 'var(--font-outfit)' }}>
                    {title}
                </h3>

                {/* Interactive Arrow Button */}
                <Link
                    href={link}
                    target="_blank"
                    // Stop drag propagation to ensure click works
                    onPointerDown={(e) => e.stopPropagation()}
                    className="
                        w-12 h-12 rounded-full border border-black/10 flex items-center justify-center
                        hover:bg-black hover:text-white transition-all duration-300
                        active:scale-95
                    "
                >
                    <ArrowUpRight className="w-5 h-5" />
                </Link>
            </div>
        </motion.div>
    );
};

export default function OurWork() {
    const containerRef = useRef<HTMLElement>(null);

    return (
        <section ref={containerRef} className="relative z-50 min-h-screen w-full bg-[#FDF5E6] py-32 overflow-hidden">
            <div className="max-w-[1800px] mx-auto px-8 md:px-16 lg:px-24 h-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">

                {/* Left Side: Sticky Title */}
                <div className="lg:sticky lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-20%" }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[12vw] lg:text-[10vw] font-bold leading-[0.85] tracking-tighter text-black uppercase opacity-90" style={{ fontFamily: 'var(--font-syncopate)' }}>
                            Our<br />Work
                        </h2>
                        <div className="w-24 h-1 bg-black/80 mt-8 mb-6" />
                        <p className="text-black/70 max-w-sm text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>
                            Interact with our featured projects. Drag to explore, click to discover more.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side: Floating Cards Container */}
                <div className="relative w-full lg:w-2/3 min-h-[600px] flex items-center justify-center lg:justify-end perspective-[1000px]">

                    {/* Card 1: Google */}
                    <div className="absolute top-10 right-[35%] z-10">
                        <BusinessCard
                            title="Google"
                            link="https://google.com"
                            imageSrc="https://images.unsplash.com/photo-1481487484168-9b930d5b206d?q=80&w=1000&auto=format&fit=crop"
                            delay={0}
                            rotate={-6}
                            dragConstraints={containerRef}
                        />
                    </div>

                    {/* Card 2: Facebook */}
                    <div className="absolute top-32 right-[5%] z-20">
                        <BusinessCard
                            title="Facebook"
                            link="https://facebook.com"
                            imageSrc="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000&auto=format&fit=crop"
                            delay={1.5}
                            rotate={4}
                            dragConstraints={containerRef}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}
