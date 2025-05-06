import { BACKEND_URL } from "@/utilities/config";
import { nanoid } from "nanoid";

export const handleUpload = async (audioFile: File, projectId: string) => {
  const s3Key = nanoid(21)

  const formData = new FormData()
  formData.append("projectId", projectId)
  formData.append("s3Key", s3Key)
  formData.append("fileName", audioFile.name)
  formData.append("file", audioFile)

  try {
    const response = await fetch(`${BACKEND_URL}/projects/${projectId}/files`, {
      method: "POST",
      credentials: "include",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("handleUpload failed")
    }

    const data = await response.json()
    console.log("POST response handleUpload()", data)
  } catch (error) {
    console.error(error)
    throw error
  }
}
