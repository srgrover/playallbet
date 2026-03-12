'use server';

import prisma from "@/lib/prisma";

export const getUserById = async (id: string) => {
  try {
    if (!id) {
      return {
        ok: false,
        message: "Id is required to compare",
      };
    }
  
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        bets: {
          include: {
            match: {
              include: {
                homeTeam: true,
                awayTeam: true
              }
            }
          }
        }
      }
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