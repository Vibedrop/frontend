"use client"
import { LoginButton } from '@/components/buttons/LoginButton';
import { useAuthStore } from '@/stores/useAuthStore'
import { Button, TextField, Theme } from '@radix-ui/themes';
import React, { useState } from 'react'

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const [username, setUsername] = useState<string>(user?.username || "");

  return (
    <>
      <div>Hello {user?.username}</div>

      <Theme accentColor="gray" className="w-full">
        <TextField.Root
          className="rounded-lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <LoginButton>
          Save
        </LoginButton>
      </Theme>
    </>
  )
}
