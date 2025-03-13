"use client";

import { useForm } from "react-hook-form";
import { createUser } from "@/app/lib/actions";
import { useState } from "react";
import { toast } from "react-toastify";
import { UserRegistration } from "@/types/userRegistrationForm";
import Link from "next/link";

/**
 * SignupForm Component
 *
 * This component renders a signup form with validation using React Hook Form.
 * It includes fields for first name, last name, email, password, phone, and role selection.
 *
 * @returns {JSX.Element} The signup form component.
 */

const SignupForm = (): JSX.Element => {
  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegistration>();

  // Loading state to manage form submission
  const [loading, setLoading] = useState(false);

  /**
   * Handles form submission
   *
   * @param {UserRegistration} data - The user input data
   */
  const onSubmit = async (data: UserRegistration) => {
    setLoading(true);
    const toastId = toast.loading("Creating your account...");

    // Call the API to create a new user
    const response: { success: boolean; message: string } =
      await createUser(data);

    setLoading(false);
    toast.dismiss(toastId); // Remove loading toast

    // Show success or error message based on the API response
    if (response.success) {
      toast.success(response.message);
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

        {/* Role Selection */}
        <div className="flex w-full flex-col gap-1 lg:w-1/2">
          <select
            {...register("role", { required: "A role is required" })}
            className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
              errors.role ? "bg-red-100" : "bg-transparent"
            }`}
          >
            <option className="hidden" value="">
              Select a role
            </option>
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
          </select>
          {errors.role && (
            <p className="text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          aria-label="signup with email and password"
          className="inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>

      {/* Redirect to Sign In */}
      <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
        <p>
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;
