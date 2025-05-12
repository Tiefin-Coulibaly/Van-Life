import { auth } from "@/auth";
import PaymentSuccessPage from "@/components/payment/PaymentSuccess";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Payment Successful | Van Life",
  description:
    "Your van booking has been confirmed. View your booking details and receipt for your Van Life adventure.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async (props: { searchParams: SearchParams }) => {
  const session = await auth();
  if (!session) redirect("/auth/signin?callbackUrl=payment/payment-success");
  const searchParams = await props.searchParams;
  const sessionId = searchParams.session_id;
  return <PaymentSuccessPage sessionId={sessionId as string} />;
};

export default page;
