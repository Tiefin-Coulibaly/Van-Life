import Bookings from "@/components/dashboard/booking/Bookings";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {

  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/bookings");
  }

  return <Bookings />;
};

export default page;
