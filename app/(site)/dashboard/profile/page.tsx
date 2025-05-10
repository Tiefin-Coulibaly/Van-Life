import Profile from "@/components/dashboard/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | Van Life Dashboard",
  description:
    "View and manage your personal information, account settings, and preferences for your Van Life account.",
};

const page = async () => {
  return <Profile />;
};

export default page;
