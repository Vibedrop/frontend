"use client";
import { createContext, useContext, useRef, ReactNode } from "react";

const AudioContext =
    createContext<React.RefObject<HTMLAudioElement | null> | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    return (
        <AudioContext.Provider value={audioRef}>
            {children}
            <audio ref={audioRef} hidden loop />
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error("useAudio must be used within an AudioProvider");
    }
    return context;
}
