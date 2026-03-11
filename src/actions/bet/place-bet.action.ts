'use server';

import { auth } from "@/auth";
import { Bet } from "@/interfaces";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "../user/get-user-by-email.action";
import { updateUserCoins } from "../user/update-user-coins.action";
import { updateUserPendingCoins } from "../user/update-user-pending-coins.action";
import { revalidatePath } from "next/cache";

export const placeBet = async (bet: Bet) => {
    const session = await auth();
    console.log({session})


    if (!session?.user) {
        return {
            ok: false,
            message: "Should be logged in to create a bet",
        };
    }

    const {ok, message, user} = await getUserByEmail(session.user.email!)
    if(!ok || !user){
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
        //TODO: Comprobar si ya tiene una apuesta igual y actualizarla en ese caso. Si no, crear una nueva.
        const newBet = await prisma.bet.create({
            data: {
                ...bet,
                userId: user.id!,
            }
        });

        console.log({newBet});

        await updateUserPendingCoins(user.pendingCoins + newBet.betCoins)
        await updateUserCoins(user.coins - newBet.betCoins)

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
