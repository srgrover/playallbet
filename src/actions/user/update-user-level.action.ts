'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const updateUserCoins = async (lvl: number, userId?: string | null) => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: "Should be logged in to do this action",
        };
    }

    if (!lvl) {
        return {
          ok: false,
          message: "There are not coins to update",
        };
      }

    try {
        const newBet = await prisma.user.update({
            data: { level: lvl! },
            where: { id: userId ?? session.user.id! }
        });

        return {
            ok: true,
            user: newBet,
        };
    } catch (error: any) {
        return {
            ok: false,
            message: `Error creating a bet: ${error.message}`,
        };
    }
};
