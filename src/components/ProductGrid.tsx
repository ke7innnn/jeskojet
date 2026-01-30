"use client";

import { motion } from "framer-motion";

const products = [
    {
        id: 1,
        name: "Architectural Coat",
        price: "$1,290",
        image: "/sequence/frame_040.png", // Reusing an asset as placeholder if needed, or placeholder color
    },
    {
        id: 2,
        name: "Structured Blazer",
        price: "$895",
        image: "/sequence/frame_045.png",
    },
    {
        id: 3,
        name: "Pleated Trousers",
        price: "$550",
        image: "/sequence/frame_050.png",
    },
];

export default function ProductGrid() {
    return (
        <section className="relative z-10 py-32 px-6 md:px-12 bg-transparent border-t border-white/10">
            <div className="max-w-7xl mx-auto">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-heading uppercase text-white mb-20 tracking-tighter"
                >
                    Selected Pieces
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-white/5 border border-white/5 rounded-sm transition-all duration-500 group-hover:border-white/20">
                                <div className="absolute inset-0 bg-gradient-to-tr from-luxury-green/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                                {/* Using a solid color or gradient as fallback if image fails, or the actual frame */}
                                {/* Ideally we would have real product images, using frame placeholders for now */}
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    style={{ backgroundImage: `url(${product.image})` }}
                                />
                            </div>

                            {/* Info */}
                            <div className="mt-6 flex justify-between items-end">
                                <div>
                                    <h4 className="text-lg font-light tracking-wide text-white uppercase">{product.name}</h4>
                                    <p className="text-sm text-gray-400 mt-1">FW24 Collection</p>
                                </div>
                                <span className="text-lg font-medium text-white">{product.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
