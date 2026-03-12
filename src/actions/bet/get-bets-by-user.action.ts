'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getBetsByUserId = async (limit?: number | null, userId?: string | null) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        message: "Should be logged in to do this action",
      };
    }

  
    const bets = await prisma.bet.findMany({
      where: {
        userId: userId ?? session.user.id,
      },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: limit ?? 10
    });
    

    if (!bets) {
      return {
        ok: true,
        bet: null,
        message: 'BETS_NOT_FOUND'
      };
    }

    return {
      ok: true,
      bets
    }
  } catch (err: any) {
    return {
      ok: false,
      message: err.message
    };
  }
}