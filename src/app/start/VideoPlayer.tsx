import { Box } from '@radix-ui/themes';
import { Play } from 'lucide-react';
import { useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string
  thumbnailUrl: string
  alt?: string
}

export default function VideoPlayer({ videoUrl, thumbnailUrl, alt }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="relative w-full aspect-video mx-auto bg-black shadow-xl rounded-md overflow-hidden">
      <ReactPlayer
        url={videoUrl}
        playing={isPlaying}
        onReady={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
        controls
        width="100%"
        height="100%"
        light={thumbnailUrl}
        playIcon={
          <Box className="bg-black bg-opacity-80 rounded-full p-md">
            <Play fill="currentColor" className="icon-lg translate-x-0.5" />
          </Box>}
      />
    </div>
  );
}
