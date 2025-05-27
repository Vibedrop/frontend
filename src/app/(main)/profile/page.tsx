"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useAuthStore } from "@/stores/useAuthStore";
import { Text } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const { checkAuth } = useAuthStore();
    const user = useAuthStore(state => state.user);
    const [isEditingName, setIsNameEditing] = useState<boolean>(false);
    const [isEditingPassword, setIsPasswordEditing] = useState<boolean>(false);
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
            <div>
                <Text>Name:</Text>
                {isEditingName ? (
                    <input
                        type="text"
                        value={name}
                        autoFocus
                        onChange={handleNameInputChange}
                        onBlur={handleNameBlur}
                        onKeyDown={handleNameKeyDown}
                    />
                ) : (
                    <span
                        onClick={handleNameClick}
                        style={{ cursor: "pointer" }}
                    >
                        {name}
                    </span>
                )}
            </div>
            <div>
                <Text>Pasword:</Text>
                {isEditingPassword ? (
                    <input
                        type="text"
                        autoFocus
                        onChange={handlePasswordInputChange}
                        onBlur={handlePasswordBlur}
                        onKeyDown={handlePasswordKeyDown}
                    />
                ) : (
                    <span
                        onClick={handlePasswordClick}
                        style={{ cursor: "pointer" }}
                    >
                        Change
                    </span>
                )}
            </div>
            <button className="bg-red-600 p-4 rounded-lg" onClick={handleDeleteUser}>Delete User</button>
        </>
    );
}
