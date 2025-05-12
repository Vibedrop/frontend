"use client"
import { useRouter } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import ProfileMenu from "./ProfileMenu"

export default function Header() {
  const router = useRouter();

  return (
    <header className="flex justify-between items-center py-md">
      <Link href="/" className="flex items-center gap-xl logo">
          <img src='/vibedrop-logo.svg' alt="Logo" className="h-[53px] w-[74px]" />
          <Text className="text-header-s text-bold underline">Dashboard</Text>
      </Link>

      <Box className="flex items-center gap-4 text-sm font-bold">
        <ProfileMenu />
      </Box>
    </header>
  )
}
