"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname } from "next/navigation";
import { Box, Button, Flex, Separator, Text } from "@radix-ui/themes";
import { CircleUserRound } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import React from "react";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
    const { isAuthenticated } = useAuthStore();
    const pathname = usePathname();
    const isStart = pathname === "/start";
    const isDashboard = pathname === "/";
    const logoHref = isAuthenticated ? "/" : "/start";

    const dashboardClass = clsx(
        "w-4/5 h-[2px] mt-xxs mx-auto",
        isDashboard ? "bg-brand-accent" : "bg-transparent",
    );

    return (
        <header className="flex justify-between items-center my-md lg:my-lg">
            <Link
                href={logoHref}
                className="flex items-center gap-md lg:gap-xl logo hover:opacity-80 transition-all duration-200"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/vibedrop-logo.svg"
                    alt="Logo"
                    className="w-[50px] xl:ml-xs lg:w-[75px] h-[auto]"
                />

                {isAuthenticated && (
                    <Box className="mt-sm">
                        <Text className="text-label-l mt-2 text-bold">
                            Dashboard
                        </Text>
                        <Separator
                            decorative
                            orientation="horizontal"
                            className={dashboardClass}
                        />
                    </Box>
                )}
            </Link>

            {isAuthenticated && (
                <Box>
                    <ProfileMenu
                        triggerIcon={
                            <CircleUserRound className="icon-sm lg:icon-md" />
                        }
                    />
                </Box>
            )}

            {isStart && !isAuthenticated && (
                <Flex className="gap-sm items-center">
                    <Button
                        asChild
                        variant="outline"
                        className="lg:w-[100px] max-h-[36px] lg:max-h-none"
                    >
                        <Link href="/sign-in">
                            <Text className="text-header-s">Sign in</Text>
                        </Link>
                    </Button>

                    <Button
                        asChild
                        className="lg:w-[100px] max-h-[36px] lg:max-h-none"
                    >
                        <Link href="/sign-up">
                            <Text className="text-header-s">Sign up</Text>
                        </Link>
                    </Button>
                </Flex>
            )}
        </header>
    );
}
