'use client'

import Link from 'next/link';
import { Session, User } from 'next-auth';
import { logout } from '@/actions/auth/logout.action';
import { useTransition } from 'react';

interface Props {
  session: Session | null
}

export function Navbar({ session }: Props) {
  const [isPending, startTransition] = useTransition();
  const user: User | null = session?.user ?? null;

  const handleSignOut = () => {
    startTransition(async () => {
      await logout();
    });
  };

  return (
    <nav className="bg-white shadow-xs p-4">
      <>
      {
          user
          ?
          <div className="flex justify-between items-center p-4">
            <div></div>
            <div className="flex items-center gap-3">
              <Link href="/profile" className="text-gray-700 font-raleway-black hover:text-[rgb(33, 164, 216)]">
                Mi Perfil
              </Link>
              <button onClick={handleSignOut} disabled={isPending} className="text-gray-700 font-raleway-black hover:text-[rgb(33, 164, 216)]">
                {isPending ? 'Saliendo...' : 'Salir'}
              </button>
            </div>
          </div>

        :
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-lg font-bold">
            <Link href="/">PlayAllbet</Link>
          </div>
          <div className="space-x-4 font-raleway-black flex items-center">
            <Link href="/auth/login" className="text-gray-800 hover:text-[#1e93c2]">
              Login
            </Link>
          </div>
        </div>
      }
      </>
    </nav>
  );
}