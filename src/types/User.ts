import { Project } from "./Project";
import { Comment } from "./Comment";

export type User = {
    id: string;
    email: string;
    username: string;
    password: string;
    emailVerified: boolean;
    createdAt: Date;
    ownedProjects: Project[];
    collaborations: { project: Project }[];
    comments: Comment[];
};
