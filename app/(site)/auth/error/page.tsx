
"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  let errorMessage: string;

  // Handle specific error types
  if (error === "OAuthSignin" || error === "OAuthCallback") {
    errorMessage = "Failed to connect with Google. Please try again.";
  } else if (error === "OAuthAccountNotLinked") {
    errorMessage =
      "This email is already used with a different sign-in method.";
  } else if (error === "OAuthCreateAccount") {
    errorMessage = "Could not create account using Google. Please try again.";
  } else {
    // Generic error handling
    errorMessage = "Authentication failed. Please try again later.";
  }

  return (
    <div className="flex grow items-center justify-center">
      <div className="mx-auto mt-8 w-1/3 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-bold text-red-600">
          Access Denied
        </h1>
        <p className="mb-4 mb-5 text-center text-lg">{errorMessage}</p>
        <div className="flex gap-8">
          <Link
            href="/auth/signin"
            className="block w-full rounded bg-blue-500 py-2 text-center text-white hover:bg-blue-600"
          >
            Back to Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="block w-full rounded bg-blue-500 py-2 text-center text-white hover:bg-blue-600"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
