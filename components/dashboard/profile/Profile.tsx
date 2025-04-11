"use client";

import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  formatUserInformation,
  updateUserProfileInformation,
} from "@/app/lib/actions/profileUpdateAction";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUpdateProfile } from "@/types/profileUpdate";
import { profileUpdateSchema } from "@/app/lib/utils/zod";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import LinkedAccounts from "./LinkedAccounts";

const Profile = () => {
  const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);
  const [isUserDataUpdating, setIsUserDataUpdating] = useState<Boolean>(false);
  const { data: session, update } = useSession();

  const fullName =
    session?.user?.name ||
    `${session?.user.firstName} ${session?.user.lastName}`;
  const email = session?.user.email;
  const userId = session?.user.id;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<IUpdateProfile>({ resolver: zodResolver(profileUpdateSchema) });

  const watchedValues = watch();

  useEffect(() => {
    const formHasAnyValue = Object.values(watchedValues).some(
      (value) => value !== undefined && value !== "",
    );

    setIsFormEmpty(!formHasAnyValue);
  }, [watchedValues]);

  const handleFormSubmit = async (userData: IUpdateProfile) => {
    const formattedUserInformation = await formatUserInformation(userData);
    setIsUserDataUpdating(true);
    await updateUserProfileInformation(formattedUserInformation, userId!);

    await update({
      ...session,
      user: {
        ...session?.user,
        ...formatUserInformation,
      },
    });

    reset();
    setIsUserDataUpdating(false);
  };

  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      {/* Profile Header */}
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">
        Profile Settings
      </h2>

      {/* Profile Picture Upload */}
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          {session?.user.image ? (
            <div className="relative size-24">
              <Image
                alt="User's image"
                src={session?.user?.image}
                fill
                className="rounded-full object-cover shadow-md"
              />
            </div>
          ) : (
            <div className="size-24 rounded-full border border-gray-300 object-cover" />
          )}
          <Link
            href="/dashboard/profile/imageUpload"
            className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-black p-1.5 text-white"
          >
            <FaCamera className="text-sm text-white" />
          </Link>
        </div>

        {/* User Info Display */}
        {fullName && email ? (
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{fullName}</h3>
            <p>{email}</p>
          </div>
        ) : (
          "Loading"
        )}
      </div>

      {/* Editable Form Fields */}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="mt-6 space-y-4"
      >
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("name")}
            type="text"
            name="name"
            placeholder={fullName}
            className={`mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black ${
              errors.name ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder={email as string}
            className={`mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black ${
              errors.email ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            {...register("newPassword")}
            type="password"
            placeholder="********"
            className={`mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black ${
              errors.newPassword ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Form Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            disabled={isFormEmpty}
            className={`rounded-md border px-4 py-2 text-gray-700 transition ${
              isFormEmpty
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isFormEmpty}
            className={`rounded-md px-4 py-2 text-white transition ${
              isFormEmpty
                ? "cursor-not-allowed bg-gray-400"
                : "bg-black hover:bg-gray-900"
            } ${clsx({ "cursor-not-allowed": isUserDataUpdating })}`}
          >
            {isUserDataUpdating ? (
              <div className="flex items-center gap-3">
                Saving Changes
                <div className="size-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      {/* Linked Accounts Section */}
      <div className="mt-8 border-t pt-6">
        <LinkedAccounts />
      </div>
    </section>
  );
};

export default Profile;
