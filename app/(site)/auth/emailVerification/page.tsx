import EmailVerification from "@/components/Auth/passwordReset/EmailVerification";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Your Email | Van Life",
  description:
    "Please verify your email address to complete your account setup or password reset process with Van Life.",
};

const EmailVerificationPage = () => {
  return <EmailVerification />;
};

export default EmailVerificationPage;
