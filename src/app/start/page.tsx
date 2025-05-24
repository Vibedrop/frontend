'use client'
import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Flex, Text } from '@radix-ui/themes'
import Header from '@/components/Header'
import Link from 'next/link'
import Image from 'next/image'

import heroImage from '../../../public/assets/images/startpage/vibedrop-hero.png'

export default function StartPage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  return (
    <>
      <Flex className="px-md xl:px-lg flex-col bg-elevated">
        <Header />
      </Flex>

      {/* HERO */}
      <Flex className="flex-col items-center px-lg pb-lg xl:px-lg xl:pb-lg pt-xxl justify-center bg-background">
        <Flex className="w-full flex-col lg:flex-row items-center max-w-screen-xl gap-md lg:gap-xxl text-center lg:text-left ">
          <Flex className="flex-1 flex-col">
            <Text className="text-header-l/[1.4] lg:text-[44px]">From idea to banger.</Text>
            <Text className="text-header-l/[1.1] lg:text-[44px] text-brand-accent">Together.</Text>
            <Text className="text-header-m/[1.6] lg:text-header-l/[1.5] mt-md">Collaborate, comment, and keep your tracks organized</Text>
          </Flex>

          <Flex className="flex-1 -order-last lg:order-none xl:mr-[-8vw] lg:mr-[-80px]">
            <Image
              priority
              src={heroImage}
              alt="Hero"
              placeholder="blur"
              width={712} height={420}
            />
          </Flex>
        </Flex>

        <Button asChild className="mt-lg lg:mt-xxl xl:w-[300px]">
          <Link href="/sign-up">
            Try Vibedrop Free
          </Link>
        </Button>
      </Flex>
    </>
  )
}

