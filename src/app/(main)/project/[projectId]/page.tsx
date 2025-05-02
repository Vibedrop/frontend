"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { BACKEND_URL } from "@/utilities/config";

interface Project {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  maxFileSize: number; // in MB
  maxFiles: number;
  owner: User;
  ownerId: string;
  audioFiles: AudioFile[];
  collaborators: Collaborator[];
}

interface User {
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

interface AudioFile {
  id: string;
  name: string;
  s3Key: string;
  duration?: number; // in seconds
  isChecked: boolean;
  createdAt: Date;
  project: Project;
  projectId: string;
  comments: Comment[];
}

interface Collaborator {
  id: string;
  createdAt: Date;
  user: User;
  userId: string;
  project: Project;
  projectId: string;
}

interface Comment {
  id: string;
  content: string;
  timestamp?: number;
  createdAt: Date;
  fileId: string;
  authorId: string;
  audioFile: AudioFile;
  author: User;
}

export default function Page() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [collabs, setCollabs] = useState<Collaborator[] | null>(null);
  const [audioFiles, setAudioFiles] = useState<AudioFile[] | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const handleComments = (audioID: string) => {
    getComments(audioID);
  };
  async function getProjects() {
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
        setProject(data);
        setCollabs(data.collaborators);
        setAudioFiles(data.audioFiles);
        console.log("project", data);
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

  async function getComments(fileID: string) {
    try {
      const response = await fetch(`${BACKEND_URL}/comments/${fileID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fileid: fileID }),
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
        console.log("getComments", data);
      } else {
        throw new Error("error");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="flex h-1/3">
        <img className="h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1697464455500-35fbe5638ec8" alt="" />
        <div className="flex flex-col justify-end h-5/6 gap-2 ml-2">
          <h1 className="text-4xl">{project?.name}</h1>
          <p>{project?.description}</p>
          <ul className="flex gap-2">
            <li>
              <p>Owner: {project?.owner?.username}</p>
            </li>
            <p>Collaborators: </p>
            {collabs?.map((user) => (
              <li key={user.user.username} className="flex gap-2">
                <div className="h-4 w-4"></div>
                <p>{user.user.username}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="m-4 h-16 w-1/4 border-dashed border-2">
        <button>works</button>
      </section>
      <section className="flex h-full">
        <ul className="flex gap-2 flex-col w-9/12">
          {audioFiles?.map((audio: AudioFile) => (
            <li key={audio.name} className="flex gap-2">
              <div className="bg-white h-full rounded-2xl w-1/12"></div>
              <div className="w-5/12">
                <h2>{audio.name}</h2>
              </div>
              <div className="w-2/12">
                <p>info1</p>
              </div>
              <div className="w-2/12">
                <p>info2</p>
              </div>
              <div className="w-2/12">
                <p>info3</p>
              </div>
              <div>
                <img className="bg-white h-4 w-4" onClick={() => handleComments(audio.id)} src="message-square-text.svg" alt="" />
              </div>
            </li>
          ))}
        </ul>
        <div className="border-2 border-white rounded-lg p-2 mx-2 flex flex-col bg-gray-900 w-3/12">
          <p className="text-center">comments</p>
          <ul className="w-full h-3/6">
            {comments ? (
              comments.map((comment, index) => (
                <li key={index} className="flex gap-2">
                  {<p>{comment.author.username}:</p>}
                  {<p> {comment.content}</p>}
                </li>
              ))
            ) : (
              <p>No comments</p>
            )}
          </ul>
          <input className="" type="text" />
        </div>
      </section>
    </>
  );
}
