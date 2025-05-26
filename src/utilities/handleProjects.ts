import { BACKEND_URL } from "@/utilities/config";

export const handleUploadImage = async (audioFile: File, projectId: string) => {
    // ? const project = useParams<{ projectId: string }>()

    const formData = new FormData();
    formData.append("file", audioFile);

    try {
        const response = await fetch(`${BACKEND_URL}/audio/${projectId}`, {
            method: "POST",
            credentials: "include",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("handleUpload failed");
        }

        const data = await response.json();
        console.log("POST response handleUpload()", data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
