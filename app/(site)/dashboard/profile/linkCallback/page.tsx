import LinkCallback from "@/components/dashboard/profile/LinkCallback";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account Connection | Van Life Dashboard",
  description: "Complete your account linking process to connect your social accounts with your Van Life profile."
};

const LinkCallbackPage = () => {
  return <LinkCallback />;
};

export default LinkCallbackPage;
