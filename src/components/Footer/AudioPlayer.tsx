"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAudioStore } from "@/stores/useAudioStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { Avatar, Flex, Slider, Text } from "@radix-ui/themes";
import {
    LoaderCircle,
    Volume2,
    VolumeX,
    PauseCircle,
    PlayCircle,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { formatTime } from "@/lib/formatTime";
import { truncate } from "@/lib/utils";
import { useAudio } from "@/context/AudioContext";
import Link from "next/link";

import { useAuthStore } from "@/stores/useAuthStore";

export default function AudioPlayer() {
    const { user } = useAuthStore();

    const { projectId } = useParams<{ projectId: string }>();
    const audioRef = useAudio();
    const {
        s3Url,
        fetchS3,
        currentSong,
        setCurrentSong,
        currentSongId,
        setCurrentSongId,
        isPlaying,
        setIsPlaying,
        currentTime,
        setCurrentTime,
        duration,
        setDuration,
        isBuffering,
        setIsBuffering,
        volume,
        setVolume,
    } = useAudioStore();

    const { currentProject } = useProjectStore();
    const sortedAudioFiles = currentProject?.audioFiles
        ?.slice()
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        );

    useEffect(() => {
        if (!audioRef.current) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () =>
            setCurrentTime(audioRef.current!.currentTime);
        const updateSongDuration = () =>
            setDuration(audioRef.current!.duration);
        const handleWaiting = () => setIsBuffering(true);
        const handlePlaying = () => setIsBuffering(false);

        audioRef.current.addEventListener("play", handlePlay);
        audioRef.current.addEventListener("pause", handlePause);
        audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.addEventListener("loadedmetadata", updateSongDuration);
        audioRef.current.addEventListener("waiting", handleWaiting);
        audioRef.current.addEventListener("playing", handlePlaying);

        return () => {
            audioRef.current?.removeEventListener("play", handlePlay);
            audioRef.current?.removeEventListener("pause", handlePause);
            audioRef.current?.removeEventListener(
                "timeupdate",
                handleTimeUpdate,
            );
            audioRef.current?.removeEventListener(
                "loadedmetadata",
                updateSongDuration,
            );
            audioRef.current?.removeEventListener("waiting", handleWaiting);
            audioRef.current?.removeEventListener("playing", handlePlaying);
        };
    }, [setIsPlaying, setCurrentTime, setDuration, setIsBuffering, audioRef]);

    useEffect(() => {
        if (s3Url === "") {
            return;
        }
        if (audioRef.current) {
            audioRef.current.src = s3Url;
            audioRef.current.play();
        }
    }, [audioRef, s3Url]);

    useEffect(() => {
        if (!currentSong) {
            return;
        }
        fetchS3(projectId, currentSong.s3Key);
    }, [currentSong, fetchS3, projectId]);

    // Reset player when project changes
    useEffect(() => {
        setCurrentSong(null);
        setCurrentSongId(null);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setIsBuffering(false);

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
    }, [
        audioRef,
        currentProject,
        setCurrentSong,
        setCurrentSongId,
        setCurrentTime,
        setDuration,
        setIsBuffering,
        setIsPlaying,
    ]);

    const handleSliderChange = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
        }
    };

    const handleNextSong = () => {
        if (!sortedAudioFiles || currentSongId == null) return;
        const newId =
            currentSongId < sortedAudioFiles.length - 1
                ? currentSongId + 1
                : currentSongId;
        setCurrentSongId(newId);
        setCurrentSong(sortedAudioFiles[newId]);
    };

    const handlePreviousSong = () => {
        if (!sortedAudioFiles || currentSongId == null) return;

        // Calculate the new song ID before setting it
        const newId = currentSongId > 0 ? currentSongId - 1 : currentSongId;
        setCurrentSongId(newId);
        setCurrentSong(sortedAudioFiles[newId]);
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value[0]);
        if (audioRef.current) {
            audioRef.current.volume = value[0];
        }
    };

    return (
        <Flex
            className={`flex-row flex-wrap md:flex-nowrap items-center gap-xs md:gap-xxl justify-between px-0 py-md lg:px-xl lg:py-lg lg:pt-md ${!currentSong ? "opacity-50 pointer-events-none" : ""}`}
        >
            <Flex className="w-full md:w-[32%] xl:w-[20%] place-content-start">
                {currentSong && (
                    <Flex
                        className={`flex w-full md:max-w-[420px] items-center gap-md ${!currentSong ? "hidden" : ""}`}
                    >
                        <Link
                            href={`/project/${currentProject?.id}`}
                            className="text-body-s xl:text-body-l hidden md:block text-brand-accent"
                        >
                            <Avatar
                                src={
                                    currentProject?.owner.id === user?.id
                                        ? "/assets/imgs/default-img-purple.webp"
                                        : "/assets/imgs/default-img-green.webp"
                                }
                                className="size-[84px] xl:size-[104px] hidden lg:flex"
                                fallback={currentProject?.name ?? ""}
                                alt={currentProject?.name ?? ""}
                            />
                        </Link>

                        <Flex className="flex-row max-w-full md:flex-col gap-xs md:gap-0 content-center items-start ml-auto mr-auto md:ml-0">
                            <Link
                                href={`/project/${currentProject?.id}`}
                                className="text-body-s xl:text-body-l hidden md:block text-brand-accent"
                            >
                                {truncate(currentProject?.name ?? "", 32)}
                            </Link>
                            <Text className="text-body-s xl:text-body-l text-muted hidden md:block">
                                {truncate(currentSong.name, 32)}
                            </Text>

                            {/* For small screens */}
                            <Text
                                truncate
                                className="text-body-s xl:text-body-l text-muted md:hidden"
                            >
                                {currentSong.name}
                            </Text>
                        </Flex>
                    </Flex>
                )}
            </Flex>

            <Flex className="flex-col w-full md:w-[36%] xl:w-[50%] max-w-[1080px] grow gap-md lg:py-md items-center">
                <Slider
                    value={[currentTime]}
                    onValueChange={handleSliderChange}
                    max={duration}
                    step={1}
                    size="1"
                    aria-label="Audio Progress"
                    className="w-full"
                    disabled={!currentSong}
                />

                <Flex
                    direction="row"
                    className="w-full max-w-[580px] items-center justify-around sm:justify-between"
                >
                    <Text className="w-xxl text-body-s lg:text-body-l">
                        {formatTime(currentTime)}
                    </Text>

                    <Flex className="gap-md items-center">
                        <ChevronsLeft
                            onClick={handlePreviousSong}
                            className="icon-xl cursor-pointer"
                        />

                        <button
                            onClick={() =>
                                isPlaying
                                    ? audioRef.current?.pause()
                                    : audioRef.current?.play()
                            }
                        >
                            {isBuffering ? (
                                <LoaderCircle className="animate-spin icon-lg lg:icon-xxl" />
                            ) : isPlaying ? (
                                <PauseCircle className="icon-lg lg:icon-xxl" />
                            ) : (
                                <PlayCircle className="icon-lg lg:icon-xxl" />
                            )}
                        </button>

                        <ChevronsRight
                            onClick={handleNextSong}
                            className="icon-xl cursor-pointer"
                        />
                    </Flex>

                    <Text className="text-body-s lg:text-body-l w-xxl text-right">
                        {formatTime(duration)}
                    </Text>
                </Flex>
            </Flex>

            <Flex className="w-full md:w-[32%] xl:w-[20%] items-center place-content-end hidden md:flex">
                <Flex
                    className={`flex w-full max-w-[280px] xl:max-w-[380px] items-center gap-sm mt-4 ${!currentSong ? "hidden" : ""}`}
                >
                    <button onClick={toggleMute}>
                        {audioRef.current?.muted ? (
                            <VolumeX className="icon-md" />
                        ) : (
                            <Volume2 className="icon-md" />
                        )}
                    </button>

                    <Slider
                        value={[volume]}
                        size="1"
                        onValueChange={handleVolumeChange}
                        max={1}
                        step={0.01}
                        aria-label="Volume Control"
                        className={`w-full slider-plain ${
                            audioRef.current?.muted ? "opacity-30" : ""
                        }`}
                    />
                </Flex>
            </Flex>
        </Flex>
    );
}
