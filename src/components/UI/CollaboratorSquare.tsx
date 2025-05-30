import {
    Dialog,
    Button,
    Flex,
    Text,
    TextField,
    Theme,
    Callout,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useParams } from "next/navigation";
import { Collaborator } from "@/types";
import { useProjectStore } from "@/stores/useProjectStore";
import { Plus, X } from "lucide-react";

export default function CollaboratorSquare() {
    const { projectId } = useParams<{ projectId: string }>();
    const [CollaboratorEmail, setCollaboratorEmail] = useState<string>("");
    const [inviteError, setInviteError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const { collaborators, fetchCurrentProject } = useProjectStore();

    const collabSave = () => {
        inviteCollaborator();
    };

    const UserEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCollaboratorEmail(e.target.value);
    };

    async function inviteCollaborator() {
        setInviteError(null);

        try {
            const response = await fetch(`${BACKEND_URL}/collaborators/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    projectId: projectId,
                    email: CollaboratorEmail,
                }),
            });
            if (response.ok) {
                await fetchCurrentProject(projectId);
                setCollaboratorEmail("");
            } else {
                const errorData = await response.json();
                setInviteError(errorData.message || "An error occurred");
                setCollaboratorEmail("");
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteCollaborator(collaborator: Collaborator) {
        try {
            const response = await fetch(`${BACKEND_URL}/collaborators/`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    projectId: projectId,
                    collaboratorId: collaborator.user.id,
                }),
            });
            if (response.ok) {
                await fetchCurrentProject(projectId);
                setInviteError(null);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Reset player when the dialog is opened
    // and fetch the current project to get the latest collaborators
    useEffect(() => {
        if (isDialogOpen && projectId) {
            fetchCurrentProject(projectId);
            setInviteError(null);
            setCollaboratorEmail("");
        }
    }, [fetchCurrentProject, isDialogOpen, projectId]);

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
                <button
                    type="button"
                    className="cursor-pointer"
                    aria-label="Invite collaborator"
                >
                    <Flex className="items-center gap-xs">
                        <Plus className="text-brand-accent border-2 border-brand-accent rounded-full icon-xs lg:icon-sm" />
                        <Text className="text-label-s text-brand-accent">
                            Invite
                        </Text>
                    </Flex>
                </button>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>
                    <Text className="text-header-m">Add collaborators</Text>
                </Dialog.Title>

                <Dialog.Description>
                    <Text>
                        The email address must be linked to an existing account
                        in order to be invited to the project.
                    </Text>
                </Dialog.Description>

                <Theme appearance="light" className="bg-transparent">
                    <Flex className="flex-col gap-sm mt-md">
                        <Flex className="flex-col gap-xxs">
                            <Text className="text-body-xs text-muted">
                                Add collaborators email{" "}
                                <Text className="text-brand-accent">*</Text>
                            </Text>
                            <TextField.Root
                                className="text-body-s"
                                value={CollaboratorEmail}
                                placeholder="name@name.com"
                                onChange={UserEmailHandler}
                                onKeyDown={e => {
                                    if (
                                        e.key === "Enter" &&
                                        !e.shiftKey &&
                                        CollaboratorEmail.length > 0
                                    ) {
                                        e.preventDefault();
                                        collabSave();
                                    }
                                }}
                            />
                        </Flex>

                        {inviteError && (
                            <Theme
                                appearance="dark"
                                className="bg-transparent relative"
                            >
                                <Callout.Root
                                    variant="surface"
                                    color="red"
                                    className="p-xs w-fit animate-shake"
                                >
                                    <Callout.Text className="relative">
                                        <Text className="text-body-xs">
                                            {inviteError}
                                        </Text>
                                    </Callout.Text>
                                </Callout.Root>
                            </Theme>
                        )}

                        {collaborators && collaborators?.length > 0 && (
                            <Flex className="flex-col gap-xs">
                                <Text className="text-body-xs text-muted">
                                    Remove collaborators:
                                </Text>

                                {collaborators?.map(
                                    (collaborator: Collaborator) => {
                                        return (
                                            <Button
                                                key={collaborator.user.id}
                                                onClick={() =>
                                                    deleteCollaborator(
                                                        collaborator,
                                                    )
                                                }
                                                variant="outline"
                                                color="iris"
                                                className="h-min w-min mb-xxs px-xs pl-xxs rounded-full"
                                            >
                                                <X className="text-brand-accent icon-xs" />
                                                <Text className="text-body-s text-nowrap">
                                                    {collaborator.user.email}
                                                </Text>
                                            </Button>
                                        );
                                    },
                                )}
                            </Flex>
                        )}
                    </Flex>
                </Theme>

                <Flex className="justify-end gap-md mt-lg xl:mt-xl">
                    <Button
                        type="submit"
                        className="flex-1 md:flex-none md:w-[192px]"
                        variant="outline"
                        color="iris"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Close
                    </Button>

                    <Button
                        className="flex-1 md:flex-none md:w-[192px]"
                        onClick={collabSave}
                        disabled={!CollaboratorEmail}
                    >
                        Invite
                    </Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
