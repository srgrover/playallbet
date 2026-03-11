'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getBetByMatchIdAndUserId = async (matchId: number, userId?: string | null) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        message: "Should be logged in to do this action",
      };
    }

    if (!matchId) {
      return {
        ok: false,
        message: "MatchId is required to compare",
      };
    }

    const bet = await prisma.bet.findUnique({
      where: { matchId: parseInt(matchId.toString()), userId: userId ?? session.user.id }
    });

    if (!bet) {
      return {
        ok: true,
        bet: null,
        message: 'USER_NOT_FOUND'
      };
    }

    return {
      ok: true,
      bet
    }
  } catch (err: any) {
    return {
      ok: false,
      message: err.message
    };
  }
}