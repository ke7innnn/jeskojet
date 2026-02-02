"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen({ onComplete }: { onComplete?: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // 1. CSS Lock (Fallback)
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // 2. Aggressive Event Lock (Stops Lenis & System Scroll)
        const preventScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        // Use capture phase to intercept fully
        const options = { capture: true, passive: false };

        window.addEventListener('wheel', preventScroll, options);
        window.addEventListener('touchmove', preventScroll, options);
        window.addEventListener('keydown', preventScroll, options); // Blocks arrow keys/space

        // UNLOCK after 4 seconds total
        const unlockTimer = setTimeout(() => {
            window.removeEventListener('wheel', preventScroll, options);
            window.removeEventListener('touchmove', preventScroll, options);
            window.removeEventListener('keydown', preventScroll, options);

            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            if (onComplete) onComplete();
        }, 4000);

        // Start fade out at 2 seconds
        const fadeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => {
            window.removeEventListener('wheel', preventScroll, options);
            window.removeEventListener('touchmove', preventScroll, options);
            window.removeEventListener('keydown', preventScroll, options);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            clearTimeout(unlockTimer);
            clearTimeout(fadeTimer);
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-white text-4xl md:text-6xl lg:text-8xl tracking-[0.2em] font-light"
                        style={{ fontFamily: 'var(--font-syncopate)' }}
                    >
                        WELCOME
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
