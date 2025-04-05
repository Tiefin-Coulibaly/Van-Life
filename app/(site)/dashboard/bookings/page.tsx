import Bookings from "@/components/dashboard/booking/Bookings";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import React from "react";

const page = async () => {
  // get the session
  const session = await auth();

  // protect the route by redirecting the user to the
  // log in page
  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/bookings");
  }
  return <Bookings />;
};

export default page;
