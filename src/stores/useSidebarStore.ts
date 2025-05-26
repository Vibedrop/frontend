import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarStore = {
    isOpen: boolean;
    toggleSidebar: () => void;
};

export const useSidebarStore = create(
    persist<SidebarStore>(
        set => ({
            isOpen: true,
            isHydrated: false,
            toggleSidebar: () => set(state => ({ isOpen: !state.isOpen })),
        }),
        {
            name: "sidebar",
        },
    ),
);
