"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateReceiptData } from "@/app/lib/actions/bookingActions";
import {
  FaCheckCircle,
  FaDownload,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";
import { IReceiptData } from "@/types/receiptData";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const { data: session, update, status } = useSession();
  console.log("Session data:", session);
  const router = useRouter();
  if (!session) {
    router.refresh();
  }
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [receipt, setReceipt] = useState<IReceiptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionId) {
      async function fetchReceipt() {
        try {
          const receiptData = await generateReceiptData(sessionId!);
          setReceipt(receiptData);
          await update();
        } catch (err) {
          console.error("Failed to generate receipt:", err);
          setError("Failed to generate your receipt. Please contact support.");
        } finally {
          setLoading(false);
        }
      }

      fetchReceipt();
    } else {
      setError("No payment information found.");
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-gray-700" />
        <p className="mt-4 text-lg">Generating your receipt...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <FaExclamationTriangle className="mx-auto text-4xl text-red-500" />
          <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded bg-black px-6 py-2 text-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <FaCheckCircle className="mx-auto text-5xl text-green-500" />
          <h1 className="mt-4 text-3xl font-bold">Payment Successful!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Your van booking has been confirmed.
          </p>
        </div>

        {receipt && (
          <>
            <div className="mb-6 border-b border-t border-dashed border-gray-300 py-4">
              <h2 className="mb-4 text-xl font-semibold">Booking Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Van</p>
                  <p className="text-lg">{receipt.vanName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Booking ID
                  </p>
                  <p className="text-lg">{receipt.bookingId}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Check-in</p>
                  <p className="text-lg">
                    {new Date(receipt.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Check-out</p>
                  <p className="text-lg">
                    {new Date(receipt.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-lg">{receipt.daysBooked} days</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Payment Summary</h2>
              <div className="mb-4 flex justify-between">
                <p className="text-gray-600">Daily Rate</p>
                <p>${receipt.dailyRate}/day</p>
              </div>
              <div className="mb-4 flex justify-between">
                <p className="text-gray-600">{receipt.daysBooked} days</p>
                <p>
                  $
                  {parseInt(String(receipt.dailyRate)) *
                    parseInt(String(receipt.daysBooked))}
                </p>
              </div>
              <div className="mb-2 border-t border-gray-200 pt-2"></div>
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>${receipt.totalAmount}</p>
              </div>
            </div>

            {receipt.stripeReceiptUrl && (
              <div className="mt-8 flex justify-center">
                <a
                  href={receipt.stripeReceiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
                >
                  <FaDownload />
                  Download Official Receipt
                </a>
              </div>
            )}
          </>
        )}

        <div className="mt-8 flex items-center  justify-between text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home page
          </Link>
          <Link href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`}>
            <span className="ml-4 text-blue-600 hover:underline">
              Go to Dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
