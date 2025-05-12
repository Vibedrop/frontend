"use client";
import { BACKEND_URL } from "@/utilities/config";
import { useEffect, useState } from "react";
import { useSidebarStore } from "@/stores/useSidebarStore";
import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Text,
  Skeleton,
  Tooltip,
} from "@radix-ui/themes";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

type User = {
  id: string;
  email: string;
  username: string;
  emailVerified: boolean;
  createdAt: string;
  collaborations: unknown[];
  ownedProjects: Project[];
};

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.metaKey && event.key === "b") {
        event.preventDefault();
        toggleSidebar();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleSidebar]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BACKEND_URL}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        //TODO: handle error
      }

      const user: User = await response.json();

      setProjects(user.ownedProjects);
      setIsFetching(false);
    })();
  }, []);

  return (
    <Flex
      className={cn(
        "flex-col transition-all",
        isOpen ? "w-[240px]" : "w-[80px]"
      )}
    >
      <Flex
        className={cn(
          "w-full p-4",
          isOpen ? "justify-between" : "justify-center"
        )}
      >
        {isOpen && <Heading size="3">Projects</Heading>}
        <Tooltip
          className="font-bold"
          content={isOpen ? "Close (⌘B)" : "Open (⌘B)"}
        >
          <IconButton
            variant="ghost"
            onClick={toggleSidebar}
            className="rounded-full"
          >
            <ChevronLeft
              className={cn(
                "transition-all",
                isOpen ? "rotate-0" : "rotate-180"
              )}
            />
          </IconButton>
        </Tooltip>
      </Flex>
      <Flex className="w-full flex-col gap-y-2 px-4">
        {isFetching && (
          <Flex className="w-full h-10 gap-x-2 items-center">
            <Skeleton>
              <Avatar
                fallback="P"
                src="https://placehold.co/400"
                alt="Project Image"
              />
            </Skeleton>
            <Skeleton>
              {isOpen && (
                <Text className="overflow-hidden whitespace-nowrap text-ellipsis">
                  {
                    "project.nameproject.nameproject.nameproject.nameproject.name"
                  }
                </Text>
              )}
            </Skeleton>
          </Flex>
        )}
        {!isFetching &&
          projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`}>
              <Flex className="w-full h-10 gap-x-2 items-center hover:opacity-70 transition-all">
                <Avatar
                  fallback="P"
                  src="https://placehold.co/400"
                  alt="Project Image"
                />
                {isOpen && (
                  <Text className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {project.name}
                  </Text>
                )}
              </Flex>
            </Link>
          ))}
      </Flex>
    </Flex>
  );
}
