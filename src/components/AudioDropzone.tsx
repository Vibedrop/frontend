import React from 'react'
import { useDropzone } from 'react-dropzone'

interface AudioDropzoneProps {
  onFileUpload: (file: FormData) => Promise<void>;
}

function AudioDropzone({ onFileUpload }: AudioDropzoneProps) {
  const onDropAccepted = async (acceptedFiles: File[]) => {
    try {
      const file = new FormData()
      file.append("file", acceptedFiles[0])
      console.log("acceptedFiles", acceptedFiles[0])

      await onFileUpload(file)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } =
    useDropzone({
      onDropAccepted,
      accept: {
        "audio/*": [".wav"],
      },
    })

  return (
    <div>
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
        <div>
          <h4>Uploaded file</h4>
          <ul>
            {acceptedFiles.map((file) => (
              <li key={file.name}>
                <p>
                  {file.name} - {file.size} bytes
                </p>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}

export default AudioDropzone