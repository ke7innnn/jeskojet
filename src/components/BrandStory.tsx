"use client";

import { motion } from "framer-motion";

const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
};

export default function BrandStory() {
    return (
        <section className="relative z-10 flex flex-col items-center justify-center gap-40 py-32 px-6">

            {/* Section 1 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={textVariants}
                className="max-w-2xl text-center"
            >
                <h3 className="text-2xl md:text-4xl font-heading uppercase tracking-widest text-[#1a1917] mb-4">
                    Unbound Freedom
                </h3>
                <p className="text-lg md:text-xl font-light text-[#2c3e50]/80 leading-relaxed font-sans">
                    Like the open sky, true luxury knows no boundaries. We design for those who move through the world with purpose and grace, defying the gravity of the ordinary.
                </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={textVariants}
                className="max-w-2xl text-center"
            >
                <h3 className="text-2xl md:text-4xl font-heading uppercase tracking-widest text-[#1a1917] mb-4">
                    Fluid Movement
                </h3>
                <p className="text-lg md:text-xl font-light text-[#2c3e50]/80 leading-relaxed font-sans">
                    Every stitch is engineered for motion. Our silhouettes breathe with you, adapting to your journey from the runway to the stratosphere.
                </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                variants={textVariants}
                className="max-w-2xl text-center"
            >
                <h3 className="text-2xl md:text-4xl font-heading uppercase tracking-widest text-[#1a1917] mb-4">
                    Above The Clouds
                </h3>
                <p className="text-lg md:text-xl font-light text-[#2c3e50]/80 leading-relaxed font-sans">
                    Rise above the noise. In the silence of the altitude, details matter most. We craft the future of fashion for those who dare to look up.
                </p>
            </motion.div>

        </section>
    );
}
