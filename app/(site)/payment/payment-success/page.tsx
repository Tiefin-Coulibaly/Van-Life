import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamically import the client component with no SSR
const PaymentSuccessPage = dynamic(
  () => import("@/components/payment/PaymentSuccess"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Payment Successful | Van Life",
  description: "Your van booking has been confirmed. View your booking details and receipt for your Van Life adventure.",
};

export default async function Page({ searchParams }) {
  try {
    const sessionId = searchParams.session_id;
    
    if (!sessionId) {
      // No session ID provided
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <h1 className="mb-4 text-2xl font-bold">Missing Session Information</h1>
            <p>We couldn't process your payment confirmation because the session ID is missing.</p>
            <a href="/" className="mt-6 block rounded-lg bg-black px-5 py-3 text-center text-white">
              Return Home
            </a>
          </div>
        </div>
      );
    }
    
    // Use the dynamically imported component with no SSR
    return <PaymentSuccessPage sessionId={sessionId} />;
  } catch (error) {
    console.error("Error in payment success page:", error);
    
    // Show user-friendly error message
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-4 text-2xl font-bold">Payment Processing Error</h1>
          <p>We encountered an error while processing your payment confirmation.</p>
          <p className="mt-4 text-sm text-gray-600">Error details: {error.message || "Unknown error"}</p>
          <a href="/" className="mt-6 block rounded-lg bg-black px-5 py-3 text-center text-white">
            Return Home
          </a>
        </div>
      </div>
    );
  }
}