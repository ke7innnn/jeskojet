"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import RobotModel from "./RobotModel";

export default function Ke7innnSection() {
    return (
        <section className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden z-50">
            {/* Background Gradient: Lighter Grey */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#888888] to-[#555555]" />

            {/* Optional Grain/Noise overlay for texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* 3D Robot Model Canvas */}
            <div className="absolute inset-0 z-20">
                <Canvas
                    camera={{ position: [0, 0, 5], fov: 50 }}
                    style={{ background: "transparent" }}
                >
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 5, 5]} intensity={1} />
                    <Suspense fallback={null}>
                        <RobotModel />
                    </Suspense>
                </Canvas>
            </div>

            {/* Hero Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-full text-center"
            >
                <h1
                    className="
                        text-[12vw] font-bold tracking-tighter leading-none uppercase
                        bg-clip-text text-transparent bg-gradient-to-b from-[#888888] to-black
                        drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]
                    "
                    style={{ fontFamily: 'var(--font-syncopate)' }}
                >
                    kE7INNN
                </h1>
            </motion.div>
        </section>
    );
}
