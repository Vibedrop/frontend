"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { Box, Flex, IconButton } from "@radix-ui/themes";
import ProjectItem from "./ProjectItem";
import DialogSquare from "@/components/UI/dialogSquare_wip";

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const [project, setProject] = useState([]);
  async function getProjects() {
    try {
      const response = await fetch(`${BACKEND_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setProject(data.ownedProjects);
        console.log("hi", data);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Flex className={`overflow-hidden flex-shrink-0 ${isOpen ? "w-[420px]" : ""}`}>
      <Box className="flex-col w-full p-1.5">
        <nav className="space-y-0" aria-label="Main navigation">
          <div className={`flex items-center gap-3 p-2 ${isOpen ? "justify-between" : "justify-center"}`}>
            {isOpen && <h4 className="font-bold ml-1">Your Projects</h4>}

            <IconButton
              className={`cursor-pointer rounded-full bg-transparent text-zinc-500 hover:bg-zinc-800 hover:text-white size-10`}
              onClick={toggleSidebar}
            >
              {isOpen ? <PanelRightOpen /> : <PanelRightClose />}
            </IconButton>
          </div>
          {project.length > 0 ? (
            project.map((project: any) => {
              return (
                <div key={project.id}>
                  <ProjectItem
                    title={project.name}
                    desc={project.description}
                    src="https://images.unsplash.com/photo-1697464455500-35fbe5638ec8"
                    projectId={project.id}
                  />
                </div>
              );
            })
          ) : (
            <p>No projects created yet</p>
          )}
          <div className="flex">
            <DialogSquare />
          </div>
        </nav>
      </Box>
    </Flex>
  );
}
