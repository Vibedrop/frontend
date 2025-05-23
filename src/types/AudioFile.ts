import { Project } from "./Project";

export type AudioFile = {
    id: string;
    name: string;
    description: string;
    s3Key: string;
    duration?: number; // in seconds
    isChecked: boolean;
    createdAt: Date;
    project: Project;
    projectId: string;
    comments: Comment[];
};
