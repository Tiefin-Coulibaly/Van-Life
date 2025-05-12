"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IPasswordReset } from "@/types/passwordReset";
import { resetUserPassword } from "@/app/lib/actions/passwordResetActions";
import { toast } from "react-toastify";


const PasswordReset = ({email}:{email:string}) => {

  const [loading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [btnButton, setBtnButton] = useState<string>("Reset password");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordReset>();

  const onSubmit = async (formData: IPasswordReset) => {
    setIsLoading(true);
    setBtnButton("Resetting password");

    if (formData.newPassword !== formData.confirmedPassword) {
      setError("Your password are not matching. Please try again");
      setIsLoading(false);
      setBtnButton("Reset password");
      return;
    }

    await resetUserPassword(email as string, formData.newPassword);
    setBtnButton("Reset password");
    toast.success("Password reset successfully");
    router.push("/auth/signin");
  };

  return (
    <>
      {/* Password Reset Form Section */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          {/* Background gradient and decorative elements */}
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          {/* Form container with animation */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Reset your password
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Password input fields container */}
              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                {/* New password field with validation */}
                <div className="flex w-full flex-col gap-1">
                  <input
                    {...register("newPassword", {
                      required: {
                        value: true,
                        message: "A new password is required",
                      },
                      minLength: {
                        value: 6,
                        message:
                          "The password must be at least 6 characters long",
                      },
                    })}
                    type="password"
                    placeholder="New password"
                    name="newPassword"
                    className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
                      errors.newPassword ? "bg-red-100" : "bg-transparent"
                    }`}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                {/* Confirm password field with validation */}
                <div className="flex w-full flex-col gap-1">
                  <input
                    {...register("confirmedPassword", {
                      required: {
                        value: true,
                        message: "A confirmed password is required",
                      },
                      minLength: {
                        value: 6,
                        message:
                          "The password must be at least 6 characters long",
                      },
                    })}
                    type="password"
                    placeholder="Confirm new password"
                    name="confirmedPassword"
                    className={`w-full border-b border-stroke p-2 pb-3.5 focus:border-waterloo focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee ${
                      errors.confirmedPassword ? "bg-red-100" : "bg-transparent"
                    }`}
                  />
                  {errors.confirmedPassword && (
                    <p className="text-sm text-red-500">
                      {errors.confirmedPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Custom error display for password mismatch */}
              {error && (
                <div className="mb-6 rounded bg-red-100 p-3 text-center text-red-700">
                  {error}
                </div>
              )}

              {/* Submit button with loading state */}
              <div className="flex flex-wrap items-center justify-center gap-10 md:justify-end xl:gap-15">
                <button
                  type="submit"
                  aria-label="login with email and password"
                  className={`mb-6  inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho ${clsx(
                    { "cursor-not-allowed": loading },
                  )}`}
                >
                  {!loading ? (
                    <div className="flex items-center gap-3">
                      {btnButton}
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
                      {btnButton}
                      <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PasswordReset;
