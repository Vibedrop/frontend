"use client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Project } from "@/types";
import {
    PanelLeftClose,
    PanelRightClose,
    UserRound,
    UsersRound,
} from "lucide-react";
import { useProjectStore } from "@/stores/useProjectStore";
import { Avatar, Flex, IconButton, Text, Box, Theme } from "@radix-ui/themes";
import Link from "next/link";
import DialogSquare from "../UI/DialogSquare";
import ProjectNavSmall from "./ProjectNavSmall";
import ProjectItemSkeleton from "./ProjectItemSkeleton";

const projectTitleClass =
    "text-[18px] font-medium overflow-hidden whitespace-nowrap text-ellipsis mt-lg";
const iconTitleClass = "icon-xs mt-md text-muted";
const projectClass =
    "p-xs rounded-lg overflow-hidden w-full gap-x-2 items-center hover:opacity-70 transition-all";

export default function Sidebar() {
    const { isOpen, toggleSidebar } = useSidebarStore();
    const { collaborations, ownedProjects, currentProject } = useProjectStore();
    const [isFetching, setIsFetching] = useState(true);
    const fetchUsersProjects = useProjectStore(
        state => state.fetchUsersProjects,
    );

    useEffect(() => {
        fetchUsersProjects();
        setIsFetching(false);
    }, [fetchUsersProjects, isFetching]);

    return (
        <>
            <ProjectNavSmall />

            <Box className="bg-elevated rounded-lg overflow-auto hidden md:flex flex-shrink-0">
                <Flex
                    className={cn(
                        `flex-col transition-all h-full w-full items-center pb-0`,
                        isOpen
                            ? "px-lg pt-lg lg:px-xl lg:pt-xl pb-0 w-[280px] lg:w-[320px]"
                            : "px-md pt-md w-[80px]",
                    )}
                >
                    <Flex
                        className={cn(
                            "w-full",
                            isOpen ? "justify-between" : "justify-center",
                        )}
                    >
                        {isOpen && (
                            <Text className="text-label-l">Library</Text>
                        )}

                        <IconButton
                            variant="outline"
                            className={`shadow-none rounded-full hover:bg-background ${
                                isOpen ? "mt-[-10px] mr-[-10px]" : ""
                            }`}
                            onClick={toggleSidebar}
                        >
                            {isOpen ? (
                                <PanelLeftClose className="icon-sm" />
                            ) : (
                                <PanelRightClose className="icon-sm" />
                            )}
                        </IconButton>
                    </Flex>

                    <Flex
                        className={`w-full flex-col mb-lg gap-sm grow ${
                            !isOpen ? "items-center" : ""
                        }`}
                    >
                        {isOpen ? (
                            <>
                                <Text
                                    className={cn(projectTitleClass, "mt-md")}
                                >
                                    My projects
                                </Text>

                                {!ownedProjects?.length && (
                                    <Text className={`text-[12px] text-muted`}>
                                        – No projects yet.
                                    </Text>
                                )}
                            </>
                        ) : (
                            <UserRound className={iconTitleClass} />
                        )}

                        {isFetching && (
                            <>
                                <ProjectItemSkeleton isOpen={isOpen} />
                                <ProjectItemSkeleton isOpen={isOpen} />
                            </>
                        )}

                        {!isFetching &&
                            ownedProjects?.map((project: Project) => (
                                <Link
                                    key={project.id}
                                    href={`/project/${project.id}`}
                                    className="mx-[-10px]"
                                >
                                    <Flex
                                        className={cn(
                                            projectClass,
                                            `${
                                                project.id ===
                                                    currentProject?.id &&
                                                "bg-highlight"
                                            }`,
                                        )}
                                    >
                                        <Theme accentColor="gray">
                                            <Avatar
                                                fallback="P"
                                                src="/assets/imgs/default-img-purple.webp"
                                                alt={project.name}
                                                className="size-xl"
                                                radius="small"
                                            />
                                        </Theme>
                                        {isOpen && (
                                            <>
                                                <Text className="text-body-s overflow-hidden whitespace-nowrap text-ellipsis">
                                                    {project.name}
                                                </Text>
                                            </>
                                        )}
                                    </Flex>
                                </Link>
                            ))}
                        {isOpen ? (
                            <>
                                <Text
                                    className={cn(projectTitleClass, "mt-lg")}
                                >
                                    Shared Projects
                                </Text>

                                {!collaborations?.length && (
                                    <Text className={`text-[12px] text-muted`}>
                                        – No invites yet.
                                    </Text>
                                )}
                            </>
                        ) : (
                            <UsersRound className={iconTitleClass} />
                        )}

                        {isFetching && (
                            <>
                                <ProjectItemSkeleton isOpen={isOpen} />
                            </>
                        )}

                        {!isFetching &&
                            collaborations?.map(
                                (project: Project) => (
                                    (
                                        <Link
                                            key={project.id}
                                            href={`/project/${project.id}`}
                                            className="mx-[-10px]"
                                        >
                                            <Flex
                                                className={cn(
                                                    projectClass,
                                                    `${
                                                        project.id ===
                                                            currentProject?.id &&
                                                        "bg-highlight"
                                                    }`,
                                                )}
                                            >
                                                <Theme accentColor="gray">
                                                    <Avatar
                                                        fallback="P"
                                                        src="/assets/imgs/default-img-green.webp"
                                                        alt={project.name}
                                                        className="size-xl"
                                                        radius="small"
                                                    />
                                                </Theme>
                                                {isOpen && (
                                                    <Text className="text-body-s overflow-hidden whitespace-nowrap text-ellipsis">
                                                        {project.name}
                                                    </Text>
                                                )}
                                            </Flex>
                                        </Link>
                                    )
                                ),
                            )}
                    </Flex>

                    <Box className={isOpen ? "pb-xl" : "pb-md"}>
                        <DialogSquare
                            variant={"outline"}
                            hideText={!isOpen}
                            triggerClass={isOpen ? "has-icon-left" : ""}
                        />
                    </Box>
                </Flex>
            </Box>
        </>
    );
}