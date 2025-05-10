import { prisma } from "@/prisma/prisma";

export const clearDatabase = async () => {
  await prisma.van.updateMany({
    data: {
      userId: null,
      available: true,
    },
  });
  // Delete related records first
  await prisma.$transaction([
    prisma.notification.deleteMany(),
    prisma.payment.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.review.deleteMany(),
    prisma.session.deleteMany(),
    prisma.verificationToken.deleteMany(),
    prisma.account.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Database cleared, vans preserved");
};
