import React from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FolderOpen } from "lucide-react";
import {
    Dialog,
    Button,
    Flex,
    Text,
    TextField,
    IconButton,
} from "@radix-ui/themes";

function AudioDropzone() {
    const { projectId } = useParams<{ projectId: string }>();

    const [songTitle, setSongTitle] = useState<string>("Song-title");
    const [songDescription, setSongDescription] =
        useState<string>("Song-description");
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(e.target.value);
    };
    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongDescription(e.target.value);
    };
    const handleUpload = async () => {
        if (!audioFile) {
            console.error("No audio file selected");
            return;
        }
        const formData = new FormData();
        formData.append("file", audioFile);

        try {
            const response = await fetch(`${BACKEND_URL}/audio/${projectId}`, {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            console.log("POST response handleAudio", data);

            setIsDialogOpen(false);
            setAudioFile(null);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const onDropAccepted = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) {
            console.error("No file selected");
            return;
        }

        // ? Put in try/catch?
        setAudioFile(file);
        setIsDialogOpen(true);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        noClick: true,
        noKeyboard: true,
        accept: {
            "audio/*": [".wav"],
        },
    });

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
                <div
                    {...getRootProps()}
                    className="flex flex-row h-20 w-40 bg-zinc-800 p-4 rounded-lg border-2 border-dashed border-zinc-500 text-center"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <span>Drop file here ...</span>
                    ) : (
                        <div>
                            <Button variant="solid" color="gray">
                                Import
                            </Button>
                            <Text as="div" size="2" mb="1">
                                or drop your audio file here
                            </Text>
                        </div>
                    )}
                </div>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>New song</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Upload a new audio file
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Song title:
                        </Text>
                        <TextField.Root
                            value={songTitle}
                            onChange={titleHandler}
                            placeholder="Enter the title of the song"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextField.Root
                            value={songDescription}
                            onChange={descriptionHandler}
                            placeholder="Enter the description"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Audio file
                        </Text>
                        <input
                            id="audio-upload"
                            type="file"
                            accept="audio/*"
                            onChange={e =>
                                setAudioFile(e.target.files?.[0] || null)
                            }
                            style={{ display: "none" }}
                        />
                        <Flex direction="row" gap="2" align="center">
                            <IconButton
                                variant="surface"
                                color="gray"
                                onClick={() =>
                                    document
                                        .getElementById("audio-upload")
                                        ?.click()
                                }
                            >
                                <FolderOpen />
                            </IconButton>
                            {audioFile && (
                                <Text as="div" size="2" mt="1">
                                    Selected file: {audioFile.name}
                                </Text>
                            )}
                        </Flex>
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button
                            variant="soft"
                            color="gray"
                            onClick={() => setAudioFile(null)}
                        >
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={handleUpload}>Upload</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default AudioDropzone;
