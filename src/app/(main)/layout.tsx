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

      <Flex direction="row" className="grow gap-sm overflow-hidden">
        <Box className="bg-elevated rounded-lg overflow-auto">
          <Sidebar />
        </Box>

        <Box className="bg-elevated flex flex-col grow p-xl rounded-lg overflow-auto">
          {children}
        </Box>
      </Flex>

      <footer>
        <AudioPlayer />
      </footer>
    </Flex>
  );
}
