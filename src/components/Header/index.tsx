"use client"
import { usePathname } from 'next/navigation'
import { Box, Separator, Text } from '@radix-ui/themes'
import { CircleUserRound } from 'lucide-react'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'
import ProfileMenu from "./ProfileMenu"

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const dashboardClass = clsx(
    'w-4/5 h-[2px] mt-xxs mx-auto',
    isHome ? 'bg-brand-accent' : 'bg-transparent',
  )

  return (
    <header className="flex justify-between items-center my-md lg:my-lg">
      <Link href="/" className="flex items-center gap-md lg:gap-xl logo hover:opacity-80 transition-all duration-200">
        <img src='/vibedrop-logo.svg' alt="Logo" className="w-[50px] xl:ml-xs lg:w-[75px] h-[auto]" />

        <Box className='mt-sm'>
          <Text className="text-label-l mt-2 text-bold">Dashboard</Text>
          <Separator decorative orientation="horizontal" className={dashboardClass} />
        </Box>
      </Link>

      <Box>
        <ProfileMenu triggerIcon={ <CircleUserRound className="icon-sm lg:icon-md" />}/>
      </Box>
    </header>
  )
}
