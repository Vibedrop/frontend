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
    <>
      <Header />

      <Flex direction="row" gap="2" className="grow overflow-hidden">
        <Box className="bg-zinc-900 rounded-lg overflow-auto">
          <Sidebar />
        </Box>

        <Box className="bg-zinc-900 flex flex-col grow p-4 rounded-lg overflow-auto">
          {children}
        </Box>
      </Flex>

      <footer>
        <AudioPlayer />
      </footer>
    </>
  );
}
