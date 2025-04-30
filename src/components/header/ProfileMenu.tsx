import { useAuthStore } from '@/stores/useAuthStore'
import { BACKEND_URL } from '@/utilities/config';
import { Button, ContextMenu, DropdownMenu, IconButton, Tooltip } from '@radix-ui/themes'
import { CircleUser, LogOutIcon, User, UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { use, useEffect } from 'react'

export default function ProfileMenu() {
  const router = useRouter();
  const { setAuth } = useAuthStore((state) => state)

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton className="cursor-pointer rounded-full bg-transparent text-zinc-500 hover:bg-zinc-800 hover:text-white size-10">
          <CircleUser size={20} className="text-zinc-500 hover:text-white" />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => router.push('/Profile')}>
          <UserCog size={16} />
          Profile
        </DropdownMenu.Item>

        <DropdownMenu.Separator />
        <DropdownMenu.Item color="red" onClick={handleLogout}>
          <LogOutIcon size={16} />
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
