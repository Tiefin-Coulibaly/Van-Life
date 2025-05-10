import React from "react";
import Payments from "@/components/dashboard/payments/Payments";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { fetchUserData } from "@/app/lib/actions/dashboardActions";

const page = async () => {

  const session = await auth();
  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/payments");
  }

   const userData = await fetchUserData(session.user.id as string);
  return <Payments payments={userData?.payments || []}/>;
};

export default page;
