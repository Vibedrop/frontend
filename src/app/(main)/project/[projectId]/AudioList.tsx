import React, { useEffect, useState } from 'react';
import { BACKEND_URL } from "@/utilities/config";
import { useParams } from 'next/navigation';
import { AudioFile } from '@/types';
import { useAuthStore } from '@/stores/useAuthStore';
import { useProjectStore } from '@/stores/useProjectStore';
import { useAudioStore } from '@/stores/useAudioStore';
import { useAudio } from '@/context/AudioContext';
import {
    Box,
    Flex,
    Text,
    Separator
} from "@radix-ui/themes";
import { LoaderCircle, MessageSquare, PauseCircle, PlayCircle, Trash2 } from 'lucide-react';
import { formatFriendlyDate, formatTime } from '@/lib/formatTime';
import { ConfirmDialog } from '@/components/UI/ConfirmDialog';

type AudioListProps = {
  handleComments: (audioId: string) => void;
  unreadComments: Record<string, boolean>;
};

export default function AudioList( {handleComments, unreadComments}: AudioListProps ) {
  const { projectId } = useParams<{ projectId: string }>();
  const { currentProject, sortedAudioFiles } = useProjectStore();
  const { currentSong, isPlaying, isBuffering } = useAudioStore();

  const user = useAuthStore(state => state.user);
  const isOwner = currentProject?.ownerId === user?.id;
  const audioRef = useAudio();

  const setfetchS3 = useAudioStore(state => state.fetchS3);
  const setCurrentSong = useAudioStore(state => state.setCurrentSong);
  const setCurrentSongId = useAudioStore(state => state.setCurrentSongId);
  const fetchCurrentProject = useProjectStore(state => state.fetchCurrentProject);
  const commentUpdates = useProjectStore(state => state.commentUpdates);

  const [deleteAudioDialogOpen, setDeleteAudioDialogOpen] = useState(false);
  const [audioToDelete, setAudioToDelete] = useState<AudioFile | null>(null);
  const [isDeletingAudio, setIsDeletingAudio] = useState(false);

  useEffect(() => {
    fetchCurrentProject(projectId);
  }, [commentUpdates, projectId, fetchCurrentProject]);

  const handlePlayPause = (song: AudioFile, index: number) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
    } else {
      setfetchS3(projectId, song.s3Key);
      setCurrentSongId(index);
      setCurrentSong(song);
    }
  };

async function deleteAudioFile(fileID: string) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/audio/${projectId}/${fileID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    if (response.ok) {
      const data = await response.json();
      await fetchCurrentProject(projectId);
    } else {
      throw new Error("error");
    }
  } catch (error) {
    console.error(error);
  }
}

  return (
    <Flex className="grow">
      <ul className="flex gap-sm md:gap-lg flex-col w-full text-body-xs sm:text-body-s">
        {sortedAudioFiles?.map(
          (audio: AudioFile, index: number) => (
            <React.Fragment key={audio.id}>
              {index !== 0 && (
                <li className="h-[1px] md:hidden">
                  <Separator
                    orientation="horizontal"
                    className="w-full"
                  />
                </li>
              )}

              {index === 0 && (
                <li className="hidden xl:flex gap-sm">
                  <Box className="w-xl ml-auto" />

                  <Box className="w-[50px] text-center">
                    <Text className="text-body-s">
                      Time
                    </Text>
                  </Box>

                  <Box className="w-[120px] text-center">
                    <Text className="text-body-s">
                      Uploaded
                    </Text>
                  </Box>

                  <Box className="w-[82px] text-center">
                    <Text className="text-body-s">
                      Comments
                    </Text>
                  </Box>

                  {isOwner && (
                    <Box className="w-xl" />
                  )}
                </li>
              )}

              <li className="flex w-full gap-xs lg:gap-md items-start sm:items-center flex-wrap md:flex-nowrap">
                <Flex
                  className={`w-xl hidden lg:flex h-2/4 gap-xs shrink-0 justify-end transition-all ${
                    currentSong?.id ===
                      audio.id &&
                    isPlaying
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {currentSong?.id ===
                    audio.id &&
                    isPlaying &&
                    !isBuffering &&
                    [1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="w-0.5 h-full bg-brand-accent rounded origin-bottom animate-pulseEQ mt-xxs"
                        style={{
                          animationDelay: `${
                            i *
                            0.2
                          }s`,
                        }}
                      />
                    ))}
                </Flex>

                <Flex className="flex-col gap-xxs cursor-pointer">
                  <Box
                    onClick={() =>
                      handlePlayPause(
                        audio,
                        index,
                      )
                    }
                  >
                    {currentSong?.id === audio.id && isBuffering ? (
                      <LoaderCircle className="animate-spin icon-md sm:icon-lg" />
                      ) : currentSong?.id === audio.id && isPlaying ? (
                        <PauseCircle className="icon-md sm:icon-lg" />
                      ) : (
                        <PlayCircle className="icon-md sm:icon-lg" />
                      )
                    }
                  </Box>
                </Flex>

                <Flex className="flex-col max-w-full grow shrink overflow-auto">
                  <Text
                    truncate
                    className={
                      currentSong?.id ===
                      audio.id
                        ? "text-brand-accent"
                        : ""
                    }
                  >
                    {audio.name}
                  </Text>
                  <Text>
                    {audio.description}
                  </Text>
                </Flex>

                <Flex className="xl:w-[50px] justify-center">
                  <Text>
                    {formatTime(
                      audio.duration ??
                        0,
                    )}
                  </Text>
                </Flex>

                <Flex className="gap-xs 2xl:gap-sm w-full md:w-auto">
                  <Flex className="w-[120px] md:justify-center mr-auto shrink-0">
                    <Text truncate>
                      {formatFriendlyDate(
                        audio.createdAt,
                      )}
                    </Text>
                  </Flex>

                  <Flex className="w-lg relative lg:w-xl xl:w-[82px] shrink-0 items-center justify-start">
                    <MessageSquare
                      className="icon-xs lg:icon-sm cursor-pointer"
                      onClick={() =>
                        handleComments(audio.id)
                      }
                    />
                    {unreadComments[audio.id] && (
                      <span className="text-xs bg-brand-accent rounded-full absolute text-center h-3 lg:h-4 aspect-square -top-1 lg:-top-2 left-3 lg:left-4"></span>
                    )}
                  </Flex>

                  {isOwner && (
                    <Flex className="w-lg lg:w-xl shrink-0 items-center justify-end lg:justify-center">
                      <Trash2
                        className="icon-xs lg:icon-sm cursor-pointer"
                        onClick={() => {
                          setAudioToDelete(
                            audio,
                          );
                          setDeleteAudioDialogOpen(
                            true,
                          );
                        }}
                      />
                    </Flex>
                  )}
                </Flex>
              </li>
            </React.Fragment>
          ),
        )}
      </ul>

      <ConfirmDialog
        open={deleteAudioDialogOpen}
        onOpenChange={open => {
          setDeleteAudioDialogOpen(open);
          if (!open) setAudioToDelete(null);
        }}
        onConfirm={async () => {
          if (!audioToDelete) return;
          setIsDeletingAudio(true);
          await deleteAudioFile(audioToDelete.id);
          setIsDeletingAudio(false);
          setDeleteAudioDialogOpen(false);
          setAudioToDelete(null);
        }}
        onCancel={() => setAudioToDelete(null)}
        title="Delete audio file"
        description="Are you sure you want to delete this audio file? This action cannot be undone."
        confirmLabel="Delete audio"
        cancelLabel="Cancel"
        loading={isDeletingAudio}
      />
    </Flex>
  )
}
