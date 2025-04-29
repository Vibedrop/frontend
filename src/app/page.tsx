"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { Box, Callout, Flex } from "@radix-ui/themes";
import { Info } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AudioDropzone from "@/components/AudioDropzone";
import AudioPlayer from "@/components/footer/AudioPlayer";

export default function Home() {
  const { isAuthenticated, user } = useAuthStore((state) => state);

  const [files, setFiles] = useState<
    {
      key: string;
      lastModified: string;
      size: number;
      etag: string;
      storageClass: string;
      preSignedUrl: string;
    }[]
  >([]);

  const uploadFile = async (file: FormData) => {
    try {
      console.log("file get", file.get("file"));
      const response = await fetch(`${BACKEND_URL}/test/s3`, {
        method: "POST",
        body: file,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("POST response uploadFile()", data);

        await logFiles();
      } else {
        throw new Error("uploadFile() failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function logFiles() {
    try {
      const response = await fetch(`${BACKEND_URL}/test/s3`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("GET response logFiles()", data);
        setFiles(data);
      } else {
        throw new Error("logFiles() failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    // logFiles();
  }, []);

  useEffect(() => {
    console.log("useEffect files", files);
  }, [files]);

  return (
    <>
      <Header />

      <Flex direction="row" gap="2" className="h-full">
        <Sidebar />

        <Box className="bg-zinc-900 w-full p-4 rounded-lg overflow-hidden">
          <section className="container">
            <AudioDropzone onFileUpload={uploadFile} />
            <ul>
              {files.length > 0 ? (
                files.map((file) =>
                  file.key !== ".emptyFolderPlaceholder" ? (
                    <li key={file.key}>
                      <audio controls>
                        <source src={file.preSignedUrl} type="audio/wav" />
                        Your browser does not support the audio element.
                      </audio>
                    </li>
                  ) : null
                )
              ) : (
                <p>No projects created</p>
              )}
            </ul>
          </section>
        </Box>
      </Flex>

      <footer>
        {isAuthenticated ? (
          <AudioPlayer />
        ) : (
          <Callout.Root className="justify-center my-2">
            <Callout.Icon>
              <Info />
            </Callout.Icon>
            <Callout.Text>You are not authorized to view the audio player.</Callout.Text>
          </Callout.Root>
        )}
      </footer>
    </>
  );
}
