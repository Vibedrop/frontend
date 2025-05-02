"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useEffect, useState } from "react";
import { Box } from "@radix-ui/themes";
import AudioDropzone from "@/components/UI/AudioDropzone";

export default function Home() {

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
  );
}
