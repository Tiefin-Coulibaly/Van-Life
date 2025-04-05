import React from "react";
import Notifications from "@/components/dashboard/notifications/Notifications";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  // get the session
  const session = await auth();

  // protect the route by redirecting the user to the
  // log in page
  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/notifications");
  }
  return <Notifications />;
};

export default page;
