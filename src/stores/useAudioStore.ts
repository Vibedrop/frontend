import { create } from "zustand";
import { BACKEND_URL } from "@/utilities/config";
import { AudioFile, Project } from "@/types";

interface SongStore {
    s3Url: string;
    currentSong: AudioFile | null;
    currentSongId: number | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    isBuffering: boolean;
    volume: number;
    fetchS3: (projectId: String, s3Key: String) => void;
    // setCurrentSong: (song: AudioFile) => void;
    // setCurrentSongId: (id: number) => void;

    setCurrentSong: (song: AudioFile | null) => void;
    setCurrentSongId: (id: number | null) => void;

    setIsPlaying: (isPlaying: boolean) => void;
    setCurrentTime: (currentTime: number) => void;
    setDuration: (duration: number) => void;
    setIsBuffering: (isBuffering: boolean) => void;
    setVolume: (volume: number) => void;
}

export const useAudioStore = create<SongStore>(set => ({
    s3Url: "",
    currentSong: null,
    currentSongId: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isBuffering: false,
    volume: 1,
    fetchS3: async (projectId, s3key) => {
        try {
            const response = await fetch(
                `${BACKEND_URL}/audio/${projectId}/${s3key}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            if (response.ok) {
                const data = await response.json();
                console.log("data.url", data.url);
                set({ s3Url: data.url });
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    },
    setCurrentSong: song => set({ currentSong: song }),
    setCurrentSongId: currentSongId => set({ currentSongId }),
    setIsPlaying: isPlaying => set({ isPlaying }),
    setCurrentTime: currentTime => set({ currentTime }),
    setDuration: duration => set({ duration }),
    setIsBuffering: isBuffering => set({ isBuffering }),
    setVolume: volume => set({ volume }),
}));
