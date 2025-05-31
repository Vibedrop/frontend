import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BACKEND_URL } from "@/utilities/config";

interface User {
    id: string;
    email: string;
    username: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    setAuth: (auth: boolean, user: User | null) => void;
    checkAuth: () => Promise<"ok" | "unauthorized">;
}

export const useAuthStore = create(
    persist<AuthState>(
        set => ({
            isAuthenticated: false,
            user: null,

            setAuth: (auth, user) => {
                set({
                    isAuthenticated: auth,
                    user: user,
                });
            },

            checkAuth: async () => {
                try {
                    const res = await fetch(`${BACKEND_URL}/users/me`, {
                        credentials: "include",
                    });

                    if (!res.ok) {
                        set({ isAuthenticated: false, user: null });
                        return "unauthorized";
                    }

                    const user = await res.json();
                    set({ isAuthenticated: true, user });
                    return "ok";
                } catch {
                    set({ isAuthenticated: false, user: null });
                    return "unauthorized";
                }
            },
        }),
        {
            name: "auth",
        },
    ),
);
