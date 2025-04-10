"use client";
import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getLinkedProvidersForClient,
  unlinkAccountForClient,
} from "@/app/lib/actions/userAccountActions";
import { signIn } from "next-auth/react";

const LinkedAccounts = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  console.log("providers:", providers);

  useEffect(() => {
    async function loadProviders() {
      try {
        setIsLoading(true);
        const linkedProviders = await getLinkedProvidersForClient();
        setProviders(linkedProviders);
      } catch (error) {
        console.error("Error loading linked accounts:", error);
        toast.error("Failed to load linked accounts");
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      loadProviders();
    }
  }, [session]);

  const handleUnlink = (provider: string) => {
    startTransition(async () => {
      try {
        const result = await unlinkAccountForClient(provider);

        if (result.success) {
          toast.success(result.message);
          setProviders((prev) => prev.filter((p) => p !== provider));
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error unlinking account:", error);
        toast.error("Failed to unlink account");
      }
    });
  };

  const initiateGoogleLinking = () => {
    if (session?.user?.id) {
      try {
        // Store linking info in localStorage
        localStorage.setItem("linkAccountUserId", session.user.id);
        localStorage.setItem("linkingProvider", "true");

        signIn("google", {
          redirectTo: "/dashboard/profile/linkCallback",
        });
      } catch (error) {
        console.error("Error initiating linking:", error);
        toast.error("Failed to start account linking");
      }
    }
  };

  return (
    <div className="mt-8">
      <h3 className="mb-4 text-lg font-semibold">Linked Accounts</h3>

      {isLoading ? (
        <div className="flex justify-center py-4">
          <FaSpinner className="animate-spin text-xl" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaGoogle className="text-xl" />
              <span>Google</span>
            </div>

            {providers.includes("google") ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600">Connected</span>
                <button
                  onClick={() => handleUnlink("google")}
                  disabled={isPending}
                  className="ml-2 rounded border border-red-500 px-2 py-1 text-xs text-red-500 transition hover:bg-red-50"
                >
                  {isPending ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    "Unlink"
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={initiateGoogleLinking}
                className="rounded-md bg-black px-3 py-1 text-sm text-white hover:bg-gray-800"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedAccounts;
