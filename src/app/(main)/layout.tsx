import AudioPlayer from "@/components/footer/AudioPlayer";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Box, Callout, Flex } from "@radix-ui/themes";
import { Info } from "lucide-react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Header />

      <Flex direction="row" gap="2" className="h-full">
        <Sidebar />

        <Box className="bg-zinc-900 w-full p-4 rounded-lg overflow-hidden">
          {children}
        </Box>
      </Flex>

      <footer>
        <AudioPlayer />
      </footer>
    </>
  );
}
