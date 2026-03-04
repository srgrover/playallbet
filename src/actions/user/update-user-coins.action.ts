'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "../user/get-user-by-email.action";
import { getUserById } from "./get-user-by-id.action";

export const updateUserCoins = async (coins: number, userId?: string) => {
    let dbUserId: string = userId ?? '';
    
    try {
        if(!userId){
            const session = await auth();     
            if (!session?.user) {
                return {
                    ok: false,
                    message: "Should be logged in to do this action",
                };
            }
            const {ok, message, user} = await getUserByEmail(session.user.email!)
            if(!ok || !user){
                return {
                    ok: false,
                    message: message ?? 'Error creating bet. About your user.',
                }
            }
            dbUserId = user?.id!;
        }
    
        const {ok, message, user} = await getUserById(dbUserId);
        if(!ok || !user){
            return {
                ok: false,
                message: message ?? 'Error creating bet. About your user.',
            }
        }
        //TODO: Comprobar si ya tiene una apuesta igual y actualizarla en ese caso. Si no, crear una nueva.
        const newBet = await prisma.user.update({
            data: {
                coins: coins!,
            },
            where: {
                id: dbUserId!,
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
