"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useProjectStore } from "@/stores/useProjectStore";
import DialogSquare from "@/components/UI/DialogSquare";

export default function Page() {
  const { projects } = useProjectStore();
  const { isOpen } = useSidebarStore();
  const [files, setFiles] = useState<
    {
      key: string;
      lastModified: string;
      size: number;
      etag: string;
      storageClass: string;
      preSignedUrl: string;
    }[]
  >([]);

  async function logFiles() {
    try {
      const response = await fetch(`${BACKEND_URL}/test/s3`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("GET response logFiles()", data);
        setFiles(data);
      } else {
        throw new Error("logFiles() failed");
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("useEffect files", files);
  }, [files]);

  return (
    <Flex className={`flex-col w-full max-w-[1080px] h-full mt-[8vw] gap-md self-center transition-all ${isOpen ? '2xl:ml-[-320px]' : '2xl:ml-[-80px]'}`}>
      <Flex className="flex-col gap-y-xl items-center">
        <Text className="text-header-m max-w-[700px] text-center">

          {projects?.ownedProjects.length > 0 ? (
            'Got a new idea? Start a fresh project and keep the momentum going.'
          ) : (
            'Ready to bring your ideas to life? Start your first project and turn your creativity into something real.'
          )}

        </Text>

        <DialogSquare triggerClass="has-icon-left" />
      </Flex>
    </Flex>
  );
}
