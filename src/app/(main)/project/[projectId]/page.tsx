"use client";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useParams } from "next/navigation";
import { useAudioStore } from "@/stores/useAudioStore";
import { useProjectStore } from "@/stores/useProjectStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { formatCommentDateTime, formatFriendlyDate } from "@/lib/formatTime";
import {
    LoaderCircle,
    MessageSquare,
    PauseCircle,
    PlayCircle,
    Send,
    Trash2,
    Undo2,
    UserRound,
} from "lucide-react";
import { AudioFile, Comment } from "@/types";
import {
    Box,
    Flex,
    IconButton,
    Link,
    Separator,
    Text,
    TextField,
    Theme,
} from "@radix-ui/themes";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAudio } from "@/context/AudioContext";
import CollaboratorSquare from "@/components/UI/CollaboratorSquare";
import AudioDropzone from "@/components/UI/AudioDropzone";
import DeleteProject from "./DeleteProject";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const { isOpen } = useSidebarStore();
    const { projectId } = useParams<{ projectId: string }>();
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [commentInput, setCommentInput] = useState("");
    const [audioId, setaudioId] = useState("");
    const { currentProject, owner, collaborators, sortedAudioFiles } =
        useProjectStore();
    const { currentSong, isPlaying, isBuffering } = useAudioStore();
    const fetchCurrentProject = useProjectStore(
        state => state.fetchCurrentProject,
    );
    const setfetchS3 = useAudioStore(state => state.fetchS3);
    const setCurrentSong = useAudioStore(state => state.setCurrentSong);
    const setCurrentSongId = useAudioStore(state => state.setCurrentSongId);
    const user = useAuthStore(state => state.user);
    const isOwner = currentProject?.ownerId === user?.id;
    const audioRef = useAudio();

    const handlePlayPause = (song: any, index: number) => {
        console.log("audioRef", audioRef);
        if (currentSong?.id === song.id) {
            isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
        } else {
            setfetchS3(projectId, song.s3Key);
            setCurrentSongId(index);
            setCurrentSong(song);
        }
    };

    const handleComments = (audioID: string) => {
        setaudioId(audioID);
        getComments(audioID);
    };

    useEffect(() => {
        const loadProject = async () => {
            try {
                setIsLoading(true);
                await fetchCurrentProject(projectId);
                if (!useProjectStore.getState().currentProject) {
                    setNotFound(true);
                }
            } catch (error) {
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadProject();
    }, []);

    useEffect(() => {
        if (audioId) {
            getComments(audioId);
        } else {
            setComments(null);
        }
    }, [audioId]);

    function formatSeconds(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const paddedSeconds = remainingSeconds.toString().padStart(2, "0");
        return `${minutes}:${paddedSeconds}`;
    }

    const ownerControls = (
        <>
            <CollaboratorSquare />
            <DeleteProject projectId={projectId} />
        </>
    );

    async function getComments(fileID: string) {
        try {
            const response = await fetch(`${BACKEND_URL}/comments/${fileID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ fileid: fileID }),
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data);
                console.log("getComments", data);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function postComments(fileID: string) {
        if (!commentInput.trim()) return;

        try {
            const response = await fetch(`${BACKEND_URL}/comments/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    content: commentInput,
                    fileId: fileID,
                    timestamp: 1,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("postComments", data);
                setCommentInput("");
                await getComments(fileID);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

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
                console.log("postComments", data);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

        async function deleteComment(commentId: string, fileID: string) {
        try {
            const response = await fetch(
                `${BACKEND_URL}/comments/${commentId}`,
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
                console.log("postComments", data);
                await getComments(fileID);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    if (!isLoading && notFound && !currentProject) {
        return (
            <Flex className="w-full mt-xl ml-xl max-h-[800px] items-center">
                <Text>Project not found</Text>
            </Flex>
        );
    }

    return (
        <Flex
            style={{ willChange: "margin-left" }}
            className={`flex-col w-full max-w-[1080px] 2xl:max-w-[910px] 2xl-plus:max-w-[1080px] gap-md sm:gap-lg self-center transition-[margin-left] ${
                isOpen ? "2xl:ml-[-320px]" : "2xl:ml-[-80px]"
            }`}
        >
            {isLoading ? (
                <Flex className="w-full mt-[100px] items-center justify-center">
                    <LoaderCircle className="animate-spin size-[40px] text-background" />
                </Flex>
            ) : (
                <>
                    <Flex className="gap-sm lg:gap-lg flex-wrap">
                        <img
                            className="rounded-custom size-[100px] sm:size-[160px] lg:size-[200px] 2xl:size-[296px]"
                            src="/assets/imgs/default-img-purple.jpg"
                            alt={currentProject?.name || ""}
                        />
                        <Flex className="flex-col justify-center lg:justify-end gap-xxs lg:gap-md xl:gap-lg">
                            <Text className="text-body-s lg:text-header-l">
                                {currentProject?.name}
                            </Text>
                            <Text className="text-body-s lg:text-body-l text-muted">
                                {currentProject?.description}
                            </Text>

                            {collaborators?.length > 0 && (
                                <ul className="flex flex-row gap-lg flex-wrap">
                                    {collaborators?.map((user: any) => (
                                        <li
                                            key={user.user.username}
                                            className="flex gap-xs mb-md items-center"
                                        >
                                            <Box>
                                                {isOwner ? (
                                                    <UserRound className="icon-xs lg:icon-sm size-xl collaborator-comment-gradient rounded-full" />
                                                ) : (
                                                    <UserRound className="icon-xs lg:icon-sm size-xl owner-comment-gradient rounded-full" />
                                                )}
                                            </Box>
                                            <Text className="text-body-xs lg:text-body-s truncate">
                                                {user.user.username}
                                            </Text>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {isOwner && (
                                <Flex className="mb-md hidden lg:flex gap-xl justify-between">
                                    {ownerControls}
                                </Flex>
                            )}
                        </Flex>

                        <Flex className="my-xxs lg:hidden w-full gap-md justify-between items-center">
                            {ownerControls}
                        </Flex>
                    </Flex>

                    {!audioId && (
                        <>
                            {isOwner && <AudioDropzone />}

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
                                                            {currentSong?.id ===
                                                                audio.id &&
                                                            isBuffering ? (
                                                                <LoaderCircle className="animate-spin icon-md sm:icon-lg" />
                                                            ) : currentSong?.id ===
                                                                  audio.id &&
                                                              isPlaying ? (
                                                                <PauseCircle className="icon-md sm:icon-lg" />
                                                            ) : (
                                                                <PlayCircle className="icon-md sm:icon-lg" />
                                                            )}
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
                                                            {formatSeconds(
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

                                                        <Flex className="w-lg lg:w-xl xl:w-[82px] shrink-0 items-center justify-end lg:justify-center">
                                                            <MessageSquare
                                                                className="icon-xs lg:icon-sm cursor-pointer"
                                                                onClick={() =>
                                                                    handleComments(
                                                                        audio.id,
                                                                    )
                                                                }
                                                            />
                                                        </Flex>

                                                        {isOwner && (
                                                            <Flex className="w-lg lg:w-xl shrink-0 items-center justify-end lg:justify-center">
                                                                <Trash2
                                                                    className="icon-xs lg:icon-sm cursor-pointer"
                                                                    onClick={() =>
                                                                        deleteAudioFile(
                                                                            audio.id,
                                                                        )
                                                                    }
                                                                />
                                                            </Flex>
                                                        )}
                                                    </Flex>
                                                </li>
                                            </React.Fragment>
                                        ),
                                    )}
                                </ul>
                            </Flex>
                        </>
                    )}

                    {audioId && (
                        <Flex className="w-full flex-col max-w-[940px] m-auto items-center gap-md">
                            <Flex className="w-full justify-end">
                                <Link
                                    onClick={() => setaudioId("")}
                                    className="flex items-center gap-xs cursor-pointer"
                                >
                                    <Undo2 className="icon-xs" />
                                    Back
                                </Link>
                            </Flex>

                            <Theme
                                appearance="light"
                                className="bg-transparent w-full"
                            >
                                <TextField.Root
                                    onChange={e =>
                                        setCommentInput(e.target.value)
                                    }
                                    onKeyDown={e => {
                                        if (
                                            e.key === "Enter" &&
                                            !e.shiftKey &&
                                            commentInput.length > 0
                                        ) {
                                            e.preventDefault();
                                            postComments(audioId);
                                        }
                                    }}
                                    value={commentInput}
                                    placeholder="Enter your comment here…"
                                    className="text-body-s overflow-hidden"
                                >
                                    <TextField.Slot
                                        side="right"
                                        className="pr-0 text-body-s"
                                    >
                                        <IconButton
                                            radius="none"
                                            aria-label="Send"
                                            disabled={!commentInput}
                                            onClick={() =>
                                                postComments(audioId)
                                            }
                                        >
                                            <Send className="icon-sm" />
                                        </IconButton>
                                    </TextField.Slot>
                                </TextField.Root>
                            </Theme>

                            <Flex className="w-full">
                                {comments && comments.length === 0 && (
                                    <Flex className="flex items-center justify-center w-full ">
                                        <span className="flex-1 border-t"></span>
                                        <span className="px-4">
                                            No comments yet
                                        </span>
                                        <span className="flex-1 border-t"></span>
                                    </Flex>
                                )}

                                {comments &&
                                    comments.length > 0 &&
                                    (() => {
                                        const sorted = comments
                                            .slice()
                                            .sort(
                                                (a, b) =>
                                                    new Date(
                                                        b.createdAt,
                                                    ).getTime() -
                                                    new Date(
                                                        a.createdAt,
                                                    ).getTime(),
                                            );

                                        const isSameDay = (
                                            d1: Date,
                                            d2: Date,
                                        ) =>
                                            d1.getFullYear() ===
                                                d2.getFullYear() &&
                                            d1.getMonth() === d2.getMonth() &&
                                            d1.getDate() === d2.getDate();

                                        const now = new Date();

                                        return (
                                            <ul className="gap-md flex flex-col w-full">
                                                {sorted.map(
                                                    (comment, index) => {
                                                        const currentDate =
                                                            new Date(
                                                                comment.createdAt,
                                                            );
                                                        const nextComment =
                                                            sorted[index + 1];
                                                        const nextDate =
                                                            nextComment
                                                                ? new Date(
                                                                      nextComment.createdAt,
                                                                  )
                                                                : null;
                                                        const insertSeparator =
                                                            nextDate &&
                                                            isSameDay(
                                                                currentDate,
                                                                now,
                                                            ) &&
                                                            !isSameDay(
                                                                nextDate,
                                                                now,
                                                            );

                                                        return (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <li className="flex flex-col gap-xxs bg-highlight p-md rounded-custom overflow-hidden">
                                                                    <Flex className="gap-sm w-full items-start md:items-center">
                                                                        <Box>
                                                                            {comment
                                                                                .author
                                                                                .id ===
                                                                            user?.id ? (
                                                                                <UserRound className="icon-xs lg:icon-sm size-xl owner-comment-gradient rounded-full" />
                                                                            ) : (
                                                                                <UserRound className="icon-xs lg:icon-sm size-xl collaborator-comment-gradient rounded-full" />
                                                                            )}
                                                                        </Box>

                                                                        <Flex className="flex-col md:flex-row gap-xs shrink">
                                                                            <Text>
                                                                                {
                                                                                    comment
                                                                                        .author
                                                                                        .username
                                                                                }
                                                                                {comment
                                                                                    .author
                                                                                    .id ===
                                                                                    user?.id &&
                                                                                    " (you)"}
                                                                            </Text>
                                                                            <Text className="text-muted font-medium">
                                                                                {formatCommentDateTime(
                                                                                    comment.createdAt,
                                                                                )}
                                                                            </Text>
                                                                        </Flex>

                                                                        {comment
                                                                            .author
                                                                            .id ===
                                                                            user?.id && (
                                                                            // TODO: Add delete comment functionality
                                                                            <Trash2 className="icon-xs ml-auto cursor-pointer shrink-0" onClick={() => {deleteComment(comment.id, audioId)}} />
                                                                        )}
                                                                    </Flex>

                                                                    <Text className="text-body-s mt-xs">
                                                                        {
                                                                            comment.content
                                                                        }
                                                                    </Text>
                                                                </li>

                                                                {insertSeparator && (
                                                                    <li className="flex items-center justify-center w-10/12 m-auto">
                                                                        <span className="flex-1 border-t"></span>
                                                                        <span className="px-4">
                                                                            New
                                                                            comments
                                                                        </span>
                                                                        <span className="flex-1 border-t"></span>
                                                                    </li>
                                                                )}
                                                            </React.Fragment>
                                                        );
                                                    },
                                                )}
                                            </ul>
                                        );
                                    })()}
                            </Flex>
                        </Flex>
                    )}
                </>
            )}
        </Flex>
    );
}
