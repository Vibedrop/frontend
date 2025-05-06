import React from 'react'
import { useDropzone } from 'react-dropzone'
import { handleUpload } from "@/utilities/fileUpload"

interface AudioDropzoneProps {
  projectId: string
}

function AudioDropzone({ projectId }: AudioDropzoneProps) {
  const onDropAccepted = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]

    try {
      await handleUpload(file, projectId)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    accept: {
      "audio/*": [".wav"],
    },
  })

  return (
    <div
      {...getRootProps()}
      className="h-20 bg-zinc-800 p-4 rounded-lg border-2 border-dashed border-zinc-500 text-center"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}

export default AudioDropzone