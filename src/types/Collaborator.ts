import { User } from "./User";
import { Project } from "./Project";

export type Collaborator = {
    id: string;
    createdAt: Date;
    user: User;
    userId: string;
    project: Project;
    projectId: string;
};
