// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth";
import { fetchBookings } from "@/app/lib/actions/dashboardActions";

export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const bookings = await fetchBookings(userId as string);

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
