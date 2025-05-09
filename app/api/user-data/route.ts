
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";

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

    const userData = await fetchUserData(userId as string);

    return NextResponse.json( userData );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch userData" },
      { status: 500 },
    );
  }
}
