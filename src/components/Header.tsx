"use client";

import { useState } from "react";

export default function Header() {
    const [activeLink, setActiveLink] = useState("");

    const navItems = [
        { label: "About", href: "#about" },
        { label: "Our Fleet", href: "#fleet" },
        { label: "Advantages", href: "#advantages" },
        { label: "Global", href: "#global" }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-auto">

            {/* Content */}
            <div className="relative px-8 md:px-16 py-4 flex items-center justify-between">

                {/* Left: Navigation Links */}
                <nav className="flex items-center gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveLink(item.label)}
                            className={`
                                text-sm font-medium tracking-wide uppercase
                                transition-all duration-300
                                hover:text-white
                                ${activeLink === item.label ? 'text-white' : 'text-white/80'}
                            `}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Center: Logo (Will be filled by animation) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-lg font-sans font-medium tracking-wide uppercase text-white opacity-0 transition-opacity duration-500" id="header-logo">
                        ke7innn
                    </div>
                </div>

                {/* Right: Contact Info */}
                <div className="flex items-center gap-8">
                    <a
                        href="tel:+97154432506"
                        className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                    >
                        +971 54 432 5060
                    </a>
                    <a
                        href="mailto:info@jeskojets.com"
                        className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
                    >
                        info@jeskojets.com
                    </a>
                </div>
            </div>
        </header>
    );
}
