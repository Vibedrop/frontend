import { Avatar, Flex, Skeleton, Text } from "@radix-ui/themes";
import React from "react";

export default function ProjectItemSkeleton({ isOpen }: { isOpen: boolean }) {
    return (
        <Flex className="w-full h-10 gap-x-2 items-center justify-center">
            <Skeleton>
                <Avatar
                    fallback="P"
                    src="https://placehold.co/400"
                    alt="Project Image"
                    className="size-xl"
                    radius="small"
                />
            </Skeleton>

            {isOpen && (
                <Skeleton>
                    <Text className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {
                            "project.nameproject.nameproject.nameproject.nameproject.name"
                        }
                    </Text>
                </Skeleton>
            )}
        </Flex>
    );
}
