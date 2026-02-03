"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactSection() {
    const socialLinks = [
        { icon: FaInstagram, url: "https://instagram.com/jeskojets", label: "Instagram" },
        { icon: FaTwitter, url: "https://twitter.com/jeskojets", label: "Twitter" },
        { icon: FaLinkedin, url: "https://linkedin.com/company/jeskojets", label: "LinkedIn" },
        { icon: FaFacebook, url: "https://facebook.com/jeskojets", label: "Facebook" },
    ];

    const contactInfo = [
        { icon: FaPhone, text: "+971 54 432 5060", href: "tel:+971544325060" },
        { icon: FaEnvelope, text: "info@jeskojets.com", href: "mailto:info@jeskojets.com" },
        { icon: FaMapMarkerAlt, text: "Dubai, UAE", href: null },
    ];

    return (
        <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#555555] to-[#2c3e50] z-50">
            {/* Noise texture overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <h2
                        className="text-6xl md:text-7xl font-bold tracking-tighter uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
                        style={{ fontFamily: 'var(--font-syncopate)' }}
                    >
                        Get in Touch
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-inter)' }}>
                        Ready to elevate your journey? Connect with us today.
                    </p>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
                >
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                        >
                            <item.icon className="text-4xl text-white/80" />
                            {item.href ? (
                                <a
                                    href={item.href}
                                    className="text-white/90 hover:text-white transition-colors text-center"
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {item.text}
                                </a>
                            ) : (
                                <span
                                    className="text-white/90 text-center"
                                    style={{ fontFamily: 'var(--font-outfit)' }}
                                >
                                    {item.text}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Media Links */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex justify-center items-center gap-6"
                >
                    {socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                        >
                            <social.icon className="text-2xl text-white/90" />
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
