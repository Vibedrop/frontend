"use client";
import { useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useProjectStore } from "@/stores/useProjectStore";
import DialogSquare from "@/components/UI/DialogSquare";
import { useAudio } from "@/context/AudioContext";
import { useAudioStore } from "@/stores/useAudioStore";

export default function Page() {
  const audioRef = useAudio();
  const {
    setCurrentSong,
    setCurrentSongId,
    setIsPlaying,
    setCurrentTime,
    setDuration,
  } = useAudioStore();

  const { projects } = useProjectStore();
  const { isOpen } = useSidebarStore();
  const [files] = useState<
    {
      key: string;
      lastModified: string;
      size: number;
      etag: string;
      storageClass: string;
      preSignedUrl: string;
    }[]
  >([]);

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
  }, []);

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

  useEffect(() => {
    console.log("useEffect files", files);
  }, [files]);

  return (
    <Flex className={`flex-col w-full max-w-[1080px] h-full mt-[8vw] gap-md self-center transition-all ${isOpen ? '2xl:ml-[-320px]' : '2xl:ml-[-80px]'}`}>
      <Flex className="flex-col gap-y-xl items-center">
        <Text className="text-header-m max-w-[700px] text-center">

          {projects?.ownedProjects.length > 0 ? (
            'Got a new idea? Start a fresh project and keep the momentum going.'
          ) : (
            'Ready to bring your ideas to life? Start your first project and turn your creativity into something real.'
          )}

        </Text>

        <DialogSquare triggerClass="has-icon-left" />
      </Flex>
    </Flex>
  );
}
