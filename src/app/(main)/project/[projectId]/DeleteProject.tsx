import { useState } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useRouter } from "next/navigation";
import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import { Trash2 } from "lucide-react";
import { useProjectStore } from "@/stores/useProjectStore";

type DeleteProjectProps = {
    projectId: string;
};

export default function DeleteProject({ projectId }: DeleteProjectProps) {
    const fetchUsersProjects = useProjectStore.getState().fetchUsersProjects;
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteProject = async () => {
        setIsLoading(true);

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
                await fetchUsersProjects();
                router.push("/");
            } else {
                throw new Error("Error deleting project");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsDialogOpen(false);
            setIsLoading(false);
        }
    };

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
                <Button
                    className="py-xxs pl-xs h-xl bg-background text-muted hover:text-foreground transition-colors "
                    radius="full"
                    aria-label="Delete project"
                >
                    <Trash2 className="icon-xs" />
                    <Text className="text-body-s">Delete project</Text>
                </Button>
            </Dialog.Trigger>

            <Dialog.Content className="w-full max-w-[540px] text-center">
                <Dialog.Title>Delete project</Dialog.Title>

                <Dialog.Description size="2">
                    Are you sure? This will permanently delete the project along
                    with all audio and feedback. This action cannot be undone.
                </Dialog.Description>

                <Flex className="justify-center gap-md mt-lg xl:mt-xl">
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
                        onClick={handleDeleteProject}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        Delete project
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
