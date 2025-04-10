"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { processAccountLinkingForClient } from "@/app/lib/actions/accountLinkingActions";

const LinkCallback = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [status, setStatus] = useState("Processing");
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current || !session) {
      return;
    }

    const handleLinking = async () => {
      try {
        // Mark as processed immediately to prevent duplicate executions
        processedRef.current = true;

        // Get the provider data from localStorage
        const linkingProvider = localStorage.getItem("linkingProvider");
        const userId = localStorage.getItem("linkAccountUserId");

        // Store values and immediately clear localStorage to prevent race conditions
        const isLinking = !!linkingProvider;
        const userEmail = session?.user?.email;

        // Clear localStorage early to prevent duplicate processing
        localStorage.removeItem("linkingProvider");
        localStorage.removeItem("linkAccountUserId");

        if (!isLinking || !userEmail) {
          toast.error("Missing linking information");
          setStatus("Failed");
          setTimeout(() => router.push("/dashboard/profile"), 2000);
          return;
        }

        // Use the client-safe wrapper function
        const result = await processAccountLinkingForClient(
          "google",
          userEmail,
          userId as string,
        );

        // Update the session to reflect changes
        await update();

        if (result.success) {
          toast.success(result.message || "Account linked successfully!");
          router.push("/dashboard/profile");
        } else {
          toast.error(result.message || "Failed to link account");
          setStatus("Failed");
          setTimeout(() => router.push("/dashboard/profile"), 2000);
        }
      } catch (error) {
        console.error("Error during account linking:", error);
        toast.error(error.message || "Failed to link account");
        setStatus("Failed");

        setTimeout(() => {
          router.push("/dashboard/profile");
        }, 2000);
      }
    };

    // Only run if we have a session and haven't processed yet
    handleLinking();
  }, [session, router, update]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <div className="mb-4 text-2xl">
        <FaSpinner className="animate-spin text-5xl" />
      </div>
      <h1 className="text-xl font-semibold">{status} your account link...</h1>
      <p className="mt-2 text-gray-600">
        Please wait, you'll be redirected shortly.
      </p>
    </div>
  );
};

export default LinkCallback;
