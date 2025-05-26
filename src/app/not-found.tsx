import Header from "@/components/Header";
import { Button, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function NotFound() {
    return (
        <>
            <Flex className="px-md xl:px-lg flex-col">
                <Header />
            </Flex>

            <Flex className="flex-col items-center px-lg pb-md xl:px-lg sm:pb-lg 2xl:pb-xxl pt-xxl justify-center bg-background gap-lg lg:gap-xxl">
                <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-xl gap-md lg:gap-xxl text-center lg:text-left 2xl:mt-xxl">
                    <Flex className="flex-1 flex-col md:px-lg items-center lg:items-start">
                        <Text className="text-header-l/[1.4] lg:text-[44px] text-brand-accent">
                            404 - Page not found.
                        </Text>
                        <Text className="text-header-l/[1.1] lg:text-[44px]">
                            This page doesn’t exist..
                        </Text>

                        <Button
                            asChild
                            className="w-full lg:max-w-[300px] mt-lg"
                        >
                            <Link href="/">Go back</Link>
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}
