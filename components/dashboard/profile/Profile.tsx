"use client";

import { FaCamera } from "react-icons/fa";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/app/lib/actions/profileUpdateAction";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUpdateProfile } from "@/types/profileUpdate";
import { profileUpdateSchema } from "@/app/lib/utils/zod";
import { useState } from "react";

const Profile = () => {
  const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true)
  const { data: session } = useSession();
  const fullName =
    session?.user?.name ||
    `${session?.user.firstName} ${session?.user.lastName}`;
  const email = session?.user.email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateProfile>({ resolver: zodResolver(profileUpdateSchema) });

  const handleOnChange = (e)=>{
    if(!e.target.value ){

    }
  }

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
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="size-24 rounded-full border border-gray-300 object-cover" />
          )}
          <label className="absolute bottom-0 right-0 cursor-pointer rounded-full bg-black p-1.5 text-white">
            <FaCamera className="text-sm text-white" />
            <input type="file" className="hidden" />
          </label>
        </div>

        {/* User Info Display */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{fullName}</h3>
          <p>{email}</p>
        </div>
      </div>

      {/* Editable Form Fields */}
      <form onSubmit={handleSubmit(updateProfile)} className="mt-6 space-y-4">
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder={fullName}
            className={`mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black ${
              errors.fullName ? "bg-red-100" : "bg-transparent"
            }`}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
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
            className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900"
          >
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
