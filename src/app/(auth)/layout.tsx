import { Flex } from "@radix-ui/themes";
import Link from "next/link";

function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-lg py-lg">
            <Flex className="w-full flex-col mx-auto max-w-sm md:pt-[6vw] sm:pb-4 justify-center gap-xl">
                <Link href="/start" className="m-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/vibedrop-logo.svg"
                        alt="VibeDrop logo"
                        className="h-[76px] sm:h-[100px]"
                    />
                </Link>

                {children}
            </Flex>
        </div>
    );
}

export default AuthLayout;
