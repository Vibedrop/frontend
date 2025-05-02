"use client"
import { Avatar, Box, Callout, Flex, Slider, Text } from '@radix-ui/themes'
import { Info, Play, Repeat, RotateCcw, SkipBack, SkipForward, Volume2 } from 'lucide-react'

import { useAuthStore } from "@/stores/useAuthStore";
import React from 'react'

export default function AudioPlayer() {
  const { isAuthenticated } = useAuthStore((state) => state);

  return (
    <>
      {// TODO: replace with CTA to add an audio file
      !isAuthenticated ? (
          <Callout.Root className="justify-center my-2">
            <Callout.Icon>
              <Info />
            </Callout.Icon>
            <Callout.Text>You are not authorized to view the audio player.</Callout.Text>
          </Callout.Root>
        ) : (
          <>
            <Flex className="flex-row w-full items-center gap-2 m-auto p-2 py-3 justify-between">
              <Flex gap="3" className="w-[420px] place-content-start">
                <Avatar
                  size="5"
                  src={`https://images.unsplash.com/photo-1693432480222-802b77347375?&w=64&h=64&dpr=2&q=70&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop`}
                  fallback="T"
                  className="rounded-sm"
                />

                <Box className="flex-col content-center">
                  <Text as="div" size="2" weight="bold">Now Playing: Title</Text>
                  <Text as="div" size="2" color="gray">Description</Text>
                </Box>
              </Flex>

              <Flex direction="column" gap="1" align="center" className="w-[600px] max-w-full">
                <Flex direction="row" gap="5" align={"center"}>
                  <RotateCcw size={16} />

                  <SkipBack fill="currentColor" size={16} />

                  <button
                    className="bg-red-400 text-white rounded-full p-3"
                  >
                    <Play fill="currentColor" size={12} />
                  </button>

                  <SkipForward fill="currentColor" size={16} />

                  <Repeat size={16} />
                </Flex>

                <Flex direction="row" gap="3" align="center" className="w-full">
                  <Text as="div" size="2" color="gray">2:00</Text>

                  <Slider
                    value={[200]}
                    max={300}
                    step={1}
                    size={"1"}
                    aria-label="Audio Progress"
                    className="w-full"
                  />

                  <Text as="div" size="2" color="gray">3:00</Text>
                </Flex>
              </Flex>

              <Flex gap="3" className="w-[420px] items-center px-4 place-content-end
      ">
                <Volume2 fill="currentColor" size={16} />

                <Slider
                  value={[200]}
                  max={300}
                  step={1}
                  size={"1"}
                  aria-label="Volume Control"
                  className="w-full max-w-[220px]"
                />
              </Flex>
            </Flex>

            <audio loop hidden />
          </>
      )}
    </>
  )
}
