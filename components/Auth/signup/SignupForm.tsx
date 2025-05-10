"use client";

import { useForm } from "react-hook-form";
import { createUser } from "@/app/lib/actions/authActions";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserRegistration } from "@/types/userRegistrationForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const SignupForm = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistration>();

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: UserRegistration) => {
    setLoading(true);

    const response: { success: boolean; message: string } =
      await createUser(data);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      router.push("/auth/signin");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* First Name & Last Name Fields */}
      <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
        {/* First Name Input */}
        <div className="flex w-full flex-col gap-1 lg:w-1/2">
          <input
            {...register("firstName", { required: "First name is required" })}
            type="text"
            placeholder="First name"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.firstName ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name Input */}
        <div className="flex w-full flex-col gap-1 lg:w-1/2">
          <input
            {...register("lastName", { required: "Last name is required" })}
            type="text"
            placeholder="Last name"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.lastName ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email & Password Fields */}
      <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
        {/* Email Input */}
        <div className="flex w-full flex-col gap-1 lg:w-1/2">
          <input
            {...register("email", {
              required: "An email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "The email provided is invalid",
              },
            })}
            type="email"
            placeholder="Email address"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.email ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="flex w-full flex-col gap-1 lg:w-1/2">
          <input
            {...register("password", {
              required: "A password is required",
              minLength: {
                value: 6,
                message: "The password must be at least 6 characters long",
              },
            })}
            type="password"
            placeholder="Password (min. 6 characters)"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.password ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      </div>

      {/* Phone & Role Selection */}
      <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
        {/* Phone Input */}
        <div className="flex w-full flex-col gap-1 lg:w-1/2">
          <input
            {...register("phone", {
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/, // Accepts international phone numbers (E.164 format)
                message: "Invalid phone number format",
              },
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 digits",
              },
              maxLength: {
                value: 15,
                message: "Phone number must be at most 15 digits",
              },
            })}
            type="text"
            placeholder="Phone (optional)"
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.phone ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          aria-label="signup with email and password"
          className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark ${clsx(
            {
              "cursor-not-allowed": loading,
            },
          )}`}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>

      {/* Redirect to Sign In */}
      <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
        <p>
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
function useEffect(arg0: () => void, arg1: AppRouterInstance[]) {
  throw new Error("Function not implemented.");
}
