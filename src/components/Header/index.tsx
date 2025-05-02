"use client"
import { useRouter } from 'next/navigation'
import { Box } from '@radix-ui/themes'
import { LucideAudioWaveform } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import ProfileMenu from "./ProfileMenu"

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center py-2">
      <Link
        href="/"
        className="logo px-4">
        <LucideAudioWaveform size={40} />
      </Link>

      <Box className="flex items-center gap-4 text-sm font-bold">
        <ProfileMenu />
      </Box>
    </header>
  )
}
