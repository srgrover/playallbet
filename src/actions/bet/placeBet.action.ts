'use server';

import { auth } from "@/auth";
import { Bet } from "@/interfaces";
import prisma from "@/lib/prisma";

export const placeBet = async (bet: Bet) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: "Should be logged in to create a bet",
        };
    }

    try {
        //TODO: Comprobar si ya tiene una apuesta igual y actualizarla en ese caso. Si no, crear una nueva.
        const newBet = await prisma.bet.create({
            data: {
                ...bet,
                userId: session.user.id,
            }
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
