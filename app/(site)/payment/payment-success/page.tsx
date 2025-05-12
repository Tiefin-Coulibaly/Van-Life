"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import PaymentSuccessPage from "@/components/payment/PaymentSuccess";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin?callbackUrl=/payment/payment-success");
    }
  });

  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Get session ID from URL only on client-side
    const sessionIdParam = searchParams.get("session_id");
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
    }
  }, [searchParams]);

  // Show loading state while checking authentication
  if (status === "loading" || !sessionId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
      </div>
    );
  }

  // Once we have sessionId and authentication, render the payment success component
  return <PaymentSuccessPage sessionId={sessionId} />;
}