"use client";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { Box, Flex } from "@radix-ui/themes";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AudioPlayer from "@/components/footer/AudioPlayer";

export default function Home() {
  const [files, setFiles] = useState<
    {
      name: string;
      bucket_id: string;
      owner: string;
      id: string;
      updated_at: string;
      created_at: string;
      last_accessed_at: string;
    }[]
  >([]);

  const uploadFile = async (files: any) => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          files: files,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response", data);
      } else {
        throw new Error("klient");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (files) => {
      uploadFile(files[0]);
    },
  });

  async function logFiles() {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response get", data);
        setFiles(data.data);
      } else {
        throw new Error("klient");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    logFiles();
  }, []);

  return (
    <>
      <Header />

      <Flex direction="row" gap="2" className="h-full">
        <Sidebar />

        <Box className="bg-zinc-900 w-full p-4 rounded-lg overflow-hidden">
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside>
              <h4>Files</h4>
              <ul>
                {files
                  ? files.map((file) => (
                      <li key={file.id}>
                        <a
                          href={`https://nbodsrunndqzztsvilcc.supabase.co/storage/v1/object/public/vibe//${file.name}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {file.name}
                        </a>
                        <audio controls>
                          <source
                            src={`https://nbodsrunndqzztsvilcc.supabase.co/storage/v1/object/public/vibe//${file.name}`}
                            type="audio/wav"
                          ></source>
                          <source
                            src={`https://nbodsrunndqzztsvilcc.supabase.co/storage/v1/object/public/vibe//${file.name}`}
                            type="audio/svg"
                          ></source>
                          Your browser does not support the audio element.
                        </audio>
                      </li>
                    ))
                  : "No files"}
              </ul>
            </aside>
          </section>
        </Box>
      </Flex>

      <footer>
        <AudioPlayer />
      </footer>
    </>
  );
}
