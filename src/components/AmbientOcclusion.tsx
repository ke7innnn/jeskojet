"use client";

export default function AmbientOcclusion() {
    return (
        <div className="fixed inset-0 z-[95] pointer-events-none">
            {/* Corner darkening - Simulates shadow accumulation where surfaces meet */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    background: `
            radial-gradient(circle at 20% 20%, transparent 40%, rgba(0,0,0,0.3) 100%),
            radial-gradient(circle at 80% 20%, transparent 40%, rgba(0,0,0,0.3) 100%),
            radial-gradient(circle at 20% 80%, transparent 40%, rgba(0,0,0,0.3) 100%),
            radial-gradient(circle at 80% 80%, transparent 40%, rgba(0,0,0,0.3) 100%)
          `
                }}
            />

            {/* Edge occlusion - Darkens screen edges for depth */}
            <div
                className="absolute inset-0 opacity-[0.1]"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)"
                }}
            />
        </div>
    );
}
