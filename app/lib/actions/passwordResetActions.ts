"use server";
import { saltAndHashPassword } from "./authActions";
import { prisma } from "@/prisma/prisma";


export const resetUserPassword = async (email: string, newPassword: string) => {
  // Generate secure hash of the new password
  const hashedPassword = await saltAndHashPassword(newPassword);

  // Update user record with new password hash
  try {
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Close database connection after operation completes
    await prisma.$disconnect();
  } catch (error) {
    // Log error for debugging but preserve user privacy
    console.log(`Error while resetting password: ${error}`);
    return;
  }
};
