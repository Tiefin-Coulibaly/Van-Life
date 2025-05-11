import React from "react";
import Payments from "@/components/dashboard/payments/Payments";
import { auth } from "@/auth";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment History | Van Life Dashboard",
  description: "View your payment history, receipts, and transaction details for all your Van Life rentals and bookings."
};

const page = async () => {

  const session = await auth();

  const userData = await fetchUserData(session?.user.id as string);
  return <Payments payments={userData?.payments || []}/>;
};

export default page;
