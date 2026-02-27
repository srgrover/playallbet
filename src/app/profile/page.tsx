
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/');
  }

  const user = session.user;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6">Mi Perfil</h1>
        <div className="flex flex-col items-center">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name || 'Foto de perfil'}
              width={128}
              height={128}
              className="rounded-full mb-4"
            />
          )}
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500 mt-2">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
