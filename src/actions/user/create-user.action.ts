'use server';

import prisma from "@/lib/prisma";

interface CreateUserParams {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export const createUser = async (userData: CreateUserParams) => {
  if (!userData.email) {
    return {
      ok: false,
      message: "El correo electrónico es obligatorio para crear un usuario.",
    };
  }

  try {
    const userCreated = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name ?? '',
        image: userData.image ?? '',
      },
    });

    return {
      ok: true,
      user: userCreated,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: `Error al crear el usuario: ${error.message}`,
    };
  }
};
