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

    const user = await prisma.bet.findUnique({
      where: { matchId, userId: userId ?? session.user.id }
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