import { Box, Text } from '@radix-ui/themes'
import { LucideAudioWaveform } from 'lucide-react'
import { LoginButton } from './buttons/LoginButton'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="flex justify-between items-center py-2">
      <Link
        href="/"
        className="logo px-4">
        <LucideAudioWaveform size={40} />
      </Link>

      <Box className="flex items-center gap-4 text-sm font-bold">
        <Link href="/SignUp">
          <Text as="div" className="text-zinc-500 hover:text-white">
            Sign up
          </Text>
        </Link>

        <LoginButton>
          <Link href="/SignIn">
            Log in
          </Link>
        </LoginButton>
      </Box>
    </header>
  )
}
