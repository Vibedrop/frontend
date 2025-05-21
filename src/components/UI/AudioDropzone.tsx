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
    Box,
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
        maxFiles: 1,
        maxSize: 20 * 1024 * 1024, // 20 MB
        accept: {
            "audio/*": [".mp3"],
        },
    });

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger>
                <div
                    {...getRootProps()}
                    className="flex flex-row w-full h-[100px] lg:max-w-[420px] bg-background p-md lg:p-lg border-2 border-dashed border-highlight justify-center items-center"
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <Text className="text-body-xs text-brand-accent">Drop audio file here…</Text>
                    ) : (
                        <Flex className="gap-sm items-center">
                            <Button variant="solid" color="gray" highContrast className="px-xl py-lg">
                                <Text className="text-body-s">Import</Text>
                            </Button>

                            <Flex className="flex-col">
                                <Text className="text-body-xs md:text-body-s">
                                    Or drop an audio file here
                                </Text>

                                <Text className="text-body-xs text-brand-accent">
                                    (Mp3 only / 20MB max)
                                </Text>
                            </Flex>
                        </Flex>
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
