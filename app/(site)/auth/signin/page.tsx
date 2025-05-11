import Signin from "@/components/Auth/signin/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Van Life",
  description:
    "Sign in to your Van Life account to manage your bookings, explore van rentals, and continue your adventure on the road.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
const SigninPage = async(props:{searchParams:SearchParams}) => {
  const searchParams = await props.searchParams;
  const errorType = searchParams.error;
  const callbackUrl = searchParams.callbackUrl;
  return (
    <>
      <Signin callbackUrl={callbackUrl} errorType={errorType}/>
    </>
  );
};

export default SigninPage;
