"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

import VideoPlayer from "./VideoPlayer";
import heroImage from "@/assets/images/startpage/vibedrop-hero.webp";
import shareAudioImage from "@/assets/images/startpage/share-audio.webp";
import getFeedbackImage from "@/assets/images/startpage/get-feedback.webp";
import stayOrganinzedImage from "@/assets/images/startpage/stay-organized.webp";
import keepControlImage from "@/assets/images/startpage/keep-control.webp";

export default function StartPage() {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push("/");
        }
    }, [isAuthenticated, router]);

    return (
        <>
            <Flex className="px-md xl:px-lg flex-col bg-elevated">
                <Header />
            </Flex>

            {/* HERO */}
            <Flex className="flex-col items-center px-lg pb-md xl:px-lg sm:pb-lg 2xl:pb-xxl pt-xxl justify-center bg-background gap-lg lg:gap-xxl">
                <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-xl gap-md lg:gap-xxl text-center lg:text-left 2xl:mt-xxl">
                    <Flex className="flex-1 flex-col md:px-lg">
                        <Text className="text-header-l/[1.4] lg:text-[44px]">
                            From idea to banger.
                        </Text>
                        <Text className="text-header-l/[1.1] lg:text-[44px] text-brand-accent">
                            Together.
                        </Text>
                        <Text className="text-header-m/[1.6] lg:text-header-l/[1.5] mt-md">
                            Collaborate, comment, and keep your tracks organized
                        </Text>
                    </Flex>

                    <Flex className="flex-1 -order-last lg:order-none xxl:mr-[-8vw] xl:mr-[-80px] max-w-[620px] lg:max-w-none">
                        <Image
                            priority
                            src={heroImage}
                            alt="Hero"
                            placeholder="blur"
                            width={712}
                            height={420}
                        />
                    </Flex>
                </Flex>

                <Button asChild className="xl:w-[300px]">
                    <Link href="/sign-up">Try Vibedrop Free</Link>
                </Button>

                <Flex className="w-full max-w-[1000px] my-lg mb-xl">
                    <VideoPlayer
                        videoUrl="/assets/videos/vibedrop-promo-720p.mp4"
                        thumbnailUrl="/assets/videos/vibedrop-promo-thumb.webp"
                        alt="Viebedrop promo video"
                    />
                </Flex>
            </Flex>

            {/* Main Features */}
            <Flex
                className="flex-col items-center p-xxl pt-xl sm:pt-xxl justify-center bg-background gap-lg lg:gap-xxl"
                style={{
                    backgroundImage:
                        "linear-gradient(180deg, rgba(87, 83, 198, 0.672) 0%, rgba(184, 186, 248, 0.672) 100%)",
                }}
            >
                <Flex className="w-full 2xl:pt-xl">
                    <Text className="w-full text-[26px] md:text-header-l text-center md:mb-md lg:mb-0">
                        A smarter way to collaborate on music
                    </Text>
                </Flex>

                <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-lg gap-md lg:gap-xxl text-center lg:text-left pb-sm 2xl:pb-xl">
                    <Flex className="flex-1 flex-col items-center">
                        <Flex className="flex-col max-w-[290px] gap-md 2xl:ml-xl">
                            <Text className="text-body-l">Share audio</Text>
                            <Text className="text-body-s">
                                Upload your track, keep multiple versions and
                                invite collaborators.
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex className="rounded-lg shadow-xl overflow-hidden -order-last lg:order-none">
                        <Image
                            loading="lazy"
                            src={shareAudioImage}
                            alt="Share audio"
                            placeholder="blur"
                            width={436}
                            height={309}
                        />
                    </Flex>
                </Flex>

                <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-lg gap-md lg:gap-xxl text-center lg:text-left pb-sm 2xl:pb-xl">
                    <Flex className="rounded-lg shadow-xl overflow-hidden">
                        <Image
                            loading="lazy"
                            src={getFeedbackImage}
                            alt="Get feedback"
                            placeholder="blur"
                            width={436}
                            height={309}
                        />
                    </Flex>

                    <Flex className="flex-1 flex-col items-center">
                        <Flex className="flex-col max-w-[290px] gap-md 2xl:mr-xl">
                            <Text className="text-body-l">Get feedback</Text>
                            <Text className="text-body-s">
                                Time-stamped, version-specific comments.
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>

                <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-lg gap-md lg:gap-xxl text-center lg:text-left pb-sm 2xl:pb-xl">
                    <Flex className="flex-1 flex-col items-center">
                        <Flex className="flex-col max-w-[290px] gap-md 2xl:ml-xl">
                            <Text className="text-body-l">Stay organized</Text>
                            <Text className="text-body-s">
                                Keep track of version in all your projects, all
                                in one place.
                            </Text>
                        </Flex>
                    </Flex>

                    <Flex className="rounded-lg shadow-xl overflow-hidden -order-last lg:order-none">
                        <Image
                            loading="lazy"
                            src={stayOrganinzedImage}
                            alt="Stay organized"
                            placeholder="blur"
                            width={436}
                            height={309}
                        />
                    </Flex>
                </Flex>

                <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-lg gap-md lg:gap-xxl text-center lg:text-left pb-sm 2xl:pb-xl">
                    <Flex className="rounded-lg shadow-xl overflow-hidden">
                        <Image
                            loading="lazy"
                            src={keepControlImage}
                            alt="Keep control of your sound"
                            placeholder="blur"
                            width={436}
                            height={309}
                        />
                    </Flex>

                    <Flex className="flex-1 flex-col items-center">
                        <Flex className="flex-col max-w-[290px] gap-md 2xl:mr-xl">
                            <Text className="text-body-l">
                                Keep control of your sound
                            </Text>
                            <Text className="text-body-s">
                                Only invited collaborators has access. No leaks.
                                No surprises. Just safe, focused creation.
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            {/* Footer */}
            <footer>
                <Flex className="flex-col md:flex-row p-xl md:p-xxl pt-xl pb-xxl sm:pt-xxl justify-center bg-background gap-md max-w-[1140px] mx-auto">
                    <Flex className="flex-1 flex-col gap-sm">
                        <Flex className="w-full flex-row gap-md justify-end mb-md">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src='/vibedrop-logo.svg' alt="Logo" className="w-[50px]" />

                            <Text className="w-full text-[22px] mt-sm font-medium">
                                Team Vibedrop
                            </Text>
                        </Flex>

                        <Flex className="flex-col">
                            <Box>
                                <Text className="text-body-s text-brand-accent font-medium">UX/UI:</Text>
                            </Box>

                            <Box>
                                <Text className="text-body-xs">Emma Druzic, Priscilla Carlsson</Text>
                            </Box>
                        </Flex>

                        <Flex className="flex-col mt-dm">
                            <Box>
                                <Text className="text-body-s text-brand-accent font-medium">Fullstack:</Text>
                            </Box>

                            <Box className="max-w-[420px]">
                                <Text className="text-body-xs">Cristian Pencheff, Elin Suvinen, Fares Elloumi, Kristoffer Benckert, Kristoffer Larsson, Sixten Ekblad, Stella Jakstrand</Text>
                            </Box>
                        </Flex>

                        <Flex className="flex-col mt-dm">
                            <Box>
                        <Text className="text-body-s text-brand-accent font-medium">DevOps:</Text>
                            </Box>

                            <Box>
                                <Text className="text-body-xs">David Jonsson</Text>
                            </Box>
                        </Flex>
                    </Flex>

                    <Flex>
                        <Text className="text-body-xs text-muted-foreground mt-md">
                            © 2025 Vibedrop. All rights reserved.
                        </Text>
                    </Flex>
                </Flex>
            </footer>
        </>
    )
}

