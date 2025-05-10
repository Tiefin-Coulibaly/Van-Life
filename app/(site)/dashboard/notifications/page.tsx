import React from "react";
import Notifications from "@/components/dashboard/notifications/Notifications";
import { auth } from "@/auth";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Van Life Dashboard",
  description: "Stay updated with your latest booking confirmations, messages, and important updates about your Van Life rentals and account."
};

const page = async () => {
  const session = await auth();

  const userData = await fetchUserData(session?.user?.id);
  return <Notifications notifications={userData?.notifications || []} />;
};

export default page;
