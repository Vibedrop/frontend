import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/utilities/config";
import ImageDropzone from "./ImageDropzone";
import { Plus } from "lucide-react";

type DialogSquareProps = {
    variant?: "outline" | "solid";
    hideText?: Boolean;
};

export default function DialogSquare({ variant, hideText }: DialogSquareProps) {
    const [projectName, setProjectName] = useState<string>("");
    const [projectDesc, setProjectDesc] = useState<string>("");

    const projectSave = () => {
        createProject();
    };
    const projectNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectName(e.target.value);
    };
    const projectDescHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectDesc(e.target.value);
    };

    async function createProject() {
        try {
            const response = await fetch(`${BACKEND_URL}/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: projectName,
                    description: projectDesc,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log("hi", data);
            } else {
                throw new Error("error");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    className={`whitespace-nowrap ${hideText ? 'icon-only rounded-full' : 'has-icon-left'} ${variant === 'outline' ? 'hover:bg-background' : ''}`}
                    variant={variant === "outline" ? "outline" : "solid"}
                >
                    <Plus className="icon-sm" />

                    <Text className={hideText ? 'hidden' : ''}>New project</Text>
                </Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Create project</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    Create project
                </Dialog.Description>

                <Flex direction="column" gap="3">
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Project name:
                        </Text>
                        <TextField.Root
                            onChange={projectNameHandler}
                            defaultValue="Project-name"
                            placeholder="Enter the name of the project"
                        />
                    </label>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Description
                        </Text>
                        <TextField.Root
                            onChange={projectDescHandler}
                            defaultValue="Description"
                            placeholder="Enter the description"
                        />
                    </label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                        <Button variant="solid" color="gray">
                            Cancel
                        </Button>
                    </Dialog.Close>
                    <Dialog.Close>
                        <Button onClick={projectSave}>Save</Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
