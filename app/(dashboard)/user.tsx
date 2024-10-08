"use client"
import { Button } from '@/components/ui/button';
import { auth, signOut } from '@/lib/auth';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { apiSecure } from '@/lib/utils'
import { AppStorage } from '@/lib/app.storage';

export async function User() {
  // let session = await auth();
  // let user = session?.user;


  async function signOut() {
    try {
      AppStorage.clearKey('bearearToken');
      AppStorage.clearKey('UserData');
      // const response = await apiSecure.post('/user/logout');
    } catch (err) {
    } finally {
      window.location.href = '/login'
    }
  }


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <button onClick={signOut}>Sign Out</button>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
