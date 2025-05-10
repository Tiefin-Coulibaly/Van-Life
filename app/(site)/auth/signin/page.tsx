import Signin from "@/components/Auth/signin/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Van Life",
  description:
    "Sign in to your Van Life account to manage your bookings, explore van rentals, and continue your adventure on the road.",
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
