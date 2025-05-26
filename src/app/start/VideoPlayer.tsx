"use client";
import dynamic from "next/dynamic";
import { Box, Flex } from "@radix-ui/themes";
import { LoaderCircle, Play } from "lucide-react";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
    loading: () => (
        <Flex className="w-full h-full items-center justify-center">
            <LoaderCircle className="animate-spin size-[40px] text-foreground" />
        </Flex>
    ),
});

interface VideoPlayerProps {
    videoUrl: string;
    thumbnailUrl: string;
    alt?: string;
}

export default function VideoPlayer({
    videoUrl,
    thumbnailUrl,
    alt,
}: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative w-full aspect-video mx-auto bg-black shadow-xl rounded-md overflow-hidden">
            <ReactPlayer
                url={videoUrl}
                playing={isPlaying}
                onReady={() => setIsPlaying(true)}
                onEnded={() => setIsPlaying(false)}
                controls
                alt={alt}
                width="100%"
                height="100%"
                light={thumbnailUrl}
                playIcon={
                    <Box className="bg-black bg-opacity-80 rounded-full p-md">
                        <Play
                            fill="currentColor"
                            className="icon-lg translate-x-0.5"
                        />
                    </Box>
                }
            />
        </div>
    );
}
