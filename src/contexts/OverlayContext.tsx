"use client";

import { createContext, useContext, ReactNode } from "react";
import { MotionValue, useMotionValue } from "framer-motion";

interface OverlayContextType {
    overlayOpacity: MotionValue<number>;
}

const OverlayContext = createContext<OverlayContextType>({
    overlayOpacity: new MotionValue(0) // Default dummy value
});

export function OverlayProvider({ children, value }: { children: ReactNode; value: OverlayContextType }) {
    return (
        <OverlayContext.Provider value={value}>
            {children}
        </OverlayContext.Provider>
    );
}

export function useOverlayOpacity() {
    return useContext(OverlayContext);
}
