import Bookings from "@/components/dashboard/booking/Bookings";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";

const page = async () => {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/bookings");
  }

  const userData = await fetchUserData(session.user.id as string);

  return <Bookings bookings={userData?.bookings || []} />;
};

export default page;
