"use server";

import { saltAndHashPassword } from "./authActions";
import { prisma } from "@/prisma/prisma";

export const resetUserPassword = async (email: string, newPassword: string) => {
  // hash the password
  const hashedPassword = await saltAndHashPassword(newPassword);

  // updated the user's password in the db
  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await prisma.$disconnect();
  } catch (error) {
    console.log(`Error while resetting password: ${error}`);
    return;
  }
};
