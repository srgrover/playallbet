
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'next-auth';
import { getUserByEmail } from '@/actions';

interface Props {
  user: User
}

export async function ProfileMenu({ user }: Props) {
  const userDataResponse = await getUserByEmail(user.email ?? '');

  if (!userDataResponse.ok || !userDataResponse.user) {
    return (
      <div className="text-white p-4">
        Error al cargar los datos del usuario.
      </div>
    );
  }

  const dbUser = userDataResponse.user;

  return (
    <div className="min-h-full w-full bg-[#093b54] text-white p-4 flex flex-col items-center gap-4">
      <div className="text-white text-lg font-bold">
        <Link href="/">PlayAllbet</Link>
      </div>
      <div className='flex items-center flex-col'>
        <div className="rounded-full overflow-hidden border-2 border-sky-400">
          <Image
            alt="Imagen de perfil"
            src={dbUser.image ?? '/default-avatar.png'}
            width={120}
            height={120}
          />
        </div>
        <span className='rounded-full text-xs w-6 h-6 flex font-raleway-bold justify-center items-center bg-amber-400' style={{ marginTop: '-10px' }}>
          {dbUser.level}
        </span>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-300 font-raleway-black">{dbUser.email}</p>
      </div>

      <div className="text-center flex gap-2 font-raleway-bold items-center text-xl">
        <p className="text-green-400 ">{dbUser.coins.toLocaleString('es-ES', { minimumFractionDigits: 0 })}</p>
        <p className="text-[#1e93c2] font-raleway-semibold">Coins</p>
      </div>
    </div>
  );
}
