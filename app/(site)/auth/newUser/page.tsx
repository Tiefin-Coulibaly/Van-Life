"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { IGoogleNewUser } from "@/types/googleNewUser";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { getSession } from "next-auth/react";
import { updateGoogleAuthNewUserData } from "@/app/lib/actions/authActions";

const page = () => {
  // Initialize the form with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IGoogleNewUser>();

  // Loading state to manage user update
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //   Handle form data
  const onSubmit = async (formData: IGoogleNewUser) => {
    setLoading(true);

    // get the session
    const session = await getSession();

    // Update the user information
    if (session) {
      setLoading(true);
      await updateGoogleAuthNewUserData(
        session?.user?.email as string,
        formData,
      );
      setLoading(false);

      // Redirect the user to the dashboard
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      {/* Form Heading */}
      <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
        Additional Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <option value="Renter">Renter</option>
              <option value="Owner">Owner</option>
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
            className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark ${clsx(
              {
                "cursor-not-allowed": loading,
              },
            )}`}
            disabled={loading}
          >
            Continue to dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
