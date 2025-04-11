"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/app/lib/utils/zod";
import { setPasswordForUser } from "@/app/lib/actions/userAccountActions";
import { SetPasswordFormValues } from "@/types/setPassword";

export default function SetPassword() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isChangeMode = searchParams.get("mode") === "change";
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SetPasswordFormValues) => {
    if (!session?.user?.id) {
      toast.error("You must be signed in to set a password");
      return;
    }

    setIsSubmitting(true);
    try {
      // Set the password using the server action
      const result = await setPasswordForUser(session.user.id, data.password);
      
      // Refresh the session to capture any changes
      await update();
      
      if (isChangeMode) {
        toast.success("Password changed successfully!");
      } else {
        toast.success("Password set successfully! You can now sign in with your email and password.");
      }
      
      // Redirect back to profile page
      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Error setting password:", error);
      toast.error(error.message || "Failed to set password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">
          {isChangeMode ? "Change Your Password" : "Set Your Password"}
        </h1>
        <p className="text-gray-600">
          {isChangeMode
            ? "Update your account password"
            : "Create a password to enable email and password login for your account"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <label htmlFor="password" className="block font-medium text-gray-700">
            {isChangeMode ? "New Password" : "Password"}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className={`w-full rounded-md border px-10 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="block font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaLock className="text-gray-400" />
            </div>
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className={`w-full rounded-md border px-10 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="text-gray-400" />
              ) : (
                <FaEye className="text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-black py-2 font-medium text-white transition hover:bg-gray-800 disabled:bg-black"
          >
            {isSubmitting 
              ? (isChangeMode ? "Changing Password..." : "Setting Password...") 
              : (isChangeMode ? "Change Password" : "Set Password")}
          </button>
          <button
            type="button"
            onClick={() => router.push("/dashboard/profile")}
            className="w-full rounded-md border border-gray-300 bg-white py-2 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}