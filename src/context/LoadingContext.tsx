"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    registerResource: (id: string) => void;
    markResourceLoaded: (id: string) => void;
    progress: number;
}

const LoadingContext = createContext<LoadingContextType>({
    isLoading: true,
    setIsLoading: () => { },
    registerResource: () => { },
    markResourceLoaded: () => { },
    progress: 0,
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [resources, setResources] = useState<Set<string>>(new Set());
    const [loadedResources, setLoadedResources] = useState<Set<string>>(new Set());
    const [progress, setProgress] = useState(0);

    // Register a resource to be tracked
    const registerResource = (id: string) => {
        setResources((prev) => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    // Mark a resource as loaded
    const markResourceLoaded = (id: string) => {
        setLoadedResources((prev) => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    };

    // Calculate progress
    useEffect(() => {
        if (resources.size === 0) {
            setProgress(100);
            return;
        }
        const completion = (loadedResources.size / resources.size) * 100;
        setProgress(completion);
    }, [resources.size, loadedResources.size]);

    // Minimum loading time enforcement (optional, but good for UX)
    // We'll leave it to the LoadingScreen to decide when to actually hide based on progress

    return (
        <LoadingContext.Provider
            value={{
                isLoading,
                setIsLoading,
                registerResource,
                markResourceLoaded,
                progress,
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
}
