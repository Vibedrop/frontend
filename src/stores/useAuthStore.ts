import { create } from "zustand";

interface User {
  id: string;
  email: string;
  // Add more from profile (name, username, etc)
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  setAuth: (auth: boolean, user: User | null) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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
      const res = await fetch("http://localhost:3000/users/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not authenticated");

      const user = await res.json();
      set({ isAuthenticated: true, user });

    } catch (error) {
      set({ isAuthenticated: false, user: null });
    }
  },
}));
