import PaymentSuccessPage from "@/components/payment/PaymentSuccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful | Van Life",
  description:
    "Your van booking has been confirmed. View your booking details and receipt for your Van Life adventure.",
};

const page = () => {
  return <PaymentSuccessPage />;
};

export default page;
