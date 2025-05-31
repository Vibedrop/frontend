"use client";
import React, { useState, useEffect, useCallback } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useParams } from "next/navigation";
import { useProjectStore } from "@/stores/useProjectStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import {
    LoaderCircle,
    Timer,
    Trash2,
    UserRound,
} from "lucide-react";
import { Collaborator, Comment } from "@/types";
import {
    Box,
    Button,
    Flex,
    Text
} from "@radix-ui/themes";
import { useAuthStore } from "@/stores/useAuthStore";
import { ConfirmDialog } from "@/components/UI/ConfirmDialog";
import CollaboratorSquare from "@/components/UI/CollaboratorSquare";
import AudioDropzone from "@/components/UI/AudioDropzone";
import Image from "next/image";
import AudioList from "./AudioList";
import Comments from "./Comments";

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const [audioId, setaudioId] = useState("");
    const [unreadComments, setUnreadComments] = useState<Record<string, boolean>>({});
    const [deleteProjectDialogOpen, setDeleteProjectDialogOpen] = useState(false);
    const [isDeletingProject, setIsDeletingProject] = useState(false);
    const { isOpen } = useSidebarStore();
    const { projectId } = useParams<{ projectId: string }>();
    const { currentProject, collaborators, sortedAudioFiles } = useProjectStore();

    const fetchCurrentProject = useProjectStore(
        state => state.fetchCurrentProject,
    );
    const user = useAuthStore(state => state.user);
    const isOwner = currentProject?.ownerId === user?.id;

    const handleComments = (audioID: string) => {
        setaudioId(audioID);
        getComments(audioID);
        updateReadAt(audioID);
    };

    useEffect(() => {
        const loadProject = async () => {
            try {
                setIsLoading(true);
                await fetchCurrentProject(projectId);
                if (!useProjectStore.getState().currentProject) {
                    setNotFound(true);
                }
            } catch {
                setNotFound(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadProject();
    }, [fetchCurrentProject, projectId]);

    useEffect(() => {
        if (audioId) {
            getComments(audioId);
        } else {
            setComments(null);
        }
    }, [audioId]);

    const getUnreadComments = useCallback(async () => {
        if (!sortedAudioFiles || sortedAudioFiles.length === 0) return;

        for (const fileID of sortedAudioFiles.map(file => file.id)) {
            try {
                const response = await fetch(
                    `${BACKEND_URL}/comments/${fileID}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({ fileid: fileID }),
                    },
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch comments");
                }
                const data = (await response.json()) as {
                    comments: Comment[];
                    lastReadAt: string;
                };
                const hasUnread =
                    data?.comments?.filter(
                        comment =>
                            comment.author.id !== user?.id &&
                            new Date(comment.createdAt).getTime() >
                                new Date(data.lastReadAt).getTime(),
                    ).length > 0;

                setUnreadComments(prev => ({
                    ...prev,
                    [fileID]: hasUnread,
                }));
            } catch (error) {
                console.error(error);
            }
        }
    }, [sortedAudioFiles, user]);

    useEffect(() => {
        if (sortedAudioFiles && sortedAudioFiles.length > 0) {
            getUnreadComments();
        }
    }, [getUnreadComments, sortedAudioFiles]);

    async function updateReadAt(fileID: string) {
        try {
            const response = await fetch(
                `${BACKEND_URL}/comments/${fileID}/read`,
                {
                    method: "PUT",
                    credentials: "include",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to update read status");
            }
        } catch {
            console.error("Failed to update read status for fileID");
        }
    }

    const handleDeleteProject = async () => {
        setIsDeletingProject(true);
        try {
            const response = await fetch(
                `${BACKEND_URL}/projects/${projectId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );
            if (response.ok) {
                await useProjectStore.getState().fetchUsersProjects();
                window.location.href = "/";
            } else {
                throw new Error("Error deleting project");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setDeleteProjectDialogOpen(false);
            setIsDeletingProject(false);
        }
    };

    const ownerControls = (
        <>
            <CollaboratorSquare />
            <Button
                className="py-xxs pl-xs h-xl bg-background text-muted hover:text-foreground transition-colors "
                radius="full"
                aria-label="Delete project"
                onClick={() => setDeleteProjectDialogOpen(true)}
            >
                <Trash2 className="icon-xs" />
                <Text className="text-body-s">Delete project</Text>
            </Button>
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
                setComments(data.comments);
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
                    <Flex className="gap-sm lg:gap-lg flex-wrap lg:flex-nowrap">
                        <Image
                            className="rounded-custom size-[100px] sm:size-[160px] lg:size-[200px] 2xl:size-[296px]"
                            priority
                            src={
                                isOwner
                                    ? "/assets/imgs/default-img-purple.webp"
                                    : "/assets/imgs/default-img-green.webp"
                            }
                            alt={currentProject?.name || ""}
                            width={296}
                            height={296}
                        />
                        <Flex className="flex-col justify-center flex-1 lg:justify-end gap-xxs lg:gap-md xl:gap-lg">
                            {currentProject?.deadline && (
                                <Flex className="justify-end items-center gap-x-1">
                                    <Timer className="icon-sm text-foreground" />
                                    <Text className="text-body-s font-bold">
                                        {currentProject?.deadline
                                            .toLocaleString()
                                            .slice(0, -14)}
                                    </Text>
                                </Flex>
                            )}

                            <Text className="text-body-s lg:text-header-l">
                                {currentProject?.name}
                            </Text>
                            <Text className="text-body-s lg:text-body-l text-muted">
                                {currentProject?.description}
                            </Text>

                            {collaborators && collaborators?.length > 0 && (
                                <ul className="flex flex-row gap-xs lg:gap-md flex-wrap">
                                    <li
                                        key={currentProject?.owner?.id}
                                        className={
                                            "flex gap-xs items-center mr-sm"
                                        }
                                    >
                                        <Box>
                                            <UserRound className="icon-xs lg:icon-sm size-xl owner-gradient rounded-full" />
                                        </Box>
                                        <Text className="text-body-xs lg:text-body-s truncate">
                                            {currentProject?.owner?.username ||
                                                "Unknown Owner"}
                                            {currentProject?.owner.username ===
                                            user?.username
                                                ? " (you)"
                                                : " (owner)"}
                                        </Text>
                                    </li>

                                    {collaborators?.map(
                                        (collaborator: Collaborator) => (
                                            <li
                                                key={collaborator.user.id}
                                                className={
                                                    "flex gap-xs items-center mr-sm"
                                                }
                                            >
                                                <Box>
                                                    {collaborator.user
                                                        .username ===
                                                    user?.username ? (
                                                        <UserRound className="icon-xs lg:icon-sm size-xl owner-gradient rounded-full" />
                                                    ) : (
                                                        <UserRound className="icon-xs lg:icon-sm size-xl collaborator-gradient rounded-full" />
                                                    )}
                                                </Box>
                                                <Text className="text-body-xs lg:text-body-s truncate">
                                                    {collaborator.user.username}
                                                </Text>
                                            </li>
                                        ),
                                    )}
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
                            <AudioList handleComments={handleComments} unreadComments={unreadComments} />
                        </>
                    )}

                    {audioId && (
                        <Comments
                            getComments={getComments}
                            getUnreadComments={getUnreadComments}
                            audioId={audioId}
                            setaudioId={setaudioId}
                            comments={comments}
                            setComments={setComments}
                        />
                    )}
                </>
            )}

            <ConfirmDialog
                open={deleteProjectDialogOpen}
                onOpenChange={open => setDeleteProjectDialogOpen(open)}
                onConfirm={handleDeleteProject}
                onCancel={() => {}}
                title="Delete project"
                description="Are you sure? This will permanently delete the project along with all audio files and feedback. This action cannot be undone."
                confirmLabel="Delete project"
                cancelLabel="Cancel"
                loading={isDeletingProject}
            />
        </Flex>
    );
}
