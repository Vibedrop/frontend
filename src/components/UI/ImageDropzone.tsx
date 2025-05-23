import React from "react";
import { useDropzone } from "react-dropzone";
import { handleUploadImage } from "@/utilities/handleProjects";
import { useParams } from "next/navigation";

function ImageDropzone() {
    const { projectId } = useParams<{ projectId: string }>();
    const onDropAccepted = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        try {
            await handleUploadImage(file, projectId);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted,
        accept: {
            "audio/*": [".wav"],
        },
    });

    return (
        <div
            {...getRootProps()}
            className="h-20 bg-zinc-800 p-4 rounded-lg border-2 border-dashed border-zinc-500 text-center"
        >
            <input {...getInputProps()} />
        </div>
    );
}

export default ImageDropzone;
