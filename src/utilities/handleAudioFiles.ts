import { BACKEND_URL } from "@/utilities/config";

export const handleUpload = async (audioFile: File, projectId: string) => {
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
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSignedUrl = async (s3Key: string, projectId: string) => {
    try {
        const response = await fetch(
            `${BACKEND_URL}/audio/${projectId}/${s3Key}`,
            {
                method: "GET",
                credentials: "include",
            },
        );

        if (!response.ok) {
            throw new Error("getSignedUrl failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getSignedUrls = async (projectId: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/audio/${projectId}`, {
            method: "GET",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("getSignedUrls failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
