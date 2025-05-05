import { Project } from "./Project";
import { Collaborator } from "./Collaborator";
import { Comment } from "./Comment";

export type User = {
    id: string;
    email: string;
    username: string;
    password: string;
    emailVerified: boolean;
    createdAt: Date;
    ownedProjects: Project[];
    collaborations: Collaborator[];
    comments: Comment[];
  }