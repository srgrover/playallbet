'use server';

import prisma from "@/lib/prisma";
import { User } from "next-auth";

export const getUserByEmail = async (user: User) => {
  if (!user) {
    return {
      ok: false,
      message: "Have not an account to compare",
    };
  }

  const userFound = await prisma.user.findUnique({
    where: { email: user.email ?? ''}
  });

  return {
    ok: true,
    user: userFound
  }
}