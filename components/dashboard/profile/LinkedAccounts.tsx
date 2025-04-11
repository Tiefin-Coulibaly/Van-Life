"use client";
import { useState, useEffect, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  FaGoogle,
  FaSpinner,
  FaKey,
  FaCheckCircle,
  FaChild,
} from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getLinkedProvidersForClient,
  unlinkAccountForClient,
  getCurrentAuthMethod,
} from "@/app/lib/actions/userAccountActions";
import { signIn } from "next-auth/react";
import Link from "next/link";

const LinkedAccounts = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [currentAuthMethod, setCurrentAuthMethod] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        if (!session?.user?.id) return;

        const linkedProviders = await getLinkedProvidersForClient();
        const authMethod = await getCurrentAuthMethod();

        setProviders(linkedProviders);
        setCurrentAuthMethod(authMethod);
      } catch (error) {
        console.error("Error loading account data:", error);
        toast.error("Failed to load account information");
      } finally {
        setIsLoading(false);
      }
    }

    if (session?.user) {
      loadData();
    }
  }, [session]);

  const handleUnlink = (provider: string) => {
    // Prevent unlinking the current auth method
    if (provider === currentAuthMethod) {
      toast.error("You cannot unlink your current sign-in method");
      return;
    }

    // Prevent unlinking if it's the only method
    if (providers.length <= 1) {
      toast.error("You must have at least one sign-in method");
      return;
    }

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
        toast.error("Failed to unlink account");
      }
    });
  };

  const initiateGoogleLinking = () => {
    if (session?.user?.id) {
      try {
        localStorage.setItem("linkAccountUserId", session.user.id);
        localStorage.setItem("linkingProvider", "true");

        signIn("google", {
          redirectTo: "/dashboard/profile/linkCallback",
        });
      } catch (error) {
        toast.error("Failed to start account linking");
      }
    }
  };

  // Calculate authentication states
  const hasGoogleAccount = providers.includes("google");
  const hasCredentialsAccount = providers.includes("credentials");
  const hasBothMethods = hasGoogleAccount && hasCredentialsAccount;
  const shouldShowGoogleOption = currentAuthMethod !== "google";
  const shouldShowCredentialsOption = currentAuthMethod !== "credentials";

  return (
    <div className="mt-8">
      {/* Security Status Card */}
      {hasBothMethods && (
        <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
          <div className="flex items-center gap-2">
            <FaChild className="text-xl text-green-500" />
            <h3 className="font-semibold">Enhanced Account Security</h3>
          </div>
          <p className="mt-2 text-sm">
            Your account has multiple sign-in methods, providing better security
            and account recovery options.
          </p>
        </div>
      )}

      {/* Current Sign-In Method */}
      <div className="mb-6">
        <div className="mb-2 text-lg font-semibold">Current Sign-in Method</div>
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3">
          {currentAuthMethod === "google" ? (
            <FaGoogle className="text-xl text-red-500" />
          ) : (
            <FaKey className="text-xl text-blue-500" />
          )}
          <span className="capitalize">{currentAuthMethod || "Unknown"}</span>
        </div>
      </div>

      {/* Authentication Methods Section */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <h3 className="border-b border-gray-200 p-4 font-semibold">
          Authentication Methods
        </h3>

        {isLoading ? (
          <div className="flex justify-center p-6">
            <FaSpinner className="animate-spin text-xl text-gray-500" />
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {/* Google Authentication */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FaGoogle className="text-xl text-red-500" />
                <div>
                  <span className="font-medium">Google</span>
                  <p className="text-xs text-gray-500">
                    {hasGoogleAccount
                      ? "Sign in with your Google account"
                      : "Connect your Google account for easier sign-in"}
                  </p>
                </div>
              </div>

              {hasGoogleAccount ? (
                <div className="flex items-center">
                  <span className="mr-2 flex items-center text-sm text-green-600">
                    <FaCheckCircle className="mr-1" />
                    {currentAuthMethod === "google"
                      ? "Current method"
                      : "Connected"}
                  </span>
                  {currentAuthMethod !== "google" && providers.length > 1 && (
                    <button
                      onClick={() => handleUnlink("google")}
                      disabled={isPending}
                      className="rounded border border-red-500 px-2 py-1 text-xs text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {isPending ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        "Unlink"
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <button
                  onClick={initiateGoogleLinking}
                  className="rounded-md bg-black px-3 py-1 text-sm text-white transition hover:bg-gray-800"
                >
                  Connect
                </button>
              )}
            </div>

            {/* Password Authentication */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <FaKey className="text-xl text-blue-500" />
                <div>
                  <span className="font-medium">Password</span>
                  <p className="text-xs text-gray-500">
                    {hasCredentialsAccount
                      ? "Sign in with your email and password"
                      : "Set a password to sign in without Google"}
                  </p>
                </div>
              </div>

              {hasCredentialsAccount ? (
                <div className="flex items-center">
                  <span className="mr-2 flex items-center text-sm text-green-600">
                    <FaCheckCircle className="mr-1" />
                    {currentAuthMethod === "credentials"
                      ? "Current method"
                      : "Set up"}
                  </span>

                  <div className="flex gap-2">
                    {/* Always show change password option */}
                    <Link
                      href="/dashboard/profile/password?mode=change"
                      className="rounded border border-blue-500 px-2 py-1 text-xs text-blue-500 transition hover:bg-blue-50"
                    >
                      Change
                    </Link>

                    {/* Show remove option only if not current method and has multiple methods */}
                    {currentAuthMethod !== "credentials" &&
                      providers.length > 1 && (
                        <button
                          onClick={() => handleUnlink("credentials")}
                          disabled={isPending}
                          className="rounded border border-red-500 px-2 py-1 text-xs text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {isPending ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            "Remove"
                          )}
                        </button>
                      )}
                  </div>
                </div>
              ) : (
                <Link
                  href="/dashboard/profile/password"
                  className="rounded-md bg-black px-3 py-1 text-sm text-white transition hover:bg-gray-800"
                >
                  Set Password
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Security Tips */}
      <div className="mt-6 rounded-md border border-blue-100 bg-blue-50 p-4">
        <h4 className="mb-2 font-medium text-blue-800">Security Tips</h4>
        <ul className="list-inside list-disc text-sm text-blue-700">
          <li>
            We recommend setting up multiple sign-in methods for account
            recovery
          </li>
          <li>
            Use a strong, unique password that you don't use on other sites
          </li>
          <li>
            You cannot remove your current sign-in method without setting up
            another one first
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LinkedAccounts;
