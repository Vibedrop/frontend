"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, UserCircle2 } from "lucide-react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { ConfirmDialog } from "@/components/UI/ConfirmDialog";

export default function ProfilePage() {
    const router = useRouter();
    const { checkAuth } = useAuthStore();
    const { isOpen } = useSidebarStore();
    const user = useAuthStore(state => state.user);
    const [isEditingName, setIsNameEditing] = useState<boolean>(false);
    const [isEditingPassword, setIsPasswordEditing] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isDeletingUser, setIsDeletingUser] = useState(false);

    const [name, setName] = useState<string>(user?.username || "");
    const [password, setPassword] = useState<string>(user?.username || "");

    const handleNameClick = () => setIsNameEditing(true);
    const handlePasswordClick = () => setIsPasswordEditing(true);

    const handleNameInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleNameBlur = () => setIsNameEditing(false);
    const handlePasswordBlur = () => setIsPasswordEditing(false);

    async function changeName() {
        try {
            const response = await fetch(
                `${BACKEND_URL}/users/${user?.id}/username`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        username: name,
                    }),
                },
            );
            if (response.ok) {
                await checkAuth();
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }
    async function changePassword() {
        try {
            const response = await fetch(
                `${BACKEND_URL}/users/${user?.id}/password`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        password: password,
                    }),
                },
            );
            if (response.ok) {
                await checkAuth();
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

        const handleDeleteUser = async () => {
            setIsDeletingUser(true);
            try {
                const response = await fetch(
                    `${BACKEND_URL}/users/me`,
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                    },
                );
                if (response.ok) {
                    router.push("/start")
                } else {
                    throw new Error("Error deleting user");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsDeletingUser(false);
            }
    };

    const handleNameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsNameEditing(false);
            changeName();
        }
    };
    const handlePasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsPasswordEditing(false);
            changePassword();
        }
    };

    return (
        <>
            <Flex
                style={{ willChange: "margin-left" }}
                className={`flex-col w-full max-w-[1080px] 2xl:max-w-[910px] 2xl-plus:max-w-[1080px] gap-xs self-center transition-[margin-left] ${
                            isOpen ? "2xl:ml-[-320px]" : "2xl:ml-[-80px]"
                        }`}
                    >
                    <Flex className="flex-col w-fill justify-start">
                        <UserCircle2 className="icon-xxl" />
                        <Text className="text-header-m font-normal text-muted mt-sm">{user?.email}</Text>
                        <Text className="text-header-s text-muted lg:text-header-m font-thin">Your updates are saved as you go</Text>
                    </Flex>

                    <Flex className="flex-row w-fill justify-between items-center gap-md mt-md">
                        <Text>User name:</Text>

                        <Flex className="items-center gap-xxs">
                            {isEditingName ? (
                                <input
                                    type="text"
                                    className="text-right bg-background p-sm w-full max-w-[200px]"
                                    value={name}
                                    autoFocus
                                    onChange={handleNameInputChange}
                                    onBlur={handleNameBlur}
                                    onKeyDown={handleNameKeyDown}
                                />
                            ) : (
                                <Text
                                    onClick={handleNameClick}
                                    className="h-12 p-sm pointer"
                                >
                                    {name}
                                </Text>
                            )}

                            <Pencil className="icon-xxs text-background" />
                        </Flex>
                    </Flex>

                    <Flex className="flex-row w-fill justify-between items-center gap-md">
                        <Text className="text-foreground">Pasword:</Text>

                        <Flex className="items-center gap-xxs">
                            {isEditingPassword ? (
                                <input
                                    type="text"
                                    className="text-right bg-background p-sm w-full max-w-[200px]"
                                    placeholder="•••••••••"
                                    autoFocus
                                    onChange={handlePasswordInputChange}
                                    onBlur={handlePasswordBlur}
                                    onKeyDown={handlePasswordKeyDown}
                                />
                            ) : (
                                <Text
                                    onClick={handlePasswordClick}
                                    className="h-12 p-sm pointer"
                                >
                                    •••••••••
                                </Text>
                            )}

                            <Pencil className="icon-xxs text-background" />
                        </Flex>
                    </Flex>

                    <Flex className="flex-row mt-sm justify-start">
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(true)}
                            >
                            <Trash2 className="icon-xs" />
                            Delete user
                        </Button>
                    </Flex>
            </Flex>

            <ConfirmDialog
                open={dialogOpen}
                onOpenChange={open => setDialogOpen(open)}
                onConfirm={handleDeleteUser}
                onCancel={() => {}}
                title="Delete user"
                description="Are you sure? This will permanently delete the user along with all projects, audio files and feedback. This action cannot be undone."
                confirmLabel="Delete user"
                cancelLabel="Cancel"
                loading={isDeletingUser}
            />
        </>
    );
}
