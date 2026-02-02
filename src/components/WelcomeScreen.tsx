"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen({ onComplete }: { onComplete?: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Disable scroll immediately
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        // Wait 2 seconds then start exit
        const timer = setTimeout(() => {
            setIsVisible(false);

            // Wait for exit animation (1.5s) + minimal buffer to complete before enabling scroll
            setTimeout(() => {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                if (onComplete) onComplete();
            }, 2000);
        }, 2000);

        return () => {
            // Safety cleanup
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            clearTimeout(timer);
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
