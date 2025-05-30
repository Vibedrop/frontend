import { Button, Flex, Text } from "@radix-ui/themes";
import React, { useRef } from "react";
import DialogSquare from "../UI/DialogSquare";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { useProjectStore } from "@/stores/useProjectStore";

export default function ProjectNavSmall() {
    const smallNavigationClass = "rounded-full h-xl hover:bg-background";
    const myProjectRef = useRef<HTMLSelectElement | null>(null);
    const collaborationsRef = useRef<HTMLSelectElement | null>(null);
    const { collaborations, ownedProjects } = useProjectStore();

    const hasOwnProjects = ownedProjects && ownedProjects.length > 0;
    const hasCollaborations = collaborations && collaborations.length > 0;

    const handleMyProjectsClick = () => {
        myProjectRef.current?.focus();
        myProjectRef.current?.click();
    };

    const handleCollaborationsClick = () => {
        collaborationsRef.current?.focus();
        collaborationsRef.current?.click();
    };

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value) window.location.href = value;
    };

    return (
        <Flex className="md:hidden gap-sm p-[2px] mb-md">
            <DialogSquare
                variant="outline"
                type="smallNavigation"
                hideText={true}
                triggerClass={cn(
                    smallNavigationClass,
                    "icon-xxs p-0 size-xl mr-auto sm:mr-0",
                )}
            />

            <Button
                disabled={!hasOwnProjects}
                onClick={handleMyProjectsClick}
                variant="outline"
                className={cn(
                    smallNavigationClass,
                    "relative",
                    !hasOwnProjects ? "opacity-30 custom-disabled" : "",
                )}
            >
                <Text className="text-body-s">My projects</Text>

                <select
                    ref={myProjectRef}
                    onChange={handleSelect}
                    className={`absolute top-0 left-0 w-full h-full opacity-0 ${!hasOwnProjects ? "hidden" : ""}`}
                    defaultValue={""}
                >
                    <option value="" key="my-projects" disabled>
                        My projects
                    </option>
                    {ownedProjects?.map((project: Project) => (
                        <option
                            key={project.id}
                            value={`/project/${project.id}`}
                        >
                            {project.name}
                        </option>
                    ))}
                </select>
            </Button>

            <Button
                disabled={!hasCollaborations}
                onClick={handleCollaborationsClick}
                variant="outline"
                className={cn(
                    smallNavigationClass,
                    "relative",
                    !hasCollaborations ? "opacity-30 custom-disabled" : "",
                )}
            >
                <Text className="text-body-s">Shared projects</Text>

                <select
                    ref={collaborationsRef}
                    onChange={handleSelect}
                    className={`absolute top-0 left-0 w-full h-full opacity-0 ${!hasCollaborations ? "hidden" : ""}`}
                    defaultValue={""}
                >
                    <option value="" key="shared-projects" disabled>
                        Shared projects
                    </option>
                    {collaborations?.map((project: Project) => (
                        <option
                            key={project.id}
                            value={`/project/${project.id}`}
                        >
                            {project.name}
                        </option>
                    ))}
                </select>
            </Button>
        </Flex>
    );
}
