import Signup from "@/components/Auth/signup/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Van Life",
  description:
    "Create your Van Life account to rent vans, plan your road trips, and unlock amazing travel experiences across the country.",
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
