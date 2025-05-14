"use client";

import { useState, useEffect } from "react";
import { generateReceiptData } from "@/app/lib/actions/bookingActions";
import { FaCheckCircle, FaDownload, FaExclamationTriangle } from "react-icons/fa";
import Link from "next/link";

export default function PaymentSuccessPage({
  sessionId,
}: {
  sessionId: string;
}) {
  const [receipt, setReceipt] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReceiptData() {
      try {
        const data = await generateReceiptData(sessionId);
        console.log("Receipt data:", data);
        setReceipt(data);
      } catch (err: any) {
        console.error("Failed to generate receipt:", err);
        setError(err.message || "Failed to generate receipt");
      } finally {
        setLoading(false);
      }
    }

    fetchReceiptData();
  }, [sessionId]);

  // Show error state
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-8 shadow-lg">
          <div className="mb-6 flex justify-center">
            <FaExclamationTriangle className="text-4xl sm:text-5xl text-yellow-500" />
          </div>
          <h1 className="mb-4 text-center text-xl sm:text-2xl font-bold">Payment Processing Issue</h1>
          <p className="mb-4 text-center text-sm sm:text-base">{error}</p>
          {debugInfo && (
            <div className="mb-4 rounded-lg bg-gray-100 p-3 text-xs text-gray-600">
              <p>Debug info: {debugInfo}</p>
            </div>
          )}
          <p className="mb-6 text-center text-xs sm:text-sm">
            Your payment may have been processed successfully. Please check your email for confirmation
            or contact our support team.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/dashboard" 
              className="rounded-lg bg-black px-4 sm:px-6 py-2 text-sm sm:text-base text-white hover:bg-gray-800"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-4 sm:p-8 shadow-lg">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          </div>
          <h2 className="text-center text-lg sm:text-xl font-medium">Generating your receipt...</h2>
          <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-600">
            This may take a few moments. Please don't close this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 sm:p-6 md:p-8 shadow-lg">
        <div className="mb-4 sm:mb-6 flex justify-center">
          <FaCheckCircle className="text-4xl sm:text-5xl text-green-500" />
        </div>
        <h1 className="mb-2 sm:mb-4 text-center text-xl sm:text-2xl font-bold">Payment Successful!</h1>
        <p className="text-center text-base sm:text-lg">Your van booking has been confirmed.</p>
        
        <hr className="my-4 sm:my-8 border-t border-gray-200" />
        
        <h2 className="mb-3 sm:mb-6 text-lg sm:text-xl font-semibold">Booking Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Van</p>
            <p className="text-sm sm:text-base font-medium">{receipt?.vanName || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Booking ID</p>
            <p className="text-sm sm:text-base font-medium">{receipt?.bookingId || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Check-in</p>
            <p className="text-sm sm:text-base font-medium">{receipt?.startDate || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Check-out</p>
            <p className="text-sm sm:text-base font-medium">{receipt?.endDate || "N/A"}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Duration</p>
            <p className="text-sm sm:text-base font-medium">{receipt?.daysBooked || 0} days</p>
          </div>
        </div>
        
        <hr className="my-4 sm:my-8 border-t border-gray-200" />
        
        <h2 className="mb-3 sm:mb-6 text-lg sm:text-xl font-semibold">Payment Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between text-sm sm:text-base">
            <p className="text-gray-600">Daily Rate</p>
            <p>${receipt?.dailyRate || 0}/day</p>
          </div>
          <div className="flex justify-between text-sm sm:text-base">
            <p className="text-gray-600">{receipt?.daysBooked || 0} days</p>
            <p>${((receipt?.dailyRate || 0) * (receipt?.daysBooked || 0)).toFixed(2)}</p>
          </div>
          <hr className="my-2 border-t border-gray-200" />
          <div className="flex justify-between font-semibold text-sm sm:text-base">
            <p>Total</p>
            <p>${(receipt?.totalAmount || 0).toFixed(2)}</p>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Link 
            href="/" 
            className="w-full sm:w-auto rounded-lg border border-black px-4 sm:px-6 py-2 text-center text-sm sm:text-base text-black hover:bg-gray-100"
          >
            Return to Home page
          </Link>
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto rounded-lg bg-black px-4 sm:px-6 py-2 text-center text-sm sm:text-base text-white hover:bg-gray-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}