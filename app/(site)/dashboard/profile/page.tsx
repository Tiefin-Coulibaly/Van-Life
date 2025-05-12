import { auth } from "@/auth";
import Profile from "@/components/dashboard/profile/Profile";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "My Profile | Van Life Dashboard",
  description:
    "View and manage your personal information, account settings, and preferences for your Van Life account.",
};

const page = async () => {
  const session = await auth();
    if (!session) redirect("/auth/signin?callbackUrl=dashboard/profile");
  return <Profile />;
};

export default page;
