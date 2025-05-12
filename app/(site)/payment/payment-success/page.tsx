"use client";
// import { auth } from "@/auth";
import PaymentSuccessPage from "@/components/payment/PaymentSuccess";
// import { Metadata } from "next";
import { redirect } from "next/navigation";
import { use } from 'react';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Payment Successful | Van Life",
//   description:
//     "Your van booking has been confirmed. View your booking details and receipt for your Van Life adventure.",
// };

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async (props: { searchParams: SearchParams }) => {
  const router = useRouter();
  const { data: session } = useSession()
  console.error("Session data on payment page:", session);
  if (!session) router.replace("/auth/signin?callbackUrl=payment/payment-success");
  const searchParams = use(props.searchParams)
  const sessionId = searchParams.session_id;
  return <PaymentSuccessPage sessionId={sessionId as string} />;
};

export default page;
