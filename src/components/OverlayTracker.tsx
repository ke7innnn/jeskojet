"use client";

import { useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { OverlayProvider } from "@/contexts/OverlayContext";

export default function OverlayTracker({ children }: { children: React.ReactNode }) {
    const [transitionElement, setTransitionElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Delay to ensure DOM is fully rendered
        const timer = setTimeout(() => {
            const element = document.getElementById("transition-zone");
            if (element) {
                setTransitionElement(element);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const { scrollYProgress } = useScroll({
        target: transitionElement ? { current: transitionElement } : undefined,
        offset: ["start start", "end end"]
    });

    // Transform scroll to overlay opacity (same as ScrollAnimatedSection)
    const overlayOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.8, 1],
        [0, 0.4, 0.8, 1]
    );

    return (
        <OverlayProvider value={{ overlayOpacity }}>
            {children}
        </OverlayProvider>
    );
}
