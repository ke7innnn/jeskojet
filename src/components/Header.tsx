"use client";

import { useState, useEffect } from "react";
import { motion, useTransform, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { useOverlayOpacity } from "@/contexts/OverlayContext";

export default function Header() {
    const [activeLink, setActiveLink] = useState("");
    const { overlayOpacity } = useOverlayOpacity();

    // Transform opacity to text color (white -> black at 25%)
    const textColor = overlayOpacity
        ? useTransform(overlayOpacity, [0, 0.25, 0.26], ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 0.8)", "rgba(0, 0, 0, 0.8)"])
        : useMotionValue("rgba(255, 255, 255, 0.8)");

    const navItems = [
        { label: "About", href: "#about" },
        { label: "Our Fleet", href: "#fleet" },
        { label: "Advantages", href: "#advantages" },
        { label: "Global", href: "#global" }
    ];

    // SMOOTH FADE-IN - All together
    useEffect(() => {
        const timeline = gsap.timeline({ delay: 1.5 });

        // Fade in nav items (all at once)
        timeline.fromTo(
            ".nav-item",
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0, // No stagger - all together
                ease: "power2.out"
            }
        );

        // Fade in contact info (same time as nav)
        timeline.fromTo(
            ".contact-item",
            {
                opacity: 0,
                y: -20
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0, // No stagger - all together
                ease: "power2.out"
            },
            0 // Start at same time as nav items
        );
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-auto">

            {/* Content */}
            <div className="relative px-8 md:px-16 py-4 flex items-center justify-between">

                {/* Left: Navigation Links */}
                <nav className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveLink(item.label)}
                            className={`
                                nav-item opacity-0
                                text-sm tracking-wide
                                transition-all duration-300
                                hover:text-white
                                relative px-5 py-2
                                group
                                overflow-hidden
                            `}
                            style={{
                                fontFamily: "var(--font-outfit)",
                                fontWeight: 600,
                                color: textColor
                            }}
                        >
                            {/* 3D Rolling Text Container with Pill */}
                            <span className="relative inline-block">
                                {/* Glassmorphism Pill - positioned relative to this container */}
                                <span
                                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                                    style={{
                                        background: "rgba(255, 255, 255, 0.1)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "999px",
                                        left: "-1.25rem",
                                        right: "-1.25rem",
                                        top: "-0.5rem",
                                        bottom: "-0.5rem",
                                        zIndex: 0
                                    }}
                                />

                                {/* Text rolling container */}
                                <span className="relative z-10 inline-block overflow-hidden h-[1em] leading-none align-middle">
                                    <span
                                        className="flex flex-col transition-transform duration-500 group-hover:-translate-y-[50%]"
                                        style={{
                                            transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)"
                                        }}
                                    >
                                        {/* Original Text (slides up on hover) */}
                                        <span className="block h-[1em] leading-none flex items-center">{item.label}</span>
                                        {/* Duplicate Text (slides in from bottom on hover) */}
                                        <span className="block h-[1em] leading-none flex items-center">{item.label}</span>
                                    </span>
                                </span>
                            </span>
                        </motion.a>
                    ))}
                </nav>

                {/* Center: Logo (Will be filled by animation) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                        className="text-base uppercase opacity-0 transition-opacity duration-500"
                        id="header-logo"
                        style={{
                            fontFamily: "var(--font-michroma)",
                            fontWeight: 400,
                            letterSpacing: "0.1em",
                            color: textColor
                        }}
                    >
                        ke7innn
                    </motion.div>
                </div>

                {/* Right: Contact Info */}
                <div className="flex items-center gap-8">
                    <motion.a
                        href="tel:+97154432506"
                        className="contact-item opacity-0 text-sm hover:text-white transition-colors tracking-wide"
                        style={{
                            fontFamily: "var(--font-outfit)",
                            fontWeight: 600,
                            color: textColor
                        }}
                    >
                        +971 54 432 5060
                    </motion.a>
                    <motion.a
                        href="mailto:info@jeskojets.com"
                        className="contact-item opacity-0 text-sm hover:text-white transition-colors tracking-wide"
                        style={{
                            fontFamily: "var(--font-outfit)",
                            fontWeight: 600,
                            color: textColor
                        }}
                    >
                        info@jeskojets.com
                    </motion.a>
                </div>
            </div>
        </header>
    );
}
