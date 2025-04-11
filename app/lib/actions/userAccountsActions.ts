import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export const getLinkedProviders = async () => {
  try {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
      throw new Error("Unauthorized access: User ID not found.");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const linkedProviders = user.accounts.map((account) => account.provider);
    return linkedProviders;
  } catch (error) {
    console.error("Error fetching linked providers:", error);
    throw error;
  }
};

/**
 * Links an OAuth account to an existing user
 */
export const linkAccount = async (
  provider: string,
  providerAccountId: string,
  userId: string,
) => {
  try {
    const existingAccount = await prisma.account.findFirst({
      where: {
        provider: provider,
        providerAccountId: providerAccountId,
      },
    });

    if (existingAccount) {
      if (existingAccount.userId !== userId) {
        return { success: true, message: "Account already linked" };
      }

      return {
        success: false,
        message: "This account is already linked to another user",
      };
    }

    return { success: true, message: "Account linked successfully" };
  } catch (error) {
    console.error("Error linking account:", error);
    return { success: false, message: "Failed to link account" };
  }
};

/**
 * Process account linking after OAuth authentication
 */
export async function processAccountLinking(providerData: any) {
  const session = await auth();

  if (!session?.user?.email || !providerData) {
    throw new Error("Authentication required");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const result = await linkAccount(
    providerData.provider,
    providerData.providerAccountId,
    user.id,
  );

  if (!result.success) {
    throw new Error(result.message);
  }

  return result;
}

/**
 * Unlink an account from a user
 */
export async function unlinkAccount(provider: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { accounts: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.accounts.length <= 1) {
    return { success: false, message: "Cannot remove your only login method" };
  }

  const account = user.accounts.find(
    (account) => account.provider === provider,
  );

  if (!account) {
    return { success: false, message: "Account not found" };
  }

  await prisma.account.delete({
    where: { id: account.id },
  });

  return {
    success: true,
    message: `${provider} account unlinked successfully`,
  };
}
