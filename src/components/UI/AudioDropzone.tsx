import React, { useState } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { FileRejection, useDropzone } from "react-dropzone";
import { useParams } from "next/navigation";
import { FolderOpen } from "lucide-react";
import {
    Dialog,
    Button,
    Flex,
    Text,
    TextField,
    Callout,
    Theme,
} from "@radix-ui/themes";
import { useProjectStore } from "@/stores/useProjectStore";

function AudioDropzone() {
    const ALLOWED_MIME_TYPES = ["audio/mpeg"];
    const ALLOWED_EXTENSIONS = [".mp3"];
    const MAX_FILESIZE = 20 * 1024 * 1024; // 20MB in bytes

    const { projectId } = useParams<{ projectId: string }>();
    const [songTitle, setSongTitle] = useState<string>("");
    const [songDescription, setSongDescription] = useState<string>("");
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dropError, setDropError] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const fetchCurrentProject = useProjectStore(
        state => state.fetchCurrentProject,
    );

    const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongTitle(e.target.value);
    };
    const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSongDescription(e.target.value);
    };

    const handleCancelUpload = () => {
        setAudioFile(null);
        setIsDialogOpen(false);
    };

    const handleDialogOpen = () => {
        setDropError(null);
        setUploadError(null);
        setSongTitle("");
        setSongDescription("");
        setAudioFile(null);
    };

    const handleUpload = async () => {
        if (!audioFile) {
            console.error("No audio file selected");
            return;
        }

        setUploadError(null);
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", audioFile);
        formData.append("title", songTitle);
        formData.append("description", songDescription);

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

            setIsDialogOpen(false);
            setAudioFile(null);

            await fetchCurrentProject(projectId);
        } catch (error) {
            setUploadError("Upload failed, please try again");
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (
            ALLOWED_MIME_TYPES.includes(file.type) ||
            ALLOWED_EXTENSIONS.some(extension =>
                file.name.toLowerCase().endsWith(extension),
            )
        ) {
            if (file.size > MAX_FILESIZE) {
                setUploadError("File size must be less than 20MB");
                setAudioFile(null);
                return;
            }
            setAudioFile(file);
            setUploadError(null);
        } else {
            setUploadError("Only MP3 files are allowed");
            setAudioFile(null);
        }
    };

    const onDropAccepted = async (acceptedFiles: File[]) => {
        setDropError(null);
        setUploadError(null);

        const file = acceptedFiles[0];
        if (!file) {
            console.error("No file selected");
            return;
        }

        setAudioFile(file);
        setIsDialogOpen(true);
    };

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const rejectedFile = rejectedFiles[0].file;

        !ALLOWED_MIME_TYPES.includes(rejectedFile.type)
            ? setDropError(
                  "Unsupported file type. Only .mp3 files are allowed.",
              )
            : rejectedFile.size > MAX_FILESIZE
              ? setDropError("File is too large. Maximum size allowed is 20MB.")
              : setDropError("An unknown error occurred");
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted,
        onDropRejected,
        noClick: true,
        noKeyboard: true,
        maxFiles: 1,
        maxSize: MAX_FILESIZE,
        accept: {
            [ALLOWED_MIME_TYPES[0]]: ALLOWED_EXTENSIONS,
        },
    });

    return (
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <Dialog.Trigger onClick={handleDialogOpen}>
                <Flex className="flex-col lg:flex-rol items-start gap-sm">
                    <Flex
                        {...getRootProps()}
                        className="flex flex-row w-full h-[100px] lg:max-w-[420px] bg-background p-md lg:p-lg border-2 border-dashed border-highlight justify-center items-center"
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <Text
                                className="text-body-xs text-brand-accent"
                                align="center"
                            >
                                Drop audio file here...
                            </Text>
                        ) : (
                            <Flex className="gap-sm items-center">
                                <Button
                                    variant="solid"
                                    color="gray"
                                    highContrast
                                    className="p-md lg:px-xl lg:py-lg"
                                >
                                    <Text className="text-body-s">Import</Text>
                                </Button>
                                <Flex className="flex-col">
                                    <Text className="text-body-xs md:text-body-s">
                                        or drop your audio file here
                                    </Text>
                                    <Text className="text-body-xs text-brand-accent">
                                        (Mp3 only / 20MB max)
                                    </Text>
                                </Flex>
                            </Flex>
                        )}
                    </Flex>

                    {dropError && (
                        <Callout.Root
                            variant="surface"
                            color="red"
                            className="p-xs w-full lg:max-w-[420px] justify-center"
                        >
                            <Callout.Text>
                                <Text className="text-body-xs">
                                    {dropError}
                                </Text>
                            </Callout.Text>
                        </Callout.Root>
                    )}
                </Flex>
            </Dialog.Trigger>

            <Dialog.Content>
                <Dialog.Title>
                    <Text className="text-header-m">Add track</Text>
                </Dialog.Title>

                <Dialog.Description>
                    <Text className="sr-only">
                        Fill in the song title and description to add a new
                        track.
                    </Text>
                </Dialog.Description>

                <Theme appearance="light" className="bg-transparent">
                    <Flex className="flex-col gap-sm">
                        <Flex className="flex-col gap-xxs">
                            <Text className="text-body-xs text-muted">
                                Song title{" "}
                                <Text className="text-brand-accent">*</Text>
                            </Text>
                            <TextField.Root
                                className="text-body-s"
                                onChange={titleHandler}
                                placeholder="Enter the title of the song"
                            />
                        </Flex>

                        <Flex className="flex-col gap-xxs">
                            <Text className="text-body-xs text-muted">
                                Description{" "}
                                <Text className="text-brand-accent">*</Text>
                            </Text>
                            <TextField.Root
                                className="text-body-s"
                                onChange={descriptionHandler}
                                placeholder="Describe your track"
                            />
                        </Flex>

                        <Flex className="flex-col gap-xxs">
                            <input
                                id="audio-upload"
                                type="file"
                                accept={[
                                    ...ALLOWED_MIME_TYPES,
                                    ...ALLOWED_EXTENSIONS,
                                ].join(",")}
                                onChange={handleFileInputChange}
                                style={{ display: "none" }}
                            />

                            {uploadError && (
                                <Theme
                                    appearance="dark"
                                    className="bg-transparent relative"
                                >
                                    <Callout.Root
                                        variant="surface"
                                        color="red"
                                        className="p-xs w-fit animate-shake"
                                    >
                                        <Callout.Text className="relative">
                                            <Text className="text-body-xs">
                                                {uploadError}
                                            </Text>
                                        </Callout.Text>
                                    </Callout.Root>
                                </Theme>
                            )}

                            <Flex className="flex-row gap-xs mt-xs items-center">
                                <Button
                                    variant="surface"
                                    color="gray"
                                    onClick={() =>
                                        document
                                            .getElementById("audio-upload")
                                            ?.click()
                                    }
                                >
                                    <FolderOpen />
                                    <Text className="text-body-xs font-medium">
                                        Upload file
                                    </Text>
                                </Button>
                                {audioFile && (
                                    <Text className="text-body-xs text-brand-accent">
                                        Filename: <br /> {audioFile.name}
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex className="justify-end gap-md mt-lg xl:mt-xl">
                        <Button
                            className="flex-1 md:flex-none md:w-[192px]"
                            variant="outline"
                            color="iris"
                            onClick={handleCancelUpload}
                        >
                            Cancel
                        </Button>

                        <Button
                            loading={isUploading}
                            className="flex-1 md:flex-none md:w-[192px]"
                            onClick={handleUpload}
                            disabled={
                                !songTitle ||
                                !songDescription ||
                                !audioFile ||
                                isUploading
                            }
                        >
                            Add track
                        </Button>
                    </Flex>
                </Theme>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default AudioDropzone;
