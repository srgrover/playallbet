'use server';

import { auth } from "@/auth";
import { getUserById } from "./get-user-by-id.action";
import { updateUserExperience } from "./update-user-esperience.action";

export const addUserExperience = async (xp: number, userId?: string | null) => {
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
        
        const userUpdate = await updateUserExperience(newXp, userId ?? session.user.id!)
        
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
