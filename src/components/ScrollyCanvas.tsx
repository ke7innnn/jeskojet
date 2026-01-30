"use client";

import { MotionValue, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrollyCanvasProps {
    children?: (progress: MotionValue<number>) => React.ReactNode;
}

export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Total frames in the sequence (000 to 074)
    const frameCount = 75;

    // Use Framer Motion's useScroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Create a transform that maps scroll 0-1 to frame index 0-74
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise((resolve, reject) => {
                    const img = new Image();
                    // Pad number with leading zeros (e.g., 001)
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `/sequence/frame_${paddedIndex}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve(true);
                    };
                    img.onerror = reject;
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    // Effect to render the canvas
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!canvasRef.current || !isLoaded || images.length === 0) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const index = Math.round(latest);
        const img = images[index];

        if (img) {
            // Clear and draw
            // Draw image covering the canvas (object-fit: cover equivalent)
            const canvas = canvasRef.current;
            const w = canvas.width; // Physical pixels
            const h = canvas.height; // Physical pixels

            // We want to scale the image to cover the canvas
            // But preserving aspect ratio
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawW, drawH, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                // Image is wider than canvas
                drawH = h;
                drawW = h * imgRatio;
                offsetX = (w - drawW) / 2;
                offsetY = 0;
            } else {
                // Image is taller or same
                drawW = w;
                drawH = w / imgRatio;
                offsetX = 0;
                offsetY = (h - drawH) / 2;
            }


            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
        }
    });

    // Resize handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set canvas internal resolution to match window size for high DPI
                const dpr = window.devicePixelRatio || 1;
                // set physical dimensions
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // set css dimensions
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;

                // No context scaling - drawing in physical pixels directly
                // allows for simpler math in the draw loop
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div ref={containerRef} className="h-[500vh] relative bg-background">
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                />

                {/* Loading State */}
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background z-50 text-foreground">
                        <span className="animate-pulse tracking-widest text-xs uppercase font-sans">Loading Sequence...</span>
                    </div>
                )}

                {/* Render Props for Children (Overlay) */}
                {children && children(scrollYProgress)}
            </div>
        </div>
    );
}
