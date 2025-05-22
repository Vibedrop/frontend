import { create } from "zustand";
import { BACKEND_URL } from "@/utilities/config";
import { AudioFile, Project, User } from "@/types";

interface ProjectStore {
  projects: any | null;
  currentProject: Project | null;
  currentProjectForPlayer: Project | null;
  owner: User | null;
  collaborators: any | null;
  audioFiles: any | null;
  sortedAudioFiles: AudioFile[] | null;
  fetchUsersProjects: () => void;
  fetchCurrentProject: (projectId: String) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: null,
  currentProject: null,
  currentProjectForPlayer: null,
  owner: null,
  collaborators: null,
  audioFiles: null,
  sortedAudioFiles: null,
  setCurrentProjectForPlayer: (project: Project | null) => set({ currentProjectForPlayer: project }),
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

        if (!data) {
          return null;
        }

        set({
          collaborators: data.collaborators || [],
          owner: data.owner || null,
          audioFiles: data.audioFiles || [],
          sortedAudioFiles: (data.audioFiles || [])
          ?.slice()
          .sort((a: AudioFile, b: AudioFile) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
          currentProject: data,
        });
        return data;
      } else {
        console.error("Fetch failed:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  },
}));
