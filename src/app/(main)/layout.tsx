import { AudioProvider } from "@/context/AudioContext";
import { Box, Flex } from "@radix-ui/themes";
import AuthGuard from "@/components/AuthGuard";
import AudioPlayer from "@/components/Footer/AudioPlayer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <Flex className="px-md xl:px-lg flex-col h-full">
                <Header />

                <AudioProvider>
                    <Flex className="flex-col md:flex-row grow md:gap-sm overflow-hidden">
                        <Sidebar />

                        <Box className="bg-elevated flex flex-col grow p-sm sm:p-lg lg:p-xl rounded-lg overflow-auto">
                            {children}
                        </Box>
                    </Flex>

                    <footer>
                        <AudioPlayer />
                    </footer>
                </AudioProvider>
            </Flex>
        </AuthGuard>
    );
}
