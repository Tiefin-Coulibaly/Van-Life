// app/api/notifications/read/route.ts
import { NextResponse } from "next/server";
import getServerSession from "next-auth";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const userId = session.user.id;
    const body = await request.json();

    if (body.notificationId) {
      await prisma.notification.update({
        where: {
          id: body.notificationId,
          userId: userId,
        },
        data: { read: true },
      });
    } else {
      await prisma.notification.updateMany({
        where: {
          userId: userId,
          read: false,
        },
        data: { read: true },
      });
    }

    return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to update notifications" }),
      { status: 500 },
    );
  }
}
