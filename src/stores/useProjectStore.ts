import { create } from "zustand";
import { BACKEND_URL } from "@/utilities/config";
import { AudioFile, Collaborator, Project, User } from "@/types";
import { useParams } from "next/navigation";

interface ProjectStore {
  projects: any | null;
  currentProject: Project | null;
  owner: User | null;
  collaborators: any | null;
  audioFiles: any | null;
  fetchUsersProjects: () => void;
  fetchCurrentProject: (projectId: String) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: null,
  currentProject: null,
  owner: null,
  collaborators: null,
  audioFiles: null,
  fetchUsersProjects: async () => {
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
        console.log("fetchUsersProjects", data);
        set({ projects: data });
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchCurrentProject: async (projectId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/projects/${projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ projectId: projectId }),
      });
      if (response.ok) {
        const data = await response.json();
        set({ currentProject: data });
        set({ collaborators: data.collaborators });
        set({ owner: data.owner });
        set({ audioFiles: data.audioFiles });
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  },
}));
