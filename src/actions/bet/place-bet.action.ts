'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { updateUserCoins } from "../user/update-user-coins.action";
import { updateUserPendingCoins } from "../user/update-user-pending-coins.action";
import { revalidatePath } from "next/cache";
import { addUserExperience } from "../user/add-user-esperience.action";
import { getUserById } from "../user/get-user-by-id.action";

export const placeBet = async (bet: any) => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: "Should be logged in to create a bet",
        };
    }

    const { ok, message, user } = await getUserById(session.user.id!)
    if (!ok || !user) {
        return {
            ok: false,
            message: message ?? 'Error creating bet. About your user.',
        }
    }

    if (user.coins < bet.betCoins) {
        return {
            ok: false,
            message: `You don't have enough coins to place this bet. You only have ${user.coins} coins.`,
        };
    }

    try {
        const data: any = {
            prediction: bet.prediction,
            betCoins: bet.betCoins,
            betProfits: bet.betProfits,
            matchId: bet.matchId,
            statusId: bet.statusId,
            userId: user.id!,
        }

        const newBet = await prisma.bet.create({
            data
        });

        await updateUserPendingCoins(user.pendingCoins + newBet.betCoins);
        await updateUserCoins(user.coins - newBet.betCoins);
        await addUserExperience(100, session.user.id);

        revalidatePath('/');
        revalidatePath('/profile');
        revalidatePath('/eventsc');
        revalidatePath('/eventsc/[id]');

        return {
            ok: true,
            newBet,
        };
    } catch (error: any) {
        return {
            ok: false,
            message: `Error creating a bet: ${error.message}`,
        };
    }
};
