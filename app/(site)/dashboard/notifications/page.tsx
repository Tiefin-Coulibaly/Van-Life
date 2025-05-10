import React from "react";
import Notifications from "@/components/dashboard/notifications/Notifications";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";

const page = async () => {
 
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/notifications");
  }

  const userData = await fetchUserData(session?.user?.id);
  return <Notifications notifications={userData?.notifications || []}/>;
};

export default page;
