"use client";

import { useEffect, useState } from "react";
import { useLoading } from "@/context/LoadingContext";
import { motion, AnimatePresence } from "framer-motion";

// Assets to preload explicitly since they might not be in the render tree immediately or we want to ensure they are ready
const ASSETS_TO_PRELOAD = [
    "/window-overlay-hd.png", // WindowZoom
    "/sequence/frame_040.png", // ProductGrid SKU
    "/sequence/frame_045.png", // ProductGrid SKU
    "/sequence/frame_050.png", // ProductGrid SKU
];

export default function LoadingScreen() {
    const { isLoading, setIsLoading, registerResource, markResourceLoaded, progress } = useLoading();
    const [isVisible, setIsVisible] = useState(true);

    // Register and load assets
    useEffect(() => {
        // 1. Register all assets first
        ASSETS_TO_PRELOAD.forEach((src) => registerResource(src));

        // 2. Load them
        const loadImages = async () => {
            const promises = ASSETS_TO_PRELOAD.map((src) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = src;
                    // Whether success or error, we mark as loaded so we don't hang
                    img.onload = () => {
                        markResourceLoaded(src);
                        resolve();
                    };
                    img.onerror = () => {
                        console.error(`Failed to load asset: ${src}`);
                        markResourceLoaded(src);
                        resolve();
                    };
                });
            });

            await Promise.all(promises);

            // Add a small buffer time for smoothness
            setTimeout(() => {
                setIsLoading(false);
            }, 800);
        };

        loadImages();
    }, []); // Run once on mount

    // Lock scroll
    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        } else {
            // Restore scroll after exit animation
            const timer = setTimeout(() => {
                document.body.style.overflow = "";
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    // Handle visibility transition
    useEffect(() => {
        if (!isLoading) {
            // Delay removing from DOM slightly after opacity transition
            const timer = setTimeout(() => setIsVisible(false), 1000); // 1s matches exit duration
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                >
                    {/* Logo or Brand Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-5xl uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-michroma)' }}>
                            Jesko Jets
                        </h1>
                    </motion.div>

                    {/* Progress Bar Container */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>

                    {/* Percentage / Status */}
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <span className="text-xs uppercase tracking-widest text-white/50 font-sans">
                            System Initialization
                        </span>
                        <span className="text-sm font-mono text-white/80">
                            {Math.round(progress)}%
                        </span>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
