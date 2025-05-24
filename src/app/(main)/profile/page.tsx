"use client";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProfilePage() {
      const { checkAuth } = useAuthStore();
    const user = useAuthStore(state => state.user);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [name, setName] = useState<string>(user?.username || "");

    const handleNameClick = () => setIsEditing(true);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleBlur = () => setIsEditing(false);

    async function changeName() {
        try {
            const response = await fetch(`${BACKEND_URL}/users/${user?.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    username: name,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("changeName", data);
                await checkAuth();
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setIsEditing(false);
            changeName();
        }
    };

    return (
        <div>
            {isEditing ? (
                <input
                    type="text"
                    value={name}
                    autoFocus
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <span onClick={handleNameClick} style={{ cursor: "pointer" }}>
                    {name}
                </span>
            )}
        </div>
    );
}
