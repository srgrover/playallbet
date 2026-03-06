// 'use server';

// import { auth } from "@/auth";
// import { Match } from "@/interfaces";
// import prisma from "@/lib/prisma";
// import { updateUserCoins } from "../user/update-user-coins.action";
// import { updateUserPendingCoins } from "../user/update-user-pending-coins.action";
// import { revalidatePath } from "next/cache";

// export const placeBet = async (match: Match) => {
//     const session = await auth();
//     if (!session?.user) {
//         return {
//             ok: false,
//             message: "Should be logged in to save a match",
//         };
//     }

//     try {
//         //TODO: Comprobar si ya tiene una apuesta igual y actualizarla en ese caso. Si no, crear una nueva.
//         const newBet = await prisma.mat.findMany({
//             data: {
//                 ...bet,
//                 userId: user.id!,
//             }
//         });

//         await updateUserPendingCoins(user.pendingCoins + newBet.betCoins)
//         await updateUserCoins(user.coins - newBet.betCoins)

//         revalidatePath('/');
//         revalidatePath('/profile');
//         revalidatePath('/event/[id]');

//         return {
//             ok: true,
//             user: newBet,
//         };
//     } catch (error: any) {
//         return {
//             ok: false,
//             message: `Error creating a bet: ${error.message}`,
//         };
//     }
// };
