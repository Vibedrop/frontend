"use client";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import SidebarProject from "./sidebar/SidebarProject";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();

  return (
    <Flex className={`bg-zinc-900 rounded-lg overflow-hidden flex-shrink-0 ${isOpen ? "w-[420px]" : ""}`}>
      <Box className="flex-col w-full p-1.5">
        <nav className="space-y-0" aria-label="Main navigation">
          <div className={`flex items-center gap-3 p-2 ${isOpen ? "justify-between" : "justify-center"}`}>
            {isOpen && (
              <h4 className="font-bold ml-1">Your Projects</h4>
            )}

            <IconButton
              className={`cursor-pointer rounded-full bg-transparent text-zinc-500 hover:bg-zinc-800 hover:text-white size-10`}
              onClick={toggleSidebar}
            >
              {isOpen ? (
                <PanelRightOpen />
              ) : (
                <PanelRightClose />
              )}
            </IconButton>
          </div>

          <SidebarProject
            title="Project name 1"
            src="https://images.unsplash.com/photo-1697464455500-35fbe5638ec8" />
          <SidebarProject
            title="Project name 2"
            src="https://plus.unsplash.com/premium_photo-1666739087569-eec71efac750" />
        </nav>
      </Box>
    </Flex>
  );
}
