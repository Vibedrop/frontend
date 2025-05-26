import { AudioFile } from "./AudioFile";
import { User } from "./User";

export type Comment = {
    id: string;
    content: string;
    timestamp?: number;
    createdAt: Date;
    fileId: string;
    authorId: string;
    audioFile: AudioFile;
    author: User;
};
