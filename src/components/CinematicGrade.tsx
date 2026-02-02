"use client";

export default function CinematicGrade() {
    return (
        <div className="fixed inset-0 z-[100] pointer-events-none">
            {/* 1. Vignette: Darkens corners to focus center and hide window edges */}
            <div
                className="absolute inset-0"
                style={{
                    background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.3) 100%)"
                }}
            />

            {/* 2. Color Tone: Subtle Teal/Blue tint to unify Sky and Window colors */}
            <div
                className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
                style={{
                    backgroundColor: "#0d3b66" // Deep muted blue
                }}
            />
        </div>
    );
}
