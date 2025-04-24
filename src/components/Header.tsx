"use client"
import { BACKEND_URL } from "@/utilities/config"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { Box, Text } from '@radix-ui/themes'
import { LucideAudioWaveform } from 'lucide-react'
import { LoginButton } from './buttons/LoginButton'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, setAuth, checkAuth } = useAuthStore((state) => state)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include",
      });
      setAuth(false, null);
      router.push("/SignIn");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="flex justify-between items-center py-2">
      <Link
        href="/"
        className="logo px-4">
        <LucideAudioWaveform size={40} />
      </Link>

      <Box className="flex items-center gap-4 text-sm font-bold">
        {isAuthenticated && (
          <Text as="div" onClick={handleLogout} className="text-zinc-500 hover:text-white cursor-pointer">
            Sign out
          </Text>
        )}

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
