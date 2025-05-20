import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/utilities/config";
import { useParams } from "next/navigation";
import { Collaborator } from "@/types";
import { useProjectStore } from "@/stores/useProjectStore";

export default function CollaboratorSquare() {
  const { projectId } = useParams<{ projectId: string }>();
  const [CollaboratorEmail, setCollaboratorEmail] = useState<string>("");
  const { collaborators } = useProjectStore();

  const collabSave = () => {
    inviteCollaborator();
  };

  const UserEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollaboratorEmail(e.target.value);
    console.log("collaborators", collaborators);
  };

  async function inviteCollaborator() {
    try {
      const response = await fetch(`${BACKEND_URL}/collaborators/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ projectId: projectId, email: CollaboratorEmail }),
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
  async function deleteCollaborator(collaborator: Collaborator) {
    try {
      const response = await fetch(`${BACKEND_URL}/collaborators/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ projectId: projectId, collaboratorId: collaborator.user.id }),
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
        <Button>Invite Collab</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Collaborators</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Invite Collab
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Collaborators email:
            </Text>
            <TextField.Root onChange={UserEmailHandler} defaultValue="Project-name" placeholder="Enter the name of the project" />
          </label>
        </Flex>
        <Flex direction="column" gap="3">
          <Text>Delete collaborators</Text>
          {collaborators?.map((collaborator: Collaborator) => {
            return (
              <>
                <Text>{collaborator.user.email}</Text>
                <Button onClick={() => deleteCollaborator(collaborator)}>X</Button>
              </>
            );
          })}
        </Flex>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={collabSave}>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
