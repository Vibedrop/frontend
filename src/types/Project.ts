import { User } from "./User";
import { AudioFile } from "./AudioFile";
import { Collaborator } from "./Collaborator";

export type Project = {
    id: string;
    projectId: string;
    name: string;
    description?: string;
    isPublic: boolean;
    createdAt: Date;
    maxFileSize: number;
    maxFiles: number;
    owner: User;
    ownerId: string;
    audioFiles: AudioFile[];
    collaborators: Collaborator[];
    collaborations?: Project[];
    deadline?: Date;
};
