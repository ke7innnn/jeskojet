"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    // Optimized Lenis options for production deployment
    const lenisOptions = {
        lerp: 0.08, // Slightly smoother interpolation
        duration: 1.2, // Faster response
        smoothTouch: false, // Disable on mobile for better performance
        wheelMultiplier: 1,
        touchMultiplier: 2,
        normalizeWheel: true,
        infinite: false,
    };

    return (
        <ReactLenis root options={lenisOptions}>
            {children as any}
        </ReactLenis>
    );
}
