'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getBetByMatchsIdListAndUserId = async (matchIdList: number[], userId?: string | null) => {
  try {
    const session = await auth();
    if (!session?.user) {
      return {
        ok: false,
        message: "Should be logged in to do this action",
      };
    }

    if (!matchIdList || matchIdList.length === 0) {
      return {
        ok: false,
        message: "MatchId list is required to compare",
      };
    }

    const bets = await prisma.bet.findMany({
      where: {
        matchId: {
          in: matchIdList,
        },
        userId: userId ?? session.user.id,
      },
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