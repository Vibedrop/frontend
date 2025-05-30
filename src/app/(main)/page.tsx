"use client";
import { useEffect } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useRouter } from "next/navigation";
import { useAudio } from "@/context/AudioContext";
import { useAudioStore } from "@/stores/useAudioStore";
import DialogSquare from "@/components/UI/DialogSquare";

export default function Page() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/start");
        }
    }, [isAuthenticated, router]);

    const audioRef = useAudio();
    const {
        setCurrentSong,
        setCurrentSongId,
        setIsPlaying,
        setCurrentTime,
        setDuration,
    } = useAudioStore();

    const { ownedProjects } = useProjectStore();
    const { isOpen } = useSidebarStore();

    useEffect(() => {
        if (typeof window === "undefined") return;

        setCurrentSong(null);
        setCurrentSongId(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);

        if (audioRef?.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
    }, [
        audioRef,
        setCurrentSong,
        setCurrentSongId,
        setCurrentTime,
        setDuration,
        setIsPlaying,
    ]);

    useEffect(() => {
        useProjectStore.setState({
            currentProject: null,
            currentProjectForPlayer: null,
            owner: null,
            collaborators: null,
            audioFiles: null,
            sortedAudioFiles: null,
        });
    }, []);

    return (
        <Flex
            className={`flex-col w-full max-w-[1080px] h-full mt-[8vw] gap-md self-center transition-all ${isOpen ? "2xl:ml-[-320px]" : "2xl:ml-[-80px]"}`}
        >
            <Flex className="flex-col gap-y-xl items-center">
                <Text className="text-header-m max-w-[700px] text-center">
                    {ownedProjects && ownedProjects?.length > 0
                        ? "Got a new idea? Start a fresh project and keep the momentum going."
                        : "Ready to bring your ideas to life? Start your first project and turn your creativity into something real."}
                </Text>

                <DialogSquare triggerClass="has-icon-left" />
            </Flex>
        </Flex>
    );
}
