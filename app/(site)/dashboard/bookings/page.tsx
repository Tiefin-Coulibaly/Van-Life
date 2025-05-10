import Bookings from "@/components/dashboard/booking/Bookings";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Bookings | Van Life Dashboard",
  description:
    "View and manage all your van rentals, upcoming trips, and booking history in your Van Life account dashboard.",
};

const page = async () => {
  const session = await auth();

  const userData = await fetchUserData(session?.user.id as string);

  return <Bookings bookings={userData?.bookings || []} />;
};

export default page;
