import { useProjectStore } from "@/stores/useProjectStore";
import { useRouter } from "next/navigation";
import { Dialog, Button, Flex, Text, TextField, Theme } from "@radix-ui/themes";
import { useState } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { Plus, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

type DialogSquareProps = {
    variant?: "outline" | "solid" | "smallNavigation";
    triggerClass?: string;
    hideText?: boolean;
    type?: "smallNavigation" | undefined;
};

export default function DialogSquare({
    variant,
    triggerClass,
    hideText,
    type,
}: DialogSquareProps) {
    const fetchUsersProjects = useProjectStore.getState().fetchUsersProjects;
    const router = useRouter();
    const [projectName, setProjectName] = useState<string>("");
    const [projectDesc, setProjectDesc] = useState<string>("");
    const [projectDeadline, setProjectDeadline] = useState<string>("");
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const buttonClass = cn(
        "whitespace-nowrap",
        variant === "outline" && "hover:bg-background",
        type !== "smallNavigation" && hideText && "icon-only rounded-full",
        triggerClass,
    );

    const projectSave = () => {
        createProject();
        setIsDialogOpen(false);
    };
    const projectNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    };
    const projectDescHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectDesc(e.target.value);
    };
    const projectDeadlineHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectDeadline(new Date(e.target.value).toISOString());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            if (!projectName || !projectDesc) {
                e.preventDefault();
                return;
            }
            createProject();
            setIsDialogOpen(false);
        }
    };

    async function createProject() {
        try {
            const response = await fetch(`${BACKEND_URL}/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: projectName,
                    description: projectDesc,
                    deadline: projectDeadline,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setIsDialogOpen(false);
                setProjectName("");
                setProjectDesc("");
                setProjectDeadline("");
                await fetchUsersProjects();
                router.push(`/project/${data.id}`);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
                <Button
                    className={buttonClass}
                    variant={variant === "outline" ? "outline" : "solid"}
                >
                    <Plus className="icon-sm" />
                    <Text className={hideText ? "hidden" : ""}>
                        New project
                    </Text>
                </Button>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>
                    <Text className="text-header-m">Create project</Text>
                </Dialog.Title>

                <Dialog.Description>
                    <Text className="sr-only">
                        Fill in the project name and description to create a new
                        project.
                    </Text>
                </Dialog.Description>

                <Theme appearance="light" className="bg-transparent">
                    <Flex className="flex-col gap-sm">
                        <Flex className="relative justify-end h-8 gap-x-1 items-center">
                            <Text className="text-body-s text-muted">
                                Add deadline
                            </Text>
                            <Timer className="icon-sm text-foreground" />

                            <input
                                type="date"
                                name="deadline"
                                id="deadline"
                                className="rounded h-full"
                                onChange={projectDeadlineHandler}
                            />
                        </Flex>
                        <Flex className="flex-col gap-xxs">
                            <Text className="text-body-xs text-muted">
                                Name{" "}
                                <Text className="text-brand-accent">*</Text>
                            </Text>
                            <TextField.Root
                                className="text-body-s"
                                onChange={projectNameHandler}
                                onKeyDown={handleKeyDown}
                                placeholder="Name your project"
                                autoFocus
                            />
                        </Flex>

                        <Flex className="flex-col gap-xxs">
                            <Text className="text-body-xs text-muted">
                                Description{" "}
                                <Text className="text-brand-accent">*</Text>
                            </Text>
                            <TextField.Root
                                className="text-body-s"
                                onChange={projectDescHandler}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe your project"
                            />
                        </Flex>
                    </Flex>
                </Theme>

                <Flex className="justify-end gap-md mt-lg xl:mt-xl">
                    <Button
                        className="flex-1 md:flex-none md:w-[192px]"
                        variant="outline"
                        color="iris"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="flex-1 md:flex-none md:w-[192px]"
                        onClick={projectSave}
                        disabled={!projectName || !projectDesc}
                    >
                        Create project
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
