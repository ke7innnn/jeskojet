"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

function AnimatedParagraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.8", "end 0.3"]
    });

    const text = "Jesko Jets® is a private aviation operator with over 5,000 missions completed across 150+ countries. From international executives to global industries, our clients trust us to deliver on time, every time.";
    const words = text.split(" ");

    return (
        <div ref={containerRef} className="relative">
            {/* Text content */}
            <p className="text-xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-[1.2] tracking-tight" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>
                {words.map((word, index) => {
                    const start = index / words.length;
                    const end = (index + 1) / words.length;
                    const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);

                    return (
                        <motion.span
                            key={index}
                            style={{ opacity }}
                            className="inline-block mr-[0.3em]"
                        >
                            {word}
                        </motion.span>
                    );
                })}
            </p>
        </div>
    );
}

export default function BrandStory() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center gap-40 py-32 px-24">

            {/* Section 1 - Animated Paragraph */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={textVariants}
                className="w-full max-w-none text-left relative"
            >
                <AnimatedParagraph />
            </motion.div>

            {/* Content Grid with Branding */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">

                {/* Branding - First item in grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                    variants={textVariants}
                    className="flex flex-row items-center justify-start gap-4 flex-wrap"
                >
                    {/* Logo Icon */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                        </div>
                        <div className="text-xl text-white/80" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>
                            JJ
                        </div>
                    </div>

                    {/* EST. 2013 */}
                    <div className="flex items-baseline gap-1">
                        <div className="text-xs text-white/60 font-sans">EST.</div>
                        <div className="text-base text-white/80" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>2013</div>
                    </div>

                    {/* BY EVGENY DEMIDENKO */}
                    <div className="flex items-center">
                        <div className="text-xs text-white/60 font-sans uppercase tracking-wider">BY EVGENY DEMIDENKO</div>
                    </div>
                </motion.div>

                {/* Section 1 - Direct Access to Private Travel */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                    variants={textVariants}
                    className="text-left"
                >
                    <h3 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>
                        Direct Access to Private Travel
                    </h3>
                    <div className="w-12 h-0.5 bg-white/40 mb-4"></div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 leading-relaxed font-sans">
                        Fly beyond boundaries with Jesko Jets. Our global operations ensure seamless, personalized travel experiences — from the first call to landing. Every journey is tailored to your comfort, privacy, and schedule.
                    </p>
                </motion.div>

                {/* Section 2 - Your Freedom to Enjoy Life */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                    variants={textVariants}
                    className="text-left"
                >
                    <h3 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>
                        Your Freedom to Enjoy Life
                    </h3>
                    <div className="w-12 h-0.5 bg-white/40 mb-4"></div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 leading-relaxed font-sans">
                        We value your time above all. Jesko Jets gives you the freedom to live, work, and relax wherever life takes you — without compromise.
                    </p>
                </motion.div>

                {/* Section 3 - Precision and Excellence */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                    variants={textVariants}
                    className="text-left md:col-start-2"
                >
                    <h3 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>
                        Precision and Excellence
                    </h3>
                    <div className="w-12 h-0.5 bg-white/40 mb-4"></div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 leading-relaxed font-sans">
                        Each detail of your flight — from route planning to in-flight service — reflects our dedication to perfection. Our crew and fleet meet the highest global standards, ensuring reliability in every mission.
                    </p>
                </motion.div>

                {/* Section 4 - Global Reach, Personal Touch */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20%" }}
                    variants={textVariants}
                    className="text-left"
                >
                    <h3 className="text-xl md:text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-syncopate)', fontWeight: 700 }}>
                        Global Reach, Personal Touch
                    </h3>
                    <div className="w-12 h-0.5 bg-white/40 mb-4"></div>
                    <p className="text-xs md:text-sm font-semibold text-white/80 leading-relaxed font-sans">
                        With access to destinations in over 150 countries, Jesko Jets brings the world closer to you. Our experts manage every aspect of your flight, guaranteeing a smooth and effortless journey.
                    </p>
                </motion.div>

            </div>

        </section>
    );
}
