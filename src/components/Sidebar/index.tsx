"use client";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Collaborator, Project } from "@/types";
import { PanelLeftClose, PanelRightClose, UserRound, UsersRound } from "lucide-react";
import { useProjectStore } from "@/stores/useProjectStore";
import {
    Avatar,
    Flex,
    IconButton,
    Text,
    Skeleton,
    Box,
} from "@radix-ui/themes";
import Link from "next/link";
import DialogSquare from "../UI/DialogSquare";

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const projectTitleClass = "text-[18px] font-medium overflow-hidden whitespace-nowrap text-ellipsis mt-lg";
const iconTitleClass = "icon-xs mt-md text-muted";
const projectClass = "p-xs rounded-lg overflow-hidden w-full gap-x-2 items-center hover:opacity-70 transition-all";

export default function Sidebar() {
    const { projects, currentProject } = useProjectStore();
    const { isOpen, toggleSidebar } = useSidebarStore();
    const [isFetching, setIsFetching] = useState(true);
    const fetchUsersProjects = useProjectStore(
        state => state.fetchUsersProjects,
    );

    useEffect(() => {
        fetchUsersProjects();
        setIsFetching(false);
    }, []);

    return (
        <Flex
            className={cn(
                `flex-col transition-all h-full items-center pb-0`,
                isOpen ? "p-xl w-[320px]" : "p-md w-[80px]",
            )}
        >
            <Flex
                className={cn(
                    "w-full",
                    isOpen ? "justify-between" : "justify-center",
                )}
            >
                {isOpen && <Text className="text-label-l">Library</Text>}

                <IconButton
                    variant="outline"
                    className={`shadow-none rounded-full hover:bg-background ${isOpen ? 'mt-[-10px] mr-[-10px]' : ''}`}
                    onClick={toggleSidebar}
                >
                    {isOpen
                        ? <PanelLeftClose className="icon-sm" />
                        : <PanelRightClose className="icon-sm" />}
                </IconButton>
            </Flex>

            <Flex className={`w-full flex-col mb-lg gap-sm grow ${!isOpen ? 'items-center' : ''}`}>
                {isFetching && (
                    <Flex className="w-full h-10 gap-x-2 items-center">
                        <Skeleton>
                            <Avatar
                                fallback="P"
                                src="https://placehold.co/400"
                                alt="Project Image"
                            />
                        </Skeleton>
                        <Skeleton>
                            {isOpen && (
                                <Text className="overflow-hidden whitespace-nowrap text-ellipsis">
                                    {
                                        "project.nameproject.nameproject.nameproject.nameproject.name"
                                    }
                                </Text>
                            )}
                        </Skeleton>
                    </Flex>
                )}
                {isOpen ? (
                    <>
                        <Text className={cn(projectTitleClass, "mt-md")}>
                            My projects
                        </Text>

                        {!projects?.ownedProjects.length && (
                            <Text className={`text-[12px] text-muted`}>– No projects yet.</Text>
                        )}
                    </>
                ) : <UserRound className={iconTitleClass} />}
                {!isFetching &&
                    projects?.ownedProjects?.map((project: Project) => (
                        <Link key={project.id} href={`/project/${project.id}`} className="mx-[-10px]">
                            <Flex className={cn(projectClass, `${project.id === currentProject?.id && 'bg-highlight'}`)}>
                                <Avatar
                                    fallback="P"
                                    src="https://placehold.co/400"
                                    alt={project.name}
                                    className="size-xl"
                                    radius="small"
                                />
                                {isOpen && (
                                    <Text className="text-body-s overflow-hidden whitespace-nowrap text-ellipsis">
                                        {project.name}
                                    </Text>
                                )}
                            </Flex>
                        </Link>
                ))}
                {isOpen ? (
                    <>
                        <Text className={cn(projectTitleClass, "mt-lg")}>
                            Shared Projects
                        </Text>

                        {!projects?.collaborations.length && (
                            <Text className={`text-[12px] text-muted`}>– No invites yet.</Text>
                        )}
                    </>
                ) : <UsersRound className={iconTitleClass} />}
                {!isFetching &&
                    projects?.collaborations?.map((project: Collaborator) => (
                        <Link
                            key={project.project.id}
                            href={`/project/${project.project.id}`}
                        >
                            <Flex className={cn(projectClass, `${project.project.id === currentProject?.id && 'bg-highlight'}`)}>
                                <Avatar
                                    fallback="P"
                                    src="https://placehold.co/400"
                                    alt={project.project.name}
                                    className="size-xl"
                                    radius="small"
                                />
                                {isOpen && (
                                    <Text className="text-body-s overflow-hidden whitespace-nowrap text-ellipsis">
                                        {project.project.name}
                                    </Text>
                                )}
                            </Flex>
                        </Link>
                ))}
            </Flex>

            <Box className={isOpen ? 'pb-xl' : 'pb-md'}>
                <DialogSquare variant={"outline"} hideText={!isOpen} />
            </Box>
        </Flex>
    );
}
