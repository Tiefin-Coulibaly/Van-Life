/**
 * SignInForm Component
 *
 * A form component that handles user authentication through email and password.
 * Features include:
 * - Email and password input fields
 * - Error message display for failed authentication attempts
 * - "Remember me" checkbox
 * - Forgot password link
 * - Redirect to dashboard on successful login
 * - Sign up link for new users
 *
 * @component
 * <SignInForm />
 */

import Link from "next/link";
import { signUserInWithCredentials } from "@/app/lib/actions/authActions";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";

const SignInForm = ({ callbackUrl }: { callbackUrl: string | null }) => {
  // State for tracking authentication errors
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  /**
   * Handles form submission for user authentication
   *
   * @param {FormData} formData - Form data containing email and password
   * @returns {Promise<void>}
   */
  async function handleSubmit(formData: FormData) {
    setError(null); // Clear previous errors

    setIsLoading(true);
    const result = await signUserInWithCredentials(formData);
    setIsLoading(true);

    // Handle authentication result
    if (result?.error) {
      setIsLoading(false);
      setError(result.error);
    } else if (result?.success && result.redirectTo) {
      toast.success("Successfully signed in");

      if (callbackUrl) {
        const url = `${result.redirectTo}/${callbackUrl}`;
        router.push(url);
      } else {
        router.push(result.redirectTo);
      }
    }
  }

  return (
    <form action={handleSubmit}>
      {/* Email and Password Input Fields */}
      <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
        />
      </div>

      {/* Error message display - only shown when authentication fails */}
      {error && (
        <div className="my-2 rounded bg-red-100 p-3 text-center text-red-700">
          {error}
        </div>
      )}

      {/* Remember Me Checkbox, Forgot Password Link, and Submit Button */}
      <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
        <div className="flex flex-wrap gap-4 md:gap-10">
          {/* Forgot Password Link */}
          <Link href="/auth/emailVerification" className="hover:text-primary">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button with Arrow Icon */}
        <button
          aria-label="login with email and password"
          className={`inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${clsx(
            { "cursor-not-allowed": loading },
          )}`}
        >
          {loading ? "Logging in" : "Log in"}
          <svg
            className="fill-white"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* Sign Up Link Footer */}
      <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
        <p>
          Don't have an account?{" "}
          <Link
            className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
            href="/auth/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
