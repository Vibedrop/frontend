import AudioPlayer from "@/components/Footer/AudioPlayer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Box, Flex } from "@radix-ui/themes";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex className="px-md xl:px-lg flex-col h-full">
      <Header />

      <Flex className="flex-col md:flex-row grow md:gap-sm overflow-hidden">
        <Sidebar />

        <Box className="bg-elevated flex flex-col grow p-sm sm:p-lg lg:p-xl rounded-lg overflow-auto">
          {children}
        </Box>
      </Flex>

      <footer>
        <AudioPlayer />
      </footer>
    </Flex>
  );
}
