"use client";

export default function AtmosphericDepth() {
    return (
        <div className="fixed inset-0 z-[90] pointer-events-none">
            {/* Atmospheric Perspective - Blue depth gradient */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    background: "radial-gradient(circle at center, transparent 30%, rgba(100,149,237,0.4) 100%)"
                }}
            />

            {/* God Rays - Volumetric light scattering from window center */}
            <div
                className="absolute inset-0 opacity-[0.12] mix-blend-screen"
                style={{
                    background: "radial-gradient(ellipse at center, rgba(255,255,255,0.3) 0%, transparent 50%)"
                }}
            />

            {/* Depth haze - Makes distant elements feel further */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    background: "linear-gradient(to bottom, rgba(135,206,235,0.2) 0%, transparent 50%, rgba(135,206,235,0.1) 100%)"
                }}
            />
        </div>
    );
}
