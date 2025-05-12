import { auth } from "@/auth";
import LinkCallback from "@/components/dashboard/profile/LinkCallback";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Account Connection | Van Life Dashboard",
  description:
    "Complete your account linking process to connect your social accounts with your Van Life profile.",
};

const LinkCallbackPage = async () => {
  const session = await auth();
  if (!session) redirect("/auth/signin?callbackUrl=dashboard/profile/linkCallback");
  return <LinkCallback />;
};

export default LinkCallbackPage;
