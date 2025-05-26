import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { useSidebarStore } from "@/stores/useSidebarStore";
import Link from "next/link";
import React from "react";

type SidebarProjectProps = {
    src: string;
    title: string;
    desc: string;
    projectId: string;
};

export default function SidebarProject({
    src,
    title,
    desc,
    projectId,
}: SidebarProjectProps) {
    const { isOpen } = useSidebarStore();

    return (
        <Box asChild>
            <Link
                href={`/project/${projectId}`}
                className="w-full hover:bg-zinc-800 rounded-lg p-2"
            >
                <Flex gap="3" align="center">
                    <Avatar
                        size="4"
                        src={`${src}?&w=64&h=64&dpr=2&q=70&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop`}
                        fallback="T"
                        className="rounded-sm"
                    />

                    {isOpen && (
                        <Box>
                            <Text as="div" size="2" weight="bold">
                                {title}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                {desc}
                            </Text>
                        </Box>
                    )}
                </Flex>
            </Link>
        </Box>
    );
}
