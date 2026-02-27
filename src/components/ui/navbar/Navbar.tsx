
import Link from 'next/link';
import { auth, signIn, signOut } from '@/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function UserProfile() {
  const session = await auth();
  const user = session?.user;

//   if (!user) {
//     redirect('/auth/login');
//   }

  return (
    <div className="relative group">
      {/* <Image
        src={user?.image! ?? 'nada'}
        alt={user?.name! ?? 'de nada'}
        width={40}
        height={40}
        className="rounded-full cursor-pointer"
      /> */}
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 hidden group-hover:block">
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Mi Perfil
        </Link>
        {/* <form
          action={async () => {
            'use server';
            await signOut();
          }}>
          <button type="submit" className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Cerrar Sesión
          </button>
        </form> */}
      </div>
    </div>
  );
}

export async function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">PlayAllbet</Link>
        </div>
        <div className="space-x-4 flex items-center">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/events" className="text-gray-300 hover:text-white">
            Eventos
          </Link>
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
