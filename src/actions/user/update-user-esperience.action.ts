'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserById } from "./get-user-by-id.action";

export const updateUserCoins = async (xp: number, userId?: string | null) => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: "Should be logged in to do this action",
        };
    }

    if (!xp) {
        return {
          ok: false,
          message: "There are not xp to update",
        };
    }

    try {
        const actualUser = await getUserById(userId ?? session.user.id!);
        if (!actualUser.ok) {
            return {
                ok: false,
                message: actualUser.message,
            };
        }

        const actualXp = actualUser.user?.experience ?? 0;
        const newXp = actualXp + xp;
        const level = Math.floor(newXp / 100);
        
        const userUpdate = await prisma.user.update({
            data: { 
                experience: newXp, 
                level: level,
             },
            where: { id: userId ?? session.user.id! }
        });
        
        return {
            ok: true,
            user: userUpdate,
        };
    } catch (error: any) {
        return {
            ok: false,
            message: `Error creating a bet: ${error.message}`,
        };
    }
};
