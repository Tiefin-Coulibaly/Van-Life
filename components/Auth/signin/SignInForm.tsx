import Link from "next/link";
import { signUserInWithCredentials } from "@/app/lib/actions/authActions";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/app/lib/utils/zod";
import { ISignIn } from "@/types/signIn";
import { useLoginContext } from "@/components/context/loginContext";

const SignInForm = ({ callbackUrl }: { callbackUrl: string | null }) => {
  const { setIsLoggedIn } = useLoginContext();
  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with zod schema validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({ resolver: zodResolver(signInSchema) });
  const router = useRouter();

  async function onSubmit(formData: ISignIn) {
    setError(null);
    setIsLoading(true);

    const result = await signUserInWithCredentials(formData);

    // Process authentication result
    if (result?.error) {
      setIsLoading(false);
      setError(result.error);
      setIsLoggedIn(false);
    } else if (result?.success && result.redirectTo) {
      setIsLoggedIn(true);
      toast.success("Successfully logged in");

      // Handle redirect with optional callback URL
      if (callbackUrl) {
        const url = `${result.redirectTo}/${callbackUrl}`;
        setIsLoading(false);
        router.push(url);
      } else {
        router.push(result.redirectTo);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email and Password Input Fields */}
      <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
        {/* Email input with validation */}
        <div className="flex w-full flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            name="email"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.email ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password input with validation */}
        <div className="flex w-full flex-col gap-1">
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            name="password"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.password ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* Authentication error message display */}
      {error && (
        <div className="my-2 rounded bg-red-100 p-3 text-center text-red-700">
          {error}
        </div>
      )}

      {/* User assistance links and submit button */}
      <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
        <div className="flex flex-wrap gap-4 md:gap-10">
          {/* Password recovery link */}
          <Link href="/auth/emailVerification" className="hover:text-primary">
            Forgot Password?
          </Link>
        </div>

        {/* Login Button with loading state */}
        <button
          aria-label="login with email and password"
          className={`inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${clsx(
            { "cursor-not-allowed": loading },
          )}`}
        >
          {!loading ? (
            <div className="flex items-center gap-3">
              Log in
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
            </div>
          ) : (
            <div className="flex items-center gap-3">
              Logging in
              <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            </div>
          )}
        </button>
      </div>

      {/* Account creation option */}
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
