"use client";

import React, { useState } from "react";
import { FaUserCircle, FaCamera } from "react-icons/fa";

/**
 * Profile Component
 *
 * This component provides a user profile settings page where users can:
 * - **Upload a profile picture**
 * - **Edit their full name, email, and password**
 * - **Save changes or cancel edits**
 *
 * @component
 * @returns {React.ReactElement} A user profile settings section with an editable form.
 */
const Profile: React.FC = () => {
  // Local state for form fields
  const [fullName, setFullName] = useState<string>("John Doe");
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [password, setPassword] = useState<string>("");

  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-md">
      {/* Profile Header */}
      <h2 className="mb-6 text-2xl font-semibold text-gray-900">Profile Settings</h2>

      {/* Profile Picture Upload */}
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <img
            src="https://via.placeholder.com/100" // Replace with user image dynamically
            alt="Profile"
            className="h-24 w-24 rounded-full border border-gray-300 object-cover"
          />
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
      <form className="mt-6 space-y-4">
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Form Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button type="button" className="rounded-md border px-4 py-2 text-gray-700 hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900">
            Save Changes
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
