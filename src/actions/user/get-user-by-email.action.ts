'use server';

import prisma from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    if (!email) {
      return {
        ok: false,
        message: "Email is required to compare",
      };
    }
  
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return {
        ok: true,
        user: null,
        message: 'USER_NOT_FOUND'
      };
    }
  
    return {
      ok: true,
      user
    }
  } catch (err: any) {

    return {
      ok: false,
      message: err.message
    };

  }
  
}